'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useShop } from '@/context/ShopContext';
import { PRODUCTS } from '@/data/products';
import { ArrowRight, ShoppingBag, Eye, Sparkles, MoveRight } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HorizontalScroll() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const { addToCart, setQuickViewProduct, formatPrice } = useShop();

  const curatedItems = [
    {
      type: 'editorial',
      title: 'The Autumn / Winter Capsule',
      subtitle: 'LOOKBOOK 2026',
      description: 'A study in restraint, balance, and textile density. Handcrafted silhouettes designed to flow effortlessly with human movement.',
      tag: 'Curation',
      bgGradient: 'from-amber-950/40 via-luxury-900 to-luxury-950',
    },
    {
      type: 'product',
      product: PRODUCTS[0],
    },
    {
      type: 'product',
      product: PRODUCTS[1],
    },
    {
      type: 'editorial',
      title: '72 Hours of Generational Looming',
      subtitle: 'HERITAGE METRIC',
      description: 'Each yard of Matka silk and Chanderi zari is woven on pedal looms by third-generation artisan families preserving ancient craft techniques.',
      tag: 'Handcrafted',
      bgGradient: 'from-gold-950/30 via-luxury-900 to-luxury-950',
    },
    {
      type: 'product',
      product: PRODUCTS[2],
    },
    {
      type: 'product',
      product: PRODUCTS[3],
    },
    {
      type: 'outro',
      title: 'The Bespoke Consultation',
      subtitle: 'ATELIER SERVICE',
      description: 'Reserve an in-person fitting in our London, New York, or Mumbai suites, or schedule a virtual 3D photogrammetry sizing appointment.',
      tag: 'Made to Measure',
      bgGradient: 'from-zinc-900 via-luxury-900 to-luxury-950',
    },
  ];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    let ctx = gsap.context(() => {
      // Calculate total horizontal travel distance
      const getScrollAmount = () => track.scrollWidth - window.innerWidth + 80;

      const tween = gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: () => `+=${getScrollAmount()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      // Subtle parallax on inner product images
      const images = track.querySelectorAll('.parallax-img');
      images.forEach((img) => {
        gsap.fromTo(
          img,
          { xPercent: 12 },
          {
            xPercent: -12,
            ease: 'none',
            scrollTrigger: {
              trigger: container,
              start: 'top top',
              end: () => `+=${getScrollAmount()}`,
              scrub: 1,
            },
          }
        );
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="lookbook"
      ref={containerRef}
      className="relative min-h-screen bg-luxury-900 overflow-hidden"
    >
      {/* Pinned Viewport Container */}
      <div className="h-screen w-full flex flex-col justify-between py-12 sm:py-16">
        {/* Section Top Header */}
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-8 flex items-center justify-between mb-4 sm:mb-8">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-gold-400 font-medium">
                Scroll-Driven Gallery
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif text-white tracking-wide mt-1">
              Curated Lookbook
            </h2>
          </div>

          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-luxury-400">
            <MoveRight className="w-4 h-4 text-gold-400 animate-pulse" />
            <span className="hidden sm:inline">Scroll down to advance horizontally</span>
          </div>
        </div>

        {/* Horizontal Track Container */}
        <div className="w-full flex-1 flex items-center overflow-x-auto lg:overflow-visible no-scrollbar px-4 sm:px-8">
          <div
            ref={trackRef}
            className="flex items-center gap-6 sm:gap-8 will-change-transform pr-16"
          >
            {curatedItems.map((item, index) => {
              if (item.type === 'editorial') {
                return (
                  <div
                    key={index}
                    className={`shrink-0 w-[290px] sm:w-[380px] h-[480px] sm:h-[540px] rounded-3xl p-8 flex flex-col justify-between border border-white/10 glass-panel bg-gradient-to-br ${item.bgGradient} shadow-2xl relative overflow-hidden`}
                  >
                    <div className="space-y-2">
                      <span className="text-[10px] uppercase tracking-[0.25em] text-gold-400 font-medium">
                        {item.tag}
                      </span>
                      <h3 className="font-serif text-2xl sm:text-3xl text-white font-light leading-snug">
                        {item.title}
                      </h3>
                    </div>

                    <div className="space-y-4">
                      <p className="text-xs sm:text-sm text-luxury-300 font-light leading-relaxed">
                        {item.description}
                      </p>
                      <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-gold-400 uppercase tracking-widest font-medium">
                        <span>{item.subtitle}</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                );
              }

              if (item.type === 'outro') {
                return (
                  <div
                    key={index}
                    className="shrink-0 w-[290px] sm:w-[380px] h-[480px] sm:h-[540px] rounded-3xl p-8 flex flex-col justify-between border border-gold-500/30 glass-panel bg-gradient-to-br from-gold-950/20 via-luxury-900 to-luxury-950 shadow-2xl relative"
                  >
                    <div className="space-y-2">
                      <span className="text-[10px] uppercase tracking-[0.25em] text-gold-400 font-medium">
                        {item.tag}
                      </span>
                      <h3 className="font-serif text-2xl sm:text-3xl text-white font-light leading-snug">
                        {item.title}
                      </h3>
                    </div>

                    <div className="space-y-6">
                      <p className="text-xs sm:text-sm text-luxury-300 font-light leading-relaxed">
                        {item.description}
                      </p>
                      <a
                        href="#cta-section"
                        className="w-full py-3.5 rounded-full bg-gold-500 hover:bg-gold-400 text-luxury-950 font-medium text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-gold-500/20 hover:scale-105 transition-all"
                      >
                        <span>Schedule Appointment</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                );
              }

              const prod = item.product;
              return (
                <div
                  key={prod.id}
                  className="shrink-0 w-[280px] sm:w-[350px] h-[480px] sm:h-[540px] rounded-3xl glass-panel border border-white/10 overflow-hidden flex flex-col justify-between p-4 shadow-2xl group hover:border-gold-500/40 transition-all duration-500"
                >
                  {/* Image Container with Parallax Effect */}
                  <div className="relative w-full h-[65%] rounded-2xl overflow-hidden bg-luxury-950">
                    <div className="absolute -inset-4 parallax-img will-change-transform">
                      <Image
                        src={prod.stillImage}
                        alt={prod.name}
                        fill
                        sizes="(max-width: 768px) 280px, 350px"
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-luxury-950/80 via-transparent to-transparent pointer-events-none" />

                    {/* Tag badge */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className="glass-pill px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider text-gold-300 font-medium">
                        {prod.badge}
                      </span>
                    </div>

                    {/* Hover Quick Actions */}
                    <div className="absolute inset-0 z-20 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-luxury-950/40 backdrop-blur-[2px]">
                      <button
                        onClick={() => setQuickViewProduct(prod)}
                        className="p-3 rounded-full bg-luxury-900/90 hover:bg-white text-white hover:text-luxury-950 transition-colors shadow-xl"
                        title="Quick View"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => addToCart(prod, '40 / M')}
                        className="px-4 py-3 rounded-full bg-gold-500 hover:bg-gold-400 text-luxury-950 font-medium text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-xl transition-all hover:scale-105"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="pt-3 pb-1 px-2 flex flex-col justify-between flex-1">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-gold-400 block">
                        {prod.category}
                      </span>
                      <h4 className="font-serif text-base sm:text-lg text-white font-normal truncate mt-0.5">
                        {prod.name}
                      </h4>
                      <p className="text-[11px] text-luxury-400 truncate mt-0.5">
                        {prod.fabric}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-white/5">
                      <span className="text-base sm:text-lg font-serif text-white font-medium">
                        {formatPrice(prod.price)}
                      </span>
                      <button
                        onClick={() => addToCart(prod, '40 / M')}
                        className="text-xs uppercase tracking-wider text-gold-400 hover:text-gold-300 font-medium flex items-center gap-1 group/btn"
                      >
                        <span>Reserve</span>
                        <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Horizontal Bar */}
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-8 flex items-center justify-between text-[11px] text-luxury-400 border-t border-white/5 pt-4">
          <span className="uppercase tracking-widest">
            Chapter 02 / The Autumn 2026 Collection
          </span>
          <span className="font-mono text-gold-400">
            {curatedItems.length} Curated Works
          </span>
        </div>
      </div>
    </section>
  );
}
