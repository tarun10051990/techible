import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { generateSlug } from "@/lib/utils";

export async function GET(request: NextRequest) {
  const all = request.nextUrl.searchParams.get("all");
  const where: Record<string, unknown> = {};
  if (!all) where.isPublished = true;
  const posts = await prisma.post.findMany({
    where,
    include: { author: { select: { name: true } } },
    orderBy: { createdAt: "desc" },
  });
  return Response.json({ posts });
}

export async function POST(request: NextRequest) {
  const user = await getSession();
  if (!user) return Response.json({ error: "Login required" }, { status: 401 });
  const body = await request.json();
  const slug = generateSlug(body.title) + "-" + Date.now().toString(36);
  const post = await prisma.post.create({
    data: {
      title: body.title, slug, content: body.content,
      excerpt: body.excerpt || body.content.substring(0, 150),
      category: body.category, tags: body.tags || null, authorId: user.id,
    },
  });
  return Response.json({ post, slug: post.slug });
}

export async function PUT(request: NextRequest) {
  const user = await getSession();
  if (!user || user.role !== "admin") return Response.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json();
  const { id, ...data } = body;
  const post = await prisma.post.update({ where: { id }, data });
  return Response.json({ post });
}

export async function DELETE(request: NextRequest) {
  const user = await getSession();
  if (!user || user.role !== "admin") return Response.json({ error: "Unauthorized" }, { status: 401 });
  const id = request.nextUrl.searchParams.get("id");
  if (!id) return Response.json({ error: "ID required" }, { status: 400 });
  await prisma.post.delete({ where: { id } });
  return Response.json({ ok: true });
}
