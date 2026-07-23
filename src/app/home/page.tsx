"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Sparkles, Plus, Clock, Search, Folder, Pin, Trash2, Award, Zap, ChevronRight, Layout, Settings, LogOut, Laptop, Sun, Moon } from 'lucide-react';
import { useWorkspace } from '@/context/workspace-context';
import { CommandPalette } from '@/components/ui/command-palette';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function HomePage() {
  const router = useRouter();
  const {
    history,
    analyzeVideo,
    setActiveVideoById,
    isAnalyzing,
    analysisStep,
    analysisProgress,
    pinnedVideos,
    togglePinVideo,
    streak,
    studyTime,
    achievements,
    theme,
    setTheme,
    resetProgress
  } = useWorkspace();

  const [url, setUrl] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    await analyzeVideo(url);
    setUrl('');
    router.push('/dashboard');
  };

  const handleSelectHistory = (id: string) => {
    setActiveVideoById(id);
    router.push('/dashboard');
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    // Check if dropped URL or text
    const textData = e.dataTransfer.getData('text');
    if (textData && textData.trim().startsWith('http')) {
      setUrl(textData);
      await analyzeVideo(textData);
      router.push('/dashboard');
    }
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    if (mins < 60) return `${mins}m studied`;
    const hrs = (mins / 60).toFixed(1);
    return `${hrs}h studied`;
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col sm:flex-row relative">
      
      {/* Search HUD Overlay */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-3">
        <CommandPalette />
        <button
          onClick={resetProgress}
          title="Reset All Local Data"
          className="p-2.5 rounded-xl hover:bg-destructive/10 hover:text-destructive text-muted-foreground border border-border/40 cursor-pointer"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* LEFT SIDEBAR (Apple-like clean design, hidden on mobile) */}
      <aside className="w-64 border-r border-border bg-card p-6 flex flex-col justify-between shrink-0 hidden md:flex select-none">
        <div className="space-y-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 font-bold text-base tracking-tight">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center text-primary-foreground shadow-md shadow-primary/20">
              <Sparkles className="w-3.5 h-3.5 fill-current" />
            </div>
            <span>TubeMind<span className="text-primary font-semibold">AI</span></span>
          </Link>

          {/* Navigation Links */}
          <div className="space-y-1">
            <Link
              href="/home"
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl bg-secondary text-foreground text-xs font-semibold"
            >
              <Layout className="w-4 h-4 text-primary" />
              Workspace Home
            </Link>
            <Link
              href="/dashboard"
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-muted-foreground hover:bg-secondary/40 hover:text-foreground text-xs font-semibold transition-all"
            >
              <Clock className="w-4 h-4" />
              Active Dashboard
            </Link>
          </div>

          {/* Streak tracker */}
          <div className="p-4 rounded-2xl bg-secondary/30 border border-border/40 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-muted-foreground uppercase">Daily Streaks</span>
              <Zap className="w-3.5 h-3.5 text-orange-500 fill-current" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-extrabold tracking-tight">{streak}</span>
              <span className="text-xs text-muted-foreground">days streak</span>
            </div>
            <div className="text-[10px] text-muted-foreground">
              Study daily to expand your knowledge graph.
            </div>
          </div>
        </div>

        {/* User profile / Theme Toggle */}
        <div className="space-y-4">
          {/* Achievements brief */}
          {achievements.length > 0 && (
            <div className="flex items-center gap-1.5 flex-wrap">
              {achievements.map((ach) => (
                <div
                  key={ach}
                  title={ach === 'first-analysis' ? '🎓 First Analysis complete' : '🔥 5 Min Study milestone'}
                  className="w-7 h-7 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-xs"
                >
                  🏆
                </div>
              ))}
            </div>
          )}

          {/* Theme Selector */}
          <div className="flex items-center gap-1.5 p-1 bg-secondary rounded-xl border border-border">
            <button
              onClick={() => setTheme('light')}
              className={`flex-1 py-1 rounded-lg flex items-center justify-center text-xs cursor-pointer ${
                theme === 'light' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Sun className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setTheme('dark')}
              className={`flex-1 py-1 rounded-lg flex items-center justify-center text-xs cursor-pointer ${
                theme === 'dark' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Moon className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setTheme('system')}
              className={`flex-1 py-1 rounded-lg flex items-center justify-center text-xs cursor-pointer ${
                theme === 'system' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Laptop className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTAINER */}
      <main className="flex-1 p-6 md:p-12 max-w-5xl mx-auto w-full space-y-12">
        
        {/* Header (Intro) */}
        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl text-foreground">
            Study Workspace
          </h1>
          <p className="text-muted-foreground text-sm max-w-xl">
            Analyze new videos, check study streaks, or pick up where you left off.
          </p>
        </div>

        {/* Dynamic Loading Overlay */}
        <AnimatePresence>
          {isAnalyzing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-card/90 backdrop-blur border border-border p-6 rounded-2xl flex flex-col items-center justify-center text-center space-y-4 shadow-xl z-30"
            >
              <Sparkles className="w-8 h-8 text-primary animate-pulse" />
              <div className="space-y-1">
                <h3 className="font-bold text-base">Analyzing Video Details</h3>
                <p className="text-xs text-muted-foreground">{analysisStep}</p>
              </div>
              <div className="w-full max-w-xs bg-secondary rounded-full h-1.5 overflow-hidden">
                <motion.div
                  className="bg-primary h-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${analysisProgress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <span className="text-[10px] text-muted-foreground">{analysisProgress}% complete</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* INPUT ZONE */}
        {!isAnalyzing && (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-3xl p-6 sm:p-12 text-center transition-all ${
              isDragOver 
                ? 'border-primary bg-primary/5 scale-[1.01]' 
                : 'border-border bg-card/40 hover:border-border/80'
            }`}
          >
            <div className="max-w-xl mx-auto space-y-6">
              {/* Icon */}
              <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center mx-auto border border-border/40 shadow-sm">
                <Play className="w-5 h-5 text-primary" />
              </div>

              {/* Title */}
              <div className="space-y-1.5">
                <h3 className="text-lg font-bold tracking-tight">Start an AI Analysis</h3>
                <p className="text-muted-foreground text-xs">
                  Paste a YouTube URL or drag and drop link strings directly into this container.
                </p>
              </div>

              {/* Form Input */}
              <form onSubmit={handleAnalyze} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  placeholder="Paste YouTube link (https://...)"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="flex-1 bg-card border border-border/80 px-4 py-3 rounded-xl text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-primary hover:bg-primary/95 text-primary-foreground font-semibold rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-primary/10"
                >
                  Analyze Video
                </button>
              </form>

              {/* Info text */}
              <div className="text-[10px] text-muted-foreground select-none">
                Supports standard video formats and lecture playlists.
              </div>
            </div>
          </div>
        )}

        {/* HISTORY LIST */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <h3 className="font-bold text-sm text-foreground flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              Recent Workspace Summaries
            </h3>
            <span className="text-[10px] font-semibold text-muted-foreground">{history.length} analyzed</span>
          </div>

          {history.length === 0 ? (
            <div className="py-12 border border-dashed border-border/80 rounded-2xl text-center text-xs text-muted-foreground flex flex-col items-center justify-center gap-2">
              <Folder className="w-6 h-6 text-muted-foreground/40 animate-pulse" />
              No analyzed videos in history yet. Paste a link above to begin!
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {history.map((video) => (
                <div
                  key={video.id}
                  onClick={() => handleSelectHistory(video.id)}
                  className="p-4 bg-card border border-border rounded-2xl shadow-sm hover:shadow-md hover:border-border/80 transition-all flex gap-3.5 cursor-pointer group relative"
                >
                  {/* Thumbnail brief */}
                  <div className="w-24 h-16 bg-secondary border border-border/20 rounded-xl overflow-hidden shrink-0 relative select-none">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/10 flex items-center justify-center group-hover:bg-black/35 transition-colors">
                      <Play className="w-4 h-4 fill-white text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div className="space-y-1">
                      <h4 className="font-bold text-xs truncate group-hover:text-primary transition-colors pr-6">
                        {video.title}
                      </h4>
                      <p className="text-[10px] text-muted-foreground truncate">{video.channel}</p>
                    </div>
                    <div className="flex items-center gap-2 text-[9px] text-muted-foreground">
                      <span>{video.duration}</span>
                      <span>•</span>
                      <span>{video.views}</span>
                    </div>
                  </div>

                  {/* Pin action overlay */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePinVideo(video.id);
                    }}
                    className="absolute top-3 right-3 p-1 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground cursor-pointer z-10"
                  >
                    <Pin className={`w-3.5 h-3.5 ${pinnedVideos.includes(video.id) ? 'fill-primary text-primary' : ''}`} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ANALYTICS SUMMARY BOX (Mobile visible details) */}
        <div className="md:hidden grid grid-cols-2 gap-4 border-t border-border/40 pt-6">
          <div className="p-4 rounded-2xl bg-secondary/35 border border-border/30 text-center">
            <span className="text-[9px] font-bold uppercase text-muted-foreground">Streak</span>
            <div className="text-xl font-extrabold text-orange-500 flex items-center justify-center gap-1 mt-1">
              <Zap className="w-4 h-4 fill-current" />
              {streak} Days
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-secondary/35 border border-border/30 text-center">
            <span className="text-[9px] font-bold uppercase text-muted-foreground">Study Time</span>
            <div className="text-xl font-extrabold text-indigo-500 mt-1">
              {formatTime(studyTime)}
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
