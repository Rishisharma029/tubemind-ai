"use client";

import React, { useState } from 'react';
import { Play, Copy, Download, Code2, AlertTriangle, Check } from 'lucide-react';
import { CodeSnippet } from '@/lib/mock-data';
import { toast } from 'sonner';

interface CodePanelProps {
  snippets: CodeSnippet[];
}

export function CodePanel({ snippets }: CodePanelProps) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [consoleOutput, setConsoleOutput] = useState<string | null>(null);

  const activeSnippet = snippets[selectedIdx];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeSnippet.code);
    toast.success("Code snippet copied to clipboard!");
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([activeSnippet.code], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = activeSnippet.title.toLowerCase().replaceAll(' ', '_') + ".py";
    document.body.appendChild(element);
    element.click();
    toast.success("File download started!");
  };

  const handleRunSimulation = async () => {
    if (isRunning) return;

    setIsRunning(true);
    setConsoleOutput(null);
    toast.info("Initializing sandboxed interpreter environment...");

    // Wait 1.5 seconds for mock compile
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Custom outputs based on snippet contents
    let output = "";
    if (activeSnippet.id === 'k-c1') {
      output = `>>> val1 = Value(3.0)\n>>> val2 = Value(-4.0)\n>>> out = val1 * val2\n>>> print(out)\nValue(data=-12.0, grad=0.0)\n\nProcess completed successfully with code 0`;
    } else if (activeSnippet.id === 'k-c2') {
      output = `>>> g.backward()\n>>> print(val1.grad)\n-4.0\n>>> print(val2.grad)\n3.0\n\nAutograd backprop sync completed in 0.04ms`;
    } else {
      output = `>>> running custom script...\nAnalyzing parsed tokens...\nProcess completed with return code 0`;
    }

    setConsoleOutput(output);
    setIsRunning(false);
    toast.success("Script executed successfully!");
  };

  if (!snippets || snippets.length === 0) {
    return (
      <div className="py-12 border border-dashed border-border/85 rounded-3xl text-center text-xs text-muted-foreground flex flex-col items-center justify-center gap-2 select-none">
        <Code2 className="w-8 h-8 text-muted-foreground/40 animate-pulse" />
        No programming scripts extracted from this video&apos;s transcript.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-3 select-none">
        <div className="space-y-1">
          <h3 className="font-bold text-sm text-foreground flex items-center gap-2">
            <Code2 className="w-4.5 h-4.5 text-emerald-500" />
            Extracted Code Sandbox UI
          </h3>
          <p className="text-[10px] text-muted-foreground">Select code file on the left, copy or execute on the right.</p>
        </div>
      </div>

      {/* CORE GRID LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-stretch">
        
        {/* Left Side: Snippets selector list (1 col) */}
        <div className="space-y-1.5 select-none">
          {snippets.map((sn, idx) => (
            <button
              key={sn.id}
              onClick={() => {
                setSelectedIdx(idx);
                setConsoleOutput(null);
              }}
              className={`w-full text-left p-3 rounded-2xl border text-xs flex flex-col gap-1 transition-all cursor-pointer ${
                selectedIdx === idx 
                  ? 'bg-primary/5 border-primary text-primary font-medium' 
                  : 'bg-card border-border hover:bg-secondary/40'
              }`}
            >
              <span className="truncate">{sn.title}</span>
              <span className="text-[9px] text-muted-foreground uppercase font-bold">{sn.language}</span>
            </button>
          ))}
        </div>

        {/* Right Side: Code View + Simulator Console (3 cols) */}
        <div className="lg:col-span-3 flex flex-col space-y-4">
          
          {/* Main Code block container */}
          <div className="border border-border bg-secondary/20 rounded-2xl overflow-hidden relative">
            
            {/* Top Info Bar */}
            <div className="flex items-center justify-between bg-card px-4 py-2 border-b border-border text-[10px] text-muted-foreground font-semibold select-none">
              <span>{activeSnippet.title} ({activeSnippet.language})</span>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="p-1 hover:bg-secondary text-muted-foreground hover:text-foreground rounded cursor-pointer"
                  title="Copy Code"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={handleDownload}
                  className="p-1 hover:bg-secondary text-muted-foreground hover:text-foreground rounded cursor-pointer"
                  title="Download File"
                >
                  <Download className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={handleRunSimulation}
                  disabled={isRunning}
                  className="p-1 text-emerald-500 hover:bg-emerald-500/10 rounded cursor-pointer flex items-center gap-1 font-bold uppercase text-[9px]"
                  title="Run Simulation"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  Run
                </button>
              </div>
            </div>

            {/* Code Syntax Display */}
            <pre className="p-4 overflow-x-auto text-[11px] font-mono text-foreground/95 bg-card/45 select-text leading-relaxed">
              <code>{activeSnippet.code}</code>
            </pre>
          </div>

          {/* Description overlay */}
          <p className="text-[10px] text-muted-foreground select-none">
            {activeSnippet.description}
          </p>

          {/* SIMULATED SHELL OUTPUT CONSOLE */}
          {(isRunning || consoleOutput) && (
            <div className="border border-border bg-black rounded-2xl overflow-hidden font-mono text-[10px] text-zinc-300 select-text">
              <div className="bg-zinc-900 px-4 py-2 text-[9px] text-zinc-500 font-bold border-b border-zinc-800 select-none">
                Interactive Console Shell Output
              </div>
              <div className="p-4 min-h-[80px] leading-relaxed whitespace-pre-wrap">
                {isRunning ? (
                  <div className="flex items-center gap-2 select-none text-primary">
                    <div className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin" />
                    <span>Compiling DAG nodes and running tests...</span>
                  </div>
                ) : (
                  consoleOutput
                )}
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}

export default CodePanel;
