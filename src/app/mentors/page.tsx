import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const metadata = { title: "Techible | Mentors" };

export default async function MentorsPage() {
  const mentors = await prisma.mentor.findMany({ where: { isActive: true }, orderBy: { createdAt: "desc" } });

  return (
    <div className="bg-white min-h-screen">
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-yellow-50 py-12 md:py-16">
        <div className="absolute top-8 right-16 w-24 h-24 border-2 border-orange-200/30 rounded-full"></div>
        <div className="max-w-7xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-600 px-3 py-1.5 rounded-full text-xs font-semibold mb-4">
            <i className="fa-solid fa-chalkboard-user text-xs"></i>
            Industry Experts
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-3">
            Get <span className="text-[#1a73e8]">Mentorship</span>
          </h1>
          <p className="text-gray-500 max-w-md">1-on-1 sessions with professionals from top companies</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {mentors.length === 0 ? (
          <div className="text-center py-20">
            <i className="fa-solid fa-user-tie text-5xl text-gray-200 mb-4"></i>
            <p className="text-gray-500">No mentors listed yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {mentors.map((mentor) => (
              <div key={mentor.id} className="bg-white rounded-2xl border border-gray-100 p-5 text-center hover:shadow-lg transition-shadow">
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
                <div className="flex flex-wrap justify-center gap-1 mt-2">
                  {mentor.expertise.split(",").slice(0, 2).map((s) => (
                    <span key={s} className="text-[10px] font-semibold bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">{s.trim()}</span>
                  ))}
                </div>
                <button className="mt-3 w-full py-2 text-xs font-bold text-[#1a73e8] border border-[#1a73e8] rounded-full hover:bg-[#1a73e8] hover:text-white transition-colors">
                  Book Session
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
