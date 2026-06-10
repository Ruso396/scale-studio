import {
  LEAD_IMAGE_MAX_BYTES,
  LEAD_IMAGE_ACCEPTED_TYPES,
} from "@/constants/lead-image";
import {
  deleteImageFromCloudinary,
  uploadImageToCloudinary,
} from "@/lib/cloudinary";

const ALLOWED_MIME_TYPES = new Set<string>(LEAD_IMAGE_ACCEPTED_TYPES);

export function validateLeadImageFile(file: File): string | null {
  if (!ALLOWED_MIME_TYPES.has(file.type)) {
    return "Only JPG, JPEG, PNG and WEBP images are allowed";
  }

  if (file.size > LEAD_IMAGE_MAX_BYTES) {
    return "Image must be 5MB or smaller";
  }

  return null;
}

export async function saveLeadImage(file: File): Promise<string> {
  const error = validateLeadImageFile(file);
  if (error) {
    throw new Error(error);
  }

  return uploadImageToCloudinary(file);
}

export async function deleteLeadImageFile(
  imageUrl: string | null | undefined
): Promise<void> {
  await deleteImageFromCloudinary(imageUrl);
}
