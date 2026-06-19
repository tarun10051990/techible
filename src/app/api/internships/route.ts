import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { generateSlug } from "@/lib/utils";

export async function GET(request: NextRequest) {
  const type = request.nextUrl.searchParams.get("type");
  const all = request.nextUrl.searchParams.get("all");
  const where: Record<string, unknown> = {};
  if (!all) where.isActive = true;
  if (type) where.type = type;

  const internships = await prisma.internship.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
  return Response.json({ internships });
}

export async function POST(request: NextRequest) {
  const user = await getSession();
  if (!user || user.role !== "admin") {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const slug = generateSlug(body.title) + "-" + Date.now().toString(36);

  const internship = await prisma.internship.create({
    data: {
      title: body.title,
      slug,
      company: body.company,
      companyLogo: body.companyLogo || null,
      location: body.location,
      type: body.type || "skill",
      mode: body.mode || "remote",
      stipend: body.stipend || null,
      duration: body.duration,
      description: body.description,
      requirements: body.requirements || null,
      skills: body.skills,
      openings: parseInt(body.openings) || 1,
      deadline: body.deadline ? new Date(body.deadline) : null,
      featured: body.featured === true,
    },
  });

  return Response.json({ internship, slug: internship.slug });
}

export async function PUT(request: NextRequest) {
  const user = await getSession();
  if (!user || user.role !== "admin") {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { id, ...data } = body;
  if (data.deadline) data.deadline = new Date(data.deadline);
  if (data.openings) data.openings = parseInt(data.openings);

  const internship = await prisma.internship.update({ where: { id }, data });
  return Response.json({ internship });
}

export async function DELETE(request: NextRequest) {
  const user = await getSession();
  if (!user || user.role !== "admin") {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = request.nextUrl.searchParams.get("id");
  if (!id) return Response.json({ error: "ID required" }, { status: 400 });

  await prisma.internship.delete({ where: { id } });
  return Response.json({ ok: true });
}
