'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useShop } from '@/context/ShopContext';
import { X, ShoppingBag, Heart, Check, Sparkles, ShieldCheck, Ruler } from 'lucide-react';

export default function QuickViewModal() {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    wishlist,
    toggleWishlist,
    formatPrice,
  } = useShop();

  const [selectedSize, setSelectedSize] = useState('40 / M');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (quickViewProduct?.sizes?.length > 0) {
      setSelectedSize(quickViewProduct.sizes[1] || quickViewProduct.sizes[0]);
    }
  }, [quickViewProduct]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setQuickViewProduct(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setQuickViewProduct]);

  if (!quickViewProduct) return null;

  const isSaved = wishlist.includes(quickViewProduct.id);

  const handleAdd = () => {
    addToCart(quickViewProduct, selectedSize, quantity);
    setQuickViewProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 lg:p-8 select-none">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-luxury-950/80 backdrop-blur-md transition-opacity animate-fade-in"
        onClick={() => setQuickViewProduct(null)}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl glass-panel bg-luxury-950/95 rounded-3xl border border-white/15 shadow-2xl overflow-hidden z-10 animate-scale-up">
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full glass-panel border border-white/10 text-luxury-300 hover:text-white hover:border-gold-400 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Product Visual */}
          <div className="relative aspect-[3/4] md:aspect-auto md:h-full min-h-[380px] bg-luxury-900">
            <Image
              src={quickViewProduct.stillImage}
              alt={quickViewProduct.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-luxury-950/80 via-transparent to-transparent pointer-events-none" />

            <div className="absolute top-4 left-4 z-10">
              <span className="glass-pill px-3 py-1 rounded-full text-[10px] uppercase tracking-wider text-gold-300 font-medium">
                {quickViewProduct.badge}
              </span>
            </div>
          </div>

          {/* Right: Product Details & Purchase Form */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              {/* Category & Tag */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.25em] text-gold-400 font-medium">
                  {quickViewProduct.category}
                </span>
                <button
                  onClick={() => toggleWishlist(quickViewProduct.id)}
                  className="flex items-center gap-1.5 text-xs text-luxury-400 hover:text-gold-300"
                >
                  <Heart
                    className="w-4 h-4"
                    fill={isSaved ? 'currentColor' : 'none'}
                    color={isSaved ? '#f87171' : 'currentColor'}
                  />
                  <span>{isSaved ? 'Saved' : 'Save'}</span>
                </button>
              </div>

              {/* Title & Price */}
              <h2 className="font-serif text-2xl sm:text-3xl text-white font-light mt-2 leading-tight">
                {quickViewProduct.name}
              </h2>
              <p className="text-xs text-luxury-400 font-light mt-1">
                {quickViewProduct.subtitle}
              </p>

              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-2xl font-serif font-medium text-white">
                  {formatPrice(quickViewProduct.price)}
                </span>
                <span className="text-[11px] text-emerald-400 uppercase tracking-widest font-mono">
                  In Atelier Stock
                </span>
              </div>

              {/* Description */}
              <p className="mt-4 text-xs sm:text-sm text-luxury-300 font-light leading-relaxed">
                {quickViewProduct.description}
              </p>

              {/* Specifications Pills */}
              {quickViewProduct.specs && (
                <div className="grid grid-cols-2 gap-2 mt-5 text-[11px]">
                  <div className="p-2.5 rounded-xl glass-panel-subtle border border-white/5">
                    <span className="text-luxury-500 block text-[9px] uppercase tracking-wider">
                      Weave
                    </span>
                    <span className="text-luxury-200 font-medium">{quickViewProduct.specs.weave}</span>
                  </div>
                  <div className="p-2.5 rounded-xl glass-panel-subtle border border-white/5">
                    <span className="text-luxury-500 block text-[9px] uppercase tracking-wider">
                      Collar
                    </span>
                    <span className="text-luxury-200 font-medium">{quickViewProduct.specs.collar}</span>
                  </div>
                </div>
              )}

              {/* Size Selector */}
              <div className="mt-6">
                <div className="flex items-center justify-between text-xs mb-2.5">
                  <span className="text-luxury-300 uppercase tracking-wider text-[11px]">
                    Select Sizing
                  </span>
                  <span className="text-gold-400 flex items-center gap-1 cursor-pointer text-[11px]">
                    <Ruler className="w-3 h-3" />
                    Size Guide (Inches)
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {quickViewProduct.sizes?.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3.5 py-2 rounded-xl text-xs tracking-wider transition-all ${
                        selectedSize === size
                          ? 'bg-gold-500 text-luxury-950 font-medium shadow-md shadow-gold-500/20'
                          : 'glass-panel text-luxury-300 hover:text-white hover:border-gold-500/30'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-white/10 space-y-3">
              <button
                onClick={handleAdd}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-400 hover:to-gold-300 text-luxury-950 font-medium text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 shadow-lg shadow-gold-500/25 hover:scale-[1.02] transition-all"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Bag • {formatPrice(quickViewProduct.price)}</span>
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-luxury-400 uppercase tracking-widest text-center">
                <ShieldCheck className="w-3 h-3 text-gold-400" />
                <span>Complimentary Express Courier & 30-Day Alterations</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
