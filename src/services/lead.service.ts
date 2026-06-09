import Lead from "@/models/Lead";
import UnlockedLead from "@/models/UnlockedLead";
import User from "@/models/User";
import { deleteLeadImageFile } from "@/lib/lead-image-storage";
import { UNLOCK_COST } from "@/constants";
import type { LeadInput, LeadStatus, PublicLead } from "@/types";

interface LeanLead {
  _id: { toString(): string };
  clientName: string;
  phone: string;
  city: string;
  service: string;
  budget: string;
  bhk: string;
  status: LeadStatus;
  image?: string;
  createdAt: Date;
}

export async function getLeads(
  designerId?: string,
  options: { includeAll?: boolean; revealAll?: boolean } = {}
): Promise<PublicLead[]> {
  const { includeAll = false, revealAll = false } = options;

  const leads = includeAll
    ? await Lead.find().sort({ createdAt: -1 }).lean<LeanLead[]>()
    : await Lead.find({ status: "active" as const })
        .sort({ createdAt: -1 })
        .lean<LeanLead[]>();

  if (revealAll) {
    return leads.map((lead) => formatLead(lead, true));
  }

  let unlockedIds = new Set<string>();
  if (designerId) {
    const unlocked = await UnlockedLead.find({ designerId }).lean();
    unlockedIds = new Set(unlocked.map((u) => u.leadId.toString()));
  }

  return leads.map((lead) => formatLead(lead, unlockedIds.has(lead._id.toString())));
}

export async function getPublicLeads(limit?: number): Promise<PublicLead[]> {
  const query = Lead.find({ status: "active" }).sort({ createdAt: -1 });
  if (limit) query.limit(limit);
  const leads = await query.lean<LeanLead[]>();
  return leads.map((lead) => formatLead(lead, false));
}

export async function getUnlockedLeadsForDesigner(
  designerId: string
): Promise<PublicLead[]> {
  const unlocked = await UnlockedLead.find({ designerId })
    .populate<{ leadId: LeanLead }>("leadId")
    .sort({ unlockedAt: -1 })
    .lean();

  return unlocked
    .filter((u) => u.leadId)
    .map((u) => formatLead(u.leadId, true));
}

export async function createLead(input: LeadInput) {
  const { image, ...rest } = input;
  const payload = image ? { ...rest, image } : rest;
  return Lead.create(payload);
}

export async function updateLead(id: string, input: Partial<LeadInput>) {
  const existing = await Lead.findById(id).lean<LeanLead>();
  if (!existing) {
    return null;
  }

  const { image, ...rest } = input;

  if (image === null && existing.image) {
    await deleteLeadImageFile(existing.image);
  } else if (
    typeof image === "string" &&
    image &&
    existing.image &&
    image !== existing.image
  ) {
    await deleteLeadImageFile(existing.image);
  }

  if (image === null) {
    return Lead.findByIdAndUpdate(
      id,
      { $set: rest, $unset: { image: 1 } },
      { new: true }
    ).lean<LeanLead>();
  }

  const updatePayload: Record<string, unknown> = { ...rest };

  if (image !== undefined) {
    updatePayload.image = image;
  }

  return Lead.findByIdAndUpdate(id, { $set: updatePayload }, { new: true }).lean<LeanLead>();
}

export async function deleteLead(id: string) {
  const existing = await Lead.findById(id).lean<LeanLead>();
  if (existing?.image) {
    await deleteLeadImageFile(existing.image);
  }

  await UnlockedLead.deleteMany({ leadId: id });
  return Lead.findByIdAndDelete(id);
}

export async function unlockLead(
  designerId: string,
  leadId: string
): Promise<PublicLead> {
  const lead = await Lead.findById(leadId).lean<LeanLead>();
  if (!lead) {
    throw new Error("Lead not found");
  }

  if (lead.status !== "active") {
    throw new Error("This lead is not available for unlock");
  }

  const existing = await UnlockedLead.findOne({ designerId, leadId });
  if (existing) {
    return formatLead(lead, true);
  }

  const user = await User.findById(designerId);
  if (!user) {
    throw new Error("User not found");
  }

  if (user.credits < UNLOCK_COST) {
    throw new Error("Insufficient credits. You need at least 1 credit to unlock.");
  }

  user.credits -= UNLOCK_COST;
  await user.save();

  await UnlockedLead.create({ designerId, leadId });

  return formatLead(lead, true);
}

export async function getLeadStats() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [totalLeads, publishedToday, totalSold] = await Promise.all([
    Lead.countDocuments(),
    Lead.countDocuments({ createdAt: { $gte: today }, status: "active" }),
    Lead.countDocuments({ status: "sold" }),
  ]);

  return { totalLeads, publishedToday, totalSold };
}

export async function getRecentLeads(limit = 5) {
  return Lead.find().sort({ createdAt: -1 }).limit(limit).lean<LeanLead[]>();
}

function formatLead(lead: LeanLead, isUnlocked: boolean): PublicLead {
  const base: PublicLead = {
    _id: lead._id.toString(),
    city: lead.city,
    service: lead.service,
    budget: lead.budget,
    bhk: lead.bhk,
    status: lead.status,
    image: lead.image,
    isUnlocked,
    createdAt: lead.createdAt.toISOString(),
  };

  if (isUnlocked) {
    return {
      ...base,
      clientName: lead.clientName,
      phone: lead.phone,
    };
  }

  return base;
}
