"use client";

import { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import toast from "react-hot-toast";
import { Briefcase, ShoppingCart, TrendingUp, Users } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState<any[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const API_URL = "";

  const fetchData = async () => {
    try {
      setLoading(true);
      // Fetch stats
      const statsRes = await fetch(`/api/admin/stats`);
      if (statsRes.ok) {
        const json = await statsRes.json();
        setStats(json.data || []);
      }

      // Fetch chart data
      const chartRes = await fetch(`/api/admin/revenue-chart`);
      if (chartRes.ok) {
        const json = await chartRes.json();
        setChartData(json.data || []);
      }

      // Fetch recent orders for activity
      const ordersRes = await fetch(`/api/admin/orders`);
      if (ordersRes.ok) {
        const json = await ordersRes.json();
        setRecentOrders(json.data?.slice(0, 5) || []);
      }
    } catch (error) {
      console.error("Error fetching admin dashboard data:", error);
      toast.error("Failed to load dashboard statistics.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const icons = [Users, Briefcase, ShoppingCart, TrendingUp];

  const getRelativeTime = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    return `${diffDays} days ago`;
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 space-y-6 pb-16 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Dashboard Overview
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Welcome back to your admin portal.
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-32 animate-pulse rounded-2xl border border-slate-800 bg-slate-900/50 p-6"
              ></div>
            ))
          : stats.map((stat: any, i: number) => {
              const Icon = icons[i % icons.length];
              return (
                <div
                  key={i}
                  className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-sm transition-colors hover:border-slate-700"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-400">
                        {stat.title}
                      </p>
                      <p className="mt-2 text-3xl font-bold text-white">
                        {stat.value}
                      </p>
                    </div>
                    <div className={`rounded-xl p-3 ${stat.bg}`}>
                      <Icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <span className="text-sm font-medium text-emerald-400">
                      {stat.change}
                    </span>
                    <span className="text-sm text-slate-500">
                      vs last month
                    </span>
                  </div>
                </div>
              );
            })}
      </div>

      {/* Charts & Activity */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recharts Area Chart */}
        <div className="flex flex-col rounded-2xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-sm lg:col-span-2">
          <h2 className="mb-6 text-lg font-semibold text-white">
            Revenue & Orders Overview
          </h2>

          <div className="mt-auto h-72 w-full">
            {loading ? (
              <div className="flex h-full items-center justify-center text-slate-500">
                Loading chart data...
              </div>
            ) : chartData.length === 0 ? (
              <div className="flex h-full items-center justify-center text-slate-500">
                No data available for chart
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={chartData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="colorRevenue"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                      <stop
                        offset="95%"
                        stopColor="#10b981"
                        stopOpacity={0.0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#1e293b"
                    opacity={0.3}
                  />
                  <XAxis
                    dataKey="name"
                    stroke="#64748b"
                    fontSize={11}
                    tickLine={false}
                  />
                  <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0f172a",
                      borderColor: "#334155",
                      borderRadius: "12px",
                    }}
                    labelStyle={{ color: "#94a3b8", fontWeight: "bold" }}
                    itemStyle={{ color: "#fff" }}
                  />
                  <Legend verticalAlign="top" height={36} iconType="circle" />
                  <Area
                    name="Revenue (৳)"
                    type="monotone"
                    dataKey="revenue"
                    stroke="#10b981"
                    fillOpacity={1}
                    fill="url(#colorRevenue)"
                    strokeWidth={2.5}
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-sm">
          <h2 className="mb-4 text-lg font-semibold text-white">
            Recent Activity
          </h2>
          <div className="space-y-6">
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex animate-pulse items-center gap-4">
                  <div className="h-2 w-2 rounded-full bg-slate-700" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-3/4 rounded bg-slate-800"></div>
                    <div className="h-3 w-1/2 rounded bg-slate-800"></div>
                  </div>
                </div>
              ))
            ) : recentOrders.length === 0 ? (
              <div className="py-8 text-center text-sm text-slate-500">
                No recent activities.
              </div>
            ) : (
              recentOrders.map((order, i) => (
                <div key={order._id} className="flex items-start gap-4">
                  <div className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-500 shadow-md shadow-emerald-500/20" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-slate-300">
                      New order for{" "}
                      <span className="font-bold text-white">
                        {order.serviceName}
                      </span>
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {order.customerName} ({order.customerEmail}) -{" "}
                      {getRelativeTime(order.orderDate)}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
