"use client";

// src/app/page.tsx
import { MOCK_PRODUCTS } from "../products"; // Імпортуємо нашу "шпаргалку" з товарами
import { useRouter } from "next/navigation";
import { useState,  useEffect } from "react";
import Header from "./Header";
import { useCart } from "./CartContext";

export default function Home() {
  // Тут (до return) ми зазвичай пишемо логіку на JS/TS (функції, фільтри тощо)
  const router = useRouter(); // 👈 створюємо інструмент для навігації
  const [cart, setCart] = useState<any[]>([]);
  

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
  const { addToCart } = useCart();
  
  const [isOpen, setIsOpen] = useState(false);
  const clearCart = () => {
  setCart([]);
  localStorage.removeItem("electro_cart"); // повністю видаляємо ключ зі сховища
  };

  return (
    // Все, що всередині return — це вигляд нашого сайту (HTML + стилі Tailwind)
    <main className="min-h-screen bg-gray-100 p-8">
      <Header />

            
{isOpen && (
  <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-xl shadow-xl p-4 z-50">
    <h3 className="font-bold text-black mb-2">Твій кошик</h3>
    
    {cart.length === 0 ? (
      <p className="text-gray-500 text-sm">Кошик порожній 🙈</p>
    ) : (
      <div>
        {/* Твоє завдання: пройдись мапити (.map) по масиву cart і виведи назву й ціну кожного доданого товару */}
        <div className="max-h-60 overflow-y-auto mb-4">
          {cart.map((item, index) => (
            <div key={index} className="flex justify-between text-black py-1 border-b">
              <span>{item.name}</span>
              <span className="font-semibold">{item.price} ₴</span>
            </div>
          ))}
        </div>

        <div >
          <span className="font-bold text-black">Разом:</span>
          <span className="font-bold text-green-600">{totalPrice} ₴</span>
        </div>

        {/* Кнопка очищення */}
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
   {/* Кінець контейнера кошика */}


      {/* Сітка для карток товарів (3 колонки на великому екрані) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        
        {/* Мапимо (перебираємо) наш масив товарів за допомогою стандартного .map() */}
        {MOCK_PRODUCTS.map((product) => (
          // Твоє завдання: додати <Link href={...}> навколо картки або всередині неї
          <div key={product.id} 
            onClick={() => router.push(`/product/${product.id}`)} // 👈 Клік по картці переводить на сторінку товару
            className="bg-white rounded-xl shadow-md p-5 flex flex-col justify-between cursor-pointer hover:shadow-lg transition">
           
            {<div key={product.id}>
            <div>
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                {product.category}
              </span>
              <h2 className="text-xl font-bold text-gray-800 mt-2">{product.name}</h2>
              <p className="text-gray-600 text-sm mt-1">{product.description}</p>
            </div>

            <div className="mt-4">
              <div className="text-2xl font-bold text-green-600 mb-3">
                {product.price} ₴
              </div>
              <button 
                onClick={(e) => {
                  e.stopPropagation()
                  addToCart(product)
                }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition"
              >
                Купити
              </button>
            </div>
            </div>}
        </div>
        ))}
      </div>
    </main>
  );
}