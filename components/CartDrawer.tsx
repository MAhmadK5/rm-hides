"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/lib/store';

export default function CartDrawer() {
  const { items, isCartOpen, toggleCart, updateQuantity, removeItem } = useCartStore();

  // Prevent background scrolling when cart is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isCartOpen]);

  const parsePrice = (priceStr: string) => {
    if (!priceStr) return 0;
    const rawNumber = priceStr.replace(/\D/g, ""); 
    return parseInt(rawNumber, 10) || 0;
  };

  const subtotal = items.reduce((total, item) => total + (parsePrice(String(item.price)) * item.quantity), 0);

  return (
    <>
      {/* Dark Overlay Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] transition-opacity duration-500 ${isCartOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={toggleCart}
      ></div>

      {/* Slide-out Cart Panel */}
      <div className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-[#050505] border-l border-white/10 z-[210] transform transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Cart Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <h2 className="text-xl font-serif text-white tracking-widest uppercase">Your Cart</h2>
          <button onClick={toggleCart} className="text-white/50 hover:text-white transition-colors p-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Cart Items Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 hide-scrollbar">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-white/40">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="mb-4 opacity-50">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              <p className="text-[10px] uppercase tracking-widest">Your bag is empty</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 group">
                <div className="w-20 h-24 bg-[#111] border border-white/5 flex-shrink-0 relative overflow-hidden">
                  <img src={item.image || '/placeholder.png'} alt={item.name} className="w-full h-full object-cover opacity-80" />
                </div>
                <div className="flex flex-col flex-1 py-1">
                  <div className="flex justify-between items-start">
                    <h3 className="text-white font-serif tracking-wide text-sm">{item.name}</h3>
                    <button onClick={() => removeItem(item.id)} className="text-white/30 hover:text-red-500 transition-colors">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                  </div>
                  <span className="text-[9px] uppercase tracking-[0.2em] text-white/40 mt-1">{item.color}</span>
                  
                  <div className="mt-auto flex items-center justify-between">
                    {/* Quantity Controls */}
                    <div className="flex items-center border border-white/10 rounded-full overflow-hidden">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-3 py-1 text-white/50 hover:text-white hover:bg-white/5 transition-colors">-</button>
                      <span className="text-xs text-white w-4 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 py-1 text-white/50 hover:text-white hover:bg-white/5 transition-colors">+</button>
                    </div>
                    <span className="text-[#c4a484] text-sm">Rs. {(parsePrice(String(item.price)) * item.quantity).toLocaleString('en-PK')}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Cart Footer / Checkout */}
        {items.length > 0 && (
          <div className="p-6 bg-[#0a0a0a] border-t border-white/5">
            <div className="flex justify-between text-white font-serif text-lg mb-6">
              <span>Subtotal</span>
              <span className="text-[#c4a484]">Rs. {subtotal.toLocaleString('en-PK')}</span>
            </div>
            <p className="text-[9px] uppercase tracking-widest text-white/40 mb-6 text-center">Shipping calculated at checkout.</p>
            <Link 
              href="/checkout" 
              onClick={toggleCart} // Close cart when navigating to checkout
              className="w-full bg-[#7a0016] text-white py-4 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-[#9a1026] transition-colors shadow-lg flex items-center justify-center gap-3"
            >
              Proceed to Checkout ➔
            </Link>
          </div>
        )}
      </div>

      {/* Hide scrollbar utility */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </>
  );
}