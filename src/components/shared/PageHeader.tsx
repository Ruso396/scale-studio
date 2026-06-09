import { Calendar, Bell, Coins } from "lucide-react";
import { cn } from "@/utils/cn";

interface PageHeaderProps {
  greeting: string;
  title: string;
  description: string;
  actions?: React.ReactNode;
  credits?: number;
  className?: string;
  showTopBar?: boolean;
}

function getFormattedDate(): string {
  return new Intl.DateTimeFormat("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());
}

export default function PageHeader({
  greeting,
  title,
  description,
  actions,
  credits,
  className,
  showTopBar = true,
}: PageHeaderProps) {
  return (
    <div className={cn("page-header-bg mb-8 animate-fade-up", className)}>
      {showTopBar && (
        <div className="relative z-10 flex items-center justify-end gap-3 border-b border-border/30 px-6 py-3 sm:px-8">
          <button
            type="button"
            className="notification-btn"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
            <span className="notification-dot">3</span>
          </button>
          <div className="date-badge">
            <Calendar className="h-3.5 w-3.5 text-accent" />
            {getFormattedDate()}
          </div>
        </div>
      )}

      <div className="relative z-10 flex flex-col gap-6 p-6 sm:flex-row sm:items-end sm:justify-between sm:p-8">
        <div className="min-w-0 flex-1 pl-8 sm:pl-0">
          <p className="text-sm font-medium text-accent">{greeting}</p>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {title}
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
            {description}
          </p>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-3">
          {credits !== undefined && (
            <div className="credit-wallet flex items-center gap-3 rounded-2xl px-5 py-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15">
                <Coins className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted">
                  Credits
                </p>
                <p className="font-display text-2xl font-bold text-accent">
                  {credits}
                </p>
              </div>
            </div>
          )}
          {actions}
        </div>
      </div>
    </div>
  );
}
