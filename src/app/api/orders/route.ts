import { connectDB } from "@/lib/db";
import Order from "@/lib/models/Order";
import Service from "@/lib/models/Service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const role = searchParams.get("role");
    const status = searchParams.get("status");

    if (!userId) {
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 },
      );
    }

    let query: any = {};

    if (role === "client") {
      query.clientId = userId;
    } else if (role === "provider") {
      query.providerId = userId;
    }

    if (status) {
      query.status = status;
    }

    const orders = await Order.find(query)
      .populate("serviceId", "title price")
      .populate("clientId", "name email phone")
      .populate("providerId", "name email phone")
      .sort({ createdAt: -1 });

    return NextResponse.json({ orders }, { status: 200 });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { serviceId, clientId, providerId, description, deliverables } = body;

    if (!serviceId || !clientId || !providerId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Get service to fetch price
    const service = await Service.findById(serviceId);
    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    const order = new Order({
      serviceId,
      clientId,
      providerId,
      amount: service.price,
      description: description || service.description,
      deliverables: deliverables || service.features,
      status: "pending",
      paymentStatus: "unpaid",
    });

    await order.save();

    return NextResponse.json(
      { order, message: "Order created successfully" },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 },
    );
  }
}
