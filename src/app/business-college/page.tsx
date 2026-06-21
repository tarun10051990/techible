import Link from "next/link";

export const metadata = { title: "Techible | For Colleges" };

export default function BusinessCollegePage() {
  return (
    <div className="bg-white min-h-screen">
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-600 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <i className="fa-solid fa-building-columns text-xs"></i> For Colleges
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
            Empower Your <span className="text-[#1a73e8]">Students</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-8">
            Partner with Techible to give your students access to internships, mentorship, and industry-ready training programs.
          </p>
          <Link href="/support" className="px-8 py-3 bg-[#1a73e8] text-white font-bold rounded-full hover:bg-[#1557b0] transition-colors">
            Partner With Us
          </Link>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: "fa-handshake", title: "Industry Connect", desc: "Bridge the gap between academia and industry with real-world opportunities." },
            { icon: "fa-chart-bar", title: "Placement Support", desc: "Improve your placement statistics with curated internship opportunities." },
            { icon: "fa-calendar-check", title: "Campus Events", desc: "Host workshops, hackathons, and seminars with full platform support." },
          ].map((f) => (
            <div key={f.title} className="bg-white rounded-2xl border border-gray-100 p-8 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mb-4">
                <i className={`fa-solid ${f.icon} text-2xl text-indigo-600`}></i>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
