"use client";

import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Link from 'next/link';

export default function PrivacyPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="relative min-h-screen bg-transparent selection:bg-[#7a0016] selection:text-white font-sans overflow-hidden">
      
      {/* GLOBAL HEADER */}
      <Header className="!absolute !top-0 bg-transparent z-50" />

      {/* AMBIENT BACKGROUND EFFECTS */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden mix-blend-screen">
        <div className={`absolute top-[20%] -left-[10%] w-[60vw] h-[60vw] bg-[#7a0016]/10 rounded-full blur-[150px] transition-transform duration-[10s] ${isMounted ? 'scale-100 translate-x-0' : 'scale-50 -translate-x-20'}`}></div>
      </div>

      <main className="relative z-10 pb-32 max-w-[1200px] mx-auto flex flex-col items-center px-6 md:px-12">
        
        {/* CINEMATIC HEADER */}
        <section className="relative w-full pt-40 pb-20 border-b border-white/5 text-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-serif font-black text-white/[0.02] whitespace-nowrap pointer-events-none tracking-tighter select-none">
            PRIVACY
          </div>
          <span className="relative z-10 text-[#7a0016] uppercase tracking-[0.5em] text-[10px] font-bold mb-4 block">
            Data Architecture
          </span>
          <h1 className="relative z-10 text-4xl md:text-6xl font-serif text-[#fdfcf9] tracking-wide mb-6">
            Privacy <span className="italic font-light text-[#c4a484]">Policy.</span>
          </h1>
          <p className="relative z-10 text-white/40 text-xs uppercase tracking-widest max-w-md mx-auto">
            Protecting the Inner Circle.
          </p>
        </section>

        {/* LEGAL CONTENT (Editorial Style) */}
        <section className="w-full mt-16 grid grid-cols-1 md:grid-cols-12 gap-12">
          
          <div className="md:col-span-4 sticky top-[100px] h-fit hidden md:block border-l border-[#c4a484]/30 pl-6">
            <nav className="space-y-4 text-[10px] uppercase tracking-[0.2em]">
              <a href="#information" className="block text-white hover:text-[#c4a484] transition-colors">01. Information Collection</a>
              <a href="#usage" className="block text-white/40 hover:text-[#c4a484] transition-colors">02. Data Usage</a>
              <a href="#sharing" className="block text-white/40 hover:text-[#c4a484] transition-colors">03. Third-Party Sharing</a>
              <a href="#security" className="block text-white/40 hover:text-[#c4a484] transition-colors">04. Data Security</a>
            </nav>
          </div>

          <div className="md:col-span-8 space-y-16">
            
            <div id="information" className="bg-[#050505]/60 backdrop-blur-xl border border-white/5 p-8 shadow-2xl relative group">
              <h2 className="text-2xl font-serif text-white tracking-wide mb-6">01. Information We Collect</h2>
              <div className="space-y-4 text-white/60 font-light text-sm leading-relaxed">
                <p>When you initiate a purchase or contact us through the R&M Hides platform, we collect specific details necessary for fulfillment. This includes your Name, Email Address, Shipping Address, and Phone Number.</p>
                <p>We do not collect payment card information natively on our servers, as all transactions are securely processed via Cash on Delivery (COD) upon physical receipt of the product.</p>
              </div>
            </div>

            <div id="usage" className="bg-[#050505]/60 backdrop-blur-xl border border-white/5 p-8 shadow-2xl relative group">
              <h2 className="text-2xl font-serif text-white tracking-wide mb-6">02. How We Use Your Data</h2>
              <div className="space-y-4 text-white/60 font-light text-sm leading-relaxed">
                <p>Your data is utilized strictly for operational excellence. We use it to process your order, dispatch it to Sialkot for crafting (if bespoke), and coordinate with courier services across Pakistan.</p>
                <p>We heavily utilize WhatsApp and SMS to provide rapid order updates, tracking information, and customer support. By providing your phone number, you consent to these operational communications.</p>
              </div>
            </div>

            <div id="sharing" className="bg-[#050505]/60 backdrop-blur-xl border border-white/5 p-8 shadow-2xl relative group">
              <h2 className="text-2xl font-serif text-white tracking-wide mb-6">03. Third-Party Sharing</h2>
              <div className="space-y-4 text-white/60 font-light text-sm leading-relaxed">
                <p>Your privacy is absolute. We do not sell, rent, or trade your personal information to outside parties.</p>
                <p>The only exception is our trusted logistics and courier partners (e.g., Leopard, TCS, or CallCourier) who require your name, address, and phone number to physically deliver your leather goods to your doorstep.</p>
              </div>
            </div>

            <div id="security" className="bg-[#050505]/60 backdrop-blur-xl border border-white/5 p-8 shadow-2xl relative group">
              <h2 className="text-2xl font-serif text-white tracking-wide mb-6">04. Security Infrastructure</h2>
              <div className="space-y-4 text-white/60 font-light text-sm leading-relaxed">
                <p>Our digital storefront is fortified using modern web technologies, backed by Supabase secure databases. We implement standard security protocols to prevent unauthorized access, alteration, or destruction of your personal data.</p>
              </div>
            </div>

          </div>
        </section>

        <div className="mt-16 text-center border-t border-white/5 pt-12 w-full">
          <p className="text-white/40 text-[10px] uppercase tracking-widest mb-6">For Data Deletion Requests</p>
          <a href="mailto:shop.rmhides@gmail.com" className="text-[#7a0016] border border-[#7a0016]/30 px-8 py-3 text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-[#7a0016] hover:text-white transition-colors shadow-lg">
            Email Compliance Team
          </a>
        </div>

      </main>
    </div>
  );
}