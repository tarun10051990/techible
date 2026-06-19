import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Calendar, MapPin, Users, Clock, ArrowLeft, ExternalLink, Trophy } from "lucide-react";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = await prisma.event.findUnique({ where: { slug } });
  if (!event) notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link href="/events" className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to Events
      </Link>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="h-48 bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
          <Calendar className="w-16 h-16 text-white/80" />
        </div>
        <div className="p-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 text-sm font-medium bg-orange-100 text-orange-700 rounded-full capitalize">{event.type}</span>
            <span className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-full capitalize">{event.mode}</span>
            {event.featured && <span className="px-3 py-1 text-sm bg-yellow-100 text-yellow-700 rounded-full">Featured</span>}
          </div>
          <h1 className="text-2xl font-bold text-gray-900">{event.title}</h1>
          <p className="text-gray-600 mt-1">Organized by {event.organizer}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 mb-8">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="w-4 h-4 text-gray-400" />
              <span>{formatDate(event.date)}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span>{event.location}</span>
            </div>
            {event.maxParticipants && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Users className="w-4 h-4 text-gray-400" />
                <span>{event.registrations}/{event.maxParticipants} registered</span>
              </div>
            )}
            {event.website && (
              <a href={event.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm text-blue-600 hover:underline">
                <ExternalLink className="w-4 h-4" />Website
              </a>
            )}
          </div>

          <div className="p-4 bg-blue-50 rounded-lg flex items-center justify-between mb-8">
            <span className="text-2xl font-bold text-gray-900">{event.fees === 0 ? "Free Entry" : `₹${event.fees}`}</span>
            <Link href="/login" className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
              Register Now
            </Link>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">About This Event</h3>
            <div className="text-gray-700 whitespace-pre-wrap">{event.description}</div>
          </div>

          {event.eligibility && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Eligibility</h3>
              <div className="text-gray-700 whitespace-pre-wrap">{event.eligibility}</div>
            </div>
          )}

          {event.prizes && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-500" /> Prizes
              </h3>
              <div className="text-gray-700 whitespace-pre-wrap">{event.prizes}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
