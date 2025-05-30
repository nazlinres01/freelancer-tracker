import StatsCards from "@/components/dashboard/stats-cards";
import EarningsChart from "@/components/dashboard/earnings-chart";
import TopClients from "@/components/dashboard/top-clients";
import RecentInvoices from "@/components/dashboard/recent-invoices";
import QuickActions from "@/components/dashboard/quick-actions";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <StatsCards />

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EarningsChart />
        <TopClients />
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentInvoices />
        </div>
        <QuickActions />
      </div>
    </div>
  );
}
