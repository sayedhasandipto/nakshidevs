"use client";

import { useState, useEffect, useCallback } from "react";
import {
  LuClock,
  LuCircleCheck,
  LuCircleX,
  LuRefreshCw,
  LuCheck,
  LuX,
  LuLoader,
} from "react-icons/lu";
import toast from "react-hot-toast";

interface Order {
  _id: string;
  orderId: string;
  customerName: string;
  customerEmail: string;
  serviceName: string;
  amount: number;
  status: string;
  paymentStatus: string;
  orderDate: string;
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/orders");
      if (!res.ok) throw new Error("Failed to fetch orders");
      const json = await res.json();
      setOrders(json.data || []);
    } catch {
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const updateStatus = async (id: string, status: string) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/admin/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to update order");

      toast.success(`Order ${status === "accepted" ? "approved" : status}!`);
      // Update local state without refetching
      setOrders((prev) =>
        prev.map((o) =>
          o._id === id ? { ...o, status: capitalize(status) } : o,
        ),
      );
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "cancelled":
        return <LuCircleX className="h-3.5 w-3.5" />;
      case "accepted":
        return <LuCircleCheck className="h-3.5 w-3.5" />;
      case "pending":
        return <LuClock className="h-3.5 w-3.5" />;
      case "in progress":
        return <LuClock className="h-3.5 w-3.5" />;
      case "completed":
        return <LuCircleCheck className="h-3.5 w-3.5" />;
      default:
        return null;
    }
  };

  const getStatusStyles = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "accepted":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "pending":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "in progress":
        return "bg-indigo-500/10 text-indigo-400 border-indigo-500/20";
      case "cancelled":
        return "bg-rose-500/10 text-rose-400 border-rose-500/20";
      default:
        return "bg-slate-500/10 text-slate-400 border-slate-500/20";
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 space-y-6 duration-500">
      {/* Header */}
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Orders Management
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Track and manage all platform orders and their statuses.
          </p>
        </div>
        <button
          onClick={fetchOrders}
          className="flex items-center gap-2 rounded-xl bg-slate-800 px-4 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-700"
        >
          <LuRefreshCw className="h-4 w-4" />
          Refresh
        </button>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-800 bg-slate-950/50 text-xs text-slate-400 uppercase">
              <tr>
                <th className="px-6 py-4 font-medium">Order ID</th>
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Service</th>
                <th className="px-6 py-4 font-medium">Amount</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    {[...Array(6)].map((_, j) => (
                      <td key={j} className="px-6 py-4">
                        <div className="h-3 w-24 rounded bg-slate-800" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : orders.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-12 text-center text-slate-500"
                  >
                    No orders found.
                  </td>
                </tr>
              ) : (
                orders.map((order) => {
                  const isPending = order.status.toLowerCase() === "pending";
                  const isUpdating = updatingId === order._id;

                  return (
                    <tr
                      key={order._id}
                      className="transition-colors hover:bg-slate-800/30"
                    >
                      {/* Order ID */}
                      <td className="px-6 py-4 font-mono text-xs font-medium text-indigo-400">
                        {order.orderId}
                      </td>

                      {/* Customer */}
                      <td className="px-6 py-4">
                        <div className="font-medium text-slate-200">
                          {order.customerName}
                        </div>
                        <div className="text-xs text-slate-500">
                          {order.customerEmail}
                        </div>
                      </td>

                      {/* Service */}
                      <td className="px-6 py-4 text-slate-400">
                        {order.serviceName}
                      </td>

                      {/* Amount */}
                      <td className="px-6 py-4 font-semibold text-slate-200">
                        ৳{Number(order.amount).toLocaleString()}
                      </td>

                      {/* Status badge */}
                      <td className="px-6 py-4">
                        <div
                          className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-medium ${getStatusStyles(order.status)}`}
                        >
                          {getStatusIcon(order.status)}
                          {order.status}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          {isUpdating ? (
                            <LuLoader className="h-4 w-4 animate-spin text-slate-400" />
                          ) : (
                            <>
                              {/* Approve — only if pending */}
                              {isPending && (
                                <button
                                  onClick={() =>
                                    updateStatus(order._id, "accepted")
                                  }
                                  title="Approve"
                                  className="flex items-center gap-1.5 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-400 transition-colors hover:bg-emerald-500/20"
                                >
                                  <LuCheck className="h-3.5 w-3.5" />
                                  Approve
                                </button>
                              )}

                              {/* Complete — if accepted */}
                              {order.status.toLowerCase() === "accepted" && (
                                <button
                                  onClick={() =>
                                    updateStatus(order._id, "completed")
                                  }
                                  title="Mark Complete"
                                  className="flex items-center gap-1.5 rounded-lg border border-blue-500/20 bg-blue-500/10 px-3 py-1.5 text-xs font-medium text-blue-400 transition-colors hover:bg-blue-500/20"
                                >
                                  <LuCircleCheck className="h-3.5 w-3.5" />
                                  Complete
                                </button>
                              )}

                              {/* Cancel — if not already cancelled/completed */}
                              {!["cancelled", "completed"].includes(
                                order.status.toLowerCase(),
                              ) && (
                                <button
                                  onClick={() =>
                                    updateStatus(order._id, "cancelled")
                                  }
                                  title="Cancel"
                                  className="flex items-center gap-1.5 rounded-lg border border-rose-500/20 bg-rose-500/10 px-3 py-1.5 text-xs font-medium text-rose-400 transition-colors hover:bg-rose-500/20"
                                >
                                  <LuX className="h-3.5 w-3.5" />
                                  Cancel
                                </button>
                              )}
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {!loading && (
          <div className="flex items-center justify-between border-t border-slate-800 bg-slate-900/80 p-4 text-sm text-slate-400">
            <div>
              Total{" "}
              <span className="font-medium text-white">{orders.length}</span>{" "}
              orders
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="text-amber-400">
                {
                  orders.filter((o) => o.status.toLowerCase() === "pending")
                    .length
                }{" "}
                Pending
              </span>
              <span className="text-blue-400">
                {
                  orders.filter((o) => o.status.toLowerCase() === "accepted")
                    .length
                }{" "}
                Accepted
              </span>
              <span className="text-emerald-400">
                {
                  orders.filter((o) => o.status.toLowerCase() === "completed")
                    .length
                }{" "}
                Completed
              </span>
              <span className="text-rose-400">
                {
                  orders.filter((o) => o.status.toLowerCase() === "cancelled")
                    .length
                }{" "}
                Cancelled
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function capitalize(str: string) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).replace(/-/g, " ");
}
