"use client";

import React, { useState } from 'react';
import Link from 'next/link';

import { useCartStore } from '@/lib/store';
import { supabase } from '@/lib/supabase';

export default function BulkOrdersPage() {
  // --- GLOBAL CART (For the header) ---
  const toggleCart = useCartStore((state) => state.toggleCart);
  const cartItems = useCartStore((state) => state.items);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // --- FORM STATE ---
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    product_interest: 'The Executive Bifold',
    quantity: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Insert data into Supabase
    const { error } = await supabase
      .from('bulk_inquiries')
      .insert([
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          product_interest: formData.product_interest,
          quantity: parseInt(formData.quantity) || 0,
          message: formData.message
        }
      ]);

    setIsSubmitting(false);

    if (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong. Please try again.");
    } else {
      setIsSuccess(true);
    }
  };

  return (
  <div className="relative min-h-screen bg-transparent selection:bg-[#7a0016] selection:text-white font-sans overflow-hidden">
    {/* The rest of your homepage code... */}
      
      {/* HEADER */}
      <header className="sticky top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-12 py-6 bg-[#050505]/90 backdrop-blur-md border-b border-white/5">
        <Link href="/" className="bg-[#7a0016] text-white font-serif tracking-[0.2em] text-sm md:text-lg px-4 py-1.5 shadow-lg border border-[#9a1026]/50 hover:bg-[#5a0010] transition-colors duration-300">
          R&M HIDES
        </Link>
        <nav className="hidden md:flex gap-10 text-white/80 text-[10px] uppercase tracking-[0.3em] font-semibold items-center">
          <Link href="/collection" className="hover:text-[#c4a484] transition-colors duration-300">Collection</Link>
          <Link href="/our-story" className="hover:text-[#c4a484] transition-colors duration-300">Our Story</Link>
          <Link href="/bulk-orders" className="text-[#c4a484] transition-colors duration-300 border-b border-[#c4a484] pb-1">Bulk Orders</Link>
        </nav>
        <div className="flex items-center gap-6 text-white/80 text-[10px] uppercase tracking-[0.3em] font-semibold">
          <button onClick={toggleCart} className="hidden sm:block hover:text-[#c4a484] transition-colors duration-300">
            Cart ({cartCount})
          </button>
          <button className="hover:text-[#c4a484] transition-colors duration-300">Menu</button>
        </div>
      </header>

      {/* PAGE CONTENT */}
      <main className="pt-24 pb-32 px-6 md:px-12 max-w-5xl mx-auto">
        
        {/* HERO INTRO */}
        <div className="text-center mb-16">
          <span className="text-[#7a0016] uppercase tracking-[0.4em] text-[10px] font-bold mb-4 block">Corporate & Bespoke</span>
          <h1 className="text-4xl md:text-5xl font-serif text-[#fdfcf9] tracking-wide mb-6">
            Bulk <span className="italic font-light text-[#c4a484]">& Custom</span> Orders
          </h1>
          <p className="text-white/60 font-light text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
            From corporate milestones and groomsmen gifts to entirely custom product lines. We offer bespoke branding, tailored packaging, and custom fabrication for orders of 10 items or more.
          </p>
        </div>

        {/* CUSTOM FABRICATION HIGHLIGHT */}
        <div className="mb-16 bg-[#0a0a0a] border border-white/5 overflow-hidden flex flex-col md:flex-row shadow-2xl">
          <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center order-2 md:order-1">
            <span className="text-[#c4a484] uppercase tracking-[0.3em] text-[10px] font-bold mb-4 block flex items-center gap-2">
              <span className="w-4 h-[1px] bg-[#c4a484]"></span> The Atelier
            </span>
            <h2 className="text-3xl font-serif text-[#fdfcf9] tracking-wide mb-4">
              You design it. <br/>
              <span className="italic font-light text-[#7a0016]">We craft it.</span>
            </h2>
            <p className="text-white/60 font-light text-sm leading-loose">
              Beyond our signature collection, R&M Hides operates as a full-scale leather atelier. 
              Because we source our own full-grain hides and manage our artisans in Sialkot directly, <strong>we can craft virtually anything from leather on order.</strong>
            </p>
            <p className="text-white/60 font-light text-sm leading-loose mt-4">
              Whether you need bespoke leather menus for a luxury restaurant, custom tech sleeves for your corporate team, or an entirely new product concept—if you can dream it, we can pattern, cut, and stitch it.
            </p>
          </div>
          <div className="md:w-1/2 relative min-h-[300px] order-1 md:order-2">
            {/* Showcasing the raw leather fabric */}
            <img 
              src="/leather.png" 
              alt="Raw Full Grain Leather Fabric" 
              className="absolute inset-0 w-full h-full object-cover opacity-80 hover:opacity-100 hover:scale-105 transition-all duration-1000 grayscale hover:grayscale-0" 
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-transparent to-transparent md:block hidden"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent md:hidden block"></div>
          </div>
        </div>

        {/* FORM SECTION */}
        <div className="bg-[#0a0a0a] border border-white/5 p-8 md:p-12 shadow-2xl">
          {isSuccess ? (
            <div className="text-center py-16">
              <h3 className="text-2xl font-serif text-[#c4a484] mb-4">Inquiry Received</h3>
              <p className="text-white/60 font-light">
                Thank you for your interest, {formData.name}. Our wholesale and bespoke team will review your request and get back to you within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Name */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-white/50">Full Name *</label>
                  <input required type="text" name="name" value={formData.name} onChange={handleChange} className="bg-transparent border-b border-white/20 pb-2 text-white font-light focus:outline-none focus:border-[#c4a484] transition-colors" />
                </div>
                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-white/50">Email Address *</label>
                  <input required type="email" name="email" value={formData.email} onChange={handleChange} className="bg-transparent border-b border-white/20 pb-2 text-white font-light focus:outline-none focus:border-[#c4a484] transition-colors" />
                </div>
                {/* Phone */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-white/50">Phone Number</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="bg-transparent border-b border-white/20 pb-2 text-white font-light focus:outline-none focus:border-[#c4a484] transition-colors" />
                </div>
                {/* Company */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-white/50">Company Name</label>
                  <input type="text" name="company" value={formData.company} onChange={handleChange} className="bg-transparent border-b border-white/20 pb-2 text-white font-light focus:outline-none focus:border-[#c4a484] transition-colors" />
                </div>
                {/* Product Interest */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-white/50">Product Interest</label>
                  <select name="product_interest" value={formData.product_interest} onChange={handleChange} className="bg-transparent border-b border-white/20 pb-2 text-white font-light focus:outline-none focus:border-[#c4a484] transition-colors [&>option]:bg-[#050505]">
                    <option value="The Executive Bifold">The Executive Bifold</option>
                    <option value="Minimalist Cardholder">Minimalist Cardholder</option>
                    <option value="Passport Covers">Passport Covers</option>
                    <option value="Mixed Assortment">Mixed Assortment</option>
                    <option value="Custom Bespoke Design">Custom / Bespoke Fabrication</option> {/* NEW OPTION ADDED HERE */}
                  </select>
                </div>
                {/* Quantity */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-white/50">Estimated Quantity *</label>
                  <input required type="number" min="10" name="quantity" value={formData.quantity} onChange={handleChange} placeholder="Min. 10" className="bg-transparent border-b border-white/20 pb-2 text-white font-light focus:outline-none focus:border-[#c4a484] transition-colors" />
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-[0.2em] text-white/50">Additional Details (Custom Specs, Logos, Timeline, etc.)</label>
                <textarea rows={4} name="message" value={formData.message} onChange={handleChange} placeholder="If choosing Custom Fabrication, please briefly describe what you need crafted..." className="bg-transparent border-b border-white/20 pb-2 text-white font-light focus:outline-none focus:border-[#c4a484] transition-colors resize-none placeholder:text-white/20"></textarea>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-[#7a0016] disabled:bg-[#7a0016]/50 text-white py-5 text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-[#9a1026] transition-colors duration-300 shadow-lg shadow-[#7a0016]/20 mt-8"
              >
                {isSubmitting ? 'Sending Request...' : 'Submit Inquiry'}
              </button>
            </form>
          )}
        </div>
      </main>

     
    </div>
  );
}