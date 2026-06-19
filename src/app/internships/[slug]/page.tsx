import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Briefcase, MapPin, Clock, IndianRupee, Users, Calendar, ArrowLeft } from "lucide-react";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function InternshipDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const internship = await prisma.internship.findUnique({ where: { slug } });
  if (!internship) notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link href="/internships" className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to Internships
      </Link>

      <div className="bg-white rounded-xl border border-gray-200 p-8">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
            <Briefcase className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{internship.title}</h1>
            <p className="text-lg text-gray-600">{internship.company}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4 text-gray-400" />
            <span>{internship.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="w-4 h-4 text-gray-400" />
            <span>{internship.duration}</span>
          </div>
          {internship.stipend && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <IndianRupee className="w-4 h-4 text-gray-400" />
              <span>{internship.stipend}</span>
            </div>
          )}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Users className="w-4 h-4 text-gray-400" />
            <span>{internship.openings} openings</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          <span className="px-3 py-1 text-sm font-medium bg-green-100 text-green-700 rounded-full capitalize">{internship.mode}</span>
          <span className="px-3 py-1 text-sm font-medium bg-blue-100 text-blue-700 rounded-full capitalize">{internship.type}</span>
          {internship.deadline && (
            <span className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded-full flex items-center gap-1">
              <Calendar className="w-3 h-3" /> Deadline: {formatDate(internship.deadline)}
            </span>
          )}
        </div>

        <div className="prose max-w-none mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
          <div className="text-gray-700 whitespace-pre-wrap">{internship.description}</div>
        </div>

        {internship.requirements && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Requirements</h3>
            <div className="text-gray-700 whitespace-pre-wrap">{internship.requirements}</div>
          </div>
        )}

        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Skills Required</h3>
          <div className="flex flex-wrap gap-2">
            {internship.skills.split(",").map((skill) => (
              <span key={skill} className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full">{skill.trim()}</span>
            ))}
          </div>
        </div>

        <div className="border-t pt-6">
          <Link
            href="/login"
            className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors inline-block"
          >
            Apply Now
          </Link>
          <p className="text-xs text-gray-500 mt-2">Login required to apply</p>
        </div>
      </div>
    </div>
  );
}
