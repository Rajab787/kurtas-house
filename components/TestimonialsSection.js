'use client';

import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EDITORIAL_REVIEWS } from '@/data/products';
import { Quote, Sparkles, ChevronLeft, ChevronRight, Star } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const quoteRef = useRef(null);

  const nextQuote = () => {
    setActiveIndex((prev) => (prev + 1) % EDITORIAL_REVIEWS.length);
  };

  const prevQuote = () => {
    setActiveIndex((prev) => (prev - 1 + EDITORIAL_REVIEWS.length) % EDITORIAL_REVIEWS.length);
  };

  useEffect(() => {
    if (quoteRef.current) {
      gsap.fromTo(
        quoteRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      );
    }
  }, [activeIndex]);

  const activeReview = EDITORIAL_REVIEWS[activeIndex];

  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#070709] border-t border-white/5 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gold-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel-subtle text-gold-400 text-[10px] tracking-[0.3em] uppercase mb-8">
          <Sparkles className="w-3 h-3 text-gold-400" />
          <span>Editorial Critical Acclaim</span>
        </div>

        {/* Big Quote Symbol */}
        <div className="w-12 h-12 rounded-full glass-panel mx-auto flex items-center justify-center text-gold-400/80 mb-6 border border-gold-500/20 shadow-glow">
          <Quote className="w-5 h-5" />
        </div>

        {/* Animated Quote Container */}
        <div ref={quoteRef} className="min-h-[170px] flex flex-col justify-center">
          <blockquote className="font-serif text-2xl sm:text-3xl md:text-4xl text-white font-light leading-relaxed max-w-3xl mx-auto">
            &ldquo;{activeReview.quote}&rdquo;
          </blockquote>

          <div className="mt-8 flex flex-col items-center">
            <span className="text-xs uppercase tracking-[0.25em] text-gold-400 font-semibold">
              {activeReview.publication}
            </span>
            <span className="text-[11px] text-luxury-400 mt-1 font-light">
              {activeReview.author} • {activeReview.issue}
            </span>
          </div>
        </div>

        {/* Carousel Navigation Buttons & Dots */}
        <div className="mt-10 flex items-center justify-center gap-6">
          <button
            onClick={prevQuote}
            className="p-3 rounded-full glass-panel border border-white/10 text-luxury-300 hover:text-white hover:border-gold-500/40 transition-colors"
            aria-label="Previous quote"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2">
            {EDITORIAL_REVIEWS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === activeIndex ? 'w-6 bg-gold-400' : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Jump to quote ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextQuote}
            className="p-3 rounded-full glass-panel border border-white/10 text-luxury-300 hover:text-white hover:border-gold-500/40 transition-colors"
            aria-label="Next quote"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
