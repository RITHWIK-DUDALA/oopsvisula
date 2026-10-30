import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home,
  LayoutDashboard,
  BookOpen,
  Eye,
  Terminal,
  Award,
  GitBranch,
  TrendingUp,
  Bookmark,
  Info,
  Settings,
  User,
  Box,
} from 'lucide-react';

interface NavItem {
  name: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
}

const mainNavItems: NavItem[] = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Concepts', path: '/concepts', icon: BookOpen },
  { name: 'Visualizers', path: '/visualizers', icon: Eye },
  { name: 'Playground', path: '/playground', icon: Terminal },
  { name: 'Practice', path: '/practice', icon: Award },
  { name: 'Roadmap', path: '/roadmap', icon: GitBranch },
  { name: 'Progress', path: '/progress', icon: TrendingUp },
  { name: 'Reference', path: '/reference', icon: Bookmark },
];

const secondaryNavItems: NavItem[] = [
  { name: 'About', path: '/about', icon: Info },
  { name: 'Settings', path: '/settings', icon: Settings },
  { name: 'Profile', path: '/profile', icon: User },
];

export const LeftSidebar: React.FC = () => {
  return (
    <aside className="w-64 h-screen bg-surface border-r border-border flex flex-col shrink-0 select-none">
      {/* Brand Header */}
      <div className="h-14 px-5 border-b border-border flex items-center justify-between">
        <NavLink to="/" className="flex items-center space-x-2.5">
          <div className="w-7 h-7 rounded-md bg-foreground flex items-center justify-center text-background">
            <Box className="w-4 h-4 stroke-[2]" />
          </div>
          <span className="font-semibold text-sm tracking-tight text-foreground">
            OOPS LAB
          </span>
        </NavLink>
        <span className="text-[11px] px-2 py-0.5 font-mono text-muted-foreground bg-accent border border-border rounded">
          v0.1
        </span>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        <div>
          <div className="px-3 mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Laboratory
          </div>
          <nav className="space-y-1">
            {mainNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                      isActive
                        ? 'bg-foreground text-background font-medium'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 shrink-0 stroke-[1.5]" />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        <div>
          <div className="px-3 mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Preferences
          </div>
          <nav className="space-y-1">
            {secondaryNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                      isActive
                        ? 'bg-foreground text-background font-medium'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 shrink-0 stroke-[1.5]" />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Footer Info */}
      <div className="p-4 border-t border-border">
        <div className="bg-white border border-border rounded-lg p-3 text-xs text-muted-foreground">
          <div className="flex items-center justify-between mb-1">
            <span className="font-medium text-foreground">Target Engine</span>
            <span className="font-mono text-[10px] bg-accent px-1.5 py-0.5 rounded border border-border text-foreground">Java 21</span>
          </div>
          <p className="text-[11px] leading-snug">
            Deterministic AST & JDI visualization pipeline.
          </p>
        </div>
      </div>
    </aside>
  );
};

