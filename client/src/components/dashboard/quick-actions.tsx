import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, UserPlus, Briefcase, Download, ChevronRight } from "lucide-react";
import { Link } from "wouter";

const quickActions = [
  {
    title: "Create Invoice",
    href: "/invoices",
    icon: Plus,
    iconBg: "bg-primary",
    iconColor: "text-primary-foreground",
  },
  {
    title: "Add Client",
    href: "/clients",
    icon: UserPlus,
    iconBg: "bg-green-600",
    iconColor: "text-white",
  },
  {
    title: "New Project",
    href: "/projects",
    icon: Briefcase,
    iconBg: "bg-purple-600",
    iconColor: "text-white",
  },
  {
    title: "Export Report",
    href: "/reports",
    icon: Download,
    iconBg: "bg-amber-600",
    iconColor: "text-white",
  },
];

export default function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            
            return (
              <Link key={index} href={action.href}>
                <Button
                  variant="outline"
                  className="quick-action-btn"
                  asChild
                >
                  <div>
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 ${action.iconBg} rounded-lg flex items-center justify-center`}>
                        <Icon className={`${action.iconColor} w-4 h-4`} />
                      </div>
                      <span className="text-sm font-medium">{action.title}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                </Button>
              </Link>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
