import { create } from 'zustand';

interface ShellState {
  isSidebarCollapsed: boolean;
  isMobileDrawerOpen: boolean;
  toggleSidebarCollapse: () => void;
  setSidebarCollapse: (collapsed: boolean) => void;
  toggleMobileDrawer: () => void;
  setMobileDrawer: (open: boolean) => void;
}

export const useShellStore = create<ShellState>((set) => ({
  isSidebarCollapsed: false,
  isMobileDrawerOpen: false,
  toggleSidebarCollapse: () => set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
  setSidebarCollapse: (collapsed) => set({ isSidebarCollapsed: collapsed }),
  toggleMobileDrawer: () => set((state) => ({ isMobileDrawerOpen: !state.isMobileDrawerOpen })),
  setMobileDrawer: (open) => set({ isMobileDrawerOpen: open }),
}));
