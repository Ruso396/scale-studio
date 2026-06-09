"use client";

import { Search, SlidersHorizontal, Download } from "lucide-react";
import { cn } from "@/utils/cn";

interface DataTableToolbarProps {
  title: string;
  search: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  onFilterClick?: () => void;
  onExportClick?: () => void;
  className?: string;
}

export default function DataTableToolbar({
  title,
  search,
  onSearchChange,
  searchPlaceholder = "Search...",
  onFilterClick,
  onExportClick,
  className,
}: DataTableToolbarProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 border-b border-border/40 p-5 sm:flex-row sm:items-center sm:justify-between",
        className
      )}
    >
      <h2 className="font-display text-lg font-semibold text-foreground">
        {title}
      </h2>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative min-w-[200px] sm:min-w-[260px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={searchPlaceholder}
            className="table-search"
          />
        </div>

        <div className="flex gap-2">
          {onFilterClick && (
            <button
              type="button"
              onClick={onFilterClick}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/60 bg-background/40 text-muted transition-colors hover:border-accent/30 hover:text-accent"
              aria-label="Filter"
            >
              <SlidersHorizontal className="h-4 w-4" />
            </button>
          )}
          {onExportClick && (
            <button
              type="button"
              onClick={onExportClick}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/60 bg-background/40 text-muted transition-colors hover:border-accent/30 hover:text-accent"
              aria-label="Export"
            >
              <Download className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
