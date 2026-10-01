'use client';

import React from 'react';
import { ArrowUp, Sparkles, Heart } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050507] border-t border-white/10 pt-20 pb-12 px-4 sm:px-6 lg:px-8 text-luxury-400">
      <div className="max-w-7xl mx-auto">
        {/* Top Tier: Brand & Back to Top */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-16 border-b border-white/10 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-serif text-3xl sm:text-4xl text-white font-light tracking-[0.25em]">
                KURA
              </span>
              <span className="text-[10px] uppercase tracking-[0.4em] text-gold-400 border-l border-white/20 pl-2">
                Atelier Noir
              </span>
            </div>
            <p className="text-xs sm:text-sm text-luxury-400 font-light max-w-md leading-relaxed">
              The modern architecture of heritage kurta tailoring. Handcrafted slow luxury for ceremonial celebrations and timeless everyday living.
            </p>
          </div>

          <button
            onClick={scrollToTop}
            className="self-start md:self-auto px-5 py-3 rounded-full glass-panel border border-white/15 text-luxury-200 hover:text-white hover:border-gold-400 text-xs uppercase tracking-widest flex items-center gap-2 transition-all duration-300"
          >
            <span>Back To Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-gold-400" />
          </button>
        </div>

        {/* Middle Tier: 4-Column Navigation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16 text-xs font-light">
          {/* Col 1 */}
          <div className="space-y-3">
            <span className="text-[11px] uppercase tracking-[0.25em] text-white font-medium block mb-4">
              Collections
            </span>
            <ul className="space-y-2.5">
              <li>
                <a href="#featured-products" className="hover:text-gold-300 transition-colors">
                  Modern Classics
                </a>
              </li>
              <li>
                <a href="#featured-products" className="hover:text-gold-300 transition-colors">
                  Imperial Chanderi
                </a>
              </li>
              <li>
                <a href="#featured-products" className="hover:text-gold-300 transition-colors">
                  Obsidian Evening Noir
                </a>
              </li>
              <li>
                <a href="#featured-products" className="hover:text-gold-300 transition-colors">
                  Kashmiri Pashmina Blend
                </a>
              </li>
              <li>
                <a href="#featured-products" className="hover:text-gold-300 transition-colors">
                  Bespoke Wedding Archive
                </a>
              </li>
            </ul>
          </div>

          {/* Col 2 */}
          <div className="space-y-3">
            <span className="text-[11px] uppercase tracking-[0.25em] text-white font-medium block mb-4">
              Atelier Services
            </span>
            <ul className="space-y-2.5">
              <li>
                <a href="#cta-section" className="hover:text-gold-300 transition-colors">
                  Virtual 3D Fitting
                </a>
              </li>
              <li>
                <a href="#cta-section" className="hover:text-gold-300 transition-colors">
                  Private Salon Appointments
                </a>
              </li>
              <li>
                <a href="#cta-section" className="hover:text-gold-300 transition-colors">
                  Bespoke Monogramming
                </a>
              </li>
              <li>
                <a href="#craftsmanship" className="hover:text-gold-300 transition-colors">
                  Lifetime Alterations
                </a>
              </li>
              <li>
                <a href="#craftsmanship" className="hover:text-gold-300 transition-colors">
                  Fabric Swatch Box
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-3">
            <span className="text-[11px] uppercase tracking-[0.25em] text-white font-medium block mb-4">
              Salons & Cities
            </span>
            <ul className="space-y-2.5 text-luxury-400">
              <li>London — Mayfair Studio</li>
              <li>New York — Madison Avenue</li>
              <li>Dubai — DIFC Gate Village</li>
              <li>Mumbai — Colaba Heritage Suite</li>
              <li>Jaipur — Guild Workshop</li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="space-y-3">
            <span className="text-[11px] uppercase tracking-[0.25em] text-white font-medium block mb-4">
              Ethos & Inquiries
            </span>
            <ul className="space-y-2.5">
              <li>
                <span className="text-luxury-400 block">Atelier Concierge:</span>
                <span className="text-white hover:text-gold-300 cursor-pointer">
                  concierge@kura-atelier.com
                </span>
              </li>
              <li className="pt-2">
                <span className="text-luxury-400 block">Press & Editorial:</span>
                <span className="text-white hover:text-gold-300 cursor-pointer">
                  press@kura-atelier.com
                </span>
              </li>
              <li className="pt-2 text-[10px] text-gold-400/80">
                Studio Hours: Mon - Sat • 10:00 - 20:00 IST
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Tier: Copyright & Disclaimers */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-luxury-500 gap-4">
          <p>
            &copy; {new Date().getFullYear()} KURA ATELIER NOIR. All rights reserved. Precision tailoring crafted in India.
          </p>

          <div className="flex items-center gap-6 text-[10px] uppercase tracking-wider">
            <span className="hover:text-luxury-300 cursor-pointer">Privacy Charter</span>
            <span className="hover:text-luxury-300 cursor-pointer">Terms of Bespoke</span>
            <span className="hover:text-luxury-300 cursor-pointer">Carbon Footprint</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
