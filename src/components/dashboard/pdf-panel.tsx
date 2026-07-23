"use client";

import React, { useState } from 'react';
import { FileText, Download, Check, FileCheck2, Sparkles } from 'lucide-react';
import { VideoAnalysis } from '@/lib/mock-data';
import { toast } from 'sonner';

interface PDFPanelProps {
  video: VideoAnalysis;
}

export function PDFPanel({ video }: PDFPanelProps) {
  const [sections, setSections] = useState({
    summary: true,
    notes: true,
    quiz: false,
    timeline: false
  });
  const [isCompiling, setIsCompiling] = useState(false);

  const handleToggle = (key: keyof typeof sections) => {
    setSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleDownloadPDF = async () => {
    setIsCompiling(true);
    toast.info("Assembling selected document sections...");

    // Wait 1.5 seconds for mock render
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Create download trigger
    let fileContent = `==================================================\n`;
    fileContent += `TUBE MIND AI STUDY SUITE COMPILATION\n`;
    fileContent += `==================================================\n\n`;
    fileContent += `Video: ${video.title}\n`;
    fileContent += `Author/Channel: ${video.channel}\n\n`;

    if (sections.summary) {
      fileContent += `--------------------------------------------------\n`;
      fileContent += `AI SUMMARY\n`;
      fileContent += `--------------------------------------------------\n`;
      fileContent += `${video.summary.detailed}\n\n`;
    }
    if (sections.notes) {
      fileContent += `--------------------------------------------------\n`;
      fileContent += `WORKSPACE NOTES\n`;
      fileContent += `--------------------------------------------------\n`;
      fileContent += `${video.notes}\n\n`;
    }
    if (sections.quiz) {
      fileContent += `--------------------------------------------------\n`;
      fileContent += `STUDY ASSESSMENT QUIZ\n`;
      fileContent += `--------------------------------------------------\n`;
      video.quiz.forEach((q, idx) => {
        fileContent += `${idx + 1}. [${q.type.toUpperCase()}] ${q.question}\nAnswer: ${q.answer}\nExplanation: ${q.explanation}\n\n`;
      });
    }

    const element = document.createElement("a");
    const file = new Blob([fileContent], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${video.title.substring(0, 15)}_study_pack.txt`;
    document.body.appendChild(element);
    element.click();

    setIsCompiling(false);
    toast.success("Document downloaded successfully!");
  };

  return (
    <div className="space-y-6">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-3 select-none">
        <div className="space-y-1">
          <h3 className="font-bold text-sm text-foreground flex items-center gap-2">
            <FileCheck2 className="w-4.5 h-4.5 text-primary" />
            PDF Export & Study Packs
          </h3>
          <p className="text-[10px] text-muted-foreground">Select sections, preview page margins, and compile compilation packs.</p>
        </div>
      </div>

      {/* CORE SPLIT GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        
        {/* Left Side: Checkboxes Configuration (1 col) */}
        <div className="p-4 bg-secondary/30 border border-border rounded-2xl space-y-4 flex flex-col justify-between select-none">
          <div className="space-y-3.5">
            <span className="text-[9px] font-bold text-muted-foreground uppercase">Choose Sections</span>
            
            <div className="space-y-2">
              {(['summary', 'notes', 'quiz', 'timeline'] as const).map((key) => (
                <button
                  key={key}
                  onClick={() => handleToggle(key)}
                  className="w-full flex items-center justify-between p-3 rounded-xl border border-border bg-card text-xs hover:border-border/80 cursor-pointer"
                >
                  <span className="capitalize">{key}</span>
                  <div className={`w-4.5 h-4.5 rounded-md border flex items-center justify-center transition-all ${
                    sections[key] ? 'bg-primary border-primary text-white' : 'border-border/80'
                  }`}>
                    {sections[key] && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleDownloadPDF}
            disabled={isCompiling}
            className="w-full py-3 bg-primary hover:bg-primary/95 text-primary-foreground font-semibold rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-primary/10"
          >
            {isCompiling ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Compiling Pack...
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                Compile Study Pack
              </>
            )}
          </button>
        </div>

        {/* Right Side: Margins Preview Sheet (2 cols) */}
        <div className="md:col-span-2 border border-border/80 bg-card rounded-2xl overflow-hidden flex flex-col min-h-[300px]">
          {/* Top Preview bar */}
          <div className="bg-secondary/40 px-4 py-2 border-b border-border/60 text-[9px] font-bold text-muted-foreground uppercase tracking-widest select-none">
            Document Layout Shell Preview
          </div>

          {/* Margins Preview content */}
          <div className="flex-1 p-8 space-y-6 overflow-y-auto max-h-[320px] select-text">
            {/* Title Header */}
            <div className="text-center space-y-1.5 border-b border-border/40 pb-4">
              <h1 className="text-sm font-extrabold text-foreground uppercase tracking-wider">{video.title}</h1>
              <p className="text-[9px] text-muted-foreground font-semibold uppercase">TubeMind AI study compiler compilation</p>
            </div>

            {/* Simulated sections preview */}
            <div className="space-y-4 text-[9px] leading-relaxed text-foreground/80">
              {sections.summary && (
                <div className="space-y-1.5">
                  <h4 className="font-bold border-b border-border/30 pb-0.5 text-foreground">1. AI Summary</h4>
                  <p className="text-muted-foreground truncate">{video.summary.short}</p>
                </div>
              )}
              {sections.notes && (
                <div className="space-y-1.5">
                  <h4 className="font-bold border-b border-border/30 pb-0.5 text-foreground">2. Notes annotations</h4>
                  <p className="text-muted-foreground truncate">{video.notes.substring(0, 100)}...</p>
                </div>
              )}
              {sections.quiz && (
                <div className="space-y-1.5">
                  <h4 className="font-bold border-b border-border/30 pb-0.5 text-foreground">3. Quiz Questions</h4>
                  <p className="text-muted-foreground truncate">{video.quiz[0]?.question}</p>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

export default PDFPanel;
