import mongoose, { Schema, type Document, type Model } from "mongoose";
import type { UserRole, UserStatus } from "@/types";

export interface IUser extends Document {
  name: string;
  email: string;
  phone: string;
  city: string;
  password: string;
  role: UserRole;
  credits: number;
  status: UserStatus;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "designer"], default: "designer" },
    credits: { type: Number, default: 5 },
    status: { type: String, enum: ["active", "suspended"], default: "active" },
  },
  { timestamps: true }
);

const User: Model<IUser> =
  mongoose.models.User ?? mongoose.model<IUser>("User", UserSchema);

export default User;
