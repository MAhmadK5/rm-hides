"use client";

import React from 'react';
import Link from 'next/link';
import { useCartStore } from '@/lib/store';

export default function MobileMenu() {
  const { isMenuOpen, closeMenu } = useCartStore();

  return (
    <div 
      className={`fixed inset-0 z-[200] bg-[#050505] transform transition-transform duration-500 ease-in-out flex flex-col ${
        isMenuOpen ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      {/* Header inside the menu */}
      <div className="flex items-center justify-between px-6 py-8 border-b border-white/5">
        <span className="text-[#7a0016] font-serif tracking-[0.2em] text-sm">
          R&M HIDES
        </span>
        <button 
          onClick={closeMenu} 
          className="text-white/50 hover:text-[#c4a484] transition-colors text-2xl font-light"
        >
          ✕
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col items-center justify-center flex-grow gap-10">
        <Link href="/" onClick={closeMenu} className="text-3xl font-serif text-white hover:text-[#c4a484] transition-colors tracking-wide">
          Home
        </Link>
        <Link href="/collection" onClick={closeMenu} className="text-3xl font-serif text-white hover:text-[#c4a484] transition-colors tracking-wide">
          Collection
        </Link>
        <Link href="/our-story" onClick={closeMenu} className="text-3xl font-serif text-white hover:text-[#c4a484] transition-colors tracking-wide">
          Our Story
        </Link>
        <Link href="/bulk-orders" onClick={closeMenu} className="text-3xl font-serif text-white hover:text-[#c4a484] transition-colors tracking-wide">
          Bulk Orders
        </Link>
      </nav>

      {/* Footer text inside menu */}
      <div className="pb-12 text-center">
        <p className="text-white/20 text-[10px] uppercase tracking-[0.3em]">
          Born in Islamabad
        </p>
      </div>
    </div>
  );
}