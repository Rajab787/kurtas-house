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
  const frameLabelRef = useRef(null);
  const progressBarRef = useRef(null);
  const bufferingRef = useRef(null);
  const [activeProductIndex, setActiveProductIndex] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState(null);
  const imagesRef = useRef([]);
  const frameObjRef = useRef({ frame: 1 });
  const frameRenderRafRef = useRef(null);
  const activeProductRef = useRef(0);

  const { addToCart, setQuickViewProduct, formatPrice } = useShop();

  // Determine active product based on current frame
  const activeProduct = useMemo(() => PRODUCTS[activeProductIndex], [activeProductIndex]);

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

    const renderCurrentFrame = (frameIndex) => {
      if (!canvas || !ctx) return;
      const img = imagesRef.current[frameIndex] || imagesRef.current[1];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      const cw = canvas.width;
      const ch = canvas.height;
      if (!cw || !ch) return;

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

    const scheduleFrameRender = (frameIndex) => {
      frameObjRef.current.frame = frameIndex;
      if (frameRenderRafRef.current !== null) return;

      frameRenderRafRef.current = window.requestAnimationFrame(() => {
        frameRenderRafRef.current = null;
        const nextFrame = frameObjRef.current.frame;
        renderCurrentFrame(nextFrame);

        if (frameLabelRef.current) {
          frameLabelRef.current.textContent = String(nextFrame).padStart(3, '0');
        }
        if (progressBarRef.current) {
          progressBarRef.current.style.transform = `scaleX(${nextFrame / TOTAL_FRAMES})`;
        }
      });
    };

    // Canvas sizing with DPR
    const updateCanvasSize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      scheduleFrameRender(Math.round(frameObjRef.current.frame));
    };

    // Preload strategy:
    // 1. First priority: load frames 1, 30, 60, 90, 120, 150, 180, 210, 240
    // 2. Second priority: load all remaining frames progressively
    let loadedCount = 0;
    const totalToLoad = TOTAL_FRAMES;
    const loadingImages = new Set();
    const priorityIndices = [1, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240];
    const loadQueue = [
      ...priorityIndices,
      ...Array.from({ length: TOTAL_FRAMES }, (_, index) => index + 1).filter(
        (index) => !priorityIndices.includes(index)
      ),
    ];
    let nextQueueIndex = 0;
    let activeLoads = 0;
    const MAX_CONCURRENT_LOADS = 6;

    const onImageLoaded = (idx) => {
      if (!isMounted) return;
      loadedCount++;
      const pct = Math.round((loadedCount / totalToLoad) * 100);
      if (bufferingRef.current) {
        bufferingRef.current.textContent = `Buffering 3D assets: ${pct}%`;
        bufferingRef.current.hidden = pct >= 100;
      }

      if (idx === 1 || idx === Math.round(frameObjRef.current.frame)) {
        scheduleFrameRender(Math.round(frameObjRef.current.frame));
      }
    };

    const pumpImageQueue = () => {
      while (isMounted && activeLoads < MAX_CONCURRENT_LOADS && nextQueueIndex < loadQueue.length) {
        const index = loadQueue[nextQueueIndex++];
        if (imagesRef.current[index]) continue;

        const img = new Image();
        img.decoding = 'async';
        if (priorityIndices.includes(index)) img.fetchPriority = 'high';
        imagesRef.current[index] = img;
        loadingImages.add(img);
        activeLoads++;

        const finishLoad = () => {
          activeLoads--;
          loadingImages.delete(img);
          onImageLoaded(index);
          pumpImageQueue();
        };

        img.onload = finishLoad;
        img.onerror = finishLoad;
        img.src = getFramePath(index);
      }
    };

    pumpImageQueue();
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
          scheduleFrameRender(targetFrame);

          const productIndex = Math.min(3, Math.floor((targetFrame - 1) / 60));
          if (productIndex !== activeProductRef.current) {
            activeProductRef.current = productIndex;
            setActiveProductIndex(productIndex);
          }
        },
      });
    }

    return () => {
      isMounted = false;
      window.removeEventListener('resize', updateCanvasSize);
      if (frameRenderRafRef.current !== null) {
        window.cancelAnimationFrame(frameRenderRafRef.current);
      }
      loadingImages.forEach((img) => {
        img.onload = null;
        img.onerror = null;
        img.src = '';
      });
      imagesRef.current = [];
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
            FRAME <span ref={frameLabelRef} className="text-gold-400 font-semibold">001</span> / {TOTAL_FRAMES}
          </div>
          <div className="w-32 sm:w-48 h-1 bg-white/10 rounded-full mt-2 overflow-hidden">
            <div
              ref={progressBarRef}
              className="h-full bg-gradient-to-r from-gold-600 via-gold-400 to-gold-300 transition-all duration-75"
              style={{ width: '100%', transform: 'scaleX(0)', transformOrigin: 'left center' }}
            />
          </div>
          <span ref={bufferingRef} className="text-[9px] text-luxury-400 mt-1">
            Buffering 3D assets: 0%
          </span>
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
