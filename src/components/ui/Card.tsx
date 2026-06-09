import { cn } from "@/utils/cn";
import type { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  premium?: boolean;
}

export function Card({
  className,
  hover = false,
  premium = true,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl p-6",
        premium ? "premium-card" : "border border-border bg-card shadow-lg shadow-black/20",
        hover && "card-hover",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("mb-5", className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        "font-display text-xl font-semibold tracking-tight text-foreground",
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
}
