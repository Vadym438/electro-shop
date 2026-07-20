// app/product/[id]/BuyButton.tsx
"use client";

import { useCart } from "./CartContext";

interface BuyButtonProps {
  productName: string;
  productPrice: number; // Додано для передачі ціни товару
}

export default function BuyButton({
  productName,
  productPrice,
}: BuyButtonProps) {
  const { addToCart } = useCart();
  return (
    <button
      onClick={() => {
        addToCart({ name: productName, price: productPrice });
      }}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition mt-4"
    >
      Купити
    </button>
  );
}
