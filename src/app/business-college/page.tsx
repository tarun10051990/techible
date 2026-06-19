import Link from "next/link";
import { GraduationCap, Users, ArrowRight, Building2, CheckCircle } from "lucide-react";

export const metadata = { title: "Techible | Business College" };

export default function BusinessCollegePage() {
  return (
    <div>
      <section className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="px-3 py-1 text-xs font-medium bg-white/20 rounded-full">For Colleges</span>
            <h1 className="text-4xl font-bold mt-4 mb-6">Partner with Techible for Campus Placements</h1>
            <p className="text-xl text-indigo-100 mb-8">
              Connect your students with top tech companies. List your institution, showcase faculty, 
              and help students discover opportunities.
            </p>
            <Link href="/signup" className="px-8 py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors inline-flex items-center gap-2">
              Register Your Institute <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Benefits for Institutions</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: GraduationCap, title: "Student Placements", desc: "Help your students access internships and jobs at leading tech companies across India." },
              { icon: Users, title: "Faculty Visibility", desc: "Showcase your faculty's research and expertise to a wide audience of students and industry professionals." },
              { icon: Building2, title: "Industry Connect", desc: "Build partnerships with companies for campus hiring events, workshops, and collaborative projects." },
            ].map((benefit) => (
              <div key={benefit.title} className="bg-white rounded-xl border border-gray-200 p-6 text-center">
                <benefit.icon className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">What You Get</h2>
              <div className="space-y-3">
                {[
                  "Dedicated institute profile page",
                  "Faculty directory with research highlights",
                  "Access to company partnership opportunities",
                  "Student placement analytics dashboard",
                  "Event hosting and promotion tools",
                  "Summer school program listings",
                ].map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-indigo-600 rounded-2xl p-8 text-white text-center">
              <h3 className="text-2xl font-bold mb-4">Free for All Institutions</h3>
              <p className="text-indigo-100 mb-6">
                Listing your institution on Techible is completely free. 
                Premium features are available for enhanced visibility and analytics.
              </p>
              <Link href="/signup" className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors inline-block">
                Get Started Free
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
