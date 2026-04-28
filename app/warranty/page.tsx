"use client";

import React from 'react';
import Link from 'next/link';

export default function WarrantyPage() {
  return (
  <div className="relative min-h-screen bg-transparent selection:bg-[#7a0016] selection:text-white font-sans overflow-hidden">  
      {/* HEADER */}
      <header className="sticky top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-12 py-6 bg-[#050505]/90 backdrop-blur-md border-b border-white/5">
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

      {/* PAGE CONTENT */}
      <main className="pt-32 pb-32 px-6 md:px-12 max-w-4xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-[#7a0016] uppercase tracking-[0.5em] text-[10px] font-bold mb-6 block">Our Promise</span>
          <h1 className="text-4xl md:text-6xl font-serif text-[#fdfcf9] tracking-wide mb-6">
            The Lifetime <span className="italic font-light text-[#c4a484]">Guarantee</span>
          </h1>
          <div className="w-12 h-[1px] bg-[#7a0016] mx-auto"></div>
        </div>

        <div className="bg-[#0a0a0a] border border-white/5 p-8 md:p-16 shadow-2xl relative overflow-hidden">
          {/* Subtle background accent */}
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-[#7a0016] rounded-full blur-[120px] opacity-20"></div>

          <div className="relative z-10 space-y-12">
            <div>
              <p className="text-xl md:text-2xl font-serif leading-relaxed text-white/90 mb-6">
                "A wallet should outlast the currency inside it."
              </p>
              <p className="text-white/60 font-light leading-relaxed">
                Because our products are crafted from premium full-grain leather by the master artisans of Sialkot, we construct them to endure decades of daily use. We stand fiercely behind our craftsmanship.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8 border-t border-white/10">
              <div>
                <h3 className="text-[11px] uppercase tracking-[0.2em] text-white font-bold mb-4 flex items-center gap-2">
                  <span className="text-[#c4a484]">✓</span> What is Covered
                </h3>
                <p className="text-white/60 text-sm font-light leading-relaxed">
                  Our lifetime warranty covers manufacturing defects and structural failures. If the heavy-duty stitching breaks, snaps fail, or the leather splits under normal usage conditions, we will repair or replace the item free of charge, for life.
                </p>
              </div>
              
              <div>
                <h3 className="text-[11px] uppercase tracking-[0.2em] text-white font-bold mb-4 flex items-center gap-2">
                  <span className="text-[#7a0016]">✕</span> What is Not Covered
                </h3>
                <p className="text-white/60 text-sm font-light leading-relaxed">
                  Full-grain leather is a natural material. Scuffs, scratches, softening, and the beautiful dark patina that develops over time are natural evolutions of the hide, not defects. Neglect, water damage, or extreme abuse are not covered.
                </p>
              </div>
            </div>

            <div className="pt-8 text-center">
              <Link href="/contact" className="inline-block border border-[#c4a484] text-[#c4a484] hover:bg-[#c4a484] hover:text-black px-10 py-4 text-[10px] uppercase tracking-[0.2em] font-bold transition-all duration-300">
                File a Warranty Claim
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="relative w-full bg-[#020000] pt-32 pb-10 border-t-2 border-[#7a0016] overflow-hidden">
         {/* Replace with your standard sexy footer code here so it matches the other pages */}
      </footer>
    </div>
  );
}