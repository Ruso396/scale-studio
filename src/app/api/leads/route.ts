import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { leadSchema } from "@/lib/validations";
import { apiSuccess, apiError, getAuthFromRequest, requireAuth } from "@/lib/api-helpers";
import { getLeads, getPublicLeads, createLead } from "@/services/lead.service";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const user = getAuthFromRequest(request);
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get("limit");

    if (!user) {
      const leads = await getPublicLeads(limit ? parseInt(limit, 10) : undefined);
      return apiSuccess(leads);
    }

    if (user.role === "admin") {
      const leads = await getLeads(undefined, { includeAll: true, revealAll: true });
      return apiSuccess(leads);
    }

    const leads = await getLeads(user.userId);
    return apiSuccess(leads);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch leads";
    return apiError(message, 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const auth = requireAuth(request, "admin");
    if (auth instanceof Response) return auth;

    const body = await request.json();
    const parsed = leadSchema.safeParse(body);

    if (!parsed.success) {
      return apiError(parsed.error.issues[0].message, 400);
    }

    const lead = await createLead(parsed.data);
    return apiSuccess(lead, 201);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create lead";
    return apiError(message, 500);
  }
}
