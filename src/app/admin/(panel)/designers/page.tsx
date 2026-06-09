"use client";

import { useEffect, useMemo, useState } from "react";
import PageHeader from "@/components/shared/PageHeader";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import DataTableToolbar from "@/components/shared/DataTableToolbar";
import TablePagination from "@/components/shared/TablePagination";
import RowActions from "@/components/shared/RowActions";
import StatCard from "@/components/ui/StatCard";
import StatusBadge from "@/components/ui/StatusBadge";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import {
  TableShell,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/Table";
import DesignerFormModal from "@/components/admin/DesignerFormModal";
import { Users, UserCheck, UserX, Coins, Plus } from "lucide-react";
import { apiFetch } from "@/utils/api";
import { formatDate } from "@/utils/format";
import { toast } from "sonner";

interface Designer {
  _id: string;
  name: string;
  email: string;
  city: string;
  credits: number;
  status: "active" | "suspended";
  createdAt: string;
}

const PAGE_SIZE = 8;

export default function AdminDesignersPage() {
  const [designers, setDesigners] = useState<Designer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "suspended">("all");
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchDesigners = async () => {
    try {
      const res = await apiFetch<Designer[]>("/api/admin/designers");
      setDesigners(res.data ?? []);
    } catch {
      setDesigners([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDesigners();
  }, []);

  const stats = useMemo(() => {
    const active = designers.filter((d) => d.status === "active").length;
    const suspended = designers.filter((d) => d.status === "suspended").length;
    const credits = designers.reduce((s, d) => s + d.credits, 0);
    return { total: designers.length, active, suspended, credits };
  }, [designers]);

  const filtered = useMemo(() => {
    return designers.filter((d) => {
      const matchSearch =
        !search ||
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.email.toLowerCase().includes(search.toLowerCase()) ||
        d.city.toLowerCase().includes(search.toLowerCase());
      const matchStatus =
        statusFilter === "all" || d.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [designers, search, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const toggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "active" ? "suspended" : "active";
    try {
      await apiFetch(`/api/admin/designers/${id}`, {
        method: "PUT",
        body: JSON.stringify({ status: newStatus }),
      });
      toast.success(
        `Designer ${newStatus === "active" ? "activated" : "suspended"}`
      );
      fetchDesigners();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Update failed");
    }
  };

  const handleExport = () => {
    const headers = ["Name", "Email", "City", "Credits", "Status", "Joined"];
    const rows = filtered.map((d) =>
      [d.name, d.email, d.city, d.credits, d.status, formatDate(d.createdAt)].join(",")
    );
    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "designers.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const cycleFilter = () => {
    setStatusFilter((prev) =>
      prev === "all" ? "active" : prev === "active" ? "suspended" : "all"
    );
    setPage(1);
  };

  if (loading) return <LoadingSpinner label="Loading designers" />;

  return (
    <div className="animate-fade-up space-y-6">
      <PageHeader
        greeting="Welcome back, Admin 👋"
        title="Manage Designers"
        description="View, activate or suspend registered interior designers on the platform."
        actions={
          <Button variant="premium" size="md" onClick={() => setModalOpen(true)}>
            <Plus className="h-4 w-4" />
            Add Designer
          </Button>
        }
      />

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Designers"
          value={stats.total}
          icon={Users}
          iconColor="gold"
          trend="↑ 12% from last month"
        />
        <StatCard
          title="Active Designers"
          value={stats.active}
          icon={UserCheck}
          iconColor="green"
          trend="↑ 15% from last month"
        />
        <StatCard
          title="Suspended Designers"
          value={stats.suspended}
          icon={UserX}
          iconColor="orange"
          trend="↓ 5% from last month"
          trendUp={false}
        />
        <StatCard
          title="Credits Distributed"
          value={stats.credits.toLocaleString()}
          icon={Coins}
          iconColor="purple"
          trend="↑ 18% from last month"
        />
      </div>

      <TableShell>
        <DataTableToolbar
          title="All Registered Designers"
          search={search}
          onSearchChange={(v) => { setSearch(v); setPage(1); }}
          searchPlaceholder="Search designers..."
          onFilterClick={cycleFilter}
          onExportClick={handleExport}
        />

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Avatar</TableHead>
              <TableHead className="min-w-[140px]">Name</TableHead>
              <TableHead className="hidden md:table-cell">Email</TableHead>
              <TableHead>City</TableHead>
              <TableHead>Credits</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden sm:table-cell">Joined</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginated.map((designer) => (
              <TableRow key={designer._id}>
                <TableCell>
                  <Avatar name={designer.name} size="sm" />
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  <span className="font-semibold">{designer.name}</span>
                </TableCell>
                <TableCell className="hidden text-muted md:table-cell">
                  {designer.email}
                </TableCell>
                <TableCell className="text-muted">{designer.city}</TableCell>
                <TableCell>
                  <span className="font-semibold text-accent">
                    {designer.credits}
                  </span>
                </TableCell>
                <TableCell>
                  <StatusBadge status={designer.status} />
                </TableCell>
                <TableCell className="hidden text-muted sm:table-cell">
                  {formatDate(designer.createdAt)}
                </TableCell>
                <TableCell>
                  <RowActions
                    actions={[
                      {
                        label:
                          designer.status === "active"
                            ? "Suspend"
                            : "Activate",
                        onClick: () =>
                          toggleStatus(designer._id, designer.status),
                        variant:
                          designer.status === "active" ? "danger" : "default",
                      },
                    ]}
                  />
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

      <DesignerFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={fetchDesigners}
      />
    </div>
  );
}
