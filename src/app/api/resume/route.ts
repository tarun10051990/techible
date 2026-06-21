import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

// Get user's resumes
export async function GET() {
  const user = await getSession();
  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const resumes = await prisma.resume.findMany({
    where: { userId: user.id },
    orderBy: { updatedAt: "desc" },
  });

  return Response.json({ resumes });
}

// Create or update resume
export async function POST(request: NextRequest) {
  try {
    const user = await getSession();
    if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

    const body = await request.json();
    const { id, templateId, fullName, email, phone, location, title, summary, experience, education, skills, projects, certifications, languages, socialLinks } = body;

    if (!fullName || !email) {
      return Response.json({ error: "Full name and email are required" }, { status: 400 });
    }

    const data = {
      userId: user.id,
      templateId: templateId || "professional",
      fullName,
      email,
      phone: phone || null,
      location: location || null,
      title: title || null,
      summary: summary || null,
      experience: experience ? JSON.stringify(experience) : null,
      education: education ? JSON.stringify(education) : null,
      skills: skills || null,
      projects: projects ? JSON.stringify(projects) : null,
      certifications: certifications ? JSON.stringify(certifications) : null,
      languages: languages || null,
      socialLinks: socialLinks ? JSON.stringify(socialLinks) : null,
    };

    let resume;
    if (id) {
      resume = await prisma.resume.update({ where: { id }, data });
    } else {
      resume = await prisma.resume.create({ data });
    }

    return Response.json({ resume });
  } catch (error: unknown) {
    console.error("Resume save error:", error);
    const message = error instanceof Error ? error.message : "Failed to save resume";
    return Response.json({ error: message }, { status: 500 });
  }
}

// Delete resume
export async function DELETE(request: NextRequest) {
  const user = await getSession();
  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return Response.json({ error: "Resume ID required" }, { status: 400 });

  await prisma.resume.delete({ where: { id } });
  return Response.json({ success: true });
}
