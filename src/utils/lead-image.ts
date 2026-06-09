import { SERVICE_IMAGES } from "@/constants";

export const DEFAULT_LEAD_PLACEHOLDER =
  SERVICE_IMAGES["Full Home"] ??
  "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&h=520&fit=crop&q=80";

export function getLeadImageUrl(lead: {
  image?: string | null;
  service: string;
}): string {
  const image = lead.image?.trim();
  if (image) {
    return image;
  }

  return SERVICE_IMAGES[lead.service] ?? DEFAULT_LEAD_PLACEHOLDER;
}
