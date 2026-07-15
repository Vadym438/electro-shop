// app/product/[id]/page.tsx
import { MOCK_PRODUCTS } from "../../../products"; // перевірь шлях, якщо продукти в корені
import BuyButton from "../../BuyButton";
import Header from "@/app/Header"; // або "../../Header" залежно від структури папок
import { useCart } from "@/app/CartContext";
import { db } from "@/app/db";
import { redirect } from "next/navigation";


interface ProductPageProps {
  params: {
    id: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {

  // 1. Твоє завдання: Використай метод масиву (наприклад, .find()), 
  // щоб знайти товар, у якого product.id збігається з params.id.
  const resParams = await params;

  const products = await db.product.findMany(); // отримуємо всі продукти з бази даних

  const product = products.find((product) => product.id === Number(resParams.id));
      
  // 2. Обов'язкова перевірка: якщо товар не знайдено (product === undefined)
  if (!product) {
    return <main className="p-8">Товар не знайдено!</main>;
  }

  const productId = Number(resParams.id);

  async function deleteProductAction() {
    "use server" // Ця директива каже Next.js, що функція виконається тільки на сервері

    await db.product.delete({
      where: { id: productId },
    });

    // Після видалення перенаправляємо користувача на головну сторінку
    redirect("/");
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
          src={product.imageUrl || "/placeholder.png"} 
          alt={product.name} 
          className="w-full h-128 object-cover rounded-lg mb-4"
        />
        <p className="text-gray-600 text-lg mb-4">{product.description}</p>
        <div className="text-2xl font-bold text-green-600">
          {product.price} ₴
        <BuyButton productName={product.name} productPrice={product.price}   />
        </div>
      </div>
      {/* Форма, яка викликає серверну дію */}
      <form action={deleteProductAction} className="mt-8">
        <button
          type="submit"
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
        >
          Видалити товар (Server Action)
        </button>
      </form>
    </main>
  );
}