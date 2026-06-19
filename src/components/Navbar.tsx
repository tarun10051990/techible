"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import {
  Search,
  Menu,
  X,
  ChevronDown,
  Briefcase,
  FolderOpen,
  BookOpen,
  GraduationCap,
  Users,
  UserCheck,
  Calendar,
  MessageSquare,
  LogOut,
  User,
  Shield,
} from "lucide-react";
import SearchModal from "./SearchModal";

interface NavUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [user, setUser] = useState<NavUser | null>(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const exploreRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/auth")
      .then((r) => r.json())
      .then((data) => {
        if (data.user) setUser(data.user);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (exploreRef.current && !exploreRef.current.contains(e.target as Node)) {
        setExploreOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  async function handleLogout() {
    await fetch("/api/auth", { method: "DELETE" });
    setUser(null);
    setUserMenuOpen(false);
    window.location.href = "/";
  }

  const exploreItems = [
    {
      heading: "Opportunities",
      subtitle: "Your next big role",
      links: [
        { href: "/internships", icon: Briefcase, label: "Skill Internships", desc: "Work with top companies" },
        { href: "/projects", icon: FolderOpen, label: "Project Internships", desc: "Build real-world projects" },
        { href: "/courses", icon: BookOpen, label: "Courses", desc: "Learn industry skills" },
      ],
    },
    {
      heading: "Institutes",
      subtitle: "Top academic institutions",
      links: [
        { href: "/colleges", icon: GraduationCap, label: "All Institutes", desc: "IITs, NITs & more" },
        { href: "/faculty", icon: Users, label: "Faculties", desc: "Connect with researchers" },
      ],
    },
    {
      heading: "Community",
      subtitle: "Connect & grow together",
      links: [
        { href: "/mentors", icon: UserCheck, label: "Mentors", desc: "Expert career guidance" },
        { href: "/events", icon: Calendar, label: "Events", desc: "Hackathons & workshops" },
        { href: "/posts", icon: MessageSquare, label: "Posts", desc: "Share your knowledge" },
      ],
    },
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-6">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">T</span>
                </div>
                <span className="text-xl font-bold text-gray-900">Techible</span>
              </Link>

              <div className="hidden md:block relative" ref={exploreRef}>
                <button
                  onClick={() => setExploreOpen(!exploreOpen)}
                  className="flex items-center gap-1 text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  Explore
                  <ChevronDown className={`w-4 h-4 transition-transform ${exploreOpen ? "rotate-180" : ""}`} />
                </button>

                {exploreOpen && (
                  <div className="absolute top-full left-0 mt-2 w-[600px] bg-white rounded-xl shadow-xl border border-gray-200 p-6 grid grid-cols-3 gap-6">
                    {exploreItems.map((section) => (
                      <div key={section.heading}>
                        <h3 className="font-semibold text-gray-900 mb-1">{section.heading}</h3>
                        <p className="text-xs text-gray-500 mb-3">{section.subtitle}</p>
                        <div className="space-y-2">
                          {section.links.map((link) => (
                            <Link
                              key={link.href}
                              href={link.href}
                              onClick={() => setExploreOpen(false)}
                              className="flex items-start gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors group"
                            >
                              <link.icon className="w-4 h-4 mt-0.5 text-gray-400 group-hover:text-blue-600" />
                              <div>
                                <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600">{link.label}</p>
                                <p className="text-xs text-gray-500">{link.desc}</p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                    <div className="col-span-3 border-t pt-4 mt-2 flex justify-between text-sm text-gray-500">
                      <span>500+ Active Internships</span>
                      <span>50+ Top Institutes</span>
                      <span>200+ Expert Mentors</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <button
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-500 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Search className="w-4 h-4" />
                <span>Search</span>
                <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-xs bg-white rounded border border-gray-300 font-mono">
                  Ctrl+K
                </kbd>
              </button>

              {user ? (
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-medium text-sm">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <ChevronDown className="w-3 h-3 text-gray-500" />
                  </button>
                  {userMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-200 py-2">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                      {user.role === "admin" && (
                        <Link
                          href="/admin"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          <Shield className="w-4 h-4" />
                          Admin Panel
                        </Link>
                      )}
                      <Link
                        href="/profile"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <User className="w-4 h-4" />
                        Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <LogOut className="w-4 h-4" />
                        Log Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Log In
                </Link>
              )}

              <Link
                href="/create-event"
                className="px-3 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
              >
                + Host
              </Link>
              <Link
                href="/for-business"
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
              >
                For Business
              </Link>
            </div>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 px-4 py-4 space-y-4">
            <button
              onClick={() => {
                setSearchOpen(true);
                setMobileOpen(false);
              }}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-500 bg-gray-100 rounded-lg"
            >
              <Search className="w-4 h-4" />
              Search
            </button>
            {exploreItems.map((section) => (
              <div key={section.heading}>
                <h3 className="font-semibold text-gray-900 text-sm mb-2">{section.heading}</h3>
                {section.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
                  >
                    <link.icon className="w-4 h-4 text-gray-400" />
                    {link.label}
                  </Link>
                ))}
              </div>
            ))}
            <div className="border-t pt-4 space-y-2">
              {user ? (
                <>
                  {user.role === "admin" && (
                    <Link href="/admin" onClick={() => setMobileOpen(false)} className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
                      Admin Panel
                    </Link>
                  )}
                  <button onClick={handleLogout} className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg">
                    Log Out
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full text-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg"
                >
                  Log In
                </Link>
              )}
              <Link
                href="/create-event"
                onClick={() => setMobileOpen(false)}
                className="block text-center px-3 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg"
              >
                + Host Event
              </Link>
              <Link
                href="/for-business"
                onClick={() => setMobileOpen(false)}
                className="block text-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600"
              >
                For Business
              </Link>
            </div>
          </div>
        )}
      </nav>
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
