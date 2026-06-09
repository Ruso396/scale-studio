"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import PageHeader from "@/components/shared/PageHeader";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import DataTableToolbar from "@/components/shared/DataTableToolbar";
import TablePagination from "@/components/shared/TablePagination";
import EmptyState from "@/components/ui/EmptyState";
import StatusBadge from "@/components/ui/StatusBadge";
import Button from "@/components/ui/Button";
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
import { FolderOpen, Search } from "lucide-react";
import { apiFetch } from "@/utils/api";
import type { PublicLead, UserDocument } from "@/types";

const PAGE_SIZE = 8;

export default function MyLeadsPage() {
  const [leads, setLeads] = useState<PublicLead[]>([]);
  const [profile, setProfile] = useState<UserDocument | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    apiFetch<{ profile: UserDocument; unlockedLeads: PublicLead[] }>(
      "/api/designer/me?include=unlocked"
    )
      .then((res) => {
        setProfile(res.data!.profile);
        setLeads(res.data!.unlockedLeads);
      })
      .catch(() => setLeads([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    if (!search) return leads;
    const q = search.toLowerCase();
    return leads.filter(
      (l) =>
        l.clientName?.toLowerCase().includes(q) ||
        l.city.toLowerCase().includes(q) ||
        l.service.toLowerCase().includes(q)
    );
  }, [leads, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  if (loading) return <LoadingSpinner label="Loading your leads" />;

  return (
    <div className="animate-fade-up space-y-6">
      <PageHeader
        greeting="Your Portfolio"
        title="My Unlocked Leads"
        description="Leads you have permanently unlocked. Contact details remain accessible forever."
        credits={profile?.credits}
        showTopBar={false}
        actions={
          <Link href="/dashboard/leads">
            <Button variant="outline">
              <Search className="h-4 w-4" />
              Browse More
            </Button>
          </Link>
        }
      />

      {leads.length === 0 ? (
        <EmptyState
          icon={FolderOpen}
          title="No unlocked leads yet"
          description="Browse available leads and unlock them using your credits."
        />
      ) : (
        <TableShell>
          <DataTableToolbar
            title="Your Unlocked Leads"
            search={search}
            onSearchChange={(v) => { setSearch(v); setPage(1); }}
            searchPlaceholder="Search leads..."
          />
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead className="hidden sm:table-cell">Phone</TableHead>
                <TableHead>City</TableHead>
                <TableHead className="hidden md:table-cell">Service</TableHead>
                <TableHead>Budget</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginated.map((lead) => (
                <TableRow key={lead._id}>
                  <TableCell>
                    <span className="font-semibold">{lead.clientName}</span>
                    <p className="mt-0.5 text-xs text-muted sm:hidden">
                      {lead.phone}
                    </p>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {lead.phone}
                  </TableCell>
                  <TableCell className="text-muted">{lead.city}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex items-center gap-2">
                      <ServiceIcon service={lead.service} />
                      {lead.service}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium text-accent">{lead.budget}</span>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={lead.status} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            currentPage={page}
            totalPages={totalPages}
            totalItems={filtered.length}
            pageSize={PAGE_SIZE}
            onPageChange={setPage}
          />
        </TableShell>
      )}
    </div>
  );
}
