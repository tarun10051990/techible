"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

type Resume = {
  id: string; templateId: string; fullName: string; email: string; phone: string | null;
  location: string | null; title: string | null; summary: string | null;
  experience: string | null; education: string | null; skills: string | null;
  projects: string | null; languages: string | null;
};

type ExperienceItem = { company: string; role: string; duration: string; description: string };
type EducationItem = { institution: string; degree: string; year: string; grade: string };
type ProjectItem = { name: string; description: string; link: string };

export default function ResumePreviewPage() {
  return <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><i className="fa-solid fa-spinner fa-spin text-2xl text-[#1a73e8]"></i></div>}><ResumePreviewContent /></Suspense>;
}

function ResumePreviewContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const resumeId = searchParams.get("id");
  const [resume, setResume] = useState<Resume | null>(null);
  const [hasSubscription, setHasSubscription] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);

  useEffect(() => {
    fetch("/api/auth").then(r => r.json()).then(d => {
      if (!d.user) { router.push("/login"); return; }
    });
    if (resumeId) {
      fetch("/api/resume").then(r => r.json()).then(d => {
        const found = d.resumes?.find((r: { id: string }) => r.id === resumeId);
        if (found) setResume(found);
      });
    }
    fetch("/api/subscriptions").then(r => r.json()).then(d => {
      if (d.activeSubscription) setHasSubscription(true);
    });
  }, [resumeId, router]);

  function handleDownload() {
    if (!hasSubscription) {
      setShowPaywall(true);
      return;
    }
    window.print();
  }

  if (!resume) return <div className="min-h-screen flex items-center justify-center"><i className="fa-solid fa-spinner fa-spin text-2xl text-[#1a73e8]"></i></div>;

  const experience: ExperienceItem[] = resume.experience ? JSON.parse(resume.experience) : [];
  const education: EducationItem[] = resume.education ? JSON.parse(resume.education) : [];
  const projects: ProjectItem[] = resume.projects ? JSON.parse(resume.projects) : [];
  const skillsList = resume.skills ? resume.skills.split(",").map((s: string) => s.trim()).filter(Boolean) : [];
  const languagesList = resume.languages ? resume.languages.split(",").map((s: string) => s.trim()).filter(Boolean) : [];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Toolbar */}
      <div className="bg-white border-b sticky top-0 z-10 print:hidden">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/resume-builder" className="text-sm text-gray-500 hover:text-[#1a73e8]"><i className="fa-solid fa-arrow-left mr-2"></i>Back</Link>
          <div className="flex items-center gap-2">
            <span className="text-xs bg-gray-100 text-gray-500 px-3 py-1 rounded-full capitalize">{resume.templateId} Template</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href={`/resume-builder/edit?id=${resume.id}`} className="text-sm text-gray-600 border px-4 py-2 rounded-full hover:bg-gray-50"><i className="fa-solid fa-pen mr-1"></i>Edit</Link>
            <button onClick={handleDownload} className="bg-[#1a73e8] text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-blue-700">
              <i className="fa-solid fa-download mr-2"></i>Download PDF
            </button>
          </div>
        </div>
      </div>

      {/* Paywall Modal */}
      {showPaywall && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center print:hidden">
          <div className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fa-solid fa-crown text-2xl text-yellow-500"></i>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Subscription Required</h2>
            <p className="text-gray-500 mb-6">Upgrade to a Pro or Premium plan to download your resume as PDF.</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => setShowPaywall(false)} className="px-5 py-2 border rounded-full text-sm font-semibold text-gray-600 hover:bg-gray-50">Cancel</button>
              <Link href="/subscription" className="px-5 py-2 bg-[#1a73e8] text-white rounded-full text-sm font-semibold hover:bg-blue-700">View Plans</Link>
            </div>
          </div>
        </div>
      )}

      {/* Resume Preview */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {!hasSubscription && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6 flex items-center gap-3 print:hidden">
            <i className="fa-solid fa-circle-info text-yellow-600"></i>
            <p className="text-sm text-yellow-800">You&apos;re on the free plan. <Link href="/subscription" className="font-semibold text-[#1a73e8] underline">Upgrade</Link> to download your resume as PDF.</p>
          </div>
        )}

        {resume.templateId === "professional" && (
          <ProfessionalTemplate resume={resume} experience={experience} education={education} projects={projects} skillsList={skillsList} languagesList={languagesList} />
        )}
        {resume.templateId === "minimal" && (
          <MinimalTemplate resume={resume} experience={experience} education={education} projects={projects} skillsList={skillsList} languagesList={languagesList} />
        )}
        {resume.templateId === "creative" && (
          <CreativeTemplate resume={resume} experience={experience} education={education} projects={projects} skillsList={skillsList} languagesList={languagesList} />
        )}
        {resume.templateId === "executive" && (
          <ExecutiveTemplate resume={resume} experience={experience} education={education} projects={projects} skillsList={skillsList} languagesList={languagesList} />
        )}
        {resume.templateId === "tech" && (
          <TechTemplate resume={resume} experience={experience} education={education} projects={projects} skillsList={skillsList} languagesList={languagesList} />
        )}
        {resume.templateId === "academic" && (
          <AcademicTemplate resume={resume} experience={experience} education={education} projects={projects} skillsList={skillsList} languagesList={languagesList} />
        )}
      </div>
    </div>
  );
}

// Shared props type
interface TemplateProps {
  resume: Resume;
  experience: ExperienceItem[];
  education: EducationItem[];
  projects: ProjectItem[];
  skillsList: string[];
  languagesList: string[];
}

// Professional Template
function ProfessionalTemplate({ resume, experience, education, projects, skillsList, languagesList }: TemplateProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 print:shadow-none print:p-0">
      <div className="border-b-2 border-[#1a73e8] pb-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-900">{resume.fullName}</h1>
        {resume.title && <p className="text-lg text-[#1a73e8] font-semibold mt-1">{resume.title}</p>}
        <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-500">
          <span><i className="fa-solid fa-envelope mr-1"></i>{resume.email}</span>
          {resume.phone && <span><i className="fa-solid fa-phone mr-1"></i>{resume.phone}</span>}
          {resume.location && <span><i className="fa-solid fa-location-dot mr-1"></i>{resume.location}</span>}
        </div>
      </div>

      {resume.summary && (
        <div className="mb-6">
          <h2 className="text-sm font-bold text-[#1a73e8] uppercase tracking-wider mb-2 border-b border-blue-100 pb-1">Professional Summary</h2>
          <p className="text-sm text-gray-600 leading-relaxed">{resume.summary}</p>
        </div>
      )}

      {experience.length > 0 && experience[0].company && (
        <div className="mb-6">
          <h2 className="text-sm font-bold text-[#1a73e8] uppercase tracking-wider mb-3 border-b border-blue-100 pb-1">Experience</h2>
          {experience.map((exp, i) => (
            <div key={i} className="mb-4">
              <div className="flex justify-between items-start">
                <div><p className="font-semibold text-gray-900">{exp.role}</p><p className="text-sm text-gray-500">{exp.company}</p></div>
                <span className="text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded">{exp.duration}</span>
              </div>
              {exp.description && <p className="text-sm text-gray-600 mt-1">{exp.description}</p>}
            </div>
          ))}
        </div>
      )}

      {education.length > 0 && education[0].institution && (
        <div className="mb-6">
          <h2 className="text-sm font-bold text-[#1a73e8] uppercase tracking-wider mb-3 border-b border-blue-100 pb-1">Education</h2>
          {education.map((edu, i) => (
            <div key={i} className="mb-3">
              <div className="flex justify-between items-start">
                <div><p className="font-semibold text-gray-900">{edu.degree}</p><p className="text-sm text-gray-500">{edu.institution}</p></div>
                <div className="text-right"><span className="text-xs text-gray-400">{edu.year}</span>{edu.grade && <p className="text-xs text-gray-500">{edu.grade}</p>}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {skillsList.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-bold text-[#1a73e8] uppercase tracking-wider mb-2 border-b border-blue-100 pb-1">Skills</h2>
          <div className="flex flex-wrap gap-2">{skillsList.map((s, i) => <span key={i} className="text-xs bg-blue-50 text-[#1a73e8] px-3 py-1 rounded-full font-medium">{s}</span>)}</div>
        </div>
      )}

      {projects.length > 0 && projects[0].name && (
        <div className="mb-6">
          <h2 className="text-sm font-bold text-[#1a73e8] uppercase tracking-wider mb-3 border-b border-blue-100 pb-1">Projects</h2>
          {projects.map((p, i) => (
            <div key={i} className="mb-3">
              <p className="font-semibold text-gray-900">{p.name}{p.link && <a href={p.link} className="ml-2 text-xs text-[#1a73e8]"><i className="fa-solid fa-link"></i></a>}</p>
              {p.description && <p className="text-sm text-gray-600">{p.description}</p>}
            </div>
          ))}
        </div>
      )}

      {languagesList.length > 0 && (
        <div>
          <h2 className="text-sm font-bold text-[#1a73e8] uppercase tracking-wider mb-2 border-b border-blue-100 pb-1">Languages</h2>
          <p className="text-sm text-gray-600">{languagesList.join(" • ")}</p>
        </div>
      )}
    </div>
  );
}

// Minimal Template
function MinimalTemplate({ resume, experience, education, projects, skillsList, languagesList }: TemplateProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 print:shadow-none print:p-0">
      <div className="text-center mb-8 pb-6 border-b border-gray-200">
        <h1 className="text-3xl font-light tracking-wider text-gray-900 uppercase">{resume.fullName}</h1>
        {resume.title && <p className="text-base text-gray-500 mt-2">{resume.title}</p>}
        <div className="flex flex-wrap justify-center gap-3 mt-3 text-sm text-gray-400">
          <span>{resume.email}</span>
          {resume.phone && <><span>|</span><span>{resume.phone}</span></>}
          {resume.location && <><span>|</span><span>{resume.location}</span></>}
        </div>
      </div>

      {resume.summary && (
        <div className="mb-8">
          <p className="text-sm text-gray-600 leading-relaxed text-center max-w-2xl mx-auto italic">{resume.summary}</p>
        </div>
      )}

      {experience.length > 0 && experience[0].company && (
        <div className="mb-8">
          <h2 className="text-xs font-semibold text-gray-900 uppercase tracking-[0.2em] mb-4 pb-2 border-b border-gray-100">Experience</h2>
          {experience.map((exp, i) => (
            <div key={i} className="mb-5">
              <div className="flex justify-between items-baseline">
                <p className="font-medium text-gray-900">{exp.role} <span className="text-gray-400">—</span> {exp.company}</p>
                <span className="text-xs text-gray-400">{exp.duration}</span>
              </div>
              {exp.description && <p className="text-sm text-gray-500 mt-1.5 leading-relaxed">{exp.description}</p>}
            </div>
          ))}
        </div>
      )}

      {education.length > 0 && education[0].institution && (
        <div className="mb-8">
          <h2 className="text-xs font-semibold text-gray-900 uppercase tracking-[0.2em] mb-4 pb-2 border-b border-gray-100">Education</h2>
          {education.map((edu, i) => (
            <div key={i} className="mb-3 flex justify-between items-baseline">
              <p className="text-gray-900"><span className="font-medium">{edu.degree}</span> <span className="text-gray-400">—</span> {edu.institution}</p>
              <span className="text-xs text-gray-400">{edu.year}</span>
            </div>
          ))}
        </div>
      )}

      {skillsList.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xs font-semibold text-gray-900 uppercase tracking-[0.2em] mb-3 pb-2 border-b border-gray-100">Skills</h2>
          <p className="text-sm text-gray-600">{skillsList.join("  •  ")}</p>
        </div>
      )}

      {projects.length > 0 && projects[0].name && (
        <div className="mb-8">
          <h2 className="text-xs font-semibold text-gray-900 uppercase tracking-[0.2em] mb-4 pb-2 border-b border-gray-100">Projects</h2>
          {projects.map((p, i) => (
            <div key={i} className="mb-3">
              <p className="font-medium text-gray-900">{p.name}{p.link && <a href={p.link} className="ml-2 text-xs text-gray-400 hover:text-gray-600"><i className="fa-solid fa-arrow-up-right-from-square"></i></a>}</p>
              {p.description && <p className="text-sm text-gray-500">{p.description}</p>}
            </div>
          ))}
        </div>
      )}

      {languagesList.length > 0 && (
        <div>
          <h2 className="text-xs font-semibold text-gray-900 uppercase tracking-[0.2em] mb-2 pb-2 border-b border-gray-100">Languages</h2>
          <p className="text-sm text-gray-600">{languagesList.join("  •  ")}</p>
        </div>
      )}
    </div>
  );
}

// Creative Template (sidebar layout)
function CreativeTemplate({ resume, experience, education, projects, skillsList, languagesList }: TemplateProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden print:shadow-none flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-[280px] bg-gradient-to-b from-purple-700 to-purple-900 text-white p-8 print:bg-purple-800">
        <div className="w-20 h-20 rounded-full bg-white/20 mx-auto mb-4 flex items-center justify-center">
          <span className="text-2xl font-bold">{resume.fullName.split(" ").map(n => n[0]).join("").slice(0, 2)}</span>
        </div>
        <h1 className="text-xl font-bold text-center mb-1">{resume.fullName}</h1>
        {resume.title && <p className="text-purple-200 text-center text-sm mb-6">{resume.title}</p>}

        <div className="space-y-4">
          <div>
            <h3 className="text-xs uppercase tracking-wider text-purple-300 font-semibold mb-2">Contact</h3>
            <div className="space-y-1.5 text-sm text-purple-100">
              <p><i className="fa-solid fa-envelope mr-2 text-purple-300 w-4"></i>{resume.email}</p>
              {resume.phone && <p><i className="fa-solid fa-phone mr-2 text-purple-300 w-4"></i>{resume.phone}</p>}
              {resume.location && <p><i className="fa-solid fa-location-dot mr-2 text-purple-300 w-4"></i>{resume.location}</p>}
            </div>
          </div>

          {skillsList.length > 0 && (
            <div>
              <h3 className="text-xs uppercase tracking-wider text-purple-300 font-semibold mb-2">Skills</h3>
              <div className="flex flex-wrap gap-1.5">
                {skillsList.map((s, i) => <span key={i} className="text-xs bg-white/10 text-purple-100 px-2 py-1 rounded">{s}</span>)}
              </div>
            </div>
          )}

          {languagesList.length > 0 && (
            <div>
              <h3 className="text-xs uppercase tracking-wider text-purple-300 font-semibold mb-2">Languages</h3>
              <div className="space-y-1">
                {languagesList.map((l, i) => <p key={i} className="text-sm text-purple-100">{l}</p>)}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 md:p-10">
        {resume.summary && (
          <div className="mb-8">
            <h2 className="text-lg font-bold text-purple-700 mb-2">About Me</h2>
            <p className="text-sm text-gray-600 leading-relaxed">{resume.summary}</p>
          </div>
        )}

        {experience.length > 0 && experience[0].company && (
          <div className="mb-8">
            <h2 className="text-lg font-bold text-purple-700 mb-4">Experience</h2>
            {experience.map((exp, i) => (
              <div key={i} className="mb-5 relative pl-5 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-purple-300 before:rounded-full">
                <div className="flex justify-between items-start">
                  <div><p className="font-semibold text-gray-900">{exp.role}</p><p className="text-sm text-purple-600">{exp.company}</p></div>
                  <span className="text-xs text-gray-400">{exp.duration}</span>
                </div>
                {exp.description && <p className="text-sm text-gray-500 mt-1">{exp.description}</p>}
              </div>
            ))}
          </div>
        )}

        {education.length > 0 && education[0].institution && (
          <div className="mb-8">
            <h2 className="text-lg font-bold text-purple-700 mb-4">Education</h2>
            {education.map((edu, i) => (
              <div key={i} className="mb-3 pl-5 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-purple-300 before:rounded-full">
                <p className="font-semibold text-gray-900">{edu.degree}</p>
                <p className="text-sm text-gray-500">{edu.institution} &middot; {edu.year}</p>
              </div>
            ))}
          </div>
        )}

        {projects.length > 0 && projects[0].name && (
          <div>
            <h2 className="text-lg font-bold text-purple-700 mb-4">Projects</h2>
            {projects.map((p, i) => (
              <div key={i} className="mb-3 pl-5 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-purple-300 before:rounded-full">
                <p className="font-semibold text-gray-900">{p.name}{p.link && <a href={p.link} className="ml-2 text-xs text-purple-500"><i className="fa-solid fa-link"></i></a>}</p>
                {p.description && <p className="text-sm text-gray-500">{p.description}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Executive Template
function ExecutiveTemplate({ resume, experience, education, projects, skillsList, languagesList }: TemplateProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 print:shadow-none print:p-0">
      <div className="border-l-4 border-emerald-600 pl-6 mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{resume.fullName}</h1>
        {resume.title && <p className="text-lg text-emerald-600 font-semibold mt-1">{resume.title}</p>}
        <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-500">
          <span>{resume.email}</span>
          {resume.phone && <span>{resume.phone}</span>}
          {resume.location && <span>{resume.location}</span>}
        </div>
      </div>

      {resume.summary && (
        <div className="mb-8 bg-emerald-50 rounded-lg p-5 border border-emerald-100">
          <p className="text-sm text-gray-700 leading-relaxed">{resume.summary}</p>
        </div>
      )}

      {experience.length > 0 && experience[0].company && (
        <div className="mb-8">
          <h2 className="text-sm font-bold text-emerald-700 uppercase tracking-wider mb-4 pb-2 border-b-2 border-emerald-600">Leadership Experience</h2>
          {experience.map((exp, i) => (
            <div key={i} className="mb-5">
              <div className="flex justify-between items-start">
                <div><p className="font-bold text-gray-900 text-base">{exp.role}</p><p className="text-sm text-emerald-600 font-medium">{exp.company}</p></div>
                <span className="text-xs text-gray-400 bg-gray-50 px-3 py-1 rounded-full">{exp.duration}</span>
              </div>
              {exp.description && <p className="text-sm text-gray-600 mt-2 leading-relaxed">{exp.description}</p>}
            </div>
          ))}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-8">
        {education.length > 0 && education[0].institution && (
          <div>
            <h2 className="text-sm font-bold text-emerald-700 uppercase tracking-wider mb-4 pb-2 border-b-2 border-emerald-600">Education</h2>
            {education.map((edu, i) => (
              <div key={i} className="mb-3">
                <p className="font-semibold text-gray-900">{edu.degree}</p>
                <p className="text-sm text-gray-500">{edu.institution}</p>
                <p className="text-xs text-gray-400">{edu.year}{edu.grade ? ` • ${edu.grade}` : ""}</p>
              </div>
            ))}
          </div>
        )}

        <div className="space-y-6">
          {skillsList.length > 0 && (
            <div>
              <h2 className="text-sm font-bold text-emerald-700 uppercase tracking-wider mb-3 pb-2 border-b-2 border-emerald-600">Core Competencies</h2>
              <div className="flex flex-wrap gap-2">{skillsList.map((s, i) => <span key={i} className="text-xs bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded font-medium border border-emerald-100">{s}</span>)}</div>
            </div>
          )}

          {languagesList.length > 0 && (
            <div>
              <h2 className="text-sm font-bold text-emerald-700 uppercase tracking-wider mb-2 pb-2 border-b-2 border-emerald-600">Languages</h2>
              <p className="text-sm text-gray-600">{languagesList.join(" • ")}</p>
            </div>
          )}
        </div>
      </div>

      {projects.length > 0 && projects[0].name && (
        <div className="mt-8">
          <h2 className="text-sm font-bold text-emerald-700 uppercase tracking-wider mb-4 pb-2 border-b-2 border-emerald-600">Key Projects</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {projects.map((p, i) => (
              <div key={i} className="bg-gray-50 rounded-lg p-4">
                <p className="font-semibold text-gray-900">{p.name}{p.link && <a href={p.link} className="ml-2 text-xs text-emerald-600"><i className="fa-solid fa-link"></i></a>}</p>
                {p.description && <p className="text-sm text-gray-500 mt-1">{p.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Tech Modern Template (dark theme)
function TechTemplate({ resume, experience, education, projects, skillsList, languagesList }: TemplateProps) {
  return (
    <div className="bg-[#0f172a] rounded-xl shadow-lg p-8 md:p-12 print:shadow-none print:p-0 print:bg-white">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-700">
        <div className="w-14 h-14 rounded-full bg-cyan-600 flex items-center justify-center text-white font-bold text-lg">
          {resume.fullName.split(" ").map(n => n[0]).join("").slice(0, 2)}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">{resume.fullName}</h1>
          {resume.title && <p className="text-cyan-400 font-medium">{resume.title}</p>}
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mb-8 text-sm text-gray-400">
        <span className="flex items-center gap-1"><i className="fa-solid fa-envelope text-cyan-500"></i>{resume.email}</span>
        {resume.phone && <span className="flex items-center gap-1"><i className="fa-solid fa-phone text-cyan-500"></i>{resume.phone}</span>}
        {resume.location && <span className="flex items-center gap-1"><i className="fa-solid fa-location-dot text-cyan-500"></i>{resume.location}</span>}
      </div>

      {resume.summary && (
        <div className="mb-8 bg-slate-800/50 rounded-lg p-4 border border-slate-700">
          <p className="text-sm text-gray-300 leading-relaxed font-mono">{resume.summary}</p>
        </div>
      )}

      {/* Skills Grid */}
      {skillsList.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-bold text-cyan-400 mb-3 font-mono">// Tech Stack</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {skillsList.map((s, i) => (
              <div key={i} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-cyan-300 text-center font-mono">{s}</div>
            ))}
          </div>
        </div>
      )}

      {experience.length > 0 && experience[0].company && (
        <div className="mb-8">
          <h2 className="text-sm font-bold text-cyan-400 mb-4 font-mono">// Experience</h2>
          {experience.map((exp, i) => (
            <div key={i} className="mb-5 bg-slate-800/30 rounded-lg p-4 border-l-2 border-cyan-600">
              <div className="flex justify-between items-start">
                <div><p className="font-semibold text-white">{exp.role}</p><p className="text-sm text-cyan-400">{exp.company}</p></div>
                <span className="text-xs text-gray-500 font-mono">{exp.duration}</span>
              </div>
              {exp.description && <p className="text-sm text-gray-400 mt-2">{exp.description}</p>}
            </div>
          ))}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-8">
        {education.length > 0 && education[0].institution && (
          <div>
            <h2 className="text-sm font-bold text-cyan-400 mb-3 font-mono">// Education</h2>
            {education.map((edu, i) => (
              <div key={i} className="mb-3">
                <p className="font-semibold text-white">{edu.degree}</p>
                <p className="text-sm text-gray-400">{edu.institution} &middot; {edu.year}</p>
              </div>
            ))}
          </div>
        )}

        {projects.length > 0 && projects[0].name && (
          <div>
            <h2 className="text-sm font-bold text-cyan-400 mb-3 font-mono">// Projects</h2>
            {projects.map((p, i) => (
              <div key={i} className="mb-3">
                <p className="font-semibold text-white">{p.name}{p.link && <a href={p.link} className="ml-2 text-xs text-cyan-400"><i className="fa-solid fa-arrow-up-right-from-square"></i></a>}</p>
                {p.description && <p className="text-sm text-gray-400">{p.description}</p>}
              </div>
            ))}
          </div>
        )}
      </div>

      {languagesList.length > 0 && (
        <div className="mt-6 pt-4 border-t border-slate-700">
          <span className="text-sm font-mono text-gray-500">Languages: </span>
          <span className="text-sm text-gray-300">{languagesList.join(" • ")}</span>
        </div>
      )}
    </div>
  );
}

// Academic Template
function AcademicTemplate({ resume, experience, education, projects, skillsList, languagesList }: TemplateProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 print:shadow-none print:p-0">
      <div className="text-center border-b-2 border-amber-500 pb-6 mb-8">
        <h1 className="text-2xl font-bold text-gray-900">{resume.fullName}</h1>
        {resume.title && <p className="text-base text-amber-700 mt-1">{resume.title}</p>}
        <div className="flex flex-wrap justify-center gap-3 mt-3 text-sm text-gray-500">
          <span>{resume.email}</span>
          {resume.phone && <><span>|</span><span>{resume.phone}</span></>}
          {resume.location && <><span>|</span><span>{resume.location}</span></>}
        </div>
      </div>

      {resume.summary && (
        <div className="mb-8">
          <h2 className="text-sm font-bold text-amber-700 uppercase tracking-wider mb-2">Research Interests / Summary</h2>
          <p className="text-sm text-gray-600 leading-relaxed">{resume.summary}</p>
        </div>
      )}

      {education.length > 0 && education[0].institution && (
        <div className="mb-8">
          <h2 className="text-sm font-bold text-amber-700 uppercase tracking-wider mb-4 pb-1 border-b border-amber-200">Education</h2>
          {education.map((edu, i) => (
            <div key={i} className="mb-4">
              <div className="flex justify-between items-start">
                <div><p className="font-bold text-gray-900">{edu.degree}</p><p className="text-sm text-gray-600">{edu.institution}</p></div>
                <span className="text-xs text-gray-400">{edu.year}</span>
              </div>
              {edu.grade && <p className="text-sm text-amber-700 mt-0.5">{edu.grade}</p>}
            </div>
          ))}
        </div>
      )}

      {experience.length > 0 && experience[0].company && (
        <div className="mb-8">
          <h2 className="text-sm font-bold text-amber-700 uppercase tracking-wider mb-4 pb-1 border-b border-amber-200">Academic / Professional Experience</h2>
          {experience.map((exp, i) => (
            <div key={i} className="mb-5">
              <div className="flex justify-between items-start">
                <div><p className="font-bold text-gray-900">{exp.role}</p><p className="text-sm text-gray-600">{exp.company}</p></div>
                <span className="text-xs text-gray-400">{exp.duration}</span>
              </div>
              {exp.description && <p className="text-sm text-gray-500 mt-1.5 leading-relaxed">{exp.description}</p>}
            </div>
          ))}
        </div>
      )}

      {projects.length > 0 && projects[0].name && (
        <div className="mb-8">
          <h2 className="text-sm font-bold text-amber-700 uppercase tracking-wider mb-4 pb-1 border-b border-amber-200">Publications / Projects</h2>
          {projects.map((p, i) => (
            <div key={i} className="mb-3 pl-4 border-l-2 border-amber-200">
              <p className="text-sm text-gray-900"><span className="font-semibold">{p.name}</span>{p.link && <a href={p.link} className="ml-2 text-xs text-amber-600"><i className="fa-solid fa-arrow-up-right-from-square"></i></a>}</p>
              {p.description && <p className="text-sm text-gray-500 mt-0.5">{p.description}</p>}
            </div>
          ))}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-8">
        {skillsList.length > 0 && (
          <div>
            <h2 className="text-sm font-bold text-amber-700 uppercase tracking-wider mb-3 pb-1 border-b border-amber-200">Technical Skills</h2>
            <div className="flex flex-wrap gap-2">{skillsList.map((s, i) => <span key={i} className="text-xs bg-amber-50 text-amber-800 px-2.5 py-1 rounded border border-amber-200">{s}</span>)}</div>
          </div>
        )}

        {languagesList.length > 0 && (
          <div>
            <h2 className="text-sm font-bold text-amber-700 uppercase tracking-wider mb-3 pb-1 border-b border-amber-200">Languages</h2>
            <p className="text-sm text-gray-600">{languagesList.join(" • ")}</p>
          </div>
        )}
      </div>
    </div>
  );
}
