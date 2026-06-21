"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

type ExperienceItem = { company: string; role: string; duration: string; description: string };
type EducationItem = { institution: string; degree: string; year: string; grade: string };
type ProjectItem = { name: string; description: string; link: string };

export default function ResumeEditPage() {
  return <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><i className="fa-solid fa-spinner fa-spin text-2xl text-[#1a73e8]"></i></div>}><ResumeEditContent /></Suspense>;
}

function ResumeEditContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const resumeId = searchParams.get("id");
  const templateParam = searchParams.get("template") || "professional";

  const [user, setUser] = useState<{ id: string } | null>(null);
  const [saving, setSaving] = useState(false);
  const [templateId, setTemplateId] = useState(templateParam);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [skills, setSkills] = useState("");
  const [languages, setLanguages] = useState("");
  const [experience, setExperience] = useState<ExperienceItem[]>([{ company: "", role: "", duration: "", description: "" }]);
  const [education, setEducation] = useState<EducationItem[]>([{ institution: "", degree: "", year: "", grade: "" }]);
  const [projects, setProjects] = useState<ProjectItem[]>([{ name: "", description: "", link: "" }]);

  useEffect(() => {
    fetch("/api/auth").then(r => r.json()).then(d => {
      if (!d.user) { router.push("/login"); return; }
      setUser(d.user);
      setEmail(d.user.email || "");
      setFullName(d.user.name || "");
    });
  }, [router]);

  useEffect(() => {
    if (resumeId) {
      fetch("/api/resume").then(r => r.json()).then(d => {
        const resume = d.resumes?.find((r: { id: string }) => r.id === resumeId);
        if (resume) {
          setTemplateId(resume.templateId);
          setFullName(resume.fullName);
          setEmail(resume.email);
          setPhone(resume.phone || "");
          setLocation(resume.location || "");
          setTitle(resume.title || "");
          setSummary(resume.summary || "");
          setSkills(resume.skills || "");
          setLanguages(resume.languages || "");
          if (resume.experience) setExperience(JSON.parse(resume.experience));
          if (resume.education) setEducation(JSON.parse(resume.education));
          if (resume.projects) setProjects(JSON.parse(resume.projects));
        }
      });
    }
  }, [resumeId]);

  async function handleSave() {
    setSaving(true);
    try {
      const res = await fetch("/api/resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: resumeId, templateId, fullName, email, phone, location, title, summary, experience, education, skills, projects, languages }),
      });
      const text = await res.text();
      if (!text) {
        alert("Server error. Please try again.");
        setSaving(false);
        return;
      }
      const data = JSON.parse(text);
      setSaving(false);
      if (data.error) {
        alert(data.error);
      } else if (data.resume) {
        router.push(`/resume-builder/preview?id=${data.resume.id}`);
      }
    } catch (err) {
      setSaving(false);
      alert("Failed to save resume. Please try again.");
    }
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/resume-builder" className="text-sm text-gray-500 hover:text-[#1a73e8]"><i className="fa-solid fa-arrow-left mr-2"></i>Back</Link>
          <h1 className="font-bold text-gray-900">Resume Builder</h1>
          <button onClick={handleSave} disabled={saving} className="bg-[#1a73e8] text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 disabled:opacity-50">
            {saving ? "Saving..." : "Save & Preview"}
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        {/* Personal Info */}
        <section className="bg-white rounded-2xl border p-6">
          <h2 className="font-bold text-lg text-gray-900 mb-4"><i className="fa-solid fa-user text-[#1a73e8] mr-2"></i>Personal Information</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div><label className="text-sm font-semibold text-gray-700">Full Name *</label><input value={fullName} onChange={e => setFullName(e.target.value)} className="w-full mt-1 px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-[#1a73e8] outline-none" placeholder="John Doe" /></div>
            <div><label className="text-sm font-semibold text-gray-700">Email *</label><input value={email} onChange={e => setEmail(e.target.value)} className="w-full mt-1 px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-[#1a73e8] outline-none" placeholder="john@example.com" /></div>
            <div><label className="text-sm font-semibold text-gray-700">Phone</label><input value={phone} onChange={e => setPhone(e.target.value)} className="w-full mt-1 px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-[#1a73e8] outline-none" placeholder="+91 9876543210" /></div>
            <div><label className="text-sm font-semibold text-gray-700">Location</label><input value={location} onChange={e => setLocation(e.target.value)} className="w-full mt-1 px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-[#1a73e8] outline-none" placeholder="Mumbai, India" /></div>
            <div><label className="text-sm font-semibold text-gray-700">Job Title / Headline</label><input value={title} onChange={e => setTitle(e.target.value)} className="w-full mt-1 px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-[#1a73e8] outline-none" placeholder="Full Stack Developer" /></div>
            <div><label className="text-sm font-semibold text-gray-700">Template</label>
              <select value={templateId} onChange={e => setTemplateId(e.target.value)} className="w-full mt-1 px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-[#1a73e8] outline-none">
                <option value="professional">Professional</option>
                <option value="minimal">Minimal</option>
                <option value="creative">Creative</option>
                <option value="executive">Executive</option>
                <option value="tech">Tech Modern</option>
                <option value="academic">Academic</option>
              </select>
            </div>
          </div>
          <div className="mt-4"><label className="text-sm font-semibold text-gray-700">Professional Summary</label><textarea value={summary} onChange={e => setSummary(e.target.value)} rows={3} className="w-full mt-1 px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-[#1a73e8] outline-none" placeholder="Brief professional summary..." /></div>
        </section>

        {/* Experience */}
        <section className="bg-white rounded-2xl border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-lg text-gray-900"><i className="fa-solid fa-briefcase text-[#1a73e8] mr-2"></i>Experience</h2>
            <button onClick={() => setExperience([...experience, { company: "", role: "", duration: "", description: "" }])} className="text-sm text-[#1a73e8] font-semibold"><i className="fa-solid fa-plus mr-1"></i>Add</button>
          </div>
          {experience.map((exp, i) => (
            <div key={i} className="border rounded-lg p-4 mb-3">
              <div className="grid md:grid-cols-2 gap-3">
                <input value={exp.company} onChange={e => { const u = [...experience]; u[i].company = e.target.value; setExperience(u); }} className="px-3 py-2 border rounded-lg text-sm outline-none focus:border-[#1a73e8]" placeholder="Company" />
                <input value={exp.role} onChange={e => { const u = [...experience]; u[i].role = e.target.value; setExperience(u); }} className="px-3 py-2 border rounded-lg text-sm outline-none focus:border-[#1a73e8]" placeholder="Role/Position" />
                <input value={exp.duration} onChange={e => { const u = [...experience]; u[i].duration = e.target.value; setExperience(u); }} className="px-3 py-2 border rounded-lg text-sm outline-none focus:border-[#1a73e8]" placeholder="Duration (e.g., Jan 2023 - Present)" />
                <button onClick={() => setExperience(experience.filter((_, j) => j !== i))} className="text-red-500 text-sm"><i className="fa-solid fa-trash mr-1"></i>Remove</button>
              </div>
              <textarea value={exp.description} onChange={e => { const u = [...experience]; u[i].description = e.target.value; setExperience(u); }} className="w-full mt-2 px-3 py-2 border rounded-lg text-sm outline-none focus:border-[#1a73e8]" rows={2} placeholder="Description of your role and achievements..." />
            </div>
          ))}
        </section>

        {/* Education */}
        <section className="bg-white rounded-2xl border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-lg text-gray-900"><i className="fa-solid fa-graduation-cap text-[#1a73e8] mr-2"></i>Education</h2>
            <button onClick={() => setEducation([...education, { institution: "", degree: "", year: "", grade: "" }])} className="text-sm text-[#1a73e8] font-semibold"><i className="fa-solid fa-plus mr-1"></i>Add</button>
          </div>
          {education.map((edu, i) => (
            <div key={i} className="border rounded-lg p-4 mb-3">
              <div className="grid md:grid-cols-2 gap-3">
                <input value={edu.institution} onChange={e => { const u = [...education]; u[i].institution = e.target.value; setEducation(u); }} className="px-3 py-2 border rounded-lg text-sm outline-none focus:border-[#1a73e8]" placeholder="Institution" />
                <input value={edu.degree} onChange={e => { const u = [...education]; u[i].degree = e.target.value; setEducation(u); }} className="px-3 py-2 border rounded-lg text-sm outline-none focus:border-[#1a73e8]" placeholder="Degree / Course" />
                <input value={edu.year} onChange={e => { const u = [...education]; u[i].year = e.target.value; setEducation(u); }} className="px-3 py-2 border rounded-lg text-sm outline-none focus:border-[#1a73e8]" placeholder="Year (e.g., 2020-2024)" />
                <div className="flex items-center gap-2">
                  <input value={edu.grade} onChange={e => { const u = [...education]; u[i].grade = e.target.value; setEducation(u); }} className="flex-1 px-3 py-2 border rounded-lg text-sm outline-none focus:border-[#1a73e8]" placeholder="Grade/CGPA" />
                  <button onClick={() => setEducation(education.filter((_, j) => j !== i))} className="text-red-500 text-sm"><i className="fa-solid fa-trash"></i></button>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Skills & Languages */}
        <section className="bg-white rounded-2xl border p-6">
          <h2 className="font-bold text-lg text-gray-900 mb-4"><i className="fa-solid fa-wrench text-[#1a73e8] mr-2"></i>Skills & Languages</h2>
          <div className="space-y-4">
            <div><label className="text-sm font-semibold text-gray-700">Skills (comma-separated)</label><input value={skills} onChange={e => setSkills(e.target.value)} className="w-full mt-1 px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-[#1a73e8] outline-none" placeholder="React, Node.js, Python, SQL..." /></div>
            <div><label className="text-sm font-semibold text-gray-700">Languages (comma-separated)</label><input value={languages} onChange={e => setLanguages(e.target.value)} className="w-full mt-1 px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-[#1a73e8] outline-none" placeholder="English, Hindi..." /></div>
          </div>
        </section>

        {/* Projects */}
        <section className="bg-white rounded-2xl border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-lg text-gray-900"><i className="fa-solid fa-diagram-project text-[#1a73e8] mr-2"></i>Projects</h2>
            <button onClick={() => setProjects([...projects, { name: "", description: "", link: "" }])} className="text-sm text-[#1a73e8] font-semibold"><i className="fa-solid fa-plus mr-1"></i>Add</button>
          </div>
          {projects.map((proj, i) => (
            <div key={i} className="border rounded-lg p-4 mb-3">
              <div className="grid md:grid-cols-2 gap-3">
                <input value={proj.name} onChange={e => { const u = [...projects]; u[i].name = e.target.value; setProjects(u); }} className="px-3 py-2 border rounded-lg text-sm outline-none focus:border-[#1a73e8]" placeholder="Project Name" />
                <div className="flex items-center gap-2">
                  <input value={proj.link} onChange={e => { const u = [...projects]; u[i].link = e.target.value; setProjects(u); }} className="flex-1 px-3 py-2 border rounded-lg text-sm outline-none focus:border-[#1a73e8]" placeholder="Project URL" />
                  <button onClick={() => setProjects(projects.filter((_, j) => j !== i))} className="text-red-500 text-sm"><i className="fa-solid fa-trash"></i></button>
                </div>
              </div>
              <textarea value={proj.description} onChange={e => { const u = [...projects]; u[i].description = e.target.value; setProjects(u); }} className="w-full mt-2 px-3 py-2 border rounded-lg text-sm outline-none focus:border-[#1a73e8]" rows={2} placeholder="Brief description..." />
            </div>
          ))}
        </section>

        <div className="text-center pb-8">
          <button onClick={handleSave} disabled={saving} className="bg-[#1a73e8] text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 disabled:opacity-50 text-lg">
            <i className="fa-solid fa-eye mr-2"></i>{saving ? "Saving..." : "Save & Preview Resume"}
          </button>
        </div>
      </div>
    </div>
  );
}
