import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { generateSlug } from "@/lib/utils";

export async function GET(request: NextRequest) {
  const all = request.nextUrl.searchParams.get("all");
  const where: Record<string, unknown> = {};
  if (!all) where.isActive = true;
  const events = await prisma.event.findMany({ where, orderBy: { date: "asc" } });
  return Response.json({ events });
}

export async function POST(request: NextRequest) {
  const user = await getSession();
  if (!user) return Response.json({ error: "Login required" }, { status: 401 });
  const body = await request.json();
  const slug = generateSlug(body.title) + "-" + Date.now().toString(36);
  const event = await prisma.event.create({
    data: {
      title: body.title, slug, type: body.type || "hackathon", organizer: body.organizer,
      location: body.location, mode: body.mode || "online",
      date: new Date(body.date), endDate: body.endDate ? new Date(body.endDate) : null,
      description: body.description, eligibility: body.eligibility || null,
      prizes: body.prizes || null, fees: parseFloat(body.fees) || 0,
      maxParticipants: body.maxParticipants ? parseInt(body.maxParticipants) : null,
      website: body.website || null,
    },
  });
  return Response.json({ event, slug: event.slug });
}

export async function PUT(request: NextRequest) {
  const user = await getSession();
  if (!user || user.role !== "admin") return Response.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json();
  const { id, ...data } = body;
  if (data.date) data.date = new Date(data.date);
  if (data.endDate) data.endDate = new Date(data.endDate);
  if (data.fees) data.fees = parseFloat(data.fees);
  if (data.maxParticipants) data.maxParticipants = parseInt(data.maxParticipants);
  const event = await prisma.event.update({ where: { id }, data });
  return Response.json({ event });
}

export async function DELETE(request: NextRequest) {
  const user = await getSession();
  if (!user || user.role !== "admin") return Response.json({ error: "Unauthorized" }, { status: 401 });
  const id = request.nextUrl.searchParams.get("id");
  if (!id) return Response.json({ error: "ID required" }, { status: 400 });
  await prisma.event.delete({ where: { id } });
  return Response.json({ ok: true });
}
