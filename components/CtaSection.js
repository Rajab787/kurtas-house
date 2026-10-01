'use client';

import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Sparkles, ShieldCheck, CheckCircle } from 'lucide-react';
import { useShop } from '@/context/ShopContext';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CtaSection() {
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { showToast } = useShop();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubmitted(true);
    showToast('Privileged Atelier invitation requested.');
    setEmail('');
  };

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          { scale: 0.94, opacity: 0.8 },
          {
            scale: 1,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 80%',
              end: 'top 30%',
              scrub: 1,
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="cta-section"
      ref={containerRef}
      className="relative py-28 px-4 sm:px-6 lg:px-8 bg-luxury-950 overflow-hidden"
    >
      {/* Background glow flares */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-r from-gold-600/10 to-amber-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div
          ref={cardRef}
          className="relative rounded-3xl overflow-hidden glass-panel border border-gold-500/30 p-8 sm:p-14 md:p-16 text-center shadow-2xl bg-gradient-to-b from-luxury-900/90 via-luxury-900/60 to-luxury-950 will-change-transform"
        >
          {/* Subtle Decorative Lines */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[1px] bg-gradient-to-r from-transparent via-gold-400 to-transparent" />

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel-subtle text-gold-400 text-[10px] tracking-[0.3em] uppercase mb-6">
            <Sparkles className="w-3 h-3 text-gold-400" />
            <span>By Private Invitation</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-white font-light tracking-tight max-w-3xl mx-auto leading-tight">
            Step Into The Living <br />
            <span className="italic gold-text-gradient font-normal">Atelier Experience</span>
          </h2>

          <p className="mt-6 text-xs sm:text-base text-luxury-300 font-light max-w-2xl mx-auto leading-relaxed">
            Whether for milestone weddings, state banquets, or quiet everyday elegance. Receive tailored made-to-measure consultations, fabric swatches, and private salon access.
          </p>

          {/* Consultation Form */}
          <div className="mt-10 max-w-md mx-auto">
            {submitted ? (
              <div className="p-4 rounded-2xl glass-panel border border-gold-500/40 text-gold-300 text-xs flex items-center justify-center gap-2 animate-fade-in">
                <CheckCircle className="w-4 h-4 text-gold-400" />
                <span>Thank you. Our atelier concierge will contact you within 24 hours.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your private email..."
                  required
                  className="flex-1 px-5 py-3.5 rounded-full glass-panel border border-white/15 text-white placeholder-luxury-400 text-xs focus:outline-none focus:border-gold-400 transition-colors"
                />
                <button
                  type="submit"
                  className="px-6 py-3.5 rounded-full bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-400 hover:to-gold-300 text-luxury-950 font-medium text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-gold-500/20 hover:scale-105 transition-all shrink-0"
                >
                  <span>Request Access</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>

          {/* Trust Guarantees */}
          <div className="mt-10 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-[11px] text-luxury-400 uppercase tracking-widest">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
              Bespoke Fitting Guarantee
            </span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              Complimentary Lifetime Alterations
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
              Carbon-Neutral Courier
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
