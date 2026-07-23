"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, Check, X, ArrowRight, Award, RotateCcw, Award as Trophy } from 'lucide-react';
import { QuizQuestion } from '@/lib/mock-data';
import confetti from 'canvas-confetti';
import { toast } from 'sonner';

interface QuizPanelProps {
  questions: QuizQuestion[];
}

export function QuizPanel({ questions }: QuizPanelProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<string | null>(null);
  const [fillAnswer, setFillAnswer] = useState('');
  const [codingAnswer, setCodingAnswer] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const activeQ = questions[currentIdx];

  const handleCheckAnswer = () => {
    if (isAnswered) return;

    let correct = false;

    if (activeQ.type === 'mcq') {
      correct = selectedOpt === activeQ.answer;
    } else if (activeQ.type === 'true-false') {
      correct = selectedOpt?.toLowerCase() === activeQ.answer.toLowerCase();
    } else if (activeQ.type === 'fill-blanks') {
      correct = fillAnswer.trim().toLowerCase() === activeQ.answer.toLowerCase();
    } else if (activeQ.type === 'coding') {
      // Basic check if they typed parts of correct function
      correct = codingAnswer.includes('grad') || codingAnswer.includes('backward');
    }

    setIsCorrect(correct);
    setIsAnswered(true);
    if (correct) {
      setScore(prev => prev + 1);
      toast.success("Correct answer!");
    } else {
      toast.error("Incorrect answer.");
    }
  };

  const handleNext = () => {
    // Reset states
    setSelectedOpt(null);
    setFillAnswer('');
    setCodingAnswer('');
    setIsAnswered(false);
    setIsCorrect(false);

    if (currentIdx + 1 < questions.length) {
      setCurrentIdx(prev => prev + 1);
    } else {
      setQuizFinished(true);
      
      // Confetti burst for perfect score
      const finalScore = score + (isCorrect ? 1 : 0);
      if (finalScore === questions.length) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
        toast.success("Perfect Score! 🏆 You unlocked a study achievement!");
      } else {
        toast.info(`Quiz complete! Score: ${finalScore}/${questions.length}`);
      }
    }
  };

  const handleReset = () => {
    setCurrentIdx(0);
    setSelectedOpt(null);
    setFillAnswer('');
    setCodingAnswer('');
    setIsAnswered(false);
    setIsCorrect(false);
    setScore(0);
    setQuizFinished(false);
  };

  return (
    <div className="space-y-6">
      
      {/* HEADER */}
      <div className="flex items-center justify-between border-b border-border/60 pb-3 select-none">
        <div className="space-y-1">
          <h3 className="font-bold text-sm text-foreground flex items-center gap-2">
            <HelpCircle className="w-4.5 h-4.5 text-amber-500" />
            Active Recall Quiz
          </h3>
          <p className="text-[10px] text-muted-foreground">Test your memory of the material.</p>
        </div>
        <div className="text-[10px] font-bold px-2 py-0.5 rounded bg-secondary text-muted-foreground">
          Score: {score} / {questions.length}
        </div>
      </div>

      {quizFinished ? (
        /* FINISHED SCREEN */
        <div className="p-8 bg-card border border-border rounded-3xl text-center space-y-6 flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
            <Trophy className="w-8 h-8 text-primary" />
          </div>
          <div className="space-y-2">
            <h4 className="text-xl font-extrabold text-foreground">Assessment Complete!</h4>
            <p className="text-muted-foreground text-xs max-w-xs mx-auto">
              You scored {score} out of {questions.length} questions correctly. 
              {score === questions.length ? " Excellent job, perfect recall!" : " Review notes and try again."}
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleReset}
              className="px-5 py-2.5 bg-primary hover:bg-primary/95 text-primary-foreground font-semibold rounded-xl text-xs flex items-center gap-2 cursor-pointer shadow-md shadow-primary/20"
            >
              <RotateCcw className="w-4 h-4" />
              Retake Quiz
            </button>
          </div>
          
          {/* Mock Leaderboard */}
          <div className="w-full max-w-xs pt-6 border-t border-border space-y-3">
            <div className="flex items-center justify-between text-[10px] font-bold text-muted-foreground uppercase">
              <span>Class Leaderboard</span>
              <span>EXP</span>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 rounded-lg bg-secondary/40 border border-border/40 font-semibold">
                <span className="flex items-center gap-2">🥇 You</span>
                <span>+{score * 100}</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg text-muted-foreground">
                <span className="flex items-center gap-2">🥈 KarpathyBot</span>
                <span>+300</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg text-muted-foreground">
                <span className="flex items-center gap-2">🥉 NextGuy</span>
                <span>+200</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ACTIVE QUESTION */
        <div className="space-y-6">
          <div className="p-6 bg-card border border-border rounded-2xl space-y-4">
            {/* Question Label */}
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-secondary text-muted-foreground uppercase">
                Question {currentIdx + 1} of {questions.length} • {activeQ.type}
              </span>
            </div>

            {/* Question text */}
            <h4 className="font-bold text-sm leading-snug text-foreground">
              {activeQ.question}
            </h4>

            {/* Question Code snippet if present */}
            {activeQ.codeSnippet && (
              <pre className="p-3 bg-secondary/80 border border-border/50 rounded-xl text-[10px] font-mono text-foreground/90 overflow-x-auto">
                <code>{activeQ.codeSnippet}</code>
              </pre>
            )}

            {/* INTERACTIVE INPUTS BY TYPE */}
            {activeQ.type === 'mcq' && activeQ.options && (
              <div className="space-y-2">
                {activeQ.options.map((opt, idx) => {
                  const isSelected = selectedOpt === idx.toString();
                  const showCorrect = isAnswered && idx.toString() === activeQ.answer;
                  const showWrong = isAnswered && isSelected && !isCorrect;

                  return (
                    <button
                      key={idx}
                      onClick={() => !isAnswered && setSelectedOpt(idx.toString())}
                      disabled={isAnswered}
                      className={`w-full text-left p-3 rounded-xl border text-xs flex items-center justify-between cursor-pointer transition-all ${
                        showCorrect 
                          ? 'bg-emerald-500/10 border-emerald-500 text-emerald-500 font-medium' 
                          : showWrong 
                          ? 'bg-red-500/10 border-red-500 text-red-500' 
                          : isSelected 
                          ? 'bg-primary/10 border-primary text-primary font-medium' 
                          : 'bg-card border-border hover:bg-secondary/40'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full border text-[9px] font-bold flex items-center justify-center ${
                          isSelected ? 'bg-primary border-primary text-white' : 'border-border/80'
                        }`}>
                          {String.fromCharCode(65 + idx)}
                        </div>
                        <span>{opt}</span>
                      </div>
                      {showCorrect && <Check className="w-4 h-4 text-emerald-500" />}
                      {showWrong && <X className="w-4 h-4 text-red-500" />}
                    </button>
                  );
                })}
              </div>
            )}

            {activeQ.type === 'true-false' && (
              <div className="grid grid-cols-2 gap-3">
                {['True', 'False'].map((val) => {
                  const isSelected = selectedOpt?.toLowerCase() === val.toLowerCase();
                  const showCorrect = isAnswered && val.toLowerCase() === activeQ.answer.toLowerCase();
                  const showWrong = isAnswered && isSelected && !isCorrect;

                  return (
                    <button
                      key={val}
                      onClick={() => !isAnswered && setSelectedOpt(val.toLowerCase())}
                      disabled={isAnswered}
                      className={`py-4 rounded-xl border text-xs font-bold text-center cursor-pointer transition-all ${
                        showCorrect 
                          ? 'bg-emerald-500/10 border-emerald-500 text-emerald-500' 
                          : showWrong 
                          ? 'bg-red-500/10 border-red-500 text-red-500' 
                          : isSelected 
                          ? 'bg-primary/10 border-primary text-primary' 
                          : 'bg-card border-border hover:bg-secondary/40'
                      }`}
                    >
                      {val}
                    </button>
                  );
                })}
              </div>
            )}

            {activeQ.type === 'fill-blanks' && (
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Type your answer here..."
                  value={fillAnswer}
                  onChange={(e) => setFillAnswer(e.target.value)}
                  disabled={isAnswered}
                  className={`w-full bg-card border px-4 py-3 rounded-xl text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring ${
                    isAnswered && isCorrect ? 'border-emerald-500 bg-emerald-500/5' : isAnswered ? 'border-red-500 bg-red-500/5' : 'border-border'
                  }`}
                />
              </div>
            )}

            {activeQ.type === 'coding' && (
              <div className="space-y-2">
                <textarea
                  placeholder="# Write your python/JS solution code here..."
                  value={codingAnswer}
                  onChange={(e) => setCodingAnswer(e.target.value)}
                  disabled={isAnswered}
                  className={`w-full h-32 bg-card border p-4 rounded-xl text-xs font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring ${
                    isAnswered && isCorrect ? 'border-emerald-500 bg-emerald-500/5' : isAnswered ? 'border-red-500 bg-red-500/5' : 'border-border'
                  }`}
                />
              </div>
            )}
          </div>

          {/* EXPLANATION AREA */}
          {isAnswered && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-2xl border text-xs leading-relaxed ${
                isCorrect ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-500' : 'bg-red-500/5 border-red-500/20 text-red-500'
              }`}
            >
              <div className="font-bold flex items-center gap-1 mb-1">
                {isCorrect ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                {isCorrect ? 'Correct Explanation' : 'Explanation'}
              </div>
              <p className="text-muted-foreground">{activeQ.explanation}</p>
            </motion.div>
          )}

          {/* FOOTER ACTIONS */}
          <div className="flex justify-end select-none">
            {!isAnswered ? (
              <button
                onClick={handleCheckAnswer}
                className="px-5 py-2.5 bg-primary hover:bg-primary/95 text-primary-foreground font-semibold rounded-xl text-xs cursor-pointer shadow-sm"
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-5 py-2.5 bg-primary hover:bg-primary/95 text-primary-foreground font-semibold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                {currentIdx + 1 === questions.length ? 'Finish Quiz' : 'Next Question'}
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default QuizPanel;
