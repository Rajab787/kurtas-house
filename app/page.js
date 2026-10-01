'use client';

import React from 'react';
import { ShopProvider } from '@/context/ShopContext';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import SequenceShowcase from '@/components/SequenceShowcase';
import ProductShowcase from '@/components/ProductShowcase';
import HorizontalScroll from '@/components/HorizontalScroll';
import FeaturedProducts from '@/components/FeaturedProducts';
import CategoriesSection from '@/components/CategoriesSection';
import CraftsmanshipSection from '@/components/CraftsmanshipSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import CtaSection from '@/components/CtaSection';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import QuickViewModal from '@/components/QuickViewModal';
import Toast from '@/components/Toast';

export default function Home() {
  return (
    <ShopProvider>
      <main className="relative min-h-screen bg-luxury-950 text-luxury-100 overflow-x-clip selection:bg-gold-500/30 selection:text-gold-200">
        {/* Navigation */}
        <Navbar />

        {/* 1. Hero with 3D product scroll transformation */}
        <Hero />

        {/* 2. Pinned 3D Sequence Turntable Canvas (240 frames scrubbed via ScrollTrigger) */}
        <SequenceShowcase />

        {/* 3. Featured Products with Staggered Scroll Motion & Category Filters */}
        <FeaturedProducts />

        {/* 4. Pinned Centered Product Anatomy (Surrounding content changes while product stays centered) */}
        <ProductShowcase />

        {/* 5. Horizontal Product Carousel Controlled by Vertical Scrolling */}
        <HorizontalScroll />

        {/* 6. Architectural Categories with Parallax */}
        <CategoriesSection />

        {/* 7. Craftsmanship Standards & Sustainable Benefits */}
        <CraftsmanshipSection />

        {/* 8. Editorial Testimonials & Critical Acclaim */}
        <TestimonialsSection />

        {/* 9. Bespoke Call to Action & VIP Consultation */}
        <CtaSection />

        {/* Footer */}
        <Footer />

        {/* Global Drawers, Modals & Notifications */}
        <CartDrawer />
        <QuickViewModal />
        <Toast />
      </main>
    </ShopProvider>
  );
}
