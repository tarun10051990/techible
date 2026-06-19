"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Briefcase, BookOpen, GraduationCap, Users,
  UserCheck, Calendar, MessageSquare, School, FileText, Settings,
  HeadphonesIcon, Shield,
} from "lucide-react";

const links = [
  { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/internships", icon: Briefcase, label: "Internships" },
  { href: "/admin/courses", icon: BookOpen, label: "Courses" },
  { href: "/admin/colleges", icon: GraduationCap, label: "Colleges" },
  { href: "/admin/faculty", icon: Users, label: "Faculty" },
  { href: "/admin/mentors", icon: UserCheck, label: "Mentors" },
  { href: "/admin/events", icon: Calendar, label: "Events" },
  { href: "/admin/posts", icon: MessageSquare, label: "Posts" },
  { href: "/admin/summer-schools", icon: School, label: "Summer Schools" },
  { href: "/admin/pages", icon: FileText, label: "Pages" },
  { href: "/admin/users", icon: Shield, label: "Users" },
  { href: "/admin/support", icon: HeadphonesIcon, label: "Support" },
  { href: "/admin/settings", icon: Settings, label: "Settings" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 bg-white border-r border-gray-200 shrink-0">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2">
          <Shield className="w-4 h-4 text-blue-600" /> Admin Panel
        </h2>
      </div>
      <nav className="p-2 space-y-0.5">
        {links.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors ${
                active ? "bg-blue-50 text-blue-700 font-medium" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <link.icon className="w-4 h-4" />
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
