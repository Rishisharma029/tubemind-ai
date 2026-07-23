"use client";

import React from 'react';
import { Navbar } from '@/components/landing/navbar';
import { Hero } from '@/components/landing/hero';
import { Features } from '@/components/landing/features';
import { Demo } from '@/components/landing/demo';
import { Pricing } from '@/components/landing/pricing';
import { FAQ } from '@/components/landing/faq';
import { Sparkles, ArrowRight, Code2, Send, Share2, Heart } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-primary/20">
      {/* Navigation */}
      <Navbar />

      {/* Hero Header */}
      <main className="flex-1">
        <Hero />

        {/* Feature Grid */}
        <Features />

        {/* Workspace Demo */}
        <Demo />

        {/* Pricing Tables */}
        <Pricing />

        {/* FAQs */}
        <FAQ />

        {/* Animated CTA Block */}
        <section className="py-20 px-6 max-w-5xl mx-auto border-t border-border/40 text-center relative overflow-hidden rounded-3xl bg-secondary/15 my-12 border">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
          
          <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold select-none">
              <Sparkles className="w-3.5 h-3.5 fill-current animate-pulse" />
              100% Free to Get Started
            </div>
            
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight">
              Ready to Upgrade Your Learning Speed?
            </h2>
            
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              Join thousands of students, developers, and researchers who are turning hours of YouTube videos into structured knowledge.
            </p>

            <div className="pt-4">
              <Link
                href="/home"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary hover:bg-primary/95 text-primary-foreground font-semibold rounded-2xl text-sm transition-all hover:scale-[1.02] shadow-lg shadow-primary/20 cursor-pointer"
              >
                Launch TubeMind AI
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/60 py-12 px-6 bg-card text-muted-foreground">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Logo Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg tracking-tight select-none">
              <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
                <Sparkles className="w-3.5 h-3.5 fill-current" />
              </div>
              <span className="text-foreground">TubeMind<span className="text-primary font-semibold">AI</span></span>
            </Link>
            <p className="text-xs leading-relaxed max-w-xs">
              Sleek AI-powered study suites transforming YouTube lectures into interactive summaries, flashcards, and quizzes.
            </p>
          </div>

          {/* Links 1 */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase text-foreground tracking-wider">Product</h5>
            <ul className="space-y-2 text-xs">
              <li><a href="#features" className="hover:text-foreground transition-colors">Features</a></li>
              <li><a href="#demo" className="hover:text-foreground transition-colors">Workspace Demo</a></li>
              <li><a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a></li>
              <li><Link href="/home" className="hover:text-foreground transition-colors">Launch Workspace</Link></li>
            </ul>
          </div>

          {/* Links 2 */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase text-foreground tracking-wider">Legal</h5>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">GDPR & Security</a></li>
            </ul>
          </div>

          {/* Connect / Socials */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase text-foreground tracking-wider">Connect</h5>
            <div className="flex items-center gap-3">
              <a href="https://github.com" className="p-2 rounded-xl hover:bg-secondary text-muted-foreground hover:text-foreground transition-all border border-border/40"><Code2 className="w-4 h-4" /></a>
              <a href="https://twitter.com" className="p-2 rounded-xl hover:bg-secondary text-muted-foreground hover:text-foreground transition-all border border-border/40"><Send className="w-4 h-4" /></a>
              <a href="https://linkedin.com" className="p-2 rounded-xl hover:bg-secondary text-muted-foreground hover:text-foreground transition-all border border-border/40"><Share2 className="w-4 h-4" /></a>
            </div>
            <div className="text-[10px]">
              Support: <a href="mailto:support@tubemind.ai" className="text-primary hover:underline">support@tubemind.ai</a>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-border/20 flex flex-col sm:flex-row items-center justify-between text-xs gap-4 select-none">
          <span>&copy; {new Date().getFullYear()} TubeMind AI. All rights reserved.</span>
          <span className="flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-red-500 fill-current animate-pulse" /> for faster learning.
          </span>
        </div>
      </footer>
    </div>
  );
}
