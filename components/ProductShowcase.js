'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Layers, ShieldCheck, Feather, Scissors, Check, ShoppingBag } from 'lucide-react';
import { useShop } from '@/context/ShopContext';
import { PRODUCTS } from '@/data/products';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const CHAPTERS = [
  {
    index: '01',
    phase: 'Textile Genesis',
    title: 'Pure Gossamer & Handloom Silk',
    description: 'Every thread is spun on century-old pedal looms in Bengal and Chanderi. Blended with grade-A raw silk and Egyptian long-staple cotton for unmatched breathability.',
    statNumber: '180s',
    statLabel: 'Thread Count',
    hotspotY: '25%',
    hotspotX: '52%',
    feature: 'Botanical walnut & natural indigo dyeing',
  },
  {
    index: '02',
    phase: 'Atelier Tailoring',
    title: 'The 24-Stitch Standard',
    description: 'While standard luxury garments feature 12-14 stitches per inch, KURA garments are constructed with 24 micro-stitches per inch using single-needle Japanese steel machines.',
    statNumber: '24',
    statLabel: 'Stitches / Inch',
    hotspotY: '42%',
    hotspotX: '48%',
    feature: 'Reinforced bar-tacked side seam slits',
  },
  {
    index: '03',
    phase: 'Architectural Form',
    title: 'The Unrestrained Drape',
    description: 'Cut with a subtle 7-degree forward shoulder bias. Designed to fall straight and proud whether standing in greeting or seated during ceremonial rituals.',
    statNumber: '7°',
    statLabel: 'Shoulder Bias',
    hotspotY: '60%',
    hotspotX: '50%',
    feature: 'Concealed micro-pocket for mobile devices',
  },
  {
    index: '04',
    phase: 'Bespoke Details',
    title: 'Mother-of-Pearl & Monogram',
    description: 'Fastened with hand-carved Australian mother-of-pearl buttons mounted on elevated wax thread shanks. Finished with your bespoke monogram hand-embroidered inside.',
    statNumber: '100%',
    statLabel: 'Natural Elements',
    hotspotY: '38%',
    hotspotX: '51%',
    feature: 'Complimentary atelier sizing & monogram',
  },
];

export default function ProductShowcase() {
  const containerRef = useRef(null);
  const visualRef = useRef(null);
  const glowRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);
  const { addToCart, setQuickViewProduct, formatPrice } = useShop();

  const showcaseProduct = PRODUCTS[1]; // Imperial Ivory Chanderi Kurta

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          // Calculate active chapter: 0, 1, 2, 3
          const step = Math.min(3, Math.floor(progress * 4));
          setActiveStep(step);

          // Subtle interactive visual zoom & lighting pulse
          if (visualRef.current) {
            gsap.to(visualRef.current, {
              scale: 1 + Math.sin(progress * Math.PI) * 0.08,
              rotateY: (progress - 0.5) * 8,
              duration: 0.3,
              overwrite: 'auto',
            });
          }
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const currentChapter = CHAPTERS[activeStep];

  return (
    <section
      id="product-showcase"
      ref={containerRef}
      className="relative min-h-[350vh] bg-luxury-950"
    >
      {/* Pinned Viewport Container */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden px-4 sm:px-8 py-20">
        {/* Background ambient lighting */}
        <div
          ref={glowRef}
          className="absolute inset-0 pointer-events-none transition-colors duration-1000"
          style={{
            background:
              activeStep === 0
                ? 'radial-gradient(circle at 50% 50%, rgba(197, 160, 89, 0.08) 0%, transparent 70%)'
                : activeStep === 1
                ? 'radial-gradient(circle at 50% 50%, rgba(216, 185, 111, 0.12) 0%, transparent 70%)'
                : activeStep === 2
                ? 'radial-gradient(circle at 50% 50%, rgba(142, 142, 153, 0.1) 0%, transparent 70%)'
                : 'radial-gradient(circle at 50% 50%, rgba(230, 202, 133, 0.14) 0%, transparent 70%)',
          }}
        />

        {/* Section Top Header */}
        <div className="relative z-20 max-w-7xl mx-auto w-full flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-gold-400 font-medium">
                Atelier Pinned Anatomy
              </span>
            </div>
            <h2 className="text-xl sm:text-3xl font-serif text-white mt-1">
              Architecture In Motion
            </h2>
          </div>

          {/* Chapter Progress Indicators */}
          <div className="flex items-center gap-2">
            {CHAPTERS.map((ch, idx) => (
              <div
                key={ch.index}
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setActiveStep(idx)}
              >
                <div
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    idx === activeStep
                      ? 'w-8 bg-gold-400'
                      : idx < activeStep
                      ? 'w-3 bg-white/40'
                      : 'w-3 bg-white/10'
                  }`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Centerpiece Stage: Product Remains Centered while Surrounding Content Changes */}
        <div className="relative z-10 max-w-7xl mx-auto w-full my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Dynamic Editorial Card */}
          <div className="lg:col-span-4 order-2 lg:order-1">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-xl transition-all duration-700">
              <div className="flex items-center gap-2 text-gold-400 text-xs font-mono tracking-widest uppercase mb-3">
                <span>STAGE {currentChapter.index}</span>
                <span>•</span>
                <span>{currentChapter.phase}</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal leading-tight transition-all duration-500">
                {currentChapter.title}
              </h3>

              <p className="mt-4 text-xs sm:text-sm text-luxury-300 font-light leading-relaxed">
                {currentChapter.description}
              </p>

              <div className="mt-6 pt-5 border-t border-white/10 flex items-center gap-3 text-xs text-luxury-200">
                <span className="w-5 h-5 rounded-full bg-gold-500/20 text-gold-400 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3" />
                </span>
                <span className="font-sans">{currentChapter.feature}</span>
              </div>
            </div>
          </div>

          {/* Center Pinned Product Visual */}
          <div className="lg:col-span-4 order-1 lg:order-2 flex justify-center items-center">
            <div
              ref={visualRef}
              className="relative w-64 sm:w-80 md:w-96 aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border border-white/15 bg-luxury-900 transform-gpu transition-transform duration-300"
            >
              <Image
                src="/frames/00080.png"
                alt="The Imperial Ivory Chanderi Kurta"
                fill
                sizes="(max-width: 768px) 300px, 420px"
                className="object-cover object-center"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-luxury-950/80 via-transparent to-transparent pointer-events-none" />

              {/* Dynamic Hotspot Dot */}
              <div
                className="absolute z-20 pointer-events-none transition-all duration-700 ease-out"
                style={{
                  top: currentChapter.hotspotY,
                  left: currentChapter.hotspotX,
                }}
              >
                <div className="relative -translate-x-1/2 -translate-y-1/2">
                  <span className="w-6 h-6 rounded-full bg-gold-400 text-luxury-950 font-bold text-xs flex items-center justify-center shadow-glow animate-pulse">
                    {currentChapter.index}
                  </span>
                  <span className="absolute -inset-2 rounded-full border border-gold-400/50 animate-ping" />
                </div>
              </div>

              {/* Bottom Tag */}
              <div className="absolute bottom-4 left-4 right-4 text-center">
                <span className="text-[10px] uppercase tracking-[0.25em] text-white/90 glass-pill px-3 py-1 rounded-full">
                  Central Silhouette Locked
                </span>
              </div>
            </div>
          </div>

          {/* Right Dynamic Metric & Order Action Card */}
          <div className="lg:col-span-4 order-3">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-xl transition-all duration-700">
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-widest text-luxury-400">
                  Precision Metric
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-serif text-white gold-text-gradient font-light">
                    {currentChapter.statNumber}
                  </span>
                  <span className="text-xs uppercase tracking-widest text-gold-400 font-mono">
                    {currentChapter.statLabel}
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs uppercase tracking-wider text-luxury-300">
                    {showcaseProduct.name}
                  </span>
                  <span className="text-sm font-serif font-medium text-white">
                    {formatPrice(showcaseProduct.price)}
                  </span>
                </div>
                <p className="text-[11px] text-luxury-400 mb-5">
                  Made to order with bespoke hand-measurement consultation.
                </p>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuickViewProduct(showcaseProduct)}
                    className="flex-1 py-3 rounded-full glass-panel border border-white/15 text-luxury-200 hover:text-white text-xs uppercase tracking-wider transition-colors"
                  >
                    View Specs
                  </button>
                  <button
                    onClick={() => addToCart(showcaseProduct, '40 / M')}
                    className="flex-1 py-3 rounded-full bg-gradient-to-r from-gold-500 to-gold-400 text-luxury-950 font-medium text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-gold-500/20 hover:scale-105 transition-all"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Reserve</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Scroll Status Bar */}
        <div className="relative z-20 max-w-7xl mx-auto w-full flex items-center justify-between text-[11px] text-luxury-400 border-t border-white/5 pt-4">
          <span className="uppercase tracking-widest">
            Chapter {currentChapter.index} of 04: {currentChapter.title}
          </span>
          <span className="font-mono text-gold-400">
            Scroll to cycle surrounding chapters ↓
          </span>
        </div>
      </div>
    </section>
  );
}
