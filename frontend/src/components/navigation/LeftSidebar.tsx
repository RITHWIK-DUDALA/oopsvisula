import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
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
import BranchedMenu, { BranchedMenuItem } from './BranchedMenu';

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
  const location = useLocation();
  const navigate = useNavigate();

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

  const menuItems: BranchedMenuItem[] = [
    {
      label: 'Laboratory',
      children: mainNavItems.map((item) => {
        const Icon = item.icon;
        return {
          value: item.path,
          label: item.name,
          icon: <Icon className="w-4 h-4 shrink-0 stroke-[1.5]" />,
        };
      }),
    },
    {
      label: 'Preferences',
      children: secondaryNavItems.map((item) => {
        const Icon = item.icon;
        return {
          value: item.path,
          label: item.name,
          icon: <Icon className="w-4 h-4 shrink-0 stroke-[1.5]" />,
        };
      }),
    },
  ];

  const allNavItems = [...mainNavItems, ...secondaryNavItems];
  const matchedItem = allNavItems.find(
    (item) =>
      item.path === location.pathname ||
      (item.path !== '/' && location.pathname.startsWith(item.path))
  );
  const currentActivePath = matchedItem?.path ?? location.pathname;

  const handleSelect = (path: string) => {
    navigate(path);
    if (isMobileDrawerOpen) {
      setMobileDrawer(false);
    }
  };

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
        <div className="flex-1 overflow-y-auto px-2 py-3">
          {isSidebarCollapsed ? (
            <nav className="space-y-4">
              <div className="space-y-1">
                {mainNavItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={handleNavClick}
                      title={item.name}
                      className={({ isActive }) =>
                        `flex items-center justify-center px-2 py-2.5 rounded-lg text-sm transition-colors ${
                          isActive
                            ? 'bg-foreground text-background font-medium'
                            : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                        }`
                      }
                    >
                      <Icon className="w-4 h-4 shrink-0 stroke-[1.5]" />
                    </NavLink>
                  );
                })}
              </div>
              <div className="pt-2 border-t border-border space-y-1">
                {secondaryNavItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={handleNavClick}
                      title={item.name}
                      className={({ isActive }) =>
                        `flex items-center justify-center px-2 py-2.5 rounded-lg text-sm transition-colors ${
                          isActive
                            ? 'bg-foreground text-background font-medium'
                            : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                        }`
                      }
                    >
                      <Icon className="w-4 h-4 shrink-0 stroke-[1.5]" />
                    </NavLink>
                  );
                })}
              </div>
            </nav>
          ) : (
            <BranchedMenu
              items={menuItems}
              defaultOpen={[0, 1]}
              defaultActive={currentActivePath}
              onSelect={handleSelect}
              color="#18181b"
              accentColor="#18181b"
              lineColor="#e4e4e7"
              width={240}
              rowHeight={34}
              indent={36}
              trunk={14}
              radius={10}
              lineWidth={1.5}
              fontSize={13}
              drawDuration={400}
              foldDuration={300}
            />
          )}
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
