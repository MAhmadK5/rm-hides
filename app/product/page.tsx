"use client";

import React, { useState } from 'react';
import Link from 'next/link';
// 1. IMPORT THE CART DRAWER
import CartDrawer from '../components/CartDrawer';

export default function ProductPage() {
  const [activeColor, setActiveColor] = useState('Espresso Brown');
  // 2. CREATE STATE FOR THE CART
  const [isCartOpen, setIsCartOpen] = useState(false);

  const galleryImages = [
    "https://images.unsplash.com/photo-1627123424574-724758594e93?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1559564259-22a8bc8f7c18?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
  ];

  return (
    <div className="bg-[#050505] min-h-screen selection:bg-[#7a0016] selection:text-white font-sans text-white">
      
      {/* 3. DROP THE CART DRAWER IN THE PAGE */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* HEADER */}
      <header className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-12 py-6 bg-[#050505]/90 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="bg-[#7a0016] text-white font-serif tracking-[0.2em] text-sm md:text-lg px-4 py-1.5 shadow-lg border border-[#9a1026]/50 cursor-pointer hover:bg-[#5a0010] transition-colors duration-300">
            R&M HIDES
          </Link>
        </div>
        <nav className="hidden md:flex gap-10 text-white/80 text-[10px] uppercase tracking-[0.3em] font-semibold items-center">
          <Link href="/collection" className="hover:text-[#c4a484] transition-colors duration-300">Collection</Link>
          <Link href="#" className="hover:text-[#c4a484] transition-colors duration-300">Our Story</Link>
          <Link href="#" className="text-[#c4a484] border border-[#c4a484]/30 px-4 py-2 hover:bg-[#c4a484] hover:text-black transition-all duration-300">Bulk Orders</Link>
        </nav>
        <div className="flex items-center gap-6 text-white/80 text-[10px] uppercase tracking-[0.3em] font-semibold">
          
          {/* 4. WIRE UP THE HEADER CART BUTTON */}
          <button 
            onClick={() => setIsCartOpen(true)}
            className="hidden sm:block hover:text-[#c4a484] transition-colors duration-300"
          >
            Cart (1)
          </button>
          
          <button className="hover:text-[#c4a484] transition-colors duration-300">Menu</button>
        </div>
      </header>

      {/* PRODUCT CONTENT */}
      <main className="pt-32 pb-24 max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center gap-3 text-[9px] uppercase tracking-[0.2em] text-white/40 mb-10">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link href="/collection" className="hover:text-white transition-colors">Collection</Link>
          <span>/</span>
          <span className="text-[#c4a484]">The Executive Bifold</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20">
          <div className="md:col-span-7 flex flex-col gap-6">
            {galleryImages.map((img, index) => (
              <div key={index} className="w-full bg-[#111] overflow-hidden">
                <img src={img} alt="Product Detail" className="w-full h-auto object-cover opacity-90 hover:opacity-100 hover:scale-105 transition-all duration-700 ease-out" />
              </div>
            ))}
          </div>

          <div className="md:col-span-5 relative">
            <div className="sticky top-32 flex flex-col items-start">
              <h1 className="text-4xl md:text-5xl font-serif tracking-wide mb-4">The Executive Bifold</h1>
              <p className="text-xl font-light text-white/80 mb-8">Rs. 4,500</p>
              <div className="w-full h-[1px] bg-white/10 mb-8"></div>

              <div className="mb-10 w-full">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-white/60">Color</span>
                  <span className="text-[10px] uppercase tracking-[0.1em] text-[#c4a484]">{activeColor}</span>
                </div>
                <div className="flex gap-4">
                  <button onClick={() => setActiveColor('Espresso Brown')} className={`w-10 h-10 rounded-full bg-[#3d2b1f] border-2 transition-all duration-300 ${activeColor === 'Espresso Brown' ? 'border-[#c4a484] scale-110' : 'border-transparent opacity-60 hover:opacity-100'}`} />
                  <button onClick={() => setActiveColor('Midnight Black')} className={`w-10 h-10 rounded-full bg-[#111111] border-2 transition-all duration-300 ${activeColor === 'Midnight Black' ? 'border-[#c4a484] scale-110' : 'border-[#333] opacity-60 hover:opacity-100'}`} />
                  <button onClick={() => setActiveColor('Vintage Tan')} className={`w-10 h-10 rounded-full bg-[#b5835a] border-2 transition-all duration-300 ${activeColor === 'Vintage Tan' ? 'border-[#c4a484] scale-110' : 'border-transparent opacity-60 hover:opacity-100'}`} />
                </div>
              </div>

              {/* 5. WIRE UP THE ADD TO CART BUTTON */}
              <button 
                onClick={() => setIsCartOpen(true)}
                className="w-full bg-[#7a0016] text-white py-5 text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-[#9a1026] transition-colors duration-300 mb-4 shadow-lg shadow-[#7a0016]/20"
              >
                Add to Cart
              </button>
              
              <button className="w-full border border-white/20 text-white py-5 text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-white hover:text-black transition-colors duration-300 mb-10">Buy it Now</button>

              <div className="w-full flex flex-col border-t border-white/10">
                <div className="py-6 border-b border-white/10 flex flex-col gap-4">
                  <h3 className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#c4a484]">The Details</h3>
                  <p className="text-sm font-light text-white/60 leading-relaxed">Designed in Sialkot, this bifold is the pinnacle of minimalist utility. Crafted from 100% full-grain leather, it features 6 card slots, a cash compartment, and burnished edges that will develop a rich patina over time.</p>
                </div>
                <div className="py-6 border-b border-white/10 flex justify-between items-center cursor-pointer group">
                  <h3 className="text-[11px] uppercase tracking-[0.2em] font-semibold group-hover:text-[#c4a484] transition-colors">Shipping & Returns</h3>
                  <span className="text-xl font-light">+</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

    </div>
  );
}