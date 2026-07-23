"use client";

import React, { useState } from 'react';
import { FileText, Copy, Download, Volume2, Play, Pause, FastForward } from 'lucide-react';
import { VideoAnalysis } from '@/lib/mock-data';
import { toast } from 'sonner';

interface SummaryPanelProps {
  video: VideoAnalysis;
}

export function SummaryPanel({ video }: SummaryPanelProps) {
  const [style, setStyle] = useState<'short' | 'medium' | 'detailed' | 'bullets' | 'beginner' | 'expert'>('detailed');
  
  // Audio Player states
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<1 | 1.25 | 1.5 | 2>(1);

  const getStyleContent = () => {
    switch (style) {
      case 'short': return video.summary.short;
      case 'medium': return video.summary.medium;
      case 'detailed': return video.summary.detailed;
      case 'beginner': return video.summary.beginner;
      case 'expert': return video.summary.expert;
      default: return "";
    }
  };

  const handleCopy = () => {
    let content = "";
    if (style === 'bullets') {
      content = video.summary.bullets.map(b => `• ${b}`).join('\n');
    } else {
      content = getStyleContent();
    }
    navigator.clipboard.writeText(content);
    toast.success("Summary copied to clipboard!");
  };

  const handleDownload = () => {
    let content = "";
    if (style === 'bullets') {
      content = video.summary.bullets.map(b => `• ${b}`).join('\n');
    } else {
      content = getStyleContent();
    }
    const element = document.createElement("a");
    const file = new Blob([content], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${video.title.substring(0, 20)}_summary.txt`;
    document.body.appendChild(element);
    element.click();
    toast.success("Summary download started!");
  };

  return (
    <div className="space-y-6">
      
      {/* HEADER CONTROLS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-4">
        {/* Title */}
        <div className="space-y-1">
          <h3 className="font-bold text-sm text-foreground flex items-center gap-2">
            <FileText className="w-4 h-4 text-primary" />
            AI Video Summary
          </h3>
          <p className="text-[10px] text-muted-foreground">Select styling layout below.</p>
        </div>

        {/* Copy/Download */}
        <div className="flex items-center gap-2 shrink-0 select-none">
          <button
            onClick={handleCopy}
            title="Copy to clipboard"
            className="p-2.5 rounded-xl bg-card border border-border/50 text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
          >
            <Copy className="w-4 h-4" />
          </button>
          <button
            onClick={handleDownload}
            title="Download Summary File"
            className="p-2.5 rounded-xl bg-card border border-border/50 text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* STYLE SELECTOR GRIDS */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 p-1 bg-secondary rounded-xl border border-border/50 select-none">
        {(['short', 'medium', 'detailed', 'bullets', 'beginner', 'expert'] as const).map((s) => (
          <button
            key={s}
            onClick={() => setStyle(s)}
            className={`py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
              style === s 
                ? 'bg-card text-foreground shadow-sm border border-border/30' 
                : 'text-muted-foreground hover:bg-secondary/40 hover:text-foreground'
            }`}
          >
            {s === 'short' ? '30s' : s === 'medium' ? '2m' : s}
          </button>
        ))}
      </div>

      {/* SUMMARY DISPLAY BOX */}
      <div className="p-6 bg-card border border-border rounded-2xl min-h-[160px] flex flex-col justify-between">
        {style === 'bullets' ? (
          <ul className="space-y-3.5 list-disc pl-4 text-xs leading-relaxed text-foreground/90">
            {video.summary.bullets.map((bullet, idx) => (
              <li key={idx}>{bullet}</li>
            ))}
          </ul>
        ) : (
          <p className="text-xs leading-relaxed text-foreground/90 whitespace-pre-line">
            {getStyleContent()}
          </p>
        )}
      </div>

      {/* MOCK AUDIO SUMMARY PLAYER */}
      <div className="p-4 bg-secondary/30 border border-border rounded-2xl space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Volume2 className="w-4.5 h-4.5 text-primary shrink-0" />
            <span className="text-xs font-bold">Audio Summary Guide</span>
          </div>
          {/* Speed Toggle */}
          <button
            onClick={() => setPlaybackSpeed(s => s === 1 ? 1.25 : s === 1.25 ? 1.5 : s === 1.5 ? 2 : 1)}
            className="text-[10px] font-bold px-2 py-0.5 rounded bg-card border border-border/50 text-muted-foreground hover:text-foreground cursor-pointer select-none"
          >
            {playbackSpeed}x
          </button>
        </div>

        <div className="flex items-center gap-4">
          {/* PlayBtn */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-md cursor-pointer hover:scale-105 transition-transform"
          >
            {isPlaying ? <Pause className="w-4.5 h-4.5 fill-current" /> : <Play className="w-4.5 h-4.5 fill-current ml-0.5" />}
          </button>

          {/* Slider bar */}
          <div className="flex-1 space-y-1">
            <div className="relative w-full bg-border rounded-full h-1 cursor-pointer overflow-hidden">
              <div 
                className={`bg-primary h-full transition-all duration-500`}
                style={{ width: isPlaying ? '40%' : '12%' }}
              />
            </div>
            <div className="flex items-center justify-between text-[9px] text-muted-foreground font-semibold">
              <span>{isPlaying ? '0:24' : '0:07'}</span>
              <span>1:00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SummaryPanel;
