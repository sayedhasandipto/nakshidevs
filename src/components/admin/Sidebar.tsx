"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LuBriefcase,
  LuLayoutDashboard,
  LuLogOut,
  LuShoppingCart,
  LuUsers,
} from "react-icons/lu";
import { useRouter } from "next/navigation";
import {
  Briefcase,
  LayoutDashboard,
  LogOut,
  ShoppingCart,
  Users,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Users", href: "/admin/users", icon: Users },
    { name: "Services", href: "/admin/services", icon: Briefcase },
    { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
  ];

  return (
    <div className="flex h-full w-64 shrink-0 flex-col border-r border-slate-800 bg-slate-900">
      <div className="flex h-16 items-center border-b border-slate-800 px-6">
        <Link
          href="/admin"
          className="flex items-center gap-2 text-rose-500 transition hover:opacity-80"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-rose-500 to-rose-700 shadow-lg shadow-rose-500/20">
            <LayoutDashboard className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight text-white">
            Admin<span className="text-rose-500">Hub</span>
          </span>
        </Link>
      </div>

      <div className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 py-6">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-rose-500/10 text-rose-400"
                  : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
              }`}
            >
              <Icon
                className={`h-5 w-5 ${isActive ? "text-rose-500" : "text-slate-500 group-hover:text-slate-400"}`}
              />
              {item.name}
            </Link>
          );
        })}
      </div>

      <div className="border-t border-slate-800 p-4">
        <button
          onClick={handleLogout}
          className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-400 transition-all duration-200 hover:bg-rose-500/10 hover:text-rose-400"
        >
          <LogOut className="h-5 w-5 text-slate-500 group-hover:text-rose-500" />
          Logout
        </button>
      </div>
    </div>
  );
}
