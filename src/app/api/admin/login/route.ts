import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      return NextResponse.json(
        { error: "Admin credentials are not configured on the server." },
        { status: 500 },
      );
    }

    const { signJWT } = await import("@/lib/jwt");
    const cookieStore = await cookies();

    // Check if it's admin
    if (email === adminEmail && password === adminPassword) {
      const token = await signJWT({ email, role: "admin" });

      cookieStore.set("admin_session", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: "/",
      });

      return NextResponse.json(
        { success: true, role: "admin" },
        { status: 200 },
      );
    } else {
      // If not admin, treat as regular user
      // Note: You should verify the user's password against a database here!
      const token = await signJWT({ email, role: "user" });

      cookieStore.set("user_session", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: "/",
      });

      return NextResponse.json(
        { success: true, role: "user" },
        { status: 200 },
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
