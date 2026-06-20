"use client";

import { useState, useEffect } from "react";

interface Course {
  id: string; title: string; instructor: string; price: number; duration: string;
  level: string; category: string; description: string; syllabus: string | null;
  skills: string | null; enrolled: number; rating: number; isActive: boolean; featured: boolean;
}

export default function AdminCoursesPage() {
  const [items, setItems] = useState<Course[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Course | null>(null);
  const [form, setForm] = useState({
    title: "", instructor: "", price: "0", duration: "", level: "beginner",
    category: "", description: "", syllabus: "", skills: "", featured: false,
  });

  useEffect(() => { loadItems(); }, []);
  async function loadItems() { const res = await fetch("/api/courses?all=1"); const data = await res.json(); setItems(data.courses); }

  function openCreate() { setEditing(null); setForm({ title: "", instructor: "", price: "0", duration: "", level: "beginner", category: "", description: "", syllabus: "", skills: "", featured: false }); setShowForm(true); }
  function openEdit(item: Course) { setEditing(item); setForm({ title: item.title, instructor: item.instructor, price: String(item.price), duration: item.duration, level: item.level, category: item.category, description: item.description, syllabus: item.syllabus || "", skills: item.skills || "", featured: item.featured }); setShowForm(true); }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const method = editing ? "PUT" : "POST";
    const body = editing ? { id: editing.id, ...form } : form;
    await fetch("/api/courses", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    setShowForm(false); loadItems();
  }
  async function handleDelete(id: string) { if (!confirm("Delete?")) return; await fetch(`/api/courses?id=${id}`, { method: "DELETE" }); loadItems(); }
  async function toggleActive(item: Course) { await fetch("/api/courses", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: item.id, isActive: !item.isActive }) }); loadItems(); }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Manage Courses</h1>
        <button onClick={openCreate} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium inline-flex items-center gap-2"><i className="fa-solid fa-plus text-xs"></i> Add Course</button>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b"><tr><th className="text-left px-4 py-3 font-medium text-gray-600">Title</th><th className="text-left px-4 py-3 font-medium text-gray-600">Instructor</th><th className="text-left px-4 py-3 font-medium text-gray-600">Price</th><th className="text-left px-4 py-3 font-medium text-gray-600">Status</th><th className="text-right px-4 py-3 font-medium text-gray-600">Actions</th></tr></thead>
          <tbody className="divide-y divide-gray-100">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900">{item.title}</td>
                <td className="px-4 py-3 text-gray-600">{item.instructor}</td>
                <td className="px-4 py-3 text-gray-600">{item.price === 0 ? "Free" : `₹${item.price}`}</td>
                <td className="px-4 py-3"><button onClick={() => toggleActive(item)} className={`px-2 py-0.5 text-xs rounded-full ${item.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>{item.isActive ? "Active" : "Inactive"}</button></td>
                <td className="px-4 py-3 text-right space-x-2">
                  <button onClick={() => openEdit(item)} className="p-1 hover:bg-gray-100 rounded"><i className="fa-solid fa-pen text-xs text-gray-500"></i></button>
                  <button onClick={() => handleDelete(item.id)} className="p-1 hover:bg-red-50 rounded"><i className="fa-solid fa-trash text-xs text-red-500"></i></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {items.length === 0 && <div className="px-4 py-8 text-center text-gray-500">No courses yet</div>}
      </div>
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center" onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[85vh] overflow-y-auto m-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b"><h2 className="text-lg font-semibold">{editing ? "Edit" : "Add"} Course</h2><button onClick={() => setShowForm(false)}><i className="fa-solid fa-xmark text-sm text-gray-400"></i></button></div>
            <form onSubmit={handleSubmit} className="p-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div><label className="block text-xs font-medium text-gray-600 mb-1">Title *</label><input required className="w-full px-2 py-1.5 border rounded text-sm" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
                <div><label className="block text-xs font-medium text-gray-600 mb-1">Instructor *</label><input required className="w-full px-2 py-1.5 border rounded text-sm" value={form.instructor} onChange={(e) => setForm({ ...form, instructor: e.target.value })} /></div>
                <div><label className="block text-xs font-medium text-gray-600 mb-1">Category *</label><input required className="w-full px-2 py-1.5 border rounded text-sm" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} /></div>
                <div><label className="block text-xs font-medium text-gray-600 mb-1">Duration *</label><input required className="w-full px-2 py-1.5 border rounded text-sm" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} /></div>
                <div><label className="block text-xs font-medium text-gray-600 mb-1">Price (INR)</label><input type="number" min="0" className="w-full px-2 py-1.5 border rounded text-sm" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} /></div>
                <div><label className="block text-xs font-medium text-gray-600 mb-1">Level</label><select className="w-full px-2 py-1.5 border rounded text-sm" value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })}><option value="beginner">Beginner</option><option value="intermediate">Intermediate</option><option value="advanced">Advanced</option></select></div>
              </div>
              <div><label className="block text-xs font-medium text-gray-600 mb-1">Skills (comma-separated)</label><input className="w-full px-2 py-1.5 border rounded text-sm" value={form.skills} onChange={(e) => setForm({ ...form, skills: e.target.value })} /></div>
              <div><label className="block text-xs font-medium text-gray-600 mb-1">Description *</label><textarea required rows={3} className="w-full px-2 py-1.5 border rounded text-sm" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
              <div><label className="block text-xs font-medium text-gray-600 mb-1">Syllabus (one topic per line)</label><textarea rows={3} className="w-full px-2 py-1.5 border rounded text-sm" value={form.syllabus} onChange={(e) => setForm({ ...form, syllabus: e.target.value })} /></div>
              <div className="flex items-center gap-2"><input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} /><label className="text-sm text-gray-600">Featured</label></div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
                <button type="submit" className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">{editing ? "Update" : "Create"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
