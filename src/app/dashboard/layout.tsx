"use client";

import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import Header from "@/components/home/Header";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, isPending } = useSession();
  const pathname = usePathname();

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const user = session?.user;

  // Helper for active link styling
  const isActive = (path: string) => pathname === path;
  const linkClass = (path: string) =>
    `flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition-all duration-200 ${
      isActive(path)
        ? "bg-[#002045] text-white shadow-md"
        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
    }`;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex h-[calc(100vh-73px)] pt-18.25">
        <aside className="relative z-10 hidden w-64 overflow-y-auto border-r border-gray-100 bg-white p-6 shadow-[1px_0_10px_rgba(0,0,0,0.02)] md:block">
          <div className="mb-8 px-2">
            <h3 className="text-xs font-bold tracking-wider text-gray-400 uppercase">
              Main Menu
            </h3>
          </div>
          <nav className="space-y-1">
            <Link href="/dashboard" className={linkClass("/dashboard")}>
              <span className="material-symbols-outlined text-xl opacity-70">
                dashboard
              </span>
              Dashboard
            </Link>

            {(user?.role === "client" ||
              user?.role === "provider" ||
              !user?.role) && (
              <>
                <Link
                  href="/dashboard/services"
                  className={linkClass("/dashboard/services")}
                >
                  <span className="material-symbols-outlined text-xl opacity-70">
                    apps
                  </span>
                  Services
                </Link>
                <Link
                  href="/dashboard/orders"
                  className={linkClass("/dashboard/orders")}
                >
                  <span className="material-symbols-outlined text-xl opacity-70">
                    receipt_long
                  </span>
                  Orders
                </Link>
              </>
            )}

            {user?.role === "provider" && (
              <Link
                href="/dashboard/add-service"
                className={linkClass("/dashboard/add-service")}
              >
                <span className="material-symbols-outlined text-xl opacity-70">
                  add_circle
                </span>
                Add Service
              </Link>
            )}

            {user?.role === "business" && (
              <>
                <Link
                  href="/dashboard/website-builder"
                  className={linkClass("/dashboard/website-builder")}
                >
                  <span className="material-symbols-outlined text-xl opacity-70">
                    web
                  </span>
                  Website Builder
                </Link>
                <Link
                  href="/dashboard/store"
                  className={linkClass("/dashboard/store")}
                >
                  <span className="material-symbols-outlined text-xl opacity-70">
                    storefront
                  </span>
                  Online Store
                </Link>
              </>
            )}

            <div className="px-2 pt-8 pb-2">
              <h3 className="text-xs font-bold tracking-wider text-gray-400 uppercase">
                Settings
              </h3>
            </div>

            <Link
              href="/dashboard/profile"
              className={linkClass("/dashboard/profile")}
            >
              <span className="material-symbols-outlined text-xl opacity-70">
                person
              </span>
              Profile Settings
            </Link>
            <Link
              href="/dashboard/eligibility-checker"
              className={linkClass("/dashboard/eligibility-checker")}
            >
              <span className="material-symbols-outlined text-xl opacity-70">
                rule
              </span>
              Eligibility Checker
            </Link>
            <Link
              href="/dashboard/support"
              className={linkClass("/dashboard/support")}
            >
              <span className="material-symbols-outlined text-xl opacity-70">
                help
              </span>
              Support & Help
            </Link>
          </nav>
        </aside>

        <main className="flex-1 overflow-auto p-4 md:p-8">
          <div className="mx-auto max-w-6xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
