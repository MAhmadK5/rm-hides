import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

import Footer from "./components/Footer";
const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter" 
});

const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  variable: "--font-playfair" 
});

export const metadata: Metadata = {
  title: "R&M Hide | Premium Leather Wallets Pakistan",
  description: "Handcrafted genuine leather wallets for the modern minimalist.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        {/* We can add a Global Announcement Bar here later */}
       
        {children}
        <Footer />
      </body>
    </html>
  );
}