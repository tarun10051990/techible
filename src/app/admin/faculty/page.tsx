"use client";

import { useState, useEffect } from "react";

interface College { id: string; name: string; }
interface Faculty { id: string; name: string; designation: string; department: string; specialization: string | null; email: string | null; publications: number; isActive: boolean; college: College; collegeId: string; }

export default function AdminFacultyPage() {
  const [items, setItems] = useState<Faculty[]>([]);
  const [colleges, setColleges] = useState<College[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Faculty | null>(null);
  const [form, setForm] = useState({ name: "", designation: "", department: "", collegeId: "", email: "", specialization: "", bio: "", publications: "0" });

  useEffect(() => { loadItems(); loadColleges(); }, []);
  async function loadItems() { const res = await fetch("/api/faculty?all=1"); const data = await res.json(); setItems(data.faculties); }
  async function loadColleges() { const res = await fetch("/api/colleges?all=1"); const data = await res.json(); setColleges(data.colleges); }
  function openCreate() { setEditing(null); setForm({ name: "", designation: "", department: "", collegeId: colleges[0]?.id || "", email: "", specialization: "", bio: "", publications: "0" }); setShowForm(true); }
  function openEdit(item: Faculty) { setEditing(item); setForm({ name: item.name, designation: item.designation, department: item.department, collegeId: item.collegeId, email: item.email || "", specialization: item.specialization || "", bio: "", publications: String(item.publications) }); setShowForm(true); }
  async function handleSubmit(e: React.FormEvent) { e.preventDefault(); const method = editing ? "PUT" : "POST"; const body = editing ? { id: editing.id, ...form } : form; await fetch("/api/faculty", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }); setShowForm(false); loadItems(); }
  async function handleDelete(id: string) { if (!confirm("Delete?")) return; await fetch(`/api/faculty?id=${id}`, { method: "DELETE" }); loadItems(); }

  return (
    <div>
      <div className="flex items-center justify-between mb-6"><h1 className="text-2xl font-bold text-gray-900">Manage Faculty</h1><button onClick={openCreate} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium inline-flex items-center gap-2"><i className="fa-solid fa-plus text-xs"></i> Add Faculty</button></div>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b"><tr><th className="text-left px-4 py-3 font-medium text-gray-600">Name</th><th className="text-left px-4 py-3 font-medium text-gray-600">Designation</th><th className="text-left px-4 py-3 font-medium text-gray-600">College</th><th className="text-left px-4 py-3 font-medium text-gray-600">Department</th><th className="text-right px-4 py-3 font-medium text-gray-600">Actions</th></tr></thead>
          <tbody className="divide-y divide-gray-100">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900">{item.name}</td>
                <td className="px-4 py-3 text-gray-600">{item.designation}</td>
                <td className="px-4 py-3 text-gray-600">{item.college.name}</td>
                <td className="px-4 py-3 text-gray-600">{item.department}</td>
                <td className="px-4 py-3 text-right space-x-2"><button onClick={() => openEdit(item)} className="p-1 hover:bg-gray-100 rounded"><i className="fa-solid fa-pen text-xs text-gray-500"></i></button><button onClick={() => handleDelete(item.id)} className="p-1 hover:bg-red-50 rounded"><i className="fa-solid fa-trash text-xs text-red-500"></i></button></td>
              </tr>
            ))}
          </tbody>
        </table>
        {items.length === 0 && <div className="px-4 py-8 text-center text-gray-500">No faculty yet</div>}
      </div>
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center" onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[85vh] overflow-y-auto m-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b"><h2 className="text-lg font-semibold">{editing ? "Edit" : "Add"} Faculty</h2><button onClick={() => setShowForm(false)}><i className="fa-solid fa-xmark text-sm text-gray-400"></i></button></div>
            <form onSubmit={handleSubmit} className="p-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div><label className="block text-xs font-medium text-gray-600 mb-1">Name *</label><input required className="w-full px-2 py-1.5 border rounded text-sm" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
                <div><label className="block text-xs font-medium text-gray-600 mb-1">Designation *</label><input required className="w-full px-2 py-1.5 border rounded text-sm" value={form.designation} onChange={(e) => setForm({ ...form, designation: e.target.value })} /></div>
                <div><label className="block text-xs font-medium text-gray-600 mb-1">Department *</label><input required className="w-full px-2 py-1.5 border rounded text-sm" value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} /></div>
                <div><label className="block text-xs font-medium text-gray-600 mb-1">College *</label><select required className="w-full px-2 py-1.5 border rounded text-sm" value={form.collegeId} onChange={(e) => setForm({ ...form, collegeId: e.target.value })}>{colleges.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</select></div>
                <div><label className="block text-xs font-medium text-gray-600 mb-1">Email</label><input type="email" className="w-full px-2 py-1.5 border rounded text-sm" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
                <div><label className="block text-xs font-medium text-gray-600 mb-1">Specialization</label><input className="w-full px-2 py-1.5 border rounded text-sm" value={form.specialization} onChange={(e) => setForm({ ...form, specialization: e.target.value })} /></div>
                <div><label className="block text-xs font-medium text-gray-600 mb-1">Publications</label><input type="number" min="0" className="w-full px-2 py-1.5 border rounded text-sm" value={form.publications} onChange={(e) => setForm({ ...form, publications: e.target.value })} /></div>
              </div>
              <div><label className="block text-xs font-medium text-gray-600 mb-1">Bio</label><textarea rows={2} className="w-full px-2 py-1.5 border rounded text-sm" value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} /></div>
              <div className="flex justify-end gap-2 pt-2"><button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button><button type="submit" className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">{editing ? "Update" : "Create"}</button></div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
