import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { api } from "@/lib/api";

export default function TopClients() {
  const { data: topClients, isLoading } = useQuery({
    queryKey: ["/api/dashboard/top-clients"],
    queryFn: api.dashboard.getTopClients,
  });

  if (isLoading) {
    return (
      <Card className="chart-container">
        <CardHeader>
          <CardTitle>Top Clients by Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center space-x-3 animate-pulse">
                <div className="w-8 h-8 bg-muted rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-muted rounded w-1/2 mb-2"></div>
                  <div className="h-3 bg-muted rounded w-1/4"></div>
                </div>
                <div className="w-20 h-4 bg-muted rounded"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const maxRevenue = Math.max(...(topClients?.map(client => client.revenue) || [1]));

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getGradientColor = (index: number) => {
    const gradients = [
      "bg-gradient-to-r from-blue-500 to-purple-600",
      "bg-gradient-to-r from-green-500 to-teal-600",
      "bg-gradient-to-r from-orange-500 to-red-600",
      "bg-gradient-to-r from-pink-500 to-rose-600",
      "bg-gradient-to-r from-indigo-500 to-blue-600",
    ];
    return gradients[index % gradients.length];
  };

  return (
    <Card className="chart-container">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Top Clients by Revenue</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topClients?.length ? (
            topClients.map((client, index) => (
              <div key={client.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 ${getGradientColor(index)} rounded-full flex items-center justify-center`}>
                    <span className="text-white text-sm font-medium">
                      {getInitials(client.name)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{client.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {client.projectCount} project{client.projectCount !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-foreground">
                    ${client.revenue.toLocaleString()}
                  </p>
                  <div className="w-20 mt-1">
                    <Progress 
                      value={(client.revenue / maxRevenue) * 100} 
                      className="h-2"
                    />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No client data available</p>
              <p className="text-sm text-muted-foreground mt-1">
                Add clients and create invoices to see revenue data
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
