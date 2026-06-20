"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const templates = [
  { id: "professional", name: "Professional", description: "Clean and modern design for experienced professionals", color: "from-blue-500 to-blue-700", icon: "fa-solid fa-briefcase" },
  { id: "minimal", name: "Minimal", description: "Simple and elegant with focus on content", color: "from-gray-600 to-gray-800", icon: "fa-solid fa-minimize" },
  { id: "creative", name: "Creative", description: "Bold design for creative roles and portfolios", color: "from-purple-500 to-pink-600", icon: "fa-solid fa-palette" },
  { id: "executive", name: "Executive", description: "Sophisticated layout for senior leadership roles", color: "from-emerald-600 to-teal-700", icon: "fa-solid fa-crown" },
  { id: "tech", name: "Tech Modern", description: "Developer-focused with skills emphasis", color: "from-cyan-500 to-blue-600", icon: "fa-solid fa-code" },
  { id: "academic", name: "Academic", description: "Structured format for research and academia", color: "from-amber-500 to-orange-600", icon: "fa-solid fa-graduation-cap" },
];

export default function ResumeBuilderPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ id: string; name: string } | null>(null);
  const [resumes, setResumes] = useState<{ id: string; templateId: string; fullName: string; updatedAt: string }[]>([]);

  useEffect(() => {
    fetch("/api/auth").then(r => r.json()).then(d => {
      if (d.user) {
        setUser(d.user);
        fetch("/api/resume").then(r => r.json()).then(rd => setResumes(rd.resumes || []));
      }
    });
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-sm border">
          <i className="fa-solid fa-lock text-4xl text-gray-300 mb-4"></i>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Login Required</h2>
          <p className="text-gray-500 mb-6">Please login to access the Resume Builder</p>
          <Link href="/login" className="inline-flex items-center gap-2 bg-[#1a73e8] text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition">
            <i className="fa-solid fa-sign-in-alt"></i> Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-blue-600 to-indigo-700 py-16 text-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <i className="fa-solid fa-file-lines text-yellow-300"></i> Resume Builder
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Build Your Professional Resume</h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">Choose from our collection of professionally designed templates and create a standout resume in minutes.</p>
        </div>
      </section>

      {resumes.length > 0 && (
        <div className="max-w-6xl mx-auto px-4 mt-8">
          <div className="bg-white rounded-2xl border p-6">
            <h2 className="font-bold text-lg text-gray-900 mb-4"><i className="fa-solid fa-clock-rotate-left text-[#1a73e8] mr-2"></i>Your Resumes</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {resumes.map(r => (
                <Link key={r.id} href={`/resume-builder/edit?id=${r.id}`} className="border rounded-xl p-4 hover:border-[#1a73e8] hover:shadow-sm transition">
                  <p className="font-semibold text-gray-900">{r.fullName}</p>
                  <p className="text-xs text-gray-500 mt-1">Template: {r.templateId} &middot; Updated {new Date(r.updatedAt).toLocaleDateString()}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose a Template</h2>
        <p className="text-gray-500 mb-8">Select a template to get started. You can always change it later.</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map(t => (
            <button key={t.id} onClick={() => router.push(`/resume-builder/edit?template=${t.id}`)} className="text-left bg-white rounded-2xl border hover:border-[#1a73e8] hover:shadow-lg transition overflow-hidden group">
              <div className={`h-32 bg-gradient-to-br ${t.color} flex items-center justify-center`}>
                <i className={`${t.icon} text-4xl text-white/80 group-hover:scale-110 transition-transform`}></i>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-gray-900 mb-1">{t.name}</h3>
                <p className="text-sm text-gray-500">{t.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
