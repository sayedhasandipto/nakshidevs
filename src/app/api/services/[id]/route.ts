import { connectDB } from "@/lib/db";
import Service from "@/lib/models/Service";
import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

type Params = { params: Promise<{ id: string }> };

export async function GET(request: NextRequest, { params }: Params) {
  try {
    await connectDB();

    const { id } = await params;

    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid service ID" },
        { status: 400 },
      );
    }

    const service = await Service.findById(id).populate(
      "providerId",
      "name avatar phone bio rating",
    );

    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    return NextResponse.json({ service }, { status: 200 });
  } catch (error) {
    console.error("Error fetching service:", error);
    return NextResponse.json(
      { error: "Failed to fetch service" },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest, { params }: Params) {
  try {
    await connectDB();

    const { id } = await params;
    const body = await request.json();

    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid service ID" },
        { status: 400 },
      );
    }

    const service = await Service.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    return NextResponse.json(
      { service, message: "Service updated successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error updating service:", error);
    return NextResponse.json(
      { error: "Failed to update service" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    await connectDB();

    const { id } = await params;

    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid service ID" },
        { status: 400 },
      );
    }

    const service = await Service.findByIdAndDelete(id);

    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Service deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error deleting service:", error);
    return NextResponse.json(
      { error: "Failed to delete service" },
      { status: 500 },
    );
  }
}
