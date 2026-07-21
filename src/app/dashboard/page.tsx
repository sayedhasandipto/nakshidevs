"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";

export default function Dashboard() {
  const { data: session } = useSession();
  const [ordersCount, setOrdersCount] = useState<number>(0);

  useEffect(() => {
    if (!session?.user?.email) return;

    const fetchOrders = async () => {
      try {
        const API_URL =
          process.env.NEXT_PUBLIC_API_URL ||
          "https://nakshidevs001server.vercel.app";
        const res = await fetch(
          `${API_URL}/api/orders/user/${session.user.email}`,
        );
        if (res.ok) {
          const json = await res.json();
          setOrdersCount(json.data?.length || 0);
        }
      } catch {
        // silently fail
      }
    };

    fetchOrders();
  }, [session]);

  const user = session?.user;
  const firstName = user?.name ? user.name.split(" ")[0] : "User";

  const stats = [
    {
      title: "Active Services",
      value: "0",
      icon: "bolt",
      color: "text-amber-500",
      bg: "bg-amber-50",
    },
    {
      title: "Total Orders",
      value: ordersCount.toString(),
      icon: "shopping_cart",
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
    {
      title: "Revenue",
      value: "৳0",
      icon: "account_balance_wallet",
      color: "text-emerald-500",
      bg: "bg-emerald-50",
    },
    {
      title: "Rating",
      value: "0.0",
      icon: "star",
      color: "text-purple-500",
      bg: "bg-purple-50",
      suffix: "★",
    },
  ];

  return (
    <div className="pb-12">
      {/* Header Area */}
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-[#002045] md:text-4xl">
            Welcome back,{" "}
            <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {firstName}!
            </span>
          </h2>
          <p className="mt-2 text-lg text-gray-500">
            Here&apos;s what&apos;s happening with your account today.
          </p>
        </div>

        <Link
          href="/services"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#002045] px-6 py-3 font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#001530] hover:shadow-xl"
        >
          <span className="material-symbols-outlined text-xl">add</span>
          New Order
        </Link>
      </div>

      {/* Quick Stats Grid */}
      <div className="mb-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="group relative cursor-default overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div
              className={`absolute top-0 right-0 h-32 w-32 ${stat.bg} -mt-16 -mr-16 rounded-bl-full opacity-50 transition-transform group-hover:scale-110`}
            ></div>

            <div className="relative z-10 flex h-full flex-col">
              <div
                className={`h-12 w-12 rounded-xl ${stat.bg} ${stat.color} mb-4 flex items-center justify-center`}
              >
                <span className="material-symbols-outlined text-2xl">
                  {stat.icon}
                </span>
              </div>
              <p className="text-sm font-semibold tracking-wider text-gray-500 uppercase">
                {stat.title}
              </p>
              <div className="mt-2 flex items-baseline gap-1">
                <h3 className="text-3xl font-extrabold text-gray-900">
                  {stat.value}
                </h3>
                {stat.suffix && (
                  <span className={`text-xl font-bold ${stat.color}`}>
                    {stat.suffix}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Sections */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left Column (Wider) */}
        <div className="space-y-8 lg:col-span-2">
          {/* Welcome/Action Card */}
          <div className="group relative overflow-hidden rounded-2xl bg-linear-to-br from-blue-600 via-indigo-600 to-[#002045] p-1 shadow-lg">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div className="absolute top-0 right-0 -mt-20 -mr-20 h-64 w-64 rounded-full bg-white/10 blur-3xl transition-transform duration-700 group-hover:scale-150"></div>

            <div className="relative z-10 flex h-full flex-col items-center justify-between gap-8 rounded-xl border border-white/20 bg-linear-to-br from-white/10 to-transparent p-8 backdrop-blur-sm md:flex-row">
              <div className="max-w-md text-left">
                <span className="mb-3 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-bold tracking-wider text-white uppercase backdrop-blur-md">
                  Action Required
                </span>
                <h3 className="mb-3 text-2xl leading-tight font-bold text-white md:text-3xl">
                  Complete your NakshiDevs profile
                </h3>
                <p className="mb-0 text-sm leading-relaxed text-blue-100">
                  Unlock all platform features, build trust with service
                  providers, and get personalized recommendations by completing
                  your profile information.
                </p>
              </div>

              <div className="flex w-full shrink-0 flex-col gap-3 md:w-auto">
                <Link
                  href="/dashboard/profile"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 font-bold text-blue-700 shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-white/20"
                >
                  <span className="material-symbols-outlined text-lg">
                    person_add
                  </span>
                  Complete Profile
                </Link>
                <Link
                  href="/dashboard/services"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3.5 font-bold text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20"
                >
                  View My Services
                </Link>
              </div>
            </div>
          </div>

          {/* Recent Activity placeholder (Optional enhancement) */}
          <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-xl font-bold text-[#002045]">
                Recent Activity
              </h3>
              <Link
                href="/dashboard/orders"
                className="text-sm font-semibold text-blue-600 hover:underline"
              >
                View All
              </Link>
            </div>

            {ordersCount > 0 ? (
              <div className="space-y-4">
                <div className="flex items-center gap-4 rounded-xl border border-gray-100 p-4 transition-colors hover:bg-gray-50">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                    <span className="material-symbols-outlined">
                      receipt_long
                    </span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900">Order Placed</h4>
                    <p className="text-sm text-gray-500">
                      You recently placed a new order.
                    </p>
                  </div>
                  <span className="rounded-md bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-400">
                    Recently
                  </span>
                </div>
              </div>
            ) : (
              <div className="py-8 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-50">
                  <span className="material-symbols-outlined text-2xl text-gray-400">
                    history
                  </span>
                </div>
                <p className="font-medium text-gray-500">
                  No recent activity found.
                </p>
                <p className="mt-1 text-sm text-gray-400">
                  Place an order to see it here.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column (Sidebar) */}
        <div className="space-y-8">
          {/* Support Card */}
          <div className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
            <div className="absolute -top-6 -right-6 h-24 w-24 rounded-full bg-emerald-50 transition-transform duration-500 group-hover:scale-150"></div>
            <div className="relative z-10">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                <span className="material-symbols-outlined">support_agent</span>
              </div>
              <h3 className="mb-2 text-xl font-bold text-gray-900">
                Need Help?
              </h3>
              <p className="mb-6 text-sm leading-relaxed text-gray-500">
                Our dedicated support team is available 24/7 to assist you with
                any questions or issues.
              </p>
              <Link
                href="/dashboard/support"
                className="inline-flex items-center gap-2 font-bold text-emerald-600 transition-colors hover:text-emerald-700"
              >
                Contact Support{" "}
                <span className="material-symbols-outlined text-sm">
                  arrow_forward
                </span>
              </Link>
            </div>
          </div>

          {/* Discover Services */}
          <div className="rounded-2xl border border-blue-100 bg-linear-to-br from-blue-50 to-indigo-50 p-8">
            <div className="mb-4 flex items-center gap-3">
              <span className="material-symbols-outlined text-blue-600">
                explore
              </span>
              <h3 className="text-lg font-bold text-[#002045]">
                Discover More
              </h3>
            </div>
            <p className="mb-5 text-sm text-gray-600">
              Explore our wide range of government and business services.
            </p>
            <Link
              href="/services"
              className="block w-full rounded-xl border border-blue-200 bg-white py-3 text-center font-bold text-blue-700 shadow-sm transition-all hover:border-blue-600 hover:bg-blue-600 hover:text-white"
            >
              Browse Directory
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
