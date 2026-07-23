"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Sparkles, ArrowRight, Video, FileText, Brain, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useWorkspace } from '@/context/workspace-context';

export function Hero() {
  const router = useRouter();
  const { analyzeVideo } = useWorkspace();
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    setLoading(true);
    await analyzeVideo(url);
    setLoading(false);
    router.push('/dashboard');
  };

  // Pre-generate random coordinate variables for particles
  const particles = [
    { x: [50, 100, 50], y: [100, 300, 100], delay: 0 },
    { x: [300, 250, 300], y: [200, 50, 200], delay: 1.5 },
    { x: [80, 200, 80], y: [400, 200, 400], delay: 3 },
    { x: [500, 400, 500], y: [150, 350, 150], delay: 0.5 },
    { x: [450, 300, 450], y: [450, 150, 450], delay: 2.2 },
  ];

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden pt-12 pb-16">
      {/* Dynamic Glowing orb */}
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[320px] sm:w-[600px] h-[320px] sm:h-[600px] bg-primary/10 rounded-full blur-[100px] pointer-events-none animate-pulse-glow" />

      {/* Floating AI Particles */}
      <div className="absolute inset-0 pointer-events-none hidden sm:block">
        {particles.map((p, i) => (
          <motion.div
            key={i}
            animate={{
              x: p.x,
              y: p.y,
            }}
            transition={{
              duration: 10 + i * 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: p.delay,
            }}
            className="absolute w-3 h-3 rounded-full bg-primary/30 border border-primary/20 blur-[1px]"
            style={{ left: `${20 + i * 15}%`, top: `${15 + i * 12}%` }}
          />
        ))}
      </div>

      <div className="w-full max-w-4xl mx-auto space-y-8 z-10 relative">
        {/* Top Ticker Pill */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/80 border border-border text-xs font-semibold text-muted-foreground select-none"
        >
          <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
          <span>Next-Gen Autograd Video Synthesizer</span>
        </motion.div>

        {/* Heading */}
        <div className="space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.1] text-foreground"
          >
            Transform YouTube into <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-primary via-indigo-500 to-indigo-400 bg-clip-text text-transparent">
              Interactive Study Suites
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-muted-foreground text-base sm:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Paste any YouTube URL. Our AI builds styled summaries, flippable flashcards, interactive quizzes, custom SVG mind maps, code run blocks, and live chats instantly.
          </motion.p>
        </div>

        {/* URL Input Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="w-full max-w-2xl mx-auto"
        >
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-2 bg-card/60 backdrop-blur-md p-2 rounded-2xl border border-border shadow-xl w-full"
          >
            <div className="flex-1 flex items-center gap-3 px-3 py-2">
              <Play className="w-4 h-4 text-muted-foreground shrink-0" />
              <input
                type="text"
                placeholder="Paste YouTube video URL (e.g., https://www.youtube.com/...)"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                disabled={loading}
                className="w-full bg-transparent border-0 outline-none text-sm text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-primary hover:bg-primary/95 text-primary-foreground font-semibold rounded-xl text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-primary/20 shrink-0"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  Analyze Video
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </motion.div>

        {/* Small Presets Hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex items-center justify-center gap-3 text-xs text-muted-foreground flex-wrap select-none"
        >
          <span>Try a preset:</span>
          <button
            onClick={() => {
              setUrl('https://www.youtube.com/watch?v=VMj-3S1tku0');
              toast.info('Autofilled Andrej Karpathy Autograd Video');
            }}
            className="px-2.5 py-1 rounded bg-secondary hover:bg-secondary/80 border border-border transition-colors cursor-pointer"
          >
            Karpathy Micrograd
          </button>
          <button
            onClick={() => {
              setUrl('https://www.youtube.com/watch?v=Next15Course');
              toast.info('Autofilled Next.js 15 Crash Course');
            }}
            className="px-2.5 py-1 rounded bg-secondary hover:bg-secondary/80 border border-border transition-colors cursor-pointer"
          >
            Next.js 15 Course
          </button>
        </motion.div>

        {/* Features Preview Blocks */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto pt-8 border-t border-border/40"
        >
          <div className="flex items-center gap-3 p-3 bg-secondary/35 border border-border/20 rounded-2xl text-left">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center shrink-0">
              <FileText className="w-4 h-4 text-indigo-500" />
            </div>
            <div>
              <div className="text-xs font-bold">Auto-Notes</div>
              <div className="text-[10px] text-muted-foreground">Markdown formatted</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-secondary/35 border border-border/20 rounded-2xl text-left">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
              <Brain className="w-4 h-4 text-emerald-500" />
            </div>
            <div>
              <div className="text-xs font-bold">Mind Maps</div>
              <div className="text-[10px] text-muted-foreground">Interactive SVG graphs</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-secondary/35 border border-border/20 rounded-2xl text-left">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0">
              <HelpCircle className="w-4 h-4 text-amber-500" />
            </div>
            <div>
              <div className="text-xs font-bold">Adaptive Quizzes</div>
              <div className="text-[10px] text-muted-foreground">Perfect score confetti</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-secondary/35 border border-border/20 rounded-2xl text-left">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center shrink-0">
              <Video className="w-4 h-4 text-purple-500" />
            </div>
            <div>
              <div className="text-xs font-bold">Synced Timeline</div>
              <div className="text-[10px] text-muted-foreground">Interactive chapter scrub</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Toast fallback helper
const toast = {
  info: (msg: string) => {
    import('sonner').then(({ toast: sonnerToast }) => sonnerToast.info(msg));
  }
};
export default Hero;
