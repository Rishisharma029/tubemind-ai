"use client";

import React from 'react';
import { BookOpen, Code2, FileText, Book, Video, ExternalLink } from 'lucide-react';
import { ResourceLink } from '@/lib/mock-data';

interface ResourcesPanelProps {
  resources: ResourceLink[];
}

export function ResourcesPanel({ resources }: ResourcesPanelProps) {
  
  const getIcon = (cat: ResourceLink['category']) => {
    switch (cat) {
      case 'github': return <Code2 className="w-4 h-4 text-zinc-500" />;
      case 'docs': return <FileText className="w-4 h-4 text-blue-500" />;
      case 'paper': return <BookOpen className="w-4 h-4 text-purple-500" />;
      case 'book': return <Book className="w-4 h-4 text-amber-500" />;
      case 'course': return <Video className="w-4 h-4 text-rose-500" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  const getBadgeStyle = (cat: ResourceLink['category']) => {
    switch (cat) {
      case 'github': return 'bg-zinc-500/10 text-zinc-500';
      case 'docs': return 'bg-blue-500/10 text-blue-500';
      case 'paper': return 'bg-purple-500/10 text-purple-500';
      case 'book': return 'bg-amber-500/10 text-amber-500';
      case 'course': return 'bg-rose-500/10 text-rose-500';
      default: return 'bg-primary/10 text-primary';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* HEADER */}
      <div className="flex items-center justify-between border-b border-border/60 pb-3 select-none">
        <div className="space-y-1">
          <h3 className="font-bold text-sm text-foreground flex items-center gap-2">
            <BookOpen className="w-4.5 h-4.5 text-cyan-500" />
            Curated Bibliography & Resources
          </h3>
          <p className="text-[10px] text-muted-foreground">Auto-extracted reference links, papers, and courses.</p>
        </div>
      </div>

      {/* RESOURCES LIST */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {resources.map((res, idx) => (
          <a
            key={idx}
            href={res.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 bg-card border border-border rounded-2xl shadow-sm hover:shadow-md hover:border-border/80 transition-all flex flex-col justify-between group"
          >
            <div className="space-y-3.5">
              {/* Category Badge & Icon */}
              <div className="flex items-center justify-between select-none">
                <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center border border-border/40">
                  {getIcon(res.category)}
                </div>
                <span className={`px-2.5 py-0.5 rounded-lg text-[9px] font-bold uppercase tracking-wider ${getBadgeStyle(res.category)}`}>
                  {res.category}
                </span>
              </div>

              {/* Title & Description */}
              <div className="space-y-1">
                <h4 className="font-bold text-xs text-foreground group-hover:text-primary transition-colors flex items-center gap-1">
                  {res.title}
                  <ExternalLink className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </h4>
                <p className="text-[10px] text-muted-foreground leading-relaxed pr-2">
                  {res.description}
                </p>
              </div>
            </div>
          </a>
        ))}
      </div>

    </div>
  );
}

export default ResourcesPanel;
