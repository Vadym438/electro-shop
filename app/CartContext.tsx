// app/CartContext.tsx
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface CartContextType {
  cart: any[];
  addToCart: (product: any) => void;
  clearCart: () => void;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<any[]>([]);

  // Завантаження з LocalStorage при старті
  useEffect(() => {
    const savedCart = localStorage.getItem("electro_cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Збереження в LocalStorage при зміні
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("electro_cart", JSON.stringify(cart));
    }
  }, [cart]);

  const addToCart = (product: any) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("electro_cart");
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, clearCart, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

// Кастомний хук для зручного використання кошика в будь-якому компоненті
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}