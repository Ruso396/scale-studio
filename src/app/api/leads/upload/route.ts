import { NextRequest } from "next/server";
import { apiSuccess, apiError, requireAuth } from "@/lib/api-helpers";
import { saveLeadImage } from "@/lib/lead-image-storage";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const auth = requireAuth(request, "admin");
    if (auth instanceof Response) return auth;

    const formData = await request.formData();
    const file = formData.get("image");

    if (!(file instanceof File)) {
      return apiError("Image file is required", 400);
    }

    const imagePath = await saveLeadImage(file);

    return apiSuccess({ image: imagePath }, 201);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to upload image";
    return apiError(message, 400);
  }
}
