"use client";

import { useState, useEffect } from "react";
import { Save } from "lucide-react";

interface Settings { id: string; siteName: string; tagline: string; contactEmail: string | null; contactPhone: string | null; address: string | null; twitter: string | null; linkedin: string | null; instagram: string | null; internshipCount: string; instituteCount: string; mentorCount: string; }

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [form, setForm] = useState({ siteName: "Techible", tagline: "Your Gateway to Tech Opportunities", contactEmail: "support@techible.io", contactPhone: "+91 1800-XXX-XXXX", address: "New Delhi, India", twitter: "", linkedin: "", instagram: "", internshipCount: "500+", instituteCount: "50+", mentorCount: "200+" });
  const [saved, setSaved] = useState(false);

  useEffect(() => { loadSettings(); }, []);
  async function loadSettings() { const res = await fetch("/api/settings"); const data = await res.json(); if (data.settings) { setSettings(data.settings); setForm({ siteName: data.settings.siteName, tagline: data.settings.tagline, contactEmail: data.settings.contactEmail || "", contactPhone: data.settings.contactPhone || "", address: data.settings.address || "", twitter: data.settings.twitter || "", linkedin: data.settings.linkedin || "", instagram: data.settings.instagram || "", internshipCount: data.settings.internshipCount, instituteCount: data.settings.instituteCount, mentorCount: data.settings.mentorCount }); } }
  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    const method = settings ? "PUT" : "POST";
    const body = settings ? { id: settings.id, ...form } : form;
    await fetch("/api/settings", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    loadSettings();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Site Settings</h1>
      <form onSubmit={handleSave} className="bg-white rounded-xl border border-gray-200 p-6 max-w-2xl space-y-4">
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Site Name</label><input className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" value={form.siteName} onChange={(e) => setForm({ ...form, siteName: e.target.value })} /></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Tagline</label><input className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" value={form.tagline} onChange={(e) => setForm({ ...form, tagline: e.target.value })} /></div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label><input type="email" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" value={form.contactEmail} onChange={(e) => setForm({ ...form, contactEmail: e.target.value })} /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Contact Phone</label><input className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" value={form.contactPhone} onChange={(e) => setForm({ ...form, contactPhone: e.target.value })} /></div>
        </div>
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Address</label><input className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} /></div>
        <h3 className="text-sm font-semibold text-gray-900 pt-2">Hero Stats</h3>
        <div className="grid grid-cols-3 gap-4">
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Internship Count</label><input className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" value={form.internshipCount} onChange={(e) => setForm({ ...form, internshipCount: e.target.value })} /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Institute Count</label><input className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" value={form.instituteCount} onChange={(e) => setForm({ ...form, instituteCount: e.target.value })} /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Mentor Count</label><input className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" value={form.mentorCount} onChange={(e) => setForm({ ...form, mentorCount: e.target.value })} /></div>
        </div>
        <h3 className="text-sm font-semibold text-gray-900 pt-2">Social Links</h3>
        <div className="grid grid-cols-3 gap-4">
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Twitter</label><input className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" value={form.twitter} onChange={(e) => setForm({ ...form, twitter: e.target.value })} /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label><input className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" value={form.linkedin} onChange={(e) => setForm({ ...form, linkedin: e.target.value })} /></div>
          <div><label className="block text-sm font-medium text-gray-700 mb-1">Instagram</label><input className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" value={form.instagram} onChange={(e) => setForm({ ...form, instagram: e.target.value })} /></div>
        </div>
        <button type="submit" className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2">
          <Save className="w-4 h-4" />{saved ? "Saved!" : "Save Settings"}
        </button>
      </form>
    </div>
  );
}
