interface DashboardShellProps {
  sidebar: React.ReactNode;
  children: React.ReactNode;
}

export default function DashboardShell({ sidebar, children }: DashboardShellProps) {
  return (
    <div className="dashboard-shell">
      <div className="dashboard-sidebar-spacer" aria-hidden />
      {sidebar}
      <div className="dashboard-main">
        <div className="dashboard-bg pointer-events-none" aria-hidden />
        <main className="dashboard-content">{children}</main>
      </div>
    </div>
  );
}
