"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCartStore } from '@/lib/store';

export default function Header({ className = "" }: { className?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  
  const toggleCart = useCartStore((state) => state.toggleCart);
  const cartItems = useCartStore((state) => state.items);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className={`absolute top-0 inset-x-0 z-40 flex items-center justify-between px-6 md:px-12 py-6 transition-all ${className}`}>
        
        {/* LEFT SIDE: Mobile Menu, Back Arrow & Logo */}
        <div className="flex items-center gap-4 z-50">
          
          {/* Mobile Menu Toggle */}
          <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden text-white hover:text-[#c4a484] transition-colors p-1" aria-label="Open Menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>

          {/* DYNAMIC BACK BUTTON (Arrow Only, Hidden on Home) */}
          {pathname !== '/' && (
            <button 
              onClick={() => router.back()} 
              className="text-white/50 hover:text-white transition-colors group p-1 hidden sm:block md:block"
              aria-label="Go Back"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="group-hover:-translate-x-1 transition-transform">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
              </svg>
            </button>
          )}

          {/* Mobile Back Button (Overrides hiding on small screens if not on home) */}
           {pathname !== '/' && (
            <button 
              onClick={() => router.back()} 
              className="text-white/50 hover:text-white transition-colors group p-1 sm:hidden"
              aria-label="Go Back"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="group-hover:-translate-x-1 transition-transform">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
              </svg>
            </button>
          )}

          {/* BRAND LOGO (Centered on mobile, static next to buttons on desktop) */}
          <Link href="/" className="bg-[#7a0016] text-white font-serif tracking-[0.2em] text-sm md:text-lg px-4 py-1.5 shadow-lg border border-[#9a1026]/50 hover:bg-[#5a0010] transition-colors duration-300 absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">
            R&M HIDES
          </Link>
        </div>
        
        {/* DESKTOP NAVIGATION (Absolutely centered on desktop) */}
        <nav className="hidden md:flex gap-6 lg:gap-10 text-white/80 text-[10px] uppercase tracking-[0.3em] font-semibold items-center absolute left-1/2 -translate-x-1/2 z-40">
          <Link href="/collection" className="hover:text-[#c4a484] transition-colors duration-300">Collection</Link>
          <Link href="/bulk-orders" className="hover:text-[#c4a484] transition-colors duration-300">Bulk Orders</Link>
          <Link href="/track-order" className="hover:text-[#c4a484] transition-colors duration-300">Track Order</Link>
          <Link href="/contact" className="hover:text-[#c4a484] transition-colors duration-300">Contact Us</Link>
          <Link href="/admin" className="text-white/30 hover:text-[#c4a484] transition-colors duration-300 ml-2 border-l border-white/10 pl-6">Admin</Link>
        </nav>
        
        {/* RIGHT SIDE: Cart */}
        <button onClick={toggleCart} className="flex items-center gap-3 hover:text-[#c4a484] transition-colors duration-300 group z-50">
          <span className="hidden md:inline text-white/80 text-[10px] uppercase tracking-[0.3em] font-semibold group-hover:text-[#c4a484]">Cart</span>
          <div className="relative">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white group-hover:text-[#c4a484] transition-colors">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#c4a484] text-black text-[9px] w-[18px] h-[18px] flex items-center justify-center rounded-full font-bold shadow-lg">
                {cartCount}
              </span>
            )}
          </div>
        </button>
      </header>

      {/* MOBILE MENU OVERLAY */}
      <div className={`fixed inset-0 z-[100] bg-[#050505]/95 backdrop-blur-xl transition-all duration-500 ease-out flex flex-col ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className="flex justify-between items-center px-6 py-6 border-b border-white/5">
          <span className="text-[#c4a484] text-[10px] uppercase tracking-[0.3em] font-bold">Navigation</span>
          <button onClick={() => setIsMobileMenuOpen(false)} className="text-white/50 hover:text-white p-2 border border-white/10 rounded-full transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        <nav className="flex flex-col flex-grow items-center justify-center gap-8 text-2xl font-serif text-white tracking-widest uppercase text-center">
          <Link href="/" className="hover:text-[#c4a484] hover:scale-110 transition-all duration-300">Home</Link>
          <Link href="/collection" className="hover:text-[#c4a484] hover:scale-110 transition-all duration-300">Collection</Link>
          <Link href="/bulk-orders" className="hover:text-[#c4a484] hover:scale-110 transition-all duration-300">Bulk Orders</Link>
          <Link href="/track-order" className="hover:text-[#c4a484] hover:scale-110 transition-all duration-300">Track Order</Link>
          <Link href="/contact" className="hover:text-[#c4a484] hover:scale-110 transition-all duration-300">Contact</Link>
          <Link href="/admin" className="text-white/20 hover:text-[#c4a484] hover:scale-110 transition-all duration-300 mt-4 text-sm">Admin</Link>
        </nav>

        <div className="p-8 border-t border-white/5 text-center text-white/40 text-[10px] uppercase tracking-widest space-y-4">
          <p>Email: <a href="mailto:shop.rmhides@gmail.com" className="text-white hover:text-[#c4a484]">shop.rmhides@gmail.com</a></p>
          <p>WhatsApp: <a href="https://wa.me/923184878315" className="text-white hover:text-[#c4a484]">+92 318 487 8315</a></p>
        </div>
      </div>
    </>
  );
}