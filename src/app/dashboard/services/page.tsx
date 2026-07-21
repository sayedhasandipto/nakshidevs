"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";

export default function ServicesPage() {
  const { data: session, isPending } = useSession();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isPending) return;
    if (!session?.user?.email) {
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      try {
        const API_URL =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        const res = await fetch(
          `${API_URL}/api/orders/user/${session.user.email}`,
        );
        if (res.ok) {
          const json = await res.json();
          setOrders(json.data || []);
        }
      } catch (error) {
        console.error("Failed to fetch services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [session, isPending]);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700";
      case "In Progress":
        return "bg-blue-100 text-blue-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="mb-2 text-3xl font-bold text-gray-900">My Services</h2>
          <p className="text-gray-600">All services you have ordered.</p>
        </div>
        <Link
          href="/services"
          className="rounded-lg bg-blue-600 px-6 py-2 font-medium text-white transition-colors hover:bg-blue-700"
        >
          Order New Service
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        {loading ? (
          <div className="p-12 text-center text-gray-500">
            Loading your services...
          </div>
        ) : orders.length === 0 ? (
          <div className="p-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-blue-600">
              <span className="material-symbols-outlined text-2xl">
                design_services
              </span>
            </div>
            <h3 className="mb-2 text-xl font-bold text-gray-900">
              No Services Yet
            </h3>
            <p className="mx-auto mb-6 max-w-sm text-gray-500">
              You haven&apos;t ordered any services yet. Browse our packages and
              get started!
            </p>
            <Link
              href="/services"
              className="font-semibold text-blue-600 hover:underline"
            >
              Browse available packages →
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {orders.map((order) => (
              <div
                key={order._id}
                className="flex items-center justify-between p-6 transition-colors hover:bg-gray-50"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <span className="material-symbols-outlined">
                      design_services
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {order.serviceName}
                    </p>
                    <p className="text-sm text-gray-500">
                      Order ID: {order.orderId}
                    </p>
                    <p className="mt-0.5 text-xs text-gray-400">
                      {new Date(order.orderDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <p className="font-bold text-gray-900">{order.amount}</p>
                  <span
                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${getStatusStyle(order.status)}`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
