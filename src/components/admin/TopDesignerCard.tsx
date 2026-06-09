import Avatar from "@/components/ui/Avatar";
import StatusBadge from "@/components/ui/StatusBadge";
import { MapPin, Coins } from "lucide-react";
import { cn } from "@/utils/cn";
import type { UserStatus } from "@/types";

interface TopDesignerCardProps {
  rank: number;
  name: string;
  city: string;
  unlockCount: number;
  credits: number;
  status: UserStatus;
}

export default function TopDesignerCard({
  rank,
  name,
  city,
  unlockCount,
  credits,
  status,
}: TopDesignerCardProps) {
  return (
    <div className="top-designer-card rounded-2xl p-4">
      <div className="flex items-start gap-3">
        <div
          className={cn(
            "rank-badge mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-background",
            rank === 1 && unlockCount > 0 && "ring-2 ring-accent/40"
          )}
        >
          {rank}
        </div>

        <Avatar name={name} size="sm" className="mt-0.5 shrink-0" />

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm font-semibold leading-snug text-foreground">
              {name}
            </p>
            <StatusBadge status={status} className="!py-0.5 !text-[10px]" />
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5">
            <span className="inline-flex items-center gap-1 text-[11px] text-muted">
              <MapPin className="h-3 w-3 shrink-0 text-accent/80" />
              {city}
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] text-muted">
              <Coins className="h-3 w-3 shrink-0 text-accent/80" />
              {credits} credits
            </span>
          </div>
        </div>

        <div className="shrink-0 pl-2 text-right">
          <p className="font-display text-xl font-bold leading-none text-accent">
            {unlockCount}
          </p>
          <p className="mt-1 text-[10px] uppercase tracking-wider text-muted">
            unlocks
          </p>
        </div>
      </div>
    </div>
  );
}
