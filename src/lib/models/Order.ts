import mongoose, { Document, Model } from "mongoose";

export interface IOrder extends Document {
  serviceId: mongoose.Types.ObjectId;
  clientId: mongoose.Types.ObjectId;
  providerId: mongoose.Types.ObjectId;
  amount: number;
  status: "pending" | "accepted" | "in-progress" | "completed" | "cancelled";
  paymentStatus: "unpaid" | "pending" | "paid" | "failed";
  description?: string;
  deliverables?: string[];
  startDate?: Date;
  completionDate?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new mongoose.Schema<IOrder>(
  {
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    providerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "in-progress", "completed", "cancelled"],
      default: "pending",
    },
    paymentStatus: {
      type: String,
      enum: ["unpaid", "pending", "paid", "failed"],
      default: "unpaid",
    },
    description: String,
    deliverables: [String],
    startDate: Date,
    completionDate: Date,
    notes: String,
  },
  { timestamps: true },
);

const Order: Model<IOrder> =
  mongoose.models.Order || mongoose.model<IOrder>("Order", orderSchema);
export default Order;
