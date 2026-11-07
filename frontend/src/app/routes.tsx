import React from 'react';
import { createBrowserRouter, Navigate, useParams } from 'react-router-dom';
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
import { RulesPage } from '@/features/rules/RulesPage';
import { AboutPage } from '@/features/about/AboutPage';
import { SettingsPage } from '@/features/settings/SettingsPage';
import { ProfilePage } from '@/features/profile/ProfilePage';
import { useAuthStore } from '@/services/storage/authStore';

// Route Guard: Dashboard and Profile are exclusively for signed-in accounts
const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  if (!isAuthenticated) {
    return <Navigate to="/app/concepts" replace />;
  }
  return <>{children}</>;
};

// Seamless Redirect helper for top-level /concepts/:conceptId URLs to /app/concepts/:conceptId
const RedirectToAppConcept: React.FC = () => {
  const { conceptId } = useParams<{ conceptId: string; categorySlug?: string }>();
  return <Navigate to={`/app/concepts/${conceptId || ''}`} replace />;
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
            href="/app/concepts"
            className="px-3.5 py-1.5 border border-border text-foreground text-xs font-medium rounded-lg hover:bg-surface transition-colors"
          >
            Go to Concepts
          </a>
        </div>
      </div>
    </div>
  );
};

export const router = createBrowserRouter([
  // PART A — Public Standalone Marketing Website (Zero application feature access)
  {
    path: '/',
    element: <LandingPage />,
    errorElement: <RouteErrorBoundary />,
  },

  // PART B — OOPS LAB Learning Application Shell (/app/*)
  {
    path: '/app',
    element: <AppLayout />,
    errorElement: <RouteErrorBoundary />,
    children: [
      // Default Student Entry: /app -> /app/concepts
      { index: true, element: <Navigate to="/app/concepts" replace /> },

      // 1. Concepts (Primary Educational Starting Point)
      { path: 'concepts', element: <ConceptsPage /> },
      { path: 'concepts/:conceptId', element: <ConceptDetailPage /> },
      { path: 'concepts/:categorySlug/:conceptId', element: <ConceptDetailPage /> },

      // 2. Roadmap (Curriculum Dependencies & Milestones)
      { path: 'roadmap', element: <RoadmapPage /> },

      // 3. Visualizers (Interactive JVM Visualizations)
      { path: 'visualizers', element: <VisualizerPage /> },

      // 4. Playground / Lab (Full 2D/3D Java Execution Laboratory)
      { path: 'playground', element: <PlaygroundPage /> },

      // 5. Practice (AST Auto-Graded Challenges)
      { path: 'practice', element: <PracticePage /> },

      // 6. Reference (JVM Memory, Bytecode, UML Reference)
      { path: 'reference', element: <ReferencePage /> },

      // 6b. Rules & Specifications (Sandbox Boundaries & Code Rules)
      { path: 'rules', element: <RulesPage /> },

      // 7. Progress (Learning Achievements & Activity)
      { path: 'progress', element: <ProgressPage /> },

      // 8. Settings (Monaco, Theme & Playback Calibration)
      { path: 'settings', element: <SettingsPage /> },

      // 9. Help / About (Laboratory Information & Architecture)
      { path: 'help', element: <AboutPage /> },
      { path: 'about', element: <Navigate to="/app/help" replace /> },

      // Protected Account Features
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

      // Fallback within /app -> /app/concepts
      { path: '*', element: <Navigate to="/app/concepts" replace /> },
    ],
  },

  // Legacy Non-Prefixed Compatibility Redirects
  { path: '/playground', element: <Navigate to="/app/playground" replace /> },
  { path: '/concepts', element: <Navigate to="/app/concepts" replace /> },
  { path: '/concepts/:conceptId', element: <RedirectToAppConcept /> },
  { path: '/concepts/:categorySlug/:conceptId', element: <RedirectToAppConcept /> },
  { path: '/visualizers', element: <Navigate to="/app/visualizers" replace /> },
  { path: '/practice', element: <Navigate to="/app/practice" replace /> },
  { path: '/roadmap', element: <Navigate to="/app/roadmap" replace /> },
  { path: '/progress', element: <Navigate to="/app/progress" replace /> },
  { path: '/reference', element: <Navigate to="/app/reference" replace /> },
  { path: '/rules', element: <Navigate to="/app/rules" replace /> },
  { path: '/settings', element: <Navigate to="/app/settings" replace /> },
  { path: '/about', element: <Navigate to="/app/help" replace /> },
  { path: '/help', element: <Navigate to="/app/help" replace /> },

  // Global Fallback
  { path: '*', element: <Navigate to="/" replace /> },
]);
