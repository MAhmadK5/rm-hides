// lib/data.ts

export const products = [
  {
    slug: "the-executive-bifold",
    name: "The Executive Bifold",
    price: "Rs. 4,500",
    description: "Our signature piece. Crafted from premium full-grain leather, designed for the modern minimalist who still carries cash.",
    colors: ["Espresso Brown", "Midnight Black", "Oxblood Red"],
    images: ["/prod1.png", "/prod1-back.png"],
    inStock: true
  },
  {
    slug: "the-slim-cardholder",
    name: "The Slim Cardholder",
    price: "Rs. 2,500",
    description: "Ultra-thin profile for the essentials. Fits seamlessly into your front pocket without ruining the lines of your suit.",
    colors: ["Midnight Black", "Desert Tan"],
    images: ["/cardholder1.png", "/cardholder1-back.png"],
    inStock: true
  }
];

export function getProductBySlug(slug: string) {
  return products.find(product => product.slug === slug);
}