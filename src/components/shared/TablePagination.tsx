"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/utils/cn";

interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export default function TablePagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
}: TablePaginationProps) {
  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalItems);

  const pages = Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1);

  return (
    <div className="flex flex-col items-center justify-between gap-4 border-t border-border/40 px-5 py-4 sm:flex-row">
      <p className="text-xs text-muted">
        Showing {totalItems === 0 ? 0 : start} to {end} of {totalItems} results
      </p>

      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-border/60 text-muted transition-colors hover:border-accent/30 hover:text-accent disabled:opacity-40"
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {pages.map((page) => (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-lg text-xs font-semibold transition-colors",
              page === currentPage
                ? "border border-accent bg-accent/10 text-accent"
                : "border border-transparent text-muted hover:text-foreground"
            )}
          >
            {page}
          </button>
        ))}

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-border/60 text-muted transition-colors hover:border-accent/30 hover:text-accent disabled:opacity-40"
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
