"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, Sparkles, User, RefreshCw, ChevronRight } from 'lucide-react';
import { useWorkspace, ChatMessage } from '@/context/workspace-context';

interface ChatPanelProps {
  videoId: string;
}

export function ChatPanel({ videoId }: ChatPanelProps) {
  const { chatHistories, addChatMessage } = useWorkspace();
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const messages = chatHistories[videoId] || [];

  const suggestedPrompts = [
    "Summarize the main mathematical formulas.",
    "Give me 3 practical code examples based on this.",
    "Are there any security pitfalls highlighted?",
    "Explain this to a 10 year old."
  ];

  // Auto scroll to bottom
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async (text: string) => {
    if (!text.trim() || isTyping) return;

    // Send user message
    addChatMessage(videoId, 'user', text);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking and streaming response
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Choose response based on keywords
    let responseText = "That's an interesting question about this lecture! Let me analyze the transcript. Here is what I found:\n\n";
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('math') || lowerText.includes('formula') || lowerText.includes('derivat')) {
      responseText += "The math heavily leverages the chain rule of calculus:\n\n$$\\frac{dy}{dx} = \\frac{dy}{du} \\cdot \\frac{du}{dx}$$\n\nIn backpropagation, this allows us to propagate the gradient of the loss function backwards from the output node to all weights in the computational graph.";
    } else if (lowerText.includes('code') || lowerText.includes('example') || lowerText.includes('python')) {
      responseText += "Here is the implementation of Value node addition in python:\n\n```python\ndef __add__(self, other):\n    other = other if isinstance(other, Value) else Value(other)\n    out = Value(self.data + other.data, (self, other), '+')\n    def _backward():\n        self.grad += out.grad\n        other.grad += out.grad\n    out._backward = _backward\n    return out\n```";
    } else if (lowerText.includes('10') || lowerText.includes('child') || lowerText.includes('simple')) {
      responseText += "Imagine a giant chain of people playing whisper down the lane. But instead of whispers, they are passing numbers. If the final number is wrong, the boss tells the last person, who tells the person before them, and so on. Everyone checks if they made a mistake and tweaks their guess. That is backpropagation!";
    } else {
      responseText += "This portion of the presentation covers the foundational framework. The author outlines the parameters, establishes the core loss calculations, and builds a standard optimization loop. Let me know if you would like me to compile code snippets or quiz cards for this area!";
    }

    // Stream the response word by word
    const words = responseText.split(' ');
    let currentResponse = '';
    let wordIdx = 0;

    // Create assistant message placeholder
    addChatMessage(videoId, 'assistant', '');

    const interval = setInterval(() => {
      if (wordIdx < words.length) {
        currentResponse += (wordIdx === 0 ? '' : ' ') + words[wordIdx];
        
        // Update context chat history directly (mutating the last message)
        // We will trigger updates by calling context add message once it is complete, or we can just append.
        // For simplicity of streaming in local state, we will do local text state then push to context at the end!
        wordIdx++;
      } else {
        clearInterval(interval);
        // Sync complete streamed content to context
        // Pop the placeholder or just write the complete answer to context
        // To make it easy, we replace the assistant message in history with the full content:
        // Wait, context has addChatMessage, we will overwrite the placeholder
        // Let's first clean up the placeholder and push the full message:
        setIsTyping(false);
      }
    }, 40);

    // Let's implement local streaming display first, then push to context on completion
    // Wait, to keep it simple and robust, we can just write it immediately to context without lag, 
    // or simulate typing with a simple local streaming wrapper, then append:
    // Let's push to context after the interval is done!
    
    // Simulating typing delay before pushing to context
    await new Promise(resolve => setTimeout(resolve, words.length * 40));
    addChatMessage(videoId, 'assistant', responseText);
    setIsTyping(false);
  };

  return (
    <div className="h-full flex flex-col justify-between space-y-4">
      
      {/* HEADER */}
      <div className="flex items-center justify-between border-b border-border/60 pb-3 select-none">
        <div className="space-y-1">
          <h3 className="font-bold text-sm text-foreground flex items-center gap-2">
            <MessageSquare className="w-4.5 h-4.5 text-cyan-500" />
            AI Study Partner
          </h3>
          <p className="text-[10px] text-muted-foreground">Ask questions directly about this video&apos;s topics.</p>
        </div>
      </div>

      {/* MESSAGES VIEWPORT */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1 min-h-[220px] max-h-[300px]">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4 select-none">
            <div className="w-10 h-10 rounded-full bg-secondary/80 flex items-center justify-center border border-border/40 animate-bounce">
              <Sparkles className="w-4.5 h-4.5 text-primary" />
            </div>
            <div className="space-y-1">
              <h5 className="font-bold text-xs">No study messages yet</h5>
              <p className="text-[10px] text-muted-foreground max-w-xs mx-auto">
                Ask anything about the formulas, code examples, or logic. Try a prompt below:
              </p>
            </div>

            {/* Suggested prompts list */}
            <div className="flex flex-col gap-1.5 w-full max-w-xs pt-3">
              {suggestedPrompts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(p)}
                  className="w-full text-left px-3 py-2 border border-border bg-card hover:bg-secondary/40 rounded-xl text-[10px] text-foreground transition-all cursor-pointer truncate flex items-center justify-between group"
                >
                  <span>{p}</span>
                  <ChevronRight className="w-3 h-3 text-muted-foreground group-hover:text-primary transition-colors" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-3.5">
            {/* Filter empty assistant placeholders */}
            {messages.filter(m => m.content).map((msg) => {
              const isUser = msg.role === 'user';
              
              return (
                <div key={msg.id} className={`flex items-start gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
                  
                  {/* Left avatar for assistant */}
                  {!isUser && (
                    <div className="w-7 h-7 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                      <Sparkles className="w-3.5 h-3.5 text-primary" />
                    </div>
                  )}

                  {/* Bubble content */}
                  <div className={`p-3.5 rounded-2xl max-w-[85%] text-xs leading-relaxed border ${
                    isUser 
                      ? 'bg-primary border-primary text-primary-foreground rounded-tr-none' 
                      : 'bg-card border-border text-foreground rounded-tl-none'
                  }`}>
                    {/* Basic Markdown block parser */}
                    {msg.content.split('\n').map((line, idx) => {
                      if (line.startsWith('```')) return null;
                      if (line.startsWith('$$')) return <div key={idx} className="font-mono text-center my-2 text-primary font-bold">{line.replaceAll('$$', '')}</div>;
                      return <p key={idx} className="whitespace-pre-wrap">{line}</p>;
                    })}
                  </div>

                  {/* Right avatar for user */}
                  {isUser && (
                    <div className="w-7 h-7 rounded-lg bg-secondary flex items-center justify-center shrink-0 border border-border/40">
                      <User className="w-3.5 h-3.5 text-muted-foreground" />
                    </div>
                  )}

                </div>
              );
            })}

            {/* Simulated typing loader */}
            {isTyping && (
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                  <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
                </div>
                <div className="bg-card border border-border p-3.5 rounded-2xl rounded-tl-none text-xs flex items-center gap-1.5 select-none">
                  <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* INPUT FIELD */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend(input);
        }}
        className="flex gap-2 select-none"
      >
        <input
          type="text"
          placeholder="Ask a question about this course..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isTyping}
          className="flex-1 bg-card border border-border/80 px-4 py-3 rounded-xl text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <button
          type="submit"
          disabled={isTyping}
          className="w-11 h-11 bg-primary hover:bg-primary/95 text-primary-foreground rounded-xl flex items-center justify-center shrink-0 cursor-pointer shadow shadow-primary/10 transition-transform active:scale-95"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

    </div>
  );
}

export default ChatPanel;
