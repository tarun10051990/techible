import { prisma } from "@/lib/prisma";
import { Users, BookOpen, Mail } from "lucide-react";

export const dynamic = "force-dynamic";
export const metadata = { title: "Techible | Faculties" };

export default async function FacultyPage() {
  const faculties = await prisma.faculty.findMany({
    where: { isActive: true },
    include: { college: true },
    orderBy: { name: "asc" },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Faculties</h1>
        <p className="text-gray-600 mt-2">Connect with researchers and professors from top institutions</p>
      </div>
      {faculties.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>No faculty profiles listed yet.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {faculties.map((f) => (
            <div key={f.id} className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 font-bold">{f.name.charAt(0)}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{f.name}</h3>
                  <p className="text-sm text-gray-600">{f.designation}</p>
                </div>
              </div>
              <p className="text-sm text-gray-500 mb-2">{f.department} - {f.college.name}</p>
              {f.specialization && <p className="text-sm text-gray-600 mb-2">Specialization: {f.specialization}</p>}
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1"><BookOpen className="w-4 h-4" />{f.publications} publications</span>
                {f.email && <span className="flex items-center gap-1"><Mail className="w-4 h-4" />{f.email}</span>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
