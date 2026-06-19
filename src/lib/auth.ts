import { prisma } from "./prisma";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function createSession(userId: string) {
  const token = crypto.randomUUID();
  const cookieStore = await cookies();
  cookieStore.set("session_token", `${userId}:${token}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
  return token;
}

export async function getSession() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session_token");
  if (!sessionCookie) return null;

  const [userId] = sessionCookie.value.split(":");
  if (!userId) return null;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, name: true, email: true, role: true, avatar: true },
  });

  return user;
}

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete("session_token");
}

export async function requireAdmin() {
  const user = await getSession();
  if (!user || user.role !== "admin") {
    throw new Error("Unauthorized");
  }
  return user;
}
