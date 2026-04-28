"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import { supabase } from '@/lib/supabase';

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState('');
  const [phone, setPhone] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [orderResult, setOrderResult] = useState<any>(null);

  const handleTrackOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setOrderResult(null);

    // Format the Order ID in case they forgot the "RM-" prefix
    const formattedOrderId = orderId.toUpperCase().startsWith('RM-') 
      ? orderId.toUpperCase() 
      : `RM-${orderId}`;

    const { data, error: fetchError } = await supabase
      .from('orders')
      .select('*')
      .eq('order_id', formattedOrderId)
      .eq('phone', phone)
      .single();

    setLoading(false);

    if (fetchError || !data) {
      setError("We couldn't find an order matching that ID and phone number. Please check your details and try again.");
    } else {
      setOrderResult(data);
    }
  };

  // Helper to determine the visual progress bar state
  const getStatusLevel = (status: string) => {
    const s = status?.toLowerCase() || 'pending';
    if (s === 'delivered') return 3;
    if (s === 'shipped') return 2;
    return 1; // pending
  };

  return (
  <div className="relative min-h-screen bg-transparent selection:bg-[#7a0016] selection:text-white font-sans overflow-hidden">
      <Header className="!sticky !top-0 bg-[#050505]/95 backdrop-blur-xl border-b border-white/5 z-50" />

      {/* Subtle Background Elements */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#c4a484]/5 rounded-full blur-[120px] pointer-events-none"></div>

      <main className="max-w-3xl mx-auto px-6 py-20 relative z-10">
        <div className="text-center mb-12">
          <span className="text-[#c4a484] uppercase tracking-[0.4em] text-[10px] font-bold mb-4 block">Order Status</span>
          <h1 className="text-4xl md:text-5xl font-serif text-[#fdfcf9] tracking-wide mb-4">
            Track Your <span className="italic font-light text-[#c4a484]">Gear</span>
          </h1>
          <p className="text-white/40 text-sm tracking-widest max-w-md mx-auto">
            Enter your Order ID and the phone number used during checkout to track your shipment.
          </p>
        </div>

        {/* INPUT FORM */}
        {!orderResult && (
          <div className="bg-[#111] border border-white/10 p-8 md:p-12 shadow-2xl max-w-xl mx-auto">
            <form onSubmit={handleTrackOrder} className="space-y-6">
              
              {error && (
                <div className="bg-[#7a0016]/10 border border-[#7a0016]/50 text-[#ff4d4d] p-4 text-xs tracking-wide text-center">
                  {error}
                </div>
              )}

              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-widest text-white/50">Order ID</label>
                <input 
                  required 
                  type="text" 
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  placeholder="e.g. RM-123456" 
                  className="bg-[#0a0a0a] border border-white/10 px-4 py-4 text-white outline-none focus:border-[#c4a484] transition-colors font-mono uppercase" 
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-widest text-white/50">Phone Number</label>
                <input 
                  required 
                  type="tel" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="The number used at checkout" 
                  className="bg-[#0a0a0a] border border-white/10 px-4 py-4 text-white outline-none focus:border-[#c4a484] transition-colors" 
                />
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-[#7a0016] text-white py-5 mt-4 text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-[#9a1026] transition-colors shadow-lg disabled:opacity-50 flex items-center justify-center gap-3"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  "Track Shipment"
                )}
              </button>
            </form>
          </div>
        )}

        {/* RESULTS VIEW */}
        {orderResult && (
          <div className="bg-[#111] border border-white/10 p-8 md:p-12 shadow-2xl animate-fade-in">
            
            <div className="flex justify-between items-start border-b border-white/10 pb-6 mb-8">
              <div>
                <h2 className="text-2xl font-serif text-white tracking-widest mb-1">Order {orderResult.order_id}</h2>
                <p className="text-white/40 text-[10px] uppercase tracking-widest">
                  Placed on {new Date(orderResult.created_at).toLocaleDateString()}
                </p>
              </div>
              <button onClick={() => setOrderResult(null)} className="text-white/30 hover:text-white text-[10px] uppercase tracking-widest border border-white/10 px-4 py-2 transition-colors">
                Search Again
              </button>
            </div>

            {/* VISUAL STATUS TIMELINE */}
            <div className="mb-12">
              <div className="relative flex justify-between items-center mb-2">
                {/* Connecting Line */}
                <div className="absolute top-1/2 left-0 w-full h-[2px] bg-white/10 -z-10 -translate-y-1/2"></div>
                {/* Active Line Fill */}
                <div 
                  className="absolute top-1/2 left-0 h-[2px] bg-[#c4a484] -z-10 -translate-y-1/2 transition-all duration-1000"
                  style={{ width: getStatusLevel(orderResult.status) === 1 ? '0%' : getStatusLevel(orderResult.status) === 2 ? '50%' : '100%' }}
                ></div>

                {/* Step 1: Pending */}
                <div className="flex flex-col items-center gap-3 bg-[#111] px-2">
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors ${getStatusLevel(orderResult.status) >= 1 ? 'border-[#c4a484] bg-[#c4a484]/20 text-[#c4a484]' : 'border-white/20 bg-[#0a0a0a] text-white/20'}`}>
                    1
                  </div>
                  <span className={`text-[9px] uppercase tracking-widest ${getStatusLevel(orderResult.status) >= 1 ? 'text-[#c4a484]' : 'text-white/30'}`}>Processing</span>
                </div>

                {/* Step 2: Shipped */}
                <div className="flex flex-col items-center gap-3 bg-[#111] px-2">
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors ${getStatusLevel(orderResult.status) >= 2 ? 'border-[#c4a484] bg-[#c4a484]/20 text-[#c4a484]' : 'border-white/20 bg-[#0a0a0a] text-white/20'}`}>
                    2
                  </div>
                  <span className={`text-[9px] uppercase tracking-widest ${getStatusLevel(orderResult.status) >= 2 ? 'text-[#c4a484]' : 'text-white/30'}`}>Shipped</span>
                </div>

                {/* Step 3: Delivered */}
                <div className="flex flex-col items-center gap-3 bg-[#111] px-2">
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors ${getStatusLevel(orderResult.status) === 3 ? 'border-[#25D366] bg-[#25D366]/20 text-[#25D366]' : 'border-white/20 bg-[#0a0a0a] text-white/20'}`}>
                    ✓
                  </div>
                  <span className={`text-[9px] uppercase tracking-widest ${getStatusLevel(orderResult.status) === 3 ? 'text-[#25D366]' : 'text-white/30'}`}>Delivered</span>
                </div>
              </div>
            </div>

            {/* ORDER DETAILS SUMMARY */}
            <div className="bg-[#0a0a0a] border border-white/5 p-6 mb-8">
              <span className="block text-[9px] uppercase tracking-[0.2em] text-[#c4a484] mb-4 border-b border-white/10 pb-2">Order Items</span>
              <div className="space-y-4">
                {orderResult.items?.map((item: any, idx: number) => (
                  <div key={idx} className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-12 bg-[#111] border border-white/5">
                        <img src={item.image || '/placeholder.png'} className="w-full h-full object-cover opacity-80" alt={item.name} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-white font-serif">{item.name}</span>
                        <span className="text-[9px] text-white/40 uppercase tracking-widest mt-1">Qty: {item.quantity} | {item.color}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
              <div>
                <span className="block text-[9px] uppercase tracking-[0.2em] text-white/40 mb-2">Shipping To</span>
                <span className="text-white font-medium block mb-1">{orderResult.customer_name}</span>
                <span className="text-white/60">{orderResult.address}, {orderResult.city}</span>
              </div>
              <div className="md:text-right">
                <span className="block text-[9px] uppercase tracking-[0.2em] text-white/40 mb-2">Order Total</span>
                <span className="text-[#c4a484] font-serif text-xl">Rs. {Number(orderResult.total_amount).toLocaleString('en-PK')}</span>
                <span className="block text-white/40 text-[10px] uppercase tracking-widest mt-1">Cash on Delivery</span>
              </div>
            </div>
            
            <div className="mt-10 pt-6 border-t border-white/10 flex justify-center">
               <a href="https://wa.me/923184878315" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[10px] uppercase tracking-widest text-white/50 hover:text-[#25D366] transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 0C5.385 0 0 5.386 0 12.031c0 2.112.551 4.168 1.599 5.986L.001 24l6.152-1.613c1.765.955 3.753 1.458 5.877 1.458 6.646 0 12.031-5.385 12.031-12.031C24.062 5.386 18.678 0 12.031 0zm.001 21.84c-1.789 0-3.539-.481-5.074-1.39l-.364-.216-3.77.989.999-3.676-.237-.377a9.92 9.92 0 0 1-1.526-5.331c0-5.5 4.477-9.975 9.975-9.975 5.5 0 9.976 4.475 9.976 9.975zm5.474-7.481c-.301-.15-1.776-.877-2.053-.977-.275-.101-.476-.15-.676.15-.201.301-.776.977-.951 1.178-.175.201-.35.226-.651.076-1.353-.679-2.394-1.282-3.328-2.585-.24-.336.241-.318.826-1.487.075-.15.038-.276-.038-.426-.075-.15-.676-1.626-.926-2.227-.243-.584-.489-.505-.676-.514-.175-.01-.376-.01-.576-.01-.2 0-.526.076-.801.376-.275.301-1.051 1.026-1.051 2.502 0 1.477 1.076 2.903 1.226 3.103.15.201 2.115 3.228 5.122 4.526 1.488.643 2.181.71 2.977.625.92-.098 2.802-1.144 3.197-2.25.396-1.106.396-2.052.276-2.252-.12-.201-.421-.301-.722-.451z"/></svg>
                  Need Help? Contact Support
               </a>
            </div>

          </div>
        )}
      </main>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fadeIn 0.4s ease-out forwards; }
      `}} />
    </div>
  );
}