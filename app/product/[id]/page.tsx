// app/product/[id]/page.tsx
import { MOCK_PRODUCTS } from "../../../products"; // перевірь шлях, якщо продукти в корені
import BuyButton from "../../BuyButton";
import Header from "@/app/Header"; // або "../../Header" залежно від структури папок
import { useCart } from "@/app/CartContext";


interface ProductPageProps {
  params: {
    id: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  // 1. Твоє завдання: Використай метод масиву (наприклад, .find()), 
  // щоб знайти товар, у якого product.id збігається з params.id.
    const resParams = await params;

    const product = MOCK_PRODUCTS.find((p) => p.id === resParams.id);


  // 2. Обов'язкова перевірка: якщо товар не знайдено (product === undefined)
  if (!product) {
    return <main className="p-8">Товар не знайдено!</main>;
  }

  // 3. Твоє завдання: Напиши вигляд (JSX) для цієї сторінки.
  // Виведи тут назву, опис, велику картинку і ціну.
  // Використовуй класи Tailwind (наприклад, text-2xl, font-bold і тд) для краси.
  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <Header />
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-128 object-cover rounded-lg mb-4"
        />
        <p className="text-gray-600 text-lg mb-4">{product.description}</p>
        <div className="text-2xl font-bold text-green-600">
          {product.price} ₴
        <BuyButton productName={product.name} productPrice={product.price}   />
        </div>
      </div>
    </main>
  );
}