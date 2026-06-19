"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, Send } from "lucide-react";

export default function CreateEventPage() {
  const [formData, setFormData] = useState({
    title: "", type: "hackathon", organizer: "", location: "", mode: "online",
    date: "", endDate: "", description: "", eligibility: "", prizes: "",
    fees: "0", maxParticipants: "", website: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      router.push(`/events/${data.slug}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create event");
    }
    setLoading(false);
  }

  function update(field: string, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center gap-3 mb-8">
        <Calendar className="w-8 h-8 text-blue-600" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Host an Event</h1>
          <p className="text-gray-600">Create a hackathon, workshop, or webinar</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Event Title *</label>
            <input type="text" required className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" value={formData.title} onChange={(e) => update("title", e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type *</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" value={formData.type} onChange={(e) => update("type", e.target.value)}>
              <option value="hackathon">Hackathon</option>
              <option value="workshop">Workshop</option>
              <option value="webinar">Webinar</option>
              <option value="conference">Conference</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mode *</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" value={formData.mode} onChange={(e) => update("mode", e.target.value)}>
              <option value="online">Online</option>
              <option value="offline">Offline</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Organizer *</label>
            <input type="text" required className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" value={formData.organizer} onChange={(e) => update("organizer", e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
            <input type="text" required className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" value={formData.location} onChange={(e) => update("location", e.target.value)} placeholder="City or Online" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date *</label>
            <input type="datetime-local" required className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" value={formData.date} onChange={(e) => update("date", e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
            <input type="datetime-local" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" value={formData.endDate} onChange={(e) => update("endDate", e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Entry Fee (INR)</label>
            <input type="number" min="0" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" value={formData.fees} onChange={(e) => update("fees", e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Max Participants</label>
            <input type="number" min="1" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" value={formData.maxParticipants} onChange={(e) => update("maxParticipants", e.target.value)} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
          <textarea required rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" value={formData.description} onChange={(e) => update("description", e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Eligibility</label>
          <textarea rows={2} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" value={formData.eligibility} onChange={(e) => update("eligibility", e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Prizes</label>
          <textarea rows={2} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" value={formData.prizes} onChange={(e) => update("prizes", e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Website URL</label>
          <input type="url" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" value={formData.website} onChange={(e) => update("website", e.target.value)} />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button type="submit" disabled={loading} className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 inline-flex items-center gap-2">
          <Send className="w-4 h-4" />{loading ? "Creating..." : "Create Event"}
        </button>
      </form>
    </div>
  );
}
