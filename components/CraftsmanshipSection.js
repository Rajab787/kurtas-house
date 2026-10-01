'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CRAFT_SPECS } from '@/data/products';
import { ShieldCheck, Award, Sparkles, Feather, Scissors, RefreshCw } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CraftsmanshipSection() {
  const sectionRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Gentle parallax between columns
      if (leftColRef.current) {
        gsap.to(leftColRef.current, {
          y: -30,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }

      if (rightColRef.current) {
        gsap.to(rightColRef.current, {
          y: 30,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="craftsmanship"
      ref={sectionRef}
      className="relative py-32 px-4 sm:px-6 lg:px-8 bg-luxury-950 overflow-hidden border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel-subtle text-gold-400 text-[10px] tracking-[0.3em] uppercase mb-3">
            <Sparkles className="w-3 h-3 text-gold-400" />
            <span>Heritage & Discipline</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-white font-light tracking-tight">
            The Discipline of Slow Luxury
          </h2>
          <p className="mt-5 text-sm sm:text-base text-luxury-300 font-light leading-relaxed">
            In an era of disposable fashion, we measure our production in weeks, not minutes. Each garment embodies centuries of Indian handloom mastery, refined by contemporary architectural tailoring.
          </p>
        </div>

        {/* 2-Column Split: Metrics vs Visual Gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: 4 Metric Cards */}
          <div
            ref={leftColRef}
            className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6 will-change-transform"
          >
            {CRAFT_SPECS.map((spec, i) => (
              <div
                key={i}
                className="glass-panel p-6 sm:p-7 rounded-3xl border border-white/10 hover:border-gold-500/40 transition-colors duration-500 bg-luxury-900/60 shadow-xl"
              >
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="font-serif text-4xl sm:text-5xl text-white font-light gold-text-gradient">
                    {spec.number}
                  </span>
                  <span className="text-[10px] uppercase tracking-widest text-gold-400 font-mono">
                    {spec.unit}
                  </span>
                </div>
                <h3 className="font-serif text-lg text-white font-normal mt-2">
                  {spec.title}
                </h3>
                <p className="mt-2 text-xs text-luxury-400 font-light leading-relaxed">
                  {spec.description}
                </p>
              </div>
            ))}
          </div>

          {/* Right Column: Parallax Image Duo */}
          <div
            ref={rightColRef}
            className="lg:col-span-6 relative will-change-transform"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden glass-panel border border-white/10 shadow-2xl">
              <Image
                src="/frames/00140.png"
                alt="Obsidian Noir Handcraft"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-luxury-950 via-transparent to-transparent pointer-events-none" />

              {/* Floating Quote Card */}
              <div className="absolute bottom-6 left-6 right-6 glass-panel p-5 rounded-2xl border border-white/10 backdrop-blur-xl shadow-2xl">
                <p className="text-xs text-luxury-200 font-light italic leading-relaxed">
                  &ldquo;A garment should never fight the wearer. It should fall effortlessly, whisper elegance, and withstand the passage of time.&rdquo;
                </p>
                <div className="mt-3 flex items-center justify-between text-[10px] uppercase tracking-wider text-gold-400">
                  <span>Atelier Master Craftsman</span>
                  <span>Jaipur & Srinagar Guilds</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
