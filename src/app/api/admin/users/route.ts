import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyJWT } from "@/lib/jwt";
import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI!);
let isConnected = false;

async function getDB() {
  if (!isConnected) {
    await client.connect();
    isConnected = true;
  }
  return client.db();
}

async function verifyAdmin() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  if (!session) return false;
  const payload = await verifyJWT(session.value);
  return payload?.role === "admin";
}

// GET /api/admin/users
export async function GET() {
  try {
    if (!(await verifyAdmin())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const db = await getDB();
    const users = await db
      .collection("user")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    const formatted = users.map((u: any) => ({
      _id: u._id.toString(),
      name: u.name,
      email: u.email,
      role: u.role
        ? u.role.charAt(0).toUpperCase() + u.role.slice(1)
        : "Client",
      status: u.banned === true ? "Inactive" : "Active",
      joinedAt: u.createdAt
        ? new Date(u.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })
        : "N/A",
    }));

    return NextResponse.json({ data: formatted }, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

// POST /api/admin/users
export async function POST(request: NextRequest) {
  try {
    if (!(await verifyAdmin())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, email, password, role } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email and password are required." },
        { status: 400 },
      );
    }
    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters." },
        { status: 400 },
      );
    }

    // Check duplicate email first
    const db = await getDB();
    const existing = await db
      .collection("user")
      .findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      return NextResponse.json(
        { error: "A user with this email already exists." },
        { status: 409 },
      );
    }

    // Call Better Auth's sign-up API — it handles password hashing correctly
    const baseUrl =
      process.env.BETTER_AUTH_URL ||
      process.env.NEXT_PUBLIC_APP_URL ||
      "http://localhost:3000";

    const signupRes = await fetch(`${baseUrl}/api/auth/sign-up/email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: baseUrl,
        "x-forwarded-host": new URL(baseUrl).host,
      },
      body: JSON.stringify({ name, email, password }),
    });

    const signupData = await signupRes.json().catch(() => ({}));

    if (!signupRes.ok) {
      const msg =
        signupData?.message || signupData?.error || "Failed to create user";
      console.error("Better Auth signup error:", signupData);
      return NextResponse.json({ error: msg }, { status: 400 });
    }

    // Update role if not 'client'
    if (role && role !== "client") {
      await db
        .collection("user")
        .updateOne(
          { email: email.toLowerCase().trim() },
          { $set: { role, updatedAt: new Date() } },
        );
    }

    const newUser = await db
      .collection("user")
      .findOne({ email: email.toLowerCase().trim() });

    return NextResponse.json(
      {
        data: {
          _id: newUser?._id?.toString() || new ObjectId().toString(),
          name: newUser?.name || name,
          email: newUser?.email || email,
          role:
            (role || "client").charAt(0).toUpperCase() +
            (role || "client").slice(1),
          status: "Active",
          joinedAt: new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          }),
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
