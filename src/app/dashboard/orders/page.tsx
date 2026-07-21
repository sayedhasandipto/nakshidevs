"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function OrdersPage() {
  const { data: session, isPending } = useSession();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  const fetchOrders = async () => {
    try {
      const res = await fetch(
        `${API_URL}/api/orders/user/${session?.user?.email}`,
      );
      if (res.ok) {
        const json = await res.json();
        setOrders(json.data || []);
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isPending) return;

    if (!session?.user?.email) {
      setLoading(false);
      return;
    }

    fetchOrders();
  }, [session, isPending]);

  const handleCancelOrder = async (orderId: string) => {
    if (!confirm("Are you sure you want to cancel this order?")) return;

    try {
      const res = await fetch(`${API_URL}/api/orders/${orderId}/cancel`, {
        method: "PUT",
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Order cancelled successfully! Reloading...");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        toast.error(data.error || "Failed to cancel order.");
      }
    } catch (error) {
      console.error("Error cancelling order:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  const handleDeleteOrder = async (orderId: string, status: string) => {
    const isWorking = status === "Pending" || status === "In Progress";
    const msg = isWorking
      ? "WARNING: This order is still active. Deleting it will permanently remove the record from your dashboard. Are you sure you want to delete?"
      : "Are you sure you want to permanently delete this order record?";

    if (!confirm(msg)) return;

    try {
      const res = await fetch(`${API_URL}/api/orders/${orderId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("Order deleted successfully! Reloading...");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        toast.error("Failed to delete order.");
      }
    } catch (error) {
      console.error("Error deleting order:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  const isCancelable = (orderDateStr: string, status: string) => {
    if (status === "Cancelled" || status === "Completed") return false;

    const orderDate = new Date(orderDateStr).getTime();
    const currentDate = new Date().getTime();
    const diffTime = currentDate - orderDate;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    return diffDays <= 3;
  };

  return (
    <div>
      <h2 className="mb-2 text-3xl font-bold text-gray-900">My Orders</h2>
      <p className="mb-8 text-gray-600">
        Track the status of your recent transactions and service requests.
      </p>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        {/* Mobile View (Cards) */}
        <div className="block divide-y divide-gray-100 md:hidden">
          {loading ? (
            <div className="px-6 py-12 text-center text-gray-500">
              Loading your orders...
            </div>
          ) : orders.length === 0 ? (
            <div className="px-6 py-12 text-center text-gray-500">
              <div className="flex flex-col items-center justify-center">
                <span className="material-symbols-outlined mb-3 text-4xl text-gray-300">
                  receipt_long
                </span>
                <p>No orders found.</p>
              </div>
            </div>
          ) : (
            orders.map((order) => (
              <div key={order._id} className="space-y-4 p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="block text-xs font-medium text-gray-400">
                      Order ID
                    </span>
                    <p className="font-semibold text-blue-600">
                      {order.orderId}
                    </p>
                  </div>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      order.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : order.status === "In Progress"
                          ? "bg-blue-100 text-blue-800"
                          : order.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
                <div>
                  <span className="block text-xs font-medium text-gray-400">
                    Service Name
                  </span>
                  <p className="font-bold text-gray-900">{order.serviceName}</p>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <div>
                    <span className="block text-xs font-medium text-gray-400">
                      Date
                    </span>
                    <p className="text-sm text-gray-900">
                      {new Date(order.orderDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <span className="block text-xs font-medium text-gray-400">
                      Amount
                    </span>
                    <p className="text-sm font-bold text-gray-900">
                      {order.amount}
                    </p>
                  </div>
                </div>
                <div className="flex justify-end gap-3 pt-2">
                  {isCancelable(order.orderDate, order.status) && (
                    <button
                      onClick={() => handleCancelOrder(order._id)}
                      className="rounded-xl bg-red-50 px-4 py-2 text-xs font-semibold text-red-600 transition-colors hover:bg-red-100 hover:text-red-700"
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteOrder(order._id, order.status)}
                    className="rounded-xl bg-gray-50 px-4 py-2 text-xs font-semibold text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Desktop View (Table) */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full text-left text-sm text-gray-500">
            <thead className="border-b border-gray-200 bg-gray-50 text-xs text-gray-700 uppercase">
              <tr>
                <th scope="col" className="px-6 py-4">
                  Order ID
                </th>
                <th scope="col" className="px-6 py-4">
                  Service Name
                </th>
                <th scope="col" className="px-6 py-4">
                  Date
                </th>
                <th scope="col" className="px-6 py-4">
                  Amount
                </th>
                <th scope="col" className="px-6 py-4">
                  Status
                </th>
                <th scope="col" className="px-6 py-4 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    Loading your orders...
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    <div className="flex flex-col items-center justify-center">
                      <span className="material-symbols-outlined mb-3 text-4xl text-gray-300">
                        receipt_long
                      </span>
                      <p>No orders found.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr
                    key={order._id}
                    className="border-b border-gray-100 transition-colors hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 font-medium text-blue-600">
                      {order.orderId}
                    </td>
                    <td className="px-6 py-4 text-gray-900">
                      {order.serviceName}
                    </td>
                    <td className="px-6 py-4">
                      {new Date(order.orderDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900">
                      {order.amount}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          order.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : order.status === "In Progress"
                              ? "bg-blue-100 text-blue-800"
                              : order.status === "Completed"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="flex items-center justify-end gap-3 px-6 py-4 text-right">
                      {isCancelable(order.orderDate, order.status) && (
                        <button
                          onClick={() => handleCancelOrder(order._id)}
                          className="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 transition-colors hover:bg-red-100 hover:text-red-700"
                        >
                          Cancel
                        </button>
                      )}
                      <button
                        onClick={() =>
                          handleDeleteOrder(order._id, order.status)
                        }
                        className="rounded-lg bg-gray-50 px-3 py-1.5 text-xs font-semibold text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
