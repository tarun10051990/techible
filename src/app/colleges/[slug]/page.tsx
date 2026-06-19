import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { GraduationCap, MapPin, Trophy, ExternalLink, ArrowLeft, Users } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function CollegeDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const college = await prisma.college.findUnique({ where: { slug }, include: { faculties: true } });
  if (!college) notFound();

  const programs = college.programs ? college.programs.split(",").map((p) => p.trim()) : [];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link href="/colleges" className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to Institutes
      </Link>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="h-48 bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
          <GraduationCap className="w-16 h-16 text-white/80" />
        </div>
        <div className="p-8">
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-2xl font-bold text-gray-900">{college.name}</h1>
            <span className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full">{college.type}</span>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6">
            <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{college.location}</span>
            {college.ranking && <span className="flex items-center gap-1"><Trophy className="w-4 h-4" />Rank #{college.ranking}</span>}
            {college.established && <span>Est. {college.established}</span>}
            {college.website && (
              <a href={college.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-blue-600 hover:underline">
                <ExternalLink className="w-4 h-4" />Website
              </a>
            )}
          </div>
          {college.description && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">About</h3>
              <p className="text-gray-700 whitespace-pre-wrap">{college.description}</p>
            </div>
          )}
          {programs.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Programs Offered</h3>
              <div className="flex flex-wrap gap-2">
                {programs.map((p) => (
                  <span key={p} className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full">{p}</span>
                ))}
              </div>
            </div>
          )}
          {college.faculties.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Users className="w-5 h-5" /> Faculty ({college.faculties.length})
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {college.faculties.map((f) => (
                  <div key={f.id} className="p-4 bg-gray-50 rounded-lg">
                    <p className="font-medium text-gray-900">{f.name}</p>
                    <p className="text-sm text-gray-600">{f.designation}</p>
                    <p className="text-xs text-gray-500">{f.department}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
