import { ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Workflow,
  Bot,
  Zap,
  FileText,
  Grid3x3,
  Activity,
  Settings,
} from "lucide-react";

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-sidebar px-4 py-6">
        <div className="mb-8 flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary"></div>
          <span className="text-lg font-semibold text-foreground">
            Vation.ai
          </span>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-2">
          <NavItem
            icon={LayoutDashboard}
            label="Dashboard"
            href="/"
            active
          />
          <NavItem
            icon={Workflow}
            label="Workflows"
            href="/workflows"
          />
          <NavItem
            icon={Bot}
            label="AI Agent"
            href="/ai-agent"
          />
          <NavItem
            icon={Zap}
            label="Jira Integration"
            href="/jira-integration"
          />
          <NavItem
            icon={FileText}
            label="Test Cases"
            href="/test-cases"
          />
          <NavItem
            icon={Grid3x3}
            label="Google Sheets"
            href="/google-sheets"
          />
          <NavItem
            icon={Activity}
            label="Logs"
            href="/logs"
          />
          <NavItem
            icon={Settings}
            label="Settings"
            href="/settings"
          />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
};

interface NavItemProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  href: string;
  active?: boolean;
}

const NavItem = ({ icon: Icon, label, href, active }: NavItemProps) => {
  return (
    <Link
      to={href}
      className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
        active
          ? "bg-sidebar-accent text-foreground"
          : "text-sidebar-foreground hover:bg-sidebar-accent"
      }`}
    >
      <Icon className="h-5 w-5" />
      <span>{label}</span>
    </Link>
  );
};
