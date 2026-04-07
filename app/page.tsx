"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const videos = ["/hero-video-1.mp4", "/hero-video-2.mp4"];
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const handleVideoEnd = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  const signatureProducts = [
    { id: 1, name: "The Executive Bifold", price: "Rs. 4,500", image: "/prod1.png", color: "Espresso Brown" },
    { id: 2, name: "Minimalist Cardholder", price: "Rs. 2,800", image: "/prod2.png", color: "Midnight Black" },
    { id: 3, name: "The Heritage Passport Cover", price: "Rs. 5,200", image: "/prod3.png", color: "Vintage Tan" }
  ];

  return (
    <div className="bg-[#050505] selection:bg-[#7a0016] selection:text-white font-sans">
      
      {/* =========================================
          SECTION 1: HERO 
          ========================================= */}
      <section className="relative w-full h-screen overflow-hidden bg-black">
        <video key={currentVideoIndex} autoPlay muted playsInline onEnded={handleVideoEnd} className="absolute inset-0 w-full h-full object-cover opacity-70 transition-opacity duration-1000">
          <source src={videos[currentVideoIndex]} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#050505] z-10" />

        <header className="absolute top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-12 py-8">
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
            <button className="hidden sm:block hover:text-[#c4a484] transition-colors duration-300">Cart (0)</button>
            <button className="hover:text-[#c4a484] transition-colors duration-300">Menu</button>
          </div>
        </header>

        <div className="relative z-20 flex flex-col items-center justify-center h-full px-4 text-center">
          <span className="bg-[#7a0016]/90 text-white px-3 py-1 uppercase tracking-[0.5em] text-[10px] font-semibold mb-6 backdrop-blur-sm shadow-md">
            Born in Islamabad
          </span>
          <h1 className="text-6xl md:text-8xl font-serif text-[#fdfcf9] tracking-widest mb-4">R&M HIDES</h1>
          <p className="text-white/80 max-w-lg mt-4 text-sm md:text-base font-light tracking-wide">The art of genuine leather.</p>
        </div>
      </section>

      {/* =========================================
          SECTION 2: SIGNATURE COLLECTION
          ========================================= */}
      <section className="relative w-full py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif text-[#fdfcf9] tracking-wide mb-4">
              Signature <span className="italic font-light text-[#c4a484]">Pieces</span>
            </h2>
            <p className="text-white/50 max-w-md font-light text-sm leading-relaxed">
              Born in Islamabad. Designed in Sialkot. Precision-cut from the finest full-grain hides to age beautifully alongside you.
            </p>
          </div>
          <Link href="/collection" className="group flex items-center gap-4 text-[#c4a484] text-[10px] uppercase tracking-[0.3em] font-bold">
            <span className="border-b border-transparent group-hover:border-[#c4a484] transition-colors duration-300 pb-1">View All</span>
            <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {signatureProducts.map((product) => (
            <Link href="/product" key={product.id} className="group cursor-pointer block">
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

      {/* =========================================
          SECTION 3: THE CRAFT
          ========================================= */}
      <section className="relative w-full bg-[#0a0a0a] border-t border-white/5 py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-16 md:gap-24">
          <div className="w-full md:w-1/2 flex flex-col items-start z-10">
            <span className="text-[#7a0016] uppercase tracking-[0.4em] text-[10px] font-bold mb-6">Our Heritage</span>
            <h2 className="text-4xl md:text-6xl font-serif text-[#fdfcf9] tracking-wide mb-8 leading-tight">
              Mastery from <br/><span className="italic font-light text-[#c4a484]">Sialkot.</span>
            </h2>
            <div className="w-12 h-[1px] bg-[#c4a484] mb-8"></div>
            <p className="text-white/60 text-sm md:text-base leading-loose font-light mb-6">
              We don't use genuine leather—we use <strong className="text-white font-medium">full-grain</strong>. It is the topmost layer of the hide, keeping all the natural, dense fibers intact. 
            </p>
            <p className="text-white/60 text-sm md:text-base leading-loose font-light mb-12">
              Every wallet is stitched by master artisans in Sialkot, a city globally renowned for its centuries-old leather craftsmanship. The result is a piece that doesn't just hold your essentials; it develops a rich patina and tells your story over time.
            </p>
            <button className="border border-white/20 text-white/80 hover:bg-white hover:text-black px-10 py-4 text-[10px] uppercase tracking-[0.2em] font-bold transition-all duration-500">
              Discover Our Process
            </button>
          </div>
          <div className="w-full md:w-1/2 relative">
            <div className="absolute top-8 -left-8 w-full h-full bg-[#111] border border-white/5 z-0 hidden md:block"></div>
            <div className="relative w-full aspect-[3/4] z-10 overflow-hidden shadow-2xl">
              {/* Note: Kept this image as an external link since you only specified local images for products and leather background, but you can swap this to a local path too if needed! */}
              <img src="leather.png" alt="Leather Craftsmanship" className="w-full h-full object-cover hover:scale-105 transition-transform duration-[2000ms] ease-out grayscale hover:grayscale-0" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60"></div>
            </div>
            <div className="absolute -bottom-6 -right-6 md:right-auto md:-left-12 bg-[#7a0016] text-white p-6 z-20 shadow-2xl hidden sm:flex flex-col items-start border border-[#9a1026]/30">
              <span className="text-[9px] uppercase tracking-[0.3em] opacity-80 mb-1">Material</span>
              <span className="font-serif tracking-widest text-lg">100% Full Grain</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          SECTION 4: THE GUARANTEES
          ========================================= */}
      <section className="w-full bg-[#050505] border-y border-white/5 py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-10 divide-y md:divide-y-0 md:divide-x divide-white/10 text-center">
          
          <div className="flex flex-col items-center pt-8 md:pt-0 px-6">
            <span className="text-[#7a0016] text-2xl mb-4">✦</span>
            <h4 className="text-white uppercase tracking-[0.2em] text-xs font-bold mb-3">Lifetime Stitching</h4>
            <p className="text-white/40 font-light text-sm">Guaranteed to endure. We repair any stitching issues for life.</p>
          </div>

          <div className="flex flex-col items-center pt-8 md:pt-0 px-6">
            <span className="text-[#7a0016] text-2xl mb-4">❖</span>
            <h4 className="text-white uppercase tracking-[0.2em] text-xs font-bold mb-3">Premium Packaging</h4>
            <p className="text-white/40 font-light text-sm">Arrives in a luxury matte box, perfect for unforgettable gifting.</p>
          </div>

          <div className="flex flex-col items-center pt-8 md:pt-0 px-6">
            <span className="text-[#7a0016] text-2xl mb-4">✧</span>
            <h4 className="text-white uppercase tracking-[0.2em] text-xs font-bold mb-3">Nationwide Delivery</h4>
            <p className="text-white/40 font-light text-sm">Swift, secure shipping from Islamabad to anywhere in Pakistan.</p>
          </div>

        </div>
      </section>

      {/* =========================================
          SECTION 5: THE LIFESTYLE & FINAL CTA
          ========================================= */}
      <section className="relative w-full h-[70vh] flex items-center justify-center overflow-hidden">
        
        {/* Background Image & Cinematic Overlay */}
        <div className="absolute inset-0 z-0 bg-[#0a0a0a]">
          <img 
            src="/leather.png" 
            alt="Leather Lifestyle" 
            className="w-full h-full object-cover opacity-40 hover:opacity-50 transition-opacity duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020000] via-black/40 to-transparent"></div>
        </div>

        {/* Center Content */}
        <div className="relative z-10 text-center px-6 max-w-3xl flex flex-col items-center">
          
          <span className="text-[#7a0016] uppercase tracking-[0.4em] text-[10px] font-bold mb-6 block">
            The Patina
          </span>
          
          <h2 className="text-4xl md:text-6xl font-serif text-[#fdfcf9] tracking-wide mb-6 leading-tight">
            A story told in <br/> <span className="italic font-light text-[#c4a484]">every crease.</span>
          </h2>
          
          <p className="text-white/70 font-light text-sm md:text-base mb-10 leading-relaxed max-w-lg">
            Our full-grain leather doesn't wear out—it wears in. Every mark, scratch, and polished edge reflects your personal journey.
          </p>
          
          <Link 
            href="/collection" 
            className="bg-[#7a0016] text-white px-10 py-5 text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-[#9a1026] transition-colors duration-300 shadow-lg shadow-[#7a0016]/20"
          >
            Explore Full Collection
          </Link>
          
        </div>
      </section>

    </div>
  );
}