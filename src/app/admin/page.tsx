import { prisma } from "@/lib/prisma";
import { Briefcase, BookOpen, GraduationCap, UserCheck, Calendar, MessageSquare, Users, HeadphonesIcon } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [internships, courses, colleges, mentors, events, posts, users, tickets] = await Promise.all([
    prisma.internship.count(),
    prisma.course.count(),
    prisma.college.count(),
    prisma.mentor.count(),
    prisma.event.count(),
    prisma.post.count(),
    prisma.user.count(),
    prisma.supportTicket.count({ where: { status: { not: "resolved" } } }),
  ]);

  const stats = [
    { label: "Internships", count: internships, icon: Briefcase, color: "bg-blue-100 text-blue-600" },
    { label: "Courses", count: courses, icon: BookOpen, color: "bg-purple-100 text-purple-600" },
    { label: "Colleges", count: colleges, icon: GraduationCap, color: "bg-indigo-100 text-indigo-600" },
    { label: "Mentors", count: mentors, icon: UserCheck, color: "bg-green-100 text-green-600" },
    { label: "Events", count: events, icon: Calendar, color: "bg-orange-100 text-orange-600" },
    { label: "Posts", count: posts, icon: MessageSquare, color: "bg-teal-100 text-teal-600" },
    { label: "Users", count: users, icon: Users, color: "bg-pink-100 text-pink-600" },
    { label: "Open Tickets", count: tickets, icon: HeadphonesIcon, color: "bg-red-100 text-red-600" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stat.count}</p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Add Internship", href: "/admin/internships" },
            { label: "Add Course", href: "/admin/courses" },
            { label: "Add College", href: "/admin/colleges" },
            { label: "Add Mentor", href: "/admin/mentors" },
            { label: "Add Event", href: "/admin/events" },
            { label: "Add Post", href: "/admin/posts" },
            { label: "Add Summer School", href: "/admin/summer-schools" },
            { label: "Manage Users", href: "/admin/users" },
          ].map((action) => (
            <a key={action.label} href={action.href} className="px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm font-medium text-gray-700 text-center transition-colors">
              {action.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
