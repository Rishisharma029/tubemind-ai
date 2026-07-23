"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, Star, Shuffle, RotateCcw, Award, ChevronLeft, ChevronRight } from 'lucide-react';
import { Flashcard } from '@/lib/mock-data';
import { useWorkspace } from '@/context/workspace-context';
import { toast } from 'sonner';

interface FlashcardsPanelProps {
  cards: Flashcard[];
}

export function FlashcardsPanel({ cards }: FlashcardsPanelProps) {
  const { bookmarkedFlashcards, toggleBookmarkFlashcard } = useWorkspace();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [cardDeck, setCardDeck] = useState<Flashcard[]>(cards);
  const [isRandomMode, setIsRandomMode] = useState(false);

  const activeCard = cardDeck[currentIdx];

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    setIsFlipped(false);
    if (currentIdx + 1 < cardDeck.length) {
      setCurrentIdx(prev => prev + 1);
    } else {
      setCurrentIdx(0);
      toast.info("Finished reviewing the deck. Starting again!");
    }
  };

  const handlePrev = () => {
    setIsFlipped(false);
    if (currentIdx > 0) {
      setCurrentIdx(prev => prev - 1);
    } else {
      setCurrentIdx(cardDeck.length - 1);
    }
  };

  const handleToggleRandom = () => {
    setIsFlipped(false);
    if (!isRandomMode) {
      // Shuffle deck
      const shuffled = [...cardDeck].sort(() => Math.random() - 0.5);
      setCardDeck(shuffled);
      setIsRandomMode(true);
      toast.info("Random Shuffle Mode enabled!");
    } else {
      setCardDeck(cards);
      setIsRandomMode(false);
      toast.info("Ordered review mode restored.");
    }
    setCurrentIdx(0);
  };

  const handleRateDifficulty = (diff: 'easy' | 'medium' | 'hard') => {
    toast.success(`Rated as ${diff}! We will adjust spaced repetition schedules.`);
    handleNext();
  };

  return (
    <div className="space-y-6">
      
      {/* HEADER */}
      <div className="flex items-center justify-between border-b border-border/60 pb-3 select-none">
        <div className="space-y-1">
          <h3 className="font-bold text-sm text-foreground flex items-center gap-2">
            <HelpCircle className="w-4.5 h-4.5 text-amber-500" />
            Spaced Repetition Flashcards
          </h3>
          <p className="text-[10px] text-muted-foreground">Flip to test active recall. Select rating to continue.</p>
        </div>

        {/* Shuffle toggler */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleToggleRandom}
            className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
              isRandomMode 
                ? 'bg-primary/10 border-primary text-primary' 
                : 'bg-card border-border/60 text-muted-foreground hover:text-foreground'
            }`}
            title="Toggle Random Shuffle Mode"
          >
            <Shuffle className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-1.5 select-none">
        <div className="flex items-center justify-between text-[10px] font-bold text-muted-foreground uppercase">
          <span>Deck Review Progress</span>
          <span>{currentIdx + 1} / {cardDeck.length}</span>
        </div>
        <div className="w-full bg-secondary h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-primary h-full transition-all duration-300"
            style={{ width: `${((currentIdx + 1) / cardDeck.length) * 100}%` }}
          />
        </div>
      </div>

      {/* 3D DOUBLE-SIDED CARD ELEMENT */}
      <div className="flex items-center justify-center py-6">
        <div className="w-full max-w-md h-64 perspective-1000">
          <div
            onClick={handleFlip}
            className={`relative w-full h-full text-center transition-transform duration-500 preserve-3d cursor-pointer ${
              isFlipped ? 'rotate-y-180' : ''
            }`}
          >
            
            {/* FRONT SIDE */}
            <div className="absolute inset-0 w-full h-full bg-card border border-border rounded-3xl p-6 flex flex-col justify-between backface-hidden shadow-sm hover:border-border/80 transition-all select-none">
              <div className="flex items-center justify-between text-[10px] font-bold text-muted-foreground uppercase">
                <span>{activeCard.category}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleBookmarkFlashcard(activeCard.id);
                  }}
                  className="p-1 rounded hover:bg-secondary text-muted-foreground hover:text-foreground"
                >
                  <Star className={`w-3.5 h-3.5 ${bookmarkedFlashcards.includes(activeCard.id) ? 'fill-primary text-primary' : ''}`} />
                </button>
              </div>

              <div className="text-center px-4">
                <h4 className="text-sm sm:text-base font-bold leading-relaxed text-foreground">
                  {activeCard.front}
                </h4>
              </div>

              <div className="text-[10px] text-muted-foreground font-semibold">
                Click Card to Reveal Answer
              </div>
            </div>

            {/* BACK SIDE */}
            <div className="absolute inset-0 w-full h-full bg-card border border-border/80 rounded-3xl p-6 flex flex-col justify-between backface-hidden rotate-y-180 shadow-md select-none">
              <div className="flex items-center justify-between text-[10px] font-bold text-muted-foreground uppercase">
                <span>Answer Summary</span>
                <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-[9px] font-bold capitalize">
                  {activeCard.difficulty}
                </span>
              </div>

              <div className="text-center px-4">
                <p className="text-xs sm:text-sm leading-relaxed text-foreground">
                  {activeCard.back}
                </p>
              </div>

              <div className="text-[10px] text-muted-foreground font-semibold">
                Click Card to flip back
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* CARD RATING BAR (Shows after flipped to rate difficulty) */}
      {isFlipped && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-2 py-2 select-none"
        >
          <button
            onClick={() => handleRateDifficulty('easy')}
            className="px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 hover:bg-emerald-500 hover:text-white font-semibold text-xs cursor-pointer transition-all"
          >
            Easy (Next card)
          </button>
          <button
            onClick={() => handleRateDifficulty('medium')}
            className="px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500 hover:bg-amber-500 hover:text-white font-semibold text-xs cursor-pointer transition-all"
          >
            Medium
          </button>
          <button
            onClick={() => handleRateDifficulty('hard')}
            className="px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white font-semibold text-xs cursor-pointer transition-all"
          >
            Hard
          </button>
        </motion.div>
      )}

      {/* NAVIGATION CONTROLS */}
      {!isFlipped && (
        <div className="flex items-center justify-center gap-4 select-none">
          <button
            onClick={handlePrev}
            className="p-2.5 rounded-full bg-secondary hover:bg-secondary/80 border border-border/50 text-foreground cursor-pointer"
          >
            <ChevronLeft className="w-4.5 h-4.5" />
          </button>
          <button
            onClick={handleNext}
            className="p-2.5 rounded-full bg-secondary hover:bg-secondary/80 border border-border/50 text-foreground cursor-pointer"
          >
            <ChevronRight className="w-4.5 h-4.5" />
          </button>
        </div>
      )}

    </div>
  );
}

export default FlashcardsPanel;
