import { prisma } from "@/lib/prisma";
import CoursesClient from "./CoursesClient";

export default async function CoursesPage() {
  const courses = await prisma.course.findMany({ orderBy: { createdAt: "desc" } });
  return <CoursesClient courses={courses} />;
}
