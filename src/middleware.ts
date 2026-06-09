import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyTokenEdge } from "@/lib/auth-edge";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  const isDashboard = pathname.startsWith("/dashboard");
  const isAdmin = pathname.startsWith("/admin") && pathname !== "/admin/login";

  if (!isDashboard && !isAdmin) {
    return NextResponse.next();
  }

  if (!token) {
    const loginUrl = isAdmin ? "/admin/login" : "/login";
    return NextResponse.redirect(new URL(loginUrl, request.url));
  }

  const user = await verifyTokenEdge(token);
  if (!user) {
    const response = NextResponse.redirect(
      new URL(isAdmin ? "/admin/login" : "/login", request.url)
    );
    response.cookies.delete("token");
    return response;
  }

  if (isDashboard && user.role !== "designer") {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  if (isAdmin && user.role !== "admin") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin",
    "/admin/leads/:path*",
    "/admin/designers/:path*",
  ],
};
