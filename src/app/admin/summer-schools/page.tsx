"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";

interface School { id: string; title: string; institute: string; location: string; startDate: string; endDate: string; fees: number; isActive: boolean; }

export default function AdminSummerSchoolsPage() {
  const [items, setItems] = useState<School[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<School | null>(null);
  const [form, setForm] = useState({ title: "", institute: "", location: "", startDate: "", endDate: "", description: "", eligibility: "", fees: "0", topics: "", website: "" });

  useEffect(() => { loadItems(); }, []);
  async function loadItems() { const res = await fetch("/api/summer-schools?all=1"); const data = await res.json(); setItems(data.schools); }
  function openCreate() { setEditing(null); setForm({ title: "", institute: "", location: "", startDate: "", endDate: "", description: "", eligibility: "", fees: "0", topics: "", website: "" }); setShowForm(true); }
  function openEdit(item: School) { setEditing(item); setForm({ title: item.title, institute: item.institute, location: item.location, startDate: item.startDate ? new Date(item.startDate).toISOString().slice(0, 10) : "", endDate: item.endDate ? new Date(item.endDate).toISOString().slice(0, 10) : "", description: "", eligibility: "", fees: String(item.fees), topics: "", website: "" }); setShowForm(true); }
  async function handleSubmit(e: React.FormEvent) { e.preventDefault(); const method = editing ? "PUT" : "POST"; const body = editing ? { id: editing.id, ...form } : form; await fetch("/api/summer-schools", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }); setShowForm(false); loadItems(); }
  async function handleDelete(id: string) { if (!confirm("Delete?")) return; await fetch(`/api/summer-schools?id=${id}`, { method: "DELETE" }); loadItems(); }
  async function toggleActive(item: School) { await fetch("/api/summer-schools", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: item.id, isActive: !item.isActive }) }); loadItems(); }

  return (
    <div>
      <div className="flex items-center justify-between mb-6"><h1 className="text-2xl font-bold text-gray-900">Manage Summer Schools</h1><button onClick={openCreate} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium inline-flex items-center gap-2"><Plus className="w-4 h-4" /> Add Summer School</button></div>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b"><tr><th className="text-left px-4 py-3 font-medium text-gray-600">Title</th><th className="text-left px-4 py-3 font-medium text-gray-600">Institute</th><th className="text-left px-4 py-3 font-medium text-gray-600">Dates</th><th className="text-left px-4 py-3 font-medium text-gray-600">Status</th><th className="text-right px-4 py-3 font-medium text-gray-600">Actions</th></tr></thead>
          <tbody className="divide-y divide-gray-100">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900">{item.title}</td>
                <td className="px-4 py-3 text-gray-600">{item.institute}</td>
                <td className="px-4 py-3 text-gray-600">{new Date(item.startDate).toLocaleDateString()} - {new Date(item.endDate).toLocaleDateString()}</td>
                <td className="px-4 py-3"><button onClick={() => toggleActive(item)} className={`px-2 py-0.5 text-xs rounded-full ${item.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>{item.isActive ? "Active" : "Inactive"}</button></td>
                <td className="px-4 py-3 text-right space-x-2"><button onClick={() => openEdit(item)} className="p-1 hover:bg-gray-100 rounded"><Pencil className="w-4 h-4 text-gray-500" /></button><button onClick={() => handleDelete(item.id)} className="p-1 hover:bg-red-50 rounded"><Trash2 className="w-4 h-4 text-red-500" /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
        {items.length === 0 && <div className="px-4 py-8 text-center text-gray-500">No summer schools yet</div>}
      </div>
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center" onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[85vh] overflow-y-auto m-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b"><h2 className="text-lg font-semibold">{editing ? "Edit" : "Add"} Summer School</h2><button onClick={() => setShowForm(false)}><X className="w-5 h-5 text-gray-400" /></button></div>
            <form onSubmit={handleSubmit} className="p-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2"><label className="block text-xs font-medium text-gray-600 mb-1">Title *</label><input required className="w-full px-2 py-1.5 border rounded text-sm" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
                <div><label className="block text-xs font-medium text-gray-600 mb-1">Institute *</label><input required className="w-full px-2 py-1.5 border rounded text-sm" value={form.institute} onChange={(e) => setForm({ ...form, institute: e.target.value })} /></div>
                <div><label className="block text-xs font-medium text-gray-600 mb-1">Location *</label><input required className="w-full px-2 py-1.5 border rounded text-sm" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} /></div>
                <div><label className="block text-xs font-medium text-gray-600 mb-1">Start Date *</label><input type="date" required className="w-full px-2 py-1.5 border rounded text-sm" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} /></div>
                <div><label className="block text-xs font-medium text-gray-600 mb-1">End Date *</label><input type="date" required className="w-full px-2 py-1.5 border rounded text-sm" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} /></div>
                <div><label className="block text-xs font-medium text-gray-600 mb-1">Fees (INR)</label><input type="number" min="0" className="w-full px-2 py-1.5 border rounded text-sm" value={form.fees} onChange={(e) => setForm({ ...form, fees: e.target.value })} /></div>
                <div><label className="block text-xs font-medium text-gray-600 mb-1">Website</label><input type="url" className="w-full px-2 py-1.5 border rounded text-sm" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} /></div>
              </div>
              <div><label className="block text-xs font-medium text-gray-600 mb-1">Description *</label><textarea required rows={3} className="w-full px-2 py-1.5 border rounded text-sm" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
              <div><label className="block text-xs font-medium text-gray-600 mb-1">Topics (comma-separated)</label><input className="w-full px-2 py-1.5 border rounded text-sm" value={form.topics} onChange={(e) => setForm({ ...form, topics: e.target.value })} /></div>
              <div className="flex justify-end gap-2 pt-2"><button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button><button type="submit" className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">{editing ? "Update" : "Create"}</button></div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
