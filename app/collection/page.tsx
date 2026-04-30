"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import Header from '@/components/Header';

export default function CollectionPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured'); 
  const [gridView, setGridView] = useState(3); 

  const categories = [
    'All', 'Bi-Fold', 'Long Wallet', 'Minimal', 'Leather Belts', 
    'AirTag Keychain', 'Passport Holder', 'Airbuds Cases', 'Custom Leather'
  ];

  useEffect(() => {
    setIsMounted(true);
    const fetchProducts = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('products').select('*');
      if (data) setProducts(data);
      else if (error) console.error("Error loading products:", error);
      setLoading(false);
    };
    fetchProducts();
    
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setGridView(2); 
    }
  }, []);

  const processedProducts = useMemo(() => {
    let result = [...products];
    if (activeCategory !== 'All') result = result.filter(p => p.category === activeCategory);
    if (searchQuery.trim() !== '') result = result.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    
    result.sort((a, b) => {
      if (sortBy === 'featured') return 0;
      const priceA = Number(String(a.price).replace(/[^0-9.-]+/g, ""));
      const priceB = Number(String(b.price).replace(/[^0-9.-]+/g, ""));
      if (sortBy === 'price-low') return priceA - priceB;
      if (sortBy === 'price-high') return priceB - priceA;
      return 0;
    });

    return result;
  }, [products, activeCategory, searchQuery, sortBy]);

  const getGridClass = () => {
    if (gridView === 1) return "grid-cols-1 md:grid-cols-2 gap-y-16 gap-x-12"; 
    if (gridView === 2) return "grid-cols-2 md:grid-cols-2 gap-4 md:gap-12 gap-y-12 md:gap-y-20"; 
    if (gridView === 3) return "grid-cols-2 md:grid-cols-3 gap-4 md:gap-10 gap-y-12 md:gap-y-16"; 
    return "grid-cols-2 md:grid-cols-4 gap-3 md:gap-8 gap-y-10 md:gap-y-16"; 
  };

  return (
    <div className="relative min-h-screen bg-transparent selection:bg-[#c4a484] selection:text-black font-sans overflow-hidden">
      
      {/* GLOBAL HEADER */}
      <Header className="!absolute !top-0 bg-transparent z-50" />

      {/* AMBIENT BACKGROUND EFFECTS */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden mix-blend-screen">
        <div className={`absolute top-[10%] -left-[20%] w-[70vw] h-[70vw] bg-[#7a0016]/10 rounded-full blur-[150px] transition-transform duration-[10s] ${isMounted ? 'scale-100 translate-x-0' : 'scale-50 -translate-x-20'}`}></div>
      </div>

      <main className="relative z-10 pb-32 max-w-[1800px] mx-auto flex flex-col items-center">
        
        {/* =========================================
            CINEMATIC HERO SECTION
            ========================================= */}
        <section className="relative w-full h-[50vh] md:h-[60vh] flex flex-col items-center justify-center pt-20 border-b border-white/5 overflow-hidden">
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-serif font-black text-white/[0.02] whitespace-nowrap pointer-events-none tracking-tighter select-none -rotate-12 mix-blend-lighten">
            ARCHIVE
          </div>

          <div className="relative z-10 text-center px-6">
            <span className="text-[#c4a484] uppercase tracking-[0.5em] text-[10px] font-bold mb-6 block drop-shadow-md">
              The Vault
            </span>
            <h1 className="text-5xl md:text-8xl font-serif text-[#fdfcf9] tracking-wider mb-6 leading-none drop-shadow-2xl">
              The <span className="italic font-light text-[#7a0016]">Collection.</span>
            </h1>
            <p className="text-white/50 text-xs md:text-sm uppercase tracking-[0.2em] max-w-xl mx-auto backdrop-blur-sm bg-black/20 py-2 px-6 border border-white/5">
              {products.length > 0 ? `${products.length} Masterworks Configured` : 'Accessing Archives...'}
            </p>
          </div>
        </section>

        {/* =========================================
            FLOATING COMMAND CENTER (Toolbar)
            ========================================= */}
        <div className="sticky top-[20px] md:top-[100px] z-40 w-full max-w-[1600px] px-4 md:px-12 mt-8 mb-16 transition-all duration-500">
          <div className="bg-[#050505]/70 backdrop-blur-2xl border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.8)] px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-6 rounded-sm">
            
            {/* Search */}
            <div className="w-full md:w-auto flex items-center bg-transparent border-b border-white/20 pb-2 focus-within:border-[#c4a484] transition-colors group">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-white/30 mr-3 group-focus-within:text-[#c4a484] transition-colors"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              <input 
                type="text" 
                placeholder="Locate piece..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none text-white text-[10px] md:text-xs uppercase tracking-[0.2em] w-full md:w-48 placeholder:text-white/20"
              />
            </div>

            {/* Categories Carousel */}
            <div className="flex overflow-x-auto hide-scrollbar justify-start md:justify-center gap-8 text-[9px] md:text-[10px] uppercase tracking-[0.2em] w-full md:w-auto snap-x">
              {categories.map(cat => (
                <button 
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`transition-all duration-500 whitespace-nowrap snap-center flex-shrink-0 relative py-2 ${
                    activeCategory === cat ? 'text-[#c4a484] font-bold' : 'text-white/40 hover:text-white'
                  }`}
                >
                  {cat}
                  {activeCategory === cat && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-[#c4a484] animate-pulse"></span>
                  )}
                </button>
              ))}
            </div>

            {/* Sort & Grid Controls */}
            <div className="w-full md:w-auto flex justify-between items-center gap-8">
              <div className="relative group">
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="bg-transparent text-[#c4a484] text-[9px] uppercase tracking-[0.2em] outline-none border-b border-transparent group-hover:border-[#c4a484]/30 cursor-pointer appearance-none pr-4 transition-all">
                  <option value="featured" className="bg-[#111]">Featured</option>
                  <option value="price-low" className="bg-[#111]">Ascending Price</option>
                  <option value="price-high" className="bg-[#111]">Descending Price</option>
                </select>
                <span className="absolute right-0 top-1/2 -translate-y-1/2 text-white/40 text-[8px] pointer-events-none">▼</span>
              </div>

              {/* Grid Toggles */}
              <div className="hidden md:flex items-center gap-3 border-l border-white/10 pl-8">
                {[2, 3, 4].map((view) => (
                  <button key={view} onClick={() => setGridView(view)} className={`transition-all duration-300 ${gridView === view ? 'text-[#c4a484] scale-110 drop-shadow-[0_0_8px_rgba(196,164,132,0.5)]' : 'text-white/20 hover:text-white/60'}`} title={`${view} Columns`}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      {view === 2 && <path d="M3 3h8v18H3V3zm10 0h8v18h-8V3z" />}
                      {view === 3 && <path d="M2 3h5.3v18H2V3zm7.3 0h5.3v18H9.3V3zm7.3 0H22v18h-5.3V3z" />}
                      {view === 4 && <path d="M2 3h4v18H2V3zm5.3 0h4v18h-4V3zm5.3 0h4v18h-4V3zm5.3 0h4v18h-4V3z" />}
                    </svg>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* =========================================
            EDITORIAL PRODUCT GRID (Now in Full Color)
            ========================================= */}
        <div className="w-full max-w-[1600px] px-4 md:px-12">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-40">
              <div className="w-16 h-16 border-t-2 border-[#c4a484] border-r-2 border-transparent rounded-full animate-spin mb-6"></div>
              <div className="text-[#c4a484] uppercase tracking-[0.5em] text-[10px] animate-pulse">Accessing Vault...</div>
            </div>
          ) : (
            <div className={`grid transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] ${getGridClass()}`}>
              {processedProducts.length > 0 ? (
                processedProducts.map((product) => (
                  <Link href={`/product/${product.slug}`} key={product.slug} className="group flex flex-col relative">
                    
                    {/* Image Wrapper */}
                    <div className="relative bg-[#050505] overflow-hidden mb-6 shadow-2xl border border-white/5 group-hover:border-[#c4a484]/30 transition-colors duration-700">
                      <div className={`${gridView === 4 ? 'aspect-[4/5]' : 'aspect-[3/4]'} relative overflow-hidden`}>
                        
                        {/* Custom Leather Badge */}
                        {product.category === 'Custom Leather' && (
                          <div className="absolute top-4 left-4 z-20 bg-[#c4a484] text-black text-[8px] md:text-[9px] uppercase tracking-widest px-3 py-1.5 font-bold shadow-lg">
                            Bespoke Order
                          </div>
                        )}

                        {/* Product Image (Removed grayscale, bumped base opacity so colors pop) */}
                        <img 
                          src={product.images?.[0] || '/leather.png'} 
                          alt={product.name}
                          className="w-full h-full object-cover opacity-95 group-hover:opacity-100 group-hover:scale-110 transition-all duration-[2000ms] ease-out"
                        />
                        
                        {/* Dramatic Hover Vignette */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-10 group-hover:opacity-60 transition-opacity duration-700 z-10"></div>
                      </div>

                      {/* Sliding Action Button */}
                      <div className="absolute inset-x-0 bottom-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] z-20">
                        <div className="bg-[#111] text-white text-center py-4 text-[10px] uppercase tracking-[0.4em] font-bold shadow-2xl border border-white/10 group-hover:bg-[#7a0016] group-hover:border-[#9a1026] transition-colors duration-300">
                          Inspect Details
                        </div>
                      </div>
                    </div>

                    {/* Typography & Pricing */}
                    <div className="flex flex-col gap-3 px-2 z-10">
                      <h3 className={`text-white font-serif tracking-wide transition-colors duration-500 group-hover:text-[#c4a484] leading-tight ${gridView === 1 ? 'text-3xl' : gridView === 4 ? 'text-base' : 'text-xl md:text-2xl'}`}>
                        {product.name}
                      </h3>
                      
                      <div className="flex justify-between items-end border-t border-white/5 pt-3">
                        <span className="text-white/30 text-[9px] uppercase tracking-[0.3em] font-medium flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#c4a484]/50"></span>
                          {product.colors?.length || 1} Tone{product.colors?.length > 1 ? 's' : ''}
                        </span>
                        <span className={`text-[#fdfcf9] font-light tracking-wider ${gridView === 4 ? 'text-sm' : 'text-base'}`}>
                          {product.price}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-40 text-center bg-[#050505]/50 backdrop-blur-md border border-white/5">
                  <span className="text-[#7a0016] text-4xl mb-4">✕</span>
                  <span className="text-white/60 uppercase tracking-[0.4em] text-xs mb-8">No artifacts located for "{searchQuery || activeCategory}"</span>
                  <button onClick={() => { setActiveCategory('All'); setSearchQuery(''); }} className="text-[#c4a484] text-[10px] uppercase tracking-widest border border-[#c4a484]/30 px-10 py-4 hover:bg-[#c4a484] hover:text-black transition-all duration-300 shadow-lg">
                    Reset Coordinates
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  ); 
}