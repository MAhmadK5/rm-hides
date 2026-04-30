"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import Header from '@/components/Header';

export default function HomePage() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from('products').select('*');
      if (data) setProducts(data);
      if (error) console.error("Error loading products:", error);
    };
    fetchProducts();
  }, []);

  return (
    <div className="relative min-h-screen bg-transparent selection:bg-[#7a0016] selection:text-white font-sans overflow-hidden">
      
      {/* =========================================
          ALL CONTENT WRAPPED IN Z-10
          ========================================= */}
      <div className="relative z-10 flex flex-col">
        
        {/* SECTION 1: HERO */}
        <section className="relative w-full h-[100dvh] overflow-hidden bg-transparent">
          <Header className="bg-transparent" />

          {/* Video with reduced opacity */}
          <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-screen">
            <source src="/hero-video-1.mp4" type="video/mp4" />
          </video>
          
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/40 via-transparent to-[#050505] z-10" />

          <div className="relative z-20 flex flex-col items-center justify-center h-full px-4 text-center mt-10 md:mt-0">
            <span className="bg-[#7a0016]/90 text-white px-3 py-1 uppercase tracking-[0.5em] text-[10px] font-semibold mb-6 backdrop-blur-sm shadow-md border border-[#9a1026]/50">
              Born in Islamabad
            </span>
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-serif text-[#fdfcf9] tracking-widest mb-4 drop-shadow-2xl">R&M HIDES</h1>
            <p className="text-white/80 max-w-lg mt-4 text-sm md:text-base font-light tracking-wide drop-shadow-lg">Taking the <b> Leather </b> to a next level <i>worldwide</i>.</p>
          </div>
        </section>

        {/* SECTION 1.5: THE MARQUEE */}
        <div className="w-full overflow-hidden bg-[#050505]/60 backdrop-blur-md py-4 border-y border-white/5">
          <div className="animate-marquee flex gap-12 text-[#c4a484] font-serif uppercase tracking-[0.3em] text-[10px] md:text-xs whitespace-nowrap">
            {Array(8).fill("100% Full Grain Leather ✦ Handcrafted in Sialkot ✦ Lifetime Stitching ✦").map((text, i) => (
              <span key={i} className="flex-shrink-0 drop-shadow-md">{text}</span>
            ))}
          </div>
        </div>

        {/* SECTION 2: EXTREME SIGNATURE COLLECTION */}
        <section className="py-24 md:py-32 px-6 md:px-12 max-w-[1600px] mx-auto w-full relative z-20">
          <div className="flex justify-between items-end mb-10 md:mb-16">
            <div>
              <span className="text-[#c4a484] uppercase tracking-[0.3em] text-[9px] font-bold mb-2 block flex items-center gap-2">
                <span className="w-4 h-[1px] bg-[#c4a484]"></span> The Masterworks
              </span>
              <h2 className="text-3xl md:text-5xl font-serif text-[#fdfcf9] tracking-wide">
                Signature <span className="italic font-light text-[#c4a484]">Pieces</span>
              </h2>
            </div>
            <Link href="/collection" className="hidden md:flex items-center gap-2 text-[#c4a484] text-[10px] uppercase tracking-[0.2em] font-bold hover:text-white transition-colors group">
              View All <span className="group-hover:translate-x-1 transition-transform">➔</span>
            </Link>
          </div>

          <div className="flex overflow-x-auto pb-10 -mx-6 px-6 md:mx-0 md:px-0 md:grid md:grid-cols-3 gap-4 md:gap-10 snap-x snap-mandatory hide-scrollbar">
            {products.slice(0, 3).map((product) => (
              <Link href={`/product/${product.slug}`} key={product.slug} className="group relative min-w-[85vw] sm:min-w-[320px] md:min-w-0 snap-center cursor-pointer block">
                <div className="aspect-[3/4] md:aspect-[4/5] bg-[#050505] relative overflow-hidden border border-white/5 shadow-2xl">
                  <img 
                    src={product.images?.[0] || '/leather.png'} 
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[1500ms] ease-out"
                  />
                  <div className="absolute top-4 right-4 bg-[#050505]/60 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full z-20 text-white font-medium text-xs tracking-wider shadow-lg">
                    Rs. {product.price}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity z-10" />
                  <div className="absolute bottom-0 inset-x-0 p-6 md:p-8 z-20 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-[#c4a484] text-[9px] uppercase tracking-[0.3em] font-bold mb-2 block">
                      {product.colors?.length || 0} Colors
                    </span>
                    <h3 className="text-white font-serif text-2xl md:text-3xl tracking-wide group-hover:text-[#c4a484] transition-colors duration-500">
                      {product.name}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-4 text-center md:hidden">
            <Link href="/collection" className="inline-block border border-white/10 text-white/70 px-8 py-3 text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-white/5 transition-colors">
              Explore All ➔
            </Link>
          </div>
          
          {products.length === 0 && (
            <div className="text-center text-[#c4a484] uppercase tracking-widest text-[10px] animate-pulse">
              Loading collection...
            </div>
          )}
        </section>

        {/* SECTION 3: THE CRAFT */}
        <section className="relative w-full bg-[#050505]/40 backdrop-blur-xl border-t border-white/5 py-20 md:py-32 overflow-hidden shadow-[0_-20px_50px_rgba(0,0,0,0.5)] z-20">
          <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-12 md:gap-24">
            <div className="w-full md:w-1/2 flex flex-col items-start z-10">
              <span className="text-[#7a0016] uppercase tracking-[0.4em] text-[10px] font-bold mb-4 md:mb-6">Our Heritage</span>
              <h2 className="text-4xl md:text-6xl font-serif text-[#fdfcf9] tracking-wide mb-6 md:mb-8 leading-tight">
                Mastery from <br/><span className="italic font-light text-[#c4a484]">Sialkot.</span>
              </h2>
              <div className="w-12 h-[1px] bg-[#c4a484] mb-6 md:mb-8"></div>
              <p className="text-white/60 text-sm md:text-base leading-relaxed md:leading-loose font-light mb-4 md:mb-6">
                We don't use genuine leather—we use <strong className="text-white font-medium">full-grain</strong>. It is the topmost layer of the hide, keeping all the natural, dense fibers intact. 
              </p>
              <p className="text-white/60 text-sm md:text-base leading-relaxed md:leading-loose font-light">
                Every wallet is stitched by master artisans in Sialkot, a city globally renowned for its centuries-old leather craftsmanship. The result is a piece that doesn't just hold your essentials; it develops a rich patina and tells your story over time.
              </p>
            </div>
            <div className="w-full md:w-1/2 relative">
              <div className="absolute top-4 -left-4 md:top-8 md:-left-8 w-full h-full bg-[#050505]/50 border border-white/5 z-0 backdrop-blur-sm"></div>
              <div className="relative w-full aspect-[4/5] md:aspect-[3/4] z-10 overflow-hidden shadow-2xl">
                <img src="/leather.png" alt="Leather Craftsmanship" className="w-full h-full object-cover hover:scale-105 transition-transform duration-[2000ms] ease-out grayscale hover:grayscale-0" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60"></div>
              </div>
              <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-left-12 bg-[#7a0016]/90 backdrop-blur-md text-white p-4 md:p-6 z-20 shadow-2xl flex flex-col items-start border border-[#9a1026]/30">
                <span className="text-[8px] md:text-[9px] uppercase tracking-[0.3em] opacity-80 mb-1">Material</span>
                <span className="font-serif tracking-widest text-base md:text-lg">100% Full Grain</span>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================
            VISUAL SEPARATOR: The Breath
            ========================================= */}
        <div className="w-full flex justify-center py-10 md:py-20 relative z-10 bg-transparent pointer-events-none">
          <div className="w-[1px] h-24 md:h-40 bg-gradient-to-b from-[#c4a484]/0 via-[#c4a484]/50 to-[#c4a484]/0 shadow-[0_0_15px_rgba(196,164,132,0.5)]"></div>
        </div>

        {/* SECTION 4: OUR STORY & TEAM */}
        <section className="pb-24 md:pb-32 px-6 md:px-12 max-w-[1600px] mx-auto w-full relative z-20 flex flex-col items-center justify-center">
          
          <div className="text-center mb-12 md:mb-20 bg-[#050505]/60 backdrop-blur-md p-6 md:p-12 rounded-sm border border-white/5 shadow-2xl w-full max-w-4xl">
            <span className="text-[#7a0016] uppercase tracking-[0.4em] text-[10px] font-bold mb-4 block">The Void & The Vision</span>
            <h2 className="text-3xl md:text-5xl font-serif text-[#fdfcf9] tracking-wide mb-4 md:mb-6">
              Crafting a brand where <span className="italic font-light text-[#c4a484]">none existed.</span>
            </h2>
            <div className="w-16 h-[1px] bg-white/20 mx-auto mb-6"></div>
            <p className="text-white/60 font-light text-sm md:text-base leading-relaxed">
              Friends Rafy and Maaz saw a void in the Pakistani market: despite the country's rich history of leather craftsmanship, finding a premium, minimalist, home-grown wallet brand was nearly impossible. R&M Hides was conceived to channel Sialkot's mastery into timeless design.
            </p>
          </div>

          <div className="w-full max-w-6xl flex overflow-x-auto pb-8 -mx-6 px-6 md:mx-0 md:px-0 md:grid md:grid-cols-3 gap-4 md:gap-10 snap-x snap-mandatory hide-scrollbar justify-center">
            {[
              { name: 'Abdul Rafy', title: 'CEO & Co-Founder', quote: '"We are reclaiming Pakistani craftsmanship to define a new standard for local luxury. Each R&M piece is a promise of quality."' },
              { name: 'Maaz Sarfaraz', title: 'Director & Co-Founder', quote: '"Our focus is unwavering operational excellence. We aim to create products embodying the resilient spirit of Pakistani artistry."' },
              { name: 'M. Ahmad Khalid', title: 'Web Developer', quote: '"I translate the tangible artistry of full-grain leather into a seamless digital storefront that reflects our brand\'s essence."' }
            ].map((member, i) => (
              <div key={i} className="min-w-[85vw] sm:min-w-[300px] md:min-w-0 snap-center bg-[#050505]/60 backdrop-blur-xl border border-white/5 p-8 md:p-12 flex flex-col items-center justify-center text-center shadow-2xl hover:border-[#c4a484]/30 hover:bg-[#111]/80 transition-all duration-500 group min-h-[280px]">
                <h3 className="text-xl md:text-2xl font-serif text-white tracking-wide mb-2">{member.name}</h3>
                <span className="text-[9px] uppercase tracking-[0.2em] text-[#c4a484] mb-6 block">{member.title}</span>
                <p className="text-white/50 font-light text-xs md:text-sm leading-relaxed italic">
                  {member.quote}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 5: THE GUARANTEES (Now in a distinct, separated dark block) */}
        <section className="w-full bg-[#020000] border-y border-[#7a0016]/30 py-20 md:py-28 relative z-20 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
          <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
            <span className="text-[#c4a484] uppercase tracking-[0.4em] text-[10px] font-bold block mb-4">The R&M Standard</span>
            <h3 className="text-3xl md:text-5xl font-serif text-white tracking-wide">
              Uncompromising <span className="italic font-light text-[#7a0016]">Features.</span>
            </h3>
          </div>

          <div className="max-w-7xl mx-auto flex overflow-x-auto md:grid md:grid-cols-3 gap-4 md:gap-10 divide-x-0 md:divide-x divide-white/10 text-center px-6 snap-x snap-mandatory hide-scrollbar">
            <div className="min-w-[70vw] md:min-w-0 snap-center flex flex-col items-center px-6">
              <div className="w-12 h-12 rounded-full bg-[#7a0016]/10 border border-[#7a0016]/30 flex items-center justify-center mb-6">
                <span className="text-[#7a0016] text-xl">✦</span>
              </div>
              <h4 className="text-white uppercase tracking-[0.2em] text-[10px] md:text-xs font-bold mb-3 drop-shadow-md">Lifetime Stitching</h4>
              <p className="text-white/40 font-light text-xs md:text-sm leading-relaxed">Guaranteed to endure. We repair any stitching issues for life.</p>
            </div>
            
            <div className="min-w-[70vw] md:min-w-0 snap-center flex flex-col items-center px-6 md:border-l border-white/10">
              <div className="w-12 h-12 rounded-full bg-[#c4a484]/5 border border-[#c4a484]/30 flex items-center justify-center mb-6">
                <span className="text-[#c4a484] text-xl">❖</span>
              </div>
              <h4 className="text-white uppercase tracking-[0.2em] text-[10px] md:text-xs font-bold mb-3 drop-shadow-md">Premium Packaging</h4>
              <p className="text-white/40 font-light text-xs md:text-sm leading-relaxed">Arrives in a luxury matte box, perfect for unforgettable gifting.</p>
            </div>
            
            <div className="min-w-[70vw] md:min-w-0 snap-center flex flex-col items-center px-6 md:border-l border-white/10">
              <div className="w-12 h-12 rounded-full bg-[#7a0016]/10 border border-[#7a0016]/30 flex items-center justify-center mb-6">
                <span className="text-[#7a0016] text-xl">✧</span>
              </div>
              <h4 className="text-white uppercase tracking-[0.2em] text-[10px] md:text-xs font-bold mb-3 drop-shadow-md">Nationwide Delivery</h4>
              <p className="text-white/40 font-light text-xs md:text-sm leading-relaxed">Swift, secure shipping from Islamabad to anywhere in Pakistan.</p>
            </div>
          </div>
        </section>

        {/* SECTION 6: THE LIFESTYLE & FINAL CTA (Clear visual break before image) */}
        <section className="relative w-full h-[60vh] md:h-[80vh] flex items-center justify-center overflow-hidden bg-[#050505]">
          <div className="absolute inset-0 z-0">
            <img src="/Story.jpg" alt="Leather Lifestyle" className="w-full h-full object-cover opacity-40 hover:opacity-60 transition-opacity duration-[2000ms] mix-blend-screen" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020000] via-[#050505]/40 to-[#020000] opacity-90"></div>
          </div>
          
          <div className="relative z-10 text-center px-6 max-w-3xl flex flex-col items-center bg-[#050505]/50 backdrop-blur-xl p-8 md:p-16 border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] rounded-sm">
            <span className="text-[#c4a484] uppercase tracking-[0.4em] text-[9px] md:text-[10px] font-bold mb-4 md:mb-6 block drop-shadow-lg">
              The Evolution
            </span>
            <h2 className="text-3xl md:text-6xl font-serif text-[#fdfcf9] tracking-wide mb-4 md:mb-6 leading-tight drop-shadow-2xl">
              A story told in <br className="md:hidden"/> <span className="italic font-light text-[#7a0016]">every crease.</span>
            </h2>
            <div className="w-12 h-[1px] bg-white/20 mx-auto mb-6 md:mb-8"></div>
            <p className="text-white/70 font-light text-xs md:text-base mb-8 md:mb-10 leading-relaxed max-w-lg drop-shadow-md">
              Our full-grain leather doesn't wear out—it wears in. Every mark, scratch, and polished edge reflects your personal journey. It is an artifact of your life.
            </p>
            <Link href="/collection" className="group relative overflow-hidden bg-[#7a0016] text-white px-8 md:px-12 py-4 md:py-5 text-[10px] md:text-[11px] uppercase tracking-[0.3em] font-bold border border-[#9a1026] shadow-2xl">
              <span className="relative z-10 group-hover:text-black transition-colors duration-300">Explore Full Collection</span>
              <div className="absolute inset-0 bg-[#c4a484] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0"></div>
            </Link>
          </div>
        </section>

      </div>

      <a href="https://wa.me/923184878315" target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-[0_0_20px_rgba(37,211,102,0.3)] hover:scale-110 transition-transform duration-300 flex items-center justify-center group" aria-label="Chat with us on WhatsApp">
        <svg width="32" height="32" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6 md:w-8 md:h-8">
          <path d="M12.031 0C5.385 0 0 5.386 0 12.031c0 2.112.551 4.168 1.599 5.986L.001 24l6.152-1.613c1.765.955 3.753 1.458 5.877 1.458 6.646 0 12.031-5.385 12.031-12.031C24.062 5.386 18.678 0 12.031 0zm.001 21.84c-1.789 0-3.539-.481-5.074-1.39l-.364-.216-3.77.989.999-3.676-.237-.377a9.92 9.92 0 0 1-1.526-5.331c0-5.5 4.477-9.975 9.975-9.975 5.5 0 9.976 4.475 9.976 9.975zm5.474-7.481c-.301-.15-1.776-.877-2.053-.977-.275-.101-.476-.15-.676.15-.201.301-.776.977-.951 1.178-.175.201-.35.226-.651.076-1.353-.679-2.394-1.282-3.328-2.585-.24-.336.241-.318.826-1.487.075-.15.038-.276-.038-.426-.075-.15-.676-1.626-.926-2.227-.243-.584-.489-.505-.676-.514-.175-.01-.376-.01-.576-.01-.2 0-.526.076-.801.376-.275.301-1.051 1.026-1.051 2.502 0 1.477 1.076 2.903 1.226 3.103.15.201 2.115 3.228 5.122 4.526 1.488.643 2.181.71 2.977.625.92-.098 2.802-1.144 3.197-2.25.396-1.106.396-2.052.276-2.252-.12-.201-.421-.301-.722-.451z"/>
        </svg>
      </a>

      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
}