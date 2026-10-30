import React, { useState, useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { SkeletonLoadingPage } from '@/components/shared/SkeletonLoadingPage';

export const App: React.FC = () => {
  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSkeleton(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showSkeleton && (
        <SkeletonLoadingPage
          durationSeconds={2.5}
          onFinished={() => setShowSkeleton(false)}
        />
      )}
      <RouterProvider router={router} />
    </>
  );
};

export default App;

