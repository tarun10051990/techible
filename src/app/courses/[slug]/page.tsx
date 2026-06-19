import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { BookOpen, Clock, Star, Users, ArrowLeft, CheckCircle } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = await prisma.course.findUnique({ where: { slug } });
  if (!course) notFound();

  const syllabusItems = course.syllabus ? course.syllabus.split("\n").filter(Boolean) : [];
  const skills = course.skills ? course.skills.split(",").map((s) => s.trim()) : [];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link href="/courses" className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to Courses
      </Link>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="h-48 bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
          <BookOpen className="w-16 h-16 text-white/80" />
        </div>
        <div className="p-8">
          <span className="text-sm font-medium text-blue-600">{course.category}</span>
          <h1 className="text-2xl font-bold text-gray-900 mt-1">{course.title}</h1>
          <p className="text-gray-600 mt-1">by {course.instructor}</p>

          <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-600">
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{course.duration}</span>
            <span className="flex items-center gap-1"><Star className="w-4 h-4 text-yellow-500" />{course.rating} rating</span>
            <span className="flex items-center gap-1"><Users className="w-4 h-4" />{course.enrolled} enrolled</span>
            <span className="px-2 py-0.5 text-xs bg-gray-100 rounded-full capitalize">{course.level}</span>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg flex items-center justify-between">
            <span className="text-2xl font-bold text-gray-900">{course.price === 0 ? "Free" : `₹${course.price}`}</span>
            <Link href="/login" className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
              Enroll Now
            </Link>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">About this Course</h3>
            <div className="text-gray-700 whitespace-pre-wrap">{course.description}</div>
          </div>

          {syllabusItems.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Syllabus</h3>
              <div className="space-y-2">
                {syllabusItems.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-gray-700">
                    <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {skills.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Skills You Will Learn</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span key={skill} className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full">{skill}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
