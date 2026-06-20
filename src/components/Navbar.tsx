"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import SearchModal from "./SearchModal";

export default function Navbar() {
  const [exploreOpen, setExploreOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; role: string } | null>(null);
  const exploreRef = useRef<HTMLDivElement>(null);
  const [placeholder, setPlaceholder] = useState("Search internships, courses...");

  const placeholders = [
    "IIT Jammu research",
    "AI/ML mentors",
    "startup events in Bangalore",
    "IISc research opportunities",
    "Python internships",
    "Data Science courses",
  ];

  useEffect(() => {
    let idx = 0;
    const interval = setInterval(() => {
      idx = (idx + 1) % placeholders.length;
      setPlaceholder(placeholders[idx]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetch("/api/auth").then(r => r.json()).then(d => { if (d.user) setUser(d.user); }).catch(() => {});
  }, []);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); setSearchOpen(true); }
    }
    function handleClickOutside(e: MouseEvent) {
      if (exploreRef.current && !exploreRef.current.contains(e.target as Node)) setExploreOpen(false);
    }
    window.addEventListener("keydown", handleKey);
    document.addEventListener("mousedown", handleClickOutside);
    return () => { window.removeEventListener("keydown", handleKey); document.removeEventListener("mousedown", handleClickOutside); };
  }, []);

  async function handleLogout() {
    await fetch("/api/auth", { method: "DELETE" });
    setUser(null);
    window.location.href = "/";
  }

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 bg-[#1a73e8] rounded-lg flex items-center justify-center">
              <i className="fa-solid fa-arrow-up-right-dots text-white text-sm"></i>
            </div>
            <span className="text-xl font-extrabold text-[#1a73e8]">Techible</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-3 flex-1">
            {/* Explore dropdown */}
            <div className="relative" ref={exploreRef}>
              <button
                onClick={() => setExploreOpen(!exploreOpen)}
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-gray-700 hover:text-[#1a73e8] rounded-full transition-colors"
              >
                <i className="fa-solid fa-pen-nib text-[#1a73e8] text-xs"></i>
                Explore
                <i className={`fa-solid fa-chevron-down text-[10px] text-gray-400 transition-transform ${exploreOpen ? "rotate-180" : ""}`}></i>
              </button>
              {exploreOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-3 z-50">
                  <div className="px-4 py-1">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Opportunities</p>
                    <Link href="/internships" onClick={() => setExploreOpen(false)} className="block py-1.5 text-sm text-gray-700 hover:text-[#1a73e8]">Skill Based Internships</Link>
                    <Link href="/projects" onClick={() => setExploreOpen(false)} className="block py-1.5 text-sm text-gray-700 hover:text-[#1a73e8]">Project Based Internships</Link>
                    <Link href="/courses" onClick={() => setExploreOpen(false)} className="block py-1.5 text-sm text-gray-700 hover:text-[#1a73e8]">Courses</Link>
                  </div>
                  <div className="border-t border-gray-100 mt-1 pt-1 px-4">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Institutes</p>
                    <Link href="/colleges" onClick={() => setExploreOpen(false)} className="block py-1.5 text-sm text-gray-700 hover:text-[#1a73e8]">Institutes</Link>
                    <Link href="/faculty" onClick={() => setExploreOpen(false)} className="block py-1.5 text-sm text-gray-700 hover:text-[#1a73e8]">Faculties</Link>
                  </div>
                  <div className="border-t border-gray-100 mt-1 pt-1 px-4">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Community</p>
                    <Link href="/mentors" onClick={() => setExploreOpen(false)} className="block py-1.5 text-sm text-gray-700 hover:text-[#1a73e8]">Mentors</Link>
                    <Link href="/events" onClick={() => setExploreOpen(false)} className="block py-1.5 text-sm text-gray-700 hover:text-[#1a73e8]">Events</Link>
                    <Link href="/posts" onClick={() => setExploreOpen(false)} className="block py-1.5 text-sm text-gray-700 hover:text-[#1a73e8]">Posts</Link>
                  </div>
                </div>
              )}
            </div>

            {/* Search bar */}
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 flex-1 max-w-md px-4 py-2 bg-slate-50 rounded-full text-sm text-gray-400 hover:bg-slate-100 transition-colors"
            >
              <i className="fa-solid fa-magnifying-glass text-gray-400 text-xs"></i>
              <span className="truncate">{placeholder}</span>
              <kbd className="ml-auto text-[11px] bg-white border border-gray-200 rounded px-1.5 py-0.5 font-mono text-gray-400">⌘K</kbd>
            </button>
          </div>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-2">
            {user ? (
              <>
                {user.role === "admin" && (
                  <Link href="/admin" className="px-4 py-2 text-sm font-semibold text-gray-600 hover:text-[#1a73e8]">
                    Admin
                  </Link>
                )}
                <span className="text-sm font-semibold text-gray-700">{user.name}</span>
                <button onClick={handleLogout} className="px-4 py-2 text-sm font-semibold text-gray-600 hover:text-red-500">
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="px-5 py-2 bg-[#1a73e8] text-white text-sm font-bold rounded-full hover:bg-[#1557b0] transition-colors"
              >
                Login
              </Link>
            )}
            <Link href="/create-event" className="px-4 py-2 text-sm font-semibold text-gray-600 border border-gray-200 rounded-full hover:border-gray-400 transition-colors">
              + Host
            </Link>
            <Link
              href="/for-business"
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-bold text-[#92400e] border-2 border-[#f59e0b] rounded-full hover:bg-[#fef3c7] transition-colors"
            >
              <i className="fa-solid fa-briefcase text-[#f59e0b] text-xs"></i>
              For Business
            </Link>
          </div>

          {/* Mobile menu button */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2">
            <i className={`fa-solid ${mobileOpen ? "fa-xmark" : "fa-bars"} text-lg text-gray-700`}></i>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4">
            <button onClick={() => setSearchOpen(true)} className="w-full flex items-center gap-2 px-4 py-2.5 bg-slate-50 rounded-full text-sm text-gray-400 mb-4">
              <i className="fa-solid fa-magnifying-glass"></i> Search...
            </button>
            <nav className="space-y-1">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider px-2 pt-2">Opportunities</p>
              <Link href="/internships" className="block px-2 py-2 text-sm font-medium text-gray-700">Skill Based Internships</Link>
              <Link href="/projects" className="block px-2 py-2 text-sm font-medium text-gray-700">Project Based Internships</Link>
              <Link href="/courses" className="block px-2 py-2 text-sm font-medium text-gray-700">Courses</Link>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider px-2 pt-2">Institutes</p>
              <Link href="/colleges" className="block px-2 py-2 text-sm font-medium text-gray-700">Institutes</Link>
              <Link href="/faculty" className="block px-2 py-2 text-sm font-medium text-gray-700">Faculties</Link>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider px-2 pt-2">Community</p>
              <Link href="/mentors" className="block px-2 py-2 text-sm font-medium text-gray-700">Mentors</Link>
              <Link href="/events" className="block px-2 py-2 text-sm font-medium text-gray-700">Events</Link>
              <Link href="/posts" className="block px-2 py-2 text-sm font-medium text-gray-700">Posts</Link>
            </nav>
            <div className="border-t border-gray-100 mt-4 pt-4 space-y-2">
              {user ? (
                <button onClick={handleLogout} className="w-full py-2.5 text-sm font-bold text-red-500 border border-red-200 rounded-full">Logout</button>
              ) : (
                <Link href="/login" className="block w-full py-2.5 text-center text-sm font-bold text-white bg-[#1a73e8] rounded-full">Log In / Sign Up</Link>
              )}
            </div>
          </div>
        )}
      </header>
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
