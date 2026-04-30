"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Header from '@/components/Header';

export default function BulkOrdersPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', company: '', product_interest: 'The Executive Bifold', quantity: '', message: ''
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { error } = await supabase.from('bulk_inquiries').insert([{
      name: formData.name, email: formData.email, phone: formData.phone, company: formData.company,
      product_interest: formData.product_interest, quantity: parseInt(formData.quantity) || 0, message: formData.message
    }]);

    setIsSubmitting(false);

    if (error) {
      console.error("Error:", error);
      alert("System anomaly. Please try again.");
    } else {
      setIsSuccess(true);
    }
  };

  return (
    <div className="relative min-h-screen bg-transparent selection:bg-[#c4a484] selection:text-black font-sans overflow-hidden">
      
      {/* GLOBAL HEADER */}
      <Header className="!absolute !top-0 bg-transparent z-50" />

      {/* =========================================
          EXTREME AMBIENT LIGHTING ENGINES
          ========================================= */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden mix-blend-screen">
        <div className={`absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] bg-[#7a0016]/10 rounded-full blur-[150px] transition-transform duration-[10s] ${isMounted ? 'scale-100 translate-x-0' : 'scale-50 -translate-x-20'}`}></div>
        <div className={`absolute top-[40%] -right-[20%] w-[60vw] h-[60vw] bg-[#c4a484]/5 rounded-full blur-[150px] transition-transform duration-[15s] delay-500 ${isMounted ? 'scale-100 translate-y-0' : 'scale-50 translate-y-32'}`}></div>
      </div>

      <main className="relative z-10 flex flex-col items-center">
        
        {/* =========================================
            CINEMATIC HERO
            ========================================= */}
        <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center pt-32 px-6">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[18vw] font-serif font-black text-white/[0.02] whitespace-nowrap pointer-events-none tracking-tighter select-none">
            BESPOKE
          </div>
          
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="flex items-center gap-4 mb-8 overflow-hidden">
              <span className="w-12 h-[1px] bg-[#c4a484] animate-pulse"></span>
              <span className="text-[#c4a484] uppercase tracking-[0.5em] text-[10px] font-bold">The Atelier Studio</span>
              <span className="w-12 h-[1px] bg-[#c4a484] animate-pulse"></span>
            </div>
            
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif text-[#fdfcf9] tracking-tighter leading-[0.85] mb-8 mix-blend-difference drop-shadow-2xl">
              CRAFTED <br/> 
              <span className="italic font-light text-[#c4a484] pr-4">for scale.</span>
            </h1>
            
            <p className="text-white/60 font-light text-sm md:text-lg leading-relaxed max-w-2xl mx-auto backdrop-blur-sm bg-black/10 p-6 border border-white/5 shadow-2xl">
              Elevate your corporate gifting and wholesale inventory with unparalleled Sialkot craftsmanship. Fully bespoke. Entirely yours.
            </p>
          </div>
        </section>

        {/* =========================================
            MAGAZINE EDITORIAL SPREAD
            ========================================= */}
        <section className="w-full max-w-[1600px] mx-auto px-6 md:px-12 py-32 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Massive Overlapping Image */}
            <div className="lg:col-span-7 relative group h-[60vh] md:h-[80vh] w-full">
              <div className="absolute inset-0 bg-[#050505] border border-white/10 z-0 transform group-hover:-translate-x-4 group-hover:translate-y-4 transition-transform duration-1000 ease-out"></div>
              <img 
                src="/leather.png" 
                alt="Raw Full Grain Leather" 
                className="absolute inset-0 w-full h-full object-cover z-10 shadow-2xl grayscale group-hover:grayscale-0 transition-all duration-[2000ms]" 
              />
              <div className="absolute inset-0 bg-[#050505]/40 mix-blend-multiply z-20"></div>
              
              {/* Floating Stat Box */}
              <div className="absolute bottom-10 -right-10 md:right-10 z-30 bg-[#111]/90 backdrop-blur-xl border border-white/10 p-8 shadow-2xl hidden md:block group-hover:translate-y-[-10px] transition-transform duration-1000">
                <span className="text-4xl font-serif text-[#c4a484] block mb-2">100%</span>
                <span className="text-[9px] uppercase tracking-[0.3em] text-white/50">Full Grain Guarantee</span>
              </div>
            </div>

            {/* Typography Section */}
            <div className="lg:col-span-5 relative z-30 lg:-ml-20 mt-10 lg:mt-0">
              <div className="bg-[#050505]/80 backdrop-blur-3xl border border-white/5 p-10 md:p-16 shadow-[0_30px_60px_rgba(0,0,0,0.8)]">
                <h2 className="text-4xl md:text-6xl font-serif text-white tracking-wide mb-8 leading-tight">
                  No Limits. <br/>
                  <span className="italic font-light text-[#7a0016]">No Compromise.</span>
                </h2>
                <div className="space-y-6 text-white/50 font-light text-sm leading-loose">
                  <p>
                    Because we source our own full-grain hides and manage our Sialkot artisans directly, R&M Hides transcends our signature catalog.
                  </p>
                  <p className="text-white border-l-2 border-[#c4a484] pl-4">
                    Bespoke leather menus for luxury dining, custom tech sleeves for corporate executives, or proprietary product lines. 
                  </p>
                  <p>
                    If you can conceptualize it, our masters can pattern, cut, and stitch it into reality.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* =========================================
            EXTREME MINIMALIST FORM
            ========================================= */}
        <section className="w-full max-w-5xl mx-auto px-6 md:px-12 py-32 mb-32 relative">
          
          <div className="text-center mb-16">
            <h3 className="text-3xl font-serif text-white tracking-widest uppercase mb-4">Initialize Order</h3>
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#c4a484]">MOQ: 10 Units ✦ Direct Factory Access</p>
          </div>

          <div className="bg-transparent relative">
            {isSuccess ? (
              <div className="text-center py-32 flex flex-col items-center bg-[#0a0a0a]/50 backdrop-blur-xl border border-white/5">
                <div className="w-32 h-32 rounded-full border border-[#c4a484]/30 flex items-center justify-center mb-8 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-[#c4a484]/10 group-hover:bg-[#c4a484]/20 transition-colors"></div>
                  <span className="text-[#c4a484] text-5xl">✓</span>
                </div>
                <h3 className="text-4xl font-serif text-white mb-4 tracking-wide">Signal Received</h3>
                <p className="text-white/50 font-light max-w-md leading-relaxed text-lg">
                  {formData.name}, your specifications are with our master artisans. Expect contact within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-12">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
                  
                  {/* Invisible Line Inputs */}
                  {[
                    { label: 'Architect Name *', name: 'name', type: 'text', req: true },
                    { label: 'Secure Email *', name: 'email', type: 'email', req: true },
                    { label: 'Direct Line', name: 'phone', type: 'tel', req: false },
                    { label: 'Organization', name: 'company', type: 'text', req: false },
                  ].map((field) => (
                    <div key={field.name} className="relative group">
                      <input 
                        required={field.req} type={field.type} name={field.name} value={(formData as any)[field.name]} onChange={handleChange} 
                        className="w-full bg-transparent border-b border-white/20 py-4 text-white text-lg focus:outline-none focus:border-[#c4a484] transition-colors peer placeholder-transparent"
                        placeholder={field.label}
                      />
                      <label className="absolute left-0 top-4 text-white/30 text-sm tracking-widest uppercase pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-[9px] peer-focus:text-[#c4a484] peer-valid:-top-4 peer-valid:text-[9px] peer-valid:text-white/50">
                        {field.label}
                      </label>
                    </div>
                  ))}

                  {/* Custom Select */}
                  <div className="relative group">
                    <select 
                      name="product_interest" value={formData.product_interest} onChange={handleChange} 
                      className="w-full bg-transparent border-b border-white/20 py-4 text-white text-lg focus:outline-none focus:border-[#c4a484] transition-colors appearance-none cursor-pointer [&>option]:bg-[#050505] [&>option]:text-sm"
                    >
                      <option value="The Executive Bifold">The Executive Bifold</option>
                      <option value="Minimalist Cardholder">Minimalist Cardholder</option>
                      <option value="Passport Covers">Passport Covers</option>
                      <option value="Mixed Assortment">Mixed Assortment</option>
                      <option value="Custom Bespoke Design">Custom Bespoke Fabrication</option>
                    </select>
                    <label className="absolute left-0 -top-4 text-[9px] text-white/50 tracking-widest uppercase pointer-events-none">Blueprint Type</label>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-[#c4a484] text-xs">▼</div>
                  </div>

                  {/* Quantity */}
                  <div className="relative group">
                    <input 
                      required type="number" min="10" name="quantity" value={formData.quantity} onChange={handleChange} 
                      className="w-full bg-transparent border-b border-white/20 py-4 text-white text-lg focus:outline-none focus:border-[#c4a484] transition-colors peer placeholder-transparent"
                      placeholder="Units"
                    />
                    <label className="absolute left-0 top-4 text-white/30 text-sm tracking-widest uppercase pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-[9px] peer-focus:text-[#c4a484] peer-valid:-top-4 peer-valid:text-[9px] peer-valid:text-white/50">
                      Units Required (Min 10) *
                    </label>
                  </div>
                </div>

                {/* Message Textarea */}
                <div className="relative group pt-6">
                  <textarea 
                    rows={4} name="message" value={formData.message} onChange={handleChange} 
                    className="w-full bg-transparent border-b border-white/20 py-4 text-white text-lg focus:outline-none focus:border-[#c4a484] transition-colors peer placeholder-transparent resize-none"
                    placeholder="Details"
                  ></textarea>
                  <label className="absolute left-0 top-4 text-white/30 text-sm tracking-widest uppercase pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-[9px] peer-focus:text-[#c4a484] peer-valid:-top-4 peer-valid:text-[9px] peer-valid:text-white/50">
                    Project Specifications / Embossing Details
                  </label>
                </div>

                <div className="flex justify-end pt-8">
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="relative overflow-hidden group bg-[#111] border border-[#c4a484]/30 text-white px-16 py-6 text-[10px] uppercase tracking-[0.4em] font-bold hover:border-[#c4a484] transition-all duration-500 disabled:opacity-50"
                  >
                    <span className="relative z-10 flex items-center gap-4">
                      {isSubmitting ? 'Transmitting...' : 'Initiate Fabrication ➔'}
                    </span>
                    <div className="absolute inset-0 bg-[#c4a484] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] z-0"></div>
                    <span className="absolute inset-0 flex items-center justify-center text-black z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      Initiate Fabrication ➔
                    </span>
                  </button>
                </div>

              </form>
            )}
          </div>
        </section>
      </main>
      
    </div>
  );
}