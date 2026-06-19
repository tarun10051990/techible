import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Briefcase, MapPin, Clock, IndianRupee } from "lucide-react";

export const dynamic = "force-dynamic";
export const metadata = { title: "Techible | Internships" };

export default async function InternshipsPage() {
  const internships = await prisma.internship.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Skill Internships</h1>
        <p className="text-gray-600 mt-2">Work with top companies and gain real-world experience</p>
      </div>

      {internships.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <Briefcase className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>No internships available right now. Check back soon!</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {internships.map((item) => (
            <Link
              key={item.id}
              href={`/internships/${item.slug}`}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow group"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                    <Briefcase className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600">{item.title}</h2>
                    <p className="text-gray-600">{item.company}</p>
                    <div className="flex flex-wrap gap-3 mt-3 text-sm text-gray-500">
                      <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{item.location}</span>
                      <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{item.duration}</span>
                      {item.stipend && <span className="flex items-center gap-1"><IndianRupee className="w-4 h-4" />{item.stipend}</span>}
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {item.skills.split(",").slice(0, 4).map((skill) => (
                        <span key={skill} className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded-full">{skill.trim()}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="px-3 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full capitalize">{item.mode}</span>
                  {item.featured && <span className="px-3 py-1 text-xs font-medium bg-yellow-100 text-yellow-700 rounded-full">Featured</span>}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
