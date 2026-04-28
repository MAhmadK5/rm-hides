"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { useCartStore } from '@/lib/store';
import Header from '@/components/Header'; 

export default function ProductPage() {
  const params = useParams();
  const slug = params.slug as string;

  // --- STATE ---
  const [product, setProduct] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeColor, setActiveColor] = useState(0);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1); 
  const [openAccordion, setOpenAccordion] = useState<string | null>('materials');
  const [showToast, setShowToast] = useState(false);
  
  // --- LIGHTBOX STATE ---
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // --- GLOBAL CART ---
  const addItem = useCartStore((state) => state.addItem);
  const toggleCart = useCartStore((state) => state.toggleCart);

  // --- FETCH SUPABASE DATA ---
  useEffect(() => {
    const fetchProductData = async () => {
      const { data: mainProduct, error: mainError } = await supabase
        .from('products')
        .select('*')
        .eq('slug', slug)
        .single();

      if (mainProduct) {
        setProduct(mainProduct);
        const { data: relatedData } = await supabase
          .from('products')
          .select('*')
          .neq('slug', slug)
          .limit(3);
          
        if (relatedData) setRelatedProducts(relatedData);
      } else if (mainError) {
        console.error("Error fetching product:", mainError);
      }
      setLoading(false);
    };

    if (slug) fetchProductData();
  }, [slug]);

  // --- ESCAPE KEY LOGIC FOR LIGHTBOX ---
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return;
      if (e.key === 'Escape') setIsLightboxOpen(false);
      if (e.key === 'ArrowRight' && product?.images) {
        setLightboxIndex((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
      }
      if (e.key === 'ArrowLeft' && product?.images) {
        setLightboxIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, product]);

  // --- HANDLERS ---
  const toggleAccordion = (section: string) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  const handleAddToCart = () => {
    addItem({
      id: `${product.slug}-${product.colors?.[activeColor] || 'default'}`,
      slug: product.slug,
      name: product.name,
      price: product.price,
      color: product.colors?.[activeColor] || 'Standard',
      image: product.images?.[0] || '',
      quantity: quantity 
    });

    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
    setQuantity(1);
  };

  const openZoom = (index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (product?.images) setActiveImage((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (product?.images) setActiveImage((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
  };

  // --- LOADING & 404 STATES ---
  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="text-[#c4a484] uppercase tracking-[0.4em] text-[10px] animate-pulse">
          Preparing Display...
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white font-serif text-2xl flex-col gap-6">
        Item Unavailable.
        <Link href="/collection" className="text-[10px] uppercase tracking-[0.2em] text-[#c4a484] border-b border-[#c4a484] pb-1 hover:text-white transition-colors">
          Return to Collection
        </Link>
      </div>
    );
  }

  const displayImages = product.images && product.images.length > 0 ? product.images : ['/placeholder.png'];

  return (
  <div className="relative min-h-screen bg-transparent selection:bg-[#7a0016] selection:text-white font-sans overflow-hidden">
    {/* The rest of your homepage code... */}
      <Header className="!sticky !top-0 bg-[#050505]/95 backdrop-blur-xl border-b border-white/5 z-50" />

      {/* BREADCRUMBS */}
      <div className="w-full px-6 md:px-12 pt-8 pb-4 bg-[#0a0a0a] border-b border-white/5">
        <div className="flex items-center gap-3 text-[9px] uppercase tracking-[0.2em] text-white/40 max-w-[1600px] mx-auto">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span className="text-[#7a0016]">/</span>
          <Link href="/collection" className="hover:text-white transition-colors">Collection</Link>
          <span className="text-[#7a0016]">/</span>
          <span className="text-[#c4a484] truncate">{product.name}</span>
        </div>
      </div>

      <main className="pt-12 pb-32 px-4 md:px-12 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16">
          
          {/* =========================================
              LEFT: THE MASTER CANVAS GALLERY 
              ========================================= */}
          <div className="lg:col-span-7 flex flex-col w-full">
            
            {/* Main Stage Image */}
            <div 
              className="relative w-full h-[60vh] md:h-[80vh] bg-[#0a0a0a] border border-white/5 rounded-sm flex items-center justify-center cursor-zoom-in group overflow-hidden shadow-2xl"
              onClick={() => openZoom(activeImage)}
            >
              {/* Subtle radial glow behind the product */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent pointer-events-none"></div>

              <img 
                src={displayImages[activeImage]} 
                alt={product.name}
                // object-contain ensures the image NEVER crops and fits perfectly inside the box
                className="max-w-[90%] max-h-[90%] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />

              {/* Desktop Nav Arrows inside the canvas */}
              {displayImages.length > 1 && (
                <>
                  <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/80 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all z-10 border border-white/10">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
                  </button>
                  <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/80 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all z-10 border border-white/10">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
                  </button>
                </>
              )}

              {/* Expand Hint */}
              <div className="absolute bottom-6 right-6 bg-[#050505]/80 backdrop-blur-md text-white px-4 py-2 rounded-full text-[9px] uppercase tracking-[0.3em] font-bold border border-white/10 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
                Enlarge
              </div>
            </div>

            {/* Thumbnail Strip */}
            {displayImages.length > 1 && (
              <div className="flex gap-4 mt-6 overflow-x-auto hide-scrollbar pb-2">
                {displayImages.map((img: string, idx: number) => (
                  <button 
                    key={idx} 
                    onClick={() => setActiveImage(idx)}
                    className={`relative w-20 h-24 md:w-24 md:h-32 flex-shrink-0 bg-[#0a0a0a] rounded-sm overflow-hidden transition-all duration-300 ${
                      activeImage === idx ? 'border-2 border-[#c4a484] shadow-[0_0_15px_rgba(196,164,132,0.2)]' : 'border border-white/5 opacity-40 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-contain p-2" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* =========================================
              RIGHT: PRODUCT DETAILS
              ========================================= */}
          <div className="lg:col-span-5 relative">
            <div className="lg:sticky lg:top-32 space-y-8">
              
              {/* Title & Price */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex text-[#c4a484] text-xs">★★★★★</div>
                  <span className="text-white/40 text-[10px] tracking-widest uppercase">(4.9 / 120 Reviews)</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-serif text-[#fdfcf9] tracking-wide mb-4 leading-tight">
                  {product.name}
                </h1>
                <p className="text-[#c4a484] text-2xl font-light tracking-widest">
                  {product.price}
                </p>
              </div>

              {/* Description */}
              <div className="space-y-4">
                <p className="text-white/60 font-light leading-relaxed text-sm md:text-base">
                  {product.description}
                </p>
                <div className="flex items-center gap-3 text-white/80 bg-[#111] border border-white/10 p-4 text-[10px] uppercase tracking-[0.2em] font-bold">
                  <span className="w-2 h-2 rounded-full bg-[#c4a484] animate-pulse"></span>
                  Limited Run: Secure yours before stock depletes.
                </div>
              </div>

              {/* Dynamic Colors */}
              {product.colors && product.colors.length > 0 && (
                <div className="space-y-4 pt-4 border-t border-white/10">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-white/50 block">
                    Selected Leather: <strong className="text-white ml-2">{product.colors[activeColor]}</strong>
                  </span>
                  <div className="flex gap-4">
                    {product.colors.map((color: string, index: number) => (
                      <button 
                        key={color}
                        onClick={() => setActiveColor(index)}
                        className={`w-12 h-12 rounded-full border-2 transition-all duration-300 relative ${
                          activeColor === index ? 'border-[#c4a484] scale-110 shadow-[0_0_20px_rgba(196,164,132,0.4)]' : 'border-transparent opacity-50 hover:opacity-100'
                        }`}
                        style={{ 
                          backgroundColor: color.includes('Black') ? '#1a1a1a' : 
                                           color.includes('Brown') ? '#3d2b1f' : 
                                           color.includes('Red') ? '#4a0404' : 
                                           color.includes('Tan') ? '#c4a484' : '#555'
                        }}
                        title={color}
                        aria-label={color}
                      >
                        {activeColor === index && (
                           <span className="absolute inset-0 flex items-center justify-center text-white text-[10px] drop-shadow-md">✓</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity & CTA */}
              <div className="flex flex-col gap-4 pt-4">
                <div className="flex items-center justify-between border border-white/10 p-2 bg-[#111]">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-white/50 pl-4">Quantity</span>
                  <div className="flex items-center gap-4 bg-black px-2 py-1 rounded-full border border-white/5">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-8 h-8 flex items-center justify-center text-white/50 hover:text-white transition-colors">-</button>
                    <span className="text-sm font-bold w-4 text-center">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className="w-8 h-8 flex items-center justify-center text-white/50 hover:text-white transition-colors">+</button>
                  </div>
                </div>

                <button 
                  onClick={handleAddToCart}
                  className="w-full bg-[#7a0016] text-white py-5 text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-[#9a1026] hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-xl shadow-[#7a0016]/20 flex justify-center items-center gap-4"
                >
                  <span>Add to Cart — {quantity > 1 ? `(${quantity})` : ''}</span>
                  <span className="opacity-50">|</span>
                  <span>{product.price}</span>
                </button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-2 py-6 border-b border-white/5">
                <div className="flex flex-col items-center text-center gap-2 text-white/50 text-[9px] uppercase tracking-[0.1em]">
                  <span className="text-[#c4a484] text-lg">✦</span> Lifetime Stitching
                </div>
                <div className="flex flex-col items-center text-center gap-2 text-white/50 text-[9px] uppercase tracking-[0.1em]">
                  <span className="text-[#c4a484] text-lg">❖</span> Premium Box
                </div>
                <div className="flex flex-col items-center text-center gap-2 text-white/50 text-[9px] uppercase tracking-[0.1em]">
                  <span className="text-[#c4a484] text-lg">✧</span> Fast Shipping
                </div>
              </div>

              {/* Accordions */}
              <div className="divide-y divide-white/5">
                <div className="py-4">
                  <button onClick={() => toggleAccordion('materials')} className="w-full flex justify-between items-center text-left text-[11px] uppercase tracking-[0.2em] text-white/80 hover:text-[#c4a484] transition-colors">
                    <span>Materials & Craft</span>
                    <span className="text-lg font-light">{openAccordion === 'materials' ? '−' : '+'}</span>
                  </button>
                  <div className={`overflow-hidden transition-all duration-500 ${openAccordion === 'materials' ? 'max-h-40 mt-4 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <p className="text-white/50 font-light text-sm leading-relaxed">
                      Crafted from 100% full-grain leather sourced from top-tier Sialkot tanneries. Edges are hand-burnished and sealed for maximum longevity. Stitched using high-tensile bonded thread.
                    </p>
                  </div>
                </div>
                <div className="py-4">
                  <button onClick={() => toggleAccordion('shipping')} className="w-full flex justify-between items-center text-left text-[11px] uppercase tracking-[0.2em] text-white/80 hover:text-[#c4a484] transition-colors">
                    <span>Shipping & Returns</span>
                    <span className="text-lg font-light">{openAccordion === 'shipping' ? '−' : '+'}</span>
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
        </div>

        {/* =========================================
            RELATED PRODUCTS SECTION (Cross-Sells)
            ========================================= */}
        {relatedProducts.length > 0 && (
          <section className="mt-24 pt-16 border-t border-white/5">
            <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
              <h2 className="text-2xl md:text-3xl font-serif text-[#fdfcf9] tracking-wide">
                Complete Your <span className="italic font-light text-[#c4a484]">Carry</span>
              </h2>
              <Link href="/collection" className="text-[10px] uppercase tracking-[0.2em] text-white/50 hover:text-[#c4a484] transition-colors pb-1 border-b border-transparent hover:border-[#c4a484]">
                View All Gear ➔
              </Link>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-10">
              {relatedProducts.map((related) => (
                <Link href={`/product/${related.slug}`} key={related.slug} className="group flex flex-col">
                  <div className="aspect-[4/5] bg-[#0a0a0a] relative overflow-hidden mb-4 border border-white/5 rounded-sm p-4">
                    <img 
                      src={related.images?.[0] || '/placeholder.png'} 
                      alt={related.name}
                      className="w-full h-full object-contain drop-shadow-xl group-hover:scale-105 transition-all duration-700"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-white font-serif tracking-wide text-sm md:text-lg group-hover:text-[#c4a484] transition-colors leading-tight">
                      {related.name}
                    </h3>
                    <span className="text-[#c4a484] font-light text-[11px] md:text-sm">
                      {related.price}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* =========================================
          FULLSCREEN IMAGE LIGHTBOX
          ========================================= */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 z-[200] bg-[#050505]/95 backdrop-blur-3xl flex items-center justify-center p-0 md:p-12 animate-fade-in"
          onClick={() => setIsLightboxOpen(false)}
        >
          <button 
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-6 right-6 md:top-10 md:right-10 text-white/50 hover:text-white transition-colors z-[210] bg-[#111] p-3 rounded-full border border-white/10"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>

          {displayImages.length > 1 && (
            <>
              <button onClick={(e) => { e.stopPropagation(); setLightboxIndex((prev) => (prev === 0 ? displayImages.length - 1 : prev - 1)); }} className="hidden md:block absolute left-10 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-[210] p-4 hover:scale-110">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><polyline points="15 18 9 12 15 6"></polyline></svg>
              </button>
              <button onClick={(e) => { e.stopPropagation(); setLightboxIndex((prev) => (prev === displayImages.length - 1 ? 0 : prev + 1)); }} className="hidden md:block absolute right-10 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-[210] p-4 hover:scale-110">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </button>
            </>
          )}

          <div className="relative w-full h-full flex items-center justify-center">
            <img 
              src={displayImages[lightboxIndex]} 
              alt="Zoomed Product"
              className="max-w-full max-h-full object-contain cursor-zoom-out drop-shadow-2xl"
              onClick={(e) => {
                e.stopPropagation(); 
                if (window.innerWidth < 768 && displayImages.length > 1) {
                  setLightboxIndex((prev) => (prev === displayImages.length - 1 ? 0 : prev + 1));
                }
              }}
            />
            {displayImages.length > 1 && (
              <span className="md:hidden absolute bottom-10 left-1/2 -translate-x-1/2 text-white/40 text-[10px] uppercase tracking-widest bg-black/50 px-4 py-2 rounded-full">
                Tap image to cycle
              </span>
            )}
          </div>
        </div>
      )}

      {/* FLOATING TOAST NOTIFICATION */}
      <div className={`fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] bg-[#c4a484] text-black px-6 py-4 flex items-center gap-6 shadow-[0_10px_40px_rgba(196,164,132,0.3)] transition-all duration-500 ease-out ${
        showToast ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-95 pointer-events-none'
      }`}>
        <div className="flex flex-col">
          <span className="font-bold uppercase tracking-widest text-[10px]">Added to Cart</span>
          <span className="text-black/60 text-[9px] uppercase tracking-widest truncate max-w-[150px]">
            {quantity > 1 ? `${quantity}x ` : ''}{product?.name}
          </span>
        </div>
        <button onClick={toggleCart} className="border-l border-black/20 pl-6 text-[10px] uppercase tracking-[0.2em] font-black hover:text-white transition-colors">
          View Cart ➔
        </button>
      </div>
      
      {/* CSS Utilities */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in { animation: fadeIn 0.3s ease-out forwards; }
      `}} />
    </div>
  );
}