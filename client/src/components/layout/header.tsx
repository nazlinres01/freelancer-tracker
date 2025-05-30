import { useLocation } from "wouter";
import { Bell, Search, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const pageNames: { [key: string]: string } = {
  "/": "Dashboard",
  "/clients": "Clients",
  "/projects": "Projects", 
  "/invoices": "Invoices",
  "/reports": "Reports",
};

export default function Header() {
  const [location] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  
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
          <div className="relative">
            <Input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 pr-10"
            />
            <Search className="absolute right-3 top-2.5 w-4 h-4 text-muted-foreground" />
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            className="p-2 text-muted-foreground hover:text-foreground"
          >
            <Bell className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
