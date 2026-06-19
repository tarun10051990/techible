import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET() {
  const user = await getSession();
  if (!user || user.role !== "admin") return Response.json({ error: "Unauthorized" }, { status: 401 });
  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true, role: true, createdAt: true },
    orderBy: { createdAt: "desc" },
  });
  return Response.json({ users });
}

export async function PUT(request: NextRequest) {
  const user = await getSession();
  if (!user || user.role !== "admin") return Response.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json();
  const { id, role } = body;
  const updated = await prisma.user.update({
    where: { id },
    data: { role },
    select: { id: true, name: true, email: true, role: true },
  });
  return Response.json({ user: updated });
}

export async function DELETE(request: NextRequest) {
  const user = await getSession();
  if (!user || user.role !== "admin") return Response.json({ error: "Unauthorized" }, { status: 401 });
  const id = request.nextUrl.searchParams.get("id");
  if (!id) return Response.json({ error: "ID required" }, { status: 400 });
  await prisma.user.delete({ where: { id } });
  return Response.json({ ok: true });
}
