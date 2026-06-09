import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { apiSuccess, apiError, requireAuth } from "@/lib/api-helpers";
import { getDesignerProfile, getDesignerStats } from "@/services/designer.service";
import { getUnlockedLeadsForDesigner } from "@/services/lead.service";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const auth = requireAuth(request, "designer");
    if (auth instanceof Response) return auth;

    const { searchParams } = new URL(request.url);
    const include = searchParams.get("include");

    const profile = await getDesignerProfile(auth.userId);
    if (!profile) {
      return apiError("Designer not found", 404);
    }

    if (include === "stats") {
      const stats = await getDesignerStats(auth.userId);
      return apiSuccess({ profile, stats });
    }

    if (include === "unlocked") {
      const unlockedLeads = await getUnlockedLeadsForDesigner(auth.userId);
      return apiSuccess({ profile, unlockedLeads });
    }

    return apiSuccess(profile);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch profile";
    return apiError(message, 500);
  }
}
