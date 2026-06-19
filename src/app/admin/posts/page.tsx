"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";

interface Post { id: string; title: string; category: string; isPublished: boolean; views: number; likes: number; author: { name: string }; createdAt: string; }

export default function AdminPostsPage() {
  const [items, setItems] = useState<Post[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Post | null>(null);
  const [form, setForm] = useState({ title: "", content: "", excerpt: "", category: "", tags: "" });

  useEffect(() => { loadItems(); }, []);
  async function loadItems() { const res = await fetch("/api/posts?all=1"); const data = await res.json(); setItems(data.posts); }
  function openCreate() { setEditing(null); setForm({ title: "", content: "", excerpt: "", category: "", tags: "" }); setShowForm(true); }
  async function handleSubmit(e: React.FormEvent) { e.preventDefault(); const method = editing ? "PUT" : "POST"; const body = editing ? { id: editing.id, ...form } : form; await fetch("/api/posts", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }); setShowForm(false); loadItems(); }
  async function handleDelete(id: string) { if (!confirm("Delete?")) return; await fetch(`/api/posts?id=${id}`, { method: "DELETE" }); loadItems(); }
  async function togglePublished(item: Post) { await fetch("/api/posts", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: item.id, isPublished: !item.isPublished }) }); loadItems(); }

  return (
    <div>
      <div className="flex items-center justify-between mb-6"><h1 className="text-2xl font-bold text-gray-900">Manage Posts</h1><button onClick={openCreate} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium inline-flex items-center gap-2"><Plus className="w-4 h-4" /> Add Post</button></div>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b"><tr><th className="text-left px-4 py-3 font-medium text-gray-600">Title</th><th className="text-left px-4 py-3 font-medium text-gray-600">Author</th><th className="text-left px-4 py-3 font-medium text-gray-600">Category</th><th className="text-left px-4 py-3 font-medium text-gray-600">Views</th><th className="text-left px-4 py-3 font-medium text-gray-600">Status</th><th className="text-right px-4 py-3 font-medium text-gray-600">Actions</th></tr></thead>
          <tbody className="divide-y divide-gray-100">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900">{item.title}</td>
                <td className="px-4 py-3 text-gray-600">{item.author.name}</td>
                <td className="px-4 py-3"><span className="px-2 py-0.5 text-xs bg-teal-100 text-teal-700 rounded-full">{item.category}</span></td>
                <td className="px-4 py-3 text-gray-600">{item.views}</td>
                <td className="px-4 py-3"><button onClick={() => togglePublished(item)} className={`px-2 py-0.5 text-xs rounded-full ${item.isPublished ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>{item.isPublished ? "Published" : "Draft"}</button></td>
                <td className="px-4 py-3 text-right space-x-2"><button onClick={() => handleDelete(item.id)} className="p-1 hover:bg-red-50 rounded"><Trash2 className="w-4 h-4 text-red-500" /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
        {items.length === 0 && <div className="px-4 py-8 text-center text-gray-500">No posts yet</div>}
      </div>
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center" onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[85vh] overflow-y-auto m-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b"><h2 className="text-lg font-semibold">Add Post</h2><button onClick={() => setShowForm(false)}><X className="w-5 h-5 text-gray-400" /></button></div>
            <form onSubmit={handleSubmit} className="p-4 space-y-3">
              <div><label className="block text-xs font-medium text-gray-600 mb-1">Title *</label><input required className="w-full px-2 py-1.5 border rounded text-sm" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
              <div><label className="block text-xs font-medium text-gray-600 mb-1">Category *</label><input required className="w-full px-2 py-1.5 border rounded text-sm" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} /></div>
              <div><label className="block text-xs font-medium text-gray-600 mb-1">Excerpt</label><input className="w-full px-2 py-1.5 border rounded text-sm" value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} /></div>
              <div><label className="block text-xs font-medium text-gray-600 mb-1">Content *</label><textarea required rows={6} className="w-full px-2 py-1.5 border rounded text-sm" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} /></div>
              <div><label className="block text-xs font-medium text-gray-600 mb-1">Tags (comma-separated)</label><input className="w-full px-2 py-1.5 border rounded text-sm" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} /></div>
              <div className="flex justify-end gap-2 pt-2"><button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button><button type="submit" className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">Create</button></div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
