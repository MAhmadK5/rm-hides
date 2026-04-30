import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="relative w-full bg-[#020000] pt-32 pb-10 border-t-2 border-[#7a0016] overflow-hidden">
      
      {/* =========================================
          AMBIENT LIGHT ENGINES
          ========================================= */}
      <div className="absolute -top-[50%] -left-[10%] w-[60vw] h-[60vw] bg-[#7a0016]/20 rounded-full blur-[150px] mix-blend-screen pointer-events-none z-0"></div>
      <div className="absolute top-[20%] -right-[10%] w-[50vw] h-[50vw] bg-[#c4a484]/10 rounded-full blur-[150px] mix-blend-screen pointer-events-none z-0"></div>

      {/* Massive Red Background Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-serif font-black text-[#7a0016]/5 whitespace-nowrap pointer-events-none tracking-widest z-0">
        R&M HIDES
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Top: Newsletter */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mb-24">
          <div>
            <h2 className="text-3xl md:text-5xl font-serif text-[#fdfcf9] tracking-wide mb-4">
              Join the <span className="italic font-light text-[#7a0016]">Inner Circle.</span>
            </h2>
            <p className="text-white/50 text-sm font-light">Exclusive access to limited releases and insider-only pricing.</p>
          </div>
          <div className="w-full md:w-[400px] flex items-center border-b border-[#7a0016]/50 pb-2 focus-within:border-[#7a0016] transition-colors duration-300 group">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="bg-transparent w-full text-white text-sm outline-none placeholder:text-white/30"
            />
            <button className="text-[#7a0016] text-[10px] uppercase tracking-[0.2em] font-bold hover:text-[#9a1026] transition-colors group-hover:translate-x-1 duration-300">
              Subscribe
            </button>
          </div>
        </div>

        {/* Middle: Links, Contact & Social Icons */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 mb-24 text-sm font-light text-white/50">
          
          <div className="flex flex-col gap-4">
            <span className="text-white font-serif uppercase tracking-[0.2em] text-[10px] mb-2">Shop</span>
            <Link href="/collection" className="hover:text-[#7a0016] transition-colors">All Collection</Link>
            <Link href="/collection" className="hover:text-[#7a0016] transition-colors">Bi-Fold</Link>
            <Link href="/collection" className="hover:text-[#7a0016] transition-colors">Long Wallet</Link>
            <Link href="/collection" className="hover:text-[#7a0016] transition-colors">Minimal</Link>
            <Link href="/collection" className="hover:text-[#7a0016] transition-colors">Leather Belts</Link>
          </div>
          
          <div className="flex flex-col gap-4">
            <span className="text-white font-serif uppercase tracking-[0.2em] text-[10px] mb-2">Explore</span>
            <Link href="/bulk-orders" className="hover:text-[#7a0016] transition-colors">Bulk Orders</Link>
            <Link href="/track-order" className="hover:text-[#7a0016] transition-colors">Track Order</Link>
            <Link href="#" className="hover:text-[#7a0016] transition-colors">The Craft</Link>
          </div>
          
          <div className="flex flex-col gap-4">
            <span className="text-white font-serif uppercase tracking-[0.2em] text-[10px] mb-2">Support</span>
            <Link href="/contact" className="hover:text-[#7a0016] transition-colors">Contact Us</Link>
            <Link href="/shipping" className="hover:text-[#7a0016] transition-colors">Shipping & Returns</Link>
            <Link href="/warranty" className="hover:text-[#7a0016] transition-colors">Lifetime Warranty</Link>
          </div>

          {/* Dedicated Contact Section */}
          <div className="flex flex-col gap-3">
            <span className="text-white font-serif uppercase tracking-[0.2em] text-[10px] mb-2">Contact</span>
            <a href="mailto:shop.rmhides@gmail.com" className="hover:text-[#7a0016] transition-colors text-xs">
              shop.rmhides@gmail.com
            </a>
            
            <div className="flex flex-col gap-1 mt-2">
              <span className="text-[9px] uppercase tracking-widest text-white/30">WhatsApp</span>
              <a href="https://wa.me/923184878315" target="_blank" rel="noopener noreferrer" className="hover:text-[#7a0016] transition-colors text-xs">
                +92 318 487 8315
              </a>
              <a href="https://wa.me/923304321281" target="_blank" rel="noopener noreferrer" className="hover:text-[#7a0016] transition-colors text-xs">
                +92 330 4321281
              </a>
            </div>

            <div className="flex flex-col gap-1 mt-2">
              <span className="text-[9px] uppercase tracking-widest text-white/30">SMS Support</span>
              <a href="sms:+923184878315" className="hover:text-[#7a0016] transition-colors text-xs">
                +92 318 487 8315
              </a>
              <a href="sms:+923304321281" className="hover:text-[#7a0016] transition-colors text-xs">
                +92 330 4321281
              </a>
            </div>
          </div>
          
          {/* Social Icons Section */}
          <div className="flex flex-col gap-5">
            <span className="text-white font-serif uppercase tracking-[0.2em] text-[10px] mb-1">Social</span>
            <div className="flex items-center gap-5">
              <a href="https://www.instagram.com/rmhides/" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-[#7a0016] transition-colors" aria-label="Instagram">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="#" className="text-white/50 hover:text-[#7a0016] transition-colors" aria-label="Facebook">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
              </a>
              <a href="https://www.pinterest.com/rmhides/" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-[#7a0016] transition-colors" aria-label="Pinterest">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12.017 0c-6.627 0-12 5.373-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.951-7.252 4.184 0 7.426 2.981 7.426 6.963 0 4.156-2.619 7.498-6.257 7.498-1.221 0-2.368-.634-2.76-1.385l-.752 2.872c-.272 1.042-1.011 2.345-1.506 3.14 1.205.371 2.493.57 3.823.57 6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12z"/></svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom: Copyright & Developer Tag */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-[#7a0016]/30 text-[10px] uppercase tracking-[0.2em] text-white/40 gap-6">
          <p className="order-2 md:order-1">© {new Date().getFullYear()} R&M HIDES. All Rights Reserved.</p>
          <div className="flex items-center gap-4 order-1 md:order-2">
            <span className="font-semibold text-white/60">Developed by Ahmad Khalid</span>
            <div className="flex gap-3">
              <a href="https://www.linkedin.com/in/m-ahmad-khalid-bb0514377/" target="_blank" rel="noopener noreferrer" className="hover:text-[#7a0016] transition-colors" aria-label="LinkedIn">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a href="https://github.com/MAhmadK5" target="_blank" rel="noopener noreferrer" className="hover:text-[#7a0016] transition-colors" aria-label="GitHub">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>
            </div>
          </div>
          
          {/* NEW LEGAL LINKS HERE */}
          <div className="flex gap-6 order-3">
            <Link href="/terms" className="hover:text-[#7a0016] transition-colors">Terms</Link>
            <Link href="/privacy" className="hover:text-[#7a0016] transition-colors">Privacy</Link>
          </div>

        </div>
      </div>
    </footer>
  );
}