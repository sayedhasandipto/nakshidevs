import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Sidebar from "@/components/admin/Sidebar";
import Navbar from "@/components/admin/Navbar";
import { verifyJWT } from "@/lib/jwt";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");

  if (!session) {
    redirect("/admin/login");
  }

  const payload = await verifyJWT(session.value);
  if (!payload || payload.role !== "admin") {
    redirect("/admin/login");
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-950 font-sans text-slate-200">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Navbar />
        <main className="relative flex-1 overflow-y-auto p-6">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950" />
          {children}
        </main>
      </div>
    </div>
  );
}
