"use client";

import Link from "next/link";
import { useState } from "react";

type Course = {
  id: string; title: string; slug: string; category: string;
  description: string; duration: string; level: string;
  price: number; thumbnail: string | null; instructor: string;
  enrolled: number; rating: number; skills: string | null;
  isActive: boolean; featured: boolean;
  syllabus: string | null;
  createdAt: Date; updatedAt: Date;
};

const categories = [
  { name: "All", icon: "fa-layer-group" },
  { name: "Web Development", icon: "fa-code" },
  { name: "AI & ML", icon: "fa-brain" },
  { name: "Cybersecurity", icon: "fa-shield-halved" },
  { name: "Data Science", icon: "fa-chart-bar" },
  { name: "Cloud", icon: "fa-cloud" },
  { name: "Mobile", icon: "fa-mobile-screen" },
];

export default function CoursesClient({ courses }: { courses: Course[] }) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = courses.filter((c) => {
    const matchSearch = !search || c.title.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === "All" || c.category.toLowerCase().includes(activeCategory.toLowerCase());
    return matchSearch && matchCat;
  });

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-blue-50 py-12 md:py-16">
        <div className="absolute top-8 right-16 w-24 h-24 border-2 border-indigo-200/30 rounded-full"></div>
        <div className="absolute bottom-8 left-16 w-16 h-16 border-2 border-blue-200/30 rounded-full"></div>
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-[#1a73e8] px-3 py-1.5 rounded-full text-xs font-semibold mb-4">
              <i className="fa-solid fa-graduation-cap text-xs"></i>
              Learn from industry experts
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
              Explore <span className="text-[#1a73e8]">Courses</span>
            </h1>
            <p className="text-gray-500 mb-6">
              Handpicked courses to kickstart your career in tech. From beginner to advanced.
            </p>
            <div className="relative max-w-md">
              <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search courses..."
                className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1a73e8]/30 focus:border-[#1a73e8]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center gap-2 overflow-x-auto scroll-container pb-2">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(cat.name)}
              className={`category-pill ${activeCategory === cat.name ? "active" : ""}`}
            >
              <i className={`fa-solid ${cat.icon} text-xs`}></i>
              {cat.name}
            </button>
          ))}
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Showing <span className="font-bold text-gray-900">{filtered.length}</span> courses
        </p>
      </div>

      {/* Course Cards */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((course) => (
            <Link key={course.id} href={`/courses/${course.slug}`} className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow group">
              <div className="h-40 bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center relative overflow-hidden">
                {course.thumbnail ? (
                  <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                ) : (
                  <i className="fa-solid fa-graduation-cap text-5xl text-[#1a73e8]/20"></i>
                )}
                <div className="absolute top-3 left-3">
                  <span className="text-[10px] font-bold bg-white/90 backdrop-blur-sm text-[#1a73e8] px-2 py-1 rounded-full">{course.category}</span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${course.level === "beginner" ? "bg-green-100 text-green-700" : course.level === "intermediate" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}>
                    {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-900 mb-1 line-clamp-2 group-hover:text-[#1a73e8] transition-colors">{course.title}</h3>
                <p className="text-sm text-gray-500 line-clamp-2 mb-3">{course.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    {course.duration && (
                      <span className="flex items-center gap-1">
                        <i className="fa-regular fa-clock"></i> {course.duration}
                      </span>
                    )}
                    {course.instructor && (
                      <span className="flex items-center gap-1">
                        <i className="fa-solid fa-user"></i> {course.instructor}
                      </span>
                    )}
                  </div>
                  {course.price > 0 && (
                    <span className="text-sm font-bold text-gray-900">₹{course.price}</span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-16">
            <i className="fa-solid fa-search text-4xl text-gray-200 mb-4"></i>
            <p className="text-gray-500">No courses found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
