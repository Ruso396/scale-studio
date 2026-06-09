import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { registerSchema } from "@/lib/validations";
import { apiSuccess, apiError } from "@/lib/api-helpers";
import { AUTH_COOKIE_OPTIONS } from "@/lib/auth";
import { registerDesigner } from "@/services/auth.service";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      return apiError(parsed.error.issues[0].message, 400);
    }

    const result = await registerDesigner(parsed.data);

    const response = apiSuccess({
      user: result.user,
    });

    response.cookies.set("token", result.token, AUTH_COOKIE_OPTIONS);

    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Registration failed";
    return apiError(message, 400);
  }
}
