import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q")?.trim();
  if (!q) return Response.json({ results: [] });

  const results: { type: string; title: string; href: string; subtitle?: string }[] = [];

  const [internships, courses, colleges, events, mentors, posts] = await Promise.all([
    prisma.internship.findMany({
      where: { isActive: true, OR: [{ title: { contains: q } }, { company: { contains: q } }, { skills: { contains: q } }] },
      take: 5,
      select: { title: true, slug: true, company: true },
    }),
    prisma.course.findMany({
      where: { isActive: true, OR: [{ title: { contains: q } }, { category: { contains: q } }, { instructor: { contains: q } }] },
      take: 5,
      select: { title: true, slug: true, category: true },
    }),
    prisma.college.findMany({
      where: { isActive: true, OR: [{ name: { contains: q } }, { location: { contains: q } }, { type: { contains: q } }] },
      take: 5,
      select: { name: true, slug: true, type: true },
    }),
    prisma.event.findMany({
      where: { isActive: true, OR: [{ title: { contains: q } }, { organizer: { contains: q } }, { type: { contains: q } }] },
      take: 5,
      select: { title: true, slug: true, type: true },
    }),
    prisma.mentor.findMany({
      where: { isActive: true, OR: [{ name: { contains: q } }, { expertise: { contains: q } }, { title: { contains: q } }] },
      take: 5,
      select: { name: true, slug: true, title: true },
    }),
    prisma.post.findMany({
      where: { isPublished: true, OR: [{ title: { contains: q } }, { category: { contains: q } }] },
      take: 5,
      select: { title: true, slug: true, category: true },
    }),
  ]);

  internships.forEach((i) => results.push({ type: "Internship", title: i.title, href: `/internships/${i.slug}`, subtitle: i.company }));
  courses.forEach((c) => results.push({ type: "Course", title: c.title, href: `/courses/${c.slug}`, subtitle: c.category }));
  colleges.forEach((c) => results.push({ type: "Institute", title: c.name, href: `/colleges/${c.slug}`, subtitle: c.type }));
  events.forEach((e) => results.push({ type: "Event", title: e.title, href: `/events/${e.slug}`, subtitle: e.type }));
  mentors.forEach((m) => results.push({ type: "Mentor", title: m.name, href: `/mentors`, subtitle: m.title }));
  posts.forEach((p) => results.push({ type: "Post", title: p.title, href: `/posts/${p.slug}`, subtitle: p.category }));

  return Response.json({ results: results.slice(0, 15) });
}
