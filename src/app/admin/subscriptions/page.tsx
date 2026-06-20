"use client";

import { useState, useEffect } from "react";

type Plan = { id: string; name: string; slug: string; price: number; duration: number; features: string; resumeDownloads: number; isActive: boolean; isPopular: boolean };

export default function AdminSubscriptionsPage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [editing, setEditing] = useState<Plan | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", price: 0, duration: 30, features: "", resumeDownloads: 0, isPopular: false });

  useEffect(() => { loadPlans(); }, []);

  async function loadPlans() {
    const res = await fetch("/api/admin/subscriptions");
    const data = await res.json();
    setPlans(data.plans || []);
  }

  async function handleSave() {
    const method = editing ? "PUT" : "POST";
    const body = editing ? { ...form, id: editing.id } : form;
    await fetch("/api/admin/subscriptions", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    setShowForm(false);
    setEditing(null);
    setForm({ name: "", price: 0, duration: 30, features: "", resumeDownloads: 0, isPopular: false });
    loadPlans();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this plan?")) return;
    await fetch(`/api/admin/subscriptions?id=${id}`, { method: "DELETE" });
    loadPlans();
  }

  function openEdit(plan: Plan) {
    setEditing(plan);
    setForm({ name: plan.name, price: plan.price, duration: plan.duration, features: plan.features, resumeDownloads: plan.resumeDownloads, isPopular: plan.isPopular });
    setShowForm(true);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Subscription Plans</h1>
          <p className="text-gray-500">Manage subscription tiers and pricing</p>
        </div>
        <button onClick={() => { setEditing(null); setForm({ name: "", price: 0, duration: 30, features: "", resumeDownloads: 0, isPopular: false }); setShowForm(true); }} className="bg-[#1a73e8] text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-blue-700">
          <i className="fa-solid fa-plus mr-2"></i>Add Plan
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl border p-6 mb-6 max-w-2xl">
          <h2 className="font-bold text-lg text-gray-900 mb-4">{editing ? "Edit Plan" : "New Plan"}</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><label className="text-sm font-semibold text-gray-700">Plan Name</label><input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full mt-1 px-4 py-2.5 border rounded-lg outline-none focus:border-[#1a73e8]" placeholder="Pro" /></div>
              <div><label className="text-sm font-semibold text-gray-700">Price (₹)</label><input type="number" value={form.price} onChange={e => setForm({ ...form, price: parseFloat(e.target.value) || 0 })} className="w-full mt-1 px-4 py-2.5 border rounded-lg outline-none focus:border-[#1a73e8]" /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="text-sm font-semibold text-gray-700">Duration (days)</label><input type="number" value={form.duration} onChange={e => setForm({ ...form, duration: parseInt(e.target.value) || 30 })} className="w-full mt-1 px-4 py-2.5 border rounded-lg outline-none focus:border-[#1a73e8]" /></div>
              <div><label className="text-sm font-semibold text-gray-700">Resume Downloads (0=unlimited)</label><input type="number" value={form.resumeDownloads} onChange={e => setForm({ ...form, resumeDownloads: parseInt(e.target.value) || 0 })} className="w-full mt-1 px-4 py-2.5 border rounded-lg outline-none focus:border-[#1a73e8]" /></div>
            </div>
            <div><label className="text-sm font-semibold text-gray-700">Features (comma-separated)</label><textarea value={form.features} onChange={e => setForm({ ...form, features: e.target.value })} rows={3} className="w-full mt-1 px-4 py-2.5 border rounded-lg outline-none focus:border-[#1a73e8]" placeholder="Build resume, Download PDF, Priority support" /></div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.isPopular} onChange={e => setForm({ ...form, isPopular: e.target.checked })} className="w-4 h-4 rounded" />
              <span className="text-sm font-semibold text-gray-700">Mark as popular</span>
            </label>
            <div className="flex gap-3">
              <button onClick={handleSave} className="bg-[#1a73e8] text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-blue-700">{editing ? "Update" : "Create"}</button>
              <button onClick={() => { setShowForm(false); setEditing(null); }} className="border px-5 py-2 rounded-full text-sm font-semibold text-gray-600">Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-4 py-3 font-semibold text-gray-600">Plan</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600">Price</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600">Duration</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600">Downloads</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600">Status</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {plans.length === 0 ? (
              <tr><td colSpan={6} className="text-center py-8 text-gray-400">No plans yet. Create your first subscription plan.</td></tr>
            ) : plans.map(plan => (
              <tr key={plan.id} className="border-b last:border-0">
                <td className="px-4 py-3 font-medium text-gray-900">{plan.name} {plan.isPopular && <span className="text-xs bg-blue-50 text-[#1a73e8] px-2 py-0.5 rounded-full ml-1">Popular</span>}</td>
                <td className="px-4 py-3">{plan.price === 0 ? "Free" : `₹${plan.price}`}</td>
                <td className="px-4 py-3">{plan.duration} days</td>
                <td className="px-4 py-3">{plan.resumeDownloads === 0 ? "Unlimited" : plan.resumeDownloads}</td>
                <td className="px-4 py-3"><span className={`text-xs font-bold px-2 py-0.5 rounded-full ${plan.isActive ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-500"}`}>{plan.isActive ? "Active" : "Inactive"}</span></td>
                <td className="px-4 py-3 flex gap-2">
                  <button onClick={() => openEdit(plan)} className="text-gray-500 hover:text-[#1a73e8]"><i className="fa-solid fa-pen"></i></button>
                  <button onClick={() => handleDelete(plan.id)} className="text-gray-500 hover:text-red-500"><i className="fa-solid fa-trash"></i></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
