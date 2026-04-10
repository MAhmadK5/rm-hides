"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { useCartStore } from '@/lib/store';

export default function CollectionPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const categories = ['All', 'Bifolds', 'Cardholders', 'Travel'];

  const toggleCart = useCartStore((state) => state.toggleCart);
  const toggleMenu = useCartStore((state) => state.toggleMenu); 
  const cartCount = useCartStore((state) => state.items.reduce((total, item) => total + item.quantity, 0));

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('products').select('*');
      if (data) {
        setProducts(data);
      } else if (error) {
        console.error("Error loading products:", error);
      }
      setLoading(false);
    };
    fetchProducts();
  }, []);

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products; // Add filtering logic here later if you add a category column

  return (
    <div className="bg-[#050505] min-h-screen selection:bg-[#7a0016] selection:text-white font-sans">
      
      {/* HEADER */}
      <header className="sticky top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-12 py-6 bg-[#050505]/90 backdrop-blur-md border-b border-white/5">
        <Link href="/" className="bg-[#7a0016] text-white font-serif tracking-[0.2em] text-sm md:text-lg px-4 py-1.5 shadow-lg border border-[#9a1026]/50 hover:bg-[#5a0010] transition-colors">
          R&M HIDES
        </Link>
        <div className="flex items-center gap-6 text-white/80 text-[10px] uppercase tracking-[0.3em] font-semibold">
          <button onClick={toggleCart} className="hidden sm:block hover:text-[#c4a484] transition-colors">
            Cart ({cartCount})
          </button>
          <button onClick={toggleMenu} className="hover:text-[#c4a484] transition-colors sm:hidden">
            Menu
          </button>
        </div>
      </header>

      {/* PAGE CONTENT */}
      <main className="pt-16 pb-32 px-4 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-serif text-[#fdfcf9] tracking-wide mb-6">
            The <span className="italic font-light text-[#c4a484]">Collection</span>
          </h1>
          
          <div className="flex justify-center gap-6 md:gap-8 text-[9px] md:text-[10px] uppercase tracking-[0.2em]">
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`transition-colors duration-300 ${activeCategory === cat ? 'text-[#c4a484] border-b border-[#c4a484] pb-1' : 'text-white/40 hover:text-white'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-40">
            <div className="text-white/20 uppercase tracking-[0.4em] text-[10px] animate-pulse">
              Loading Collection...
            </div>
          </div>
        ) : (
          /* THE GRID: 2 columns on mobile, 3 on desktop */
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-10 md:gap-x-10 md:gap-y-16">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <Link href={`/product/${product.slug}`} key={product.slug} className="group flex flex-col">
                  <div className="aspect-[4/5] bg-[#111] relative overflow-hidden mb-4 shadow-xl">
                    <img 
                      src={product.images?.[0] || '/leather.png'} 
                      alt={product.name}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 hidden md:block">
                      <div className="bg-[#7a0016] text-white text-center py-3 text-[10px] uppercase tracking-[0.2em] font-bold">
                        View Details
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <h3 className="text-white font-serif tracking-wide text-sm md:text-lg group-hover:text-[#c4a484] transition-colors leading-tight">
                      {product.name}
                    </h3>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-white/40 text-[8px] md:text-[10px] uppercase tracking-[0.1em]">
                        {product.colors?.length || 0} Colors
                      </span>
                      <span className="text-[#c4a484] font-light text-[11px] md:text-sm">
                        {product.price}
                      </span>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full text-center py-20 text-white/30 uppercase tracking-widest text-xs">
                No products found.
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}