import { v2 as cloudinary } from "cloudinary";

const UPLOAD_FOLDER = "scale-studio/leads";

function ensureConfigured() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME?.trim();
  const apiKey = process.env.CLOUDINARY_API_KEY?.trim();
  const apiSecret = process.env.CLOUDINARY_API_SECRET?.trim();

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error(
      "Cloudinary is not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET."
    );
  }

  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  });
}

export function isCloudinaryImageUrl(url: string | null | undefined): boolean {
  if (!url) return false;
  return url.includes("res.cloudinary.com");
}

export function getCloudinaryPublicId(url: string): string | null {
  if (!isCloudinaryImageUrl(url)) return null;

  try {
    const uploadIndex = url.indexOf("/upload/");
    if (uploadIndex === -1) return null;

    let path = url.slice(uploadIndex + "/upload/".length);
    path = path.replace(/^v\d+\//, "");
    path = path.split("?")[0];
    const lastDot = path.lastIndexOf(".");
    if (lastDot === -1) return path;

    return path.slice(0, lastDot);
  } catch {
    return null;
  }
}

export async function uploadImageToCloudinary(file: File): Promise<string> {
  ensureConfigured();

  const buffer = Buffer.from(await file.arrayBuffer());
  const dataUri = `data:${file.type};base64,${buffer.toString("base64")}`;

  const result = await cloudinary.uploader.upload(dataUri, {
    folder: UPLOAD_FOLDER,
    resource_type: "image",
  });

  if (!result.secure_url) {
    throw new Error("Cloudinary upload did not return a secure URL");
  }

  return result.secure_url;
}

export async function deleteImageFromCloudinary(
  imageUrl: string | null | undefined
): Promise<void> {
  if (!imageUrl || !isCloudinaryImageUrl(imageUrl)) {
    return;
  }

  const publicId = getCloudinaryPublicId(imageUrl);
  if (!publicId) return;

  ensureConfigured();

  try {
    await cloudinary.uploader.destroy(publicId, { resource_type: "image" });
  } catch {
    // Image may already be removed
  }
}
