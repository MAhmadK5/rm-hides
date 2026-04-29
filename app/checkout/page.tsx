"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/lib/store';
import { supabase } from '@/lib/supabase';
import Header from '@/components/Header'; 

export default function CheckoutPage() {
  const router = useRouter();
  
  const cartItems = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderData, setOrderData] = useState<any>(null); 
  const [promoCode, setPromoCode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cod');
  
  const [formData, setFormData] = useState({
    email: '', phone: '', firstName: '', lastName: '', address: '', city: '', postalCode: '',
  });

  // THE ULTIMATE FIX: Force it to expect a string, and we will force a string into it below.
  const parsePrice = (priceStr: string) => {
    if (!priceStr) return 0;
    const rawNumber = priceStr.replace(/\D/g, ""); 
    return parseInt(rawNumber, 10) || 0;
  };

  // THE ULTIMATE FIX P2: Wrap item.price in String() so TypeScript shuts up.
  const subtotal = cartItems.reduce((total, item) => total + (parsePrice(String(item.price)) * item.quantity), 0);
  const shipping = subtotal > 0 ? 250 : 0; 
  const totalAmount = subtotal + shipping;

  useEffect(() => {
    if (cartItems.length === 0 && !isSuccess) {
      router.push('/collection');
    }
  }, [cartItems, isSuccess, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendToWhatsApp = (order: any) => {
    const text = `*New Order Placed: ${order.order_id}* 🚀\n\n*Customer:* ${order.customer_name}\n*Phone:* ${order.phone}\n*Address:* ${order.address}, ${order.city}\n\n*Items:*\n${order.items.map((i:any) => `- ${i.quantity}x ${i.name} (${i.color})`).join('\n')}\n\n*Total:* Rs. ${order.total_amount.toLocaleString('en-PK')}\n*Payment:* Cash on Delivery\n\n_Please confirm my order!_`;
    window.open(`https://wa.me/923184878315?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const generatedOrderId = `RM-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder = {
      order_id: generatedOrderId, customer_name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email, phone: formData.phone, address: formData.address, city: formData.city,
      postal_code: formData.postalCode, total_amount: totalAmount, items: cartItems, status: 'pending'
    };

    const { error } = await supabase.from('orders').insert([newOrder]);
    setIsSubmitting(false);

    if (error) {
      alert("There was an issue processing your order. Please try again.");
    } else {
      setOrderData({ ...newOrder, subtotal, shipping }); 
      setIsSuccess(true);
      clearCart();
    }
  };

  const handleSaveReceipt = () => window.print();

  if (isSuccess && orderData) {
    return (
      <div className="bg-transparent min-h-screen flex flex-col items-center py-20 px-6 selection:bg-[#7a0016] selection:text-white font-sans relative overflow-hidden print:bg-white print:py-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#c4a484]/5 rounded-full blur-[100px] pointer-events-none print:hidden"></div>
        
        <div className="relative z-10 flex flex-col items-center w-full max-w-2xl print:max-w-full">
          <div className="text-center mb-8 print:hidden">
            <span className="text-[#c4a484] uppercase tracking-[0.4em] text-[10px] font-bold mb-4 block">Transaction Complete</span>
            <h1 className="text-4xl font-serif text-[#fdfcf9] tracking-wide mb-4">Thank you, {formData.firstName}.</h1>
            <p className="text-white/60 font-light text-sm max-w-md mx-auto">
              Your receipt is below. For the fastest processing and confirmation, forward this order to our WhatsApp team.
            </p>
          </div>

          <div id="receipt-card" className="bg-[#111] border border-white/10 w-full p-8 md:p-12 shadow-2xl relative overflow-hidden print:bg-white print:border-none print:shadow-none print:p-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10rem] font-serif text-white/[0.02] pointer-events-none tracking-tighter -rotate-12 print:text-black/[0.03]">R&M</div>
            <div className="relative z-10 border-b border-white/10 pb-8 mb-8 print:border-black/20 text-center">
              <h2 className="text-2xl font-serif text-white print:text-black tracking-widest uppercase mb-1">R&M Hides</h2>
              <p className="text-white/40 print:text-black/60 text-[10px] uppercase tracking-widest">Islamabad, Pakistan</p>
            </div>
            <div className="relative z-10 grid grid-cols-2 gap-8 mb-8 text-sm">
              <div><span className="block text-[9px] uppercase tracking-[0.2em] text-white/40 print:text-black/50 mb-1">Order ID</span><span className="text-white print:text-black font-mono font-bold tracking-widest">{orderData.order_id}</span></div>
              <div><span className="block text-[9px] uppercase tracking-[0.2em] text-white/40 print:text-black/50 mb-1">Date</span><span className="text-white print:text-black">{new Date().toLocaleDateString()}</span></div>
              <div className="col-span-2"><span className="block text-[9px] uppercase tracking-[0.2em] text-white/40 print:text-black/50 mb-1">Shipping Details</span><span className="text-white print:text-black font-bold mb-1 block">{orderData.customer_name}</span><span className="text-white/80 print:text-black/80">{orderData.address}, {orderData.city} {orderData.postal_code}</span><br/><span className="text-white/60 print:text-black/60">{orderData.phone}</span></div>
            </div>
            <div className="relative z-10 bg-[#0a0a0a] border border-white/5 p-6 print:bg-transparent print:border-black/20 print:p-6 print:rounded-lg">
              <span className="block text-[9px] uppercase tracking-[0.2em] text-[#c4a484] print:text-black/80 mb-6 border-b border-white/10 print:border-black/20 pb-2">Itemized Ledger</span>
              <div className="space-y-4 mb-6">
                {orderData.items.map((item: any, idx: number) => (
                  <div key={idx} className="flex justify-between items-center pb-4 border-b border-white/5 print:border-black/10 last:border-0 last:pb-0 text-sm">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-14 bg-black/20 print:bg-gray-100 rounded-sm overflow-hidden flex-shrink-0 border border-white/10 print:border-black/20">
                        {item.image ? <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale-[30%] print:grayscale-0" /> : <div className="w-full h-full bg-gray-800 print:bg-gray-200"></div>}
                      </div>
                      <div className="flex flex-col"><span className="text-white print:text-black font-serif tracking-wide">{item.name}</span><span className="text-[9px] text-white/40 print:text-black/60 uppercase tracking-widest mt-1">Qty: {item.quantity} | {item.color}</span></div>
                    </div>
                    <span className="text-white/80 print:text-black font-medium">Rs. {(parsePrice(String(item.price)) * item.quantity).toLocaleString('en-PK')}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-white/10 print:border-black/20 pt-4 space-y-2 text-sm">
                <div className="flex justify-between text-white/60 print:text-black/70"><span>Subtotal</span><span>Rs. {orderData.subtotal.toLocaleString('en-PK')}</span></div>
                <div className="flex justify-between text-white/60 print:text-black/70"><span>Shipping</span><span>Rs. {orderData.shipping.toLocaleString('en-PK')}</span></div>
                <div className="flex justify-between text-white print:text-black text-xl font-serif pt-4 border-t border-white/5 print:border-black/20 mt-2"><span>Total</span><span className="text-[#c4a484] print:text-black font-bold">Rs. {orderData.total_amount.toLocaleString('en-PK')}</span></div>
              </div>
            </div>
            <div className="mt-8 text-center text-white/30 print:text-black/50 text-[9px] uppercase tracking-widest relative z-10">Payment Method: Cash on Delivery</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 print:hidden w-full max-w-2xl">
            <button onClick={() => sendToWhatsApp(orderData)} className="md:col-span-1 bg-[#25D366] text-white px-4 py-4 text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-[#20bd5a] transition-colors flex items-center justify-center gap-3 shadow-lg shadow-[#25D366]/20 animate-pulse hover:animate-none">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 0C5.385 0 0 5.386 0 12.031c0 2.112.551 4.168 1.599 5.986L.001 24l6.152-1.613c1.765.955 3.753 1.458 5.877 1.458 6.646 0 12.031-5.385 12.031-12.031C24.062 5.386 18.678 0 12.031 0zm.001 21.84c-1.789 0-3.539-.481-5.074-1.39l-.364-.216-3.77.989.999-3.676-.237-.377a9.92 9.92 0 0 1-1.526-5.331c0-5.5 4.477-9.975 9.975-9.975 5.5 0 9.976 4.475 9.976 9.975zm5.474-7.481c-.301-.15-1.776-.877-2.053-.977-.275-.101-.476-.15-.676.15-.201.301-.776.977-.951 1.178-.175.201-.35.226-.651.076-1.353-.679-2.394-1.282-3.328-2.585-.24-.336.241-.318.826-1.487.075-.15.038-.276-.038-.426-.075-.15-.676-1.626-.926-2.227-.243-.584-.489-.505-.676-.514-.175-.01-.376-.01-.576-.01-.2 0-.526.076-.801.376-.275.301-1.051 1.026-1.051 2.502 0 1.477 1.076 2.903 1.226 3.103.15.201 2.115 3.228 5.122 4.526 1.488.643 2.181.71 2.977.625.92-.098 2.802-1.144 3.197-2.25.396-1.106.396-2.052.276-2.252-.12-.201-.421-.301-.722-.451z"/></svg>
              Confirm on WhatsApp
            </button>
            <button onClick={handleSaveReceipt} className="md:col-span-1 border border-[#c4a484] text-[#c4a484] px-4 py-4 text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-[#c4a484] hover:text-black transition-colors flex items-center justify-center gap-3">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              Save PDF
            </button>
            <Link href="/collection" className="md:col-span-1 bg-[#111] text-white px-4 py-4 text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-white hover:text-black transition-colors text-center border border-white/10 flex items-center justify-center">
              Store ➔
            </Link>
          </div>
        </div>
        
        <style dangerouslySetInnerHTML={{__html: `
          @media print {
            @page { margin: 0; size: auto; }
            body { background-color: white !important; -webkit-print-color-adjust: exact; color-adjust: exact; }
            body * { visibility: hidden; }
            #receipt-card, #receipt-card * { visibility: visible; }
            #receipt-card { position: absolute; left: 5%; top: 5%; width: 90%; margin: 0; }
          }
        `}} />
      </div>
    );
  }

  if (cartItems.length === 0) return null; 

  return (
    <div className="bg-transparent min-h-screen selection:bg-[#7a0016] selection:text-white font-sans pb-32">
      <Header className="!sticky !top-0 bg-[#050505]/95 backdrop-blur-xl border-b border-white/5 z-50 print:hidden" />
      <main className="max-w-7xl mx-auto px-6 md:px-12 pt-12 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 print:hidden">
        
        {/* CHECKOUT FORM */}
        <div className="lg:col-span-7">
          <form id="checkout-form" onSubmit={handleSubmit} className="space-y-12">
            <section>
              <h2 className="text-xl font-serif text-white tracking-wide mb-6 flex items-center justify-between">
                <span>Contact Information</span><span className="text-white/30 text-[10px] font-sans tracking-[0.1em] uppercase">Step 1 of 3</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input required type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email Address *" className="w-full bg-[#111]/80 backdrop-blur-sm border border-white/10 p-4 text-white font-light text-sm outline-none focus:border-[#c4a484] transition-colors placeholder:text-white/30 rounded-sm" />
                <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number *" className="w-full bg-[#111]/80 backdrop-blur-sm border border-white/10 p-4 text-white font-light text-sm outline-none focus:border-[#c4a484] transition-colors placeholder:text-white/30 rounded-sm" />
              </div>
            </section>
            <section>
              <h2 className="text-xl font-serif text-white tracking-wide mb-6 flex items-center justify-between">
                <span>Shipping Address</span><span className="text-white/30 text-[10px] font-sans tracking-[0.1em] uppercase">Step 2 of 3</span>
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input required type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name *" className="w-full bg-[#111]/80 backdrop-blur-sm border border-white/10 p-4 text-white font-light text-sm outline-none focus:border-[#c4a484] transition-colors placeholder:text-white/30 rounded-sm" />
                  <input required type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name *" className="w-full bg-[#111]/80 backdrop-blur-sm border border-white/10 p-4 text-white font-light text-sm outline-none focus:border-[#c4a484] transition-colors placeholder:text-white/30 rounded-sm" />
                </div>
                <input required type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Street Address (e.g. House No, Street, Sector) *" className="w-full bg-[#111]/80 backdrop-blur-sm border border-white/10 p-4 text-white font-light text-sm outline-none focus:border-[#c4a484] transition-colors placeholder:text-white/30 rounded-sm" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input required type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City *" className="w-full bg-[#111]/80 backdrop-blur-sm border border-white/10 p-4 text-white font-light text-sm outline-none focus:border-[#c4a484] transition-colors placeholder:text-white/30 rounded-sm" />
                  <input type="text" name="postalCode" value={formData.postalCode} onChange={handleChange} placeholder="Postal Code (Optional)" className="w-full bg-[#111]/80 backdrop-blur-sm border border-white/10 p-4 text-white font-light text-sm outline-none focus:border-[#c4a484] transition-colors placeholder:text-white/30 rounded-sm" />
                </div>
              </div>
            </section>
            <section>
              <h2 className="text-xl font-serif text-white tracking-wide mb-6 flex items-center justify-between">
                <span>Payment Method</span><span className="text-white/30 text-[10px] font-sans tracking-[0.1em] uppercase">Step 3 of 3</span>
              </h2>
              <div className="space-y-4">
                <div className="border border-[#c4a484] bg-[#c4a484]/5 backdrop-blur-sm p-5 flex items-center justify-between rounded-sm">
                  <div className="flex items-center gap-4">
                    <div className="w-5 h-5 rounded-full border border-[#c4a484] flex items-center justify-center"><div className="w-2.5 h-2.5 rounded-full bg-[#c4a484]"></div></div>
                    <div><span className="text-white text-sm block mb-1">Cash on Delivery (COD)</span><span className="text-white/40 text-[10px] block">Pay directly to the courier upon arrival.</span></div>
                  </div>
                </div>
              </div>
            </section>
          </form>
        </div>

        {/* ORDER SUMMARY */}
        <div className="lg:col-span-5">
          <div className="bg-[#111]/80 backdrop-blur-xl border border-white/5 p-8 h-fit lg:sticky lg:top-24 shadow-2xl">
            <h2 className="text-xl font-serif text-white tracking-wide mb-6">Order Summary</h2>
            <div className="divide-y divide-white/5 mb-8 max-h-[40vh] overflow-y-auto pr-2 scrollbar-hide">
              {cartItems.map((item) => (
                <div key={item.id} className="py-4 flex gap-4 items-center group">
                  <div className="w-16 h-20 bg-[#050505] border border-white/5 flex-shrink-0 relative">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                    <span className="absolute -top-2 -right-2 bg-[#7a0016] text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full shadow-lg">{item.quantity}</span>
                  </div>
                  <div className="flex-grow"><h4 className="text-white text-sm tracking-wide mb-1">{item.name}</h4><p className="text-white/40 text-[10px] uppercase tracking-[0.1em]">{item.color}</p></div>
                  <div className="text-white/80 font-light text-sm whitespace-nowrap">Rs. {(parsePrice(String(item.price)) * item.quantity).toLocaleString('en-PK')}</div>
                </div>
              ))}
            </div>
            <div className="space-y-4 border-t border-white/10 pt-6 mb-8 text-sm font-light">
              <div className="flex justify-between text-white/60"><span>Subtotal</span><span>Rs. {subtotal.toLocaleString('en-PK')}</span></div>
              <div className="flex justify-between text-white/60"><span>Shipping</span><span>Rs. {shipping.toLocaleString('en-PK')}</span></div>
              <div className="flex justify-between text-white text-xl font-serif pt-4 border-t border-white/5 mt-4"><span>Total</span><span className="text-[#c4a484]">Rs. {totalAmount.toLocaleString('en-PK')}</span></div>
            </div>
            <button type="submit" form="checkout-form" disabled={isSubmitting} className="w-full bg-[#7a0016] disabled:bg-[#7a0016]/50 text-white py-5 text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-[#9a1026] transition-colors shadow-lg shadow-[#7a0016]/20 mb-6 flex items-center justify-center gap-3">
              {isSubmitting ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : `Secure Order — Rs. ${totalAmount.toLocaleString('en-PK')}`}
            </button>
          </div>
        </div>
      </main>
      <style dangerouslySetInnerHTML={{__html: `.hide-scrollbar::-webkit-scrollbar { display: none; } .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`}} />
    </div>
  );
}