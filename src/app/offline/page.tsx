"use client";

import React from 'react';
import { WifiOff, RotateCw, Home } from 'lucide-react';
import Link from 'next/link';

export default function OfflinePage() {
  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-6 relative">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="w-full max-w-md text-center space-y-8 z-10">
        {/* Wifi Off Icon with pulse ring */}
        <div className="relative inline-flex items-center justify-center">
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
          <div className="relative bg-secondary/80 border border-border w-24 h-24 rounded-full flex items-center justify-center shadow-lg">
            <WifiOff className="w-10 h-10 text-primary animate-pulse" />
          </div>
        </div>

        {/* Content */}
        <div className="space-y-3">
          <h1 className="text-3xl font-bold tracking-tight">You are offline</h1>
          <p className="text-muted-foreground text-sm max-w-xs mx-auto">
            TubeMind AI was unable to establish a connection to the server. Please check your network and try again.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={handleRetry}
            className="w-full sm:w-auto px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl inline-flex items-center justify-center gap-2 transition-all hover:scale-[1.02] cursor-pointer shadow-md shadow-primary/20"
          >
            <RotateCw className="w-4 h-4" />
            Retry Connection
          </button>
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 bg-secondary hover:bg-secondary/80 border border-border text-foreground font-semibold rounded-xl inline-flex items-center justify-center gap-2 transition-all"
          >
            <Home className="w-4 h-4" />
            Go to Landing
          </Link>
        </div>
      </div>
    </div>
  );
}
