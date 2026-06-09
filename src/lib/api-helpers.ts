import { NextRequest, NextResponse } from "next/server";
import { getTokenFromHeader, verifyToken } from "@/lib/auth";
import type { JwtPayload, UserRole } from "@/types";

export function apiSuccess<T>(data: T, status = 200): NextResponse {
  return NextResponse.json({ success: true, data }, { status });
}

export function apiError(message: string, status = 400): NextResponse {
  return NextResponse.json({ success: false, error: message }, { status });
}

export function getAuthFromRequest(
  request: NextRequest
): JwtPayload | null {
  const token =
    getTokenFromHeader(request.headers.get("authorization")) ||
    request.cookies.get("token")?.value;

  if (!token) return null;
  return verifyToken(token);
}

export function requireAuth(
  request: NextRequest,
  role?: UserRole
): JwtPayload | NextResponse {
  const user = getAuthFromRequest(request);

  if (!user) {
    return apiError("Unauthorized", 401);
  }

  if (role && user.role !== role) {
    return apiError("Forbidden", 403);
  }

  return user;
}
