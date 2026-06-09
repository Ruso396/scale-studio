"use client";

import {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  useCallback,
  useId,
} from "react";
import { createPortal } from "react-dom";
import { MoreHorizontal, type LucideIcon } from "lucide-react";
import { cn } from "@/utils/cn";

export interface RowAction {
  label: string;
  onClick: () => void;
  variant?: "default" | "danger";
  icon?: LucideIcon;
}

interface RowActionsProps {
  actions: RowAction[];
}

export default function RowActions({ actions }: RowActionsProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    setMounted(true);
  }, []);

  const updatePosition = useCallback(() => {
    const trigger = triggerRef.current;
    const menu = menuRef.current;
    if (!trigger) return;

    const rect = trigger.getBoundingClientRect();
    const menuHeight = menu?.offsetHeight ?? actions.length * 44 + 8;
    const menuWidth = menu?.offsetWidth ?? 168;
    const gap = 6;
    const padding = 12;

    let top = rect.bottom + gap;
    let left = rect.right - menuWidth;

    if (top + menuHeight > window.innerHeight - padding) {
      top = Math.max(padding, rect.top - menuHeight - gap);
    }

    if (left < padding) {
      left = padding;
    }

    if (left + menuWidth > window.innerWidth - padding) {
      left = window.innerWidth - menuWidth - padding;
    }

    setPosition({ top, left });
  }, [actions.length]);

  useLayoutEffect(() => {
    if (open) {
      updatePosition();
    }
  }, [open, updatePosition]);

  useEffect(() => {
    if (!open) return;

    const handleScroll = () => updatePosition();
    const handleResize = () => updatePosition();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        !triggerRef.current?.contains(target) &&
        !menuRef.current?.contains(target)
      ) {
        setOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll, true);
    window.addEventListener("resize", handleResize);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handlePointerDown);

    return () => {
      window.removeEventListener("scroll", handleScroll, true);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handlePointerDown);
    };
  }, [open, updatePosition]);

  const menu =
    open && mounted
      ? createPortal(
          <div
            ref={menuRef}
            id={menuId}
            role="menu"
            aria-orientation="vertical"
            className="row-actions-menu"
            style={{ top: position.top, left: position.left }}
          >
            {actions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.label}
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    action.onClick();
                    setOpen(false);
                    triggerRef.current?.focus();
                  }}
                  className={cn(
                    "row-actions-item",
                    action.variant === "danger" && "row-actions-item-danger"
                  )}
                >
                  {Icon && <Icon className="h-4 w-4 shrink-0" aria-hidden />}
                  <span>{action.label}</span>
                </button>
              );
            })}
          </div>,
          document.body
        )
      : null;

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          "row-actions-trigger",
          open && "row-actions-trigger-active"
        )}
        aria-label="Row actions"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
      >
        <MoreHorizontal className="h-4 w-4" />
      </button>
      {menu}
    </>
  );
}
