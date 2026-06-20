import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export async function GET() {
  try {
    await requireAdmin();
  } catch {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const settings = await prisma.paymentSettings.findFirst();
  const payments = await prisma.payment.findMany({
    include: { user: { select: { name: true, email: true } } },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return Response.json({ settings, payments });
}

export async function POST(request: NextRequest) {
  try {
    await requireAdmin();
  } catch {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { razorpayKeyId, razorpayKeySecret, razorpayWebhookSecret, isTestMode, currency, taxPercentage } = body;

  const existing = await prisma.paymentSettings.findFirst();

  let settings;
  if (existing) {
    settings = await prisma.paymentSettings.update({
      where: { id: existing.id },
      data: { razorpayKeyId, razorpayKeySecret, razorpayWebhookSecret, isTestMode, currency, taxPercentage },
    });
  } else {
    settings = await prisma.paymentSettings.create({
      data: { razorpayKeyId, razorpayKeySecret, razorpayWebhookSecret, isTestMode, currency, taxPercentage },
    });
  }

  return Response.json({ settings });
}
