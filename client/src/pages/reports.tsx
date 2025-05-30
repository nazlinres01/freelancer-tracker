import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  Download, 
  Calendar, 
  DollarSign, 
  Users, 
  FileText, 
  TrendingUp, 
  TrendingDown,
  BarChart3,
  PieChart
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, BarChart, Bar, PieChart as RechartsPieChart, Cell } from "recharts";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

export default function Reports() {
  const [dateRange, setDateRange] = useState("6m");
  const [reportType, setReportType] = useState("earnings");
  const { toast } = useToast();

  const { data: stats } = useQuery({
    queryKey: ["/api/dashboard/stats"],
    queryFn: api.dashboard.getStats,
  });

  const { data: monthlyEarnings } = useQuery({
    queryKey: ["/api/dashboard/monthly-earnings"],
    queryFn: api.dashboard.getMonthlyEarnings,
  });

  const { data: topClients } = useQuery({
    queryKey: ["/api/dashboard/top-clients"],
    queryFn: api.dashboard.getTopClients,
  });

  const { data: invoices } = useQuery({
    queryKey: ["/api/invoices"],
    queryFn: api.invoices.getAll,
  });

  const { data: projects } = useQuery({
    queryKey: ["/api/projects"],
    queryFn: api.projects.getAll,
  });

  const { data: clients } = useQuery({
    queryKey: ["/api/clients"],
    queryFn: api.clients.getAll,
  });

  const handleExportReport = (format: 'csv' | 'pdf') => {
    // In a real implementation, this would generate and download the report
    toast({
      title: "Export Started",
      description: `Generating ${format.toUpperCase()} report...`,
    });
    
    // Mock export functionality
    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: `Report has been downloaded as ${format.toUpperCase()}`,
      });
    }, 2000);
  };

  // Calculate revenue trend
  const calculateRevenueTrend = () => {
    if (!monthlyEarnings || monthlyEarnings.length < 2) return 0;
    const current = monthlyEarnings[monthlyEarnings.length - 1]?.earnings || 0;
    const previous = monthlyEarnings[monthlyEarnings.length - 2]?.earnings || 0;
    if (previous === 0) return 0;
    return ((current - previous) / previous) * 100;
  };

  // Calculate project status distribution
  const getProjectStatusData = () => {
    if (!projects) return [];
    
    const statusCounts = projects.reduce((acc, project) => {
      acc[project.status] = (acc[project.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const colors = {
      active: "#10B981",
      completed: "#2563EB", 
      paused: "#F59E0B"
    };

    return Object.entries(statusCounts).map(([status, count]) => ({
      name: status.charAt(0).toUpperCase() + status.slice(1),
      value: count,
      color: colors[status as keyof typeof colors] || "#6B7280"
    }));
  };

  // Calculate payment status data
  const getPaymentStatusData = () => {
    if (!invoices) return [];
    
    const statusTotals = invoices.reduce((acc, invoice) => {
      const amount = parseFloat(invoice.amount);
      acc[invoice.status] = (acc[invoice.status] || 0) + amount;
      return acc;
    }, {} as Record<string, number>);

    const colors = {
      paid: "#10B981",
      pending: "#F59E0B",
      overdue: "#EF4444"
    };

    return Object.entries(statusTotals).map(([status, total]) => ({
      name: status.charAt(0).toUpperCase() + status.slice(1),
      value: total,
      color: colors[status as keyof typeof colors] || "#6B7280"
    }));
  };

  const revenueTrend = calculateRevenueTrend();
  const projectStatusData = getProjectStatusData();
  const paymentStatusData = getPaymentStatusData();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Reports & Analytics</h2>
          <p className="text-muted-foreground">Comprehensive business insights and performance metrics</p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1m">1 Month</SelectItem>
              <SelectItem value="3m">3 Months</SelectItem>
              <SelectItem value="6m">6 Months</SelectItem>
              <SelectItem value="1y">1 Year</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            variant="outline" 
            onClick={() => handleExportReport('csv')}
          >
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
          <Button onClick={() => handleExportReport('pdf')}>
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="stats-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                <p className="text-3xl font-bold text-foreground">
                  {formatCurrency(stats?.totalEarnings || 0)}
                </p>
                <p className={`text-sm mt-2 flex items-center ${revenueTrend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {revenueTrend >= 0 ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                  {Math.abs(revenueTrend).toFixed(1)}% vs last month
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <DollarSign className="text-green-600 w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="stats-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Clients</p>
                <p className="text-3xl font-bold text-foreground">{clients?.length || 0}</p>
                <p className="text-sm text-primary mt-2 flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  {stats?.activeClients || 0} active
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <Users className="text-primary w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="stats-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Projects</p>
                <p className="text-3xl font-bold text-foreground">{projects?.length || 0}</p>
                <p className="text-sm text-muted-foreground mt-2 flex items-center">
                  <BarChart3 className="w-4 h-4 mr-1" />
                  {projects?.filter(p => p.status === 'active').length || 0} active
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                <BarChart3 className="text-purple-600 w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="stats-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Invoices</p>
                <p className="text-3xl font-bold text-foreground">{invoices?.length || 0}</p>
                <p className="text-sm text-amber-600 mt-2 flex items-center">
                  <FileText className="w-4 h-4 mr-1" />
                  {stats?.pendingInvoices || 0} pending
                </p>
              </div>
              <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center">
                <FileText className="text-amber-600 w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <Card className="chart-container">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyEarnings}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis 
                    dataKey="month" 
                    className="text-muted-foreground"
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis 
                    className="text-muted-foreground"
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip
                    formatter={(value) => [`$${value}`, "Revenue"]}
                    labelStyle={{ color: "hsl(var(--foreground))" }}
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="earnings"
                    stroke="hsl(var(--primary))"
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 6 }}
                    activeDot={{ r: 8, stroke: "hsl(var(--primary))", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Project Status Distribution */}
        <Card className="chart-container">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Project Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              {projectStatusData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Tooltip
                      formatter={(value, name) => [`${value} projects`, name]}
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <RechartsPieChart data={projectStatusData} cx="50%" cy="50%" outerRadius={80}>
                      {projectStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </RechartsPieChart>
                  </RechartsPieChart>
                </ResponsiveContainer>
              ) : (
                <div className="text-center">
                  <PieChart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No project data available</p>
                </div>
              )}
            </div>
            {projectStatusData.length > 0 && (
              <div className="flex justify-center space-x-4 mt-4">
                {projectStatusData.map((entry, index) => (
                  <div key={index} className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2" 
                      style={{ backgroundColor: entry.color }}
                    ></div>
                    <span className="text-sm text-muted-foreground">
                      {entry.name} ({entry.value})
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Revenue by Client */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Revenue by Client</CardTitle>
        </CardHeader>
        <CardContent>
          {topClients && topClients.length > 0 ? (
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topClients}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis 
                    dataKey="name" 
                    className="text-muted-foreground"
                    tick={{ fontSize: 12 }}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis 
                    className="text-muted-foreground"
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip
                    formatter={(value) => [`$${value}`, "Revenue"]}
                    labelStyle={{ color: "hsl(var(--foreground))" }}
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="text-center py-12">
              <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No revenue data available</p>
              <p className="text-sm text-muted-foreground mt-1">
                Create invoices and mark them as paid to see revenue analytics
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Payment Status Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Payment Status Summary</CardTitle>
          </CardHeader>
          <CardContent>
            {paymentStatusData.length > 0 ? (
              <div className="space-y-4">
                {paymentStatusData.map((status, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: status.color }}
                      ></div>
                      <span className="font-medium text-foreground">{status.name}</span>
                    </div>
                    <span className="text-lg font-bold text-foreground">
                      {formatCurrency(status.value)}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <DollarSign className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No payment data available</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Activity Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {invoices && invoices.length > 0 ? (
              <div className="space-y-3">
                {invoices.slice(0, 5).map((invoice) => (
                  <div key={invoice.id} className="flex items-center justify-between p-3 bg-accent rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                        <FileText className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {invoice.invoiceNumber}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {invoice.client?.name}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-foreground">
                        {formatCurrency(parseFloat(invoice.amount))}
                      </p>
                      <Badge 
                        className={`text-xs ${
                          invoice.status === 'paid' ? 'status-paid' :
                          invoice.status === 'pending' ? 'status-pending' :
                          'status-overdue'
                        }`}
                      >
                        {invoice.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No recent activity</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
