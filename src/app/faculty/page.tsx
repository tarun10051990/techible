import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const metadata = { title: "Techible | Faculty" };

export default async function FacultyPage() {
  const faculty = await prisma.faculty.findMany({ orderBy: { name: "asc" }, include: { college: { select: { name: true } } } });

  return (
    <div className="bg-white min-h-screen">
      <section className="relative overflow-hidden bg-gradient-to-br from-teal-50 via-white to-cyan-50 py-12 md:py-16">
        <div className="absolute top-10 right-20 w-20 h-20 border-2 border-teal-200/30 rounded-full"></div>
        <div className="max-w-7xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 bg-teal-50 text-teal-600 px-3 py-1.5 rounded-full text-xs font-semibold mb-4">
            <i className="fa-solid fa-flask text-xs"></i>
            Research & Academia
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-3">
            Intern with <span className="text-[#1a73e8]">Faculty</span>
          </h1>
          <p className="text-gray-500 max-w-md">Work directly with top professors on cutting-edge research projects</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {faculty.length === 0 ? (
          <div className="text-center py-20">
            <i className="fa-solid fa-flask text-5xl text-gray-200 mb-4"></i>
            <p className="text-gray-500">No faculty listed yet.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {faculty.map((f) => (
              <div key={f.id} className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center">
                    <i className="fa-solid fa-user-graduate text-lg text-teal-600"></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 truncate">{f.name}</h3>
                    <p className="text-xs text-gray-500">{f.designation}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-2">{f.department}</p>
                <p className="text-xs text-gray-400 flex items-center gap-1 mb-2">
                  <i className="fa-solid fa-building-columns text-[10px]"></i> {f.college.name}
                </p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {(f.specialization || "").split(",").slice(0, 3).filter(Boolean).map((area) => (
                    <span key={area} className="text-[10px] font-semibold bg-teal-50 text-teal-600 px-2 py-0.5 rounded-full">{area.trim()}</span>
                  ))}
                </div>
                {f.email && (
                  <a href={`mailto:${f.email}`} className="text-xs text-[#1a73e8] flex items-center gap-1 hover:underline">
                    <i className="fa-solid fa-envelope text-[10px]"></i> {f.email}
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
