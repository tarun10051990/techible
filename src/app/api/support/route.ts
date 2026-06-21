import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateTrackingId } from "@/lib/utils";

export async function GET(request: NextRequest) {
  const trackingId = request.nextUrl.searchParams.get("trackingId");
  if (!trackingId) return Response.json({ error: "Tracking ID required" }, { status: 400 });

  const ticket = await prisma.supportTicket.findUnique({
    where: { trackingId },
    select: { trackingId: true, status: true, subject: true, createdAt: true },
  });

  if (!ticket) return Response.json({ error: "Ticket not found" }, { status: 404 });
  return Response.json({ ticket });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, email, subject, message } = body;

  if (!name || !email || !subject || !message) {
    return Response.json({ error: "All fields are required" }, { status: 400 });
  }

  const trackingId = generateTrackingId();
  await prisma.supportTicket.create({
    data: { name, email, subject, message, trackingId },
  });

  return Response.json({ trackingId });
}
