import { cn } from "@/utils/cn";
import { TrendingUp, TrendingDown, type LucideIcon } from "lucide-react";

type IconColor = "gold" | "green" | "orange" | "purple" | "blue";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
  iconColor?: IconColor;
  className?: string;
}

const iconColorMap: Record<IconColor, string> = {
  gold: "stat-icon-gold",
  green: "stat-icon-green",
  orange: "stat-icon-orange",
  purple: "stat-icon-purple",
  blue: "stat-icon-blue",
};

export default function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  trendUp = true,
  iconColor = "gold",
  className,
}: StatCardProps) {
  const TrendIcon = trendUp ? TrendingUp : TrendingDown;

  return (
    <div className={cn("glass-card group rounded-2xl p-6", className)}>
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-muted">
            {title}
          </p>
          <p className="mt-3 font-display text-4xl font-bold tracking-tight text-foreground">
            {value}
          </p>
          {trend && (
            <p
              className={cn(
                "mt-2 flex items-center gap-1 text-xs font-medium",
                trendUp ? "text-emerald-400" : "text-red-400"
              )}
            >
              <TrendIcon className="h-3.5 w-3.5" />
              {trend}
            </p>
          )}
        </div>
        <div
          className={cn(
            "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110",
            iconColorMap[iconColor]
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
