import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText } from "lucide-react";
import { api } from "@/lib/api";
import { Link } from "wouter";
import type { InvoiceWithProject } from "@shared/schema";

const getStatusVariant = (status: string) => {
  switch (status) {
    case "paid":
      return "default";
    case "pending":
      return "secondary";
    case "overdue":
      return "destructive";
    default:
      return "outline";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "paid":
      return "status-paid";
    case "pending":
      return "status-pending";
    case "overdue":
      return "status-overdue";
    default:
      return "";
  }
};

export default function RecentInvoices() {
  const { data: allInvoices, isLoading } = useQuery({
    queryKey: ["/api/invoices"],
    queryFn: api.invoices.getAll,
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center space-x-4 animate-pulse">
                <div className="w-8 h-8 bg-muted rounded-lg"></div>
                <div className="flex-1">
                  <div className="h-4 bg-muted rounded w-1/4 mb-2"></div>
                  <div className="h-3 bg-muted rounded w-1/6"></div>
                </div>
                <div className="w-16 h-6 bg-muted rounded"></div>
                <div className="w-20 h-4 bg-muted rounded"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Get the most recent 5 invoices
  const recentInvoices = allInvoices?.slice(0, 5) || [];

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Recent Invoices</CardTitle>
          <Link href="/invoices">
            <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
              View all
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        {recentInvoices.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider py-3">
                    Invoice
                  </th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider py-3">
                    Client
                  </th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider py-3">
                    Amount
                  </th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider py-3">
                    Status
                  </th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider py-3">
                    Due Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {recentInvoices.map((invoice: InvoiceWithProject) => (
                  <tr key={invoice.id} className="hover:bg-accent transition-colors">
                    <td className="py-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center mr-3">
                          <FileText className="text-muted-foreground w-4 h-4" />
                        </div>
                        <span className="text-sm font-medium text-foreground">
                          {invoice.invoiceNumber}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 text-sm text-foreground">
                      {invoice.client?.name || 'Unknown Client'}
                    </td>
                    <td className="py-4 text-sm font-semibold text-foreground">
                      ${parseFloat(invoice.amount).toLocaleString()}
                    </td>
                    <td className="py-4">
                      <span className={`status-badge ${getStatusColor(invoice.status)}`}>
                        {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 text-sm text-muted-foreground">
                      {formatDate(invoice.dueDate)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8">
            <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-foreground font-medium">No invoices yet</p>
            <p className="text-sm text-muted-foreground mt-1">
              Create your first invoice to start tracking payments
            </p>
            <Link href="/invoices">
              <Button className="mt-4">Create Invoice</Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
