import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET() {
  const user = await getSession();
  if (!user || user.role !== "admin") return Response.json({ error: "Unauthorized" }, { status: 401 });
  const tickets = await prisma.supportTicket.findMany({ orderBy: { createdAt: "desc" } });
  return Response.json({ tickets });
}

export async function PUT(request: NextRequest) {
  const user = await getSession();
  if (!user || user.role !== "admin") return Response.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json();
  const { id, status } = body;
  const ticket = await prisma.supportTicket.update({ where: { id }, data: { status } });
  return Response.json({ ticket });
}
