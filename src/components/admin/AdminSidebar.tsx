"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  FileText,
  Users,
  LogOut,
  Menu,
  X,
  Shield,
  Crown,
  FileStack,
  UserCheck,
  ShoppingBag,
  Coins,
} from "lucide-react";
import Logo from "@/components/shared/Logo";
import Button from "@/components/ui/Button";
import Avatar from "@/components/ui/Avatar";
import { ADMIN_NAV } from "@/constants";
import { useAuth } from "@/hooks/useAuth";
import { apiFetch } from "@/utils/api";
import { cn } from "@/utils/cn";
import type { AdminStats } from "@/types";

const iconMap = {
  LayoutDashboard,
  FileText,
  Users,
};

interface SidebarStats {
  totalLeads: number;
  activeDesigners: number;
  totalSold: number;
  creditsDistributed: number;
}

export default function AdminSidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [stats, setStats] = useState<SidebarStats | null>(null);

  useEffect(() => {
    Promise.all([
      apiFetch<{ stats: AdminStats }>("/api/admin/stats"),
      apiFetch<Array<{ credits: number }>>("/api/admin/designers"),
    ])
      .then(([statsRes, designersRes]) => {
        const s = statsRes.data?.stats;
        const credits = (designersRes.data ?? []).reduce(
          (sum, d) => sum + d.credits,
          0
        );
        if (s) {
          setStats({
            totalLeads: s.totalLeads,
            activeDesigners: s.activeDesigners,
            totalSold: s.totalSold,
            creditsDistributed: credits,
          });
        }
      })
      .catch(() => {});
  }, []);

  const isActive = (href: string) =>
    pathname === href ||
    (href !== "/admin" && pathname.startsWith(href));

  const insights = [
    { label: "Total Leads", value: stats?.totalLeads ?? "—", icon: FileStack },
    { label: "Active Designers", value: stats?.activeDesigners ?? "—", icon: UserCheck },
    { label: "Total Sold Leads", value: stats?.totalSold ?? "—", icon: ShoppingBag },
    { label: "Credits Distributed", value: stats?.creditsDistributed ?? "—", icon: Coins },
  ];

  const sidebarShellClass =
    "glass-sidebar fixed inset-y-0 left-0 z-40 flex h-screen w-[280px] flex-col overflow-hidden";

  const scrollableContent = (
    <>
      <div className="px-5 pb-4 pt-6">
        <Logo size="xl" />
        <div className="mt-4">
          <span className="admin-badge">
            <Shield className="h-3 w-3" />
            Admin Panel
          </span>
        </div>
      </div>

      <nav className="space-y-1 px-4">
        {ADMIN_NAV.map((item) => {
          const Icon = iconMap[item.icon as keyof typeof iconMap];
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200",
                active
                  ? "nav-active-accent"
                  : "text-muted hover:bg-white/[0.03] hover:text-foreground"
              )}
            >
              <Icon className={cn("h-5 w-5", active ? "text-accent" : "")} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-6 px-5">
        <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.15em] text-muted">
          Platform Insights
        </p>
        <div className="rounded-xl border border-border/40 bg-background/20 px-4 py-2">
          {insights.map((item) => (
            <div key={item.label} className="sidebar-insight-item">
              <div className="flex items-center gap-2 text-muted">
                <item.icon className="h-3.5 w-3.5 text-accent/70" />
                <span>{item.label}</span>
              </div>
              <span className="font-semibold text-foreground">{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 px-5">
        <div className="sidebar-promo-card">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15">
            <Crown className="h-5 w-5 text-accent" />
          </div>
          <p className="font-display text-sm font-semibold text-foreground">
            Unlock More Growth
          </p>
          <p className="mt-1 text-xs leading-relaxed text-muted">
            Add more leads and boost your platform performance.
          </p>
          <Link href="/admin/leads" onClick={() => setMobileOpen(false)}>
            <Button size="sm" className="mt-4 w-full">
              Add New Lead
            </Button>
          </Link>
        </div>
      </div>
    </>
  );

  const sidebarFooter = (
    <div className="shrink-0 border-t border-border/30 bg-[#0d1b2a]/95 p-5">
      <div className="mb-4 flex items-center gap-3 rounded-xl border border-border/40 bg-background/20 p-3">
        <Avatar name="Admin" size="sm" />
        <div>
          <p className="text-sm font-semibold">Admin</p>
          <p className="text-[10px] text-muted">Super Administrator</p>
        </div>
      </div>
      <button
        type="button"
        onClick={logout}
        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted transition-colors hover:bg-red-500/10 hover:text-red-400"
      >
        <LogOut className="h-4 w-4" />
        Logout
      </button>
    </div>
  );

  return (
    <>
      <button
        type="button"
        className="fixed left-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-xl border border-border/60 bg-card/90 text-muted backdrop-blur-sm lg:hidden"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/70 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden
        />
      )}

      <aside className={cn(sidebarShellClass, "hidden lg:flex")}>
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain pb-4">
          {scrollableContent}
        </div>
        {sidebarFooter}
      </aside>

      <aside
        className={cn(
          sidebarShellClass,
          "transition-transform duration-300 lg:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain pb-4">
          {scrollableContent}
        </div>
        {sidebarFooter}
      </aside>
    </>
  );
}
