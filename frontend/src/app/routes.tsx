import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppLayout } from '@/app/layouts/AppLayout';
import { LandingPage } from '@/features/landing/LandingPage';
import { DashboardPage } from '@/features/dashboard/DashboardPage';
import { ConceptsPage } from '@/features/concepts/ConceptsPage';
import { ConceptDetailPage } from '@/features/concepts/ConceptDetailPage';
import { VisualizerPage } from '@/features/visualizer/VisualizerPage';
import { PlaygroundPage } from '@/features/playground/PlaygroundPage';
import { PracticePage } from '@/features/practice/PracticePage';
import { RoadmapPage } from '@/features/roadmap/RoadmapPage';
import { ProgressPage } from '@/features/progress/ProgressPage';
import { ReferencePage } from '@/features/reference/ReferencePage';
import { AboutPage } from '@/features/about/AboutPage';
import { SettingsPage } from '@/features/settings/SettingsPage';
import { ProfilePage } from '@/features/profile/ProfilePage';
import { useAuthStore } from '@/services/storage/authStore';

// Route Guard: Dashboard and Profile are exclusively for signed-in accounts
const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  if (!isAuthenticated) {
    return <Navigate to="/playground" replace />;
  }
  return <>{children}</>;
};

// Graceful Error Boundary Fallback for all application routes
const RouteErrorBoundary: React.FC = () => {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center p-6 bg-surface text-foreground font-sans select-none">
      <div className="max-w-md w-full p-6 bg-white border border-border rounded-xl shadow-xs space-y-4 text-center">
        <div className="w-10 h-10 rounded-full bg-accent border border-border mx-auto flex items-center justify-center text-foreground font-mono font-bold">
          !
        </div>
        <div>
          <h2 className="text-base font-bold text-foreground tracking-tight">Session Interrupted</h2>
          <p className="text-xs text-muted-foreground mt-1">
            An unexpected error occurred during rendering. Your local workspace state has been preserved.
          </p>
        </div>
        <div className="flex items-center justify-center space-x-3 pt-2">
          <button
            onClick={() => window.location.reload()}
            className="px-3.5 py-1.5 bg-foreground text-background text-xs font-medium rounded-lg hover:bg-black/90 transition-colors"
          >
            Reload Laboratory
          </button>
          <a
            href="/playground"
            className="px-3.5 py-1.5 border border-border text-foreground text-xs font-medium rounded-lg hover:bg-surface transition-colors"
          >
            Go to Playground
          </a>
        </div>
      </div>
    </div>
  );
};

export const router = createBrowserRouter([
  // Public Standalone Landing Page (Zero application feature access; sign-in / guest gateway)
  {
    path: '/',
    element: <LandingPage />,
    errorElement: <RouteErrorBoundary />,
  },

  // Internal Laboratory Application Shell
  {
    element: <AppLayout />,
    errorElement: <RouteErrorBoundary />,
    children: [
      // Protected routes (Only registered/signed-in accounts have Dashboard & Profile)
      {
        path: 'dashboard',
        element: (
          <RequireAuth>
            <DashboardPage />
          </RequireAuth>
        ),
      },
      {
        path: 'profile',
        element: (
          <RequireAuth>
            <ProfilePage />
          </RequireAuth>
        ),
      },

      // Open laboratory features (Accessible to both Guests & Registered Learners)
      { path: 'playground', element: <PlaygroundPage /> },
      { path: 'visualizers', element: <VisualizerPage /> },
      { path: 'concepts', element: <ConceptsPage /> },
      { path: 'concepts/:conceptId', element: <ConceptDetailPage /> },
      { path: 'practice', element: <PracticePage /> },
      { path: 'roadmap', element: <RoadmapPage /> },
      { path: 'progress', element: <ProgressPage /> },
      { path: 'reference', element: <ReferencePage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'settings', element: <SettingsPage /> },

      // Fallback
      { path: '*', element: <Navigate to="/playground" replace /> },
    ],
  },
]);
