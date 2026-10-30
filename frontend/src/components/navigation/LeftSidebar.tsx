import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Box,
  PanelLeftClose,
  PanelLeft,
  X,
  Terminal,
  Eye,
  BookOpen,
  Award,
  GitBranch,
  Bookmark,
  TrendingUp,
  Settings,
  Info,
  Home,
  LayoutDashboard,
  User,
} from 'lucide-react';
import { useShellStore } from '@/app/store/shellStore';
import { useAuthStore } from '@/services/storage/authStore';

interface NavItem {
  name: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface NavGroup {
  label: string;
  items: NavItem[];
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

  // Navigation Group Architecture per Section 4 specification
  const groups: NavGroup[] = [
    {
      label: 'Laboratory',
      items: [
        ...(isAuthenticated ? [{ name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard }] : []),
        { name: 'Playground', path: '/playground', icon: Terminal },
        { name: 'Visualizers', path: '/visualizers', icon: Eye },
      ],
    },
    {
      label: 'Learning',
      items: [
        { name: 'Concepts', path: '/concepts', icon: BookOpen },
        { name: 'Practice', path: '/practice', icon: Award },
        { name: 'Roadmap', path: '/roadmap', icon: GitBranch },
        { name: 'Reference', path: '/reference', icon: Bookmark },
      ],
    },
    {
      label: 'Personal',
      items: [
        { name: 'Progress', path: '/progress', icon: TrendingUp },
        ...(isAuthenticated ? [{ name: 'Profile', path: '/profile', icon: User }] : []),
      ],
    },
    {
      label: 'Preferences',
      items: [
        { name: 'Settings', path: '/settings', icon: Settings },
        { name: 'About', path: '/about', icon: Info },
        { name: 'Public Landing', path: '/', icon: Home },
      ],
    },
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

      {/* Sidebar Container: Exactly 228px expanded, 64px collapsed */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 bg-[#FAFAFA] border-r border-[#E8E8E8] flex flex-col shrink-0 select-none transition-all duration-200 ease-in-out ${
          isMobileDrawerOpen
            ? 'translate-x-0 w-[228px]'
            : '-translate-x-full md:translate-x-0'
        } ${isSidebarCollapsed ? 'md:w-16' : 'md:w-[228px]'}`}
      >
        {/* Brand Header (58px to match header height) */}
        <div className="h-[58px] px-3.5 border-b border-[#E8E8E8] flex items-center justify-between shrink-0 bg-[#FAFAFA]">
          <NavLink
            to="/"
            onClick={handleNavClick}
            className="flex items-center space-x-2.5 overflow-hidden group"
          >
            <div className="w-7 h-7 rounded-md bg-[#171717] flex items-center justify-center text-white shrink-0 shadow-xs">
              <Box className="w-4 h-4 stroke-[2]" />
            </div>
            {!isSidebarCollapsed && (
              <span className="font-bold text-[13px] tracking-tight text-[#171717] truncate">
                OOPS LAB
              </span>
            )}
          </NavLink>

          {/* Desktop Collapse Toggle */}
          <button
            type="button"
            onClick={toggleSidebarCollapse}
            aria-label={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className="hidden md:flex p-1.5 text-[#777777] hover:text-[#171717] hover:bg-[#EEEEEE] rounded-md transition-colors"
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
            className="md:hidden p-1.5 text-[#777777] hover:text-[#171717] hover:bg-[#EEEEEE] rounded-md transition-colors"
          >
            <X className="w-4 h-4 stroke-[1.5]" />
          </button>
        </div>

        {/* Main Navigation with 4 Discrete Groups */}
        <div className="flex-1 overflow-y-auto px-2.5 py-4 space-y-5">
          {groups.map((group) => (
            <div key={group.label} className="space-y-1">
              {!isSidebarCollapsed && (
                <div className="text-[10px] font-mono uppercase tracking-wider text-[#999999] px-2.5 mb-1.5 font-semibold">
                  {group.label}
                </div>
              )}
              <nav className="space-y-0.5">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isItemActive =
                    item.path === '/'
                      ? location.pathname === '/'
                      : location.pathname === item.path ||
                        location.pathname.startsWith(`${item.path}/`);

                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={handleNavClick}
                      title={item.name}
                      className={`relative flex items-center h-[38px] px-2.5 rounded-md text-[13px] transition-colors ${
                        isSidebarCollapsed ? 'justify-center' : 'space-x-2.5'
                      } ${
                        isItemActive
                          ? 'bg-[#EEEEEE] text-[#171717] font-semibold'
                          : 'text-[#777777] hover:text-[#171717] hover:bg-[#F2F2F2] font-normal'
                      }`}
                    >
                      {/* Thin left active indicator line */}
                      {isItemActive && (
                        <span
                          className="absolute left-0 top-1.5 bottom-1.5 w-[3px] bg-[#171717] rounded-r-full"
                          aria-hidden="true"
                        />
                      )}
                      <Icon className="w-4 h-4 shrink-0 stroke-[1.5]" />
                      {!isSidebarCollapsed && (
                        <span className="truncate">{item.name}</span>
                      )}
                    </NavLink>
                  );
                })}
              </nav>
            </div>
          ))}
        </div>

        {/* Compact Java Engine Status Component per Section 4 */}
        {!isSidebarCollapsed ? (
          <div className="p-3 border-t border-[#E8E8E8] bg-[#FAFAFA] shrink-0">
            <div className="px-3 py-2 bg-white border border-[#E8E8E8] rounded-md text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#999999] font-semibold">
                  Java Engine
                </span>
                <span className="flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#287a4b] inline-block animate-pulse" />
                  <span className="text-[10px] font-mono text-[#287a4b] font-medium">Ready</span>
                </span>
              </div>
              <div className="text-xs font-mono font-bold text-[#171717] mt-0.5">
                Java 21 LTS
              </div>
            </div>
          </div>
        ) : (
          <div className="p-3 border-t border-[#E8E8E8] flex justify-center shrink-0">
            <span
              className="w-2 h-2 rounded-full bg-[#287a4b] inline-block"
              title="Java 21 LTS Ready"
            />
          </div>
        )}
      </aside>
    </>
  );
};
