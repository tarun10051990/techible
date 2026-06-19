import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Calendar, MapPin, Users, Clock } from "lucide-react";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";
export const metadata = { title: "Techible | Events" };

export default async function EventsPage() {
  const events = await prisma.event.findMany({
    where: { isActive: true },
    orderBy: { date: "asc" },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Events</h1>
        <p className="text-gray-600 mt-2">Hackathons, workshops, webinars and more</p>
      </div>
      {events.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>No events scheduled yet. Check back soon!</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <Link key={event.id} href={`/events/${event.slug}`} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow group">
              <div className="h-32 bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                <Calendar className="w-10 h-10 text-white/80" />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 text-xs font-medium bg-orange-100 text-orange-700 rounded-full capitalize">{event.type}</span>
                  <span className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded-full capitalize">{event.mode}</span>
                </div>
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 line-clamp-2">{event.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{event.organizer}</p>
                <div className="flex flex-wrap gap-3 mt-3 text-sm text-gray-500">
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{formatDate(event.date)}</span>
                  <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{event.location}</span>
                </div>
                <div className="flex items-center justify-between mt-4 pt-3 border-t">
                  <span className="font-semibold text-gray-900">{event.fees === 0 ? "Free" : `₹${event.fees}`}</span>
                  {event.maxParticipants && (
                    <span className="text-xs text-gray-500 flex items-center gap-1"><Users className="w-3 h-3" />{event.registrations}/{event.maxParticipants}</span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
