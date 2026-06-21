import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";
export const metadata = { title: "Techible | Events" };

export default async function EventsPage() {
  const events = await prisma.event.findMany({ orderBy: { date: "desc" } });

  return (
    <div className="bg-white min-h-screen">
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-pink-50 py-12 md:py-16">
        <div className="absolute top-10 right-20 w-20 h-20 border-2 border-purple-200/30 rounded-full"></div>
        <div className="max-w-7xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-600 px-3 py-1.5 rounded-full text-xs font-semibold mb-4">
            <i className="fa-solid fa-calendar-days text-xs"></i>
            Upcoming & Past
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-3">
            Tech <span className="text-[#1a73e8]">Events</span>
          </h1>
          <p className="text-gray-500 max-w-md">Hackathons, workshops, seminars and meetups across India</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {events.length === 0 ? (
          <div className="text-center py-20">
            <i className="fa-solid fa-calendar-xmark text-5xl text-gray-200 mb-4"></i>
            <p className="text-gray-500">No events listed yet.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {events.map((event) => (
              <Link key={event.id} href={`/events/${event.slug}`} className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow group">
                <div className="h-40 bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center relative">
                  <i className="fa-solid fa-calendar-days text-4xl text-purple-300"></i>
                  <div className="absolute top-3 left-3 bg-white rounded-lg px-2 py-1 shadow-sm">
                    <p className="text-[10px] font-bold text-[#1a73e8] uppercase">{new Date(event.date).toLocaleString("en", { month: "short" })}</p>
                    <p className="text-lg font-extrabold text-gray-900 leading-none">{new Date(event.date).getDate()}</p>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${event.mode === "online" ? "bg-green-100 text-green-700" : event.mode === "offline" ? "bg-blue-100 text-blue-700" : "bg-yellow-100 text-yellow-700"}`}>
                      {event.mode.charAt(0).toUpperCase() + event.mode.slice(1)}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 mb-1 group-hover:text-[#1a73e8] transition-colors line-clamp-2">{event.title}</h3>
                  <div className="flex items-center gap-3 text-xs text-gray-500 mt-2">
                    <span className="flex items-center gap-1"><i className="fa-solid fa-location-dot"></i> {event.location}</span>
                    <span className="flex items-center gap-1"><i className="fa-regular fa-clock"></i> {formatDate(event.date)}</span>
                  </div>
                  {event.organizer && (
                    <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                      <i className="fa-solid fa-user text-[10px]"></i> {event.organizer}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
