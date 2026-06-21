import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword, verifyPassword, createSession, getSession, destroySession } from "@/lib/auth";

export async function GET() {
  const user = await getSession();
  return Response.json({ user });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { action, email, password, name } = body;

  if (action === "signup") {
    if (!email || !password || !name) {
      return Response.json({ error: "All fields are required" }, { status: 400 });
    }
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return Response.json({ error: "Email already registered" }, { status: 400 });
    }
    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });
    await createSession(user.id);
    return Response.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  }

  if (action === "login") {
    if (!email || !password) {
      return Response.json({ error: "Email and password are required" }, { status: 400 });
    }
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return Response.json({ error: "Invalid credentials" }, { status: 401 });
    }
    const valid = await verifyPassword(password, user.password);
    if (!valid) {
      return Response.json({ error: "Invalid credentials" }, { status: 401 });
    }
    await createSession(user.id);
    return Response.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  }

  return Response.json({ error: "Invalid action" }, { status: 400 });
}

export async function DELETE() {
  await destroySession();
  return Response.json({ ok: true });
}
