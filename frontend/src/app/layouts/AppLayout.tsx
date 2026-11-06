import React, { useState, useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { LeftSidebar } from '@/components/navigation/LeftSidebar';
import { TopHeader } from '@/components/navigation/TopHeader';
import { AuthModal } from '@/components/shared/AuthModal';

export const AppLayout: React.FC = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const location = useLocation();
  const mainRef = useRef<HTMLElement | null>(null);

  // Automatically reset main scroll container position to top on every route change
  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTop = 0;
    }
  }, [location.pathname]);

  const isPlayground = location.pathname.startsWith('/app/playground');

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background text-foreground">
      {/* Persistent Left Navigation (stationary with internal nav scroll) */}
      <LeftSidebar />

      {/* Main Content Column */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Stationary Application Header (hidden in Playground to maximize IDE workspace) */}
        {!isPlayground && <TopHeader onOpenAuth={() => setIsAuthModalOpen(true)} />}

        {/* Content Container (zero outer scrolling in Playground) */}
        <main
          ref={mainRef}
          id="main-scroll-container"
          className={`flex-1 min-h-0 ${isPlayground ? 'overflow-hidden' : 'overflow-y-auto scroll-smooth'} bg-white`}
        >
          <Outlet />
        </main>
      </div>

      {/* Postponed Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        title="Account Authorization"
      />
    </div>
  );
};
