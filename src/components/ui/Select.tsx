import { cn } from "@/utils/cn";
import { forwardRef, type SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: readonly string[] | { value: string; label: string }[];
  placeholder?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, options, placeholder, id, ...props }, ref) => {
    const selectId = id || label?.toLowerCase().replace(/\s/g, "-");

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={selectId} className="text-sm font-medium text-muted">
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={cn(
            "w-full rounded-xl border border-border bg-secondary/50 px-4 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent/30",
            error && "border-red-500",
            className
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => {
            const value = typeof opt === "string" ? opt : opt.value;
            const labelText = typeof opt === "string" ? opt : opt.label;
            return (
              <option key={value} value={value}>
                {labelText}
              </option>
            );
          })}
        </select>
        {error && <p className="text-xs text-red-400">{error}</p>}
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;
