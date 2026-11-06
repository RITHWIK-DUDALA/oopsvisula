import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Menu,
  ChevronDown,
  Layers,
  Sun,
  User,
  Coffee,
  Check,
  Zap,
} from 'lucide-react';
import { useShellStore } from '@/app/store/shellStore';
import { useSimulationStore } from '@/features/simulation/simulationStore';
import { allSampleTraces } from '@/features/simulation/sampleTraces';

interface TopHeaderProps {
  onOpenAuth: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({ onOpenAuth }) => {
  const location = useLocation();
  const { toggleMobileDrawer } = useShellStore();
  const {
    currentTrace,
    loadTrace,
    playgroundMode,
    setPlaygroundMode,
  } = useSimulationStore();

  const [isScenarioOpen, setIsScenarioOpen] = useState(false);
  const [isJavaVersionOpen, setIsJavaVersionOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsScenarioOpen(false);
        setIsJavaVersionOpen(false);
      }
    };
    if (isScenarioOpen || isJavaVersionOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isScenarioOpen, isJavaVersionOpen]);

  const isPlayground = location.pathname.includes('/playground');

  const pageTitle = (() => {
    if (isPlayground) return 'Playground';
    if (location.pathname.includes('/concepts')) return 'Concepts';
    if (location.pathname.includes('/roadmap')) return 'Roadmap';
    if (location.pathname.includes('/visualizers')) return 'Visualizers';
    if (location.pathname.includes('/practice')) return 'Practice';
    if (location.pathname.includes('/reference')) return 'Reference';
    if (location.pathname.includes('/progress')) return 'Progress';
    if (location.pathname.includes('/settings')) return 'Settings';
    if (location.pathname.includes('/help') || location.pathname.includes('/about')) return 'Help & About';
    return 'OOPS LAB';
  })();

  return (
    <header className="h-[60px] bg-white border-b border-[#E8E8E8] px-4 sm:px-6 flex items-center justify-between shrink-0 select-none z-30">
      {/* Left: Mobile Menu + Title + Scenario + Java Version */}
      <div className="flex items-center space-x-3 sm:space-x-4">
        <button
          type="button"
          onClick={toggleMobileDrawer}
          aria-label="Toggle navigation menu"
          className="md:hidden p-1.5 text-[#777777] hover:text-[#171717] hover:bg-[#EEEEEE] rounded-md transition-colors"
        >
          <Menu className="w-4 h-4 stroke-[1.5]" />
        </button>

        {/* Dynamic Page Title */}
        <h1 className="text-base sm:text-lg font-bold text-[#171717] tracking-tight">
          {pageTitle}
        </h1>

        {isPlayground && (
          <>
            {/* Scenario Dropdown Selector matching Reference Screenshot */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => {
                  setIsScenarioOpen(!isScenarioOpen);
                  setIsJavaVersionOpen(false);
                }}
                className="flex items-center space-x-2 px-3 py-1.5 bg-white border border-[#E5E7EB] hover:border-[#D1D5DB] rounded-lg text-xs font-medium text-[#171717] transition-all shadow-xs"
              >
                <span className="truncate max-w-[220px] sm:max-w-[280px]">
                  {currentTrace.id === 'trace-bank-account'
                    ? 'BankAccount – Encapsulation & State'
                    : currentTrace.programTitle}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-[#71717A] shrink-0" />
              </button>

              {isScenarioOpen && (
                <div className="absolute left-0 top-full mt-1.5 w-72 bg-white border border-[#E5E7EB] rounded-lg shadow-lg py-1 z-50">
                  <div className="px-3 py-1.5 text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-wider border-b border-[#F3F4F6]">
                    Select Scenario
                  </div>
                  <div className="max-h-64 overflow-y-auto py-1">
                    {allSampleTraces.map((trace) => {
                      const isSelected = trace.id === currentTrace.id;
                      const displayTitle =
                        trace.id === 'trace-bank-account'
                          ? 'BankAccount – Encapsulation & State'
                          : trace.programTitle;
                      return (
                        <button
                          key={trace.id}
                          type="button"
                          onClick={() => {
                            loadTrace(trace);
                            setIsScenarioOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2 text-left text-xs transition-colors ${
                            isSelected
                              ? 'bg-[#FFF7ED] text-[#EA580C] font-semibold'
                              : 'text-[#374151] hover:bg-[#F9FAFB]'
                          }`}
                        >
                          <span className="truncate">{displayTitle}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-[#EA580C] shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Java Version Badge */}
            <div className="relative hidden sm:block">
              <button
                type="button"
                onClick={() => setIsJavaVersionOpen(!isJavaVersionOpen)}
                className="flex items-center space-x-1.5 px-2.5 py-1.5 bg-white border border-[#E5E7EB] hover:border-[#D1D5DB] rounded-lg text-xs font-medium text-[#171717] transition-all shadow-xs"
              >
                <Coffee className="w-3.5 h-3.5 text-[#EA580C] stroke-[2]" />
                <span>Java 21</span>
                <ChevronDown className="w-3 h-3 text-[#71717A]" />
              </button>

              {isJavaVersionOpen && (
                <div className="absolute left-0 top-full mt-1.5 w-40 bg-white border border-[#E5E7EB] rounded-lg shadow-lg py-1 z-50">
                  <div className="px-3 py-1.5 text-xs font-semibold text-[#171717] bg-[#F9FAFB] flex items-center justify-between">
                    <span>Java 21 LTS</span>
                    <Check className="w-3.5 h-3.5 text-[#16A34A]" />
                  </div>
                  <div className="px-3 py-1.5 text-xs text-[#9CA3AF] cursor-not-allowed">
                    Java 17 (Legacy)
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Right: 2D/3D Segmented Switch + Theme + Profile */}
      <div className="flex items-center space-x-2 sm:space-x-3">
        {/* Architecture Mode / Live Mode Switch */}
        <div className="flex items-center bg-[#F4F4F5] border border-[#E4E4E7] rounded-lg p-0.5 text-xs font-medium">
          <button
            type="button"
            onClick={() => setPlaygroundMode('architecture')}
            className={`flex items-center space-x-1 px-3 py-1 rounded-md text-xs font-semibold transition-all ${
              playgroundMode === 'architecture'
                ? 'bg-[#1263F1] text-white shadow-xs'
                : 'text-[#71717A] hover:text-[#171717]'
            }`}
          >
            <Layers className="w-3.5 h-3.5 stroke-[2]" />
            <span>Architecture</span>
          </button>
          <button
            type="button"
            onClick={() => setPlaygroundMode('live')}
            className={`flex items-center space-x-1 px-3 py-1 rounded-md text-xs font-medium transition-all ${
              playgroundMode === 'live'
                ? 'bg-[#1263F1] text-white shadow-xs'
                : 'text-[#71717A] hover:text-[#171717]'
            }`}
          >
            <Zap className="w-3.5 h-3.5 stroke-[1.8]" />
            <span>Live Mode</span>
          </button>
        </div>

        {/* Theme Toggle Button (Light/Dark Sun Outline) */}
        <button
          type="button"
          aria-label="Toggle theme"
          title="Light theme active"
          className="p-1.5 border border-[#E5E7EB] rounded-lg text-[#52525B] hover:text-[#171717] hover:bg-[#F4F4F5] transition-all"
        >
          <Sun className="w-4 h-4 stroke-[1.8]" />
        </button>

        {/* User Profile Button */}
        <button
          type="button"
          onClick={onOpenAuth}
          aria-label="User profile"
          title="Guest User Profile"
          className="p-1.5 border border-[#E5E7EB] rounded-lg text-[#52525B] hover:text-[#171717] hover:bg-[#F4F4F5] transition-all"
        >
          <User className="w-4 h-4 stroke-[1.8]" />
        </button>
      </div>
    </header>
  );
};
