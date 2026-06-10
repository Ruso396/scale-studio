import Sidebar from "@/components/dashboard/Sidebar";
import DashboardShell from "@/components/shared/DashboardShell";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardShell sidebar={<Sidebar />}>{children}</DashboardShell>;
}
