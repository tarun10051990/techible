import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { generateSlug } from "@/lib/utils";

export async function GET(request: NextRequest) {
  const all = request.nextUrl.searchParams.get("all");
  const where: Record<string, unknown> = {};
  if (!all) where.isActive = true;
  const colleges = await prisma.college.findMany({ where, orderBy: { name: "asc" } });
  return Response.json({ colleges });
}

export async function POST(request: NextRequest) {
  const user = await getSession();
  if (!user || user.role !== "admin") return Response.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json();
  const slug = generateSlug(body.name) + "-" + Date.now().toString(36);
  const college = await prisma.college.create({
    data: {
      name: body.name, slug, location: body.location, type: body.type,
      ranking: body.ranking ? parseInt(body.ranking) : null, website: body.website || null,
      description: body.description || null, programs: body.programs || null,
      established: body.established ? parseInt(body.established) : null,
    },
  });
  return Response.json({ college, slug: college.slug });
}

export async function PUT(request: NextRequest) {
  const user = await getSession();
  if (!user || user.role !== "admin") return Response.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json();
  const { id, ...data } = body;
  if (data.ranking) data.ranking = parseInt(data.ranking);
  if (data.established) data.established = parseInt(data.established);
  const college = await prisma.college.update({ where: { id }, data });
  return Response.json({ college });
}

export async function DELETE(request: NextRequest) {
  const user = await getSession();
  if (!user || user.role !== "admin") return Response.json({ error: "Unauthorized" }, { status: 401 });
  const id = request.nextUrl.searchParams.get("id");
  if (!id) return Response.json({ error: "ID required" }, { status: 400 });
  await prisma.college.delete({ where: { id } });
  return Response.json({ ok: true });
}
