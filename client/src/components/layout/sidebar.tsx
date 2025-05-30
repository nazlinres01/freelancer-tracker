import { Link, useLocation } from "wouter";
import { Home, Users, Briefcase, FileText, BarChart3, ChartLine } from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Clients", href: "/clients", icon: Users },
  { name: "Projects", href: "/projects", icon: Briefcase },
  { name: "Invoices", href: "/invoices", icon: FileText },
  { name: "Reports", href: "/reports", icon: BarChart3 },
];

export default function Sidebar() {
  const [location] = useLocation();

  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64 bg-white dark:bg-card border-r border-border">
        {/* Logo */}
        <div className="flex items-center justify-center h-16 px-4 border-b border-border">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <ChartLine className="text-primary-foreground w-4 h-4" />
            </div>
            <span className="text-xl font-bold text-foreground">FreelancerDash</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navigation.map((item) => {
            const isActive = location === item.href;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`nav-link ${isActive ? 'nav-link-active' : 'nav-link-inactive'}`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="flex items-center px-4 py-4 border-t border-border">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <span className="text-primary-foreground text-sm font-medium">JD</span>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-foreground">John Doe</p>
            <p className="text-xs text-muted-foreground">Freelancer</p>
          </div>
        </div>
      </div>
    </div>
  );
}
