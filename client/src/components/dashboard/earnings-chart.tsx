import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";
import { api } from "@/lib/api";

export default function EarningsChart() {
  const { data: monthlyEarnings, isLoading } = useQuery({
    queryKey: ["/api/dashboard/monthly-earnings"],
    queryFn: api.dashboard.getMonthlyEarnings,
  });

  if (isLoading) {
    return (
      <Card className="chart-container">
        <CardHeader>
          <CardTitle>Monthly Earnings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] animate-pulse bg-muted rounded"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="chart-container">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Monthly Earnings</CardTitle>
          <div className="flex space-x-2">
            <Button size="sm" variant="default" className="text-xs">
              6M
            </Button>
            <Button size="sm" variant="ghost" className="text-xs text-muted-foreground">
              1Y
            </Button>
          </div>
        </div>
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
                formatter={(value) => [`$${value}`, "Earnings"]}
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
  );
}
