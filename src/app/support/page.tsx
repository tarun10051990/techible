"use client";

import { useState } from "react";
import { HelpCircle, Mail, Phone, MapPin, Send, Search } from "lucide-react";

export default function SupportPage() {
  const [tab, setTab] = useState<"contact" | "track">("contact");
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [trackingId, setTrackingId] = useState("");
  const [ticket, setTicket] = useState<{ trackingId: string; status: string; subject: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setSubmitted(true);
      setTrackingId(data.trackingId);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
    setSubmitting(false);
  }

  async function handleTrack(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch(`/api/support?trackingId=${encodeURIComponent(trackingId)}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setTicket(data.ticket);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ticket not found");
      setTicket(null);
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900">Support</h1>
        <p className="text-gray-600 mt-2">We are here to help. Reach out to us anytime.</p>
      </div>

      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => { setTab("contact"); setError(""); }}
          className={`px-6 py-2 rounded-lg font-medium text-sm transition-colors ${tab === "contact" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
        >
          Contact Us
        </button>
        <button
          onClick={() => { setTab("track"); setError(""); }}
          className={`px-6 py-2 rounded-lg font-medium text-sm transition-colors ${tab === "track" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
        >
          Track Ticket
        </button>
      </div>

      {tab === "contact" && !submitted && (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input type="text" required className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" required className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input type="text" required className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea required rows={5} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} />
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <button type="submit" disabled={submitting} className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 inline-flex items-center gap-2">
                <Send className="w-4 h-4" />{submitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
          <div className="space-y-4">
            {[
              { icon: Mail, label: "Email", value: "support@techible.io" },
              { icon: Phone, label: "Phone", value: "+91 1800-XXX-XXXX" },
              { icon: MapPin, label: "Address", value: "New Delhi, India" },
            ].map((info) => (
              <div key={info.label} className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-3">
                <info.icon className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-xs text-gray-500">{info.label}</p>
                  <p className="text-sm font-medium text-gray-900">{info.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "contact" && submitted && (
        <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
          <HelpCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Ticket Submitted!</h2>
          <p className="text-gray-600 mb-4">Your tracking ID is:</p>
          <p className="text-lg font-mono font-bold text-blue-600 bg-blue-50 inline-block px-4 py-2 rounded-lg">{trackingId}</p>
          <p className="text-sm text-gray-500 mt-4">Save this ID to track your ticket status.</p>
        </div>
      )}

      {tab === "track" && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <form onSubmit={handleTrack} className="flex gap-3 mb-6">
            <input
              type="text"
              placeholder="Enter your tracking ID (e.g., TKT-ABC123)"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
            />
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2">
              <Search className="w-4 h-4" /> Track
            </button>
          </form>
          {error && <p className="text-sm text-red-600 mb-4">{error}</p>}
          {ticket && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-sm text-gray-600">{ticket.trackingId}</span>
                <span className={`px-3 py-1 text-xs font-medium rounded-full capitalize ${ticket.status === "resolved" ? "bg-green-100 text-green-700" : ticket.status === "in_progress" ? "bg-yellow-100 text-yellow-700" : "bg-blue-100 text-blue-700"}`}>
                  {ticket.status.replace("_", " ")}
                </span>
              </div>
              <p className="font-medium text-gray-900">{ticket.subject}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
