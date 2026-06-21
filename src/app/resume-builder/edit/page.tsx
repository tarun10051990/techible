"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import SkillsInput from "@/components/SkillsInput";
import UniversityInput from "@/components/UniversityInput";
import LanguageInput from "@/components/LanguageInput";

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
  const [errors, setErrors] = useState<Record<string, string>>({});

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

  function validate(): boolean {
    const newErrors: Record<string, string> = {};

    if (!fullName.trim()) newErrors.fullName = "Full name is required";
    else if (fullName.trim().length < 2) newErrors.fullName = "Name must be at least 2 characters";

    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Please enter a valid email address";

    if (phone && !/^[\+]?[\d\s\-\(\)]{7,15}$/.test(phone.replace(/\s/g, ""))) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!title.trim()) newErrors.title = "Job title is required to build a professional resume";

    if (summary && summary.length < 20) newErrors.summary = "Summary should be at least 20 characters for impact";

    // Validate experience entries that have data
    experience.forEach((exp, i) => {
      if (exp.role || exp.company) {
        if (!exp.role) newErrors[`exp_role_${i}`] = "Role is required";
        if (!exp.company) newErrors[`exp_company_${i}`] = "Company is required";
        if (!exp.duration) newErrors[`exp_duration_${i}`] = "Duration is required";
      }
    });

    // Validate education entries that have data
    education.forEach((edu, i) => {
      if (edu.degree || edu.institution) {
        if (!edu.degree) newErrors[`edu_degree_${i}`] = "Degree is required";
        if (!edu.institution) newErrors[`edu_institution_${i}`] = "Institution is required";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSave() {
    if (!validate()) {
      // Scroll to first error
      const firstErrorEl = document.querySelector("[data-error]");
      firstErrorEl?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

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
    } catch {
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

      {/* Validation Summary */}
      {Object.keys(errors).length > 0 && (
        <div className="max-w-5xl mx-auto px-4 mt-4">
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
            <i className="fa-solid fa-circle-exclamation text-red-500 mt-0.5"></i>
            <div>
              <p className="text-sm font-semibold text-red-800">Please fix the following errors:</p>
              <ul className="mt-1 text-sm text-red-600 list-disc list-inside">
                {Object.entries(errors).slice(0, 5).map(([key, msg]) => <li key={key}>{msg}</li>)}
                {Object.keys(errors).length > 5 && <li>...and {Object.keys(errors).length - 5} more</li>}
              </ul>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        {/* Personal Info */}
        <section className="bg-white rounded-2xl border p-6">
          <h2 className="font-bold text-lg text-gray-900 mb-4"><i className="fa-solid fa-user text-[#1a73e8] mr-2"></i>Personal Information</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div data-error={errors.fullName ? "" : undefined}>
              <label className="text-sm font-semibold text-gray-700">Full Name <span className="text-red-500">*</span></label>
              <input value={fullName} onChange={e => { setFullName(e.target.value); setErrors(prev => { const n = {...prev}; delete n.fullName; return n; }); }} className={`w-full mt-1 px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-[#1a73e8] outline-none ${errors.fullName ? "border-red-300 bg-red-50" : ""}`} placeholder="John Doe" />
              {errors.fullName && <p className="text-xs text-red-500 mt-1"><i className="fa-solid fa-circle-exclamation mr-1"></i>{errors.fullName}</p>}
            </div>
            <div data-error={errors.email ? "" : undefined}>
              <label className="text-sm font-semibold text-gray-700">Email <span className="text-red-500">*</span></label>
              <input type="email" value={email} onChange={e => { setEmail(e.target.value); setErrors(prev => { const n = {...prev}; delete n.email; return n; }); }} className={`w-full mt-1 px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-[#1a73e8] outline-none ${errors.email ? "border-red-300 bg-red-50" : ""}`} placeholder="john@example.com" />
              {errors.email && <p className="text-xs text-red-500 mt-1"><i className="fa-solid fa-circle-exclamation mr-1"></i>{errors.email}</p>}
            </div>
            <div data-error={errors.phone ? "" : undefined}>
              <label className="text-sm font-semibold text-gray-700">Phone</label>
              <input value={phone} onChange={e => { setPhone(e.target.value); setErrors(prev => { const n = {...prev}; delete n.phone; return n; }); }} className={`w-full mt-1 px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-[#1a73e8] outline-none ${errors.phone ? "border-red-300 bg-red-50" : ""}`} placeholder="+91 9876543210" />
              {errors.phone && <p className="text-xs text-red-500 mt-1"><i className="fa-solid fa-circle-exclamation mr-1"></i>{errors.phone}</p>}
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700">Location</label>
              <input value={location} onChange={e => setLocation(e.target.value)} className="w-full mt-1 px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-[#1a73e8] outline-none" placeholder="Mumbai, India" />
            </div>
            <div data-error={errors.title ? "" : undefined}>
              <label className="text-sm font-semibold text-gray-700">Job Title / Headline <span className="text-red-500">*</span></label>
              <input value={title} onChange={e => { setTitle(e.target.value); setErrors(prev => { const n = {...prev}; delete n.title; return n; }); }} className={`w-full mt-1 px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-[#1a73e8] outline-none ${errors.title ? "border-red-300 bg-red-50" : ""}`} placeholder="Full Stack Developer" />
              {errors.title && <p className="text-xs text-red-500 mt-1"><i className="fa-solid fa-circle-exclamation mr-1"></i>{errors.title}</p>}
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700">Template</label>
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
          <div className="mt-4" data-error={errors.summary ? "" : undefined}>
            <label className="text-sm font-semibold text-gray-700">Professional Summary</label>
            <textarea value={summary} onChange={e => { setSummary(e.target.value); setErrors(prev => { const n = {...prev}; delete n.summary; return n; }); }} rows={3} className={`w-full mt-1 px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-[#1a73e8] outline-none ${errors.summary ? "border-red-300 bg-red-50" : ""}`} placeholder="Brief professional summary highlighting your key strengths..." />
            {errors.summary && <p className="text-xs text-red-500 mt-1"><i className="fa-solid fa-circle-exclamation mr-1"></i>{errors.summary}</p>}
            {summary && <p className="text-xs text-gray-400 mt-1">{summary.length} characters</p>}
          </div>
        </section>

        {/* Experience */}
        <section className="bg-white rounded-2xl border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-lg text-gray-900"><i className="fa-solid fa-briefcase text-[#1a73e8] mr-2"></i>Experience</h2>
            <button onClick={() => setExperience([...experience, { company: "", role: "", duration: "", description: "" }])} className="text-sm text-[#1a73e8] font-semibold hover:bg-blue-50 px-3 py-1 rounded-lg transition"><i className="fa-solid fa-plus mr-1"></i>Add</button>
          </div>
          {experience.map((exp, i) => (
            <div key={i} className="border rounded-xl p-4 mb-3 hover:border-gray-300 transition">
              <div className="grid md:grid-cols-2 gap-3">
                <div>
                  <input value={exp.role} onChange={e => { const u = [...experience]; u[i].role = e.target.value; setExperience(u); setErrors(prev => { const n = {...prev}; delete n[`exp_role_${i}`]; return n; }); }} className={`w-full px-3 py-2 border rounded-lg text-sm outline-none focus:border-[#1a73e8] ${errors[`exp_role_${i}`] ? "border-red-300 bg-red-50" : ""}`} placeholder="Role/Position *" />
                  {errors[`exp_role_${i}`] && <p className="text-xs text-red-500 mt-0.5">{errors[`exp_role_${i}`]}</p>}
                </div>
                <div>
                  <input value={exp.company} onChange={e => { const u = [...experience]; u[i].company = e.target.value; setExperience(u); setErrors(prev => { const n = {...prev}; delete n[`exp_company_${i}`]; return n; }); }} className={`w-full px-3 py-2 border rounded-lg text-sm outline-none focus:border-[#1a73e8] ${errors[`exp_company_${i}`] ? "border-red-300 bg-red-50" : ""}`} placeholder="Company *" />
                  {errors[`exp_company_${i}`] && <p className="text-xs text-red-500 mt-0.5">{errors[`exp_company_${i}`]}</p>}
                </div>
                <div>
                  <input value={exp.duration} onChange={e => { const u = [...experience]; u[i].duration = e.target.value; setExperience(u); setErrors(prev => { const n = {...prev}; delete n[`exp_duration_${i}`]; return n; }); }} className={`w-full px-3 py-2 border rounded-lg text-sm outline-none focus:border-[#1a73e8] ${errors[`exp_duration_${i}`] ? "border-red-300 bg-red-50" : ""}`} placeholder="Duration (e.g., Jan 2023 - Present) *" />
                  {errors[`exp_duration_${i}`] && <p className="text-xs text-red-500 mt-0.5">{errors[`exp_duration_${i}`]}</p>}
                </div>
                <div className="flex items-start justify-end">
                  <button onClick={() => setExperience(experience.filter((_, j) => j !== i))} className="text-red-500 text-sm hover:bg-red-50 px-3 py-2 rounded-lg transition"><i className="fa-solid fa-trash mr-1"></i>Remove</button>
                </div>
              </div>
              <textarea value={exp.description} onChange={e => { const u = [...experience]; u[i].description = e.target.value; setExperience(u); }} className="w-full mt-3 px-3 py-2 border rounded-lg text-sm outline-none focus:border-[#1a73e8]" rows={2} placeholder="Description of your role and key achievements..." />
            </div>
          ))}
        </section>

        {/* Education */}
        <section className="bg-white rounded-2xl border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-lg text-gray-900"><i className="fa-solid fa-graduation-cap text-[#1a73e8] mr-2"></i>Education</h2>
            <button onClick={() => setEducation([...education, { institution: "", degree: "", year: "", grade: "" }])} className="text-sm text-[#1a73e8] font-semibold hover:bg-blue-50 px-3 py-1 rounded-lg transition"><i className="fa-solid fa-plus mr-1"></i>Add</button>
          </div>
          {education.map((edu, i) => (
            <div key={i} className="border rounded-xl p-4 mb-3 hover:border-gray-300 transition">
              <div className="grid md:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Institution <span className="text-red-400">*</span></label>
                  <UniversityInput
                    value={edu.institution}
                    onChange={val => { const u = [...education]; u[i].institution = val; setEducation(u); setErrors(prev => { const n = {...prev}; delete n[`edu_institution_${i}`]; return n; }); }}
                    placeholder="Start typing university name..."
                  />
                  {errors[`edu_institution_${i}`] && <p className="text-xs text-red-500 mt-0.5">{errors[`edu_institution_${i}`]}</p>}
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Degree / Course <span className="text-red-400">*</span></label>
                  <input value={edu.degree} onChange={e => { const u = [...education]; u[i].degree = e.target.value; setEducation(u); setErrors(prev => { const n = {...prev}; delete n[`edu_degree_${i}`]; return n; }); }} className={`w-full px-3 py-2 border rounded-lg text-sm outline-none focus:border-[#1a73e8] ${errors[`edu_degree_${i}`] ? "border-red-300 bg-red-50" : ""}`} placeholder="B.Tech in Computer Science" />
                  {errors[`edu_degree_${i}`] && <p className="text-xs text-red-500 mt-0.5">{errors[`edu_degree_${i}`]}</p>}
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Year</label>
                  <input value={edu.year} onChange={e => { const u = [...education]; u[i].year = e.target.value; setEducation(u); }} className="w-full px-3 py-2 border rounded-lg text-sm outline-none focus:border-[#1a73e8]" placeholder="2020-2024" />
                </div>
                <div className="flex items-end gap-2">
                  <div className="flex-1">
                    <label className="text-xs text-gray-500 mb-1 block">Grade/CGPA</label>
                    <input value={edu.grade} onChange={e => { const u = [...education]; u[i].grade = e.target.value; setEducation(u); }} className="w-full px-3 py-2 border rounded-lg text-sm outline-none focus:border-[#1a73e8]" placeholder="8.5 CGPA" />
                  </div>
                  <button onClick={() => setEducation(education.filter((_, j) => j !== i))} className="text-red-500 text-sm hover:bg-red-50 px-3 py-2 rounded-lg transition mb-0.5"><i className="fa-solid fa-trash"></i></button>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Skills & Languages */}
        <section className="bg-white rounded-2xl border p-6">
          <h2 className="font-bold text-lg text-gray-900 mb-4"><i className="fa-solid fa-wrench text-[#1a73e8] mr-2"></i>Skills & Languages</h2>
          <div className="space-y-5">
            <SkillsInput value={skills} onChange={setSkills} />
            <LanguageInput value={languages} onChange={setLanguages} />
          </div>
        </section>

        {/* Projects */}
        <section className="bg-white rounded-2xl border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-lg text-gray-900"><i className="fa-solid fa-diagram-project text-[#1a73e8] mr-2"></i>Projects</h2>
            <button onClick={() => setProjects([...projects, { name: "", description: "", link: "" }])} className="text-sm text-[#1a73e8] font-semibold hover:bg-blue-50 px-3 py-1 rounded-lg transition"><i className="fa-solid fa-plus mr-1"></i>Add</button>
          </div>
          {projects.map((proj, i) => (
            <div key={i} className="border rounded-xl p-4 mb-3 hover:border-gray-300 transition">
              <div className="grid md:grid-cols-2 gap-3">
                <input value={proj.name} onChange={e => { const u = [...projects]; u[i].name = e.target.value; setProjects(u); }} className="px-3 py-2 border rounded-lg text-sm outline-none focus:border-[#1a73e8]" placeholder="Project Name" />
                <div className="flex items-center gap-2">
                  <input value={proj.link} onChange={e => { const u = [...projects]; u[i].link = e.target.value; setProjects(u); }} className="flex-1 px-3 py-2 border rounded-lg text-sm outline-none focus:border-[#1a73e8]" placeholder="Project URL (optional)" />
                  <button onClick={() => setProjects(projects.filter((_, j) => j !== i))} className="text-red-500 text-sm hover:bg-red-50 px-3 py-2 rounded-lg transition"><i className="fa-solid fa-trash"></i></button>
                </div>
              </div>
              <textarea value={proj.description} onChange={e => { const u = [...projects]; u[i].description = e.target.value; setProjects(u); }} className="w-full mt-3 px-3 py-2 border rounded-lg text-sm outline-none focus:border-[#1a73e8]" rows={2} placeholder="Brief description of the project..." />
            </div>
          ))}
        </section>

        <div className="text-center pb-8">
          <button onClick={handleSave} disabled={saving} className="bg-[#1a73e8] text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 disabled:opacity-50 text-lg shadow-lg shadow-blue-200">
            <i className="fa-solid fa-eye mr-2"></i>{saving ? "Saving..." : "Save & Preview Resume"}
          </button>
        </div>
      </div>
    </div>
  );
}
