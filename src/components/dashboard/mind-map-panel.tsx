"use client";

import React, { useState, useRef } from 'react';
import { Brain, ZoomIn, ZoomOut, Maximize2, Minimize2, Download, RefreshCw, Sparkles } from 'lucide-react';
import { MindMapNode } from '@/lib/mock-data';
import { toast } from 'sonner';

interface MindMapPanelProps {
  rootNode: MindMapNode;
}

export function MindMapPanel({ rootNode }: MindMapPanelProps) {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [collapsedNodes, setCollapsedNodes] = useState<string[]>([]);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });

  // Toggle Collapse
  const toggleCollapse = (nodeId: string) => {
    setCollapsedNodes((prev) =>
      prev.includes(nodeId) 
        ? prev.filter((id) => id !== nodeId) 
        : [...prev, nodeId]
    );
  };

  // Zoom helpers
  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.15, 2));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.15, 0.5));
  const handleZoomReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  // Drag Pan handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    dragStart.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    setPan({
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y
    });
  };

  const handleMouseUpOrLeave = () => {
    isDragging.current = false;
  };

  // Export PNG Mockup
  const handleExportPNG = () => {
    toast.success("Mind Map exported to downloads!", {
      description: "mind_map_structure.png downloaded."
    });
  };

  return (
    <div className={`flex flex-col space-y-4 ${isFullscreen ? 'fixed inset-0 bg-background z-50 p-6' : 'h-full'}`}>
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-3 select-none">
        <div className="space-y-1">
          <h3 className="font-bold text-sm text-foreground flex items-center gap-2">
            <Brain className="w-4.5 h-4.5 text-emerald-500" />
            Interactive Concept Mind Map
          </h3>
          <p className="text-[10px] text-muted-foreground">Click parent nodes to collapse subtrees. Drag to pan.</p>
        </div>

        {/* CONTROLS */}
        <div className="flex items-center gap-2 shrink-0">
          <button onClick={handleZoomIn} className="p-2 rounded-xl bg-card border border-border/40 hover:bg-secondary/80 cursor-pointer text-muted-foreground hover:text-foreground">
            <ZoomIn className="w-4 h-4" />
          </button>
          <button onClick={handleZoomOut} className="p-2 rounded-xl bg-card border border-border/40 hover:bg-secondary/80 cursor-pointer text-muted-foreground hover:text-foreground">
            <ZoomOut className="w-4 h-4" />
          </button>
          <button onClick={handleZoomReset} title="Reset scale" className="p-2 rounded-xl bg-card border border-border/40 hover:bg-secondary/80 cursor-pointer text-muted-foreground hover:text-foreground">
            <RefreshCw className="w-4 h-4" />
          </button>
          <button onClick={() => setIsFullscreen(!isFullscreen)} className="p-2 rounded-xl bg-card border border-border/40 hover:bg-secondary/80 cursor-pointer text-muted-foreground hover:text-foreground">
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
          <button onClick={handleExportPNG} title="Export PNG" className="p-2 rounded-xl bg-card border border-border/40 hover:bg-secondary/80 cursor-pointer text-muted-foreground hover:text-foreground">
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* MAP CANVAS PANEL */}
      <div
        ref={mapContainerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        className="flex-1 bg-secondary/10 border border-border rounded-3xl overflow-hidden cursor-grab active:cursor-grabbing relative select-none min-h-[350px] flex items-center justify-center"
      >
        {/* Graph content wrapper */}
        <div
          className="transition-transform duration-75 origin-center"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          }}
        >
          {/* Concept Map SVG Drawing */}
          <svg className="w-[600px] h-[300px] overflow-visible" viewBox="0 0 600 300">
            {/* Draw connectors if nodes are expanded */}
            <g stroke="var(--border)" strokeWidth="2">
              {!collapsedNodes.includes(rootNode.id) && rootNode.children?.map((child, idx) => {
                const childY = 80 + idx * 80;
                return (
                  <path
                    key={child.id}
                    d={`M 150 150 C 220 150, 220 ${childY}, 300 ${childY}`}
                    fill="none"
                  />
                );
              })}

              {/* Sub-children nodes links */}
              {!collapsedNodes.includes(rootNode.id) && rootNode.children?.map((child, idx) => {
                const childY = 80 + idx * 80;
                const isChildCollapsed = collapsedNodes.includes(child.id);
                return !isChildCollapsed && child.children?.map((sub, sIdx) => {
                  const subY = childY - 25 + sIdx * 50;
                  return (
                    <path
                      key={sub.id}
                      d={`M 400 ${childY} C 440 ${childY}, 440 ${subY}, 480 ${subY}`}
                      fill="none"
                    />
                  );
                });
              })}
            </g>

            {/* Root Node rendering */}
            <g
              transform="translate(50, 125)"
              onClick={() => toggleCollapse(rootNode.id)}
              className="cursor-pointer group"
            >
              <rect x="0" y="0" width="180" height="50" rx="10" fill="var(--card)" stroke="var(--primary)" strokeWidth="2" className="filter drop-shadow-sm group-hover:stroke-primary-hover" />
              <text x="90" y="24" textAnchor="middle" fill="var(--foreground)" className="font-bold text-[11px]">{rootNode.label}</text>
              <text x="90" y="38" textAnchor="middle" fill="var(--muted-foreground)" className="text-[9px]">Click to collapse</text>
            </g>

            {/* Children nodes rendering */}
            {!collapsedNodes.includes(rootNode.id) && rootNode.children?.map((child, idx) => {
              const childY = 80 + idx * 80;
              const isCollapsed = collapsedNodes.includes(child.id);

              return (
                <g key={child.id}>
                  {/* First-tier Child */}
                  <g
                    transform={`translate(300, ${childY - 20})`}
                    onClick={() => toggleCollapse(child.id)}
                    className="cursor-pointer group"
                  >
                    <rect x="0" y="0" width="120" height="40" rx="8" fill="var(--card)" stroke={isCollapsed ? "var(--primary)" : "var(--border)"} strokeWidth="1.5" />
                    <text x="60" y="24" textAnchor="middle" fill="var(--foreground)" className="font-bold text-[10px]">{child.label}</text>
                  </g>

                  {/* Sub-children Leaf nodes */}
                  {!isCollapsed && child.children?.map((sub, sIdx) => {
                    const subY = childY - 25 + sIdx * 50;
                    return (
                      <g key={sub.id} transform={`translate(480, ${subY - 15})`}>
                        <rect x="0" y="0" width="110" height="30" rx="6" fill="var(--secondary)" stroke="var(--border)" />
                        <text x="55" y="18" textAnchor="middle" fill="var(--muted-foreground)" className="text-[9px] font-semibold">{sub.label}</text>
                      </g>
                    );
                  })}
                </g>
              );
            })}
          </svg>
        </div>

        {/* Map info HUD */}
        <div className="absolute bottom-3 left-3 px-3 py-1 bg-card/80 border border-border text-[9px] text-muted-foreground rounded-lg select-none">
          Use buttons or mousewheel to scale graph.
        </div>
      </div>
    </div>
  );
}

export default MindMapPanel;
