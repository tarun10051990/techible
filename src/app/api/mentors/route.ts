import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { generateSlug } from "@/lib/utils";

export async function GET(request: NextRequest) {
  const all = request.nextUrl.searchParams.get("all");
  const where: Record<string, unknown> = {};
  if (!all) where.isActive = true;
  const mentors = await prisma.mentor.findMany({ where, orderBy: { rating: "desc" } });
  return Response.json({ mentors });
}

export async function POST(request: NextRequest) {
  const user = await getSession();
  if (!user || user.role !== "admin") return Response.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json();
  const slug = generateSlug(body.name) + "-" + Date.now().toString(36);
  const mentor = await prisma.mentor.create({
    data: {
      name: body.name, slug, title: body.title, company: body.company || null,
      expertise: body.expertise, bio: body.bio || null,
      experience: parseInt(body.experience) || 0, price: parseFloat(body.price) || 0,
      featured: body.featured === true,
    },
  });
  return Response.json({ mentor });
}

export async function PUT(request: NextRequest) {
  const user = await getSession();
  if (!user || user.role !== "admin") return Response.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json();
  const { id, ...data } = body;
  if (data.experience) data.experience = parseInt(data.experience);
  if (data.price) data.price = parseFloat(data.price);
  const mentor = await prisma.mentor.update({ where: { id }, data });
  return Response.json({ mentor });
}

export async function DELETE(request: NextRequest) {
  const user = await getSession();
  if (!user || user.role !== "admin") return Response.json({ error: "Unauthorized" }, { status: 401 });
  const id = request.nextUrl.searchParams.get("id");
  if (!id) return Response.json({ error: "ID required" }, { status: 400 });
  await prisma.mentor.delete({ where: { id } });
  return Response.json({ ok: true });
}
