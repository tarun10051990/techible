"use client";

import { useState, useEffect } from "react";

interface Ticket { id: string; trackingId: string; name: string; email: string; subject: string; message: string; status: string; createdAt: string; }

export default function AdminSupportPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => { loadTickets(); }, []);
  async function loadTickets() { const res = await fetch("/api/admin/support"); const data = await res.json(); setTickets(data.tickets || []); }
  async function updateStatus(id: string, status: string) { await fetch("/api/admin/support", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, status }) }); loadTickets(); }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Support Tickets</h1>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b"><tr><th className="text-left px-4 py-3 font-medium text-gray-600">Tracking ID</th><th className="text-left px-4 py-3 font-medium text-gray-600">Name</th><th className="text-left px-4 py-3 font-medium text-gray-600">Subject</th><th className="text-left px-4 py-3 font-medium text-gray-600">Status</th><th className="text-left px-4 py-3 font-medium text-gray-600">Date</th></tr></thead>
          <tbody className="divide-y divide-gray-100">
            {tickets.map((ticket) => (
              <tr key={ticket.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-mono text-gray-900 text-xs">{ticket.trackingId}</td>
                <td className="px-4 py-3 text-gray-600">{ticket.name}<br /><span className="text-xs text-gray-400">{ticket.email}</span></td>
                <td className="px-4 py-3 font-medium text-gray-900">{ticket.subject}</td>
                <td className="px-4 py-3">
                  <select value={ticket.status} onChange={(e) => updateStatus(ticket.id, e.target.value)} className="px-2 py-0.5 text-xs border rounded">
                    <option value="open">Open</option><option value="in_progress">In Progress</option><option value="resolved">Resolved</option><option value="closed">Closed</option>
                  </select>
                </td>
                <td className="px-4 py-3 text-gray-600 text-xs">{new Date(ticket.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {tickets.length === 0 && <div className="px-4 py-8 text-center text-gray-500">No support tickets</div>}
      </div>
    </div>
  );
}
