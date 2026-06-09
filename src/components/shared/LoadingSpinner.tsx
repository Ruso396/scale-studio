import { cn } from "@/utils/cn";

interface LoadingSpinnerProps {
  className?: string;
  label?: string;
}

export default function LoadingSpinner({
  className,
  label = "Loading",
}: LoadingSpinnerProps) {
  return (
    <div
      className={cn(
        "flex h-64 flex-col items-center justify-center gap-4",
        className
      )}
      role="status"
      aria-label={label}
    >
      <div className="relative h-10 w-10">
        <div className="absolute inset-0 rounded-full border-2 border-border" />
        <div className="absolute inset-0 animate-spin rounded-full border-2 border-accent border-t-transparent" />
      </div>
      <p className="text-sm text-muted">{label}…</p>
    </div>
  );
}
