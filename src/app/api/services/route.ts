import { connectDB } from "@/lib/db";
import Service from "@/lib/models/Service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const limit = parseInt(searchParams.get("limit") || "20");
    const skip = parseInt(searchParams.get("skip") || "0");

    let query: any = { active: true };

    if (category && category !== "all") {
      query.category = category;
    }

    const services = await Service.find(query)
      .limit(limit)
      .skip(skip)
      .populate("providerId", "name avatar rating");

    const total = await Service.countDocuments(query);

    return NextResponse.json(
      {
        services,
        total,
        hasMore: skip + limit < total,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error fetching services:", error);
    return NextResponse.json(
      { error: "Failed to fetch services" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const {
      title,
      description,
      category,
      price,
      duration,
      features,
      providerId,
    } = body;

    if (!title || !description || !category || !price || !providerId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const service = new Service({
      title,
      description,
      category,
      price,
      duration: duration || "3-5 days",
      features: features || [],
      providerId,
    });

    await service.save();

    return NextResponse.json(
      { service, message: "Service created successfully" },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating service:", error);
    return NextResponse.json(
      { error: "Failed to create service" },
      { status: 500 },
    );
  }
}
