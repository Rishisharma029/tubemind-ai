"use client";

import React, { useState, useEffect } from 'react';
import { FileText, Save, Clock, Eye, Edit2, RotateCcw } from 'lucide-react';
import { useWorkspace } from '@/context/workspace-context';
import { toast } from 'sonner';

interface NotesPanelProps {
  videoId: string;
  defaultNotes: string;
}

export function NotesPanel({ videoId, defaultNotes }: NotesPanelProps) {
  const { notes, updateNotes } = useWorkspace();
  const [content, setContent] = useState('');
  const [isEditing, setIsEditing] = useState(true);
  
  // Versions backup list
  const [versions, setVersions] = useState<{ id: string; timestamp: string; content: string }[]>([]);

  // Sync initial notes
  useEffect(() => {
    const currentNotes = notes[videoId] || defaultNotes;
    setContent(currentNotes);

    // Initial versioning
    setVersions([
      { id: 'v1', timestamp: 'Initial draft', content: defaultNotes },
      { id: 'v2', timestamp: '5 mins ago', content: currentNotes }
    ]);
  }, [videoId, defaultNotes, notes]);

  // Handle typing & autosave
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setContent(val);
    updateNotes(videoId, val);
  };

  const handleSave = () => {
    updateNotes(videoId, content);
    
    // Add version
    const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setVersions(prev => [
      { id: Math.random().toString(36).substring(7), timestamp: `Saved at ${nowStr}`, content },
      ...prev.slice(0, 4) // keep last 5
    ]);
    
    toast.success("Notes saved and backed up successfully!");
  };

  const handleRestore = (verContent: string) => {
    setContent(verContent);
    updateNotes(videoId, verContent);
    toast.info("Notes restored from backup version.");
  };

  return (
    <div className="h-full flex flex-col space-y-4">
      {/* HEADER */}
      <div className="flex items-center justify-between border-b border-border/60 pb-3">
        <div className="space-y-1">
          <h3 className="font-bold text-sm text-foreground flex items-center gap-2">
            <FileText className="w-4 h-4 text-emerald-500" />
            Study Notes & Annotations
          </h3>
          <p className="text-[10px] text-muted-foreground">Autosaves to local workspace storage.</p>
        </div>

        <div className="flex items-center gap-2 select-none">
          {/* Mode Switch */}
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-3 py-1.5 rounded-lg bg-secondary text-[11px] font-semibold text-foreground hover:bg-secondary/80 flex items-center gap-1.5 cursor-pointer"
          >
            {isEditing ? (
              <>
                <Eye className="w-3.5 h-3.5 text-muted-foreground" />
                Preview Mode
              </>
            ) : (
              <>
                <Edit2 className="w-3.5 h-3.5 text-muted-foreground" />
                Editor Mode
              </>
            )}
          </button>

          <button
            onClick={handleSave}
            className="p-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl flex items-center justify-center cursor-pointer transition-colors shadow shadow-primary/10"
          >
            <Save className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* CORE SPLIT WRAPPER */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4 items-stretch min-h-[300px]">
        {/* Editor or Preview Pane (3 cols) */}
        <div className="md:col-span-3 flex flex-col border border-border bg-card rounded-2xl overflow-hidden">
          {isEditing ? (
            <textarea
              value={content}
              onChange={handleChange}
              placeholder="Start drafting study notes. Supports Markdown..."
              className="flex-1 p-5 bg-transparent border-0 outline-none resize-none text-xs font-mono leading-relaxed text-foreground placeholder:text-muted-foreground"
            />
          ) : (
            <div className="flex-1 p-5 overflow-y-auto prose dark:prose-invert max-w-none text-xs leading-relaxed space-y-4">
              {/* Very basic markdown parser block */}
              {content ? (
                content.split('\n').map((line, idx) => {
                  if (line.startsWith('# ')) {
                    return <h1 key={idx} className="text-lg font-extrabold text-foreground border-b border-border/30 pb-1 pt-2">{line.slice(2)}</h1>;
                  }
                  if (line.startsWith('## ')) {
                    return <h2 key={idx} className="text-sm font-bold text-foreground pt-1">{line.slice(3)}</h2>;
                  }
                  if (line.startsWith('> ')) {
                    return <blockquote key={idx} className="border-l-2 border-primary/50 pl-3 italic text-muted-foreground my-2">{line.slice(2)}</blockquote>;
                  }
                  if (line.trim().startsWith('```')) {
                    return null; // hide fences in simple parser
                  }
                  return <p key={idx} className="text-foreground/90">{line}</p>;
                })
              ) : (
                <div className="text-center text-muted-foreground py-10">Notes block is empty.</div>
              )}
            </div>
          )}
        </div>

        {/* Backups Panel (1 col) */}
        <div className="p-4 bg-secondary/20 border border-border/50 rounded-2xl space-y-4 flex flex-col justify-between">
          <div className="space-y-3.5">
            <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              Backup History
            </h4>
            
            <div className="space-y-1.5">
              {versions.map((ver) => (
                <div
                  key={ver.id}
                  className="p-2.5 rounded-xl bg-card border border-border/50 flex items-center justify-between text-[10px] hover:border-border transition-colors select-none"
                >
                  <span className="truncate max-w-[80px] font-medium text-foreground">{ver.timestamp}</span>
                  <button
                    onClick={() => handleRestore(ver.content)}
                    className="p-1 hover:bg-secondary rounded text-primary cursor-pointer"
                    title="Restore version"
                  >
                    <RotateCcw className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="text-[9px] text-muted-foreground">
            Saves automatically upon navigating panels.
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotesPanel;
