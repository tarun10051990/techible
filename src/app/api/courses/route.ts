import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { generateSlug } from "@/lib/utils";

export async function GET(request: NextRequest) {
  const checkEnrollment = request.nextUrl.searchParams.get("checkEnrollment");
  const courseId = request.nextUrl.searchParams.get("courseId");

  if (checkEnrollment && courseId) {
    const user = await getSession();
    if (!user) return Response.json({ enrolled: false });
    const enrollment = await prisma.enrollment.findFirst({ where: { userId: user.id, courseId } });
    return Response.json({ enrolled: !!enrollment });
  }

  const all = request.nextUrl.searchParams.get("all");
  const where: Record<string, unknown> = {};
  if (!all) where.isActive = true;

  const courses = await prisma.course.findMany({ where, orderBy: { createdAt: "desc" } });
  return Response.json({ courses });
}

export async function POST(request: NextRequest) {
  const user = await getSession();
  if (!user || user.role !== "admin") return Response.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const slug = generateSlug(body.title) + "-" + Date.now().toString(36);

  const course = await prisma.course.create({
    data: {
      title: body.title, slug, instructor: body.instructor, price: parseFloat(body.price) || 0,
      duration: body.duration, level: body.level || "beginner", category: body.category,
      description: body.description, syllabus: body.syllabus || null,
      skills: body.skills || null, featured: body.featured === true,
    },
  });
  return Response.json({ course, slug: course.slug });
}

export async function PUT(request: NextRequest) {
  const user = await getSession();
  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();

  // Handle free course enrollment
  if (body.action === "enroll" && body.courseId) {
    const course = await prisma.course.findUnique({ where: { id: body.courseId } });
    if (!course || course.price > 0) return Response.json({ error: "Payment required" }, { status: 400 });
    const existing = await prisma.enrollment.findFirst({ where: { userId: user.id, courseId: body.courseId } });
    if (existing) return Response.json({ success: true, message: "Already enrolled" });
    await prisma.enrollment.create({ data: { userId: user.id, courseId: body.courseId } });
    await prisma.course.update({ where: { id: body.courseId }, data: { enrolled: { increment: 1 } } });
    return Response.json({ success: true });
  }

  // Admin update
  if (user.role !== "admin") return Response.json({ error: "Unauthorized" }, { status: 401 });
  const { id, ...data } = body;
  if (data.price) data.price = parseFloat(data.price);
  const course = await prisma.course.update({ where: { id }, data });
  return Response.json({ course });
}

export async function DELETE(request: NextRequest) {
  const user = await getSession();
  if (!user || user.role !== "admin") return Response.json({ error: "Unauthorized" }, { status: 401 });
  const id = request.nextUrl.searchParams.get("id");
  if (!id) return Response.json({ error: "ID required" }, { status: 400 });
  await prisma.course.delete({ where: { id } });
  return Response.json({ ok: true });
}
