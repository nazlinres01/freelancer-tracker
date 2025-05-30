import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, Check, Clock, DollarSign, FileText, Users } from "lucide-react";

interface Notification {
  id: number;
  type: "payment" | "invoice" | "client" | "reminder";
  title: string;
  message: string;
  time: string;
  isRead: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: 1,
    type: "payment",
    title: "Payment Received",
    message: "Payment of $2,500 received from TechCorp",
    time: "2 hours ago",
    isRead: false,
  },
  {
    id: 2,
    type: "invoice",
    title: "Invoice Overdue",
    message: "Invoice INV-001 is 5 days overdue",
    time: "1 day ago",
    isRead: false,
  },
  {
    id: 3,
    type: "client",
    title: "New Client Added",
    message: "StartupXYZ has been added to your client list",
    time: "2 days ago",
    isRead: true,
  },
  {
    id: 4,
    type: "reminder",
    title: "Project Deadline",
    message: "Website redesign project due in 3 days",
    time: "3 days ago",
    isRead: true,
  },
];

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "payment":
      return <DollarSign className="w-5 h-5 text-green-600" />;
    case "invoice":
      return <FileText className="w-5 h-5 text-orange-600" />;
    case "client":
      return <Users className="w-5 h-5 text-blue-600" />;
    case "reminder":
      return <Clock className="w-5 h-5 text-purple-600" />;
    default:
      return <Bell className="w-5 h-5 text-gray-600" />;
  }
};

const getNotificationBadge = (type: string) => {
  switch (type) {
    case "payment":
      return <Badge className="bg-green-100 text-green-700">Payment</Badge>;
    case "invoice":
      return <Badge className="bg-orange-100 text-orange-700">Invoice</Badge>;
    case "client":
      return <Badge className="bg-blue-100 text-blue-700">Client</Badge>;
    case "reminder":
      return <Badge className="bg-purple-100 text-purple-700">Reminder</Badge>;
    default:
      return <Badge>Unknown</Badge>;
  }
};

export default function Notifications() {
  const unreadCount = mockNotifications.filter(n => !n.isRead).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Notifications</h1>
          <p className="text-muted-foreground">
            You have {unreadCount} unread notifications
          </p>
        </div>
        <Button variant="outline" size="sm">
          <Check className="w-4 h-4 mr-2" />
          Mark All Read
        </Button>
      </div>

      <div className="space-y-4">
        {mockNotifications.map((notification) => (
          <Card key={notification.id} className={`${!notification.isRead ? 'border-primary/20 bg-primary/5' : ''}`}>
            <CardContent className="p-4">
              <div className="flex items-start space-x-4">
                <div className="mt-1">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-foreground">{notification.title}</h3>
                    <div className="flex items-center space-x-2">
                      {getNotificationBadge(notification.type)}
                      {!notification.isRead && (
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{notification.message}</p>
                  <p className="text-xs text-muted-foreground">{notification.time}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {mockNotifications.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Bell className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No notifications</h3>
            <p className="text-muted-foreground text-center">
              You're all caught up! We'll notify you when something new happens.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}