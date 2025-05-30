import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, Users, FileText, Calendar, TrendingUp, Clock } from "lucide-react";
import { api } from "@/lib/api";

export default function StatsCards() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["/api/dashboard/stats"],
    queryFn: api.dashboard.getStats,
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-20 bg-muted rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const statCards = [
    {
      title: "Total Earnings",
      value: `$${stats?.totalEarnings?.toLocaleString() || '0'}`,
      change: "+12.5% from last month",
      icon: DollarSign,
      iconBg: "bg-green-100 dark:bg-green-900/30",
      iconColor: "text-green-600 dark:text-green-400",
      changeColor: "text-green-600",
      changeIcon: TrendingUp,
    },
    {
      title: "Active Clients",
      value: stats?.activeClients?.toString() || '0',
      change: "+3 new this month",
      icon: Users,
      iconBg: "bg-blue-100 dark:bg-blue-900/30",
      iconColor: "text-primary",
      changeColor: "text-primary",
      changeIcon: TrendingUp,
    },
    {
      title: "Pending Invoices",
      value: stats?.pendingInvoices?.toString() || '0',
      change: "$4,200 pending",
      icon: FileText,
      iconBg: "bg-amber-100 dark:bg-amber-900/30",
      iconColor: "text-amber-600 dark:text-amber-400",
      changeColor: "text-amber-600",
      changeIcon: Clock,
    },
    {
      title: "This Month",
      value: `$${stats?.thisMonth?.toLocaleString() || '0'}`,
      change: "15 days remaining",
      icon: Calendar,
      iconBg: "bg-purple-100 dark:bg-purple-900/30",
      iconColor: "text-purple-600 dark:text-purple-400",
      changeColor: "text-muted-foreground",
      changeIcon: Calendar,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        const ChangeIcon = stat.changeIcon;
        
        return (
          <Card key={index} className="stats-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-3xl font-bold text-foreground mt-1">{stat.value}</p>
                  <p className={`text-sm mt-2 flex items-center ${stat.changeColor}`}>
                    <ChangeIcon className="w-4 h-4 mr-1" />
                    {stat.change}
                  </p>
                </div>
                <div className={`w-12 h-12 ${stat.iconBg} rounded-lg flex items-center justify-center`}>
                  <Icon className={`${stat.iconColor} w-6 h-6`} />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
