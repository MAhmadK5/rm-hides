"use client";

import React from 'react';
import Link from 'next/link';

export default function ShippingPage() {
  return (
  <div className="relative min-h-screen bg-transparent selection:bg-[#7a0016] selection:text-white font-sans overflow-hidden">

      
      {/* HEADER (Same as Contact) */}
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
      <main className="pt-32 pb-32 px-6 md:px-12 max-w-3xl mx-auto">
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-serif text-[#fdfcf9] tracking-wide mb-6">
            Shipping & <span className="italic font-light text-[#c4a484]">Returns</span>
          </h1>
          <div className="w-12 h-[1px] bg-[#7a0016] mx-auto"></div>
        </div>

        <div className="space-y-16">
          <section>
            <h2 className="text-[11px] uppercase tracking-[0.3em] text-[#c4a484] font-bold mb-6">Nationwide Shipping</h2>
            <p className="text-white/70 font-light leading-relaxed mb-4">
              All R&M Hides products are carefully packaged in our signature matte boxes in Islamabad before being dispatched. We offer nationwide shipping across Pakistan. 
            </p>
            <ul className="list-disc list-inside text-white/70 font-light space-y-2">
              <li>Standard Delivery: 3-5 Business Days (Rs. 250)</li>
              <li>Express Delivery: 1-2 Business Days (Rs. 500)</li>
              <li>Free standard shipping on all orders over Rs. 10,000.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[11px] uppercase tracking-[0.3em] text-[#c4a484] font-bold mb-6">Our Return Policy</h2>
            <p className="text-white/70 font-light leading-relaxed mb-4">
              We stand behind the craftsmanship of our leather. If you are not entirely satisfied with your purchase, you may return it within 14 days of delivery for a full refund or exchange.
            </p>
            <p className="text-white/70 font-light leading-relaxed">
              Please note that full-grain leather will naturally feature slight variations in texture and color—these are not defects, but the hallmarks of genuine hide. To be eligible for a return, the item must be unused, in its original packaging, and in the exact condition you received it.
            </p>
          </section>

          <section>
            <h2 className="text-[11px] uppercase tracking-[0.3em] text-[#c4a484] font-bold mb-6">How to Initiate a Return</h2>
            <p className="text-white/70 font-light leading-relaxed mb-4">
              To start a return, please email our concierge team at <a href="mailto:concierge@rmhides.com" className="text-[#c4a484] border-b border-[#c4a484]/30 hover:border-[#c4a484] transition-colors">concierge@rmhides.com</a> with your order number. Once approved, we will provide you with the return shipping address to our Islamabad studio.
            </p>
          </section>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="relative w-full bg-[#020000] pt-32 pb-10 border-t-2 border-[#7a0016] overflow-hidden">
         {/* Replace with your standard sexy footer code here so it matches the other pages */}
      </footer>
    </div>
  );
}