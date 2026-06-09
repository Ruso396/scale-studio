"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PageHeader from "@/components/shared/PageHeader";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import StatCard from "@/components/ui/StatCard";
import StatusBadge from "@/components/ui/StatusBadge";
import Button from "@/components/ui/Button";
import TopDesignerCard from "@/components/admin/TopDesignerCard";
import ServiceIcon from "@/components/shared/ServiceIcon";
import {
  TableShell,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/Table";
import {
  FileText,
  TrendingUp,
  ShoppingBag,
  Users,
  Plus,
  UserCog,
} from "lucide-react";
import { apiFetch } from "@/utils/api";
import { formatDate } from "@/utils/format";
import type { AdminStats, TopDesigner } from "@/types";

interface AdminPageData {
  stats: AdminStats;
  recentLeads: Array<{
    _id: string;
    clientName: string;
    city: string;
    service: string;
    budget: string;
    status: string;
    createdAt: string;
  }>;
  topDesigners: TopDesigner[];
}

export default function AdminOverviewPage() {
  const [data, setData] = useState<AdminPageData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch<AdminPageData>("/api/admin/stats")
      .then((res) => setData(res.data ?? null))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner label="Loading admin dashboard" />;

  return (
    <div className="animate-fade-up space-y-6">
      <PageHeader
        greeting="Welcome back, Admin 👋"
        title="Platform Command Center"
        description="Manage leads, designers and platform growth from a single premium dashboard."
        actions={
          <>
            <Link href="/admin/leads">
              <Button variant="premium">
                <Plus className="h-4 w-4" />
                Add Lead
              </Button>
            </Link>
            <Link href="/admin/designers">
              <Button variant="outline">
                <UserCog className="h-4 w-4" />
                Manage Designers
              </Button>
            </Link>
          </>
        }
      />

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Leads"
          value={data?.stats.totalLeads ?? 0}
          icon={FileText}
          iconColor="gold"
          trend="↑ 24% this month"
        />
        <StatCard
          title="Published Today"
          value={data?.stats.publishedToday ?? 0}
          icon={TrendingUp}
          iconColor="green"
          trend="Live pipeline"
        />
        <StatCard
          title="Total Sold"
          value={data?.stats.totalSold ?? 0}
          icon={ShoppingBag}
          iconColor="orange"
          trend="↑ 8% conversion"
        />
        <StatCard
          title="Active Designers"
          value={data?.stats.activeDesigners ?? 0}
          icon={Users}
          iconColor="purple"
          trend="↑ 12% growth"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-display text-xl font-semibold tracking-tight">
              Recent Leads
            </h2>
            <Link href="/admin/leads">
              <Button variant="ghost" size="sm">View all</Button>
            </Link>
          </div>

          <TableShell>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Budget</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">Added</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(data?.recentLeads ?? []).map((lead) => (
                  <TableRow key={lead._id}>
                    <TableCell>
                      <span className="font-semibold">{lead.clientName}</span>
                    </TableCell>
                    <TableCell className="text-muted">{lead.city}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <ServiceIcon service={lead.service} />
                        <span className="hidden sm:inline">{lead.service}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium text-accent">{lead.budget}</span>
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={lead.status} />
                    </TableCell>
                    <TableCell className="hidden text-muted md:table-cell">
                      {formatDate(lead.createdAt)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableShell>
        </div>

        <div>
          <h2 className="mb-5 font-display text-xl font-semibold tracking-tight">
            Top Designers
          </h2>
          <p className="-mt-3 mb-4 text-sm text-muted">
            Highest performing designers by unlock count
          </p>
          {(data?.topDesigners ?? []).length > 0 ? (
            <div className="space-y-2.5">
              {data!.topDesigners.map((designer, index) => (
                <TopDesignerCard
                  key={designer._id}
                  rank={index + 1}
                  name={designer.name}
                  city={designer.city}
                  unlockCount={designer.unlockCount}
                  credits={designer.credits}
                  status={designer.status}
                />
              ))}
            </div>
          ) : (
            <div className="top-designer-card rounded-2xl p-6 text-center">
              <Users className="mx-auto h-8 w-8 text-muted/60" />
              <p className="mt-3 text-sm font-semibold">No designers yet</p>
              <p className="mt-1 text-xs leading-relaxed text-muted">
                Rankings are generated live from unlock activity. Add designers
                or wait for registrations to see the leaderboard.
              </p>
              <Link href="/admin/designers" className="mt-4 inline-block">
                <Button variant="outline" size="sm">
                  <UserCog className="h-3.5 w-3.5" />
                  Manage Designers
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
