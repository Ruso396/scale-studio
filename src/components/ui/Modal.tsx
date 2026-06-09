"use client";

import { cn } from "@/utils/cn";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const SIZE_CLASSES = {
  sm: "max-w-[28rem]",
  md: "max-w-lg",
  lg: "max-w-2xl",
};

export default function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  className,
  size = "md",
}: ModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open || !mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[200] overflow-y-auto overscroll-contain"
      role="presentation"
    >
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />

      <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
        <div
          className={cn(
            "relative z-10 flex w-full max-h-[min(85dvh,36rem)] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl",
            SIZE_CLASSES[size],
            className
          )}
          role="dialog"
          aria-modal
          aria-labelledby="modal-title"
          aria-describedby={description ? "modal-description" : undefined}
          onClick={(event) => event.stopPropagation()}
        >
          <div className="shrink-0 border-b border-border/50 px-5 py-4 sm:px-6">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h2
                  id="modal-title"
                  className="font-display text-lg font-semibold leading-tight sm:text-xl"
                >
                  {title}
                </h2>
                {description && (
                  <p
                    id="modal-description"
                    className="mt-1 text-sm text-muted"
                  >
                    {description}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={onClose}
                className="shrink-0 rounded-lg p-1.5 text-muted transition-colors hover:bg-secondary hover:text-foreground"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="modal-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-4 sm:px-6">
            {children}
          </div>

          {footer && (
            <div className="shrink-0 border-t border-border/50 bg-card/95 px-5 py-3.5 backdrop-blur-sm sm:px-6 sm:py-4">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
