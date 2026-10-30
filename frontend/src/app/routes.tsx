import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppLayout } from '@/app/layouts/AppLayout';
import { LandingPage } from '@/features/landing/LandingPage';
import { DashboardPage } from '@/features/dashboard/DashboardPage';
import { ConceptsPage } from '@/features/concepts/ConceptsPage';
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

export const router = createBrowserRouter([
  // Public Standalone Landing Page (Zero application feature access; sign-in / guest gateway)
  {
    path: '/',
    element: <LandingPage />,
  },

  // Internal Laboratory Application Shell
  {
    element: <AppLayout />,
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
