"use client";

import Link from "next/link";
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

export const Sidebar = () => {
  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/", active: true },
    { icon: Workflow, label: "Workflows", href: "/" },
    { icon: Bot, label: "AI Agent", href: "/" },
    { icon: Zap, label: "Jira Integration", href: "/" },
    { icon: FileText, label: "Test Cases", href: "/" },
    { icon: Grid3x3, label: "Google Sheets", href: "/" },
    { icon: Activity, label: "Logs", href: "/" },
    { icon: Settings, label: "Settings", href: "/" },
  ];

  return (
    <aside className="w-64 border-r border-border bg-sidebar px-4 py-6">
      <div className="mb-8 flex items-center gap-2">
        <div className="h-8 w-8 rounded-lg bg-primary"></div>
        <span className="text-lg font-semibold text-foreground">
          Vation.ai
        </span>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => (
          <NavItem key={item.label} {...item} />
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
}

const NavItem = ({ icon: Icon, label, href, active }: NavItemProps) => {
  return (
    <Link
      href={href}
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
