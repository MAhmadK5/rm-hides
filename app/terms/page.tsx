"use client";

import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Link from 'next/link';

export default function TermsPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="relative min-h-screen bg-transparent selection:bg-[#c4a484] selection:text-black font-sans overflow-hidden">
      
      {/* GLOBAL HEADER */}
      <Header className="!absolute !top-0 bg-transparent z-50" />

      {/* AMBIENT BACKGROUND EFFECTS */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden mix-blend-screen">
        <div className={`absolute top-[20%] -right-[10%] w-[60vw] h-[60vw] bg-[#c4a484]/5 rounded-full blur-[150px] transition-transform duration-[10s] ${isMounted ? 'scale-100 translate-x-0' : 'scale-50 translate-x-20'}`}></div>
      </div>

      <main className="relative z-10 pb-32 max-w-[1200px] mx-auto flex flex-col items-center px-6 md:px-12">
        
        {/* CINEMATIC HEADER */}
        <section className="relative w-full pt-40 pb-20 border-b border-white/5 text-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-serif font-black text-[#7a0016]/5 whitespace-nowrap pointer-events-none tracking-tighter select-none">
            TERMS
          </div>
          <span className="relative z-10 text-[#c4a484] uppercase tracking-[0.5em] text-[10px] font-bold mb-4 block">
            R&M Hides Dossier
          </span>
          <h1 className="relative z-10 text-4xl md:text-6xl font-serif text-[#fdfcf9] tracking-wide mb-6">
            Terms of <span className="italic font-light text-[#c4a484]">Service.</span>
          </h1>
          <p className="relative z-10 text-white/40 text-xs uppercase tracking-widest max-w-md mx-auto">
            Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </p>
        </section>

        {/* LEGAL CONTENT (Editorial Style) */}
        <section className="w-full mt-16 space-y-16">
          
          <div className="bg-[#050505]/60 backdrop-blur-xl border border-white/5 p-8 md:p-12 shadow-2xl relative group">
            <div className="absolute top-0 left-0 w-1 h-full bg-[#7a0016] scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top"></div>
            <h2 className="text-2xl font-serif text-white tracking-wide mb-6 flex items-center gap-4">
              <span className="text-[#c4a484] text-sm">01.</span> General Conditions
            </h2>
            <div className="space-y-4 text-white/60 font-light text-sm leading-relaxed">
              <p>By accessing and utilizing the R&M Hides platform, you agree to comply with these terms. We reserve the right to refuse service to anyone for any reason at any time.</p>
              <p>Our store operates out of Islamabad, Pakistan, with all craftsmanship executing from our atelier in Sialkot. We govern these terms under the laws of Pakistan.</p>
            </div>
          </div>

          <div className="bg-[#050505]/60 backdrop-blur-xl border border-white/5 p-8 md:p-12 shadow-2xl relative group">
            <div className="absolute top-0 left-0 w-1 h-full bg-[#7a0016] scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top"></div>
            <h2 className="text-2xl font-serif text-white tracking-wide mb-6 flex items-center gap-4">
              <span className="text-[#c4a484] text-sm">02.</span> Material & Patina
            </h2>
            <div className="space-y-4 text-white/60 font-light text-sm leading-relaxed">
              <p>R&M Hides uses 100% full-grain leather. Because this is a natural material, slight variations in color, texture, and grain are inherent and do not constitute a defect. In fact, these variations are the hallmark of authentic luxury.</p>
              <p>Your leather piece will develop a unique patina over time. Scuffs and aging are natural parts of the material's lifecycle.</p>
            </div>
          </div>

          <div className="bg-[#050505]/60 backdrop-blur-xl border border-white/5 p-8 md:p-12 shadow-2xl relative group">
            <div className="absolute top-0 left-0 w-1 h-full bg-[#7a0016] scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top"></div>
            <h2 className="text-2xl font-serif text-white tracking-wide mb-6 flex items-center gap-4">
              <span className="text-[#c4a484] text-sm">03.</span> Payment & Fulfillment
            </h2>
            <div className="space-y-4 text-white/60 font-light text-sm leading-relaxed">
              <p>We currently operate on a <strong>Cash on Delivery (COD)</strong> model nationwide across Pakistan. Payment must be made in full to the courier upon receipt of your package.</p>
              <p>Upon placing an order, our team will confirm the details via WhatsApp or SMS. Failure to verify the order may result in cancellation.</p>
            </div>
          </div>

          <div className="bg-[#050505]/60 backdrop-blur-xl border border-white/5 p-8 md:p-12 shadow-2xl relative group">
            <div className="absolute top-0 left-0 w-1 h-full bg-[#c4a484] scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top"></div>
            <h2 className="text-2xl font-serif text-white tracking-wide mb-6 flex items-center gap-4">
              <span className="text-[#c4a484] text-sm">04.</span> Lifetime Stitching Guarantee
            </h2>
            <div className="space-y-4 text-white/60 font-light text-sm leading-relaxed">
              <p>We stand by our Sialkot artisans. Every R&M Hides wallet comes with a Lifetime Stitching Guarantee. If a seam fails under normal use, we will repair it free of charge.</p>
              <p className="border-l border-white/10 pl-4 italic">Note: This guarantee covers stitching failures only. It does not cover leather tearing, water damage, intentional destruction, or normal material wear and tear.</p>
            </div>
          </div>

          <div className="bg-[#050505]/60 backdrop-blur-xl border border-white/5 p-8 md:p-12 shadow-2xl relative group">
            <div className="absolute top-0 left-0 w-1 h-full bg-[#7a0016] scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top"></div>
            <h2 className="text-2xl font-serif text-white tracking-wide mb-6 flex items-center gap-4">
              <span className="text-[#c4a484] text-sm">05.</span> Bespoke & Custom Orders
            </h2>
            <div className="space-y-4 text-white/60 font-light text-sm leading-relaxed">
              <p>All custom, bespoke, or corporate bulk orders processed through "The Atelier" are final sale. Because these items are tailored to your exact specifications, they cannot be returned or exchanged unless there is a manufacturing defect.</p>
            </div>
          </div>

        </section>

        <div className="mt-16 text-center border-t border-white/5 pt-12 w-full">
          <p className="text-white/40 text-[10px] uppercase tracking-widest mb-6">Questions regarding our terms?</p>
          <Link href="/contact" className="text-[#c4a484] border border-[#c4a484]/30 px-8 py-3 text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-[#c4a484] hover:text-black transition-colors shadow-lg">
            Contact Support
          </Link>
        </div>

      </main>
    </div>
  );
}