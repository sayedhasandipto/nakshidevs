"use client";

import { Bell, Search } from "lucide-react";
import { LuBell, LuSearch } from "react-icons/lu";

export default function Navbar() {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-800 bg-slate-900 px-6">
      <div className="flex flex-1 items-center">
        <div className="relative hidden w-full max-w-md md:block">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-4 w-4 text-slate-500" />
          </div>
          <input
            type="text"
            className="block w-full rounded-xl border border-slate-700 bg-slate-800/50 py-2 pr-3 pl-10 leading-5 text-slate-300 placeholder-slate-500 transition-all focus:border-rose-500/50 focus:bg-slate-800 focus:ring-1 focus:ring-rose-500/50 focus:outline-none sm:text-sm"
            placeholder="Search..."
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 text-slate-400 transition-colors hover:text-slate-200">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-rose-500 ring-2 ring-slate-900" />
        </button>

        <div className="mx-2 h-8 w-px bg-slate-700" />

        <div className="flex items-center gap-3">
          <div className="hidden flex-col items-end sm:flex">
            <span className="text-sm font-medium text-white">Super Admin</span>
            <span className="text-xs text-slate-400">admin@servicehub.com</span>
          </div>
          <div className="h-9 w-9 rounded-full bg-linear-to-tr from-rose-500 to-indigo-500 p-0.5 shadow-lg shadow-rose-500/20">
            <div className="flex h-full w-full items-center justify-center rounded-full border-2 border-slate-900 bg-slate-900">
              <span className="text-xs font-bold text-white">SA</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
