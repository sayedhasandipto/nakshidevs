import mongoose, { Document, Model } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  role: "client" | "provider" | "business";
  avatar?: string;
  phone?: string;
  bio?: string;
  address?: string;
  verified?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: String,
    role: {
      type: String,
      enum: ["client", "provider", "business"],
      default: "client",
    },
    avatar: String,
    phone: String,
    bio: String,
    address: String,
    verified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, collection: "user" },
);

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);
export default User;
