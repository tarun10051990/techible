"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: "fa-gauge-high" },
  { href: "/admin/internships", label: "Internships", icon: "fa-briefcase" },
  { href: "/admin/courses", label: "Courses", icon: "fa-graduation-cap" },
  { href: "/admin/colleges", label: "Colleges", icon: "fa-building-columns" },
  { href: "/admin/faculty", label: "Faculty", icon: "fa-flask" },
  { href: "/admin/mentors", label: "Mentors", icon: "fa-chalkboard-user" },
  { href: "/admin/events", label: "Events", icon: "fa-calendar-days" },
  { href: "/admin/posts", label: "Posts", icon: "fa-newspaper" },
  { href: "/admin/summer-schools", label: "Summer Schools", icon: "fa-school" },
  { href: "/admin/pages", label: "Pages", icon: "fa-file-lines" },
  { href: "/admin/users", label: "Users", icon: "fa-users" },
  { href: "/admin/support", label: "Support", icon: "fa-headset" },
  { href: "/admin/settings", label: "Settings", icon: "fa-gear" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-60 bg-white border-r border-gray-100 min-h-screen shrink-0">
      <div className="p-4 border-b border-gray-100">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#1a73e8] rounded-lg flex items-center justify-center">
            <i className="fa-solid fa-arrow-up-right-dots text-white text-sm"></i>
          </div>
          <div>
            <span className="text-sm font-extrabold text-[#1a73e8]">Techible</span>
            <p className="text-[10px] text-gray-400 font-semibold">Admin Panel</p>
          </div>
        </Link>
      </div>
      <nav className="p-3 space-y-0.5">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                isActive
                  ? "bg-[#1a73e8] text-white"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <i className={`fa-solid ${item.icon} text-xs w-4 text-center`}></i>
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 mt-4 border-t border-gray-100">
        <Link href="/" className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#1a73e8] transition-colors">
          <i className="fa-solid fa-arrow-left text-xs"></i> Back to Site
        </Link>
      </div>
    </aside>
  );
}
