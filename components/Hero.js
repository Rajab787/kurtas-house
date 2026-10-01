'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, Sparkles, Compass, ShieldCheck } from 'lucide-react';
import { useShop } from '@/context/ShopContext';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const containerRef = useRef(null);
  const visualWrapperRef = useRef(null);
  const visualCardRef = useRef(null);
  const textContentRef = useRef(null);
  const badgeLeftRef = useRef(null);
  const badgeRightRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const { openQuickView, addToCart } = useShop();

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Hero scroll-controlled timeline scrubbed directly to scroll position
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
          pin: false,
        },
      });

      // 3D transformation & parallax of the central hero product visual
      tl.to(
        visualCardRef.current,
        {
          scale: 1.12,
          rotateX: 14,
          rotateY: -8,
          yPercent: 30,
          boxShadow: '0 35px 80px rgba(0, 0, 0, 0.8), 0 0 50px rgba(197, 160, 89, 0.25)',
          ease: 'none',
        },
        0
      );

      // Text elements fade up and out with subtle parallax
      tl.to(
        textContentRef.current,
        {
          yPercent: -35,
          opacity: 0.15,
          ease: 'none',
        },
        0
      );

      // Left floating badge parallax
      if (badgeLeftRef.current) {
        tl.to(
          badgeLeftRef.current,
          {
            xPercent: -30,
            yPercent: -60,
            opacity: 0,
            ease: 'none',
          },
          0
        );
      }

      // Right floating badge parallax
      if (badgeRightRef.current) {
        tl.to(
          badgeRightRef.current,
          {
            xPercent: 30,
            yPercent: -40,
            opacity: 0,
            ease: 'none',
          },
          0
        );
      }

      // Scroll indicator fade
      if (scrollIndicatorRef.current) {
        tl.to(
          scrollIndicatorRef.current,
          {
            opacity: 0,
            y: 20,
            ease: 'none',
          },
          0
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[120vh] pt-28 pb-20 flex flex-col justify-between overflow-hidden bg-radial-vignette"
      style={{
        background: 'radial-gradient(ellipse at 50% 30%, #15151c 0%, #09090b 70%, #040405 100%)',
      }}
    >
      {/* Background subtle noise & lighting flares */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gold-500/10 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-luxury-700/20 rounded-full blur-[120px]" />
      </div>

      {/* Top Editorial Sub-bar */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel-subtle border border-gold-500/20 text-gold-300 text-[11px] tracking-[0.25em] uppercase mb-4 animate-fade-in">
          <Sparkles className="w-3 h-3 text-gold-400" />
          <span>Autumn / Winter 2026 Haute Couture Edition</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full flex flex-col items-center">
        {/* Cinematic Headline */}
        <div
          ref={textContentRef}
          className="text-center max-w-4xl mx-auto will-change-transform mb-8"
        >
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white font-light leading-[1.05]">
            The Architecture <br />
            <span className="italic font-normal gold-text-gradient font-serif">of Heritage</span>
          </h1>
          <p className="mt-6 text-sm sm:text-base md:text-lg text-luxury-400 font-light max-w-2xl mx-auto leading-relaxed tracking-wide">
            Handcrafted silhouettes shaped by movement. A continuous dialogue between ancient Indian handloom silk and razor-sharp contemporary form.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#sequence-showcase"
              className="px-7 py-3.5 rounded-full bg-gradient-to-r from-gold-500 to-gold-400 text-luxury-950 font-medium text-xs uppercase tracking-[0.2em] shadow-lg shadow-gold-500/20 hover:shadow-gold-500/35 hover:scale-[1.03] transition-all duration-300"
            >
              Explore The Sequence
            </a>
            <a
              href="#product-showcase"
              className="px-7 py-3.5 rounded-full glass-panel border border-white/15 text-luxury-200 hover:text-white hover:border-gold-500/40 text-xs uppercase tracking-[0.2em] transition-all duration-300"
            >
              The 24-Stitch Craft
            </a>
          </div>
        </div>

        {/* 3D Perspective Visual Container */}
        <div
          ref={visualWrapperRef}
          className="relative w-full max-w-4xl mx-auto flex items-center justify-center [perspective:1400px] mt-2 sm:mt-6"
        >
          {/* Floating Left Spec Badge */}
          <div
            ref={badgeLeftRef}
            className="hidden md:flex absolute -left-4 lg:-left-8 top-1/4 z-20 glass-panel p-4 rounded-2xl border border-white/10 max-w-[210px] shadow-2xl backdrop-blur-xl"
          >
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-widest text-gold-400 font-medium block">
                Textile Engineering
              </span>
              <p className="text-xs text-white font-serif font-light">
                100% Raw Handloom Matka Silk
              </p>
              <p className="text-[10px] text-luxury-400 leading-snug">
                Spun with organic botanical walnuts & zero synthetic binders.
              </p>
            </div>
          </div>

          {/* Floating Right Spec Badge */}
          <div
            ref={badgeRightRef}
            className="hidden md:flex absolute -right-4 lg:-right-8 bottom-1/4 z-20 glass-panel p-4 rounded-2xl border border-white/10 max-w-[210px] shadow-2xl backdrop-blur-xl"
          >
            <div className="space-y-1 text-right">
              <span className="text-[10px] uppercase tracking-widest text-gold-400 font-medium block">
                Atelier Standard
              </span>
              <p className="text-xs text-white font-serif font-light">
                24 Stitches Per Inch
              </p>
              <p className="text-[10px] text-luxury-400 leading-snug">
                Japanese micro-needle precision with hand-rolled silk hems.
              </p>
            </div>
          </div>

          {/* Central Hero Product Card */}
          <div
            ref={visualCardRef}
            className="relative w-full max-w-3xl aspect-[16/9] rounded-3xl overflow-hidden border border-white/10 shadow-luxury bg-luxury-900/60 backdrop-blur-md transform-gpu"
          >
            <Image
              src="/frames/00001.png"
              alt="KURA Atelier Terracotta Amber Kurta"
              fill
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-cover object-center transform transition-transform duration-700 hover:scale-105"
            />

            {/* Subtle Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-luxury-950/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-luxury-950/40 via-transparent to-luxury-950/40 pointer-events-none" />

            {/* Bottom Card Ribbon */}
            <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-white/90 uppercase tracking-widest text-[11px] font-medium">
                  Ref. 01 — Earth Amber Edition
                </span>
              </div>
              <span className="text-gold-400 uppercase tracking-wider text-[11px] font-sans">
                Scroll to animate
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="relative z-10 w-full flex flex-col items-center justify-center mt-12 text-center"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-luxury-400 mb-2 font-medium">
          Scroll To Direct The Motion
        </span>
        <div className="w-5 h-9 rounded-full border border-white/20 flex items-start justify-center p-1">
          <div className="w-1.5 h-2 rounded-full bg-gold-400 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
