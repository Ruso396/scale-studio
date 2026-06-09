import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { designerStatusSchema } from "@/lib/validations";
import { apiSuccess, apiError, requireAuth } from "@/lib/api-helpers";
import { updateDesignerStatus } from "@/services/designer.service";

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
    const parsed = designerStatusSchema.safeParse(body);

    if (!parsed.success) {
      return apiError(parsed.error.issues[0].message, 400);
    }

    const designer = await updateDesignerStatus(id, parsed.data.status);
    if (!designer) {
      return apiError("Designer not found", 404);
    }

    return apiSuccess({
      _id: designer._id.toString(),
      name: designer.name,
      status: designer.status,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update designer";
    return apiError(message, 500);
  }
}
