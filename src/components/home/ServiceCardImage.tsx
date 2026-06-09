"use client";

import { useEffect, useState } from "react";
import { DEFAULT_LEAD_PLACEHOLDER } from "@/utils/lead-image";

interface ServiceCardImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function ServiceCardImage({
  src,
  alt,
  className,
}: ServiceCardImageProps) {
  const [imageSrc, setImageSrc] = useState(src);

  useEffect(() => {
    setImageSrc(src);
  }, [src]);

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      onError={() => {
        setImageSrc((current) =>
          current !== DEFAULT_LEAD_PLACEHOLDER ? DEFAULT_LEAD_PLACEHOLDER : current
        );
      }}
    />
  );
}
