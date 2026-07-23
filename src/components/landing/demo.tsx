"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Sparkles, FileText, Brain, HelpCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function Demo() {
  const [activeTab, setActiveTab] = useState<'summary' | 'mindmap' | 'quiz'>('summary');

  return (
    <section id="demo" className="py-20 max-w-7xl mx-auto px-6 border-t border-border/40 relative">
      <div className="text-center space-y-3 mb-12">
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">Interactive Workspace</h2>
        <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
          Explore the workspace layout. Switch between study tabs below to see it in action.
        </p>
      </div>

      {/* Mini Dashboard Container */}
      <div className="w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 bg-card border border-border rounded-3xl p-4 sm:p-6 shadow-2xl overflow-hidden relative">
        
        {/* Background glow inside the demo */}
        <div className="absolute -top-1/4 -right-1/4 w-[300px] h-[300px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        {/* LEFT: Video Player Mockup (4 cols) */}
        <div className="lg:col-span-5 flex flex-col space-y-4">
          <div className="relative aspect-video w-full bg-secondary border border-border/40 rounded-2xl overflow-hidden flex items-center justify-center group shadow-inner select-none">
            <img
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80"
              alt="Video Thumbnail Mock"
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-all group-hover:bg-black/50">
              <div className="w-14 h-14 rounded-full bg-primary hover:scale-105 flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/30 transition-transform cursor-pointer">
                <Play className="w-6 h-6 fill-current ml-0.5" />
              </div>
            </div>
            <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/75 rounded text-[10px] font-bold text-white tracking-widest">
              2:24:13
            </div>
          </div>

          <div className="space-y-2 px-1">
            <h4 className="font-bold text-base leading-snug">
              Intro to Neural Networks & Backpropagation from First Principles
            </h4>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span>Andrej Karpathy</span>
              <span>•</span>
              <span>4.1M views</span>
            </div>
          </div>
        </div>

        {/* RIGHT: Study Suite Tabs (7 cols) */}
        <div className="lg:col-span-7 border border-border/40 bg-secondary/15 rounded-2xl flex flex-col h-[320px] sm:h-[350px]">
          
          {/* Tab selectors */}
          <div className="flex border-b border-border py-2 px-3 gap-1 select-none">
            <button
              onClick={() => setActiveTab('summary')}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 cursor-pointer transition-all ${
                activeTab === 'summary' 
                  ? 'bg-card text-foreground shadow-sm border border-border/40' 
                  : 'text-muted-foreground hover:bg-secondary/40 hover:text-foreground'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-indigo-500" />
              Summary
            </button>
            <button
              onClick={() => setActiveTab('mindmap')}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 cursor-pointer transition-all ${
                activeTab === 'mindmap' 
                  ? 'bg-card text-foreground shadow-sm border border-border/40' 
                  : 'text-muted-foreground hover:bg-secondary/40 hover:text-foreground'
              }`}
            >
              <Brain className="w-3.5 h-3.5 text-emerald-500" />
              Mind Map
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 cursor-pointer transition-all ${
                activeTab === 'quiz' 
                  ? 'bg-card text-foreground shadow-sm border border-border/40' 
                  : 'text-muted-foreground hover:bg-secondary/40 hover:text-foreground'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
              Interactive Quiz
            </button>
          </div>

          {/* Tab content panel */}
          <div className="flex-1 p-5 overflow-y-auto text-xs leading-relaxed">
            <AnimatePresence mode="wait">
              {activeTab === 'summary' && (
                <motion.div
                  key="summary"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-border/30 pb-2">
                    <span className="font-bold text-sm">AI Summary Highlights</span>
                    <span className="px-2 py-0.5 rounded bg-primary/10 text-primary font-bold text-[10px]">Detailed Mode</span>
                  </div>
                  <ul className="space-y-3 list-disc pl-4 text-muted-foreground">
                    <li>Builds a Python automatic differentiation engine (<code className="px-1 rounded bg-secondary text-primary">micrograd</code>) dynamically.</li>
                    <li>Explains math derivations of derivatives and calculations of complex equations step-by-step.</li>
                    <li>Uses recursive topological sorting to correctly schedule nodes for backward passes.</li>
                    <li>Builds full Multi-Layer Perceptron (MLP) layers and trains w/ gradient descent.</li>
                  </ul>
                </motion.div>
              )}

              {activeTab === 'mindmap' && (
                <motion.div
                  key="mindmap"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="h-full flex flex-col items-center justify-center py-4 select-none"
                >
                  {/* Simplified SVG Map preview */}
                  <svg className="w-full max-w-[340px] h-auto overflow-visible" viewBox="0 0 300 160">
                    <g stroke="var(--border)" strokeWidth="1.5">
                      <line x1="150" y1="30" x2="60" y2="90" />
                      <line x1="150" y1="30" x2="150" y2="95" />
                      <line x1="150" y1="30" x2="240" y2="90" />
                    </g>
                    
                    {/* Root Node */}
                    <rect x="90" y="10" width="120" height="30" rx="6" fill="var(--card)" stroke="var(--primary)" strokeWidth="1.5" />
                    <text x="150" y="28" textAnchor="middle" fill="var(--foreground)" className="font-bold text-[10px]">Neural Networks</text>
                    
                    {/* Leaf Nodes */}
                    <rect x="15" y="80" width="90" height="25" rx="6" fill="var(--card)" stroke="var(--border)" />
                    <text x="60" y="95" textAnchor="middle" fill="var(--muted-foreground)" className="text-[9px]">1. Derivatives</text>
                    
                    <rect x="110" y="85" width="80" height="25" rx="6" fill="var(--card)" stroke="var(--border)" />
                    <text x="150" y="100" textAnchor="middle" fill="var(--muted-foreground)" className="text-[9px]">2. Micrograd</text>
                    
                    <rect x="200" y="80" width="85" height="25" rx="6" fill="var(--card)" stroke="var(--border)" />
                    <text x="242" y="95" textAnchor="middle" fill="var(--muted-foreground)" className="text-[9px]">3. MLP Model</text>
                  </svg>
                  <span className="text-[10px] text-muted-foreground mt-4">Zoom, drag, and expand/collapse subtrees in active view</span>
                </motion.div>
              )}

              {activeTab === 'quiz' && (
                <motion.div
                  key="quiz"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase">Multiple Choice Question</span>
                    <h5 className="font-bold text-sm leading-snug">Why do we need a topological sort before running the backward autograd pass?</h5>
                  </div>
                  <div className="space-y-1.5 select-none">
                    <div className="p-2.5 rounded-xl bg-card border border-border text-foreground hover:bg-secondary/40 transition-colors cursor-pointer flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full border border-border/80 flex items-center justify-center text-[8px] font-bold">A</div>
                      <span>To speed up computational complexity from O(N) to O(log N).</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-primary/10 border border-primary text-primary font-medium flex items-center gap-2 cursor-pointer">
                      <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center text-[8px] font-bold text-white">B</div>
                      <span>Ensure each node evaluates only after downstream parents are complete.</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Floating CTA underneath Demo */}
      <div className="text-center mt-12">
        <Link
          href="/home"
          className="inline-flex items-center gap-2 px-6 py-3 bg-secondary hover:bg-secondary/80 border border-border text-foreground font-semibold rounded-2xl text-sm transition-all hover:scale-[1.02] cursor-pointer shadow-sm shadow-border/40"
        >
          Try Workspace Interactive Suite
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}

export default Demo;
