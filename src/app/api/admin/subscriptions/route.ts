import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export async function GET() {
  try {
    await requireAdmin();
  } catch {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const plans = await prisma.subscriptionPlan.findMany({ orderBy: { price: "asc" } });
  return Response.json({ plans });
}

export async function POST(request: NextRequest) {
  try {
    await requireAdmin();
  } catch {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const slug = slugify(body.name) + "-" + Date.now().toString(36);

  const plan = await prisma.subscriptionPlan.create({
    data: {
      name: body.name,
      slug,
      price: body.price || 0,
      duration: body.duration || 30,
      features: body.features || "",
      resumeDownloads: body.resumeDownloads || 0,
      isPopular: body.isPopular === true,
    },
  });

  return Response.json({ plan });
}

export async function PUT(request: NextRequest) {
  try {
    await requireAdmin();
  } catch {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { id, ...data } = body;
  if (data.price !== undefined) data.price = parseFloat(data.price) || 0;
  if (data.duration !== undefined) data.duration = parseInt(data.duration) || 30;
  if (data.resumeDownloads !== undefined) data.resumeDownloads = parseInt(data.resumeDownloads) || 0;

  const plan = await prisma.subscriptionPlan.update({ where: { id }, data });
  return Response.json({ plan });
}

export async function DELETE(request: NextRequest) {
  try {
    await requireAdmin();
  } catch {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = request.nextUrl.searchParams.get("id");
  if (!id) return Response.json({ error: "ID required" }, { status: 400 });

  await prisma.subscriptionPlan.delete({ where: { id } });
  return Response.json({ ok: true });
}
