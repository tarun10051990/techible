import Link from "next/link";

export const metadata = { title: "Techible | About Us" };

export default function AboutUsPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-16 md:py-24">
        <div className="absolute top-10 right-20 w-32 h-32 border-2 border-blue-200/20 rounded-full"></div>
        <div className="absolute bottom-10 left-10 w-20 h-20 border-2 border-indigo-200/20 rounded-full"></div>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-[#1a73e8] px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <i className="fa-solid fa-heart text-xs"></i> Our Story
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
            About <span className="text-[#1a73e8]">Techible</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            We connect Indian students with internships, mentors, colleges, and opportunities to learn, connect, and grow.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Our <span className="text-[#1a73e8]">Mission</span></h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Techible was founded with a simple belief: every student deserves access to quality opportunities regardless of their background or location. We bridge the gap between students and the tech industry by providing a unified platform for internships, courses, mentorship, and community.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Our platform curates opportunities from top research labs, companies, and educational institutions across India, making them easily discoverable for students who are eager to learn and grow.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-2xl p-6 text-center">
              <i className="fa-solid fa-users text-3xl text-[#1a73e8] mb-3"></i>
              <p className="text-3xl font-extrabold text-gray-900">2k+</p>
              <p className="text-sm text-gray-500">Students</p>
            </div>
            <div className="bg-amber-50 rounded-2xl p-6 text-center">
              <i className="fa-solid fa-chalkboard-user text-3xl text-amber-500 mb-3"></i>
              <p className="text-3xl font-extrabold text-gray-900">50+</p>
              <p className="text-sm text-gray-500">Mentors</p>
            </div>
            <div className="bg-green-50 rounded-2xl p-6 text-center">
              <i className="fa-solid fa-code-branch text-3xl text-green-500 mb-3"></i>
              <p className="text-3xl font-extrabold text-gray-900">100+</p>
              <p className="text-sm text-gray-500">Projects</p>
            </div>
            <div className="bg-purple-50 rounded-2xl p-6 text-center">
              <i className="fa-solid fa-briefcase text-3xl text-purple-500 mb-3"></i>
              <p className="text-3xl font-extrabold text-gray-900">200+</p>
              <p className="text-sm text-gray-500">Internships</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">What We <span className="text-[#1a73e8]">Stand For</span></h2>
            <p className="text-gray-500">The principles that guide everything we do</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: "fa-lightbulb", color: "text-amber-500", bg: "bg-amber-50", title: "Innovation First", desc: "We embrace new technologies and approaches to deliver the best experience for students and educators." },
              { icon: "fa-handshake", color: "text-blue-500", bg: "bg-blue-50", title: "Community Driven", desc: "Built by students, for students. Our community shapes everything we build and every decision we make." },
              { icon: "fa-scale-balanced", color: "text-green-500", bg: "bg-green-50", title: "Equal Access", desc: "Every student deserves the same opportunities. We work to level the playing field for all." },
            ].map((v) => (
              <div key={v.title} className="bg-white rounded-2xl border border-gray-100 p-8 hover:shadow-lg transition-shadow">
                <div className={`w-14 h-14 ${v.bg} rounded-2xl flex items-center justify-center mb-4`}>
                  <i className={`fa-solid ${v.icon} text-2xl ${v.color}`}></i>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{v.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-[#1a73e8] to-indigo-600 rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl font-extrabold mb-3">Ready to Start Your Journey?</h2>
          <p className="text-blue-100 mb-6 max-w-md mx-auto">Join thousands of students who are already learning, growing, and building their careers with Techible.</p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/signup" className="px-8 py-3 bg-white text-[#1a73e8] font-bold rounded-full hover:bg-blue-50 transition-colors">
              Get Started
            </Link>
            <Link href="/internships" className="px-8 py-3 border-2 border-white/50 text-white font-bold rounded-full hover:bg-white/10 transition-colors">
              Browse Internships
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
