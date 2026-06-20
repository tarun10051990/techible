"use client";

import { useState, useEffect } from "react";

type PaymentRecord = {
  id: string; amount: number; currency: string; type: string;
  status: string; razorpayPaymentId: string | null; createdAt: string;
  user: { name: string; email: string };
};

type PaymentSettingsData = {
  id: string; razorpayKeyId: string; razorpayKeySecret: string;
  razorpayWebhookSecret: string; isTestMode: boolean; currency: string; taxPercentage: number;
};

export default function AdminPaymentsPage() {
  const [tab, setTab] = useState<"settings" | "transactions">("settings");
  const [settings, setSettings] = useState<PaymentSettingsData | null>(null);
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ razorpayKeyId: "", razorpayKeySecret: "", razorpayWebhookSecret: "", isTestMode: true, currency: "INR", taxPercentage: 18 });

  useEffect(() => {
    fetch("/api/admin/payments").then(r => r.json()).then(d => {
      if (d.settings) {
        setSettings(d.settings);
        setForm({ razorpayKeyId: d.settings.razorpayKeyId, razorpayKeySecret: d.settings.razorpayKeySecret, razorpayWebhookSecret: d.settings.razorpayWebhookSecret, isTestMode: d.settings.isTestMode, currency: d.settings.currency, taxPercentage: d.settings.taxPercentage });
      }
      if (d.payments) setPayments(d.payments);
    });
  }, []);

  async function handleSave() {
    setSaving(true);
    const res = await fetch("/api/admin/payments", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    const data = await res.json();
    if (data.settings) setSettings(data.settings);
    setSaving(false);
    alert("Settings saved!");
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Settings</h1>
      <p className="text-gray-500 mb-6">Configure Razorpay gateway and view transactions</p>

      <div className="flex gap-2 mb-6">
        <button onClick={() => setTab("settings")} className={`px-4 py-2 rounded-full text-sm font-semibold ${tab === "settings" ? "bg-[#1a73e8] text-white" : "bg-gray-100 text-gray-600"}`}>
          <i className="fa-solid fa-gear mr-2"></i>Settings
        </button>
        <button onClick={() => setTab("transactions")} className={`px-4 py-2 rounded-full text-sm font-semibold ${tab === "transactions" ? "bg-[#1a73e8] text-white" : "bg-gray-100 text-gray-600"}`}>
          <i className="fa-solid fa-receipt mr-2"></i>Transactions
        </button>
      </div>

      {tab === "settings" && (
        <div className="bg-white rounded-2xl border p-6 max-w-2xl">
          <div className="flex items-center gap-3 mb-6 p-4 bg-blue-50 rounded-xl">
            <i className="fa-solid fa-shield-halved text-[#1a73e8] text-xl"></i>
            <div>
              <p className="font-semibold text-gray-900">Razorpay Integration</p>
              <p className="text-sm text-gray-500">Configure your Razorpay API keys to enable payments</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.isTestMode} onChange={e => setForm({ ...form, isTestMode: e.target.checked })} className="w-4 h-4 rounded" />
                <span className="text-sm font-semibold text-gray-700">Test Mode</span>
              </label>
              <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${form.isTestMode ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"}`}>
                {form.isTestMode ? "SANDBOX" : "LIVE"}
              </span>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700">Razorpay Key ID</label>
              <input value={form.razorpayKeyId} onChange={e => setForm({ ...form, razorpayKeyId: e.target.value })} className="w-full mt-1 px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-[#1a73e8] outline-none font-mono text-sm" placeholder="rzp_test_xxxxx or rzp_live_xxxxx" />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700">Razorpay Key Secret</label>
              <input type="password" value={form.razorpayKeySecret} onChange={e => setForm({ ...form, razorpayKeySecret: e.target.value })} className="w-full mt-1 px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-[#1a73e8] outline-none font-mono text-sm" placeholder="Your secret key" />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700">Webhook Secret (optional)</label>
              <input value={form.razorpayWebhookSecret} onChange={e => setForm({ ...form, razorpayWebhookSecret: e.target.value })} className="w-full mt-1 px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-[#1a73e8] outline-none font-mono text-sm" placeholder="whsec_xxxxx" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold text-gray-700">Currency</label>
                <select value={form.currency} onChange={e => setForm({ ...form, currency: e.target.value })} className="w-full mt-1 px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-[#1a73e8] outline-none">
                  <option value="INR">INR (₹)</option>
                  <option value="USD">USD ($)</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700">Tax % (GST)</label>
                <input type="number" value={form.taxPercentage} onChange={e => setForm({ ...form, taxPercentage: parseFloat(e.target.value) || 0 })} className="w-full mt-1 px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-[#1a73e8] outline-none" />
              </div>
            </div>

            <button onClick={handleSave} disabled={saving} className="bg-[#1a73e8] text-white px-6 py-2.5 rounded-full font-semibold hover:bg-blue-700 disabled:opacity-50 mt-4">
              <i className="fa-solid fa-floppy-disk mr-2"></i>{saving ? "Saving..." : "Save Settings"}
            </button>
          </div>
        </div>
      )}

      {tab === "transactions" && (
        <div className="bg-white rounded-2xl border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">User</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Type</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Amount</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Status</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Payment ID</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-8 text-gray-400">No transactions yet</td></tr>
              ) : payments.map(p => (
                <tr key={p.id} className="border-b last:border-0">
                  <td className="px-4 py-3"><p className="font-medium text-gray-900">{p.user.name}</p><p className="text-xs text-gray-400">{p.user.email}</p></td>
                  <td className="px-4 py-3"><span className={`text-xs font-bold px-2 py-0.5 rounded-full ${p.type === "subscription" ? "bg-purple-50 text-purple-600" : "bg-blue-50 text-blue-600"}`}>{p.type}</span></td>
                  <td className="px-4 py-3 font-semibold">₹{p.amount}</td>
                  <td className="px-4 py-3"><span className={`text-xs font-bold px-2 py-0.5 rounded-full ${p.status === "completed" ? "bg-green-50 text-green-600" : p.status === "failed" ? "bg-red-50 text-red-600" : "bg-yellow-50 text-yellow-600"}`}>{p.status}</span></td>
                  <td className="px-4 py-3 text-xs font-mono text-gray-500">{p.razorpayPaymentId || "—"}</td>
                  <td className="px-4 py-3 text-xs text-gray-500">{new Date(p.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
