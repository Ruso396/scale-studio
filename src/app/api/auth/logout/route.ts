import { apiSuccess } from "@/lib/api-helpers";

export const dynamic = "force-dynamic";

export async function POST() {
  const response = apiSuccess({ message: "Logged out" });
  response.cookies.delete("token");
  return response;
}
