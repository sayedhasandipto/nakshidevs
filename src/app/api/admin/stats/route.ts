import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyJWT } from "@/lib/jwt";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI || "mongodb://localhost:27017/dummy");
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

export async function GET() {
  try {
    if (!(await verifyAdmin())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const db = await getDB();

    // Use native MongoDB — Better Auth uses 'user' (singular), services/orders vary
    const [totalUsers, totalServices, totalOrders, orders] = await Promise.all([
      db.collection("user").countDocuments(),
      db.collection("services").countDocuments({ active: true }),
      db.collection("orders").countDocuments(),
      db.collection("orders").find({}).project({ amount: 1 }).toArray(),
    ]);

    const totalRevenue = Math.round(
      orders.reduce((sum: number, o: any) => sum + (Number(o.amount) || 0), 0),
    );

    const data = [
      {
        title: "Total Users",
        value: totalUsers.toLocaleString(),
        change: "+12%",
        bg: "bg-indigo-500/10",
        color: "text-indigo-400",
      },
      {
        title: "Active Services",
        value: totalServices.toLocaleString(),
        change: "+5%",
        bg: "bg-emerald-500/10",
        color: "text-emerald-400",
      },
      {
        title: "Total Orders",
        value: totalOrders.toLocaleString(),
        change: "+8%",
        bg: "bg-blue-500/10",
        color: "text-blue-400",
      },
      {
        title: "Revenue",
        value: `৳${totalRevenue.toLocaleString()}`,
        change: "+18%",
        bg: "bg-rose-500/10",
        color: "text-rose-400",
      },
    ];

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
