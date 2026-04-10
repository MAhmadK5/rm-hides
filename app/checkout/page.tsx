"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/lib/store';
import { supabase } from '@/lib/supabase';

export default function CheckoutPage() {
  const router = useRouter();
  
  // --- GLOBAL CART ---
  const cartItems = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);

  // --- STATE ---
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
  });

  // --- CALCULATE TOTALS ---
  const parsePrice = (priceStr: string) => {
    if (!priceStr) return 0;
    const rawNumber = priceStr.replace(/\D/g, ""); 
    return parseInt(rawNumber, 10) || 0;
  };

  const subtotal = cartItems.reduce((total, item) => total + (parsePrice(item.price) * item.quantity), 0);
  const shipping = subtotal > 0 ? 250 : 0; 
  const totalAmount = subtotal + shipping;

  // Redirect to home if cart is empty and not on success page
  useEffect(() => {
    if (cartItems.length === 0 && !isSuccess) {
      router.push('/collection');
    }
  }, [cartItems, isSuccess, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { error } = await supabase
      .from('orders')
      .insert([
        {
          customer_name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          postal_code: formData.postalCode,
          total_amount: totalAmount,
          items: cartItems,
          status: 'pending'
        }
      ]);

    setIsSubmitting(false);

    if (error) {
      console.error("Error submitting order:", error);
      alert("There was an issue processing your order. Please try again.");
    } else {
      setIsSuccess(true);
      clearCart();
    }
  };

  // --- SUCCESS SCREEN ---
  if (isSuccess) {
    return (
      <div className="bg-[#050505] min-h-screen flex flex-col items-center justify-center text-center px-6 selection:bg-[#7a0016] selection:text-white font-sans relative overflow-hidden">
        {/* Subtle Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#c4a484]/5 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-20 h-20 border border-[#c4a484] rounded-full flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(196,164,132,0.15)]">
            <span className="text-[#c4a484] text-3xl">✓</span>
          </div>
          <span className="text-[#7a0016] uppercase tracking-[0.4em] text-[10px] font-bold mb-4 block">Order Secured</span>
          <h1 className="text-4xl md:text-5xl font-serif text-[#fdfcf9] tracking-wide mb-6">
            Thank you, {formData.firstName}.
          </h1>
          <p className="text-white/60 font-light max-w-md mx-auto mb-10 leading-relaxed">
            Your handcrafted leather pieces are being prepared in Sialkot. We have sent a confirmation email to <strong className="text-white font-medium">{formData.email}</strong> with your order details.
          </p>
          <Link 
            href="/collection" 
            className="bg-transparent border border-white/20 text-white px-10 py-4 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-white hover:text-black transition-all duration-500"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) return null; 

  return (
    <div className="bg-[#050505] min-h-screen selection:bg-[#7a0016] selection:text-white font-sans pb-32">
      
      {/* HEADER */}
      <header className="flex items-center justify-between px-6 md:px-12 py-6 border-b border-white/5 bg-[#050505] sticky top-0 z-50">
        <Link href="/" className="bg-[#7a0016] text-white font-serif tracking-[0.2em] text-sm md:text-lg px-4 py-1.5 shadow-lg border border-[#9a1026]/50 hover:bg-[#5a0010] transition-colors">
          R&M HIDES
        </Link>
        <Link href="/collection" className="text-white/50 hover:text-white text-[10px] uppercase tracking-[0.2em] transition-colors">
          Return to Cart
        </Link>
      </header>

      <main className="max-w-7xl mx-auto px-6 md:px-12 pt-12 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
        
        {/* LEFT: CHECKOUT FORM (Spans 7 columns on large screens) */}
        <div className="lg:col-span-7">
          <form id="checkout-form" onSubmit={handleSubmit} className="space-y-12">
            
            {/* 1. Contact Information */}
            <section>
              <h2 className="text-xl font-serif text-white tracking-wide mb-6 flex items-center justify-between">
                <span>Contact Information</span>
                <span className="text-white/30 text-[10px] font-sans tracking-[0.1em] uppercase">Step 1 of 3</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input required type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email Address *" className="w-full bg-[#111] border border-white/10 p-4 text-white font-light text-sm focus:outline-none focus:border-[#c4a484] transition-colors placeholder:text-white/30 rounded-sm" />
                <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number *" className="w-full bg-[#111] border border-white/10 p-4 text-white font-light text-sm focus:outline-none focus:border-[#c4a484] transition-colors placeholder:text-white/30 rounded-sm" />
              </div>
            </section>

            {/* 2. Shipping Address */}
            <section>
              <h2 className="text-xl font-serif text-white tracking-wide mb-6 flex items-center justify-between">
                <span>Shipping Address</span>
                <span className="text-white/30 text-[10px] font-sans tracking-[0.1em] uppercase">Step 2 of 3</span>
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input required type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name *" className="w-full bg-[#111] border border-white/10 p-4 text-white font-light text-sm focus:outline-none focus:border-[#c4a484] transition-colors placeholder:text-white/30 rounded-sm" />
                  <input required type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name *" className="w-full bg-[#111] border border-white/10 p-4 text-white font-light text-sm focus:outline-none focus:border-[#c4a484] transition-colors placeholder:text-white/30 rounded-sm" />
                </div>
                <input required type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Street Address (e.g. House No, Street, Sector) *" className="w-full bg-[#111] border border-white/10 p-4 text-white font-light text-sm focus:outline-none focus:border-[#c4a484] transition-colors placeholder:text-white/30 rounded-sm" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input required type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City *" className="w-full bg-[#111] border border-white/10 p-4 text-white font-light text-sm focus:outline-none focus:border-[#c4a484] transition-colors placeholder:text-white/30 rounded-sm" />
                  <input type="text" name="postalCode" value={formData.postalCode} onChange={handleChange} placeholder="Postal Code (Optional)" className="w-full bg-[#111] border border-white/10 p-4 text-white font-light text-sm focus:outline-none focus:border-[#c4a484] transition-colors placeholder:text-white/30 rounded-sm" />
                </div>
              </div>
            </section>

            {/* 3. Payment Method */}
            <section>
              <h2 className="text-xl font-serif text-white tracking-wide mb-6 flex items-center justify-between">
                <span>Payment Method</span>
                <span className="text-white/30 text-[10px] font-sans tracking-[0.1em] uppercase">Step 3 of 3</span>
              </h2>
              
              <div className="space-y-4">
                {/* Cash on Delivery (Active) */}
                <div 
                  onClick={() => setPaymentMethod('cod')}
                  className={`border p-5 flex items-center justify-between cursor-pointer rounded-sm transition-all duration-300 ${
                    paymentMethod === 'cod' ? 'border-[#c4a484] bg-[#c4a484]/5' : 'border-white/10 bg-[#111]'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${paymentMethod === 'cod' ? 'border-[#c4a484]' : 'border-white/30'}`}>
                      {paymentMethod === 'cod' && <div className="w-2.5 h-2.5 rounded-full bg-[#c4a484]"></div>}
                    </div>
                    <div>
                      <span className="text-white text-sm block mb-1">Cash on Delivery (COD)</span>
                      <span className="text-white/40 text-[10px] block">Pay directly to the courier upon arrival.</span>
                    </div>
                  </div>
                </div>

                {/* Credit / Debit Card (Disabled / Coming Soon) */}
                <div className="border border-white/5 bg-[#0a0a0a] p-5 flex items-center justify-between opacity-60 cursor-not-allowed rounded-sm">
                  <div className="flex items-center gap-4">
                    <div className="w-5 h-5 rounded-full border border-white/20 flex items-center justify-center"></div>
                    <div>
                      <span className="text-white text-sm block mb-1 flex items-center gap-3">
                        Credit / Debit Card
                        <span className="bg-[#7a0016]/20 text-[#ff4d4d] border border-[#7a0016]/30 text-[8px] uppercase tracking-[0.2em] px-2 py-0.5 rounded-sm">Coming Soon</span>
                      </span>
                      <span className="text-white/40 text-[10px] block">Visa, Mastercard, & UnionPay processing.</span>
                    </div>
                  </div>
                  {/* Subtle Card Icons */}
                  <div className="hidden sm:flex gap-2 opacity-50">
                    <div className="w-8 h-5 bg-white/10 rounded-sm"></div>
                    <div className="w-8 h-5 bg-white/10 rounded-sm"></div>
                  </div>
                </div>
              </div>
            </section>

          </form>
        </div>

        {/* RIGHT: ORDER SUMMARY (Spans 5 columns on large screens) */}
        <div className="lg:col-span-5">
          <div className="bg-[#111] border border-white/5 p-8 h-fit lg:sticky lg:top-24 shadow-2xl">
            <h2 className="text-xl font-serif text-white tracking-wide mb-6">Order Summary</h2>
            
            {/* Item List */}
            <div className="divide-y divide-white/5 mb-8 max-h-[40vh] overflow-y-auto pr-2 scrollbar-hide">
              {cartItems.map((item) => (
                <div key={item.id} className="py-4 flex gap-4 items-center group">
                  <div className="w-16 h-20 bg-[#050505] border border-white/5 flex-shrink-0 relative">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                    <span className="absolute -top-2 -right-2 bg-[#7a0016] text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full shadow-lg">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-white text-sm tracking-wide mb-1">{item.name}</h4>
                    <p className="text-white/40 text-[10px] uppercase tracking-[0.1em]">{item.color}</p>
                  </div>
                  <div className="text-white/80 font-light text-sm whitespace-nowrap">
                    {item.price}
                  </div>
                </div>
              ))}
            </div>

            {/* Discount Code */}
            <div className="flex gap-2 mb-8">
              <input 
                type="text" 
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Discount code" 
                className="w-full bg-transparent border border-white/20 p-3 text-white font-light text-sm focus:outline-none focus:border-[#c4a484] transition-colors placeholder:text-white/30 rounded-sm"
              />
              <button 
                type="button"
                className="px-6 bg-white/5 text-white/50 text-[10px] uppercase tracking-widest font-bold border border-white/10 hover:bg-white/10 hover:text-white transition-all rounded-sm"
              >
                Apply
              </button>
            </div>

            {/* Totals */}
            <div className="space-y-4 border-t border-white/10 pt-6 mb-8 text-sm font-light">
              <div className="flex justify-between text-white/60">
                <span>Subtotal</span>
                <span>Rs. {subtotal.toLocaleString('en-PK')}</span>
              </div>
              <div className="flex justify-between text-white/60">
                <span>Shipping</span>
                <span>Rs. {shipping.toLocaleString('en-PK')}</span>
              </div>
              <div className="flex justify-between text-white text-xl font-serif pt-4 border-t border-white/5 mt-4">
                <span>Total</span>
                <span className="text-[#c4a484]">Rs. {totalAmount.toLocaleString('en-PK')}</span>
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              form="checkout-form"
              disabled={isSubmitting}
              className="w-full bg-[#7a0016] disabled:bg-[#7a0016]/50 text-white py-5 text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-[#9a1026] transition-colors shadow-lg shadow-[#7a0016]/20 mb-6 flex items-center justify-center gap-3"
            >
              {isSubmitting ? 'Processing...' : `Pay Rs. ${totalAmount.toLocaleString('en-PK')}`}
            </button>

            {/* Trust Signal */}
            <div className="flex items-center justify-center gap-2 text-white/30 text-[10px] font-sans tracking-widest uppercase">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
              Secure 256-bit Encrypted Checkout
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}