"use client";

import { useState, useEffect } from "react";

interface Mentor { id: string; name: string; title: string; company: string | null; expertise: string; experience: number; price: number; rating: number; sessions: number; isActive: boolean; featured: boolean; bio: string | null; }

export default function AdminMentorsPage() {
  const [items, setItems] = useState<Mentor[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Mentor | null>(null);
  const [form, setForm] = useState({ name: "", title: "", company: "", expertise: "", experience: "0", price: "0", bio: "", featured: false });

  useEffect(() => { loadItems(); }, []);
  async function loadItems() { const res = await fetch("/api/mentors?all=1"); const data = await res.json(); setItems(data.mentors); }
  function openCreate() { setEditing(null); setForm({ name: "", title: "", company: "", expertise: "", experience: "0", price: "0", bio: "", featured: false }); setShowForm(true); }
  function openEdit(item: Mentor) { setEditing(item); setForm({ name: item.name, title: item.title, company: item.company || "", expertise: item.expertise, experience: String(item.experience), price: String(item.price), bio: item.bio || "", featured: item.featured }); setShowForm(true); }
  async function handleSubmit(e: React.FormEvent) { e.preventDefault(); const method = editing ? "PUT" : "POST"; const body = editing ? { id: editing.id, ...form } : form; await fetch("/api/mentors", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }); setShowForm(false); loadItems(); }
  async function handleDelete(id: string) { if (!confirm("Delete?")) return; await fetch(`/api/mentors?id=${id}`, { method: "DELETE" }); loadItems(); }
  async function toggleActive(item: Mentor) { await fetch("/api/mentors", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: item.id, isActive: !item.isActive }) }); loadItems(); }

  return (
    <div>
      <div className="flex items-center justify-between mb-6"><h1 className="text-2xl font-bold text-gray-900">Manage Mentors</h1><button onClick={openCreate} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium inline-flex items-center gap-2"><i className="fa-solid fa-plus text-xs"></i> Add Mentor</button></div>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b"><tr><th className="text-left px-4 py-3 font-medium text-gray-600">Name</th><th className="text-left px-4 py-3 font-medium text-gray-600">Title</th><th className="text-left px-4 py-3 font-medium text-gray-600">Rating</th><th className="text-left px-4 py-3 font-medium text-gray-600">Status</th><th className="text-right px-4 py-3 font-medium text-gray-600">Actions</th></tr></thead>
          <tbody className="divide-y divide-gray-100">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900">{item.name}</td>
                <td className="px-4 py-3 text-gray-600">{item.title}</td>
                <td className="px-4 py-3 text-gray-600">{item.rating}/5</td>
                <td className="px-4 py-3"><button onClick={() => toggleActive(item)} className={`px-2 py-0.5 text-xs rounded-full ${item.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>{item.isActive ? "Active" : "Inactive"}</button></td>
                <td className="px-4 py-3 text-right space-x-2"><button onClick={() => openEdit(item)} className="p-1 hover:bg-gray-100 rounded"><i className="fa-solid fa-pen text-xs text-gray-500"></i></button><button onClick={() => handleDelete(item.id)} className="p-1 hover:bg-red-50 rounded"><i className="fa-solid fa-trash text-xs text-red-500"></i></button></td>
              </tr>
            ))}
          </tbody>
        </table>
        {items.length === 0 && <div className="px-4 py-8 text-center text-gray-500">No mentors yet</div>}
      </div>
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center" onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[85vh] overflow-y-auto m-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b"><h2 className="text-lg font-semibold">{editing ? "Edit" : "Add"} Mentor</h2><button onClick={() => setShowForm(false)}><i className="fa-solid fa-xmark text-sm text-gray-400"></i></button></div>
            <form onSubmit={handleSubmit} className="p-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div><label className="block text-xs font-medium text-gray-600 mb-1">Name *</label><input required className="w-full px-2 py-1.5 border rounded text-sm" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
                <div><label className="block text-xs font-medium text-gray-600 mb-1">Title *</label><input required className="w-full px-2 py-1.5 border rounded text-sm" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
                <div><label className="block text-xs font-medium text-gray-600 mb-1">Company</label><input className="w-full px-2 py-1.5 border rounded text-sm" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} /></div>
                <div><label className="block text-xs font-medium text-gray-600 mb-1">Experience (years) *</label><input required type="number" min="0" className="w-full px-2 py-1.5 border rounded text-sm" value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })} /></div>
                <div><label className="block text-xs font-medium text-gray-600 mb-1">Price per session (INR)</label><input type="number" min="0" className="w-full px-2 py-1.5 border rounded text-sm" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} /></div>
                <div className="flex items-center gap-2 pt-5"><input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} /><label className="text-sm text-gray-600">Featured</label></div>
              </div>
              <div><label className="block text-xs font-medium text-gray-600 mb-1">Expertise (comma-separated) *</label><input required className="w-full px-2 py-1.5 border rounded text-sm" value={form.expertise} onChange={(e) => setForm({ ...form, expertise: e.target.value })} /></div>
              <div><label className="block text-xs font-medium text-gray-600 mb-1">Bio</label><textarea rows={3} className="w-full px-2 py-1.5 border rounded text-sm" value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} /></div>
              <div className="flex justify-end gap-2 pt-2"><button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button><button type="submit" className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">{editing ? "Update" : "Create"}</button></div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
