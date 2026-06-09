import { cn } from "@/utils/cn";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "danger" | "accent";
  className?: string;
}

const variants = {
  default: "bg-secondary/80 text-muted border-border/60",
  success: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
  warning: "bg-amber-500/15 text-amber-400 border-amber-500/25",
  danger: "bg-red-500/15 text-red-400 border-red-500/25",
  accent: "bg-accent/15 text-accent border-accent/30",
};

export default function Badge({
  children,
  variant = "default",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
