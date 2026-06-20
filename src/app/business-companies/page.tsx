import Link from "next/link";

export const metadata = { title: "Techible | For Companies" };

export default function BusinessCompaniesPage() {
  return (
    <div className="bg-white min-h-screen">
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-[#1a73e8] px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <i className="fa-solid fa-building text-xs"></i> For Companies & Recruiters
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
            Hire <span className="text-[#1a73e8]">Top Talent</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-8">
            Post internships, find skilled candidates, and build your employer brand with India&apos;s growing student community.
          </p>
          <Link href="/support" className="px-8 py-3 bg-[#1a73e8] text-white font-bold rounded-full hover:bg-[#1557b0] transition-colors">
            Get Started
          </Link>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: "fa-bullseye", title: "Post Internships", desc: "Reach thousands of motivated students actively looking for opportunities." },
            { icon: "fa-users", title: "Access Talent Pool", desc: "Browse student profiles filtered by skills, college, and experience level." },
            { icon: "fa-chart-line", title: "Employer Branding", desc: "Build your company&apos;s reputation among India&apos;s next generation of tech talent." },
          ].map((f) => (
            <div key={f.title} className="bg-white rounded-2xl border border-gray-100 p-8 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-4">
                <i className={`fa-solid ${f.icon} text-2xl text-[#1a73e8]`}></i>
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
