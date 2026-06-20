import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = await prisma.event.findUnique({ where: { slug } });
  if (!event) notFound();

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link href="/events" className="inline-flex items-center gap-2 text-sm font-semibold text-[#1a73e8] hover:underline mb-6">
          <i className="fa-solid fa-arrow-left text-xs"></i> Back to Events
        </Link>
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="h-48 bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center relative">
            <i className="fa-solid fa-calendar-days text-6xl text-white/20"></i>
            <div className="absolute top-4 left-4 bg-white rounded-xl px-3 py-2 shadow-sm">
              <p className="text-[10px] font-bold text-[#1a73e8] uppercase">{new Date(event.date).toLocaleString("en", { month: "short" })}</p>
              <p className="text-2xl font-extrabold text-gray-900 leading-none">{new Date(event.date).getDate()}</p>
            </div>
          </div>
          <div className="p-8">
            <h1 className="text-2xl font-extrabold text-gray-900 mb-2">{event.title}</h1>
            <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-6">
              <span className="flex items-center gap-1.5"><i className="fa-solid fa-location-dot text-xs"></i> {event.location}</span>
              <span className="flex items-center gap-1.5"><i className="fa-regular fa-clock text-xs"></i> {formatDate(event.date)}</span>
              <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${event.mode === "online" ? "bg-green-50 text-green-600" : "bg-blue-50 text-blue-600"}`}>
                {event.mode.charAt(0).toUpperCase() + event.mode.slice(1)}
              </span>
            </div>
            {event.organizer && (
              <p className="text-sm text-gray-500 mb-4 flex items-center gap-2">
                <i className="fa-solid fa-user text-xs"></i> Organized by <span className="font-semibold text-gray-700">{event.organizer}</span>
              </p>
            )}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <i className="fa-solid fa-file-lines text-[#1a73e8]"></i> About this Event
              </h3>
              <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">{event.description}</div>
            </div>
            {event.website && (
              <a href={event.website} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3 bg-[#1a73e8] text-white font-bold rounded-full hover:bg-[#1557b0] transition-colors">
                Register Now <i className="fa-solid fa-arrow-up-right-from-square text-xs"></i>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
