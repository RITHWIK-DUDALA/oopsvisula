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

export const router = createBrowserRouter([
  // Public Standalone Landing Page (Zero application feature access; sign-in / guest gateway)
  {
    path: '/',
    element: <LandingPage />,
  },

  // Internal Laboratory Application Shell (Only accessible once user enters as guest or signs in)
  {
    element: <AppLayout />,
    children: [
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'concepts', element: <ConceptsPage /> },
      { path: 'visualizers', element: <VisualizerPage /> },
      { path: 'playground', element: <PlaygroundPage /> },
      { path: 'practice', element: <PracticePage /> },
      { path: 'roadmap', element: <RoadmapPage /> },
      { path: 'progress', element: <ProgressPage /> },
      { path: 'reference', element: <ReferencePage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'settings', element: <SettingsPage /> },
      { path: 'profile', element: <ProfilePage /> },
      { path: '*', element: <Navigate to="/dashboard" replace /> },
    ],
  },
]);
