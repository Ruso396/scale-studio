import mongoose, { Schema, type Document, type Model } from "mongoose";
import type { LeadStatus } from "@/types";

export interface ILead extends Document {
  clientName: string;
  phone: string;
  city: string;
  service: string;
  budget: string;
  bhk: string;
  status: LeadStatus;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

const LeadSchema = new Schema<ILead>(
  {
    clientName: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    service: { type: String, required: true, trim: true },
    budget: { type: String, required: true, trim: true },
    bhk: { type: String, required: true, trim: true },
    status: { type: String, enum: ["active", "draft", "sold"], default: "active" },
    image: { type: String, trim: true },
  },
  { timestamps: true }
);

// Recompile in dev so schema changes (e.g. new fields) are picked up
if (process.env.NODE_ENV === "development" && mongoose.models.Lead) {
  mongoose.deleteModel("Lead");
}

const Lead: Model<ILead> =
  mongoose.models.Lead ?? mongoose.model<ILead>("Lead", LeadSchema);

export default Lead;
