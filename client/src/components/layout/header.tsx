import { useLocation, Link } from "wouter";
import { Bell, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

const pageNames: { [key: string]: string } = {
  "/": "Dashboard",
  "/clients": "Clients",
  "/projects": "Projects", 
  "/invoices": "Invoices",
  "/reports": "Reports",
  "/notifications": "Notifications",
  "/profile": "Profile",
};

export default function Header() {
  const [location] = useLocation();
  
  const currentPageName = pageNames[location] || "Page";

  return (
    <header className="bg-white dark:bg-card border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden p-2 text-muted-foreground hover:text-foreground"
          >
            <Menu className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-semibold text-foreground">{currentPageName}</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            className="p-2 text-muted-foreground hover:text-foreground"
            asChild
          >
            <Link href="/notifications">
              <Bell className="w-5 h-5" />
            </Link>
          </Button>

          <Button variant="ghost" className="flex items-center space-x-2" asChild>
            <Link href="/profile">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground text-sm font-medium">JD</span>
              </div>
              <span className="text-sm font-medium text-foreground">John Doe</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
