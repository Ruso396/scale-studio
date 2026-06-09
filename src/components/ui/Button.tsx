import { cn } from "@/utils/cn";
import { forwardRef, type ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "premium";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      loading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const variants = {
      primary:
        "gradient-gold btn-shimmer text-background font-semibold shadow-lg shadow-accent/25",
      premium:
        "gradient-gold btn-shimmer text-background font-bold shadow-xl shadow-accent/30 ring-1 ring-accent/50",
      secondary:
        "bg-secondary/80 text-foreground border border-border hover:border-accent/30 hover:bg-secondary",
      outline:
        "border border-accent/60 text-accent hover:bg-accent/10 hover:border-accent",
      ghost: "text-muted hover:text-foreground hover:bg-white/5",
      danger:
        "bg-red-600/90 text-white hover:bg-red-600 shadow-lg shadow-red-900/20",
    };

    const sizes = {
      sm: "px-3.5 py-2 text-xs rounded-xl",
      md: "px-5 py-2.5 text-sm rounded-xl",
      lg: "px-8 py-3.5 text-base rounded-2xl",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 active:scale-[0.98]",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {loading && (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
