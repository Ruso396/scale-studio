import { cn } from "@/utils/cn";
import { getInitials } from "@/utils/format";

interface AvatarProps {
  name: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizes = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
};

export default function Avatar({ name, size = "md", className }: AvatarProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full bg-accent/20 font-semibold text-accent",
        sizes[size],
        className
      )}
    >
      {getInitials(name)}
    </div>
  );
}
