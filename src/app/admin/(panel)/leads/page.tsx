"use client";

import { useEffect, useMemo, useState } from "react";
import PageHeader from "@/components/shared/PageHeader";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import DataTableToolbar from "@/components/shared/DataTableToolbar";
import TablePagination from "@/components/shared/TablePagination";
import RowActions from "@/components/shared/RowActions";
import ServiceIcon from "@/components/shared/ServiceIcon";
import Button from "@/components/ui/Button";
import StatusBadge from "@/components/ui/StatusBadge";
import LeadFormModal from "@/components/admin/LeadFormModal";
import {
  TableShell,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/Table";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { apiFetch } from "@/utils/api";
import { formatDate } from "@/utils/format";
import { toast } from "sonner";
import type { PublicLead } from "@/types";

type AdminLead = PublicLead & { clientName: string; phone: string };

const PAGE_SIZE = 10;

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<AdminLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editLead, setEditLead] = useState<AdminLead | undefined>();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const fetchLeads = async () => {
    try {
      const res = await apiFetch<AdminLead[]>("/api/leads");
      setLeads(res.data ?? []);
    } catch {
      setLeads([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const filtered = useMemo(() => {
    if (!search) return leads;
    const q = search.toLowerCase();
    return leads.filter(
      (l) =>
        l.clientName.toLowerCase().includes(q) ||
        l.city.toLowerCase().includes(q) ||
        l.service.toLowerCase().includes(q)
    );
  }, [leads, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this lead?")) return;
    try {
      await apiFetch(`/api/leads/${id}`, { method: "DELETE" });
      toast.success("Lead deleted");
      fetchLeads();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Delete failed");
    }
  };

  const handleExport = () => {
    const headers = ["Client", "City", "Service", "BHK", "Budget", "Status"];
    const rows = filtered.map((l) =>
      [l.clientName, l.city, l.service, l.bhk, l.budget, l.status].join(",")
    );
    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "leads.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) return <LoadingSpinner label="Loading leads" />;

  return (
    <div className="animate-fade-up space-y-6">
      <PageHeader
        greeting="Welcome back, Admin 👋"
        title="Manage Leads"
        description="Add, edit and publish verified interior design leads to the platform."
        showTopBar={false}
        actions={
          <Button
            variant="premium"
            onClick={() => { setEditLead(undefined); setModalOpen(true); }}
          >
            <Plus className="h-4 w-4" />
            Add New Lead
          </Button>
        }
      />

      <TableShell>
        <DataTableToolbar
          title="All Client Leads"
          search={search}
          onSearchChange={(v) => { setSearch(v); setPage(1); }}
          searchPlaceholder="Search leads..."
          onExportClick={handleExport}
        />

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Client</TableHead>
              <TableHead>City</TableHead>
              <TableHead>Service</TableHead>
              <TableHead className="hidden sm:table-cell">BHK</TableHead>
              <TableHead>Budget</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginated.map((lead) => (
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
                <TableCell className="hidden sm:table-cell">{lead.bhk}</TableCell>
                <TableCell>
                  <span className="font-medium text-accent">{lead.budget}</span>
                </TableCell>
                <TableCell>
                  <StatusBadge status={lead.status} />
                </TableCell>
                <TableCell className="hidden text-muted md:table-cell">
                  {formatDate(lead.createdAt)}
                </TableCell>
                <TableCell>
                  <RowActions
                    actions={[
                      {
                        label: "Edit",
                        icon: Pencil,
                        onClick: () => {
                          setEditLead(lead);
                          setModalOpen(true);
                        },
                      },
                      {
                        label: "Delete",
                        icon: Trash2,
                        onClick: () => handleDelete(lead._id),
                        variant: "danger",
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

      <LeadFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={fetchLeads}
        editLead={editLead}
      />
    </div>
  );
}
