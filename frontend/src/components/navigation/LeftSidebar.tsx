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
  PanelLeftClose,
  PanelLeft,
  X,
} from 'lucide-react';
import { useShellStore } from '@/app/store/shellStore';
import { useAuthStore } from '@/services/storage/authStore';

interface NavItem {
  name: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const LeftSidebar: React.FC = () => {
  const {
    isSidebarCollapsed,
    isMobileDrawerOpen,
    toggleSidebarCollapse,
    setMobileDrawer,
  } = useShellStore();

  const { isAuthenticated } = useAuthStore();

  const mainNavItems: NavItem[] = isAuthenticated
    ? [
        { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { name: 'Playground', path: '/playground', icon: Terminal },
        { name: 'Visualizers', path: '/visualizers', icon: Eye },
        { name: 'Concepts', path: '/concepts', icon: BookOpen },
        { name: 'Practice', path: '/practice', icon: Award },
        { name: 'Roadmap', path: '/roadmap', icon: GitBranch },
        { name: 'Progress', path: '/progress', icon: TrendingUp },
        { name: 'Reference', path: '/reference', icon: Bookmark },
      ]
    : [
        { name: 'Playground', path: '/playground', icon: Terminal },
        { name: 'Visualizers', path: '/visualizers', icon: Eye },
        { name: 'Concepts', path: '/concepts', icon: BookOpen },
        { name: 'Practice', path: '/practice', icon: Award },
        { name: 'Roadmap', path: '/roadmap', icon: GitBranch },
        { name: 'Progress', path: '/progress', icon: TrendingUp },
        { name: 'Reference', path: '/reference', icon: Bookmark },
      ];

  const secondaryNavItems: NavItem[] = isAuthenticated
    ? [
        { name: 'Profile', path: '/profile', icon: User },
        { name: 'Settings', path: '/settings', icon: Settings },
        { name: 'About', path: '/about', icon: Info },
        { name: 'Public Landing', path: '/', icon: Home },
      ]
    : [
        { name: 'Settings', path: '/settings', icon: Settings },
        { name: 'About', path: '/about', icon: Info },
        { name: 'Public Landing', path: '/', icon: Home },
      ];

  const handleNavClick = () => {
    if (isMobileDrawerOpen) {
      setMobileDrawer(false);
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileDrawerOpen && (
        <div
          role="button"
          tabIndex={0}
          aria-label="Close navigation drawer"
          onClick={() => setMobileDrawer(false)}
          onKeyDown={(e) => e.key === 'Escape' && setMobileDrawer(false)}
          className="fixed inset-0 bg-black/20 z-40 md:hidden backdrop-blur-[2px] transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 bg-surface border-r border-border flex flex-col shrink-0 select-none transition-all duration-200 ease-in-out ${
          isMobileDrawerOpen
            ? 'translate-x-0 w-64'
            : '-translate-x-full md:translate-x-0'
        } ${isSidebarCollapsed ? 'md:w-16' : 'md:w-64'}`}
      >
        {/* Brand Header */}
        <div className="h-14 px-3.5 border-b border-border flex items-center justify-between">
          <NavLink
            to="/"
            onClick={handleNavClick}
            className="flex items-center space-x-2.5 overflow-hidden"
          >
            <div className="w-7 h-7 rounded-md bg-foreground flex items-center justify-center text-background shrink-0">
              <Box className="w-4 h-4 stroke-[2]" />
            </div>
            {!isSidebarCollapsed && (
              <span className="font-semibold text-sm tracking-tight text-foreground truncate">
                OOPS LAB
              </span>
            )}
          </NavLink>

          {/* Desktop Collapse Toggle */}
          <button
            type="button"
            onClick={toggleSidebarCollapse}
            aria-label={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className="hidden md:flex p-1.5 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
          >
            {isSidebarCollapsed ? (
              <PanelLeft className="w-4 h-4 stroke-[1.5]" />
            ) : (
              <PanelLeftClose className="w-4 h-4 stroke-[1.5]" />
            )}
          </button>

          {/* Mobile Close Button */}
          <button
            type="button"
            onClick={() => setMobileDrawer(false)}
            aria-label="Close mobile navigation"
            className="md:hidden p-1.5 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
          >
            <X className="w-4 h-4 stroke-[1.5]" />
          </button>
        </div>

        {/* Main Navigation */}
        <div className="flex-1 overflow-y-auto px-2.5 py-4 space-y-6">
          <div>
            {!isSidebarCollapsed && (
              <div className="px-2.5 mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Laboratory
              </div>
            )}
            <nav className="space-y-1">
              {mainNavItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={handleNavClick}
                    title={isSidebarCollapsed ? item.name : undefined}
                    className={({ isActive }) =>
                      `flex items-center ${
                        isSidebarCollapsed
                          ? 'justify-center px-2 py-2.5'
                          : 'space-x-3 px-3 py-2'
                      } rounded-lg text-sm transition-colors ${
                        isActive
                          ? 'bg-foreground text-background font-medium'
                          : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                      }`
                    }
                  >
                    <Icon className="w-4 h-4 shrink-0 stroke-[1.5]" />
                    {!isSidebarCollapsed && (
                      <span className="truncate">{item.name}</span>
                    )}
                  </NavLink>
                );
              })}
            </nav>
          </div>

          <div>
            {!isSidebarCollapsed && (
              <div className="px-2.5 mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Preferences
              </div>
            )}
            <nav className="space-y-1">
              {secondaryNavItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={handleNavClick}
                    title={isSidebarCollapsed ? item.name : undefined}
                    className={({ isActive }) =>
                      `flex items-center ${
                        isSidebarCollapsed
                          ? 'justify-center px-2 py-2.5'
                          : 'space-x-3 px-3 py-2'
                      } rounded-lg text-sm transition-colors ${
                        isActive
                          ? 'bg-foreground text-background font-medium'
                          : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                      }`
                    }
                  >
                    <Icon className="w-4 h-4 shrink-0 stroke-[1.5]" />
                    {!isSidebarCollapsed && (
                      <span className="truncate">{item.name}</span>
                    )}
                  </NavLink>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Footer Info */}
        {!isSidebarCollapsed && (
          <div className="p-3 border-t border-border">
            <div className="bg-white border border-border rounded-lg p-2.5 text-xs text-muted-foreground">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-foreground">Target Engine</span>
                <span className="font-mono text-[10px] bg-accent px-1.5 py-0.5 rounded border border-border text-foreground">
                  Java 21
                </span>
              </div>
              <p className="text-[11px] leading-snug">
                Deterministic AST & JDI visualization pipeline.
              </p>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};
