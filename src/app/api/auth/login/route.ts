import { NextRequest } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { loginSchema } from "@/lib/validations";
import { apiSuccess, apiError } from "@/lib/api-helpers";
import { AUTH_COOKIE_OPTIONS } from "@/lib/auth";
import { loginDesigner, loginAdmin } from "@/services/auth.service";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return apiError(parsed.error.issues[0].message, 400);
    }

    const { email, password } = parsed.data;
    const isAdminLogin = body.role === "admin";

    let result;
    if (isAdminLogin) {
      result = loginAdmin(email, password);
    } else {
      await connectDB();
      result = await loginDesigner(email, password);
    }

    const response = apiSuccess({ user: result.user });
    response.cookies.set("token", result.token, AUTH_COOKIE_OPTIONS);

    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Login failed";
    return apiError(message, 401);
  }
}
