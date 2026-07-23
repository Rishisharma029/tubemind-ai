"use client";

import React, { useState, useEffect } from 'react';
import { useWorkspace } from '@/context/workspace-context';
import { SummaryPanel } from '@/components/dashboard/summary-panel';
import { NotesPanel } from '@/components/dashboard/notes-panel';
import { TimelinePanel } from '@/components/dashboard/timeline-panel';
import { MindMapPanel } from '@/components/dashboard/mind-map-panel';
import { QuizPanel } from '@/components/dashboard/quiz-panel';
import { FlashcardsPanel } from '@/components/dashboard/flashcards-panel';
import { ChatPanel } from '@/components/dashboard/chat-panel';
import { BlogPanel } from '@/components/dashboard/blog-panel';
import { SocialPanel } from '@/components/dashboard/social-panel';
import { CodePanel } from '@/components/dashboard/code-panel';
import { ResourcesPanel } from '@/components/dashboard/resources-panel';
import { PDFPanel } from '@/components/dashboard/pdf-panel';
import { PomodoroTimer } from '@/components/dashboard/pomodoro-timer';
import { CommandPalette } from '@/components/ui/command-palette';
import { Layout, FileText, Brain, HelpCircle, MessageSquare, BookOpen, Code2, Download, Settings, ChevronLeft, Calendar, Eye, Sparkles } from 'lucide-react';
import Link from 'next/link';

type TabType = 
  | 'summary' 
  | 'notes' 
  | 'timeline' 
  | 'mindmap' 
  | 'quiz' 
  | 'flashcards' 
  | 'chat' 
  | 'resources' 
  | 'code' 
  | 'blog' 
  | 'social' 
  | 'pdf'
  | 'settings';

export default function DashboardPage() {
  const { activeVideo, theme, setTheme } = useWorkspace();
  const [activeTab, setActiveTab] = useState<TabType>('summary');
  
  // Track mock video progress fortimeline chapter highlighting
  const [currentTime, setCurrentTime] = useState(0);
  const [startSeconds, setStartSeconds] = useState(0);

  // Jump to specific chapter seconds
  const handleSeek = (seconds: number) => {
    setStartSeconds(seconds);
    setCurrentTime(seconds);
  };

  // Simulate slowly ticking video time forward in the background if the player is active
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(prev => {
        // Loop back if it exceeds duration
        if (prev >= 7200) return 0;
        return prev + 5; // skip in 5s increments to simulate progress
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const tabList = [
    { id: 'summary', label: 'Summary', icon: <FileText className="w-4 h-4" /> },
    { id: 'notes', label: 'Notes', icon: <FileText className="w-4 h-4" /> },
    { id: 'timeline', label: 'Timeline', icon: <Calendar className="w-4 h-4" /> },
    { id: 'mindmap', label: 'Mind Map', icon: <Brain className="w-4 h-4" /> },
    { id: 'quiz', label: 'Quiz', icon: <HelpCircle className="w-4 h-4" /> },
    { id: 'flashcards', label: 'Flashcards', icon: <HelpCircle className="w-4 h-4" /> },
    { id: 'chat', label: 'Study Chat', icon: <MessageSquare className="w-4 h-4" /> },
    { id: 'code', label: 'Code sandbox', icon: <Code2 className="w-4 h-4" /> },
    { id: 'resources', label: 'Resources', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'blog', label: 'Blog Article', icon: <FileText className="w-4 h-4" /> },
    { id: 'social', label: 'Social threads', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'pdf', label: 'PDF Export', icon: <Download className="w-4 h-4" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> }
  ] as const;

  // Render dynamic active panel
  const renderActivePanel = () => {
    switch (activeTab) {
      case 'summary':
        return <SummaryPanel video={activeVideo} />;
      case 'notes':
        return <NotesPanel videoId={activeVideo.id} defaultNotes={activeVideo.notes} />;
      case 'timeline':
        return <TimelinePanel chapters={activeVideo.timeline} onSeek={handleSeek} currentTime={currentTime} />;
      case 'mindmap':
        return <MindMapPanel rootNode={activeVideo.mindMap} />;
      case 'quiz':
        return <QuizPanel questions={activeVideo.quiz} />;
      case 'flashcards':
        return <FlashcardsPanel cards={activeVideo.flashcards} />;
      case 'chat':
        return <ChatPanel videoId={activeVideo.id} />;
      case 'code':
        return <CodePanel snippets={activeVideo.codeSnippets} />;
      case 'resources':
        return <ResourcesPanel resources={activeVideo.resources} />;
      case 'blog':
        return <BlogPanel blog={activeVideo.blog} />;
      case 'social':
        return <SocialPanel linkedin={activeVideo.linkedin} twitter={activeVideo.twitter} />;
      case 'pdf':
        return <PDFPanel video={activeVideo} />;
      case 'settings':
        return (
          <div className="space-y-6">
            <h3 className="font-bold text-sm text-foreground">Workspace Configuration</h3>
            <div className="space-y-4 text-xs">
              {/* Theme toggle info */}
              <div className="p-4 bg-secondary/35 border border-border rounded-xl space-y-2">
                <span className="font-bold">Select theme layout</span>
                <div className="flex gap-2">
                  {(['light', 'dark', 'system'] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setTheme(t)}
                      className={`px-3 py-1.5 rounded-lg border capitalize cursor-pointer font-semibold ${
                        theme === t ? 'bg-primary border-primary text-white' : 'bg-card border-border/80 text-muted-foreground'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Keyboard list */}
              <div className="p-4 bg-secondary/35 border border-border rounded-xl space-y-2">
                <span className="font-bold">Keyboard Shortcuts</span>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex justify-between"><span>Search Palette</span> <kbd className="px-1 bg-card border rounded font-mono font-bold">⌘K</kbd></li>
                  <li className="flex justify-between"><span>Close Modals</span> <kbd className="px-1 bg-card border rounded font-mono font-bold">ESC</kbd></li>
                </ul>
              </div>
            </div>
          </div>
        );
      default:
        return <div>Panel not found.</div>;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Top Navbar */}
      <header className="h-14 border-b border-border bg-card/65 backdrop-blur px-6 flex items-center justify-between shrink-0 select-none">
        <div className="flex items-center gap-3">
          <Link
            href="/home"
            className="p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground cursor-pointer flex items-center justify-center transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </Link>
          <div className="h-4 w-px bg-border" />
          <h2 className="text-xs font-bold truncate max-w-[200px] sm:max-w-xs">{activeVideo.title}</h2>
        </div>

        <div className="flex items-center gap-4">
          <CommandPalette />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" title="System Online" />
        </div>
      </header>

      {/* Main split dashboard view */}
      <div className="flex-1 flex flex-col md:flex-row items-stretch overflow-hidden">
        
        {/* LEFT COMPONENT: Video Player + Stats (5 cols equivalent) */}
        <aside className="w-full md:w-[420px] lg:w-[460px] border-b md:border-b-0 md:border-r border-border p-5 flex flex-col gap-5 overflow-y-auto shrink-0 select-none">
          
          {/* Iframe video container */}
          <div className="aspect-video w-full bg-secondary border border-border/80 rounded-2xl overflow-hidden relative shadow-sm">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${activeVideo.id}?start=${startSeconds}&autoplay=1`}
              title={activeVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>

          {/* Stats Metadata info */}
          <div className="space-y-3">
            <h1 className="font-extrabold text-sm sm:text-base leading-snug">
              {activeVideo.title}
            </h1>
            <div className="flex items-center gap-3 text-[10px] font-bold text-muted-foreground uppercase tracking-wide flex-wrap">
              <span>{activeVideo.channel}</span>
              <span>•</span>
              <span>{activeVideo.views}</span>
              <span>•</span>
              <span>{activeVideo.publishDate}</span>
            </div>
          </div>

          {/* Pomodoro Timer widget */}
          <PomodoroTimer />
        </aside>

        {/* RIGHT COMPONENT: Studies Tabs Content (7 cols equivalent) */}
        <main className="flex-1 flex flex-col overflow-hidden">
          
          {/* Tab selector menu */}
          <div className="flex border-b border-border py-2 px-4 gap-1 overflow-x-auto select-none bg-card/15 shrink-0 scrollbar-none">
            {tabList.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 shrink-0 transition-all cursor-pointer ${
                  activeTab === t.id 
                    ? 'bg-card text-foreground shadow-sm border border-border/40' 
                    : 'text-muted-foreground hover:bg-secondary/40 hover:text-foreground'
                }`}
              >
                {t.icon}
                {t.label}
              </button>
            ))}
          </div>

          {/* Render Active Panel content */}
          <div className="flex-1 p-6 overflow-y-auto">
            {renderActivePanel()}
          </div>

        </main>

      </div>
    </div>
  );
}
