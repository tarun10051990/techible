"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";

interface College { id: string; name: string; location: string; type: string; ranking: number | null; website: string | null; description: string | null; programs: string | null; established: number | null; isActive: boolean; }

export default function AdminCollegesPage() {
  const [items, setItems] = useState<College[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<College | null>(null);
  const [form, setForm] = useState({ name: "", location: "", type: "IIT", ranking: "", website: "", description: "", programs: "", established: "" });

  useEffect(() => { loadItems(); }, []);
  async function loadItems() { const res = await fetch("/api/colleges?all=1"); const data = await res.json(); setItems(data.colleges); }
  function openCreate() { setEditing(null); setForm({ name: "", location: "", type: "IIT", ranking: "", website: "", description: "", programs: "", established: "" }); setShowForm(true); }
  function openEdit(item: College) { setEditing(item); setForm({ name: item.name, location: item.location, type: item.type, ranking: item.ranking ? String(item.ranking) : "", website: item.website || "", description: item.description || "", programs: item.programs || "", established: item.established ? String(item.established) : "" }); setShowForm(true); }
  async function handleSubmit(e: React.FormEvent) { e.preventDefault(); const method = editing ? "PUT" : "POST"; const body = editing ? { id: editing.id, ...form } : form; await fetch("/api/colleges", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }); setShowForm(false); loadItems(); }
  async function handleDelete(id: string) { if (!confirm("Delete?")) return; await fetch(`/api/colleges?id=${id}`, { method: "DELETE" }); loadItems(); }
  async function toggleActive(item: College) { await fetch("/api/colleges", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: item.id, isActive: !item.isActive }) }); loadItems(); }

  return (
    <div>
      <div className="flex items-center justify-between mb-6"><h1 className="text-2xl font-bold text-gray-900">Manage Colleges</h1><button onClick={openCreate} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium inline-flex items-center gap-2"><Plus className="w-4 h-4" /> Add College</button></div>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b"><tr><th className="text-left px-4 py-3 font-medium text-gray-600">Name</th><th className="text-left px-4 py-3 font-medium text-gray-600">Type</th><th className="text-left px-4 py-3 font-medium text-gray-600">Location</th><th className="text-left px-4 py-3 font-medium text-gray-600">Rank</th><th className="text-left px-4 py-3 font-medium text-gray-600">Status</th><th className="text-right px-4 py-3 font-medium text-gray-600">Actions</th></tr></thead>
          <tbody className="divide-y divide-gray-100">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900">{item.name}</td>
                <td className="px-4 py-3"><span className="px-2 py-0.5 text-xs bg-indigo-100 text-indigo-700 rounded-full">{item.type}</span></td>
                <td className="px-4 py-3 text-gray-600">{item.location}</td>
                <td className="px-4 py-3 text-gray-600">{item.ranking || "-"}</td>
                <td className="px-4 py-3"><button onClick={() => toggleActive(item)} className={`px-2 py-0.5 text-xs rounded-full ${item.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>{item.isActive ? "Active" : "Inactive"}</button></td>
                <td className="px-4 py-3 text-right space-x-2"><button onClick={() => openEdit(item)} className="p-1 hover:bg-gray-100 rounded"><Pencil className="w-4 h-4 text-gray-500" /></button><button onClick={() => handleDelete(item.id)} className="p-1 hover:bg-red-50 rounded"><Trash2 className="w-4 h-4 text-red-500" /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
        {items.length === 0 && <div className="px-4 py-8 text-center text-gray-500">No colleges yet</div>}
      </div>
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center" onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[85vh] overflow-y-auto m-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b"><h2 className="text-lg font-semibold">{editing ? "Edit" : "Add"} College</h2><button onClick={() => setShowForm(false)}><X className="w-5 h-5 text-gray-400" /></button></div>
            <form onSubmit={handleSubmit} className="p-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div><label className="block text-xs font-medium text-gray-600 mb-1">Name *</label><input required className="w-full px-2 py-1.5 border rounded text-sm" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
                <div><label className="block text-xs font-medium text-gray-600 mb-1">Type *</label><select required className="w-full px-2 py-1.5 border rounded text-sm" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}><option value="IIT">IIT</option><option value="NIT">NIT</option><option value="IIIT">IIIT</option><option value="University">University</option><option value="Private">Private</option></select></div>
                <div><label className="block text-xs font-medium text-gray-600 mb-1">Location *</label><input required className="w-full px-2 py-1.5 border rounded text-sm" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} /></div>
                <div><label className="block text-xs font-medium text-gray-600 mb-1">Ranking</label><input type="number" min="1" className="w-full px-2 py-1.5 border rounded text-sm" value={form.ranking} onChange={(e) => setForm({ ...form, ranking: e.target.value })} /></div>
                <div><label className="block text-xs font-medium text-gray-600 mb-1">Website</label><input type="url" className="w-full px-2 py-1.5 border rounded text-sm" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} /></div>
                <div><label className="block text-xs font-medium text-gray-600 mb-1">Established</label><input type="number" className="w-full px-2 py-1.5 border rounded text-sm" value={form.established} onChange={(e) => setForm({ ...form, established: e.target.value })} /></div>
              </div>
              <div><label className="block text-xs font-medium text-gray-600 mb-1">Programs (comma-separated)</label><input className="w-full px-2 py-1.5 border rounded text-sm" value={form.programs} onChange={(e) => setForm({ ...form, programs: e.target.value })} /></div>
              <div><label className="block text-xs font-medium text-gray-600 mb-1">Description</label><textarea rows={3} className="w-full px-2 py-1.5 border rounded text-sm" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
              <div className="flex justify-end gap-2 pt-2"><button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button><button type="submit" className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">{editing ? "Update" : "Create"}</button></div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
