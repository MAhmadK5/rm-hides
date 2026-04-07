"use client";

import React from 'react';
import Link from 'next/link';

export default function ContactPage() {
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
          <Link href="/collection" className="hover:text-[#c4a484] transition-colors duration-300">Collection</Link>
          <Link href="#" className="hover:text-[#c4a484] transition-colors duration-300">Our Story</Link>
          <Link href="#" className="text-[#c4a484] border border-[#c4a484]/30 px-4 py-2 hover:bg-[#c4a484] hover:text-black transition-all duration-300">Bulk Orders</Link>
        </nav>
        <div className="flex items-center gap-6 text-white/80 text-[10px] uppercase tracking-[0.3em] font-semibold">
          <button className="hidden sm:block hover:text-[#c4a484] transition-colors duration-300">Cart (0)</button>
          <button className="hover:text-[#c4a484] transition-colors duration-300">Menu</button>
        </div>
      </header>

      {/* PAGE HERO */}
      <section className="pt-32 pb-16 px-6 md:px-12 max-w-7xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-serif text-[#fdfcf9] tracking-wide mb-6">
          Get in <span className="italic font-light text-[#c4a484]">Touch</span>
        </h1>
        <p className="text-white/50 max-w-lg mx-auto font-light text-sm md:text-base leading-relaxed">
          Whether you have a question about our hides, a bulk order inquiry, or need assistance with your warranty.
        </p>
      </section>

      {/* CONTACT LAYOUT */}
      <section className="pb-32 px-6 md:px-12 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          
          {/* Left: Info */}
          <div className="flex flex-col gap-10">
            <div>
              <h3 className="text-[11px] uppercase tracking-[0.3em] text-[#c4a484] font-bold mb-4">The Studio</h3>
              <p className="text-white/70 font-light leading-relaxed">
                R&M Hides<br />
                Islamabad Capital Territory<br />
                Pakistan
              </p>
            </div>
            <div>
              <h3 className="text-[11px] uppercase tracking-[0.3em] text-[#c4a484] font-bold mb-4">Direct Lines</h3>
              <p className="text-white/70 font-light leading-relaxed">
                Email: concierge@rmhides.com<br />
                Phone: +92 300 0000000<br />
                Hours: Mon-Fri, 10am - 6pm (PKT)
              </p>
            </div>
          </div>

          {/* Right: Form */}
          <form className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-[0.2em] text-white/50">Full Name</label>
              <input type="text" className="bg-transparent border-b border-white/20 pb-3 text-white outline-none focus:border-[#c4a484] transition-colors" required />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-[0.2em] text-white/50">Email Address</label>
              <input type="email" className="bg-transparent border-b border-white/20 pb-3 text-white outline-none focus:border-[#c4a484] transition-colors" required />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-[0.2em] text-white/50">Subject</label>
              <select className="bg-[#050505] border-b border-white/20 pb-3 text-white outline-none focus:border-[#c4a484] transition-colors">
                <option>General Inquiry</option>
                <option>Order Status</option>
                <option>Bulk & Corporate Gifting</option>
                <option>Warranty Claim</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-[0.2em] text-white/50">Message</label>
              <textarea rows={4} className="bg-transparent border-b border-white/20 pb-3 text-white outline-none focus:border-[#c4a484] transition-colors resize-none" required></textarea>
            </div>
            <button type="submit" className="bg-[#7a0016] text-white py-5 text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-[#9a1026] transition-colors duration-300 mt-4 shadow-lg shadow-[#7a0016]/20">
              Send Message
            </button>
          </form>

        </div>
      </section>

      {/* FOOTER (Same as existing) */}
      <footer className="relative w-full bg-[#020000] pt-32 pb-10 border-t-2 border-[#7a0016] overflow-hidden">
        {/* Replace with your standard sexy footer code here so it matches the other pages */}
      </footer>
    </div>
  );
}