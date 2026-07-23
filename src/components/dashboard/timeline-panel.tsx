"use client";

import React from 'react';
import { Play, Clock, Sparkles } from 'lucide-react';
import { TimelineChapter } from '@/lib/mock-data';

interface TimelinePanelProps {
  chapters: TimelineChapter[];
  onSeek: (seconds: number) => void;
  currentTime: number; // passed from parent player progress
}

export function TimelinePanel({ chapters, onSeek, currentTime }: TimelinePanelProps) {
  // Find which chapter is currently active
  const getActiveChapterIndex = () => {
    for (let i = chapters.length - 1; i >= 0; i--) {
      if (currentTime >= chapters[i].seconds) {
        return i;
      }
    }
    return 0;
  };

  const activeIdx = getActiveChapterIndex();

  return (
    <div className="space-y-6">
      
      {/* HEADER */}
      <div className="flex items-center justify-between border-b border-border/60 pb-3 select-none">
        <div className="space-y-1">
          <h3 className="font-bold text-sm text-foreground flex items-center gap-2">
            <Clock className="w-4 h-4 text-purple-500" />
            Interactive Timeline & Navigation
          </h3>
          <p className="text-[10px] text-muted-foreground">Click any chapter to scrub directly to that section.</p>
        </div>
      </div>

      {/* TIMELINE LIST */}
      <div className="relative border-l border-border pl-6 ml-3.5 space-y-6 select-none">
        {chapters.map((ch, idx) => {
          const isActive = idx === activeIdx;

          return (
            <div key={idx} className="relative group">
              
              {/* Timeline Indicator Ring */}
              <div className={`absolute -left-[31px] top-1.5 w-4 h-4 rounded-full border-2 transition-all flex items-center justify-center ${
                isActive 
                  ? 'bg-primary border-primary scale-110 shadow shadow-primary/30' 
                  : 'bg-card border-border group-hover:border-primary/50'
              }`}>
                {isActive && <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
              </div>

              {/* Card Container */}
              <div
                onClick={() => onSeek(ch.seconds)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer text-left ${
                  isActive 
                    ? 'bg-primary/5 border-primary shadow-sm' 
                    : 'bg-card border-border hover:border-border/80 hover:bg-secondary/20'
                }`}
              >
                <div className="flex items-center justify-between gap-4 mb-1">
                  <span className={`font-bold text-xs ${isActive ? 'text-primary' : 'text-foreground'}`}>
                    {ch.title}
                  </span>
                  <span className="px-2 py-0.5 rounded-lg bg-secondary text-[9px] font-bold text-muted-foreground font-mono">
                    {ch.time}
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground leading-normal">
                  {ch.description}
                </p>
                
                {/* Visual Action Tag */}
                <div className="flex items-center gap-1 text-[9px] text-primary font-bold opacity-0 group-hover:opacity-100 transition-opacity mt-2.5">
                  <Play className="w-2.5 h-2.5 fill-current" />
                  Scrub to segment
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TimelinePanel;
