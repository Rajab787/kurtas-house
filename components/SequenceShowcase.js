'use client';

import React, { useEffect, useRef, useState, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useShop } from '@/context/ShopContext';
import { PRODUCTS } from '@/data/products';
import {
  Sparkles,
  ShoppingBag,
  Eye,
  Sliders,
  Maximize2,
  Info,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const TOTAL_FRAMES = 240;

export default function SequenceShowcase() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [currentFrame, setCurrentFrame] = useState(1);
  const [loadProgress, setLoadProgress] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState(null);
  const imagesRef = useRef([]);
  const frameObjRef = useRef({ frame: 1 });

  const { addToCart, setQuickViewProduct, formatPrice } = useShop();

  // Determine active product based on current frame
  const activeProduct = useMemo(() => {
    if (currentFrame <= 60) return PRODUCTS[0];
    if (currentFrame <= 120) return PRODUCTS[1];
    if (currentFrame <= 180) return PRODUCTS[2];
    return PRODUCTS[3];
  }, [currentFrame]);

  // Format frame number to 5 digits: 1 -> "00001"
  const getFramePath = (idx) => {
    const padded = String(idx).padStart(5, '0');
    return `/frames/${padded}.png`;
  };

  // Preload frames and setup Canvas
  useEffect(() => {
    let isMounted = true;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Canvas sizing with DPR
    const updateCanvasSize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      renderCurrentFrame(Math.round(frameObjRef.current.frame));
    };

    const renderCurrentFrame = (frameIndex) => {
      if (!canvas || !ctx) return;
      const img = imagesRef.current[frameIndex] || imagesRef.current[1];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const cw = canvas.width;
      const ch = canvas.height;

      ctx.clearRect(0, 0, cw, ch);

      // Draw image in cover/contain mode matching aspect ratio
      const imgRatio = img.naturalWidth / img.naturalHeight;
      const canvasRatio = cw / ch;

      let drawWidth, drawHeight, offsetX, offsetY;

      if (canvasRatio > imgRatio) {
        drawWidth = cw;
        drawHeight = cw / imgRatio;
        offsetX = 0;
        offsetY = (ch - drawHeight) / 2;
      } else {
        drawHeight = ch;
        drawWidth = ch * imgRatio;
        offsetX = (cw - drawWidth) / 2;
        offsetY = 0;
      }

      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    // Preload strategy:
    // 1. First priority: load frames 1, 30, 60, 90, 120, 150, 180, 210, 240
    // 2. Second priority: load all remaining frames progressively
    let loadedCount = 0;
    const totalToLoad = TOTAL_FRAMES;

    const onImageLoaded = (idx) => {
      if (!isMounted) return;
      loadedCount++;
      const pct = Math.round((loadedCount / totalToLoad) * 100);
      setLoadProgress(pct);

      if (idx === 1 || idx === Math.round(frameObjRef.current.frame)) {
        renderCurrentFrame(Math.round(frameObjRef.current.frame));
      }
    };

    // Progressive loader
    const loadBatch = async () => {
      // Priority frames first
      const priorityIndices = [1, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240];
      for (const i of priorityIndices) {
        if (!imagesRef.current[i]) {
          const img = new Image();
          img.src = getFramePath(i);
          img.onload = () => onImageLoaded(i);
          imagesRef.current[i] = img;
        }
      }

      // Load all other frames in chunks
      for (let i = 1; i <= TOTAL_FRAMES; i++) {
        if (!imagesRef.current[i]) {
          const img = new Image();
          img.src = getFramePath(i);
          img.onload = () => onImageLoaded(i);
          imagesRef.current[i] = img;
        }
      }
    };

    loadBatch();
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    // GSAP ScrollTrigger Scrub
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let scrollTriggerInstance;

    if (!prefersReducedMotion && containerRef.current) {
      scrollTriggerInstance = ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: '+=2800',
        pin: true,
        scrub: 0.6,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const targetFrame = Math.max(1, Math.min(TOTAL_FRAMES, Math.round(1 + progress * (TOTAL_FRAMES - 1))));
          frameObjRef.current.frame = targetFrame;
          setCurrentFrame(targetFrame);
          renderCurrentFrame(targetFrame);
        },
      });
    }

    return () => {
      isMounted = false;
      window.removeEventListener('resize', updateCanvasSize);
      if (scrollTriggerInstance) scrollTriggerInstance.kill();
    };
  }, []);

  return (
    <section
      id="sequence-showcase"
      ref={containerRef}
      className="relative w-full h-screen bg-[#08080a] overflow-hidden flex items-center justify-center select-none"
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold-500/5 rounded-full blur-[160px]" />
      </div>

      {/* HTML5 Canvas rendering 3D frames */}
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover z-10"
      />

      {/* Top HUD: Title, Chapter & Progress Bar */}
      <div className="absolute top-20 sm:top-24 left-0 right-0 z-20 px-4 sm:px-8 max-w-7xl mx-auto flex items-center justify-between pointer-events-none">
        <div className="pointer-events-auto">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-gold-400 animate-ping" />
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-gold-400 font-medium">
              Interactive 3D Turntable
            </span>
          </div>
          <h2 className="text-xl sm:text-3xl font-serif text-white tracking-wide mt-1">
            The Bespoke Sequence
          </h2>
        </div>

        {/* Frame Progress Indicator */}
        <div className="pointer-events-auto flex flex-col items-end">
          <div className="text-[11px] sm:text-xs font-mono tracking-widest text-luxury-300">
            FRAME <span className="text-gold-400 font-semibold">{String(currentFrame).padStart(3, '0')}</span> / {TOTAL_FRAMES}
          </div>
          <div className="w-32 sm:w-48 h-1 bg-white/10 rounded-full mt-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-gold-600 via-gold-400 to-gold-300 transition-all duration-75"
              style={{ width: `${(currentFrame / TOTAL_FRAMES) * 100}%` }}
            />
          </div>
          {loadProgress < 100 && (
            <span className="text-[9px] text-luxury-400 mt-1">
              Buffering 3D assets: {loadProgress}%
            </span>
          )}
        </div>
      </div>

      {/* Dynamic Floating HUD: Product Information Card */}
      <div className="absolute bottom-6 sm:bottom-10 left-4 sm:left-8 right-4 sm:right-auto z-20 max-w-md pointer-events-auto">
        <div className="glass-panel p-5 sm:p-6 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-2xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] uppercase tracking-[0.25em] text-gold-400 font-medium">
              {activeProduct.tag}
            </span>
            <span className="text-xs font-medium text-luxury-400 font-mono">
              {activeProduct.badge}
            </span>
          </div>

          <h3 className="font-serif text-lg sm:text-2xl text-white font-normal leading-snug">
            {activeProduct.name}
          </h3>

          <p className="text-xs text-luxury-300 font-light mt-1.5 line-clamp-2 leading-relaxed">
            {activeProduct.description}
          </p>

          <div className="mt-3.5 pt-3 border-t border-white/10 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-luxury-400 block">
                Atelier Price
              </span>
              <span className="text-lg sm:text-xl font-medium text-white font-serif">
                {formatPrice(activeProduct.price)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setQuickViewProduct(activeProduct)}
                className="p-2.5 rounded-full glass-panel border border-white/15 text-luxury-200 hover:text-white hover:border-gold-500/40 transition-colors"
                title="Quick View Specs"
              >
                <Eye className="w-4 h-4" />
              </button>
              <button
                onClick={() => addToCart(activeProduct, '40 / M')}
                className="px-4 py-2.5 rounded-full bg-gold-500 hover:bg-gold-400 text-luxury-950 font-medium text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-lg shadow-gold-500/20 hover:scale-105 transition-all"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add to Bag</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Hotspots on Product Visual */}
      <div className="absolute inset-0 pointer-events-none z-20 flex items-center justify-center">
        {/* Hotspot 1: Collar / Placket */}
        <div
          className="pointer-events-auto absolute top-[36%] left-[48%] sm:left-[49%]"
          onClick={() => setActiveHotspot(activeHotspot === 1 ? null : 1)}
        >
          <button className="relative group p-2 focus:outline-none">
            <span className="w-4 h-4 rounded-full bg-gold-400/90 flex items-center justify-center text-luxury-950 text-[10px] font-bold shadow-glow animate-pulse">
              +
            </span>
            <span className="absolute -inset-1 rounded-full border border-gold-400/40 animate-ping" />
          </button>

          {activeHotspot === 1 && (
            <div className="absolute left-6 -top-2 w-56 glass-panel p-3 rounded-xl border border-gold-500/30 text-xs shadow-2xl backdrop-blur-xl animate-fade-in">
              <p className="font-medium text-gold-300 uppercase tracking-wider text-[10px]">
                {activeProduct.specs.collar}
              </p>
              <p className="text-luxury-200 text-[11px] mt-1 leading-snug">
                Architectural band collar engineered to stay upright without rigid synthetic fusing.
              </p>
            </div>
          )}
        </div>

        {/* Hotspot 2: Mother of Pearl / Horn Buttons */}
        <div
          className="pointer-events-auto absolute top-[48%] left-[50%]"
          onClick={() => setActiveHotspot(activeHotspot === 2 ? null : 2)}
        >
          <button className="relative group p-2 focus:outline-none">
            <span className="w-4 h-4 rounded-full bg-gold-400/90 flex items-center justify-center text-luxury-950 text-[10px] font-bold shadow-glow animate-pulse">
              +
            </span>
          </button>

          {activeHotspot === 2 && (
            <div className="absolute left-6 -top-2 w-56 glass-panel p-3 rounded-xl border border-gold-500/30 text-xs shadow-2xl backdrop-blur-xl animate-fade-in">
              <p className="font-medium text-gold-300 uppercase tracking-wider text-[10px]">
                {activeProduct.specs.buttons}
              </p>
              <p className="text-luxury-200 text-[11px] mt-1 leading-snug">
                Hand-turned hardware secured with cross-stitched wax thread shanks.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Center Scroll Instruction */}
      <div className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 z-20 items-center gap-3 px-4 py-2 rounded-full glass-panel-subtle border border-white/10 text-[11px] uppercase tracking-widest text-luxury-400">
        <Sliders className="w-3.5 h-3.5 text-gold-400" />
        <span>Scroll vertically to rotate 3D camera</span>
      </div>
    </section>
  );
}
