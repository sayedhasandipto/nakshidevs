import { cookies } from "next/headers";

export async function fetchAdminData(endpoint: string) {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_APP_URL ||
      (typeof window === "undefined"
        ? process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
        : "");

    // Forward the admin_session cookie so server-side JWT verification works
    const cookieStore = await cookies();
    const adminSession = cookieStore.get("admin_session");
    const cookieHeader = adminSession
      ? `admin_session=${adminSession.value}`
      : "";

    const res = await fetch(`${baseUrl}/api/admin${endpoint}`, {
      cache: "no-store",
      headers: {
        Cookie: cookieHeader,
      },
    });

    if (!res.ok) {
      console.error(
        `fetchAdminData: ${endpoint} → ${res.status} ${res.statusText}`,
      );
      return null;
    }

    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error("Error fetching admin data:", error);
    return null;
  }
}
