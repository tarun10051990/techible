import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const metadata = { title: "Techible | Projects" };

export default async function ProjectsPage() {
  const internships = await prisma.internship.findMany({
    where: { type: "project" },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="bg-white min-h-screen">
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-teal-50 py-12 md:py-16">
        <div className="absolute top-10 right-20 w-20 h-20 border-2 border-emerald-200/30 rounded-full"></div>
        <div className="max-w-7xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-full text-xs font-semibold mb-4">
            <i className="fa-solid fa-code-branch text-xs"></i>
            Real-world Projects
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-3">
            Project Based <span className="text-[#1a73e8]">Internships</span>
          </h1>
          <p className="text-gray-500 max-w-md">Work on real-world projects with top creators and companies</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {internships.length === 0 ? (
          <div className="text-center py-20">
            <i className="fa-solid fa-code-branch text-5xl text-gray-200 mb-4"></i>
            <p className="text-gray-500">No project internships available right now.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {internships.map((item) => (
              <Link key={item.id} href={`/internships/${item.slug}`} className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow group">
                <div className="h-32 bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center">
                  <i className="fa-solid fa-code text-3xl text-emerald-300"></i>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-sm text-gray-900 mb-1 group-hover:text-[#1a73e8] transition-colors">{item.title}</h3>
                  <p className="text-xs text-gray-500">{item.company} &middot; {item.location}</p>
                  <div className="flex gap-2 mt-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-50 text-blue-600 rounded">{item.type === "onsite" ? "Offline" : item.type === "remote" ? "Online" : "Hybrid"}</span>
                    {item.stipend && <span className="text-[10px] font-bold px-2 py-0.5 bg-green-50 text-green-600 rounded">Paid</span>}
                  </div>
                  {item.stipend && <p className="text-sm font-bold text-gray-900 mt-2">{item.stipend}</p>}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
