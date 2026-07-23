"use client";

import React, { useState } from 'react';
import { Share2, Send, Copy, Check } from 'lucide-react';
import { toast } from 'sonner';

interface SocialPanelProps {
  linkedin: {
    professional: string;
    funny: string;
    startup: string;
    developer: string;
  };
  twitter: string[];
}

export function SocialPanel({ linkedin, twitter }: SocialPanelProps) {
  const [platform, setPlatform] = useState<'linkedin' | 'twitter'>('linkedin');
  const [liStyle, setLiStyle] = useState<'professional' | 'funny' | 'startup' | 'developer'>('professional');
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const getLinkedinContent = () => {
    return linkedin[liStyle];
  };

  const handleCopyLinkedin = () => {
    navigator.clipboard.writeText(getLinkedinContent());
    toast.success("LinkedIn post copied to clipboard!");
  };

  const handleCopyTweet = (tweet: string, idx: number) => {
    navigator.clipboard.writeText(tweet);
    setCopiedIdx(idx);
    toast.success(`Tweet ${idx + 1} copied!`);
    setTimeout(() => setCopiedIdx(null), 1500);
  };

  const handleCopyAllTweets = () => {
    const thread = twitter.join('\n\n');
    navigator.clipboard.writeText(thread);
    toast.success("Full Twitter thread copied!");
  };

  return (
    <div className="space-y-6">
      
      {/* HEADER PLATFORM SWITCHER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-3 select-none">
        <div className="space-y-1">
          <h3 className="font-bold text-sm text-foreground flex items-center gap-2">
            <Share2 className="w-4.5 h-4.5 text-pink-500" />
            Social Copywriter & Threads
          </h3>
          <p className="text-[10px] text-muted-foreground">Select social platform for publishing templates.</p>
        </div>

        {/* Toggles */}
        <div className="flex items-center p-1 bg-secondary rounded-xl border border-border select-none shrink-0">
          <button
            onClick={() => setPlatform('linkedin')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 cursor-pointer transition-all ${
              platform === 'linkedin' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Share2 className="w-3.5 h-3.5 text-primary" />
            LinkedIn Post
          </button>
          <button
            onClick={() => setPlatform('twitter')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 cursor-pointer transition-all ${
              platform === 'twitter' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Send className="w-3.5 h-3.5 text-sky-500" />
            Twitter Thread
          </button>
        </div>
      </div>

      {platform === 'linkedin' ? (
        /* LINKEDIN PANEL */
        <div className="space-y-4">
          {/* Style Selector Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1 bg-secondary rounded-xl border border-border select-none">
            {(['professional', 'funny', 'startup', 'developer'] as const).map((style) => (
              <button
                key={style}
                onClick={() => setLiStyle(style)}
                className={`py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  liStyle === style 
                    ? 'bg-card text-foreground shadow-sm border border-border/30' 
                    : 'text-muted-foreground hover:bg-secondary/40 hover:text-foreground'
                }`}
              >
                {style}
              </button>
            ))}
          </div>

          {/* Card post */}
          <div className="p-6 bg-card border border-border rounded-2xl flex flex-col justify-between min-h-[160px] relative group">
            <p className="text-xs leading-relaxed text-foreground/90 whitespace-pre-line pr-8">
              {getLinkedinContent()}
            </p>
            
            <button
              onClick={handleCopyLinkedin}
              className="absolute top-4 right-4 p-2 bg-secondary/80 border border-border/60 text-muted-foreground hover:text-foreground rounded-xl cursor-pointer hover:bg-secondary"
              title="Copy to clipboard"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* TWITTER THREAD PANEL */
        <div className="space-y-4">
          <div className="flex items-center justify-between select-none">
            <span className="text-[10px] font-bold text-muted-foreground uppercase">
              Thread Preview ({twitter.length} tweets)
            </span>
            <button
              onClick={handleCopyAllTweets}
              className="px-3 py-1.5 rounded-lg bg-secondary text-[10px] font-bold uppercase hover:bg-secondary/80 text-foreground cursor-pointer select-none"
            >
              Copy Full Thread
            </button>
          </div>

          <div className="space-y-4 relative border-l border-border pl-6 ml-3.5">
            {twitter.map((tweet, idx) => (
              <div key={idx} className="relative group">
                {/* Connector Node */}
                <div className="absolute -left-[30px] top-2.5 w-3 h-3 rounded-full bg-secondary border border-border flex items-center justify-center text-[7px] font-bold text-muted-foreground select-none">
                  {idx + 1}
                </div>

                {/* Tweet Card */}
                <div className="p-4 bg-card border border-border rounded-2xl flex flex-col justify-between relative">
                  <p className="text-xs leading-relaxed text-foreground/90 pr-8">{tweet}</p>

                  <div className="flex items-center justify-between border-t border-border/20 mt-3 pt-2 text-[9px] text-muted-foreground font-semibold select-none">
                    <span>{tweet.length} / 280 characters</span>
                    <button
                      onClick={() => handleCopyTweet(tweet, idx)}
                      className="p-1 hover:bg-secondary rounded text-primary cursor-pointer flex items-center gap-1"
                    >
                      {copiedIdx === idx ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      {copiedIdx === idx ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}

export default SocialPanel;
