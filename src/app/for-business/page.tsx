import Link from "next/link";

export const metadata = { title: "Techible | For Business" };

export default function ForBusinessPage() {
  const features = [
    { icon: "fa-bullseye", title: "Targeted Hiring", desc: "Access a curated pool of pre-screened, motivated students ready for internships and projects." },
    { icon: "fa-chart-line", title: "Brand Visibility", desc: "Showcase your company to thousands of students across top institutes in India." },
    { icon: "fa-handshake", title: "Campus Connect", desc: "Build direct relationships with colleges and universities for sustained talent pipelines." },
    { icon: "fa-calendar-check", title: "Event Hosting", desc: "Host hackathons, workshops, and seminars through our platform with full logistics support." },
    { icon: "fa-graduation-cap", title: "Training Programs", desc: "Design and deliver custom training programs for students aligned with your tech stack." },
    { icon: "fa-clipboard-check", title: "Project Collaboration", desc: "Post real-world projects and get solutions from talented student teams." },
  ];

  return (
    <div className="bg-white min-h-screen">
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-white to-yellow-50 py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <i className="fa-solid fa-briefcase text-xs"></i> Business Solutions
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
            Partner with <span className="text-[#1a73e8]">Techible</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-8">
            Connect with India&apos;s brightest students. Hire interns, host events, and build your campus presence — all in one platform.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/support" className="px-8 py-3 bg-[#1a73e8] text-white font-bold rounded-full hover:bg-[#1557b0] transition-colors">
              Get Started
            </Link>
            <Link href="/about-us" className="px-8 py-3 border-2 border-gray-200 text-gray-700 font-bold rounded-full hover:border-gray-400 transition-colors">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Why <span className="text-[#1a73e8]">Businesses</span> Choose Us</h2>
          <p className="text-gray-500">Everything you need to build your campus presence</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div key={f.title} className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
                <i className={`fa-solid ${f.icon} text-xl text-[#1a73e8]`}></i>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-gradient-to-r from-[#1a73e8] to-indigo-600 rounded-2xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl font-extrabold mb-3">Ready to Hire Top Talent?</h2>
            <p className="text-blue-100 mb-6 max-w-md mx-auto">Join 100+ companies already hiring through Techible.</p>
            <Link href="/support" className="inline-flex items-center gap-2 px-8 py-3 bg-white text-[#1a73e8] font-bold rounded-full hover:bg-blue-50 transition-colors">
              Contact Us <i className="fa-solid fa-arrow-right text-xs"></i>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
