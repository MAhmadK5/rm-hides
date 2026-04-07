import React from 'react';
import Link from 'next/link';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  return (
    <>
      {/* 1. THE BACKDROP OVERLAY */}
      {/* Blurs the background and closes the cart if you click outside of it */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] transition-opacity duration-500 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`} 
        onClick={onClose}
      />

      {/* 2. THE DRAWER PANEL */}
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-[450px] bg-[#050505] border-l border-white/10 z-[101] transform transition-transform duration-500 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        
        {/* Cart Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-white/10">
          <span className="text-white font-serif uppercase tracking-[0.2em] text-sm">Your Cart (1)</span>
          <button 
            onClick={onClose}
            className="text-white/50 hover:text-[#7a0016] transition-colors text-xl font-light"
          >
            ✕
          </button>
        </div>

        {/* Cart Body (Items) */}
        <div className="flex-1 overflow-y-auto px-8 py-8 flex flex-col gap-8">
          
          {/* Example Cart Item */}
          <div className="flex gap-6 items-center">
            {/* Item Image */}
            <div className="w-24 h-32 bg-[#111] flex-shrink-0">
              <img 
                src="/prod1.png" 
                alt="The Executive Bifold" 
                className="w-full h-full object-cover opacity-80"
              />
            </div>
            
            {/* Item Details */}
            <div className="flex flex-col flex-1">
              <div className="flex justify-between items-start mb-1">
                <h3 className="text-white font-serif tracking-wide text-sm">The Executive Bifold</h3>
                <button className="text-white/40 hover:text-[#7a0016] text-[10px] uppercase tracking-[0.1em] transition-colors">
                  Remove
                </button>
              </div>
              <span className="text-white/40 text-[9px] uppercase tracking-[0.2em] mb-4">Espresso Brown</span>
              
              <div className="flex justify-between items-center mt-auto">
                {/* Quantity Selector */}
                <div className="flex items-center border border-white/20">
                  <button className="px-3 py-1 text-white/60 hover:text-white transition-colors">-</button>
                  <span className="text-xs text-white px-2">1</span>
                  <button className="px-3 py-1 text-white/60 hover:text-white transition-colors">+</button>
                </div>
                <span className="text-white/80 font-light text-sm">Rs. 4,500</span>
              </div>
            </div>
          </div>

        </div>

        {/* Cart Footer (Totals & Checkout) */}
        <div className="px-8 py-8 border-t border-white/10 bg-[#020000]">
          <div className="flex justify-between items-center mb-2">
            <span className="text-white/60 uppercase tracking-[0.1em] text-[10px]">Subtotal</span>
            <span className="text-white font-serif text-lg">Rs. 4,500</span>
          </div>
          <p className="text-white/40 text-[9px] uppercase tracking-[0.1em] mb-6">
            Shipping & taxes calculated at checkout.
          </p>
          
          <button className="w-full bg-[#7a0016] text-white py-5 text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-[#9a1026] transition-colors duration-300 shadow-lg shadow-[#7a0016]/20">
            Proceed to Checkout
          </button>
        </div>

      </div>
    </>
  );
}