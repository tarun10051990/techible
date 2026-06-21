import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const metadata = { title: "Techible | Summer School" };

export default async function SummerSchoolPage() {
  const programs = await prisma.summerSchool.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="bg-white min-h-screen">
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-700 py-16 md:py-24 text-white">
        <div className="absolute top-10 right-10 w-40 h-40 border-2 border-white/10 rounded-full"></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 border-2 border-white/10 rounded-full"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <i className="fa-solid fa-sun text-yellow-300 text-xs"></i> Summer 2026
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            Summer School
          </h1>
          <p className="text-lg text-blue-100 max-w-xl mx-auto mb-8">
            Intensive training programs at top institutions. Gain hands-on experience and industry-ready skills.
          </p>
          <div className="inline-flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
            <i className="fa-solid fa-circle text-[6px] animate-pulse"></i> Registrations are live
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {programs.length === 0 ? (
          <div className="text-center py-20">
            <i className="fa-solid fa-school text-5xl text-gray-200 mb-4"></i>
            <p className="text-gray-500">Summer school programs coming soon!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((prog) => (
              <div key={prog.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-40 bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                  <i className="fa-solid fa-school text-4xl text-[#1a73e8]/30"></i>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 mb-1">{prog.title}</h3>
                  <p className="text-sm text-gray-500 mb-2">{prog.institute}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                    <span className="flex items-center gap-1"><i className="fa-regular fa-calendar"></i> {new Date(prog.startDate).toLocaleDateString()} - {new Date(prog.endDate).toLocaleDateString()}</span>
                    <span className="flex items-center gap-1"><i className="fa-solid fa-location-dot"></i> {prog.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-gray-900">{prog.fees === 0 ? "Free" : `₹${prog.fees}`}</span>
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${prog.isActive ? "bg-green-50 text-green-600" : "bg-gray-50 text-gray-500"}`}>
                      {prog.isActive ? "Open" : "Closed"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
