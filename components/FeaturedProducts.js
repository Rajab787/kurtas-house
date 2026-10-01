'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useShop } from '@/context/ShopContext';
import { PRODUCTS } from '@/data/products';
import { ShoppingBag, Eye, Heart, Sparkles, SlidersHorizontal, Check } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const CATEGORY_TABS = [
  'All Editions',
  'Modern Classics',
  'Ceremonial & Festive',
  'The Noir Collection',
];

export default function FeaturedProducts() {
  const [activeCategory, setActiveCategory] = useState('All Editions');
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  const {
    addToCart,
    setQuickViewProduct,
    wishlist,
    toggleWishlist,
    formatPrice,
  } = useShop();

  const filteredProducts = activeCategory === 'All Editions'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === activeCategory);

  // GSAP Staggered Scroll Entrance Animation
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const cards = gridRef.current?.querySelectorAll('.product-card');
    if (!cards || cards.length === 0) return;

    gsap.fromTo(
      cards,
      {
        opacity: 0,
        y: 40,
        scale: 0.97,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, [activeCategory]);

  return (
    <section
      id="featured-products"
      ref={sectionRef}
      className="relative py-28 px-4 sm:px-6 lg:px-8 bg-luxury-950"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-gold-400 font-medium">
                The Curated Gallery
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif text-white font-light tracking-tight mt-2">
              Signature Editions
            </h2>
            <p className="mt-3 text-sm text-luxury-400 max-w-lg leading-relaxed">
              Every garment is individually cut and hand-loomed. Certified pure botanical dyes and single-needle Japanese craftsmanship.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 mt-6 md:mt-0">
            {CATEGORY_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveCategory(tab)}
                className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider transition-all duration-300 ${
                  activeCategory === tab
                    ? 'bg-gold-500 text-luxury-950 font-medium shadow-md shadow-gold-500/20'
                    : 'glass-panel text-luxury-300 hover:text-white hover:border-gold-500/30'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid with Staggered Entrance */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8"
        >
          {filteredProducts.map((product) => {
            const isSaved = wishlist.includes(product.id);

            return (
              <div
                key={product.id}
                className="product-card group relative glass-panel rounded-3xl border border-white/10 overflow-hidden flex flex-col justify-between hover:border-gold-500/40 hover:shadow-2xl transition-all duration-500 bg-luxury-900/60"
              >
                {/* Visual Top Area */}
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-luxury-950">
                  <Image
                    src={product.stillImage}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-luxury-950 via-transparent to-luxury-950/30 opacity-70 group-hover:opacity-40 transition-opacity duration-500" />

                  {/* Top Badges */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
                    <span className="glass-pill px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider text-gold-300 font-medium backdrop-blur-md">
                      {product.badge}
                    </span>

                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className={`p-2 rounded-full glass-pill backdrop-blur-md transition-colors ${
                        isSaved
                          ? 'text-red-400 bg-red-500/20 border-red-500/30'
                          : 'text-luxury-300 hover:text-white'
                      }`}
                      title={isSaved ? 'Remove from wishlist' : 'Save to wishlist'}
                    >
                      <Heart
                        className="w-3.5 h-3.5"
                        fill={isSaved ? 'currentColor' : 'none'}
                      />
                    </button>
                  </div>

                  {/* Hover Quick View / Add Button Overlay */}
                  <div className="absolute inset-0 z-20 flex items-center justify-center gap-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-luxury-950/50 backdrop-blur-[2px]">
                    <button
                      onClick={() => setQuickViewProduct(product)}
                      className="p-3 rounded-full bg-luxury-900/90 text-white hover:bg-white hover:text-luxury-950 transition-colors shadow-xl"
                      title="Inspect Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => addToCart(product, '40 / M')}
                      className="px-4 py-2.5 rounded-full bg-gold-500 hover:bg-gold-400 text-luxury-950 font-medium text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-xl hover:scale-105 transition-all"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Quick Add</span>
                    </button>
                  </div>
                </div>

                {/* Bottom Card Content */}
                <div className="p-5 flex flex-col justify-between flex-1">
                  <div>
                    {/* Swatch & Category */}
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] uppercase tracking-widest text-gold-400">
                        {product.category}
                      </span>
                      <div className="flex items-center gap-1">
                        <span
                          className="w-2.5 h-2.5 rounded-full border border-white/20"
                          style={{ backgroundColor: product.hexColor }}
                          title={product.color}
                        />
                      </div>
                    </div>

                    <h3 className="font-serif text-lg text-white font-normal group-hover:text-gold-300 transition-colors duration-300">
                      {product.name}
                    </h3>

                    <p className="text-xs text-luxury-400 font-light mt-1 line-clamp-1">
                      {product.subtitle}
                    </p>
                  </div>

                  {/* Price and Add Action */}
                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-luxury-400 block">
                        Price
                      </span>
                      <span className="text-base font-serif font-medium text-white">
                        {formatPrice(product.price)}
                      </span>
                    </div>

                    <button
                      onClick={() => addToCart(product, '40 / M')}
                      className="px-3.5 py-1.5 rounded-full glass-panel border border-white/10 hover:border-gold-500/40 text-gold-400 text-xs uppercase tracking-wider font-medium hover:bg-gold-500 hover:text-luxury-950 transition-all duration-300"
                    >
                      Add to Bag
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
