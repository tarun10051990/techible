import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function CollegeDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const college = await prisma.college.findUnique({ where: { slug } });
  if (!college) notFound();

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link href="/colleges" className="inline-flex items-center gap-2 text-sm font-semibold text-[#1a73e8] hover:underline mb-6">
          <i className="fa-solid fa-arrow-left text-xs"></i> Back to Institutes
        </Link>
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-8">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                <i className="fa-solid fa-building-columns text-2xl text-indigo-600"></i>
              </div>
              <div>
                <h1 className="text-2xl font-extrabold text-gray-900">{college.name}</h1>
                <span className="text-xs font-bold bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">{college.type}</span>
              </div>
            </div>
          </div>
          <div className="p-8">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-gray-50 rounded-xl p-3">
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-1"><i className="fa-solid fa-location-dot"></i> Location</div>
                <p className="text-sm font-bold text-gray-900">{college.location}</p>
              </div>
              {college.ranking && (
                <div className="bg-gray-50 rounded-xl p-3">
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-1"><i className="fa-solid fa-trophy"></i> Ranking</div>
                  <p className="text-sm font-bold text-gray-900">#{college.ranking}</p>
                </div>
              )}
              {college.established && (
                <div className="bg-gray-50 rounded-xl p-3">
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-1"><i className="fa-solid fa-calendar"></i> Established</div>
                  <p className="text-sm font-bold text-gray-900">{college.established}</p>
                </div>
              )}
            </div>
            {college.description && (
              <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <i className="fa-solid fa-info-circle text-[#1a73e8]"></i> About
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">{college.description}</p>
              </div>
            )}
            {college.website && (
              <a href={college.website} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#1a73e8] text-white font-bold rounded-full hover:bg-[#1557b0] transition-colors">
                Visit Website <i className="fa-solid fa-arrow-up-right-from-square text-xs"></i>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
