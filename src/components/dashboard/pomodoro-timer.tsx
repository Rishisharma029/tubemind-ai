"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Timer, Sparkles } from 'lucide-react';
import { useWorkspace } from '@/context/workspace-context';
import { toast } from 'sonner';

export function PomodoroTimer() {
  const { incrementStudyTime } = useWorkspace();
  const [mode, setMode] = useState<'work' | 'break'>('work');
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Time remaining format
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setIsRunning(false);
            
            // Switch cycles
            if (mode === 'work') {
              setMode('break');
              setTimeLeft(5 * 60);
              toast.success("Work cycle finished! Take a 5 minute break. ☕");
              incrementStudyTime(25 * 60); // update total study stats
            } else {
              setMode('work');
              setTimeLeft(25 * 60);
              toast.success("Break over! Time to focus. 🧠");
            }
            return 0;
          }
          
          // Increment study stats every 10 seconds of active focus
          if (prev % 10 === 0 && mode === 'work') {
            incrementStudyTime(10);
          }

          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, mode]);

  const handleToggle = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setMode('work');
    setTimeLeft(25 * 60);
    toast.info("Timer reset.");
  };

  return (
    <div className="p-4 bg-secondary/35 border border-border/80 rounded-2xl space-y-4 select-none">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold text-muted-foreground uppercase flex items-center gap-1.5">
          <Timer className="w-3.5 h-3.5 text-primary" />
          Study Timer
        </span>
        <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase ${
          mode === 'work' ? 'bg-primary/10 text-primary' : 'bg-emerald-500/10 text-emerald-500'
        }`}>
          {mode === 'work' ? 'Focus Session' : 'Break Time'}
        </span>
      </div>

      {/* Clock display */}
      <div className="text-center py-2">
        <h2 className="text-3xl font-extrabold tracking-widest font-mono text-foreground">
          {formatTime(timeLeft)}
        </h2>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-2">
        <button
          onClick={handleToggle}
          className={`flex-1 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer shadow-sm ${
            isRunning 
              ? 'bg-secondary hover:bg-secondary/80 border border-border text-foreground' 
              : 'bg-primary hover:bg-primary/95 text-primary-foreground'
          }`}
        >
          {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
          {isRunning ? 'Pause' : 'Start Focus'}
        </button>

        <button
          onClick={handleReset}
          className="p-2 rounded-xl bg-card border border-border/60 hover:bg-secondary text-muted-foreground hover:text-foreground cursor-pointer"
          title="Reset Timer"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}

export default PomodoroTimer;
