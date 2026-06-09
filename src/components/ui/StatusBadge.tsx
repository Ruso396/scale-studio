import { cn } from "@/utils/cn";

interface StatusBadgeProps {
  status: string;
  className?: string;
}

function statusClass(status: string): string {
  const s = status.toLowerCase();
  if (s === "active") return "active";
  if (s === "suspended") return "suspended";
  if (s === "sold") return "sold";
  if (s === "draft") return "draft";
  return "default";
}

export default function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span className={cn("status-dot-badge", statusClass(status), className)}>
      <span className="status-dot" />
      {status}
    </span>
  );
}
