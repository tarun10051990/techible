import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import Razorpay from "razorpay";

async function getRazorpayInstance() {
  const settings = await prisma.paymentSettings.findFirst();
  if (!settings || !settings.razorpayKeyId || !settings.razorpayKeySecret) {
    return null;
  }
  return new Razorpay({
    key_id: settings.razorpayKeyId,
    key_secret: settings.razorpayKeySecret,
  });
}

// Create order
export async function POST(request: NextRequest) {
  const user = await getSession();
  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { type, referenceId, amount } = body;

  if (!type || !amount) {
    return Response.json({ error: "Type and amount required" }, { status: 400 });
  }

  const settings = await prisma.paymentSettings.findFirst();
  if (!settings || !settings.razorpayKeyId) {
    return Response.json({ error: "Payment gateway not configured" }, { status: 503 });
  }

  const razorpay = await getRazorpayInstance();
  if (!razorpay) {
    return Response.json({ error: "Payment gateway not configured" }, { status: 503 });
  }

  try {
    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100), // Razorpay expects paise
      currency: settings.currency || "INR",
      receipt: `${type}_${Date.now()}`,
      notes: { userId: user.id, type, referenceId: referenceId || "" },
    });

    // Create payment record
    const payment = await prisma.payment.create({
      data: {
        userId: user.id,
        amount,
        currency: settings.currency || "INR",
        type,
        referenceId,
        razorpayOrderId: order.id,
        status: "pending",
      },
    });

    return Response.json({
      orderId: order.id,
      paymentId: payment.id,
      keyId: settings.razorpayKeyId,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Payment creation failed";
    return Response.json({ error: message }, { status: 500 });
  }
}

// Verify payment
export async function PUT(request: NextRequest) {
  const user = await getSession();
  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { razorpayOrderId, razorpayPaymentId, razorpaySignature, paymentId } = body;

  if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
    return Response.json({ error: "Missing payment details" }, { status: 400 });
  }

  const settings = await prisma.paymentSettings.findFirst();
  if (!settings) {
    return Response.json({ error: "Payment settings not found" }, { status: 503 });
  }

  // Verify signature
  const crypto = await import("crypto");
  const expectedSignature = crypto
    .createHmac("sha256", settings.razorpayKeySecret)
    .update(`${razorpayOrderId}|${razorpayPaymentId}`)
    .digest("hex");

  if (expectedSignature !== razorpaySignature) {
    await prisma.payment.update({
      where: { id: paymentId },
      data: { status: "failed" },
    });
    return Response.json({ error: "Payment verification failed" }, { status: 400 });
  }

  // Update payment
  const payment = await prisma.payment.update({
    where: { id: paymentId },
    data: {
      razorpayPaymentId,
      razorpaySignature,
      status: "completed",
    },
  });

  // If subscription payment, activate subscription
  if (payment.type === "subscription" && payment.referenceId) {
    const plan = await prisma.subscriptionPlan.findUnique({ where: { id: payment.referenceId } });
    if (plan) {
      const endDate = new Date();
      endDate.setDate(endDate.getDate() + plan.duration);

      await prisma.subscription.create({
        data: {
          userId: user.id,
          planId: plan.id,
          status: "active",
          endDate,
          paymentId: payment.id,
        },
      });
    }
  }

  // If course payment, create enrollment
  if (payment.type === "course" && payment.referenceId) {
    const existing = await prisma.enrollment.findFirst({
      where: { userId: user.id, courseId: payment.referenceId },
    });
    if (!existing) {
      await prisma.enrollment.create({
        data: { userId: user.id, courseId: payment.referenceId },
      });
      await prisma.course.update({
        where: { id: payment.referenceId },
        data: { enrolled: { increment: 1 } },
      });
    }
  }

  return Response.json({ success: true, payment });
}
