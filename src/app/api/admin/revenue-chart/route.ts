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

    // Get orders from the last 6 months
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const orders = await db
      .collection("orders")
      .find({ createdAt: { $gte: sixMonthsAgo } })
      .project({ amount: 1, createdAt: 1 })
      .toArray();

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    // Initialize last 6 months
    const monthMap: Record<string, { revenue: number; orders: number }> = {};
    for (let i = 5; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      const key = monthNames[d.getMonth()];
      monthMap[key] = { revenue: 0, orders: 0 };
    }

    orders.forEach((order: any) => {
      const month = monthNames[new Date(order.createdAt).getMonth()];
      if (monthMap[month]) {
        monthMap[month].revenue = Math.round(
          monthMap[month].revenue + (Number(order.amount) || 0),
        );
        monthMap[month].orders += 1;
      }
    });

    const data = Object.entries(monthMap).map(([name, val]) => ({
      name,
      revenue: val.revenue,
      orders: val.orders,
    }));

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error("Error fetching revenue chart data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
