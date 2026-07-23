"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

function FAQItem({ question, answer, isOpen, onToggle }: FAQItemProps) {
  return (
    <div className="border border-border/80 rounded-2xl bg-card overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 cursor-pointer hover:bg-secondary/20 transition-colors focus:outline-none"
      >
        <span className="font-bold text-sm sm:text-base text-foreground flex items-center gap-2.5">
          <HelpCircle className="w-4.5 h-4.5 text-primary shrink-0" />
          {question}
        </span>
        <ChevronDown className={twMerge("w-4.5 h-4.5 text-muted-foreground transition-transform duration-200 shrink-0", isOpen && "rotate-180")} />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-muted-foreground leading-relaxed border-t border-border/40">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const items = [
    {
      question: "How does TubeMind AI work?",
      answer: "When you paste a YouTube URL, we fetch the video metadata and transcript using official APIs. Our AI processing engine then analyzes the logical layout, partitions chapters, extracts code blocks, and drafts summarized notes, quizzes, mind maps, and flippable flashcards sequentially."
    },
    {
      question: "Is there a limit to video length?",
      answer: "Free users can analyze videos up to 30 minutes long. Pro users can process lectures and courses up to 4 hours long (e.g. Andrej Karpathy's neural network series) without any truncation."
    },
    {
      question: "Are my note edits saved and secure?",
      answer: "Yes. All note edits and bookmarks are autosaved locally using your browser's localStorage. No content is stored on our servers, ensuring your edits remain secure and entirely under your control."
    },
    {
      question: "How can I export my summaries and studies?",
      answer: "You can copy markdown notes directly, trigger LinkedIn or Twitter thread generations, or use our PDF Export panel to choose specific sections (Notes, Summary, Quiz) and compile a beautiful print-ready PDF."
    },
    {
      question: "Does the platform support multi-language translation?",
      answer: "Yes, our LLM processing automatically detects the spoken language of the video transcript and can generate study material in English, Spanish, German, French, Mandarin, and other major languages."
    }
  ];

  return (
    <section id="faq" className="py-20 max-w-4xl mx-auto px-6 border-t border-border/40 relative">
      <div className="text-center space-y-3 mb-12">
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">Frequently Asked Questions</h2>
        <p className="text-muted-foreground text-sm sm:text-base">
          Got questions about our interactive learning engine? We&apos;ve got answers.
        </p>
      </div>

      <div className="space-y-4">
        {items.map((item, idx) => (
          <FAQItem
            key={idx}
            question={item.question}
            answer={item.answer}
            isOpen={openIndex === idx}
            onToggle={() => setOpenIndex(openIndex === idx ? null : idx)}
          />
        ))}
      </div>
    </section>
  );
}

export default FAQ;
