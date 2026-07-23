"use client";

import React, { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WorkspaceProvider } from '@/context/workspace-context';
import { Toaster } from 'sonner';

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
      },
    },
  }));

  // PWA Service Worker Registration
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then((reg) => console.log('TubeMind PWA Service Worker registered:', reg.scope))
          .catch((err) => console.warn('TubeMind SW registration failed:', err));
      });
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <WorkspaceProvider>
        {children}
        <Toaster position="top-right" richColors closeButton />
      </WorkspaceProvider>
    </QueryClientProvider>
  );
}
