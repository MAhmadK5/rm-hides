import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CartDrawer from "@/components/CartDrawer"; 
import Footer from "@/components/Footer"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "R&M Hides | Premium Leather",
  description: "Handcrafted full-grain leather goods.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#050505] text-white selection:bg-[#7a0016] selection:text-white relative min-h-screen flex flex-col`}>
        
        {/* =========================================
            GLOBAL: ULTIMATE CINEMATIC BACKGROUND
            ========================================= */}
        <div className="fixed inset-0 z-[-1] pointer-events-none bg-[#050505] overflow-hidden">
          
          {/* 1. Deep Red & Gold Ambient Light Engines */}
          <div className="absolute -top-[20%] -left-[10%] w-[60vw] h-[60vw] bg-[#7a0016]/15 rounded-full blur-[150px] mix-blend-screen"></div>
          <div className="absolute top-[60%] -right-[10%] w-[50vw] h-[50vw] bg-[#c4a484]/5 rounded-full blur-[150px] mix-blend-screen"></div>

          {/* 2. The Cyber Grid (Sliding over the lights) */}
          <div className="absolute inset-x-0 -top-[50px] h-[calc(100vh+50px)] bg-cyber-grid animate-cyber-grid w-full opacity-60"></div>

          {/* 3. The Massive Faded Watermark */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[18vw] font-serif font-black text-[#7a0016]/[0.04] whitespace-nowrap tracking-widest -rotate-12 select-none mix-blend-lighten">
            R&M HIDES
          </div>

          {/* 4. The Vignette Fade (Forces the edges to stay pitch black) */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_100%)]"></div>
        </div>

        {/* PAGE CONTENT */}
        <div className="relative z-10 flex-grow">
          {children}
        </div>

        {/* GLOBAL FOOTER */}
        <Footer />

        {/* GLOBAL CART DRAWER */}
        <CartDrawer />
        
      </body>
    </html>
  );
}