import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Box,
  PanelLeftClose,
  PanelLeft,
  X,
  Code2,
  BookOpen,
  Target,
  GitBranch,
  Settings,
  HelpCircle,
  FileText,
  Award,
  ShieldCheck,
} from 'lucide-react';
import { useShellStore } from '@/app/store/shellStore';
import { LogoTraceLoader } from '@/components/LogoTraceLoader';

interface NavItem {
  name: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
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

  const location = useLocation();

  // Navigation Group Architecture adhering strictly to Student Learning Flow Order
  const groups: NavGroup[] = [
    {
      label: 'LABORATORY / LEARNING',
      items: [
        { name: 'Concepts', path: '/app/concepts', icon: BookOpen },
        { name: 'Roadmap', path: '/app/roadmap', icon: GitBranch },
        { name: 'Visualizers', path: '/app/visualizers', icon: Box },
        { name: 'Playground', path: '/app/playground', icon: Code2 },
      ],
    },
    {
      label: 'PRACTICE',
      items: [
        { name: 'Practice', path: '/app/practice', icon: Target },
        { name: 'Reference', path: '/app/reference', icon: FileText },
        { name: 'Rules', path: '/app/rules', icon: ShieldCheck },
      ],
    },
    {
      label: 'PERSONAL',
      items: [
        { name: 'Progress', path: '/app/progress', icon: Award, badge: 'BETA' },
      ],
    },
    {
      label: 'PREFERENCES',
      items: [
        { name: 'Settings', path: '/app/settings', icon: Settings },
        { name: 'Help', path: '/app/help', icon: HelpCircle },
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
          className="fixed inset-0 bg-black/20 z-40 md:hidden backdrop-blur-xs"
        />
      )}

      {/* Sidebar Container: Exactly 232px expanded per measured reference, 64px collapsed */}
      <aside
        aria-label="Application navigation"
        className={`fixed md:static inset-y-0 left-0 z-50 bg-[#FAFAFA] border-r border-[#E8E8E8] flex flex-col shrink-0 select-none transition-all duration-200 ease-in-out ${
          isMobileDrawerOpen
            ? 'translate-x-0 w-[232px]'
            : '-translate-x-full md:translate-x-0'
        } ${isSidebarCollapsed ? 'md:w-16' : 'md:w-[232px]'}`}
      >
        {/* Brand Header with 3-Layer Stacked Geometric Logo */}
        <div className="h-[60px] px-4 border-b border-[#E8E8E8] flex items-center justify-between shrink-0 bg-[#FAFAFA]">
          <NavLink
            to="/app/concepts"
            onClick={handleNavClick}
            className="flex items-center space-x-2.5 overflow-hidden group min-w-0"
          >
            <div className="w-7 h-7 flex items-center justify-center shrink-0">
              <LogoTraceLoader size={26} strokeWidth={2.5} loading={false} isComplete={true} />
            </div>
            {!isSidebarCollapsed && (
              <div className="flex flex-col min-w-0 truncate">
                <span className="font-bold text-[13px] tracking-tight text-[#171717] leading-tight truncate">
                  OOPS LAB
                </span>
                <span className="text-[10px] text-[#71717A] font-medium leading-none mt-0.5 truncate">
                  JVM Laboratory
                </span>
              </div>
            )}
          </NavLink>

          {/* Desktop Collapse Toggle */}
          <button
            type="button"
            onClick={toggleSidebarCollapse}
            aria-label={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className="hidden md:flex p-1.5 text-[#777777] hover:text-[#171717] hover:bg-[#EEEEEE] rounded-md transition-colors shrink-0"
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
            className="md:hidden p-1.5 text-[#777777] hover:text-[#171717] hover:bg-[#EEEEEE] rounded-md transition-colors shrink-0"
          >
            <X className="w-4 h-4 stroke-[1.5]" />
          </button>
        </div>

        {/* Main Navigation Groups matching reference screenshot */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {groups.map((group) => (
            <div key={group.label} className="space-y-1.5">
              {!isSidebarCollapsed && (
                <div className="text-[10px] font-semibold uppercase tracking-wider text-[#999999] px-2 mb-1.5">
                  {group.label}
                </div>
              )}
              <nav className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isItemActive =
                    item.path === '/'
                      ? location.pathname === '/'
                      : location.pathname === item.path ||
                        location.pathname.startsWith(`${item.path}/`);

                  // Reference screenshot: Playground active item uses peach/orange background and text
                  const isPlayground = item.name === 'Playground';

                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={handleNavClick}
                      title={item.name}
                      className={`relative flex items-center h-[38px] px-2.5 rounded-lg text-[13px] transition-all ${
                        isSidebarCollapsed ? 'justify-center' : 'space-x-2.5'
                      } ${
                        isItemActive
                          ? isPlayground
                            ? 'bg-[#FFF7ED] text-[#EA580C] border border-[#FFEDD5] font-semibold shadow-xs'
                            : 'bg-[#F4F4F5] text-[#171717] font-semibold'
                          : 'text-[#52525B] hover:text-[#171717] hover:bg-[#F4F4F5] font-normal'
                      }`}
                    >
                      {/* Left vertical indicator for active non-playground tabs */}
                      {isItemActive && !isPlayground && (
                        <span
                          className="absolute left-0 top-2 bottom-2 w-[3px] bg-[#171717] rounded-r-full"
                          aria-hidden="true"
                        />
                      )}
                      <Icon
                        className={`w-4 h-4 shrink-0 stroke-[1.8] ${
                          isItemActive && isPlayground ? 'text-[#EA580C]' : ''
                        }`}
                      />
                      {!isSidebarCollapsed && (
                        <>
                          <span className="truncate">{item.name}</span>
                          {item.badge && (
                            <span className="ml-auto text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#E5E7EB] text-[#374151] font-semibold uppercase tracking-wider">
                              {item.badge}
                            </span>
                          )}
                        </>
                      )}
                    </NavLink>
                  );
                })}
              </nav>
            </div>
          ))}
        </div>
      </aside>
    </>
  );
};
