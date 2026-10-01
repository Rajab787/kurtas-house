'use client';

import React from 'react';
import { useShop } from '@/context/ShopContext';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export default function Toast() {
  const { toast } = useShop();

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-in max-w-sm">
      <div className="glass-panel px-4 py-3 rounded-full flex items-center gap-3 border border-gold-500/30 shadow-2xl bg-luxury-900/90 text-luxury-100">
        <span className="w-6 h-6 rounded-full bg-gold-500/20 text-gold-400 flex items-center justify-center shrink-0">
          <CheckCircle2 className="w-3.5 h-3.5" />
        </span>
        <span className="text-xs tracking-wider uppercase font-medium text-luxury-200">
          {toast}
        </span>
      </div>
    </div>
  );
}
