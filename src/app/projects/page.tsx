import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { FolderOpen, MapPin, Clock, IndianRupee } from "lucide-react";

export const dynamic = "force-dynamic";
export const metadata = { title: "Techible | Projects" };

export default async function ProjectsPage() {
  const projects = await prisma.internship.findMany({
    where: { isActive: true, type: "project" },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Project Internships</h1>
        <p className="text-gray-600 mt-2">Build real-world projects and strengthen your portfolio</p>
      </div>
      {projects.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <FolderOpen className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>No project internships available right now. Check back soon!</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((item) => (
            <Link key={item.id} href={`/internships/${item.slug}`} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow group">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <FolderOpen className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 text-sm">{item.title}</h3>
                  <p className="text-xs text-gray-500">{item.company}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 line-clamp-2 mb-3">{item.description}</p>
              <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{item.location}</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{item.duration}</span>
                {item.stipend && <span className="flex items-center gap-1"><IndianRupee className="w-3 h-3" />{item.stipend}</span>}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
