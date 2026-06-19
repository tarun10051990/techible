import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { BookOpen, Clock, Star, Users } from "lucide-react";

export const dynamic = "force-dynamic";
export const metadata = { title: "Techible | Courses" };

export default async function CoursesPage() {
  const courses = await prisma.course.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Courses</h1>
        <p className="text-gray-600 mt-2">Learn industry-relevant skills from top instructors</p>
      </div>
      {courses.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <BookOpen className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>No courses available right now. Check back soon!</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Link key={course.id} href={`/courses/${course.slug}`} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow group">
              <div className="h-40 bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                <BookOpen className="w-12 h-12 text-white/80" />
              </div>
              <div className="p-5">
                <span className="text-xs font-medium text-blue-600">{course.category}</span>
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 mt-1 line-clamp-2">{course.title}</h3>
                <p className="text-sm text-gray-500 mt-1">by {course.instructor}</p>
                <div className="flex items-center gap-3 mt-3 text-sm text-gray-500">
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{course.duration}</span>
                  <span className="flex items-center gap-1"><Star className="w-4 h-4 text-yellow-500" />{course.rating}</span>
                  <span className="flex items-center gap-1"><Users className="w-4 h-4" />{course.enrolled}</span>
                </div>
                <div className="flex items-center justify-between mt-4 pt-4 border-t">
                  <span className="text-lg font-bold text-gray-900">{course.price === 0 ? "Free" : `₹${course.price}`}</span>
                  <span className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded-full capitalize">{course.level}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
