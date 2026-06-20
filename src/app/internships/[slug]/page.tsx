import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function InternshipDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const internship = await prisma.internship.findUnique({ where: { slug } });
  if (!internship) notFound();

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link href="/internships" className="inline-flex items-center gap-2 text-sm font-semibold text-[#1a73e8] hover:underline mb-6">
          <i className="fa-solid fa-arrow-left text-xs"></i> Back to Internships
        </Link>

        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm shrink-0">
                <i className="fa-solid fa-briefcase text-2xl text-[#1a73e8]"></i>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-5 h-5 bg-[#1a73e8] rounded flex items-center justify-center">
                    <i className="fa-solid fa-arrow-up-right-dots text-white text-[8px]"></i>
                  </div>
                  <span className="text-xs font-semibold text-gray-500">Reviewed by Techible</span>
                </div>
                <h1 className="text-2xl font-extrabold text-gray-900">{internship.title}</h1>
                <p className="text-lg text-gray-600 font-medium">{internship.company}</p>
              </div>
            </div>
          </div>

          <div className="p-8">
            {/* Info Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-gray-50 rounded-xl p-3">
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                  <i className="fa-solid fa-location-dot"></i> Location
                </div>
                <p className="text-sm font-bold text-gray-900">{internship.location}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-3">
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                  <i className="fa-regular fa-clock"></i> Duration
                </div>
                <p className="text-sm font-bold text-gray-900">{internship.duration || "Flexible"}</p>
              </div>
              {internship.stipend && (
                <div className="bg-gray-50 rounded-xl p-3">
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                    <i className="fa-solid fa-indian-rupee-sign"></i> Stipend
                  </div>
                  <p className="text-sm font-bold text-gray-900">{internship.stipend}</p>
                </div>
              )}
              <div className="bg-gray-50 rounded-xl p-3">
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                  <i className="fa-solid fa-users"></i> Openings
                </div>
                <p className="text-sm font-bold text-gray-900">{internship.openings}</p>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              <span className="px-3 py-1.5 text-xs font-bold bg-blue-50 text-blue-600 rounded-full capitalize">
                <i className="fa-solid fa-laptop-code mr-1"></i> {internship.mode}
              </span>
              <span className="px-3 py-1.5 text-xs font-bold bg-green-50 text-green-600 rounded-full capitalize">
                <i className="fa-solid fa-building mr-1"></i> {internship.type}
              </span>
              {internship.stipend && (
                <span className="px-3 py-1.5 text-xs font-bold bg-emerald-50 text-emerald-600 rounded-full">
                  <i className="fa-solid fa-coins mr-1"></i> Paid
                </span>
              )}
              {internship.deadline && (
                <span className="px-3 py-1.5 text-xs font-bold bg-red-50 text-red-600 rounded-full">
                  <i className="fa-regular fa-calendar mr-1"></i> Deadline: {formatDate(internship.deadline)}
                </span>
              )}
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <i className="fa-solid fa-file-lines text-[#1a73e8]"></i> Description
              </h3>
              <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">{internship.description}</div>
            </div>

            {/* Requirements */}
            {internship.requirements && (
              <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <i className="fa-solid fa-list-check text-[#1a73e8]"></i> Requirements
                </h3>
                <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">{internship.requirements}</div>
              </div>
            )}

            {/* Skills */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <i className="fa-solid fa-code text-[#1a73e8]"></i> Skills Required
              </h3>
              <div className="flex flex-wrap gap-2">
                {internship.skills.split(",").map((skill) => (
                  <span key={skill} className="px-3 py-1.5 text-xs font-semibold bg-gray-100 text-gray-700 rounded-full">{skill.trim()}</span>
                ))}
              </div>
            </div>

            {/* Apply */}
            <div className="border-t border-gray-100 pt-6">
              <Link
                href="/login"
                className="inline-flex items-center gap-2 px-8 py-3 bg-[#1a73e8] text-white font-bold rounded-full hover:bg-[#1557b0] transition-colors"
              >
                Apply Now <i className="fa-solid fa-arrow-right text-xs"></i>
              </Link>
              <p className="text-xs text-gray-400 mt-2">Login required to apply</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
