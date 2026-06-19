import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { generateSlug } from "@/lib/utils";

export async function GET(request: NextRequest) {
  const all = request.nextUrl.searchParams.get("all");
  const where: Record<string, unknown> = {};
  if (!all) where.isActive = true;
  const schools = await prisma.summerSchool.findMany({ where, orderBy: { startDate: "asc" } });
  return Response.json({ schools });
}

export async function POST(request: NextRequest) {
  const user = await getSession();
  if (!user || user.role !== "admin") return Response.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json();
  const slug = generateSlug(body.title) + "-" + Date.now().toString(36);
  const school = await prisma.summerSchool.create({
    data: {
      title: body.title, slug, institute: body.institute, location: body.location,
      startDate: new Date(body.startDate), endDate: new Date(body.endDate),
      description: body.description, eligibility: body.eligibility || null,
      fees: parseFloat(body.fees) || 0, topics: body.topics || null, website: body.website || null,
    },
  });
  return Response.json({ school });
}

export async function PUT(request: NextRequest) {
  const user = await getSession();
  if (!user || user.role !== "admin") return Response.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json();
  const { id, ...data } = body;
  if (data.startDate) data.startDate = new Date(data.startDate);
  if (data.endDate) data.endDate = new Date(data.endDate);
  if (data.fees) data.fees = parseFloat(data.fees);
  const school = await prisma.summerSchool.update({ where: { id }, data });
  return Response.json({ school });
}

export async function DELETE(request: NextRequest) {
  const user = await getSession();
  if (!user || user.role !== "admin") return Response.json({ error: "Unauthorized" }, { status: 401 });
  const id = request.nextUrl.searchParams.get("id");
  if (!id) return Response.json({ error: "ID required" }, { status: 400 });
  await prisma.summerSchool.delete({ where: { id } });
  return Response.json({ ok: true });
}
