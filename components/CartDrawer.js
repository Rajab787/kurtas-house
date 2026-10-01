'use client';

import React from 'react';
import Image from 'next/image';
import { useShop } from '@/context/ShopContext';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export default function CartDrawer() {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    updateQuantity,
    removeFromCart,
    formatPrice,
    cartTotalUSD,
    cartItemCount,
  } = useShop();

  if (!isCartOpen) return null;

  const freeShippingThreshold = 500;
  const progressToFreeShipping = Math.min(100, Math.round((cartTotalUSD / freeShippingThreshold) * 100));
  const amountRemaining = Math.max(0, freeShippingThreshold - cartTotalUSD);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-luxury-950/70 backdrop-blur-md transition-opacity animate-fade-in"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Slide-out Drawer */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-md bg-luxury-950/95 border-l border-white/10 p-6 flex flex-col justify-between shadow-2xl backdrop-blur-2xl">
          {/* Top Bar */}
          <div className="flex items-center justify-between pb-5 border-b border-white/10">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-gold-400" />
              <h2 className="font-serif text-xl text-white font-normal tracking-wide">
                Your Bag ({cartItemCount})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-luxury-400 hover:text-white transition-colors"
              aria-label="Close bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Meter */}
          <div className="py-3 px-3.5 my-3 rounded-2xl glass-panel-subtle border border-white/5">
            <div className="flex items-center justify-between text-[11px] mb-1.5">
              <span className="text-luxury-300">
                {amountRemaining > 0 ? (
                  <>Add <span className="text-gold-400 font-semibold">{formatPrice(amountRemaining)}</span> for Complimentary Worldwide Courier</>
                ) : (
                  <span className="text-emerald-400 font-medium flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Complimentary Express Bespoke Courier Unlocked!
                  </span>
                )}
              </span>
            </div>
            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-gold-500 to-amber-300 transition-all duration-500 rounded-full"
                style={{ width: `${progressToFreeShipping}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto py-2 space-y-4 pr-1">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full glass-panel flex items-center justify-center text-luxury-500 border border-white/10">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-lg text-white">Your bag is currently empty</h3>
                <p className="text-xs text-luxury-400 max-w-xs leading-relaxed">
                  Discover our Autumn/Winter 2026 hand-loomed silk and imperial cotton silhouettes.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 rounded-full bg-gold-500 text-luxury-950 font-medium text-xs uppercase tracking-wider hover:bg-gold-400 transition-colors"
                >
                  Explore Editions
                </button>
              </div>
            ) : (
              cart.map((item, index) => (
                <div
                  key={`${item.product.id}-${item.size}-${index}`}
                  className="flex gap-4 p-3 rounded-2xl glass-panel-subtle border border-white/5 relative group"
                >
                  {/* Thumbnail */}
                  <div className="relative w-20 h-24 rounded-xl overflow-hidden bg-luxury-900 shrink-0 border border-white/10">
                    <Image
                      src={item.product.stillImage}
                      alt={item.product.name}
                      fill
                      sizes="80px"
                      className="object-cover object-center"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between py-0.5">
                    <div>
                      <div className="flex items-start justify-between">
                        <h4 className="font-serif text-sm text-white font-normal line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.size)}
                          className="text-luxury-500 hover:text-red-400 p-1 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 mt-1 text-[11px] text-luxury-400">
                        <span>Size: <strong className="text-white font-normal">{item.size}</strong></span>
                        <span>•</span>
                        <span>{item.product.color}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity Stepper */}
                      <div className="flex items-center gap-2 glass-pill px-2 py-1 rounded-full border border-white/10">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.size, -1)}
                          className="text-luxury-400 hover:text-white p-0.5"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-mono text-white px-1">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.size, 1)}
                          className="text-luxury-400 hover:text-white p-0.5"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-sm font-serif text-white font-medium">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Bottom Checkout Section */}
          {cart.length > 0 && (
            <div className="pt-4 border-t border-white/10 space-y-4">
              <div className="space-y-1.5 text-xs text-luxury-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-white font-mono">{formatPrice(cartTotalUSD)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Bespoke Hand Finishing</span>
                  <span className="text-gold-400">Complimentary</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-white/5 text-sm text-white font-medium">
                  <span className="font-serif">Total Due</span>
                  <span className="font-serif text-base text-gold-400">
                    {formatPrice(cartTotalUSD)}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  alert('Proceeding to KURA Atelier Secure Checkout. Your bespoke garments will be hand-inspected before dispatch.');
                }}
                className="w-full py-4 rounded-full bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-400 hover:to-gold-300 text-luxury-950 font-medium text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 shadow-lg shadow-gold-500/20 hover:scale-[1.02] transition-all"
              >
                <span>Proceed To Bespoke Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-luxury-500 uppercase tracking-widest text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
                <span>Encrypted Atelier Guarantee • Made to Order</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
