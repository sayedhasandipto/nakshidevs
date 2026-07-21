import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyJWT } from "@/lib/jwt";
import { MongoClient, ObjectId } from "mongodb";

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

// GET /api/admin/orders — fetch all orders with populated user & service names
export async function GET() {
  try {
    if (!(await verifyAdmin())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const db = await getDB();

    const orders = await db
      .collection("orders")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    // Collect unique user and service IDs
    const userIds = [
      ...new Set(
        orders.map((o: any) => o.clientId?.toString()).filter(Boolean),
      ),
    ];
    const serviceIds = [
      ...new Set(
        orders.map((o: any) => o.serviceId?.toString()).filter(Boolean),
      ),
    ];

    // Fetch users and services in bulk
    const users = await db
      .collection("user")
      .find({
        _id: {
          $in: userIds.map((id) => {
            try {
              return new ObjectId(id);
            } catch {
              return id;
            }
          }),
        },
      })
      .toArray();

    const services = await db
      .collection("services")
      .find({
        _id: {
          $in: serviceIds.map((id) => {
            try {
              return new ObjectId(id);
            } catch {
              return id;
            }
          }),
        },
      })
      .toArray();

    const userMap = Object.fromEntries(
      users.map((u: any) => [u._id.toString(), u]),
    );
    const serviceMap = Object.fromEntries(
      services.map((s: any) => [s._id.toString(), s]),
    );

    const formatted = orders.map((order: any) => {
      const user = userMap[order.clientId?.toString()];
      const service = serviceMap[order.serviceId?.toString()];
      return {
        _id: order._id.toString(),
        orderId: `ORD-${order._id.toString().slice(-6).toUpperCase()}`,
        customerName: user?.name || "Unknown",
        customerEmail: user?.email || "N/A",
        serviceName: service?.title || "Unknown Service",
        amount: order.amount,
        status: capitalize(order.status || "pending"),
        paymentStatus: capitalize(order.paymentStatus || "unpaid"),
        orderDate: order.createdAt
          ? new Date(order.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })
          : "N/A",
      };
    });

    return NextResponse.json({ data: formatted }, { status: 200 });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

function capitalize(str: string) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).replace(/-/g, " ");
}
