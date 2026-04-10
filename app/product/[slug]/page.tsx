"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { useCartStore } from '@/lib/store';

export default function ProductPage() {
  const params = useParams();
  const slug = params.slug as string;

  // --- STATE ---
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeColor, setActiveColor] = useState(0);
  const [activeImage, setActiveImage] = useState(0);
  const [openAccordion, setOpenAccordion] = useState<string | null>('materials');

  // --- GLOBAL CART ---
  const addItem = useCartStore((state) => state.addItem);
  const toggleCart = useCartStore((state) => state.toggleCart);
  const cartItems = useCartStore((state) => state.items);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // --- FETCH SUPABASE DATA ---
  useEffect(() => {
    const fetchProduct = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('slug', slug)
        .single();

      if (data) setProduct(data);
      else if (error) console.error("Error fetching product:", error);
      
      setLoading(false);
    };

    if (slug) fetchProduct();
  }, [slug]);

  // --- ACCORDION TOGGLE ---
  const toggleAccordion = (section: string) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  // --- LOADING & 404 STATES ---
  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white/40 uppercase tracking-widest text-[10px]">
        Loading product...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white font-serif text-2xl flex-col gap-6">
        Product not found.
        <Link href="/collection" className="text-[10px] uppercase tracking-[0.2em] text-[#c4a484] border-b border-[#c4a484] pb-1">
          Return to Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#050505] min-h-screen selection:bg-[#7a0016] selection:text-white font-sans">
      
      {/* HEADER */}
      <header className="sticky top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-12 py-6 bg-[#050505]/90 backdrop-blur-md border-b border-white/5">
        <Link href="/" className="bg-[#7a0016] text-white font-serif tracking-[0.2em] text-sm md:text-lg px-4 py-1.5 shadow-lg border border-[#9a1026]/50 hover:bg-[#5a0010] transition-colors duration-300">
          R&M HIDES
        </Link>
        <nav className="hidden md:flex gap-10 text-white/80 text-[10px] uppercase tracking-[0.3em] font-semibold items-center">
          <Link href="/collection" className="text-[#c4a484] transition-colors duration-300 border-b border-[#c4a484] pb-1">Collection</Link>
          <Link href="/our-story" className="hover:text-[#c4a484] transition-colors duration-300">Our Story</Link>
          <Link href="/bulk-orders" className="hover:text-[#c4a484] transition-colors duration-300">Bulk Orders</Link>
        </nav>
        <div className="flex items-center gap-6 text-white/80 text-[10px] uppercase tracking-[0.3em] font-semibold">
          <button onClick={toggleCart} className="hidden sm:block hover:text-[#c4a484] transition-colors duration-300">
            Cart ({cartCount})
          </button>
          <button className="hover:text-[#c4a484] transition-colors duration-300">Menu</button>
        </div>
      </header>

      {/* BREADCRUMBS */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8 pb-4">
        <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.2em] text-white/40">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link href="/collection" className="hover:text-white transition-colors">Collection</Link>
          <span>/</span>
          <span className="text-[#c4a484]">{product.name}</span>
        </div>
      </div>

      <main className="pt-8 pb-32 px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* LEFT: IMAGE GALLERY */}
        <div className="flex flex-col gap-4">
          <div className="aspect-[4/5] bg-[#111] relative overflow-hidden group shadow-2xl border border-white/5">
            <img 
              src={product.images?.[activeImage] || '/placeholder.png'} 
              alt={product.name}
              className="w-full h-full object-cover opacity-90 transition-opacity duration-500"
            />
          </div>
          
          {/* Thumbnails (Only shows if there are multiple images) */}
          {product.images && product.images.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {product.images.map((img: string, idx: number) => (
                <button 
                  key={idx} 
                  onClick={() => setActiveImage(idx)}
                  className={`w-20 h-24 flex-shrink-0 bg-[#111] border transition-all duration-300 ${activeImage === idx ? 'border-[#c4a484] opacity-100' : 'border-transparent opacity-50 hover:opacity-100'}`}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT: PRODUCT DETAILS (Sticky) */}
        <div className="relative">
          <div className="lg:sticky lg:top-32 space-y-8">
            
            {/* Title, Price, & Reviews */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-[#c4a484] text-xs">★★★★★</div>
                <span className="text-white/40 text-[10px] tracking-widest">(4.9 / 120 Reviews)</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-serif text-[#fdfcf9] tracking-wide mb-3">
                {product.name}
              </h1>
              <p className="text-[#c4a484] text-2xl font-light tracking-widest">
                {product.price}
              </p>
            </div>

            {/* Description & Urgency */}
            <div className="space-y-4">
              <p className="text-white/60 font-light leading-relaxed text-sm md:text-base">
                {product.description}
              </p>
              <div className="flex items-center gap-2 text-[#c4a484] text-[10px] uppercase tracking-[0.2em] font-bold">
                <span className="w-2 h-2 rounded-full bg-[#c4a484] animate-pulse"></span>
                High Demand: Only a few left in stock
              </div>
            </div>

            {/* Dynamic Colors */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-4 pt-6 border-t border-white/10">
                <div className="flex justify-between items-end">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-white/50">
                    Color: <strong className="text-white">{product.colors[activeColor]}</strong>
                  </span>
                </div>
                <div className="flex gap-4">
                  {product.colors.map((color: string, index: number) => (
                    <button 
                      key={color}
                      onClick={() => setActiveColor(index)}
                      className={`w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                        activeColor === index ? 'border-[#c4a484] scale-110 shadow-[0_0_15px_rgba(196,164,132,0.3)]' : 'border-transparent opacity-50 hover:opacity-100'
                      }`}
                      style={{ 
                        backgroundColor: color.includes('Black') ? '#1a1a1a' : 
                                         color.includes('Brown') ? '#3d2b1f' : 
                                         color.includes('Red') ? '#4a0404' : 
                                         color.includes('Tan') ? '#c4a484' : '#555'
                      }}
                      title={color}
                      aria-label={color}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* CTA Button */}
            <div className="pt-4">
              <button 
                onClick={() => {
                  addItem({
                    id: `${product.slug}-${product.colors?.[activeColor] || 'default'}`,
                    slug: product.slug,
                    name: product.name,
                    price: product.price,
                    color: product.colors?.[activeColor] || 'Standard',
                    image: product.images?.[0] || '',
                    quantity: 1
                  });
                }}
                className="w-full bg-[#7a0016] text-white py-5 text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-[#9a1026] transition-all duration-300 shadow-lg shadow-[#7a0016]/20 flex justify-center items-center gap-3"
              >
                <span>Add to Cart</span>
                <span>—</span>
                <span>{product.price}</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="flex justify-between items-center py-4 border-b border-white/5">
              <div className="flex items-center gap-2 text-white/50 text-[10px] uppercase tracking-[0.1em]">
                <span>✓</span> Lifetime Stitching
              </div>
              <div className="flex items-center gap-2 text-white/50 text-[10px] uppercase tracking-[0.1em]">
                <span>✓</span> Premium Box
              </div>
              <div className="flex items-center gap-2 text-white/50 text-[10px] uppercase tracking-[0.1em]">
                <span>✓</span> Fast Shipping
              </div>
            </div>

            {/* Accordions */}
            <div className="divide-y divide-white/5">
              {/* Materials Accordion */}
              <div className="py-4">
                <button onClick={() => toggleAccordion('materials')} className="w-full flex justify-between items-center text-left text-[11px] uppercase tracking-[0.2em] text-white/80 hover:text-[#c4a484] transition-colors">
                  <span>Materials & Craft</span>
                  <span>{openAccordion === 'materials' ? '−' : '+'}</span>
                </button>
                <div className={`overflow-hidden transition-all duration-500 ${openAccordion === 'materials' ? 'max-h-40 mt-4 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <p className="text-white/50 font-light text-sm leading-relaxed">
                    Crafted from 100% full-grain leather sourced from top-tier Sialkot tanneries. Edges are hand-burnished and sealed for maximum longevity. Stitched using high-tensile bonded thread.
                  </p>
                </div>
              </div>

              {/* Shipping Accordion */}
              <div className="py-4">
                <button onClick={() => toggleAccordion('shipping')} className="w-full flex justify-between items-center text-left text-[11px] uppercase tracking-[0.2em] text-white/80 hover:text-[#c4a484] transition-colors">
                  <span>Shipping & Returns</span>
                  <span>{openAccordion === 'shipping' ? '−' : '+'}</span>
                </button>
                <div className={`overflow-hidden transition-all duration-500 ${openAccordion === 'shipping' ? 'max-h-40 mt-4 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <p className="text-white/50 font-light text-sm leading-relaxed">
                    We offer nationwide delivery across Pakistan within 3-5 business days. International shipping available at checkout. 14-day hassle-free return policy if the product is unused.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

    </div>
  );
}