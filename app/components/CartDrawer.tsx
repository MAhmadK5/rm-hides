"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/lib/store';

export default function CartDrawer() {
  const router = useRouter();
  const { items, isOpen, closeCart, removeItem, updateQuantity } = useCartStore();

  // Helper to convert "Rs. 4,500" to the number 4500 for math
  const calculateSubtotal = () => {
    const total = items.reduce((sum, item) => {
      const numericPrice = parseInt(item.price.replace(/\D/g, ''));
      return sum + numericPrice * item.quantity;
    }, 0);
    // Format it back to a string with commas
    return `Rs. ${total.toLocaleString('en-PK')}`;
  };

  const handleCheckout = () => {
    closeCart(); // Close the drawer first
    router.push('/checkout'); // Route to the checkout page
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] transition-opacity duration-500 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`} 
        onClick={closeCart}
      />

      {/* Drawer Panel */}
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-[450px] bg-[#050505] border-l border-white/10 z-[101] transform transition-transform duration-500 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-8 py-6 border-b border-white/10">
          <span className="text-white font-serif uppercase tracking-[0.2em] text-sm">
            Your Cart ({items.reduce((total, item) => total + item.quantity, 0)})
          </span>
          <button onClick={closeCart} className="text-white/50 hover:text-[#7a0016] transition-colors text-xl font-light">✕</button>
        </div>

        <div className="flex-1 overflow-y-auto px-8 py-8 flex flex-col gap-8">
          {items.length === 0 ? (
            <div className="text-white/40 text-center uppercase tracking-[0.2em] text-[10px] mt-10">
              Your cart is empty.
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-6 items-center">
                <div className="w-24 h-32 bg-[#111] flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-80" />
                </div>
                
                <div className="flex flex-col flex-1 h-full py-2">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-white font-serif tracking-wide text-sm">{item.name}</h3>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="text-white/40 hover:text-[#7a0016] text-[10px] uppercase tracking-[0.1em] transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                  <span className="text-white/40 text-[9px] uppercase tracking-[0.2em] mb-4">{item.color}</span>
                  
                  <div className="flex justify-between items-center mt-auto">
                    <div className="flex items-center border border-white/20">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-3 py-1 text-white/60 hover:text-white transition-colors">-</button>
                      <span className="text-xs text-white px-2">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 py-1 text-white/60 hover:text-white transition-colors">+</button>
                    </div>
                    <span className="text-white/80 font-light text-sm">{item.price}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="px-8 py-8 border-t border-white/10 bg-[#020000]">
          <div className="flex justify-between items-center mb-2">
            <span className="text-white/60 uppercase tracking-[0.1em] text-[10px]">Subtotal</span>
            <span className="text-white font-serif text-lg">{calculateSubtotal()}</span>
          </div>
          <p className="text-white/40 text-[9px] uppercase tracking-[0.1em] mb-6">Shipping & taxes calculated at checkout.</p>
          <button 
            onClick={handleCheckout}
            disabled={items.length === 0}
            className="w-full bg-[#7a0016] disabled:bg-gray-800 disabled:cursor-not-allowed text-white py-5 text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-[#9a1026] transition-colors duration-300 shadow-lg shadow-[#7a0016]/20"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </>
  );
}