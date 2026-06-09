import mongoose from "mongoose";
import User from "@/models/User";
import Lead from "@/models/Lead";
import UnlockedLead from "@/models/UnlockedLead";
import type { DesignerStats, TopDesigner, UserDocument } from "@/types";

export async function getDesignerProfile(
  designerId: string
): Promise<UserDocument | null> {
  const user = await User.findById(designerId)
    .select("-password")
    .lean();

  if (!user) return null;

  return {
    _id: user._id.toString(),
    name: user.name,
    email: user.email,
    phone: user.phone,
    city: user.city,
    role: user.role,
    credits: user.credits,
    status: user.status,
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  };
}

export async function getDesignerStats(
  designerId: string
): Promise<DesignerStats> {
  const [availableLeads, unlockedLeads, user, unlockedRecords] =
    await Promise.all([
      Lead.countDocuments({ status: "active" }),
      UnlockedLead.countDocuments({ designerId }),
      User.findById(designerId).select("credits").lean(),
      UnlockedLead.find({ designerId }).populate("leadId").lean(),
    ]);

  const cities = new Set(
    unlockedRecords
      .map((r) => {
        const lead = r.leadId as { city?: string } | null;
        return lead?.city;
      })
      .filter(Boolean)
  );

  return {
    availableLeads,
    unlockedLeads,
    creditsLeft: user?.credits ?? 0,
    cities: cities.size,
  };
}

export async function getAllDesigners() {
  const designers = await User.find({ role: "designer" })
    .select("-password")
    .sort({ createdAt: -1 })
    .lean();

  return designers.map((d) => ({
    _id: d._id.toString(),
    name: d.name,
    email: d.email,
    phone: d.phone,
    city: d.city,
    credits: d.credits,
    status: d.status,
    createdAt: d.createdAt.toISOString(),
  }));
}

export async function updateDesignerStatus(
  designerId: string,
  status: "active" | "suspended"
) {
  return User.findByIdAndUpdate(
    designerId,
    { status },
    { new: true }
  )
    .select("-password")
    .lean();
}

export async function getTopDesigners(limit = 5): Promise<TopDesigner[]> {
  const designers = await User.aggregate<{
    _id: mongoose.Types.ObjectId;
    name: string;
    city: string;
    credits: number;
    status: "active" | "suspended";
    unlockCount: number;
  }>([
    { $match: { role: "designer" } },
    {
      $lookup: {
        from: UnlockedLead.collection.name,
        localField: "_id",
        foreignField: "designerId",
        as: "unlocks",
      },
    },
    {
      $addFields: {
        unlockCount: { $size: "$unlocks" },
      },
    },
    { $sort: { unlockCount: -1, credits: -1, name: 1 } },
    { $limit: limit },
    {
      $project: {
        name: 1,
        city: 1,
        credits: 1,
        status: 1,
        unlockCount: 1,
      },
    },
  ]);

  return designers.map((designer) => ({
    _id: designer._id.toString(),
    name: designer.name,
    city: designer.city,
    credits: designer.credits,
    status: designer.status,
    unlockCount: designer.unlockCount,
  }));
}

export async function countActiveDesigners(): Promise<number> {
  return User.countDocuments({ role: "designer", status: "active" });
}
