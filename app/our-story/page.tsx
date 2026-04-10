"use client";

import React from 'react';
import Link from 'next/link';
import { useCartStore } from '@/lib/store';

export default function OurStoryPage() {
  // --- GLOBAL CART (For the header) ---
  const toggleCart = useCartStore((state) => state.toggleCart);
  const cartItems = useCartStore((state) => state.items);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="bg-[#050505] min-h-screen selection:bg-[#7a0016] selection:text-white font-sans">
      
      {/* HEADER */}
      <header className="sticky top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-12 py-6 bg-[#050505]/90 backdrop-blur-md border-b border-white/5">
        <Link href="/" className="bg-[#7a0016] text-white font-serif tracking-[0.2em] text-sm md:text-lg px-4 py-1.5 shadow-lg border border-[#9a1026]/50 hover:bg-[#5a0010] transition-colors duration-300">
          R&M HIDES
        </Link>
        <nav className="hidden md:flex gap-10 text-white/80 text-[10px] uppercase tracking-[0.3em] font-semibold items-center">
          <Link href="/collection" className="hover:text-[#c4a484] transition-colors duration-300">Collection</Link>
          <Link href="/our-story" className="text-[#c4a484] transition-colors duration-300 border-b border-[#c4a484] pb-1">Our Story</Link>
          <Link href="/bulk-orders" className="hover:text-[#c4a484] transition-colors duration-300">Bulk Orders</Link>
        </nav>
        <div className="flex items-center gap-6 text-white/80 text-[10px] uppercase tracking-[0.3em] font-semibold">
          <button onClick={toggleCart} className="hidden sm:block hover:text-[#c4a484] transition-colors duration-300">
            Cart ({cartCount})
          </button>
          <button className="hover:text-[#c4a484] transition-colors duration-300">Menu</button>
        </div>
      </header>

      {/* PAGE CONTENT */}
      <main className="pb-32">
        
        {/* HERO/ORIGIN SECTION (Refined Narrative) */}
        <section className="relative pt-32 pb-24 px-6 md:px-12 max-w-5xl mx-auto text-center">
          <span className="text-[#7a0016] uppercase tracking-[0.4em] text-[10px] font-bold mb-6 block">
            The Visionaries & The Void
          </span>
          <h1 className="text-5xl md:text-7xl font-serif text-[#fdfcf9] tracking-wide mb-8 leading-tight">
            Crafting a brand where <br/>
            <span className="italic font-light text-[#c4a484]">none existed.</span>
          </h1>
          <div className="w-16 h-[1px] bg-white/20 mx-auto mb-8"></div>
          <p className="text-white/60 font-light text-lg leading-relaxed max-w-2xl mx-auto">
            Long-time friends Rafy and Maaz always dreamed of building something exceptional together in Pakistan. Their entrepreneurial spirits were ignited by a shared frustration: despite Pakistan's reputation for fine leather and craftsmanship, they couldn't find a dedicated, quality-driven home-grown wallet brand that truly resonated with a premium, minimalist aesthetic and uncompromising durability.
          </p>
          <p className="text-white/60 font-light text-lg leading-relaxed max-w-2xl mx-auto mt-6">
            They saw a void, not just in the market, but in the celebration of local mastery. They knew the skill existed—they just needed to channel it into a brand that stood for authenticity, timeless design, and products made *in* Pakistan, *for* Pakistan (and the world). Thus, R&M Hides was conceived—not just as a business, but as a commitment to premium, handcrafted full-grain leather goods that tell a story of local excellence.
          </p>
        </section>

        {/* TEAM MESSAGES SECTIONS */}
        <section className="py-24 px-6 md:px-12 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 items-start">
          
          {/* CEO Message - Abdul Rafy */}
          <div className="bg-[#0a0a0a] border border-white/5 p-8 flex flex-col items-center text-center shadow-2xl h-full">
            {/* Image container made bigger: w-32 h-32 -> w-44 h-44 */}
            <div className="w-40 h-55 rounded-full overflow-hidden mb-6 border-4 border-[#7a0016]/30">
              {/* Image source updated to Rafy.png */}
              <img src="/Rafy.png" alt="Abdul Rafy" className="w-full h-full object-cover" />
            </div>
            <h3 className="text-xl font-serif text-white tracking-wide mb-1">Abdul Rafy</h3>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#c4a484] mb-6">CEO & Co-Founder</span>
            <div className="w-10 h-[1px] bg-white/10 mb-6"></div>
            <p className="text-white/60 font-light text-sm leading-loose">
              "Our vision at R&M Hides is simple yet profound: to reclaim Pakistani craftsmanship and define a new standard for local luxury. We believe in the power of full-grain leather, not just for its durability, but for the story it develops over time. Each R&M piece is a testament to the skill of our artisans in Sialkot, and a promise of quality that we proudly stand behind. We are more than just products; we are a community celebrating authenticity and longevity in a world increasingly filled with the transient."
            </p>
          </div>

          {/* Director Message - Maaz Sarfaraz */}
          <div className="bg-[#0a0a0a] border border-white/5 p-8 flex flex-col items-center text-center shadow-2xl h-full">
            {/* Image container made bigger: w-32 h-32 -> w-44 h-44 */}
            <div className="w-40 h-55 rounded-full overflow-hidden mb-6 border-4 border-[#7a0016]/30">
              {/* Image source confirmed as maaz.png, only size updated */}
              <img src="/maaz.png" alt="Maaz Sarfaraz" className="w-full h-full object-cover" />
            </div>
            <h3 className="text-xl font-serif text-white tracking-wide mb-1">Maaz Sarfaraz</h3>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#c4a484] mb-6">Director & Co-Founder</span>
            <div className="w-10 h-[1px] bg-white/10 mb-6"></div>
            <p className="text-white/60 font-light text-sm leading-loose">
              "Operations and design are the bedrock upon which our brand is built. My commitment is to ensure that the vision Rafy and I shared is meticulously executed in every R&M piece. From sourcing the finest full-grain hides to perfecting the functional simplicity of each wallet design, our focus is unwavering operational excellence. We aim to create products that are not only beautifully crafted but fundamentally robust, embodying the resilient spirit of Pakistani artistry. Every detail matters, because every customer matters."
            </p>
          </div>

          {/* Web Developer Message - Muhammad Ahmad Khalid */}
          <div className="bg-[#0a0a0a] border border-white/5 p-8 flex flex-col items-center text-center shadow-2xl h-full">
            {/* Image container made bigger: w-32 h-32 -> w-44 h-44 */}
            <div className="w-40 h-55 rounded-full overflow-hidden mb-6 border-4 border-[#7a0016]/30">
              {/* Image source updated to Ahmad.png */}
              <img src="/Ahmad.png" alt="Muhammad Ahmad Khalid" className="w-full h-full object-cover" />
            </div>
            <h3 className="text-xl font-serif text-white tracking-wide mb-1">M. Ahmad Khalid</h3>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#c4a484] mb-6">Web Developer</span>
            <div className="w-10 h-[1px] bg-white/10 mb-6"></div>
            <p className="text-white/60 font-light text-sm leading-loose">
              "As the digital architect, my role is to craft a web experience as seamless and premium as our leather goods. From the moment you land on our site, every interaction, visual element, and user journey should reflect the brand's commitment to quality and storytelling. I meticulously translate the tangible artistry of full-grain leather and local craftsmanship into a dynamic, intuitive online storefront. My goal is to ensure that exploring and purchasing our pieces is effortless, engaging, and truly embodies the R&M Hides essence."
            </p>
          </div>

        </section>

        {/* Existing LEATHER BREAK & CRAFT SECTION Integration (Conceptual) */}
        {/* LEATHER BREAK (Keep existing, perhaps integrated) */}
        <section className="w-full h-[40vh] md:h-[50vh] relative bg-[#111]">
          {/* Using existing leather asset - integrated here conceptually as a break before or after messages */}
          <img 
            src="/leather.png" 
            alt="Full Grain Leather Texture" 
            className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]"></div>
        </section>

        {/* THE CRAFT SECTION (Keep existing, integrated) */}
        <section className="py-24 px-6 md:px-12 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif text-[#fdfcf9] tracking-wide mb-6">
              The Masters of <span className="italic font-light text-[#c4a484]">Sialkot</span>
            </h2>
            <p className="text-white/60 font-light leading-relaxed mb-6">
              While our vision took shape in Islamabad, we knew true mastery resides elsewhere. Sialkot, globally renowned for centuries of unparalleled leather craftsmanship, became our production heart. It's not just about material; it's about the generational skill passed down to the artisans who cut, skive, and stitch every R&M piece with unwavering precision.
            </p>
            <p className="text-white/60 font-light leading-relaxed mb-8">
              Every R&M Hides wallet, passport cover, and cardholder is meticulously handcrafted in Sialkot, purely using 100% Full-Grain Leather—retaining the hide's uppermost, un-sanded layer for ultimate strength and rich patina potential. We honor local mastery with every stitch, burnished edge, and dedication to process.
            </p>
            <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.2em] font-bold text-white/40">
              <span className="border border-white/20 px-3 py-1">Hand-Burnished</span>
              <span className="border border-white/20 px-3 py-1">Precision Stitched</span>
            </div>
          </div>
          
          <div className="relative aspect-[3/4] bg-[#0a0a0a] border border-white/5 p-8 flex flex-col justify-center text-center shadow-2xl">
            <span className="text-[#7a0016] text-4xl mb-6">"</span>
            <h3 className="text-2xl md:text-3xl font-serif text-white leading-snug mb-6">
              A wallet should not wear out. <br/> It should wear <span className="text-[#c4a484] italic">in.</span>
            </h3>
            <p className="text-white/40 font-light text-sm">
              Our full-grain leather goods are designed to evolve with you. As they absorb oils and develop unique patina, they become living records of your journey—the precise goal shared by founders Rafy and Maaz from the very start.
            </p>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="text-center pt-16 px-6">
          <Link 
            href="/collection" 
            className="inline-block bg-[#7a0016] text-white px-12 py-5 text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-[#9a1026] transition-colors duration-300 shadow-lg shadow-[#7a0016]/20"
          >
            Explore The Collection
          </Link>
        </section>

      </main>

    </div>
  );
}