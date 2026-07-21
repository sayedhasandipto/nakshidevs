"use client";

import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import {
  AlertTriangle,
  Eye,
  EyeOff,
  Plus,
  RefreshCw,
  Search,
  Shield,
  Trash2,
  User,
  X,
} from "lucide-react";

interface UserData {
  _id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  joinedAt: string;
}

export default function AdminUsers() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [showAddModal, setShowAddModal] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState<string | null>(null);
  const [deleteUserName, setDeleteUserName] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "client",
  });

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/users");
      if (!res.ok) throw new Error("Failed to fetch users");
      const json = await res.json();
      setUsers(json.data || []);
    } catch (err) {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    let result = [...users];
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (u) =>
          u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q),
      );
    }
    if (sortOrder === "oldest") result.reverse();
    else if (sortOrder === "name")
      result.sort((a, b) => a.name.localeCompare(b.name));
    setFilteredUsers(result);
  }, [users, searchQuery, sortOrder]);

  const handleDeleteUser = async () => {
    if (!deleteUserId) return;
    setDeleteLoading(true);
    try {
      const res = await fetch(`/api/admin/users/${deleteUserId}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to delete user");
      toast.success(`"${deleteUserName}" has been deleted.`);
      setDeleteUserId(null);
      setDeleteUserName("");
      setUsers((prev) => prev.filter((u) => u._id !== deleteUserId));
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddLoading(true);
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to add user");

      toast.success(`User "${formData.name}" added successfully!`);
      setShowAddModal(false);
      setFormData({ name: "", email: "", password: "", role: "client" });
      fetchUsers();
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setAddLoading(false);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 space-y-6 duration-500">
      {/* Header */}
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Users Management
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Manage platform users, roles, and permissions.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={fetchUsers}
            title="Refresh"
            className="rounded-xl bg-slate-800 p-2.5 text-slate-400 transition-colors hover:bg-slate-700 hover:text-white"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 rounded-xl bg-rose-500 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-rose-500/20 transition-colors hover:bg-rose-600"
          >
            <Plus className="h-4 w-4" />
            Add New User
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm">
        <div className="flex items-center justify-between gap-4 border-b border-slate-800 bg-slate-900/80 p-4">
          <div className="relative w-full max-w-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4 w-4 text-slate-500" />
            </div>
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full rounded-xl border border-slate-700 bg-slate-950/50 py-2 pr-3 pl-10 text-slate-300 placeholder-slate-500 transition-all focus:border-rose-500/50 focus:ring-1 focus:ring-rose-500/50 focus:outline-none sm:text-sm"
            />
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <span className="hidden sm:inline">Sort by:</span>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-1.5 text-slate-300 transition-colors focus:border-rose-500/50 focus:outline-none"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="name">Name A-Z</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-800 bg-slate-950/50 text-xs text-slate-400 uppercase">
              <tr>
                <th className="px-6 py-4 font-medium">User</th>
                <th className="px-6 py-4 font-medium">Role</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Joined</th>
                <th className="px-6 py-4 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {loading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-slate-800" />
                        <div className="space-y-2">
                          <div className="h-3 w-28 rounded bg-slate-800" />
                          <div className="h-2 w-40 rounded bg-slate-800" />
                        </div>
                      </div>
                    </td>
                    {[...Array(4)].map((_, j) => (
                      <td key={j} className="px-6 py-4">
                        <div className="h-3 w-20 rounded bg-slate-800" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-12 text-center text-slate-500"
                  >
                    {searchQuery
                      ? "No users match your search."
                      : "No users found."}
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr
                    key={user._id}
                    className="transition-colors hover:bg-slate-800/30"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-indigo-500/20 bg-linear-to-br from-indigo-500/20 to-purple-500/20">
                          {user.role === "Admin" ? (
                            <Shield className="h-5 w-5 text-indigo-400" />
                          ) : (
                            <User className="h-5 w-5 text-slate-400" />
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-slate-200">
                            {user.name}
                          </div>
                          <div className="text-xs text-slate-500">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-medium ${
                          user.role === "Admin"
                            ? "border-indigo-500/20 bg-indigo-500/10 text-indigo-400"
                            : user.role === "Provider"
                              ? "border-blue-500/20 bg-blue-500/10 text-blue-400"
                              : "border-slate-500/20 bg-slate-500/10 text-slate-400"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div
                          className={`h-2 w-2 rounded-full ${user.status === "Active" ? "bg-emerald-500" : "bg-rose-500"}`}
                        />
                        <span
                          className={
                            user.status === "Active"
                              ? "text-emerald-400"
                              : "text-rose-400"
                          }
                        >
                          {user.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-400">
                      {user.joinedAt}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => {
                          setDeleteUserId(user._id);
                          setDeleteUserName(user.name);
                        }}
                        title="Delete user"
                        className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-rose-500/10 hover:text-rose-400"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-slate-800 bg-slate-900/80 p-4 text-sm text-slate-400">
          <div>
            Showing{" "}
            <span className="font-medium text-white">
              {filteredUsers.length}
            </span>{" "}
            of <span className="font-medium text-white">{users.length}</span>{" "}
            users
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteUserId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => !deleteLoading && setDeleteUserId(null)}
          />
          <div
            className="relative z-10 w-full max-w-sm rounded-2xl p-6 shadow-2xl"
            style={{
              background: "rgba(15, 23, 42, 0.97)",
              border: "1px solid rgba(244, 63, 94, 0.25)",
              boxShadow: "0 25px 60px rgba(0,0,0,0.7)",
            }}
          >
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-rose-500/20 bg-rose-500/10">
                <AlertTriangle className="h-7 w-7 text-rose-400" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Delete User?</h2>
                <p className="mt-1 text-sm text-slate-400">
                  Are you sure you want to delete{" "}
                  <span className="font-semibold text-white">
                    {deleteUserName}
                  </span>
                  ?
                  <br />
                  This will remove their account, credentials, and sessions
                  permanently.
                </p>
              </div>
              <div className="flex w-full gap-3">
                <button
                  onClick={() => setDeleteUserId(null)}
                  disabled={deleteLoading}
                  className="flex-1 rounded-xl bg-slate-800 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-700 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteUser}
                  disabled={deleteLoading}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold text-white transition-all disabled:opacity-60"
                  style={{
                    background:
                      "linear-gradient(135deg, #f43f5e 0%, #be123c 100%)",
                  }}
                >
                  {deleteLoading ? (
                    <span className="flex items-center gap-2">
                      <svg
                        className="h-4 w-4 animate-spin"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      Deleting...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowAddModal(false)}
          />
          <div
            className="relative z-10 w-full max-w-md rounded-2xl p-6 shadow-2xl"
            style={{
              background: "rgba(15, 23, 42, 0.95)",
              border: "1px solid rgba(244, 63, 94, 0.2)",
              boxShadow: "0 25px 60px rgba(0,0,0,0.6)",
            }}
          >
            {/* Modal header */}
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-white">Add New User</h2>
                <p className="mt-0.5 text-xs text-slate-400">
                  User will be saved directly to MongoDB.
                </p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAddUser} className="space-y-4">
              {/* Name */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold tracking-wider text-slate-400 uppercase">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, name: e.target.value }))
                  }
                  placeholder="John Doe"
                  className="w-full rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-2.5 text-sm text-white placeholder-slate-600 transition-all focus:border-rose-500/60 focus:ring-1 focus:ring-rose-500/40 focus:outline-none"
                />
              </div>

              {/* Email */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold tracking-wider text-slate-400 uppercase">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, email: e.target.value }))
                  }
                  placeholder="john@example.com"
                  className="w-full rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-2.5 text-sm text-white placeholder-slate-600 transition-all focus:border-rose-500/60 focus:ring-1 focus:ring-rose-500/40 focus:outline-none"
                />
              </div>

              {/* Password */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold tracking-wider text-slate-400 uppercase">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    minLength={8}
                    value={formData.password}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, password: e.target.value }))
                    }
                    placeholder="Min. 8 characters"
                    className="w-full rounded-xl border border-slate-700 bg-slate-800/50 py-2.5 pr-10 pl-4 text-sm text-white placeholder-slate-600 transition-all focus:border-rose-500/60 focus:ring-1 focus:ring-rose-500/40 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-500 transition-colors hover:text-slate-300"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Role */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold tracking-wider text-slate-400 uppercase">
                  Role
                </label>
                <select
                  value={formData.role}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, role: e.target.value }))
                  }
                  className="w-full rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-2.5 text-sm text-white transition-all focus:border-rose-500/60 focus:ring-1 focus:ring-rose-500/40 focus:outline-none"
                >
                  <option value="client">Client</option>
                  <option value="provider">Provider</option>
                  <option value="business">Business</option>
                </select>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 rounded-xl bg-slate-800 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={addLoading}
                  className="flex-1 rounded-xl py-2.5 text-sm font-semibold text-white transition-all disabled:opacity-60"
                  style={{
                    background:
                      "linear-gradient(135deg, #f43f5e 0%, #be123c 100%)",
                  }}
                >
                  {addLoading ? "Adding..." : "Add User"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
