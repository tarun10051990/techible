import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { GraduationCap, MapPin, Trophy, ExternalLink } from "lucide-react";

export const dynamic = "force-dynamic";
export const metadata = { title: "Techible | Colleges" };

export default async function CollegesPage() {
  const colleges = await prisma.college.findMany({
    where: { isActive: true },
    orderBy: { ranking: "asc" },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">All Institutes</h1>
        <p className="text-gray-600 mt-2">IITs, NITs, IIITs and top universities across India</p>
      </div>
      {colleges.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <GraduationCap className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>No institutes listed yet. Check back soon!</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {colleges.map((college) => (
            <Link key={college.id} href={`/colleges/${college.slug}`} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow group">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">{college.name}</h3>
                  <span className="px-2 py-0.5 text-xs bg-blue-100 text-blue-700 rounded-full">{college.type}</span>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{college.location}</span>
                {college.ranking && <span className="flex items-center gap-1"><Trophy className="w-4 h-4" />Rank #{college.ranking}</span>}
              </div>
              {college.established && <p className="text-xs text-gray-400">Est. {college.established}</p>}
              {college.website && (
                <p className="text-xs text-blue-600 mt-2 flex items-center gap-1"><ExternalLink className="w-3 h-3" />Visit Website</p>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
