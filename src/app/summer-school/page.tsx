import { prisma } from "@/lib/prisma";
import { GraduationCap, MapPin, Calendar, ExternalLink } from "lucide-react";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";
export const metadata = { title: "Techible | Summer School" };

export default async function SummerSchoolPage() {
  const schools = await prisma.summerSchool.findMany({
    where: { isActive: true },
    orderBy: { startDate: "asc" },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Summer Schools</h1>
        <p className="text-gray-600 mt-2">Explore summer programs from top institutes across India</p>
      </div>
      {schools.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <GraduationCap className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>No summer schools listed yet. Check back soon!</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {schools.map((school) => (
            <div key={school.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-32 bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center">
                <GraduationCap className="w-10 h-10 text-white/80" />
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-gray-900">{school.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{school.institute}</p>
                <div className="flex flex-wrap gap-3 mt-3 text-sm text-gray-500">
                  <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{school.location}</span>
                  <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{formatDate(school.startDate)} - {formatDate(school.endDate)}</span>
                </div>
                <div className="flex items-center justify-between mt-4 pt-3 border-t">
                  <span className="font-semibold text-gray-900">{school.fees === 0 ? "Free" : `₹${school.fees}`}</span>
                  {school.website && (
                    <a href={school.website} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline flex items-center gap-1">
                      <ExternalLink className="w-3 h-3" /> Apply
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
