'use client';

import React, { useState, useEffect } from 'react';
import { useShop } from '@/context/ShopContext';
import { CURRENCIES } from '@/data/products';
import { ShoppingBag, Heart, Menu, X, ChevronDown, Compass, Sparkles } from 'lucide-react';

export default function Navbar() {
  const {
    currency,
    setCurrency,
    cartItemCount,
    setIsCartOpen,
    wishlist,
  } = useShop();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'The Sequence', href: '#sequence-showcase' },
    { label: 'Featured', href: '#featured-products' },
    { label: 'The Craft', href: '#product-showcase' },
    { label: 'Lookbook', href: '#lookbook' },
    { label: 'Categories', href: '#categories' },
    { label: 'Heritage', href: '#craftsmanship' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-out ${
        isScrolled
          ? 'bg-luxury-950/85 backdrop-blur-xl border-b border-white/10 py-3.5 shadow-2xl'
          : 'bg-gradient-to-b from-luxury-950/80 via-luxury-950/40 to-transparent py-5 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Left: Mobile Toggle & Desktop Nav */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-luxury-200 hover:text-white transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <nav className="hidden lg:flex items-center space-x-7">
              {navLinks.slice(0, 3).map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-xs uppercase tracking-[0.22em] font-medium text-luxury-400 hover:text-gold-400 transition-colors duration-300 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold-400 transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </nav>
          </div>

          {/* Center: Brand Identity */}
          <a
            href="#"
            className="flex flex-col items-center group text-center select-none"
          >
            <span className="font-serif text-lg sm:text-2xl tracking-[0.35em] text-white font-light group-hover:text-gold-300 transition-colors duration-300">
              KURA
            </span>
            <span className="text-[9px] uppercase tracking-[0.45em] text-gold-400/80 -mt-0.5 font-sans">
              ATELIER NOIR
            </span>
          </a>

          {/* Right: Actions (Currency, Wishlist, Bag) */}
          <div className="flex items-center space-x-3 sm:space-x-5">
            {/* Desktop right nav links */}
            <nav className="hidden xl:flex items-center space-x-6 mr-2">
              {navLinks.slice(3).map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-xs uppercase tracking-[0.22em] font-medium text-luxury-400 hover:text-gold-400 transition-colors duration-300 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold-400 transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </nav>

            {/* Currency Selector */}
            <div className="relative">
              <button
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className="flex items-center gap-1 text-[11px] font-medium tracking-wider uppercase text-luxury-300 hover:text-white px-2.5 py-1.5 rounded-full border border-white/10 hover:border-white/20 transition-all duration-200"
              >
                <span>{currency}</span>
                <ChevronDown className="w-3 h-3 text-luxury-400" />
              </button>

              {currencyDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setCurrencyDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-32 py-1.5 rounded-xl glass-panel shadow-2xl z-50 border border-white/15 bg-luxury-900/95">
                    {Object.keys(CURRENCIES).map((curr) => (
                      <button
                        key={curr}
                        onClick={() => {
                          setCurrency(curr);
                          setCurrencyDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3.5 py-1.5 text-xs tracking-wider uppercase transition-colors flex items-center justify-between ${
                          currency === curr
                            ? 'text-gold-400 bg-gold-500/10 font-medium'
                            : 'text-luxury-300 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <span>{curr}</span>
                        <span className="text-[10px] text-luxury-400">
                          {CURRENCIES[curr].symbol}
                        </span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Wishlist Button */}
            <a
              href="#featured-products"
              className="relative p-2 text-luxury-300 hover:text-white transition-colors"
              title="Saved Pieces"
            >
              <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-gold-400 ring-2 ring-luxury-950" />
              )}
            </a>

            {/* Bag Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-luxury-300 hover:text-gold-300 transition-colors flex items-center gap-1.5 group"
              aria-label="Open Shopping Bag"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-105 transition-transform" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 min-w-[17px] h-[17px] px-1 rounded-full bg-gold-500 text-luxury-950 text-[10px] font-bold flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </div>
              <span className="hidden md:inline-block text-[11px] uppercase tracking-widest text-luxury-400 group-hover:text-gold-300">
                Bag
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide-down Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden glass-panel border-b border-white/10 px-6 py-6 mt-3 bg-luxury-950/95 backdrop-blur-2xl">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm uppercase tracking-[0.25em] text-luxury-300 hover:text-gold-400 py-2 border-b border-white/5 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 flex items-center justify-between text-xs text-luxury-400">
              <span>Bespoke Concierge Available</span>
              <span className="text-gold-400">Autumn / Winter 2026</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
