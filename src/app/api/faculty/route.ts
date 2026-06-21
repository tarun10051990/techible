import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { generateSlug } from "@/lib/utils";

export async function GET(request: NextRequest) {
  const all = request.nextUrl.searchParams.get("all");
  const where: Record<string, unknown> = {};
  if (!all) where.isActive = true;
  const faculties = await prisma.faculty.findMany({ where, include: { college: true }, orderBy: { name: "asc" } });
  return Response.json({ faculties });
}

export async function POST(request: NextRequest) {
  const user = await getSession();
  if (!user || user.role !== "admin") return Response.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json();
  const slug = generateSlug(body.name) + "-" + Date.now().toString(36);
  const faculty = await prisma.faculty.create({
    data: {
      name: body.name, slug, designation: body.designation, department: body.department,
      collegeId: body.collegeId, email: body.email || null, phone: body.phone || null,
      specialization: body.specialization || null, bio: body.bio || null,
      publications: parseInt(body.publications) || 0,
    },
  });
  return Response.json({ faculty });
}

export async function PUT(request: NextRequest) {
  const user = await getSession();
  if (!user || user.role !== "admin") return Response.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json();
  const { id, ...data } = body;
  if (data.publications) data.publications = parseInt(data.publications);
  const faculty = await prisma.faculty.update({ where: { id }, data });
  return Response.json({ faculty });
}

export async function DELETE(request: NextRequest) {
  const user = await getSession();
  if (!user || user.role !== "admin") return Response.json({ error: "Unauthorized" }, { status: 401 });
  const id = request.nextUrl.searchParams.get("id");
  if (!id) return Response.json({ error: "ID required" }, { status: 400 });
  await prisma.faculty.delete({ where: { id } });
  return Response.json({ ok: true });
}
