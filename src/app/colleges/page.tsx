import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const metadata = { title: "Techible | Institutes" };

export default async function CollegesPage() {
  const colleges = await prisma.college.findMany({
    where: { isActive: true },
    orderBy: { ranking: "asc" },
  });

  return (
    <div className="bg-white min-h-screen">
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 md:py-16">
        <div className="absolute top-10 right-20 w-20 h-20 border-2 border-indigo-200/30 rounded-full"></div>
        <div className="max-w-7xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-full text-xs font-semibold mb-4">
            <i className="fa-solid fa-building-columns text-xs"></i>
            Top Institutes
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-3">
            All <span className="text-[#1a73e8]">Institutes</span>
          </h1>
          <p className="text-gray-500 max-w-md">IITs, NITs, IIITs and top universities across India</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {colleges.length === 0 ? (
          <div className="text-center py-20">
            <i className="fa-solid fa-building-columns text-5xl text-gray-200 mb-4"></i>
            <p className="text-gray-500">No institutes listed yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {colleges.map((college) => (
              <Link key={college.id} href={`/colleges/${college.slug}`} className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-lg transition-shadow group">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center">
                    <i className="fa-solid fa-building-columns text-lg text-indigo-600"></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 group-hover:text-[#1a73e8] transition-colors truncate">{college.name}</h3>
                    <span className="text-[10px] font-bold bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">{college.type}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-500 mb-2">
                  <span className="flex items-center gap-1"><i className="fa-solid fa-location-dot text-xs"></i> {college.location}</span>
                  {college.ranking && <span className="flex items-center gap-1"><i className="fa-solid fa-trophy text-yellow-500 text-xs"></i> Rank #{college.ranking}</span>}
                </div>
                {college.established && <p className="text-xs text-gray-400">Est. {college.established}</p>}
                {college.website && (
                  <p className="text-xs text-[#1a73e8] mt-2 flex items-center gap-1">
                    <i className="fa-solid fa-arrow-up-right-from-square text-[10px]"></i> Visit Website
                  </p>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
