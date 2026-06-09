"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PageHeader from "@/components/shared/PageHeader";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import StatCard from "@/components/ui/StatCard";
import Button from "@/components/ui/Button";
import LeadCard from "@/components/dashboard/LeadCard";
import {
  Search,
  FolderOpen,
  Coins,
  MapPin,
  ArrowRight,
  Sparkles,
  Zap,
} from "lucide-react";
import { apiFetch } from "@/utils/api";
import type { DesignerStats, PublicLead, UserDocument } from "@/types";

export default function DashboardPage() {
  const [profile, setProfile] = useState<UserDocument | null>(null);
  const [stats, setStats] = useState<DesignerStats | null>(null);
  const [previewLeads, setPreviewLeads] = useState<PublicLead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      apiFetch<{ profile: UserDocument; stats: DesignerStats }>(
        "/api/designer/me?include=stats"
      ),
      apiFetch<PublicLead[]>("/api/leads"),
    ])
      .then(([profileRes, leadsRes]) => {
        setProfile(profileRes.data!.profile);
        setStats(profileRes.data!.stats);
        setPreviewLeads((leadsRes.data ?? []).slice(0, 3));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner label="Loading dashboard" />;

  const firstName = profile?.name.split(" ")[0] ?? "Designer";

  return (
    <div className="animate-fade-up space-y-6">
      <PageHeader
        greeting={`Welcome back, ${firstName} 👋`}
        title="Your Design Studio"
        description="Browse verified leads, unlock premium clients, and grow your interior design business across India's top cities."
        credits={profile?.credits}
        actions={
          <>
            <Link href="/dashboard/leads">
              <Button variant="premium">
                <Search className="h-4 w-4" />
                Browse Leads
              </Button>
            </Link>
            <Link href="/dashboard/my-leads">
              <Button variant="outline">
                <FolderOpen className="h-4 w-4" />
                My Leads
              </Button>
            </Link>
          </>
        }
      />

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Available Leads"
          value={stats?.availableLeads ?? 0}
          icon={Search}
          iconColor="gold"
          trend="↑ 18% this week"
        />
        <StatCard
          title="Unlocked Leads"
          value={stats?.unlockedLeads ?? 0}
          icon={FolderOpen}
          iconColor="green"
          trend="+2 new unlocks"
        />
        <StatCard
          title="Credits Balance"
          value={stats?.creditsLeft ?? 0}
          icon={Coins}
          iconColor="purple"
          trend={stats?.creditsLeft ? "Ready to unlock" : "Top up needed"}
          trendUp={!!stats?.creditsLeft}
        />
        <StatCard
          title="Active Cities"
          value={stats?.cities ?? 0}
          icon={MapPin}
          iconColor="blue"
          trend="Pan-India reach"
        />
      </div>

      <div className="grid gap-5 lg:grid-cols-5">
        <div className="glass-card relative overflow-hidden rounded-2xl p-8 lg:col-span-2">
          <div className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-accent/10 blur-2xl" />
          <div className="relative">
            <div className="flex items-center gap-2 text-accent">
              <Zap className="h-5 w-5" />
              <span className="text-[10px] font-bold uppercase tracking-widest">
                Quick Start
              </span>
            </div>
            <h2 className="mt-4 font-display text-2xl font-bold">
              Land your next premium client
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Every lead is manually verified with confirmed budget and scope.
              Unlock for 1 credit — permanent access.
            </p>
            <Link href="/dashboard/leads" className="mt-6 inline-block">
              <Button variant="premium" size="lg">
                Explore Leads
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="credit-wallet pulse-glow rounded-2xl p-8 lg:col-span-3">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-accent" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-accent">
                  Credit Wallet
                </span>
              </div>
              <p className="mt-3 font-display text-5xl font-bold text-accent">
                {profile?.credits ?? 0}
              </p>
              <p className="mt-1 text-sm text-muted">credits available</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-border/40 bg-background/30 p-5 text-center">
                <p className="font-display text-3xl font-bold">
                  {stats?.unlockedLeads ?? 0}
                </p>
                <p className="mt-1 text-[10px] uppercase tracking-wider text-muted">
                  Unlocked
                </p>
              </div>
              <div className="rounded-xl border border-border/40 bg-background/30 p-5 text-center">
                <p className="font-display text-3xl font-bold">
                  {stats?.availableLeads ?? 0}
                </p>
                <p className="mt-1 text-[10px] uppercase tracking-wider text-muted">
                  Available
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {previewLeads.length > 0 && (
        <section>
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="font-display text-xl font-semibold">
                Latest Verified Leads
              </h2>
              <p className="mt-1 text-sm text-muted">
                Fresh opportunities awaiting unlock
              </p>
            </div>
            <Link href="/dashboard/leads">
              <Button variant="ghost" size="sm">
                View all <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {previewLeads.map((lead) => (
              <LeadCard key={lead._id} lead={lead} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
