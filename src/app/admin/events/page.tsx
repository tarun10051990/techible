"use client";

import { useState, useEffect } from "react";

interface Event { id: string; title: string; type: string; organizer: string; location: string; mode: string; date: string; description: string; fees: number; isActive: boolean; featured: boolean; }

export default function AdminEventsPage() {
  const [items, setItems] = useState<Event[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Event | null>(null);
  const [form, setForm] = useState({ title: "", type: "hackathon", organizer: "", location: "", mode: "online", date: "", endDate: "", description: "", eligibility: "", prizes: "", fees: "0", maxParticipants: "", website: "", featured: false });

  useEffect(() => { loadItems(); }, []);
  async function loadItems() { const res = await fetch("/api/events?all=1"); const data = await res.json(); setItems(data.events); }
  function openCreate() { setEditing(null); setForm({ title: "", type: "hackathon", organizer: "", location: "", mode: "online", date: "", endDate: "", description: "", eligibility: "", prizes: "", fees: "0", maxParticipants: "", website: "", featured: false }); setShowForm(true); }
  function openEdit(item: Event) { setEditing(item); setForm({ title: item.title, type: item.type, organizer: item.organizer, location: item.location, mode: item.mode, date: item.date ? new Date(item.date).toISOString().slice(0, 16) : "", endDate: "", description: item.description, eligibility: "", prizes: "", fees: String(item.fees), maxParticipants: "", website: "", featured: item.featured }); setShowForm(true); }
  async function handleSubmit(e: React.FormEvent) { e.preventDefault(); const method = editing ? "PUT" : "POST"; const body = editing ? { id: editing.id, ...form } : form; await fetch("/api/events", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }); setShowForm(false); loadItems(); }
  async function handleDelete(id: string) { if (!confirm("Delete?")) return; await fetch(`/api/events?id=${id}`, { method: "DELETE" }); loadItems(); }
  async function toggleActive(item: Event) { await fetch("/api/events", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: item.id, isActive: !item.isActive }) }); loadItems(); }

  return (
    <div>
      <div className="flex items-center justify-between mb-6"><h1 className="text-2xl font-bold text-gray-900">Manage Events</h1><button onClick={openCreate} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium inline-flex items-center gap-2"><i className="fa-solid fa-plus text-xs"></i> Add Event</button></div>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b"><tr><th className="text-left px-4 py-3 font-medium text-gray-600">Title</th><th className="text-left px-4 py-3 font-medium text-gray-600">Type</th><th className="text-left px-4 py-3 font-medium text-gray-600">Date</th><th className="text-left px-4 py-3 font-medium text-gray-600">Status</th><th className="text-right px-4 py-3 font-medium text-gray-600">Actions</th></tr></thead>
          <tbody className="divide-y divide-gray-100">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900">{item.title}</td>
                <td className="px-4 py-3"><span className="px-2 py-0.5 text-xs bg-orange-100 text-orange-700 rounded-full capitalize">{item.type}</span></td>
                <td className="px-4 py-3 text-gray-600">{new Date(item.date).toLocaleDateString()}</td>
                <td className="px-4 py-3"><button onClick={() => toggleActive(item)} className={`px-2 py-0.5 text-xs rounded-full ${item.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>{item.isActive ? "Active" : "Inactive"}</button></td>
                <td className="px-4 py-3 text-right space-x-2"><button onClick={() => openEdit(item)} className="p-1 hover:bg-gray-100 rounded"><i className="fa-solid fa-pen text-xs text-gray-500"></i></button><button onClick={() => handleDelete(item.id)} className="p-1 hover:bg-red-50 rounded"><i className="fa-solid fa-trash text-xs text-red-500"></i></button></td>
              </tr>
            ))}
          </tbody>
        </table>
        {items.length === 0 && <div className="px-4 py-8 text-center text-gray-500">No events yet</div>}
      </div>
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center" onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[85vh] overflow-y-auto m-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b"><h2 className="text-lg font-semibold">{editing ? "Edit" : "Add"} Event</h2><button onClick={() => setShowForm(false)}><i className="fa-solid fa-xmark text-sm text-gray-400"></i></button></div>
            <form onSubmit={handleSubmit} className="p-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2"><label className="block text-xs font-medium text-gray-600 mb-1">Title *</label><input required className="w-full px-2 py-1.5 border rounded text-sm" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
                <div><label className="block text-xs font-medium text-gray-600 mb-1">Type</label><select className="w-full px-2 py-1.5 border rounded text-sm" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}><option value="hackathon">Hackathon</option><option value="workshop">Workshop</option><option value="webinar">Webinar</option><option value="conference">Conference</option></select></div>
                <div><label className="block text-xs font-medium text-gray-600 mb-1">Mode</label><select className="w-full px-2 py-1.5 border rounded text-sm" value={form.mode} onChange={(e) => setForm({ ...form, mode: e.target.value })}><option value="online">Online</option><option value="offline">Offline</option><option value="hybrid">Hybrid</option></select></div>
                <div><label className="block text-xs font-medium text-gray-600 mb-1">Organizer *</label><input required className="w-full px-2 py-1.5 border rounded text-sm" value={form.organizer} onChange={(e) => setForm({ ...form, organizer: e.target.value })} /></div>
                <div><label className="block text-xs font-medium text-gray-600 mb-1">Location *</label><input required className="w-full px-2 py-1.5 border rounded text-sm" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} /></div>
                <div><label className="block text-xs font-medium text-gray-600 mb-1">Start Date *</label><input type="datetime-local" required className="w-full px-2 py-1.5 border rounded text-sm" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} /></div>
                <div><label className="block text-xs font-medium text-gray-600 mb-1">Entry Fee (INR)</label><input type="number" min="0" className="w-full px-2 py-1.5 border rounded text-sm" value={form.fees} onChange={(e) => setForm({ ...form, fees: e.target.value })} /></div>
              </div>
              <div><label className="block text-xs font-medium text-gray-600 mb-1">Description *</label><textarea required rows={3} className="w-full px-2 py-1.5 border rounded text-sm" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
              <div className="flex items-center gap-2"><input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} /><label className="text-sm text-gray-600">Featured</label></div>
              <div className="flex justify-end gap-2 pt-2"><button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button><button type="submit" className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">{editing ? "Update" : "Create"}</button></div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
