import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import User from "@/lib/models/User";

// GET: Retrieve the logged-in user's full profile
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          phone: user.phone || "",
          bio: user.bio || "",
          address: user.address || "",
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json(
      { error: "Failed to fetch profile" },
      { status: 500 },
    );
  }
}

// POST: Update the logged-in user's profile
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const body = await request.json();
    const { name, phone, bio, address } = body;

    // Validate name if provided
    if (name !== undefined && name.trim() === "") {
      return NextResponse.json(
        { error: "Name cannot be empty" },
        { status: 400 },
      );
    }

    // Update using mongoose User model
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          ...(name !== undefined && { name: name.trim() }),
          ...(phone !== undefined && { phone: phone.trim() }),
          ...(bio !== undefined && { bio: bio.trim() }),
          ...(address !== undefined && { address: address.trim() }),
        },
      },
      { new: true },
    );

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        message: "Profile updated successfully",
        user: {
          id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          role: updatedUser.role,
          phone: updatedUser.phone || "",
          bio: updatedUser.bio || "",
          address: updatedUser.address || "",
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 },
    );
  }
}
