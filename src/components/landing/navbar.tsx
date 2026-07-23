"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, Sun, Moon, Laptop, Menu, X } from 'lucide-react';
import { useWorkspace } from '@/context/workspace-context';
import { motion, AnimatePresence } from 'framer-motion';

export function Navbar() {
  const { theme, setTheme } = useWorkspace();
  const [themeOpen, setThemeOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Monitor scroll for boundary line shading
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const themeOptions = [
    { value: 'light', label: 'Light', icon: <Sun className="w-3.5 h-3.5" /> },
    { value: 'dark', label: 'Dark', icon: <Moon className="w-3.5 h-3.5" /> },
    { value: 'system', label: 'System', icon: <Laptop className="w-3.5 h-3.5" /> },
  ] as const;

  return (
    <header className={`sticky top-0 z-40 w-full transition-all duration-300 ${
      scrolled 
        ? 'bg-background/80 backdrop-blur-md border-b border-border/80' 
        : 'bg-transparent border-b border-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-lg tracking-tight select-none">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground shadow-md shadow-primary/20">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
            TubeMind<span className="text-primary font-semibold">AI</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition-colors">Features</a>
          <a href="#demo" className="hover:text-foreground transition-colors">Workspace Demo</a>
          <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
          <a href="#faq" className="hover:text-foreground transition-colors">FAQ</a>
        </nav>

        {/* Actions (Theme & CTA) */}
        <div className="hidden md:flex items-center gap-4">
          {/* Theme Dropdown */}
          <div className="relative">
            <button
              onClick={() => setThemeOpen(!themeOpen)}
              className="p-2.5 rounded-xl hover:bg-secondary/80 border border-border/40 text-foreground cursor-pointer flex items-center justify-center transition-colors"
            >
              {theme === 'light' ? <Sun className="w-4 h-4" /> : theme === 'dark' ? <Moon className="w-4 h-4" /> : <Laptop className="w-4 h-4" />}
            </button>
            <AnimatePresence>
              {themeOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setThemeOpen(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute right-0 mt-2 w-32 bg-card border border-border rounded-xl shadow-xl z-20 p-1"
                  >
                    {themeOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => {
                          setTheme(opt.value);
                          setThemeOpen(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 rounded-lg text-xs flex items-center gap-2 hover:bg-secondary cursor-pointer ${
                          theme === opt.value ? 'text-primary font-semibold' : 'text-foreground'
                        }`}
                      >
                        {opt.icon}
                        {opt.label}
                      </button>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Launch App Button */}
          <Link
            href="/home"
            className="px-4.5 py-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl text-sm transition-all shadow-md shadow-primary/10 hover:scale-[1.02]"
          >
            Launch App
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-3">
          {/* Mobile Theme Toggle (Simple) */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2.5 rounded-xl hover:bg-secondary border border-border/40 text-foreground"
          >
            {theme === 'light' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl hover:bg-secondary border border-border/40 text-foreground cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b border-border bg-card overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-4 text-sm font-medium">
              <a
                href="#features"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-border/20 text-muted-foreground hover:text-foreground"
              >
                Features
              </a>
              <a
                href="#demo"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-border/20 text-muted-foreground hover:text-foreground"
              >
                Workspace Demo
              </a>
              <a
                href="#pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-border/20 text-muted-foreground hover:text-foreground"
              >
                Pricing
              </a>
              <a
                href="#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-border/20 text-muted-foreground hover:text-foreground"
              >
                FAQ
              </a>
              <Link
                href="/home"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full mt-2 py-3 bg-primary text-primary-foreground font-semibold rounded-xl text-center shadow-lg block"
              >
                Launch App
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
