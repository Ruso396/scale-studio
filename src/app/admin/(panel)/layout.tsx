import AdminSidebar from "@/components/admin/AdminSidebar";
import DashboardShell from "@/components/shared/DashboardShell";

export default function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardShell sidebar={<AdminSidebar />}>{children}</DashboardShell>
  );
}
