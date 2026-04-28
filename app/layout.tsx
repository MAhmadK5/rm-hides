import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CartDrawer from "@/components/CartDrawer"; 

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
      <body className={`${inter.className} bg-[#050505] text-white selection:bg-[#7a0016] selection:text-white relative`}>
        
        {/* =========================================
            GLOBAL: BULLETPROOF MOVING GRID
            ========================================= */}
        <div className="fixed inset-0 z-[-1] pointer-events-none bg-[#050505] overflow-hidden">
          {/* The Grid Canvas */}
          <div className="absolute inset-x-0 -top-[50px] h-[calc(100vh+50px)] bg-cyber-grid animate-cyber-grid w-full"></div>
          {/* The Vignette Fade */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_90%)]"></div>
        </div>

        {/* PAGE CONTENT */}
        <div className="relative z-10">
          {children}
        </div>

        {/* GLOBAL CART DRAWER */}
        <CartDrawer />
        
      </body>
    </html>
  );
}