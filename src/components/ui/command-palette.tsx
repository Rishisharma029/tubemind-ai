"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Video, FileText, HelpCircle, BookOpen, Sparkles, X } from 'lucide-react';
import { useWorkspace } from '@/context/workspace-context';
import { useKeyboardShortcuts } from '@/hooks/use-keyboard-shortcuts';
import Fuse from 'fuse.js';

interface SearchItem {
  id: string;
  type: 'video' | 'note' | 'flashcard' | 'resource';
  title: string;
  subtitle: string;
  payload: { videoId?: string; url?: string; tab?: string };
}

export function CommandPalette() {
  const { history, activeVideo, setActiveVideoById } = useWorkspace();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchItem[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Hook global shortcut
  useKeyboardShortcuts([
    {
      key: 'k',
      ctrlKey: true,
      callback: () => {
        setIsOpen(prev => !prev);
      }
    },
    {
      key: 'Escape',
      callback: () => {
        setIsOpen(false);
      }
    }
  ]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  // Construct Search Corpus
  const getSearchCorpus = (): SearchItem[] => {
    const corpus: SearchItem[] = [];

    // Add analyzed videos
    history.forEach(video => {
      corpus.push({
        id: `video-${video.id}`,
        type: 'video',
        title: video.title,
        subtitle: `Video by ${video.channel} • ${video.duration}`,
        payload: { videoId: video.id }
      });

      // Add resources
      video.resources.forEach((r, idx) => {
        corpus.push({
          id: `resource-${video.id}-${idx}`,
          type: 'resource',
          title: r.title,
          subtitle: `Resource Link • ${r.category.toUpperCase()} under ${video.title.substring(0, 20)}...`,
          payload: { videoId: video.id, url: r.url }
        });
      });

      // Add flashcards
      video.flashcards.forEach(fc => {
        corpus.push({
          id: `fc-${fc.id}`,
          type: 'flashcard',
          title: fc.front,
          subtitle: `Flashcard • Back: ${fc.back.substring(0, 30)}...`,
          payload: { videoId: video.id, tab: 'flashcards' }
        });
      });
    });

    return corpus;
  };

  // Perform Fuse search
  useEffect(() => {
    if (!query) {
      // Show default suggestions (all videos)
      const suggestions = getSearchCorpus().filter(item => item.type === 'video');
      setResults(suggestions.slice(0, 5));
      return;
    }

    const corpus = getSearchCorpus();
    const fuse = new Fuse(corpus, {
      keys: ['title', 'subtitle'],
      threshold: 0.4,
    });

    const searchResults = fuse.search(query).map(res => res.item);
    setResults(searchResults.slice(0, 8));
  }, [query, history]);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleSelectItem = (item: SearchItem) => {
    if (item.type === 'video') {
      setActiveVideoById(item.payload.videoId);
    } else if (item.type === 'resource') {
      window.open(item.payload.url, '_blank');
    } else if (item.type === 'flashcard') {
      setActiveVideoById(item.payload.videoId);
      // Trigger context or panel tab switch if needed
    }
    setIsOpen(false);
  };

  const getIcon = (type: SearchItem['type']) => {
    switch (type) {
      case 'video': return <Video className="w-4 h-4 text-indigo-500" />;
      case 'note': return <FileText className="w-4 h-4 text-emerald-500" />;
      case 'flashcard': return <HelpCircle className="w-4 h-4 text-amber-500" />;
      case 'resource': return <BookOpen className="w-4 h-4 text-cyan-500" />;
      default: return <Sparkles className="w-4 h-4 text-purple-500" />;
    }
  };

  return (
    <>
      {/* Search HUD toggle button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary/80 hover:bg-secondary border border-border/50 text-xs text-muted-foreground transition-all cursor-pointer select-none"
      >
        <Search className="w-3.5 h-3.5" />
        <span>Search workspace</span>
        <kbd className="hidden sm:inline-flex px-1.5 py-0.5 rounded border border-border/70 bg-card font-mono text-[10px] text-muted-foreground font-semibold">
          ⌘K
        </kbd>
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] p-4 bg-background/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: -8 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              ref={containerRef}
              className="w-full max-w-xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Input Bar */}
              <div className="flex items-center gap-3 px-4 border-b border-border py-3.5">
                <Search className="w-5 h-5 text-muted-foreground shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search summaries, notes, flashcards..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full bg-transparent border-0 outline-none text-sm text-foreground placeholder:text-muted-foreground"
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-md hover:bg-secondary text-muted-foreground cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Results List */}
              <div className="max-h-[350px] overflow-y-auto p-2">
                {results.length === 0 ? (
                  <div className="py-12 text-center text-sm text-muted-foreground flex flex-col items-center justify-center gap-2">
                    <Sparkles className="w-6 h-6 text-muted-foreground/50 animate-pulse" />
                    <span>No matches found. Try searching for something else.</span>
                  </div>
                ) : (
                  <div className="space-y-0.5">
                    <div className="px-3 py-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                      {query ? 'Search Results' : 'Recent Collections & Presets'}
                    </div>
                    {results.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleSelectItem(item)}
                        className="w-full text-left px-3 py-2.5 rounded-xl flex items-center gap-3 hover:bg-secondary transition-all cursor-pointer group"
                      >
                        <div className="w-7 h-7 rounded-lg bg-secondary/80 flex items-center justify-center border border-border/40 group-hover:bg-card">
                          {getIcon(item.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium truncate text-foreground">{item.title}</div>
                          <div className="text-xs text-muted-foreground truncate">{item.subtitle}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer hotkeys */}
              <div className="px-4 py-2 bg-secondary/40 border-t border-border flex items-center justify-between text-[11px] text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <span className="px-1 rounded bg-card border border-border">↑↓</span> to navigate
                  <span className="px-1 rounded bg-card border border-border ml-1">Enter</span> to select
                </span>
                <span>
                  Press <span className="px-1 rounded bg-card border border-border font-semibold font-mono">ESC</span> to close
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

export default CommandPalette;
