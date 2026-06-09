import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { leadSchema } from "@/lib/validations";
import { apiSuccess, apiError, requireAuth } from "@/lib/api-helpers";
import { updateLead, deleteLead } from "@/services/lead.service";

export const dynamic = "force-dynamic";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    await connectDB();
    const auth = requireAuth(request, "admin");
    if (auth instanceof Response) return auth;

    const { id } = await params;
    const body = await request.json();
    const parsed = leadSchema.partial().safeParse(body);

    if (!parsed.success) {
      return apiError(parsed.error.issues[0].message, 400);
    }

    const lead = await updateLead(id, parsed.data);
    if (!lead) {
      return apiError("Lead not found", 404);
    }

    return apiSuccess(lead);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update lead";
    return apiError(message, 500);
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    await connectDB();
    const auth = requireAuth(request, "admin");
    if (auth instanceof Response) return auth;

    const { id } = await params;
    const lead = await deleteLead(id);
    if (!lead) {
      return apiError("Lead not found", 404);
    }

    return apiSuccess({ message: "Lead deleted" });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to delete lead";
    return apiError(message, 500);
  }
}
