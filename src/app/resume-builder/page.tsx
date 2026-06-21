"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const templates = [
  {
    id: "professional",
    name: "Professional",
    description: "Clean and modern design for experienced professionals",
    color: "#1a73e8",
    accent: "#f0f7ff",
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Simple and elegant with focus on content",
    color: "#374151",
    accent: "#f9fafb",
  },
  {
    id: "creative",
    name: "Creative",
    description: "Bold design for creative roles and portfolios",
    color: "#7c3aed",
    accent: "#f5f3ff",
  },
  {
    id: "executive",
    name: "Executive",
    description: "Sophisticated layout for senior leadership roles",
    color: "#059669",
    accent: "#ecfdf5",
  },
  {
    id: "tech",
    name: "Tech Modern",
    description: "Developer-focused with skills emphasis",
    color: "#0891b2",
    accent: "#ecfeff",
  },
  {
    id: "academic",
    name: "Academic",
    description: "Structured format for research and academia",
    color: "#d97706",
    accent: "#fffbeb",
  },
];

function TemplatePreview({ template }: { template: typeof templates[0] }) {
  const { color, id } = template;

  if (id === "professional") {
    return (
      <div className="w-full h-full bg-white p-3 text-[5px] leading-tight overflow-hidden">
        <div className="border-b-2 pb-1.5 mb-1.5" style={{ borderColor: color }}>
          <div className="font-bold text-[8px]" style={{ color }}>John Anderson</div>
          <div className="text-[4px] text-gray-500">Senior Software Engineer</div>
          <div className="flex gap-2 text-[3.5px] text-gray-400 mt-0.5">
            <span>john@email.com</span><span>+1 234-567</span><span>New York, USA</span>
          </div>
        </div>
        <div className="mb-1.5">
          <div className="font-bold text-[5px] uppercase tracking-wider mb-0.5" style={{ color }}>Experience</div>
          <div className="mb-1">
            <div className="flex justify-between"><span className="font-semibold">Lead Developer</span><span className="text-gray-400">2021-Present</span></div>
            <div className="text-gray-500">Tech Corp Inc.</div>
            <div className="text-gray-400 mt-0.5">Led team of 8 engineers building scalable microservices...</div>
          </div>
          <div>
            <div className="flex justify-between"><span className="font-semibold">Full Stack Dev</span><span className="text-gray-400">2018-2021</span></div>
            <div className="text-gray-500">StartupXYZ</div>
          </div>
        </div>
        <div className="mb-1.5">
          <div className="font-bold text-[5px] uppercase tracking-wider mb-0.5" style={{ color }}>Education</div>
          <div className="flex justify-between"><span className="font-semibold">B.S. Computer Science</span><span className="text-gray-400">2018</span></div>
          <div className="text-gray-500">MIT</div>
        </div>
        <div>
          <div className="font-bold text-[5px] uppercase tracking-wider mb-0.5" style={{ color }}>Skills</div>
          <div className="flex flex-wrap gap-0.5">
            {["React", "Node.js", "Python", "AWS", "Docker"].map(s => (
              <span key={s} className="px-1 py-0.5 rounded text-[3.5px]" style={{ backgroundColor: template.accent, color }}>{s}</span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (id === "minimal") {
    return (
      <div className="w-full h-full bg-white p-3 text-[5px] leading-tight overflow-hidden">
        <div className="text-center mb-2">
          <div className="font-bold text-[9px] text-gray-900">SARAH CHEN</div>
          <div className="text-[4px] text-gray-500 mt-0.5">Product Designer</div>
          <div className="text-[3.5px] text-gray-400 mt-0.5">sarah@email.com | San Francisco | portfolio.com</div>
        </div>
        <div className="border-t border-gray-200 pt-1.5 mb-1.5">
          <div className="font-semibold text-[5px] text-gray-900 mb-0.5">EXPERIENCE</div>
          <div className="mb-1">
            <div className="font-semibold">Sr. Product Designer — Google</div>
            <div className="text-gray-400">2022 - Present</div>
            <div className="text-gray-500 mt-0.5">Designed core features for Google Workspace...</div>
          </div>
          <div>
            <div className="font-semibold">UI/UX Designer — Figma</div>
            <div className="text-gray-400">2019 - 2022</div>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-1.5 mb-1.5">
          <div className="font-semibold text-[5px] text-gray-900 mb-0.5">EDUCATION</div>
          <div className="font-semibold">BFA Design — RISD</div>
          <div className="text-gray-400">2019</div>
        </div>
        <div className="border-t border-gray-200 pt-1.5">
          <div className="font-semibold text-[5px] text-gray-900 mb-0.5">SKILLS</div>
          <div className="text-gray-500">Figma, Sketch, Prototyping, User Research, Design Systems</div>
        </div>
      </div>
    );
  }

  if (id === "creative") {
    return (
      <div className="w-full h-full flex overflow-hidden">
        <div className="w-[35%] p-2 text-[4px] leading-tight text-white" style={{ backgroundColor: color }}>
          <div className="w-6 h-6 rounded-full bg-white/20 mx-auto mb-1.5 flex items-center justify-center">
            <span className="text-[6px] font-bold">AC</span>
          </div>
          <div className="text-center font-bold text-[5px] mb-2">Alex Cruz</div>
          <div className="mb-1.5">
            <div className="font-bold text-[4px] opacity-70 uppercase mb-0.5">Contact</div>
            <div className="text-[3.5px] opacity-80">alex@email.com</div>
            <div className="text-[3.5px] opacity-80">Los Angeles</div>
          </div>
          <div className="mb-1.5">
            <div className="font-bold text-[4px] opacity-70 uppercase mb-0.5">Skills</div>
            <div className="space-y-0.5">
              {["Branding", "Illustration", "Motion"].map(s => (
                <div key={s} className="text-[3.5px] bg-white/10 rounded px-1 py-0.5">{s}</div>
              ))}
            </div>
          </div>
          <div>
            <div className="font-bold text-[4px] opacity-70 uppercase mb-0.5">Languages</div>
            <div className="text-[3.5px] opacity-80">English, Spanish</div>
          </div>
        </div>
        <div className="flex-1 bg-white p-2 text-[4.5px] leading-tight">
          <div className="font-bold text-[7px] mb-0.5" style={{ color }}>Creative Director</div>
          <div className="text-gray-400 text-[3.5px] mb-2">8+ years of creative leadership</div>
          <div className="mb-1.5">
            <div className="font-bold text-[5px] mb-0.5" style={{ color }}>Experience</div>
            <div className="font-semibold">Creative Lead — Nike</div>
            <div className="text-[3.5px] text-gray-400">2021-Present</div>
            <div className="text-gray-500 text-[3.5px] mt-0.5">Led rebrand campaign reaching 50M+...</div>
          </div>
          <div>
            <div className="font-bold text-[5px] mb-0.5" style={{ color }}>Education</div>
            <div className="font-semibold">MFA Graphic Design</div>
            <div className="text-[3.5px] text-gray-400">CalArts, 2016</div>
          </div>
        </div>
      </div>
    );
  }

  if (id === "executive") {
    return (
      <div className="w-full h-full bg-white p-3 text-[5px] leading-tight overflow-hidden">
        <div className="border-l-2 pl-2 mb-2" style={{ borderColor: color }}>
          <div className="font-bold text-[9px] text-gray-900">MICHAEL R. STEWART</div>
          <div className="text-[5px] font-semibold mt-0.5" style={{ color }}>Chief Technology Officer</div>
          <div className="text-[3.5px] text-gray-400 mt-0.5">michael@email.com | +1 555-0100 | Chicago, IL</div>
        </div>
        <div className="p-1.5 rounded mb-1.5" style={{ backgroundColor: template.accent }}>
          <div className="text-[4px] text-gray-600">Visionary technology executive with 15+ years driving digital transformation across Fortune 500 companies...</div>
        </div>
        <div className="mb-1.5">
          <div className="font-bold text-[5px] uppercase tracking-wider pb-0.5 mb-1 border-b" style={{ color, borderColor: color }}>Leadership Experience</div>
          <div className="mb-1">
            <div className="flex justify-between"><span className="font-bold">CTO — Global Systems Inc.</span><span className="text-gray-400">2019-Present</span></div>
            <div className="text-gray-500 mt-0.5">Oversaw $200M tech budget, 300+ engineers...</div>
          </div>
          <div>
            <div className="flex justify-between"><span className="font-bold">VP Engineering — DataFlow</span><span className="text-gray-400">2015-2019</span></div>
          </div>
        </div>
        <div>
          <div className="font-bold text-[5px] uppercase tracking-wider pb-0.5 border-b" style={{ color, borderColor: color }}>Education</div>
          <div className="mt-0.5 font-semibold">MBA — Harvard Business School</div>
        </div>
      </div>
    );
  }

  if (id === "tech") {
    return (
      <div className="w-full h-full bg-[#0f172a] p-3 text-[5px] leading-tight overflow-hidden">
        <div className="flex items-center gap-1.5 mb-2">
          <div className="w-5 h-5 rounded-full flex items-center justify-center text-[5px] font-bold text-white" style={{ backgroundColor: color }}>RP</div>
          <div>
            <div className="font-bold text-[7px] text-white">Rahul Patel</div>
            <div className="text-[4px]" style={{ color }}>Full Stack Developer</div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-1 mb-1.5">
          {["TypeScript", "React", "Node.js", "PostgreSQL", "Docker", "AWS"].map(s => (
            <div key={s} className="px-1 py-0.5 rounded text-[3.5px] text-center border border-cyan-800 text-cyan-300">{s}</div>
          ))}
        </div>
        <div className="mb-1.5">
          <div className="font-bold text-[5px] mb-0.5" style={{ color }}>// Experience</div>
          <div className="text-white">
            <div className="font-semibold">Sr. Engineer — Stripe</div>
            <div className="text-[3.5px] text-gray-400">2022-Present</div>
            <div className="text-[3.5px] text-gray-400 mt-0.5">Built payment infra handling $1B+ daily...</div>
          </div>
        </div>
        <div>
          <div className="font-bold text-[5px] mb-0.5" style={{ color }}>// Projects</div>
          <div className="text-[3.5px] text-gray-300">open-api-gen — 2.3k stars on GitHub</div>
        </div>
      </div>
    );
  }

  // academic
  return (
    <div className="w-full h-full bg-white p-3 text-[5px] leading-tight overflow-hidden">
      <div className="text-center border-b-2 pb-1.5 mb-1.5" style={{ borderColor: color }}>
        <div className="font-bold text-[8px] text-gray-900">Dr. Emily Thompson</div>
        <div className="text-[4px] text-gray-500">Ph.D. in Computer Science | Associate Professor</div>
        <div className="text-[3.5px] text-gray-400 mt-0.5">Stanford University | emily.t@stanford.edu</div>
      </div>
      <div className="mb-1.5">
        <div className="font-bold text-[5px] uppercase mb-0.5" style={{ color }}>Research Interests</div>
        <div className="text-gray-500">Machine Learning, NLP, Computer Vision, Ethics in AI</div>
      </div>
      <div className="mb-1.5">
        <div className="font-bold text-[5px] uppercase mb-0.5" style={{ color }}>Publications</div>
        <div className="text-gray-600 mb-0.5">Thompson, E. et al. (2024) &quot;Scaling Laws for...&quot;</div>
        <div className="text-gray-600">Thompson, E. (2023) &quot;Efficient Attention...&quot;</div>
      </div>
      <div className="mb-1.5">
        <div className="font-bold text-[5px] uppercase mb-0.5" style={{ color }}>Education</div>
        <div className="font-semibold">Ph.D. Computer Science — MIT</div>
        <div className="text-gray-400">2015-2019</div>
      </div>
      <div>
        <div className="font-bold text-[5px] uppercase mb-0.5" style={{ color }}>Awards</div>
        <div className="text-gray-500">Best Paper Award, NeurIPS 2023</div>
      </div>
    </div>
  );
}

export default function ResumeBuilderPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ id: string; name: string } | null>(null);
  const [resumes, setResumes] = useState<{ id: string; templateId: string; fullName: string; updatedAt: string }[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

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
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-700 py-12 text-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <i className="fa-solid fa-file-lines text-yellow-300"></i> Resume Builder
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3">Build Your Professional Resume</h1>
          <p className="text-blue-100 max-w-2xl mx-auto">Choose a template that suits your style. Each template is designed to highlight your strengths.</p>
        </div>
      </section>

      {/* Existing Resumes */}
      {resumes.length > 0 && (
        <div className="max-w-6xl mx-auto px-4 mt-8">
          <div className="bg-white rounded-2xl border p-6">
            <h2 className="font-bold text-lg text-gray-900 mb-4"><i className="fa-solid fa-clock-rotate-left text-[#1a73e8] mr-2"></i>Your Resumes</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {resumes.map(r => (
                <Link key={r.id} href={`/resume-builder/edit?id=${r.id}`} className="border rounded-xl p-4 hover:border-[#1a73e8] hover:shadow-sm transition group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                      <i className="fa-solid fa-file-lines text-[#1a73e8]"></i>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 group-hover:text-[#1a73e8]">{r.fullName}</p>
                      <p className="text-xs text-gray-500">Template: {r.templateId} &middot; {new Date(r.updatedAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Template Selection */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Choose a Template</h2>
            <p className="text-gray-500 text-sm mt-1">Click on a template to preview, then use it to build your resume</p>
          </div>
          {selectedTemplate && (
            <button
              onClick={() => router.push(`/resume-builder/edit?template=${selectedTemplate}`)}
              className="bg-[#1a73e8] text-white px-6 py-2.5 rounded-full font-semibold hover:bg-blue-700 transition flex items-center gap-2"
            >
              <i className="fa-solid fa-pen"></i> Use This Template
            </button>
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map(t => (
            <div
              key={t.id}
              onClick={() => setSelectedTemplate(t.id)}
              className="cursor-pointer group"
            >
              {/* Document Page */}
              <div className={`relative transition-all duration-300 ${
                selectedTemplate === t.id
                  ? "scale-[1.02] -translate-y-1"
                  : "group-hover:scale-[1.01] group-hover:-translate-y-0.5"
              }`}>
                {/* Page shadow layers for depth */}
                <div className="absolute inset-0 translate-y-2 translate-x-1 bg-gray-200 rounded-lg"></div>
                <div className="absolute inset-0 translate-y-1 translate-x-0.5 bg-gray-100 rounded-lg"></div>

                {/* Actual page */}
                <div className={`relative aspect-[210/297] rounded-lg overflow-hidden border-2 transition-all ${
                  selectedTemplate === t.id
                    ? "border-[#1a73e8] shadow-xl shadow-blue-100"
                    : "border-gray-200 shadow-lg group-hover:border-gray-300 group-hover:shadow-xl"
                }`}>
                  <TemplatePreview template={t} />

                  {/* Hover overlay */}
                  <div className={`absolute inset-0 flex flex-col items-center justify-center gap-3 transition-opacity duration-200 ${
                    selectedTemplate === t.id ? "opacity-0 pointer-events-none" : "opacity-0 group-hover:opacity-100"
                  }`} style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(1px)" }}>
                    <span className="bg-[#1a73e8] text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-lg">
                      <i className="fa-solid fa-check mr-1.5"></i> Use This Template
                    </span>
                  </div>

                  {/* Selected badge */}
                  {selectedTemplate === t.id && (
                    <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-[#1a73e8] text-white px-3 py-1 rounded-full shadow-lg">
                      <i className="fa-solid fa-check text-[10px]"></i>
                      <span className="text-xs font-semibold">Selected</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Template Name */}
              <div className="mt-4 text-center">
                <h3 className={`font-bold transition-colors ${selectedTemplate === t.id ? "text-[#1a73e8]" : "text-gray-900"}`}>{t.name}</h3>
                <p className="text-xs text-gray-500 mt-0.5">{t.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        {selectedTemplate && (
          <div className="mt-8 text-center">
            <button
              onClick={() => router.push(`/resume-builder/edit?template=${selectedTemplate}`)}
              className="bg-[#1a73e8] text-white px-8 py-3.5 rounded-full font-bold text-lg hover:bg-blue-700 transition shadow-lg shadow-blue-200"
            >
              <i className="fa-solid fa-rocket mr-2"></i> Start Building with {templates.find(t => t.id === selectedTemplate)?.name}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
