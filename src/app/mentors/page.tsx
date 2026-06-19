import { prisma } from "@/lib/prisma";
import { UserCheck, Star, Clock, Briefcase } from "lucide-react";

export const dynamic = "force-dynamic";
export const metadata = { title: "Techible | Mentors" };

export default async function MentorsPage() {
  const mentors = await prisma.mentor.findMany({
    where: { isActive: true },
    orderBy: { rating: "desc" },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Mentors</h1>
        <p className="text-gray-600 mt-2">Get expert career guidance from industry professionals</p>
      </div>
      {mentors.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <UserCheck className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>No mentors available right now. Check back soon!</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mentors.map((mentor) => (
            <div key={mentor.id} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">{mentor.name.charAt(0)}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{mentor.name}</h3>
                  <p className="text-sm text-gray-600">{mentor.title}</p>
                  {mentor.company && <p className="text-xs text-gray-500">{mentor.company}</p>}
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                {mentor.expertise.split(",").slice(0, 3).map((skill) => (
                  <span key={skill} className="px-2 py-0.5 text-xs bg-blue-100 text-blue-700 rounded-full">{skill.trim()}</span>
                ))}
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <span className="flex items-center gap-1"><Star className="w-4 h-4 text-yellow-500" />{mentor.rating}</span>
                <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{mentor.sessions} sessions</span>
                <span className="flex items-center gap-1"><Briefcase className="w-4 h-4" />{mentor.experience}y exp</span>
              </div>
              <div className="flex items-center justify-between pt-3 border-t">
                <span className="font-semibold text-gray-900">{mentor.price === 0 ? "Free" : `₹${mentor.price}/session`}</span>
                <button className="px-4 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Book Session
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
