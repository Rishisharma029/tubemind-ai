"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { VideoAnalysis, PRESET_VIDEOS, generateDynamicMock } from '@/lib/mock-data';
import { toast } from 'sonner';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface Collection {
  id: string;
  name: string;
  videoIds: string[];
}

export interface WorkspaceContextType {
  history: VideoAnalysis[];
  activeVideo: VideoAnalysis;
  isAnalyzing: boolean;
  analysisStep: string;
  analysisProgress: number;
  notes: Record<string, string>; // videoId -> markdown notes
  pinnedVideos: string[];
  bookmarkedFlashcards: string[]; // flashcardId list
  chatHistories: Record<string, ChatMessage[]>; // videoId -> messages
  collections: Collection[];
  streak: number;
  studyTime: number; // in seconds
  achievements: string[];
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  analyzeVideo: (url: string) => Promise<void>;
  setActiveVideoById: (id: string) => void;
  updateNotes: (videoId: string, content: string) => void;
  togglePinVideo: (videoId: string) => void;
  toggleBookmarkFlashcard: (cardId: string) => void;
  addChatMessage: (videoId: string, role: 'user' | 'assistant', content: string) => void;
  createCollection: (name: string) => void;
  addVideoToCollection: (collectionId: string, videoId: string) => void;
  incrementStudyTime: (seconds: number) => void;
  resetProgress: () => void;
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
  // Theme state
  const [theme, setThemeState] = useState<'light' | 'dark' | 'system'>('dark');

  // Core study states
  const [history, setHistory] = useState<VideoAnalysis[]>([]);
  const [activeVideo, setActiveVideo] = useState<VideoAnalysis>(PRESET_VIDEOS['karpathy-nn']);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState('');
  const [analysisProgress, setAnalysisProgress] = useState(0);

  // User generated states
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [pinnedVideos, setPinnedVideos] = useState<string[]>([]);
  const [bookmarkedFlashcards, setBookmarkedFlashcards] = useState<string[]>([]);
  const [chatHistories, setChatHistories] = useState<Record<string, ChatMessage[]>>({});
  const [collections, setCollections] = useState<Collection[]>([]);

  // Gamification & analytics states
  const [streak, setStreak] = useState(1);
  const [studyTime, setStudyTime] = useState(0);
  const [achievements, setAchievements] = useState<string[]>([]);

  // Load initial local states on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Theme
      const savedTheme = localStorage.getItem('tubemind-theme') as 'light' | 'dark' | 'system';
      if (savedTheme) {
        setThemeState(savedTheme);
      } else {
        setThemeState('dark');
      }

      // History
      const savedHistory = localStorage.getItem('tubemind-history');
      if (savedHistory) {
        try {
          const parsed = JSON.parse(savedHistory);
          setHistory(parsed);
          if (parsed.length > 0) {
            setActiveVideo(parsed[0]);
          } else {
            setHistory([PRESET_VIDEOS['karpathy-nn'], PRESET_VIDEOS['next15-course']]);
          }
        } catch (e) {
          // fallback
          setHistory([PRESET_VIDEOS['karpathy-nn'], PRESET_VIDEOS['next15-course']]);
        }
      } else {
        setHistory([PRESET_VIDEOS['karpathy-nn'], PRESET_VIDEOS['next15-course']]);
      }

      // Notes
      const savedNotes = localStorage.getItem('tubemind-notes');
      if (savedNotes) {
        try { setNotes(JSON.parse(savedNotes)); } catch (e) {}
      }

      // Pinned
      const savedPinned = localStorage.getItem('tubemind-pinned');
      if (savedPinned) {
        try { setPinnedVideos(JSON.parse(savedPinned)); } catch (e) {}
      }

      // Bookmarks
      const savedBookmarks = localStorage.getItem('tubemind-bookmarks');
      if (savedBookmarks) {
        try { setBookmarkedFlashcards(JSON.parse(savedBookmarks)); } catch (e) {}
      }

      // Chat history
      const savedChats = localStorage.getItem('tubemind-chats');
      if (savedChats) {
        try { setChatHistories(JSON.parse(savedChats)); } catch (e) {}
      }

      // Streak & Study Time
      const savedStreak = localStorage.getItem('tubemind-streak');
      if (savedStreak) setStreak(Number(savedStreak));
      const savedStudy = localStorage.getItem('tubemind-studytime');
      if (savedStudy) setStudyTime(Number(savedStudy));

      const savedAchievements = localStorage.getItem('tubemind-achievements');
      if (savedAchievements) {
        try { setAchievements(JSON.parse(savedAchievements)); } catch (e) {}
      }
    }
  }, []);

  // Sync theme to DOM
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const root = window.document.documentElement;
      root.classList.remove('light', 'dark');

      if (theme === 'system') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        root.classList.add(systemTheme);
      } else {
        root.classList.add(theme);
      }
      localStorage.setItem('tubemind-theme', theme);
    }
  }, [theme]);

  // Streak update on new day simulation
  useEffect(() => {
    localStorage.setItem('tubemind-streak', streak.toString());
  }, [streak]);

  // Helper to trigger theme
  const setTheme = (t: 'light' | 'dark' | 'system') => {
    setThemeState(t);
  };

  const updateNotes = (videoId: string, content: string) => {
    setNotes((prev) => {
      const next = { ...prev, [videoId]: content };
      localStorage.setItem('tubemind-notes', JSON.stringify(next));
      return next;
    });
  };

  const togglePinVideo = (videoId: string) => {
    setPinnedVideos((prev) => {
      const next = prev.includes(videoId)
        ? prev.filter((id) => id !== videoId)
        : [...prev, videoId];
      localStorage.setItem('tubemind-pinned', JSON.stringify(next));
      toast.success(prev.includes(videoId) ? "Video unpinned" : "Video pinned to shortcuts");
      return next;
    });
  };

  const toggleBookmarkFlashcard = (cardId: string) => {
    setBookmarkedFlashcards((prev) => {
      const next = prev.includes(cardId)
        ? prev.filter((id) => id !== cardId)
        : [...prev, cardId];
      localStorage.setItem('tubemind-bookmarks', JSON.stringify(next));
      return next;
    });
  };

  const addChatMessage = (videoId: string, role: 'user' | 'assistant', content: string) => {
    setChatHistories((prev) => {
      const current = prev[videoId] || [];
      const newMessage: ChatMessage = {
        id: Math.random().toString(36).substring(7),
        role,
        content,
        timestamp: new Date(),
      };
      const next = { ...prev, [videoId]: [...current, newMessage] };
      localStorage.setItem('tubemind-chats', JSON.stringify(next));
      return next;
    });
  };

  const setActiveVideoById = (id: string) => {
    const found = history.find(v => v.id === id) || PRESET_VIDEOS[id];
    if (found) {
      setActiveVideo(found);
    }
  };

  const createCollection = (name: string) => {
    setCollections((prev) => {
      const newColl: Collection = {
        id: Math.random().toString(36).substring(7),
        name,
        videoIds: []
      };
      const next = [...prev, newColl];
      toast.success(`Created collection: ${name}`);
      return next;
    });
  };

  const addVideoToCollection = (collectionId: string, videoId: string) => {
    setCollections((prev) => {
      const next = prev.map(c => {
        if (c.id === collectionId && !c.videoIds.includes(videoId)) {
          return { ...c, videoIds: [...c.videoIds, videoId] };
        }
        return c;
      });
      toast.success("Added to collection");
      return next;
    });
  };

  const incrementStudyTime = (seconds: number) => {
    setStudyTime((prev) => {
      const next = prev + seconds;
      localStorage.setItem('tubemind-studytime', next.toString());

      // Unlock achievements
      if (next >= 300 && !achievements.includes('study-5m')) {
        unlockAchievement('study-5m', '🔥 Study Scholar', 'Studied for 5 minutes total');
      }
      if (next >= 900 && !achievements.includes('study-15m')) {
        unlockAchievement('study-15m', '🧠 Mega Mind', 'Studied for 15 minutes total');
      }
      return next;
    });
  };

  const unlockAchievement = (id: string, name: string, description: string) => {
    setAchievements((prev) => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      localStorage.setItem('tubemind-achievements', JSON.stringify(next));
      toast.success(`Achievement Unlocked: ${name} (${description})`, {
        icon: '🏆',
        duration: 5000,
      });
      return next;
    });
  };

  const resetProgress = () => {
    localStorage.clear();
    setHistory([PRESET_VIDEOS['karpathy-nn'], PRESET_VIDEOS['next15-course']]);
    setActiveVideo(PRESET_VIDEOS['karpathy-nn']);
    setNotes({});
    setPinnedVideos([]);
    setBookmarkedFlashcards([]);
    setChatHistories({});
    setStreak(1);
    setStudyTime(0);
    setAchievements([]);
    toast.info("Workspace resetting complete");
  };

  const analyzeVideo = async (url: string) => {
    if (!url || !url.trim().startsWith('http')) {
      toast.error("Please enter a valid URL");
      return;
    }

    setIsAnalyzing(true);
    setAnalysisProgress(0);

    const steps = [
      { msg: 'Connecting to YouTube API...', duration: 800, progress: 15 },
      { msg: 'Extracting video transcript details...', duration: 1200, progress: 40 },
      { msg: 'Translating concepts and generating Summary...', duration: 1000, progress: 65 },
      { msg: 'Structuring Notes & Quiz Questions...', duration: 800, progress: 85 },
      { msg: 'Rendering interactive Mind Map...', duration: 600, progress: 100 }
    ];

    for (const step of steps) {
      setAnalysisStep(step.msg);
      await new Promise(resolve => setTimeout(resolve, step.duration));
      setAnalysisProgress(step.progress);
    }

    // Fetch real YouTube oEmbed metadata if available
    let oembedData: { title?: string; author_name?: string; thumbnail_url?: string } = {};
    try {
      const res = await fetch(`https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`);
      if (res.ok) {
        oembedData = await res.json();
      }
    } catch (e) {
      console.warn('oEmbed fetch error:', e);
    }

    // Check if preset, otherwise generate dynamic
    let targetVideo: VideoAnalysis;
    if (url.includes('VMj-3S1tku0')) {
      targetVideo = PRESET_VIDEOS['karpathy-nn'];
    } else if (url.toLowerCase().includes('next')) {
      targetVideo = PRESET_VIDEOS['next15-course'];
    } else {
      targetVideo = generateDynamicMock(url, {
        title: oembedData.title,
        channel: oembedData.author_name,
        thumbnail: oembedData.thumbnail_url
      });
    }

    setHistory((prev) => {
      const exists = prev.some((v) => v.id === targetVideo.id);
      const next = exists ? prev : [targetVideo, ...prev];
      localStorage.setItem('tubemind-history', JSON.stringify(next));
      return next;
    });

    setActiveVideo(targetVideo);
    setIsAnalyzing(false);
    toast.success("AI Video Analysis Complete!", {
      description: targetVideo.title,
    });

    // Award unlock
    if (!achievements.includes('first-analysis')) {
      unlockAchievement('first-analysis', '🎓 Explorer', 'Analyzed your first YouTube video');
    }
  };

  return (
    <WorkspaceContext.Provider
      value={{
        history,
        activeVideo,
        isAnalyzing,
        analysisStep,
        analysisProgress,
        notes,
        pinnedVideos,
        bookmarkedFlashcards,
        chatHistories,
        collections,
        streak,
        studyTime,
        achievements,
        theme,
        setTheme,
        analyzeVideo,
        setActiveVideoById,
        updateNotes,
        togglePinVideo,
        toggleBookmarkFlashcard,
        addChatMessage,
        createCollection,
        addVideoToCollection,
        incrementStudyTime,
        resetProgress
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error('useWorkspace must be used within WorkspaceProvider');
  }
  return context;
}
