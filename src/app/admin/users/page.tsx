"use client";

import { useState, useEffect } from "react";

interface User { id: string; name: string; email: string; role: string; createdAt: string; }

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => { loadUsers(); }, []);
  async function loadUsers() { const res = await fetch("/api/users"); const data = await res.json(); setUsers(data.users || []); }
  async function changeRole(id: string, role: string) { await fetch("/api/users", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, role }) }); loadUsers(); }
  async function deleteUser(id: string) { if (!confirm("Delete this user?")) return; await fetch(`/api/users?id=${id}`, { method: "DELETE" }); loadUsers(); }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Manage Users</h1>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b"><tr><th className="text-left px-4 py-3 font-medium text-gray-600">Name</th><th className="text-left px-4 py-3 font-medium text-gray-600">Email</th><th className="text-left px-4 py-3 font-medium text-gray-600">Role</th><th className="text-left px-4 py-3 font-medium text-gray-600">Joined</th><th className="text-right px-4 py-3 font-medium text-gray-600">Actions</th></tr></thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900">{user.name}</td>
                <td className="px-4 py-3 text-gray-600">{user.email}</td>
                <td className="px-4 py-3">
                  <select value={user.role} onChange={(e) => changeRole(user.id, e.target.value)} className="px-2 py-0.5 text-xs border rounded">
                    <option value="user">User</option><option value="admin">Admin</option><option value="mentor">Mentor</option><option value="business">Business</option>
                  </select>
                </td>
                <td className="px-4 py-3 text-gray-600">{new Date(user.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-3 text-right"><button onClick={() => deleteUser(user.id)} className="p-1 hover:bg-red-50 rounded"><i className="fa-solid fa-trash text-xs text-red-500"></i></button></td>
              </tr>
            ))}
          </tbody>
        </table>
        {users.length === 0 && <div className="px-4 py-8 text-center text-gray-500">No users yet</div>}
      </div>
    </div>
  );
}
