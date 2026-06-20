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

  const experience = resume.experience ? JSON.parse(resume.experience) : [];
  const education = resume.education ? JSON.parse(resume.education) : [];
  const projects = resume.projects ? JSON.parse(resume.projects) : [];
  const skillsList = resume.skills ? resume.skills.split(",").map((s: string) => s.trim()).filter(Boolean) : [];
  const languagesList = resume.languages ? resume.languages.split(",").map((s: string) => s.trim()).filter(Boolean) : [];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Toolbar */}
      <div className="bg-white border-b sticky top-0 z-10 print:hidden">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/resume-builder" className="text-sm text-gray-500 hover:text-[#1a73e8]"><i className="fa-solid fa-arrow-left mr-2"></i>Back</Link>
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

        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 print:shadow-none print:p-0">
          {/* Header */}
          <div className="border-b pb-6 mb-6">
            <h1 className="text-3xl font-bold text-gray-900">{resume.fullName}</h1>
            {resume.title && <p className="text-lg text-[#1a73e8] font-semibold mt-1">{resume.title}</p>}
            <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-500">
              <span><i className="fa-solid fa-envelope mr-1"></i>{resume.email}</span>
              {resume.phone && <span><i className="fa-solid fa-phone mr-1"></i>{resume.phone}</span>}
              {resume.location && <span><i className="fa-solid fa-location-dot mr-1"></i>{resume.location}</span>}
            </div>
          </div>

          {/* Summary */}
          {resume.summary && (
            <div className="mb-6">
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2 border-b pb-1">Professional Summary</h2>
              <p className="text-sm text-gray-600 leading-relaxed">{resume.summary}</p>
            </div>
          )}

          {/* Experience */}
          {experience.length > 0 && experience[0].company && (
            <div className="mb-6">
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3 border-b pb-1">Experience</h2>
              {experience.map((exp: { company: string; role: string; duration: string; description: string }, i: number) => (
                <div key={i} className="mb-4">
                  <div className="flex justify-between items-start">
                    <div><p className="font-semibold text-gray-900">{exp.role}</p><p className="text-sm text-gray-500">{exp.company}</p></div>
                    <span className="text-xs text-gray-400">{exp.duration}</span>
                  </div>
                  {exp.description && <p className="text-sm text-gray-600 mt-1">{exp.description}</p>}
                </div>
              ))}
            </div>
          )}

          {/* Education */}
          {education.length > 0 && education[0].institution && (
            <div className="mb-6">
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3 border-b pb-1">Education</h2>
              {education.map((edu: { institution: string; degree: string; year: string; grade: string }, i: number) => (
                <div key={i} className="mb-3">
                  <div className="flex justify-between items-start">
                    <div><p className="font-semibold text-gray-900">{edu.degree}</p><p className="text-sm text-gray-500">{edu.institution}</p></div>
                    <div className="text-right"><span className="text-xs text-gray-400">{edu.year}</span>{edu.grade && <p className="text-xs text-gray-500">{edu.grade}</p>}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Skills */}
          {skillsList.length > 0 && (
            <div className="mb-6">
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2 border-b pb-1">Skills</h2>
              <div className="flex flex-wrap gap-2">{skillsList.map((s: string, i: number) => <span key={i} className="text-xs bg-blue-50 text-[#1a73e8] px-3 py-1 rounded-full font-medium">{s}</span>)}</div>
            </div>
          )}

          {/* Projects */}
          {projects.length > 0 && projects[0].name && (
            <div className="mb-6">
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3 border-b pb-1">Projects</h2>
              {projects.map((p: { name: string; description: string; link: string }, i: number) => (
                <div key={i} className="mb-3">
                  <p className="font-semibold text-gray-900">{p.name}{p.link && <a href={p.link} className="ml-2 text-xs text-[#1a73e8]"><i className="fa-solid fa-link"></i></a>}</p>
                  {p.description && <p className="text-sm text-gray-600">{p.description}</p>}
                </div>
              ))}
            </div>
          )}

          {/* Languages */}
          {languagesList.length > 0 && (
            <div>
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2 border-b pb-1">Languages</h2>
              <p className="text-sm text-gray-600">{languagesList.join(" • ")}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
