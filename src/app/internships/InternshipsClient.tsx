"use client";

import Link from "next/link";
import { useState } from "react";

type Internship = {
  id: string; title: string; slug: string; company: string; location: string;
  type: string; mode: string; stipend: string | null; duration: string;
  description: string; companyLogo: string | null; requirements: string | null;
  skills: string; openings: number; deadline: Date | null;
  isActive: boolean; featured: boolean;
  createdAt: Date; updatedAt: Date;
};

const categories = [
  { name: "All", icon: "fa-layer-group" },
  { name: "Software Dev", icon: "fa-code" },
  { name: "Cybersecurity", icon: "fa-shield-halved" },
  { name: "Data Science", icon: "fa-chart-bar" },
  { name: "Marketing", icon: "fa-bullhorn" },
  { name: "Finance", icon: "fa-coins" },
  { name: "Design", icon: "fa-palette" },
];

const trendingTags = ["Python", "Legal Research", "Data Science", "UI/UX Design", "Finance"];

export default function InternshipsClient({ internships }: { internships: Internship[] }) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const PER_PAGE = 8;
  const [page, setPage] = useState(1);

  const filtered = internships.filter((i) => {
    const matchSearch = !search || i.title.toLowerCase().includes(search.toLowerCase()) || i.company.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === "All" || i.skills.toLowerCase().includes(activeCategory.toLowerCase()) || i.type.toLowerCase().includes(activeCategory.toLowerCase());
    return matchSearch && matchCat;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-orange-50 py-12 md:py-16">
        {/* Decorative shapes */}
        <div className="absolute top-8 left-8 w-20 h-20 border-2 border-blue-200/40 rounded-full"></div>
        <div className="absolute top-20 right-20 w-4 h-4 bg-blue-300/30 rounded-full"></div>
        <div className="absolute bottom-10 left-20 w-3 h-3 bg-orange-300/40 rounded-full"></div>
        <div className="absolute top-12 right-40 text-blue-200/30 text-4xl">+</div>

        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-green-50 text-green-600 px-3 py-1.5 rounded-full text-xs font-semibold mb-4">
                <i className="fa-solid fa-circle text-[5px] animate-pulse"></i>
                Live internships &middot; updated daily
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
                Find your <span className="text-[#1a73e8]">First Big<br />Break</span>
              </h1>
              <p className="text-gray-500 mb-6 max-w-md">
                Curated internships from India&apos;s top research labs and colleges — built exclusively for students.
              </p>

              {/* Search */}
              <div className="relative max-w-md mb-3">
                <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                  placeholder='Try "Python", "Legal Intern", "Data Science"...'
                  className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1a73e8]/30 focus:border-[#1a73e8]"
                />
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-gray-400">Trending:</span>
                {trendingTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => { setSearch(tag); setPage(1); }}
                    className="text-xs px-3 py-1 rounded-full border border-gray-200 text-gray-600 hover:border-[#1a73e8] hover:text-[#1a73e8] transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Right side floating category pills */}
            <div className="hidden md:block relative h-64">
              <div className="absolute top-2 left-8 bg-white rounded-full shadow-md px-4 py-2 text-sm font-semibold text-gray-700 flex items-center gap-2">
                <i className="fa-solid fa-code text-blue-500"></i> Software Development
              </div>
              <div className="absolute top-0 right-12 bg-white rounded-full shadow-md px-4 py-2 text-sm font-semibold text-gray-700 flex items-center gap-2">
                <i className="fa-solid fa-chart-bar text-purple-500"></i> Data Science
              </div>
              <div className="absolute top-16 left-24 bg-white rounded-full shadow-md px-4 py-2 text-sm font-semibold text-gray-700 flex items-center gap-2">
                <i className="fa-solid fa-flask text-green-500"></i> Clinical Research
              </div>
              <div className="absolute top-14 right-0 bg-white rounded-full shadow-md px-4 py-2 text-sm font-semibold text-gray-700 flex items-center gap-2">
                <i className="fa-solid fa-gavel text-orange-500"></i> Corporate Law
              </div>
              <div className="absolute top-32 left-12 bg-white rounded-full shadow-md px-4 py-2 text-sm font-semibold text-gray-700 flex items-center gap-2">
                <i className="fa-solid fa-shield-halved text-cyan-500"></i> Cybersecurity
              </div>
              <div className="absolute top-40 right-8 bg-white rounded-full shadow-md px-4 py-2 text-sm font-semibold text-gray-700 flex items-center gap-2">
                <i className="fa-solid fa-chart-line text-pink-500"></i> Marketing &amp; Strategy
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter Bar */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center gap-2 overflow-x-auto scroll-container pb-2">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => { setActiveCategory(cat.name); setPage(1); }}
              className={`category-pill ${activeCategory === cat.name ? "active" : ""}`}
            >
              <i className={`fa-solid ${cat.icon} text-xs`}></i>
              {cat.name}
            </button>
          ))}
          <div className="ml-auto flex items-center gap-2 shrink-0">
            <button
              onClick={() => setViewMode("grid")}
              title="Grid view"
              className={`w-8 h-8 rounded flex items-center justify-center ${viewMode === "grid" ? "bg-[#1a73e8] text-white" : "bg-gray-100 text-gray-500"}`}
            >
              <i className="fa-solid fa-grip text-xs"></i>
            </button>
            <button
              onClick={() => setViewMode("list")}
              title="List view"
              className={`w-8 h-8 rounded flex items-center justify-center ${viewMode === "list" ? "bg-[#1a73e8] text-white" : "bg-gray-100 text-gray-500"}`}
            >
              <i className="fa-solid fa-list text-xs"></i>
            </button>
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Showing <span className="font-bold text-gray-900">{paginated.length}</span> of {filtered.length} internships
        </p>
      </div>

      {/* Internship Cards */}
      <div className="max-w-7xl mx-auto px-4 pb-8">
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {paginated.map((item) => (
              <div key={item.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-32 bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center relative">
                  <i className="fa-solid fa-briefcase text-3xl text-[#1a73e8]/30"></i>
                  <div className="absolute bottom-2 left-3 flex items-center gap-1 text-xs text-gray-500">
                    <div className="w-5 h-5 bg-[#1a73e8] rounded flex items-center justify-center">
                      <i className="fa-solid fa-arrow-up-right-dots text-white text-[8px]"></i>
                    </div>
                    <span className="font-semibold text-gray-600">Reviewed by Techible</span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-sm text-gray-900 mb-1 line-clamp-2">{item.title}</h3>
                  <div className="flex items-center gap-2 flex-wrap mt-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-50 text-blue-600 rounded">
                      {item.type === "onsite" ? "Offline" : item.type === "remote" ? "Online" : "Hybrid"}
                    </span>
                    {item.stipend && <span className="text-[10px] font-bold px-2 py-0.5 bg-green-50 text-green-600 rounded">Paid</span>}
                    {item.duration && <span className="text-[10px] font-bold px-2 py-0.5 bg-gray-50 text-gray-500 rounded">{item.duration}</span>}
                  </div>
                  {item.stipend && <p className="text-sm font-bold text-gray-900 mt-2">{item.stipend}</p>}
                  <Link href={`/internships/${item.slug}`} className="block mt-3 text-center py-2 text-sm font-bold text-[#1a73e8] border border-[#1a73e8] rounded-lg hover:bg-[#1a73e8] hover:text-white transition-colors">
                    Apply Now &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {paginated.map((item) => (
              <Link key={item.id} href={`/internships/${item.slug}`} className="flex items-center gap-4 bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                  <i className="fa-solid fa-briefcase text-[#1a73e8]"></i>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-sm text-gray-900">{item.title}</h3>
                  <p className="text-xs text-gray-500">{item.company} &middot; {item.location}</p>
                  <div className="flex gap-2 mt-1">
                    <span className="text-[10px] font-bold px-1.5 py-0.5 bg-blue-50 text-blue-600 rounded">{item.type === "onsite" ? "ON-SITE" : item.type === "remote" ? "REMOTE" : "HYBRID"}</span>
                    {item.stipend && <span className="text-[10px] font-bold px-1.5 py-0.5 bg-green-50 text-green-600 rounded">PAID</span>}
                  </div>
                </div>
                <i className="fa-solid fa-arrow-right text-gray-300 text-sm"></i>
              </Link>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="flex items-center gap-1 px-3 py-2 text-sm font-semibold text-gray-600 border border-gray-200 rounded-lg disabled:opacity-40 hover:bg-gray-50"
            >
              <i className="fa-solid fa-chevron-left text-xs"></i> Prev
            </button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const p = i + 1;
              return (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-9 h-9 rounded-lg text-sm font-bold ${page === p ? "bg-[#1a73e8] text-white" : "text-gray-600 hover:bg-gray-50"}`}
                >
                  {p}
                </button>
              );
            })}
            {totalPages > 5 && <span className="text-gray-400">...</span>}
            {totalPages > 5 && (
              <button onClick={() => setPage(totalPages)} className={`w-9 h-9 rounded-lg text-sm font-bold ${page === totalPages ? "bg-[#1a73e8] text-white" : "text-gray-600 hover:bg-gray-50"}`}>
                {totalPages}
              </button>
            )}
            <button
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              className="flex items-center gap-1 px-3 py-2 text-sm font-semibold text-gray-600 border border-gray-200 rounded-lg disabled:opacity-40 hover:bg-gray-50"
            >
              Next <i className="fa-solid fa-chevron-right text-xs"></i>
            </button>
          </div>
        )}
        <p className="text-center text-xs text-gray-400 mt-2">
          Page {page} of {totalPages} &middot; {filtered.length} internships
        </p>
      </div>
    </div>
  );
}
