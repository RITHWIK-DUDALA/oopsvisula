import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { LeftSidebar } from '@/components/navigation/LeftSidebar';
import { TopHeader } from '@/components/navigation/TopHeader';
import { AuthModal } from '@/components/shared/AuthModal';

export const AppLayout: React.FC = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background text-foreground">
      {/* Persistent Left Navigation */}
      <LeftSidebar />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <TopHeader onOpenAuth={() => setIsAuthModalOpen(true)} />
        <main className="flex-1 min-h-0 overflow-hidden bg-white">
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

