import { Target, Users, Zap, Award, Globe, Heart } from "lucide-react";

export const metadata = { title: "Techible | About Us" };

export default function AboutUsPage() {
  return (
    <div>
      <section className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">About Techible</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            We are building India&apos;s largest platform connecting students with tech opportunities, 
            mentors, and world-class education.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-600 mb-4">
                Techible was founded with a simple yet powerful mission: to democratize access to tech 
                opportunities for every student in India. We believe that talent is everywhere, but 
                opportunity is not equally distributed.
              </p>
              <p className="text-gray-600">
                Our platform bridges this gap by connecting students with top companies for internships, 
                world-class courses for skill development, expert mentors for guidance, and a vibrant 
                community of tech enthusiasts.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Target, label: "500+", desc: "Active Internships" },
                { icon: Users, label: "50+", desc: "Partner Institutes" },
                { icon: Award, label: "200+", desc: "Expert Mentors" },
                { icon: Globe, label: "10K+", desc: "Students Placed" },
              ].map((stat) => (
                <div key={stat.desc} className="bg-blue-50 rounded-xl p-6 text-center">
                  <stat.icon className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{stat.label}</p>
                  <p className="text-sm text-gray-600">{stat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: "Innovation", desc: "We constantly innovate to provide the best platform experience for students and companies alike." },
              { icon: Heart, title: "Inclusivity", desc: "We believe in equal access to opportunities regardless of background, location, or institution." },
              { icon: Award, title: "Excellence", desc: "We partner only with the best companies, institutes, and mentors to ensure quality outcomes." },
            ].map((value) => (
              <div key={value.title} className="bg-white rounded-xl p-6 border border-gray-200">
                <value.icon className="w-10 h-10 text-blue-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Team</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-12">
            We are a passionate team of engineers, educators, and entrepreneurs dedicated to 
            transforming tech education and career outcomes in India.
          </p>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { name: "Rahul Sharma", role: "Founder & CEO" },
              { name: "Priya Patel", role: "CTO" },
              { name: "Amit Kumar", role: "Head of Partnerships" },
              { name: "Sneha Gupta", role: "Head of Community" },
            ].map((member) => (
              <div key={member.name} className="text-center">
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mb-3">
                  <span className="text-white text-2xl font-bold">{member.name.charAt(0)}</span>
                </div>
                <h3 className="font-semibold text-gray-900">{member.name}</h3>
                <p className="text-sm text-gray-500">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
