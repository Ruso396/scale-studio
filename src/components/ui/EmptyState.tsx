import type { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function EmptyState({
  icon: Icon,
  title,
  description,
}: EmptyStateProps) {
  return (
    <div className="premium-card flex flex-col items-center justify-center rounded-2xl py-20 text-center">
      <div className="mb-5 rounded-2xl bg-accent/10 p-5">
        <Icon className="h-10 w-10 text-accent" />
      </div>
      <h3 className="font-display text-xl font-semibold">{title}</h3>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">
        {description}
      </p>
    </div>
  );
}
