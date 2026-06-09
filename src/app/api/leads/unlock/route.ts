import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { unlockLeadSchema } from "@/lib/validations";
import { apiSuccess, apiError, requireAuth } from "@/lib/api-helpers";
import { unlockLead } from "@/services/lead.service";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const auth = requireAuth(request, "designer");
    if (auth instanceof Response) return auth;

    const body = await request.json();
    const parsed = unlockLeadSchema.safeParse(body);

    if (!parsed.success) {
      return apiError(parsed.error.issues[0].message, 400);
    }

    const lead = await unlockLead(auth.userId, parsed.data.leadId);
    return apiSuccess(lead);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to unlock lead";
    return apiError(message, 400);
  }
}
