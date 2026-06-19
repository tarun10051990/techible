import Link from "next/link";
import { Building2, Users, Target, TrendingUp, CheckCircle, ArrowRight } from "lucide-react";

export const metadata = { title: "Techible | For Business" };

export default function ForBusinessPage() {
  return (
    <div>
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="px-3 py-1 text-xs font-medium bg-blue-500/20 text-blue-300 rounded-full">For Business</span>
            <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-6">Hire Top Tech Talent with Techible</h1>
            <p className="text-xl text-gray-300 mb-8">
              Access a pool of skilled, pre-vetted candidates from India&apos;s top institutions. 
              Post internships, find project partners, and build your dream team.
            </p>
            <Link href="/signup" className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2">
              Get Started <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Why Choose Techible?</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: Users, title: "Vetted Talent Pool", desc: "Access students from IITs, NITs, and top universities who have been pre-screened for skills and aptitude." },
              { icon: Target, title: "Targeted Hiring", desc: "Post internships and get applications from candidates matched to your specific requirements." },
              { icon: Building2, title: "Brand Visibility", desc: "Showcase your company to thousands of tech-savvy students and build your employer brand." },
              { icon: TrendingUp, title: "Fast Hiring", desc: "Reduce your time-to-hire with our streamlined application and screening process." },
            ].map((feature) => (
              <div key={feature.title} className="text-center">
                <div className="w-14 h-14 mx-auto bg-blue-100 rounded-2xl flex items-center justify-center mb-4">
                  <feature.icon className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Plans & Pricing</h2>
              <div className="space-y-4">
                {[
                  { name: "Starter", price: "Free", features: ["Post up to 3 internships", "Basic analytics", "Email support"] },
                  { name: "Pro", price: "₹9,999/mo", features: ["Unlimited internships", "Advanced analytics", "Priority support", "Featured listings"] },
                  { name: "Enterprise", price: "Custom", features: ["Dedicated account manager", "Campus hiring events", "Custom branding", "API access"] },
                ].map((plan) => (
                  <div key={plan.name} className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
                      <span className="text-lg font-bold text-blue-600">{plan.price}</span>
                    </div>
                    <ul className="space-y-1">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-500" />{f}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-blue-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Ready to get started?</h3>
              <p className="text-blue-100 mb-6">
                Join hundreds of companies already hiring through Techible. 
                Create your business account today and start posting opportunities.
              </p>
              <Link href="/signup" className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors inline-block">
                Create Business Account
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
