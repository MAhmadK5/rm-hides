"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import Header from '@/components/Header';

export default function CollectionPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured'); 
  const [gridView, setGridView] = useState(3); 

  const categories = [
    'All', 'Bi-Fold', 'Long Wallet', 'Minimal', 'Leather Belts', 
    'AirTag Keychain', 'Passport Holder', 'Airbuds Cases', 'Custom Leather'
  ];

  useEffect(() => {
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
    if (gridView === 1) return "grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-10"; 
    if (gridView === 2) return "grid-cols-2 md:grid-cols-2 gap-4 md:gap-10 gap-y-10"; 
    if (gridView === 3) return "grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 gap-y-12"; 
    return "grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 gap-y-10"; 
  };

  return (
  <div className="relative min-h-screen bg-transparent selection:bg-[#7a0016] selection:text-white font-sans overflow-hidden">
  
      {/* Universal Header (Solid / Sticky Mode) */}
      <Header className="!sticky !top-0 bg-[#050505]/95 backdrop-blur-xl border-b border-white/5" />

      <main className="pb-32 max-w-[1600px] mx-auto">
        
        {/* HERO SECTION */}
        <div className="text-center pt-16 pb-12 px-4 relative overflow-hidden">
          <h1 className="text-4xl md:text-6xl font-serif text-[#fdfcf9] tracking-wide mb-4">
            The <span className="italic font-light text-[#c4a484]">Collection</span>
          </h1>
          <p className="text-white/40 text-xs md:text-sm uppercase tracking-widest max-w-xl mx-auto">
            {processedProducts.length} Premium Leather Goods Engineered in Sialkot
          </p>
        </div>

        {/* STICKY TOOLBAR */}
        <div className="sticky top-[73px] md:top-[85px] z-40 bg-[#050505]/90 backdrop-blur-md border-y border-white/5 px-4 md:px-12 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="w-full md:w-auto flex items-center bg-[#111] border border-white/10 px-4 py-2 focus-within:border-[#c4a484] transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-white/40 mr-3"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input 
              type="text" 
              placeholder="Search equipment..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-white text-xs uppercase tracking-widest w-full md:w-48 placeholder:text-white/20"
            />
          </div>

          <div className="flex overflow-x-auto hide-scrollbar justify-start md:justify-center gap-6 md:gap-8 text-[9px] md:text-[10px] uppercase tracking-[0.2em] w-full md:w-auto snap-x py-2 md:py-0">
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`transition-all duration-300 whitespace-nowrap snap-center flex-shrink-0 ${
                  activeCategory === cat ? 'text-[#c4a484] border-b border-[#c4a484] pb-1 font-bold scale-105' : 'text-white/40 hover:text-white pb-1'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="w-full md:w-auto flex justify-between items-center gap-6">
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="bg-transparent text-[#c4a484] text-[9px] uppercase tracking-[0.2em] outline-none border-none cursor-pointer appearance-none text-right">
              <option value="featured" className="bg-[#111]">Featured</option>
              <option value="price-low" className="bg-[#111]">Price: Low to High</option>
              <option value="price-high" className="bg-[#111]">Price: High to Low</option>
            </select>

            <div className="hidden md:flex items-center gap-2 border-l border-white/10 pl-6">
              {[2, 3, 4].map((view) => (
                <button key={view} onClick={() => setGridView(view)} className={`p-1.5 transition-colors ${gridView === view ? 'text-[#c4a484]' : 'text-white/20 hover:text-white/60'}`} title={`${view} Columns`}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    {view === 2 && <path d="M3 3h8v18H3V3zm10 0h8v18h-8V3z" />}
                    {view === 3 && <path d="M2 3h5.3v18H2V3zm7.3 0h5.3v18H9.3V3zm7.3 0H22v18h-5.3V3z" />}
                    {view === 4 && <path d="M2 3h4v18H2V3zm5.3 0h4v18h-4V3zm5.3 0h4v18h-4V3zm5.3 0h4v18h-4V3z" />}
                  </svg>
                </button>
              ))}
            </div>
            
            <div className="flex md:hidden items-center gap-3">
               <button onClick={() => setGridView(1)} className={`p-1 ${gridView === 1 ? 'text-[#c4a484]' : 'text-white/20'}`}>
                 <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M3 3h18v18H3V3z" /></svg>
               </button>
               <button onClick={() => setGridView(2)} className={`p-1 ${gridView === 2 ? 'text-[#c4a484]' : 'text-white/20'}`}>
                 <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M3 3h8v18H3V3zm10 0h8v18h-8V3z" /></svg>
               </button>
            </div>
          </div>
        </div>

        {/* PRODUCT GRID */}
        <div className="px-4 md:px-12 pt-12">
          {loading ? (
            <div className="flex items-center justify-center py-40">
              <div className="text-[#c4a484] uppercase tracking-[0.4em] text-[10px] animate-pulse">Accessing Inventory...</div>
            </div>
          ) : (
            <div className={`grid transition-all duration-500 ease-in-out ${getGridClass()}`}>
              {processedProducts.length > 0 ? (
                processedProducts.map((product) => (
                  <Link href={`/product/${product.slug}`} key={product.slug} className="group flex flex-col">
                    <div className="relative bg-[#0a0a0a] overflow-hidden mb-5 shadow-2xl border border-white/5">
                      <div className={`${gridView === 4 ? 'aspect-[4/5]' : 'aspect-[3/4]'} relative overflow-hidden`}>
                        {product.category === 'Custom Leather' && (
                          <div className="absolute top-3 left-3 z-10 bg-[#c4a484] text-black text-[8px] md:text-[9px] uppercase tracking-widest px-2 py-1 font-bold shadow-lg">
                            Made to Order
                          </div>
                        )}
                        <img 
                          src={product.images?.[0] || '/leather.png'} 
                          alt={product.name}
                          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 ease-out"
                        />
                      </div>
                      <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 hidden md:block z-20">
                        <div className="bg-[#7a0016] text-white text-center py-3 text-[10px] uppercase tracking-[0.3em] font-bold shadow-xl border border-[#9a1026]">
                          Inspect Piece
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 px-1">
                      <h3 className={`text-white font-serif tracking-wide transition-colors group-hover:text-[#c4a484] leading-tight ${gridView === 1 ? 'text-2xl' : gridView === 4 ? 'text-sm' : 'text-lg'}`}>
                        {product.name}
                      </h3>
                      <div className="flex justify-between items-center">
                        <span className="text-white/30 text-[9px] uppercase tracking-[0.2em] font-medium">
                          {product.colors?.length || 1} Variant{product.colors?.length > 1 ? 's' : ''}
                        </span>
                        <span className={`text-[#c4a484] font-light ${gridView === 4 ? 'text-xs' : 'text-sm'}`}>
                          {product.price}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-32 text-center border border-white/5 bg-[#0a0a0a]">
                  <span className="text-white/40 uppercase tracking-[0.3em] text-xs mb-6">No results found for "{searchQuery || activeCategory}"</span>
                  <button onClick={() => { setActiveCategory('All'); setSearchQuery(''); }} className="text-[#c4a484] text-[10px] uppercase tracking-widest border border-[#c4a484]/30 px-8 py-3 hover:bg-[#c4a484] hover:text-black transition-colors">
                    Reset Filters
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