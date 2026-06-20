import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = await prisma.course.findUnique({ where: { slug } });
  if (!course) notFound();

  const syllabusItems = course.syllabus ? course.syllabus.split("\n").filter(Boolean) : [];
  const skills = course.skills ? course.skills.split(",").map((s) => s.trim()) : [];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link href="/courses" className="inline-flex items-center gap-2 text-sm font-semibold text-[#1a73e8] hover:underline mb-6">
          <i className="fa-solid fa-arrow-left text-xs"></i> Back to Courses
        </Link>

        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="h-48 bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center relative">
            <i className="fa-solid fa-graduation-cap text-6xl text-white/20"></i>
            <div className="absolute top-4 left-4">
              <span className="text-xs font-bold bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full">{course.category}</span>
            </div>
          </div>
          <div className="p-8">
            <h1 className="text-2xl font-extrabold text-gray-900">{course.title}</h1>
            <p className="text-gray-500 mt-1">by {course.instructor}</p>

            <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-500">
              <span className="flex items-center gap-1.5"><i className="fa-regular fa-clock text-xs"></i> {course.duration}</span>
              <span className="flex items-center gap-1.5"><i className="fa-solid fa-star text-yellow-400 text-xs"></i> {course.rating} rating</span>
              <span className="flex items-center gap-1.5"><i className="fa-solid fa-users text-xs"></i> {course.enrolled} enrolled</span>
              <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${course.level === "beginner" ? "bg-green-50 text-green-600" : course.level === "intermediate" ? "bg-yellow-50 text-yellow-600" : "bg-red-50 text-red-600"}`}>
                {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
              </span>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-xl flex items-center justify-between">
              <span className="text-2xl font-extrabold text-gray-900">{course.price === 0 ? "Free" : `₹${course.price}`}</span>
              <Link href="/login" className="px-6 py-2.5 bg-[#1a73e8] text-white font-bold rounded-full hover:bg-[#1557b0] transition-colors">
                Enroll Now
              </Link>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <i className="fa-solid fa-book-open text-[#1a73e8]"></i> About this Course
              </h3>
              <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">{course.description}</div>
            </div>

            {syllabusItems.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <i className="fa-solid fa-list-ol text-[#1a73e8]"></i> Syllabus
                </h3>
                <div className="space-y-2">
                  {syllabusItems.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm text-gray-700 bg-gray-50 rounded-lg px-4 py-2.5">
                      <i className="fa-solid fa-circle-check text-green-500 text-xs"></i>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {skills.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <i className="fa-solid fa-code text-[#1a73e8]"></i> Skills You Will Learn
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span key={skill} className="px-3 py-1.5 text-xs font-semibold bg-gray-100 text-gray-700 rounded-full">{skill}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
