// app/Header.tsx
"use client";

import { useState } from "react";
import { useCart } from "./CartContext";
import { useRouter } from "next/navigation";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { cart, clearCart, totalPrice } = useCart(); // 👈 беремо дані з глобального контексту
  const router = useRouter();

  return (
    <header className="max-w-6xl mx-auto bg-white p-4 rounded-xl shadow-md mb-8 flex justify-between items-center relative">
      <h1 className="text-2xl font-bold text-black cursor-pointer" onClick={() => window.location.href = '/'}>
        ⚡ ElectroShop
      </h1>

      <div className="relative"> 
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg font-semibold hover:bg-blue-200 transition"
        >
          🛒 Кошик ({cart.length})
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-xl shadow-xl p-4 z-50">
            <h3 className="font-bold text-black mb-2">Твій кошик</h3>
            
            {cart.length === 0 ? (
              <p className="text-gray-500 text-black">Кошик порожній 🙈</p>
            ) : (
              <div>
                <div className="max-h-60 overflow-y-auto mb-4">
                  {cart.map((item, index) => (
                    <div key={index} className="flex justify-between text-black py-1 border-b">
                      <span>{item.name}</span>
                      <span className="font-semibold text-green-600">{item.price} ₴</span>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-2 flex justify-between items-center mb-4 text-black">
                  <span className="font-bold text-black">Разом:</span>
                  <span className="font-bold text-green-600">{totalPrice} ₴</span>
                </div>

                <button 
                  onClick={clearCart}
                  className="w-full bg-red-100 text-red-600 py-2 rounded-lg text-sm font-medium hover:bg-red-200 transition"
                >
                  Очистити кошик
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}