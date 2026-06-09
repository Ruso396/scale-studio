"use client";

import { useEffect, useState } from "react";
import { getLeadImageUrl } from "@/utils/lead-image";

interface LeadImageProps {
  image?: string | null;
  service: string;
  alt: string;
  className?: string;
}

export default function LeadImage({
  image,
  service,
  alt,
  className,
}: LeadImageProps) {
  const fallback = getLeadImageUrl({ service });
  const [src, setSrc] = useState(getLeadImageUrl({ image, service }));

  useEffect(() => {
    setSrc(getLeadImageUrl({ image, service }));
  }, [image, service]);

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => {
        setSrc((current) => (current !== fallback ? fallback : current));
      }}
    />
  );
}
