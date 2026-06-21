"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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

  const inputClass = "w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a73e8]/30 focus:border-[#1a73e8]";

  return (
    <div className="bg-white min-h-screen">
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-pink-50 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-600 px-3 py-1.5 rounded-full text-xs font-semibold mb-4">
            <i className="fa-solid fa-calendar-plus text-xs"></i> Host an Event
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-3">
            Create Your <span className="text-[#1a73e8]">Event</span>
          </h1>
          <p className="text-gray-500 max-w-md">Host a hackathon, workshop, webinar, or conference</p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 p-8 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Event Title *</label>
              <input type="text" required className={inputClass} value={formData.title} onChange={(e) => update("title", e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Type *</label>
              <select className={inputClass} value={formData.type} onChange={(e) => update("type", e.target.value)}>
                <option value="hackathon">Hackathon</option>
                <option value="workshop">Workshop</option>
                <option value="webinar">Webinar</option>
                <option value="conference">Conference</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Mode *</label>
              <select className={inputClass} value={formData.mode} onChange={(e) => update("mode", e.target.value)}>
                <option value="online">Online</option>
                <option value="offline">Offline</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Organizer *</label>
              <input type="text" required className={inputClass} value={formData.organizer} onChange={(e) => update("organizer", e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Location *</label>
              <input type="text" required className={inputClass} value={formData.location} onChange={(e) => update("location", e.target.value)} placeholder="City or Online" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Start Date *</label>
              <input type="datetime-local" required className={inputClass} value={formData.date} onChange={(e) => update("date", e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">End Date</label>
              <input type="datetime-local" className={inputClass} value={formData.endDate} onChange={(e) => update("endDate", e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Entry Fee (INR)</label>
              <input type="number" min="0" className={inputClass} value={formData.fees} onChange={(e) => update("fees", e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Max Participants</label>
              <input type="number" min="1" className={inputClass} value={formData.maxParticipants} onChange={(e) => update("maxParticipants", e.target.value)} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Description *</label>
            <textarea required rows={4} className={`${inputClass} resize-none`} value={formData.description} onChange={(e) => update("description", e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Eligibility</label>
            <textarea rows={2} className={`${inputClass} resize-none`} value={formData.eligibility} onChange={(e) => update("eligibility", e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Prizes</label>
            <textarea rows={2} className={`${inputClass} resize-none`} value={formData.prizes} onChange={(e) => update("prizes", e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Website URL</label>
            <input type="url" className={inputClass} value={formData.website} onChange={(e) => update("website", e.target.value)} />
          </div>
          {error && (
            <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600 flex items-center gap-2">
              <i className="fa-solid fa-circle-exclamation"></i> {error}
            </div>
          )}
          <button type="submit" disabled={loading}
            className="px-8 py-3 bg-[#1a73e8] text-white font-bold rounded-xl hover:bg-[#1557b0] transition-colors disabled:opacity-50 inline-flex items-center gap-2">
            {loading ? <><i className="fa-solid fa-spinner fa-spin"></i> Creating...</> : <><i className="fa-solid fa-paper-plane text-xs"></i> Create Event</>}
          </button>
        </form>
      </div>
    </div>
  );
}
