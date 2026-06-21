"use client";

import Link from "next/link";
import { useRef } from "react";

type Course = { id: string; title: string; slug: string; category: string; description: string; thumbnail: string | null; instructor: string; price: number; duration: string; level: string; enrolled: number; rating: number; skills: string | null; syllabus: string | null; isActive: boolean; featured: boolean; createdAt: Date; updatedAt: Date };
type Internship = { id: string; title: string; slug: string; company: string; location: string; type: string; mode: string; stipend: string | null; companyLogo: string | null; duration: string; description: string; requirements: string | null; skills: string; openings: number; deadline: Date | null; isActive: boolean; featured: boolean; createdAt: Date; updatedAt: Date };
type Mentor = { id: string; name: string; title: string; company: string | null; avatar: string | null; slug: string; expertise: string; bio: string | null; experience: number; rating: number; sessions: number; price: number; isActive: boolean; featured: boolean; createdAt: Date; updatedAt: Date };
type Post = { id: string; title: string; slug: string; excerpt: string | null; category: string; content: string; tags: string | null; thumbnail: string | null; isPublished: boolean; views: number; likes: number; createdAt: Date; updatedAt: Date; authorId: string };

const courseCategories = [
  { name: "Full Stack Web Development", icon: "fa-code", gradient: "from-blue-900 to-blue-700", img: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=500&fit=crop" },
  { name: "Artificial Intelligence", icon: "fa-brain", gradient: "from-indigo-900 to-indigo-700", img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=500&fit=crop" },
  { name: "AI Agents", icon: "fa-robot", gradient: "from-slate-900 to-slate-700", img: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=500&fit=crop" },
  { name: "Cyber Security", icon: "fa-shield-halved", gradient: "from-cyan-900 to-cyan-700", img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=500&fit=crop" },
  { name: "Data Science", icon: "fa-chart-line", gradient: "from-purple-900 to-purple-700", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=500&fit=crop" },
  { name: "Cloud Computing", icon: "fa-cloud", gradient: "from-sky-900 to-sky-700", img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=500&fit=crop" },
];

const stats = [
  { label: "STUDENTS", value: "2k+", icon: "fa-users", color: "text-[#1a73e8]", bg: "bg-blue-50" },
  { label: "MENTORS", value: "50+", icon: "fa-star", color: "text-[#f59e0b]", bg: "bg-amber-50" },
  { label: "PROJECTS", value: "100+", icon: "fa-code-branch", color: "text-[#10b981]", bg: "bg-emerald-50" },
  { label: "COURSES", value: "30+", icon: "fa-play-circle", color: "text-[#ef4444]", bg: "bg-red-50" },
  { label: "INTERNSHIPS", value: "200+", icon: "fa-briefcase", color: "text-[#8b5cf6]", bg: "bg-purple-50" },
];

export default function HomeClient({ courses, internships, mentors, posts }: {
  courses: Course[];
  internships: Internship[];
  mentors: Mentor[];
  posts: Post[];
}) {
  const mentorScrollRef = useRef<HTMLDivElement>(null);

  function scrollMentors(dir: "left" | "right") {
    if (mentorScrollRef.current) {
      mentorScrollRef.current.scrollBy({ left: dir === "left" ? -280 : 280, behavior: "smooth" });
    }
  }

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 pt-6 pb-4">
        <div className="grid md:grid-cols-2 gap-4 min-h-[280px]">
          {/* Left Banner */}
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-blue-50 to-blue-100">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent"></div>
            <div className="relative p-8 flex flex-col justify-center h-full">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-[#1a73e8] rounded-lg flex items-center justify-center">
                  <i className="fa-solid fa-arrow-up-right-dots text-white text-xs"></i>
                </div>
                <span className="text-sm font-bold text-[#1a73e8]">Techible</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight mb-2">
                SUMMER<br />SCHOOL <span className="bg-[#1a73e8] text-white px-2 py-0.5 rounded text-lg">2026</span>
              </h2>
              <p className="text-sm font-semibold text-gray-700 mb-4">INTERNSHIP & TRAINING</p>
              <Link href="/summer-school" className="inline-flex items-center gap-2 bg-[#1a73e8] text-white px-5 py-2.5 rounded-full text-sm font-bold w-fit hover:bg-[#1557b0] transition-colors">
                APPLY NOW <i className="fa-solid fa-arrow-right text-xs"></i>
              </Link>
              <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                <i className="fa-solid fa-circle text-[6px] animate-pulse"></i> Registrations are live
              </p>
            </div>
          </div>

          {/* Right - Journey */}
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-blue-50 via-white to-orange-50">
            <div className="p-8 flex flex-col justify-center h-full">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">
                  <i className="fa-solid fa-circle text-[5px] mr-1"></i> Opportunities · Guidance · Real Impact
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-2">
                Your journey.<br />
                <span className="text-[#1a73e8]">Limitless possibilities.</span>
              </h1>
              <p className="text-sm text-gray-500 max-w-sm">
                Techible connects Indian students with internships, mentors, colleges, and opportunities to learn, connect, and grow.
              </p>
            </div>
            <div className="absolute bottom-0 right-0 w-40 h-40 md:w-56 md:h-56">
              <div className="w-full h-full bg-gradient-to-tl from-blue-200/40 to-transparent rounded-tl-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="max-w-7xl mx-auto px-4 pb-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex items-center justify-around flex-wrap gap-4">
          <div className="w-12 h-12 bg-[#e8f0fe] rounded-full flex items-center justify-center">
            <i className="fa-solid fa-arrow-up-right-dots text-[#1a73e8]"></i>
          </div>
          {stats.map((s) => (
            <div key={s.label} className="flex items-center gap-3">
              <div className={`w-8 h-8 ${s.bg} rounded-full flex items-center justify-center`}>
                <i className={`fa-solid ${s.icon} ${s.color} text-xs`}></i>
              </div>
              <div>
                <p className="text-xl font-extrabold text-gray-900">{s.value}</p>
                <p className="text-[10px] font-bold text-gray-400 tracking-wider">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Browse Courses */}
      <section className="max-w-7xl mx-auto px-4 pb-10">
        <div className="flex items-center justify-between mb-1">
          <div className="section-heading">
            <h2 className="text-2xl font-bold text-gray-900">Browse <span>Courses</span></h2>
            <p className="text-sm text-gray-500">Explore courses by category</p>
          </div>
          <Link href="/courses" className="text-sm font-semibold text-[#1a73e8] hover:underline">See all &rarr;</Link>
        </div>
        <div className="flex gap-4 overflow-x-auto scroll-container py-4">
          {courseCategories.map((cat) => (
            <Link
              key={cat.name}
              href="/courses"
              className="relative flex-shrink-0 w-44 h-56 rounded-2xl overflow-hidden group"
            >
              <img src={cat.img} alt={cat.name} className="absolute inset-0 w-full h-full object-cover" />
              <div className={`absolute inset-0 bg-gradient-to-t ${cat.gradient} opacity-75`}></div>
              <div className="absolute inset-0 flex flex-col justify-end p-4">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mb-2 backdrop-blur-sm">
                  <i className={`fa-solid ${cat.icon} text-white text-sm`}></i>
                </div>
                <h3 className="text-white font-bold text-base leading-tight">{cat.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Cards - Intern with Faculty / Host Seminar */}
      <section className="max-w-7xl mx-auto px-4 pb-10">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-blue-600 to-blue-500 p-8 text-white">
            <div className="absolute top-4 right-4 w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
              <i className="fa-solid fa-flask text-2xl text-white/60"></i>
            </div>
            <h3 className="text-xl font-bold mb-2">Intern with Faculty</h3>
            <p className="text-sm text-blue-100 mb-4 max-w-xs">Work directly with top professors on cutting-edge research projects and gain academic credits.</p>
            <Link href="/faculty" className="inline-flex items-center gap-2 bg-white text-blue-600 px-5 py-2.5 rounded-full text-sm font-bold hover:bg-blue-50 transition-colors">
              Find Professors
            </Link>
          </div>
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-orange-500 to-amber-400 p-8 text-white">
            <div className="absolute top-4 right-4 w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
              <i className="fa-solid fa-microphone text-2xl text-white/60"></i>
            </div>
            <h3 className="text-xl font-bold mb-2">Host Your Own Seminar</h3>
            <p className="text-sm text-orange-100 mb-4 max-w-xs">Organize tech talks, hackathons, and workshops on your campus. We provide the resources.</p>
            <Link href="/create-event" className="inline-flex items-center gap-2 bg-white text-orange-600 px-5 py-2.5 rounded-full text-sm font-bold hover:bg-orange-50 transition-colors">
              Start Organizing
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="max-w-7xl mx-auto px-4 pb-10">
        <div className="flex items-center justify-between mb-4">
          <div className="section-heading">
            <h2 className="text-2xl font-bold text-gray-900">Featured <span>Projects</span></h2>
            <p className="text-sm text-gray-500">Explore real-world projects by top creators</p>
          </div>
          <Link href="/projects" className="flex items-center gap-1 text-sm font-semibold text-[#1a73e8] hover:underline">
            View All <i className="fa-solid fa-arrow-right text-xs"></i>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {internships.slice(0, 3).map((item) => (
            <Link key={item.id} href={`/internships/${item.slug}`} className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mb-3">
                <i className="fa-solid fa-code text-[#1a73e8]"></i>
              </div>
              <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.company} &middot; {item.location}</p>
              <div className="flex gap-2 mt-3">
                <span className="text-xs font-semibold px-2 py-0.5 bg-blue-50 text-blue-600 rounded">{item.type.toUpperCase()}</span>
                {item.stipend && <span className="text-xs font-semibold px-2 py-0.5 bg-green-50 text-green-600 rounded">PAID</span>}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Courses */}
      <section className="max-w-7xl mx-auto px-4 pb-10">
        <div className="flex items-center justify-between mb-4">
          <div className="section-heading">
            <h2 className="text-2xl font-bold text-gray-900">Featured <span>Courses</span></h2>
            <p className="text-sm text-gray-500">Handpicked courses to kickstart your journey</p>
          </div>
          <Link href="/courses" className="flex items-center gap-1 text-sm font-semibold text-[#1a73e8] hover:underline">
            View All <i className="fa-solid fa-arrow-right text-xs"></i>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {courses.slice(0, 3).map((course) => (
            <Link key={course.id} href={`/courses/${course.slug}`} className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-36 bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                <i className="fa-solid fa-graduation-cap text-4xl text-[#1a73e8]/40"></i>
              </div>
              <div className="p-4">
                <span className="text-xs font-semibold text-[#1a73e8] bg-blue-50 px-2 py-0.5 rounded">{course.category}</span>
                <h3 className="font-bold text-gray-900 mt-2 mb-1">{course.title}</h3>
                <p className="text-sm text-gray-500 line-clamp-2">{course.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Explore Internships */}
      <section className="max-w-7xl mx-auto px-4 pb-10">
        <div className="flex items-center justify-between mb-4">
          <div className="section-heading">
            <h2 className="text-2xl font-bold text-gray-900">Explore <span>Internships</span></h2>
            <p className="text-sm text-gray-500">Trending roles across top domains</p>
          </div>
          <Link href="/internships" className="flex items-center gap-1 text-sm font-semibold text-[#1a73e8] hover:underline">
            View All <i className="fa-solid fa-arrow-right text-xs"></i>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {internships.slice(0, 6).map((item) => {
            const icons = ["fa-adobe", "fa-salesforce", "fa-microchip", "fa-amazon", "fa-google", "fa-microsoft"];
            const colors = ["bg-red-50 text-red-500", "bg-blue-50 text-blue-500", "bg-green-50 text-green-500", "bg-orange-50 text-orange-500", "bg-purple-50 text-purple-500", "bg-cyan-50 text-cyan-500"];
            const idx = internships.indexOf(item);
            return (
              <Link key={item.id} href={`/internships/${item.slug}`} className="flex items-center gap-4 bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-shadow">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${colors[idx % colors.length]}`}>
                  <i className={`fa-solid fa-building`}></i>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-sm text-gray-900 truncate">{item.title}</h3>
                  <p className="text-xs text-gray-500 truncate">{item.company} &middot; {item.location}</p>
                  <div className="flex gap-2 mt-1">
                    <span className="text-[10px] font-bold px-1.5 py-0.5 bg-blue-50 text-blue-600 rounded">{item.type === "onsite" ? "ON-SITE" : item.type === "remote" ? "REMOTE" : "HYBRID"}</span>
                    {item.stipend && <span className="text-[10px] font-bold px-1.5 py-0.5 bg-green-50 text-green-600 rounded">PAID</span>}
                  </div>
                </div>
                <i className="fa-solid fa-arrow-right text-gray-300 text-xs"></i>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Mentorship Section */}
      <section className="max-w-7xl mx-auto px-4 pb-10">
        <div className="flex items-center justify-between mb-4">
          <div className="section-heading">
            <h2 className="text-2xl font-bold text-gray-900">Get Mentorship from <span>Industry Experts</span></h2>
            <p className="text-sm text-gray-500">1-on-1 sessions with professionals from top companies</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => scrollMentors("left")} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
              <i className="fa-solid fa-chevron-left text-xs text-gray-500"></i>
            </button>
            <button onClick={() => scrollMentors("right")} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
              <i className="fa-solid fa-chevron-right text-xs text-gray-500"></i>
            </button>
            <Link href="/mentors" className="flex items-center gap-1 text-sm font-semibold text-[#1a73e8] hover:underline ml-2">
              View All <i className="fa-solid fa-arrow-right text-xs"></i>
            </Link>
          </div>
        </div>
        <div ref={mentorScrollRef} className="flex gap-4 overflow-x-auto scroll-container pb-2">
          {mentors.map((mentor) => (
            <div key={mentor.id} className="flex-shrink-0 w-44 bg-white rounded-2xl border border-gray-100 p-4 text-center hover:shadow-md transition-shadow">
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center mb-3 overflow-hidden">
                {mentor.avatar ? (
                  <img src={mentor.avatar} alt={mentor.name} className="w-full h-full object-cover" />
                ) : (
                  <i className="fa-solid fa-user text-2xl text-[#1a73e8]/40"></i>
                )}
              </div>
              <h3 className="font-bold text-sm text-gray-900">{mentor.name}</h3>
              <p className="text-xs text-gray-500 mt-0.5">{mentor.title}</p>
              <p className="text-xs text-gray-400">{mentor.company}</p>
              <Link href={`/mentors`} className="mt-3 block w-full py-2 text-xs font-bold text-[#1a73e8] border border-[#1a73e8] rounded-full hover:bg-[#1a73e8] hover:text-white transition-colors">
                Book Session
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* WhatsApp Community */}
      <section className="max-w-7xl mx-auto px-4 pb-12">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-green-600 to-emerald-500 p-8 md:p-12">
          <div className="absolute top-4 right-4 opacity-10">
            <i className="fa-brands fa-whatsapp text-[120px] text-white"></i>
          </div>
          <div className="relative">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-2">Join Our WhatsApp Community</h2>
            <p className="text-green-100 text-sm max-w-lg mb-6">
              Connect with peers, get updates on internships & courses, and grow together with 1000+ members.
            </p>
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center gap-2 text-sm text-white">
                <i className="fa-solid fa-users"></i> 1000+ Members
              </div>
              <div className="flex items-center gap-2 text-sm text-white">
                <i className="fa-solid fa-bolt"></i> Daily Updates
              </div>
              <div className="flex items-center gap-2 text-sm text-white">
                <i className="fa-solid fa-comments"></i> Active Discussions
              </div>
            </div>
            <a
              href="#"
              className="inline-flex items-center gap-2 bg-white text-green-600 px-6 py-3 rounded-full text-sm font-bold hover:bg-green-50 transition-colors"
            >
              <i className="fa-brands fa-whatsapp text-lg"></i>
              Join Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
