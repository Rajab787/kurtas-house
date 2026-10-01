'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CATEGORIES } from '@/data/products';
import { ArrowUpRight, Sparkles } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CategoriesSection() {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Subtle alternating parallax on category cards
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        const speed = index % 2 === 0 ? 25 : -25;
        gsap.to(card, {
          y: speed,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="categories"
      ref={containerRef}
      className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#09090c] overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-gold-500/5 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel-subtle text-gold-400 text-[10px] tracking-[0.3em] uppercase mb-3">
            <Sparkles className="w-3 h-3 text-gold-400" />
            <span>Architectural Typology</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif text-white tracking-tight">
            Curated Categories
          </h2>
          <p className="mt-4 text-xs sm:text-sm text-luxury-400 font-light leading-relaxed">
            Distinguished by weaving method, textile weight, and occasion. Engineered for ease of movement and enduring sartorial prestige.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {CATEGORIES.map((cat, idx) => (
            <div
              key={cat.id}
              ref={(el) => (cardsRef.current[idx] = el)}
              className="group relative rounded-3xl overflow-hidden glass-panel border border-white/10 hover:border-gold-500/40 p-8 sm:p-10 flex flex-col justify-between min-h-[420px] transition-all duration-700 shadow-2xl bg-luxury-900/40"
            >
              {/* Background Image with Parallax & Hover Zoom */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center opacity-30 group-hover:opacity-45 group-hover:scale-105 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-luxury-950 via-luxury-950/70 to-luxury-950/40" />
              </div>

              {/* Top Tag & Count */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="glass-pill px-3 py-1 rounded-full text-[10px] uppercase tracking-widest text-gold-300 font-medium">
                  {cat.subtitle}
                </span>
                <span className="text-xs font-mono text-luxury-400 tracking-wider">
                  {cat.count}
                </span>
              </div>

              {/* Bottom Content */}
              <div className="relative z-10 pt-16">
                <div className="flex items-end justify-between">
                  <div>
                    <span className="text-xs font-mono text-gold-400 uppercase tracking-widest block mb-1">
                      0{idx + 1}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl text-white font-light group-hover:text-gold-300 transition-colors">
                      {cat.title}
                    </h3>
                  </div>

                  <a
                    href="#featured-products"
                    className="w-12 h-12 rounded-full glass-panel border border-white/15 flex items-center justify-center text-white group-hover:bg-gold-500 group-hover:text-luxury-950 group-hover:border-gold-400 group-hover:scale-110 transition-all duration-300 shrink-0 shadow-lg"
                    aria-label={`Explore ${cat.title}`}
                  >
                    <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>

                <p className="mt-3 text-xs sm:text-sm text-luxury-300 font-light max-w-md leading-relaxed line-clamp-2">
                  {cat.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
