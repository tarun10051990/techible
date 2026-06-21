import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [users, internships, courses, colleges, mentors, events, posts, tickets] = await Promise.all([
    prisma.user.count(),
    prisma.internship.count(),
    prisma.course.count(),
    prisma.college.count(),
    prisma.mentor.count(),
    prisma.event.count(),
    prisma.post.count(),
    prisma.supportTicket.count(),
  ]);

  const stats = [
    { label: "Users", value: users, icon: "fa-users", color: "text-blue-500", bg: "bg-blue-50", href: "/admin/users" },
    { label: "Internships", value: internships, icon: "fa-briefcase", color: "text-purple-500", bg: "bg-purple-50", href: "/admin/internships" },
    { label: "Courses", value: courses, icon: "fa-graduation-cap", color: "text-green-500", bg: "bg-green-50", href: "/admin/courses" },
    { label: "Colleges", value: colleges, icon: "fa-building-columns", color: "text-indigo-500", bg: "bg-indigo-50", href: "/admin/colleges" },
    { label: "Mentors", value: mentors, icon: "fa-chalkboard-user", color: "text-orange-500", bg: "bg-orange-50", href: "/admin/mentors" },
    { label: "Events", value: events, icon: "fa-calendar-days", color: "text-pink-500", bg: "bg-pink-50", href: "/admin/events" },
    { label: "Posts", value: posts, icon: "fa-newspaper", color: "text-teal-500", bg: "bg-teal-50", href: "/admin/posts" },
    { label: "Support Tickets", value: tickets, icon: "fa-headset", color: "text-red-500", bg: "bg-red-50", href: "/admin/support" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500">Overview of your Techible platform</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 ${s.bg} rounded-xl flex items-center justify-center`}>
                <i className={`fa-solid ${s.icon} ${s.color}`}></i>
              </div>
              <i className="fa-solid fa-arrow-right text-gray-300 text-xs"></i>
            </div>
            <p className="text-2xl font-extrabold text-gray-900">{s.value}</p>
            <p className="text-xs font-semibold text-gray-400">{s.label}</p>
          </Link>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <i className="fa-solid fa-bolt text-[#1a73e8]"></i> Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <Link href="/admin/internships" className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-blue-50 transition-colors">
              <i className="fa-solid fa-plus text-[#1a73e8] text-xs"></i>
              <span className="text-sm font-medium text-gray-700">Add Internship</span>
            </Link>
            <Link href="/admin/courses" className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-blue-50 transition-colors">
              <i className="fa-solid fa-plus text-[#1a73e8] text-xs"></i>
              <span className="text-sm font-medium text-gray-700">Add Course</span>
            </Link>
            <Link href="/admin/events" className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-blue-50 transition-colors">
              <i className="fa-solid fa-plus text-[#1a73e8] text-xs"></i>
              <span className="text-sm font-medium text-gray-700">Add Event</span>
            </Link>
            <Link href="/admin/posts" className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-blue-50 transition-colors">
              <i className="fa-solid fa-plus text-[#1a73e8] text-xs"></i>
              <span className="text-sm font-medium text-gray-700">Add Post</span>
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <i className="fa-solid fa-info-circle text-[#1a73e8]"></i> Platform Info
          </h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Platform</span>
              <span className="font-semibold text-gray-900">Techible</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Version</span>
              <span className="font-semibold text-gray-900">1.0.0</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Framework</span>
              <span className="font-semibold text-gray-900">Next.js</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Database</span>
              <span className="font-semibold text-gray-900">SQLite</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
