"use client";

import { useState, useEffect } from "react";

interface PageItem { id: string; title: string; slug: string; content: string; isActive: boolean; }

export default function AdminPagesPage() {
  const [items, setItems] = useState<PageItem[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<PageItem | null>(null);
  const [form, setForm] = useState({ title: "", slug: "", content: "", isActive: true });

  useEffect(() => { loadItems(); }, []);
  async function loadItems() { const res = await fetch("/api/pages?all=1"); const data = await res.json(); setItems(data.pages || []); }
  function openCreate() { setEditing(null); setForm({ title: "", slug: "", content: "", isActive: true }); setShowForm(true); }
  function openEdit(item: PageItem) { setEditing(item); setForm({ title: item.title, slug: item.slug, content: item.content, isActive: item.isActive }); setShowForm(true); }
  async function handleSubmit(e: React.FormEvent) { e.preventDefault(); const method = editing ? "PUT" : "POST"; const body = editing ? { id: editing.id, ...form } : form; await fetch("/api/pages", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }); setShowForm(false); loadItems(); }
  async function handleDelete(id: string) { if (!confirm("Delete?")) return; await fetch(`/api/pages?id=${id}`, { method: "DELETE" }); loadItems(); }

  return (
    <div>
      <div className="flex items-center justify-between mb-6"><h1 className="text-2xl font-bold text-gray-900">Manage Pages</h1><button onClick={openCreate} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium inline-flex items-center gap-2"><i className="fa-solid fa-plus text-xs"></i> Add Page</button></div>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b"><tr><th className="text-left px-4 py-3 font-medium text-gray-600">Title</th><th className="text-left px-4 py-3 font-medium text-gray-600">Slug</th><th className="text-left px-4 py-3 font-medium text-gray-600">Status</th><th className="text-right px-4 py-3 font-medium text-gray-600">Actions</th></tr></thead>
          <tbody className="divide-y divide-gray-100">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900">{item.title}</td>
                <td className="px-4 py-3 text-gray-600 font-mono text-xs">/{item.slug}</td>
                <td className="px-4 py-3"><span className={`px-2 py-0.5 text-xs rounded-full ${item.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>{item.isActive ? "Active" : "Inactive"}</span></td>
                <td className="px-4 py-3 text-right space-x-2"><button onClick={() => openEdit(item)} className="p-1 hover:bg-gray-100 rounded"><i className="fa-solid fa-pen text-xs text-gray-500"></i></button><button onClick={() => handleDelete(item.id)} className="p-1 hover:bg-red-50 rounded"><i className="fa-solid fa-trash text-xs text-red-500"></i></button></td>
              </tr>
            ))}
          </tbody>
        </table>
        {items.length === 0 && <div className="px-4 py-8 text-center text-gray-500">No custom pages yet</div>}
      </div>
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center" onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[85vh] overflow-y-auto m-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b"><h2 className="text-lg font-semibold">{editing ? "Edit" : "Add"} Page</h2><button onClick={() => setShowForm(false)}><i className="fa-solid fa-xmark text-sm text-gray-400"></i></button></div>
            <form onSubmit={handleSubmit} className="p-4 space-y-3">
              <div><label className="block text-xs font-medium text-gray-600 mb-1">Title *</label><input required className="w-full px-2 py-1.5 border rounded text-sm" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
              <div><label className="block text-xs font-medium text-gray-600 mb-1">Slug *</label><input required className="w-full px-2 py-1.5 border rounded text-sm" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} /></div>
              <div><label className="block text-xs font-medium text-gray-600 mb-1">Content *</label><textarea required rows={8} className="w-full px-2 py-1.5 border rounded text-sm" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} /></div>
              <div className="flex items-center gap-2"><input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} /><label className="text-sm text-gray-600">Active</label></div>
              <div className="flex justify-end gap-2 pt-2"><button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button><button type="submit" className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">{editing ? "Update" : "Create"}</button></div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
