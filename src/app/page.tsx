import Link from "next/link";
import { prisma } from "@/lib/prisma";
import HomeClient from "@/components/HomeClient";

export default async function HomePage() {
  const [courses, internships, mentors, posts] = await Promise.all([
    prisma.course.findMany({ take: 6, orderBy: { createdAt: "desc" } }),
    prisma.internship.findMany({ take: 6, orderBy: { createdAt: "desc" } }),
    prisma.mentor.findMany({ take: 8, orderBy: { createdAt: "desc" } }),
    prisma.post.findMany({ take: 4, orderBy: { createdAt: "desc" } }),
  ]);

  return <HomeClient courses={courses} internships={internships} mentors={mentors} posts={posts} />;
}
