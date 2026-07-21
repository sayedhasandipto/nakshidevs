import mongoose, { Document, Model } from "mongoose";

export interface IService extends Document {
  title: string;
  description: string;
  category:
    | "government"
    | "business"
    | "healthcare"
    | "education"
    | "finance"
    | "legal"
    | "technical"
    | "other";
  price: number;
  duration?: string;
  image?: string;
  features?: string[];
  providerId: mongoose.Types.ObjectId;
  rating?: number;
  reviews?: number;
  active?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const serviceSchema = new mongoose.Schema<IService>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: [
        "government",
        "business",
        "healthcare",
        "education",
        "finance",
        "legal",
        "technical",
        "other",
      ],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    duration: {
      type: String,
      default: "3-5 days",
    },
    image: String,
    features: [String],
    providerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviews: {
      type: Number,
      default: 0,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

const Service: Model<IService> =
  mongoose.models.Service || mongoose.model<IService>("Service", serviceSchema);
export default Service;
