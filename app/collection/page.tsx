"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function CollectionPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const filters = ['All', 'Bifolds', 'Cardholders', 'Travel'];

  // Real images mapped here
  const products = [
    { id: 1, name: "The Executive Bifold", price: "Rs. 4,500", category: "Bifolds", image: "prod1.png", color: "Espresso Brown" },
    { id: 2, name: "Minimalist Cardholder", price: "Rs. 2,800", category: "Cardholders", image: "prod2.png", color: "Midnight Black" },
    { id: 3, name: "The Heritage Passport Cover", price: "Rs. 5,200", category: "Travel", image: "prod3.png", color: "Vintage Tan" },
    { id: 4, name: "Slim Pocket Sleeve", price: "Rs. 2,200", category: "Cardholders", image: "leather.png", color: "Oxblood Red" },
    { id: 5, name: "The Classic Billfold", price: "Rs. 4,200", category: "Bifolds", image: "prod4.png", color: "Saddle Tan" },
    { id: 6, name: "Voyager Luggage Tag", price: "Rs. 1,800", category: "Travel", image: "https://images.unsplash.com/photo-1544816155-12df9643f363?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", color: "Midnight Black" },
  ];

  const filteredProducts = activeFilter === 'All' ? products : products.filter(p => p.category === activeFilter);

  return (
    <div className="bg-[#050505] min-h-screen selection:bg-[#7a0016] selection:text-white font-sans text-white">
      
      {/* HEADER */}
      <header className="sticky top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-12 py-6 bg-[#050505]/90 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="bg-[#7a0016] text-white font-serif tracking-[0.2em] text-sm md:text-lg px-4 py-1.5 shadow-lg border border-[#9a1026]/50 cursor-pointer hover:bg-[#5a0010] transition-colors duration-300">
            R&M HIDES
          </Link>
        </div>
        <nav className="hidden md:flex gap-10 text-white/80 text-[10px] uppercase tracking-[0.3em] font-semibold items-center">
          <Link href="/collection" className="text-[#c4a484] transition-colors duration-300">Collection</Link>
          <Link href="#" className="hover:text-[#c4a484] transition-colors duration-300">Our Story</Link>
          <Link href="#" className="text-[#c4a484] border border-[#c4a484]/30 px-4 py-2 hover:bg-[#c4a484] hover:text-black transition-all duration-300">Bulk Orders</Link>
        </nav>
        <div className="flex items-center gap-6 text-white/80 text-[10px] uppercase tracking-[0.3em] font-semibold">
          <button className="hidden sm:block hover:text-[#c4a484] transition-colors duration-300">Cart (0)</button>
          <button className="hover:text-[#c4a484] transition-colors duration-300">Menu</button>
        </div>
      </header>

      {/* PAGE HERO */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto text-center border-b border-white/5">
        <h1 className="text-5xl md:text-7xl font-serif text-[#fdfcf9] tracking-wide mb-6">
          The <span className="italic font-light text-[#c4a484]">Collection</span>
        </h1>
        <p className="text-white/50 max-w-lg mx-auto font-light text-sm md:text-base leading-relaxed">
          Explore our complete range of full-grain leather goods. Precision crafted for those who appreciate the details.
        </p>
      </section>

      {/* FILTERS & GRID */}
      <section className="py-16 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-center gap-6 md:gap-12 mb-16">
          {filters.map(filter => (
            <button key={filter} onClick={() => setActiveFilter(filter)} className={`text-[10px] uppercase tracking-[0.3em] font-bold transition-all duration-300 pb-1 border-b ${activeFilter === filter ? 'text-[#c4a484] border-[#c4a484]' : 'text-white/40 border-transparent hover:text-white'}`}>
              {filter}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-16">
          {filteredProducts.map((product) => (
            // LINK ADDED HERE
            <Link href="/product" key={product.id} className="group cursor-pointer block animate-fade-in">
              <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#111] mb-6">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out" />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-8">
                  <button className="bg-white text-black px-8 py-3 text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-[#c4a484] hover:text-white transition-colors duration-300">Quick Add</button>
                </div>
              </div>
              <div className="flex flex-col items-center text-center">
                <span className="text-white/40 text-[9px] uppercase tracking-[0.2em] mb-2">{product.color}</span>
                <h3 className="text-white font-serif text-lg tracking-wide mb-2 group-hover:text-[#c4a484] transition-colors duration-300">{product.name}</h3>
                <span className="text-white/70 text-sm font-light">{product.price}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}