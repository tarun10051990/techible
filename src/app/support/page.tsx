"use client";

import { useState } from "react";

export default function SupportPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) { setStatus("success"); setForm({ name: "", email: "", subject: "", message: "" }); }
      else setStatus("error");
    } catch { setStatus("error"); }
  }

  return (
    <div className="bg-white min-h-screen">
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-[#1a73e8] px-3 py-1.5 rounded-full text-xs font-semibold mb-4">
            <i className="fa-solid fa-headset text-xs"></i> Help Center
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-3">
            Contact & <span className="text-[#1a73e8]">Support</span>
          </h1>
          <p className="text-gray-500 max-w-md">We&apos;re here to help. Send us a message and we&apos;ll respond as soon as possible.</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-3">
                <i className="fa-solid fa-envelope text-xl text-[#1a73e8]"></i>
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Email Us</h3>
              <a href="mailto:info@techible.io" className="text-sm text-[#1a73e8] hover:underline">info@techible.io</a>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-3">
                <i className="fa-brands fa-whatsapp text-xl text-green-600"></i>
              </div>
              <h3 className="font-bold text-gray-900 mb-1">WhatsApp</h3>
              <p className="text-sm text-gray-500">Join our community for quick support</p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center mb-3">
                <i className="fa-solid fa-clock text-xl text-purple-600"></i>
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Response Time</h3>
              <p className="text-sm text-gray-500">Usually within 24 hours</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-100 p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Send us a message</h2>

              {status === "success" && (
                <div className="mb-6 p-4 bg-green-50 border border-green-100 rounded-xl text-sm text-green-600 flex items-center gap-2">
                  <i className="fa-solid fa-circle-check"></i> Your message has been sent successfully!
                </div>
              )}
              {status === "error" && (
                <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600 flex items-center gap-2">
                  <i className="fa-solid fa-circle-exclamation"></i> Something went wrong. Please try again.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Name</label>
                    <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a73e8]/30 focus:border-[#1a73e8]" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email</label>
                    <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a73e8]/30 focus:border-[#1a73e8]" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Subject</label>
                  <input type="text" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a73e8]/30 focus:border-[#1a73e8]" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Message</label>
                  <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={5} required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a73e8]/30 focus:border-[#1a73e8] resize-none" />
                </div>
                <button type="submit" disabled={status === "loading"}
                  className="px-8 py-3 bg-[#1a73e8] text-white font-bold rounded-xl hover:bg-[#1557b0] transition-colors disabled:opacity-50 flex items-center gap-2">
                  {status === "loading" ? <><i className="fa-solid fa-spinner fa-spin"></i> Sending...</> : <>Send Message <i className="fa-solid fa-paper-plane text-xs"></i></>}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
