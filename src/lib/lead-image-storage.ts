import { mkdir, unlink, writeFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import {
  LEAD_IMAGE_MAX_BYTES,
  LEAD_IMAGE_ACCEPTED_TYPES,
} from "@/constants/lead-image";

const ALLOWED_MIME_TYPES = new Set<string>(LEAD_IMAGE_ACCEPTED_TYPES);

const EXTENSION_BY_MIME: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/jpg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
};

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads", "leads");

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

  const extension = EXTENSION_BY_MIME[file.type] ?? ".jpg";
  const filename = `${randomUUID()}${extension}`;

  await mkdir(UPLOAD_DIR, { recursive: true });

  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(UPLOAD_DIR, filename), buffer);

  return `/uploads/leads/${filename}`;
}

export async function deleteLeadImageFile(
  imagePath: string | null | undefined
): Promise<void> {
  if (!imagePath || !imagePath.startsWith("/uploads/leads/")) {
    return;
  }

  const filePath = path.join(process.cwd(), "public", imagePath);

  try {
    await unlink(filePath);
  } catch {
    // File may already be removed
  }
}
