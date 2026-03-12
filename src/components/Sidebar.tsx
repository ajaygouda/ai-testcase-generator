"use client";

import Link from "next/link";
import { usePathname } from 'next/navigation';
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

const validRoutes = ["/dashboard", "/workflows", "/aiagents", "/testcases"];

export const Sidebar = () => {
  const path = usePathname();
  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard", active: true },
    { icon: FileText, label: "Test Cases", href: "/testcases" },
    { icon: Workflow, label: "Workflows", href: "/workflows" },
    { icon: Bot, label: "AI Agent", href: "/aiagents" },
    { icon: Zap, label: "Jira Integration", href: "/" },
    { icon: Grid3x3, label: "Google Sheets", href: "/" },
    { icon: Activity, label: "Logs", href: "/" },
    { icon: Settings, label: "Settings", href: "/" },
  ];



  return (
    <aside className="w-64 border-r border-border bg-card px-4 py-6">
      <div className="mb-8 flex items-center gap-2">
        <div className="h-8 w-8 rounded-lg bg-primary"></div>
        <span className="text-lg font-semibold text-foreground">
          Vation.ai
        </span>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => (
          <NavItem key={item.label} {...item} path={path} />
        ))}
      </nav>
    </aside>
  );
};

interface NavItemProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  href: string;
  active?: boolean;
  path?: string
}

const NavItem = ({ icon: Icon, label, href, path }: NavItemProps) => {
  const isActive = (href === "/dashboard" && path === "/") || (path?.startsWith(href) && href !== "/");
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${isActive
        ? "bg-background text-foreground"
        : "text-sidebar-foreground hover:bg-background"
        }`}
    >
      <Icon className="h-5 w-5" />
      <span>{label}</span>
    </Link>
  );
};
