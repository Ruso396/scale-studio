import Image from "next/image";
import Link from "next/link";
import { LOGO_SRC } from "@/constants/assets";
import { cn } from "@/utils/cn";

interface LogoProps {
  className?: string;
  showTagline?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  priority?: boolean;
}

const LOGO_SIZES = {
  sm: { width: 140, height: 46, imageClass: "h-9 w-auto max-w-[140px]" },
  md: { width: 160, height: 53, imageClass: "h-11 w-auto max-w-[160px]" },
  lg: { width: 180, height: 60, imageClass: "h-[60px] w-auto max-w-[180px]" },
  xl: { width: 180, height: 58, imageClass: "h-[58px] w-auto max-w-[180px]" },
} as const;

export default function Logo({
  className,
  showTagline = false,
  size = "md",
  priority = false,
}: LogoProps) {
  const dimensions = LOGO_SIZES[size];

  return (
    <Link
      href="/"
      className={cn(
        "inline-flex shrink-0 transition-all duration-300 hover:opacity-90",
        showTagline ? "flex-col items-start gap-2" : "items-center",
        className
      )}
      aria-label="Scale Studio — Home"
    >
      <Image
        src={LOGO_SRC}
        alt="Scale Studio"
        width={dimensions.width}
        height={dimensions.height}
        priority={priority}
        unoptimized
        className={cn("object-contain", dimensions.imageClass)}
        style={{ width: "auto", height: "auto" }}
      />
      {showTagline && (
        <p className="text-xs tracking-wide text-muted">
          Premium Interior Design Leads
        </p>
      )}
    </Link>
  );
}
