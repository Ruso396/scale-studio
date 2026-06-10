import { cn } from "@/utils/cn";

export function TableShell({ children }: { children: React.ReactNode }) {
  return <div className="data-table-shell">{children}</div>;
}

export function Table({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLTableElement>) {
  return (
    <div className="min-w-0 max-w-full overflow-x-auto">
      <table className={cn("w-full text-sm", className)} {...props}>
        {children}
      </table>
    </div>
  );
}

export function TableHeader({ children }: { children: React.ReactNode }) {
  return (
    <thead className="border-b border-border/50 bg-background/30">
      {children}
    </thead>
  );
}

export function TableBody({ children }: { children: React.ReactNode }) {
  return <tbody className="divide-y divide-border/30">{children}</tbody>;
}

export function TableRow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <tr
      className={cn(
        "transition-colors duration-150 hover:bg-accent/[0.04]",
        className
      )}
    >
      {children}
    </tr>
  );
}

export function TableHead({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <th
      className={cn(
        "px-5 py-4 text-left text-[10px] font-bold uppercase tracking-widest text-muted",
        className
      )}
    >
      {children}
    </th>
  );
}

export function TableCell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <td className={cn("px-5 py-4 text-sm text-foreground", className)}>
      {children}
    </td>
  );
}
