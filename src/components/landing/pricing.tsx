"use client";

import React, { useState } from 'react';
import { Check, Sparkles } from 'lucide-react';
import Link from 'next/link';

export function Pricing() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const tiers = [
    {
      name: "Free Scholar",
      desc: "Perfect for testing the waters and light reading.",
      price: { monthly: 0, yearly: 0 },
      features: [
        "3 AI Video analyses per month",
        "30s & 2m Summary variants",
        "Standard Notes markdown editor",
        "Autosaving to local storage",
        "Basic MCQs quiz (2 per video)"
      ],
      cta: "Start Free",
      popular: false
    },
    {
      name: "Pro Thinker",
      desc: "For serious learners, students, and software developers.",
      price: { monthly: 15, yearly: 12 },
      features: [
        "Unlimited video analysis",
        "All 6 Summary variants + Audio UI",
        "Interactive SVG Mind Maps & PNG export",
        "Flippable Flashcards w/ repetition rating",
        "Extended Quizzes (Coding + Fill blanks)",
        "ChatGPT Streaming discussions",
        "LinkedIn & Twitter thread copywriters",
        "PDF export configurations"
      ],
      cta: "Upgrade to Pro",
      popular: true
    },
    {
      name: "Research Lab",
      desc: "For institutions, research teams, and custom API builds.",
      price: { monthly: 49, yearly: 39 },
      features: [
        "Everything in Pro tier",
        "Shared folder tagging & collections",
        "Export directly to Notion / Obsidian API",
        "Custom API keys generation",
        "Priority queue processing speeds",
        "Dedicated workspace cloud storage",
        "24/7 Priority support access"
      ],
      cta: "Contact Sales",
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-20 max-w-7xl mx-auto px-6 border-t border-border/40 relative">
      {/* Title */}
      <div className="text-center space-y-4 mb-10">
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">Simple, Transparent Pricing</h2>
        <p className="text-muted-foreground text-sm sm:text-base max-w-md mx-auto">
          Start learning for free, upgrade when you need advanced autograd engines.
        </p>

        {/* Toggle billing */}
        <div className="inline-flex items-center gap-1.5 p-1 bg-secondary rounded-xl border border-border select-none">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
              billingCycle === 'monthly' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle('yearly')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
              billingCycle === 'yearly' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Yearly (Save 20%)
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto pt-6 items-stretch">
        {tiers.map((tier, idx) => (
          <div
            key={idx}
            className={`rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative border ${
              tier.popular 
                ? 'bg-card border-primary shadow-xl shadow-primary/5 ring-1 ring-primary' 
                : 'bg-card border-border shadow-sm hover:border-border/80'
            }`}
          >
            {tier.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-primary text-primary-foreground font-bold text-[9px] uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3 fill-current" />
                Most Popular
              </div>
            )}

            <div className="space-y-6">
              {/* Header */}
              <div className="space-y-1.5">
                <h3 className="font-bold text-lg text-foreground">{tier.name}</h3>
                <p className="text-muted-foreground text-xs leading-normal">{tier.desc}</p>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-foreground">
                  ${billingCycle === 'monthly' ? tier.price.monthly : tier.price.yearly}
                </span>
                <span className="text-xs text-muted-foreground">/ month</span>
              </div>

              {/* Divider */}
              <div className="h-px bg-border/60" />

              {/* Features */}
              <ul className="space-y-3.5 text-xs text-foreground/90">
                {tier.features.map((feat, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="mt-8">
              {tier.cta === "Contact Sales" ? (
                <a
                  href="mailto:sales@tubemind.ai"
                  className="w-full py-3 bg-secondary hover:bg-secondary/80 border border-border text-foreground font-semibold rounded-xl text-center text-xs transition-all block cursor-pointer"
                >
                  Contact Sales
                </a>
              ) : (
                <Link
                  href="/home"
                  className={`w-full py-3 text-center text-xs font-semibold rounded-xl transition-all block cursor-pointer ${
                    tier.popular
                      ? 'bg-primary hover:bg-primary/95 text-primary-foreground shadow-lg shadow-primary/10'
                      : 'bg-secondary hover:bg-secondary/85 text-foreground border border-border/60'
                  }`}
                >
                  {tier.cta}
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Pricing;
