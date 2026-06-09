import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { registerSchema } from "@/lib/validations";
import { apiSuccess, apiError, requireAuth } from "@/lib/api-helpers";
import { getAllDesigners } from "@/services/designer.service";
import { registerDesigner } from "@/services/auth.service";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const auth = requireAuth(request, "admin");
    if (auth instanceof Response) return auth;

    const designers = await getAllDesigners();
    return apiSuccess(designers);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch designers";
    return apiError(message, 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const auth = requireAuth(request, "admin");
    if (auth instanceof Response) return auth;

    const body = await request.json();
    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      return apiError(parsed.error.issues[0].message, 400);
    }

    const result = await registerDesigner(parsed.data);

    return apiSuccess(
      {
        _id: result.user.id,
        name: result.user.name,
        email: result.user.email,
        phone: result.user.phone,
        city: result.user.city,
        credits: result.user.credits,
        status: result.user.status,
      },
      201
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to add designer";
    return apiError(message, 400);
  }
}
