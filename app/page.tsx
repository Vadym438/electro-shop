"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "./Header";
import { useCart } from "./CartContext";

type Product = {
  id: string | number;
  name: string;
  description: string | null;
  price: number;
  category: string;
  imageUrl: string | null;
  stock: number;
};

const categoryIcons = ["⌁", "◈", "◌", "✦"];

export default function Home() {
  const router = useRouter();
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then((response) => response.json())
      .then((data: unknown) => {
        if (Array.isArray(data)) setProducts(data as Product[]);
      })
      .catch(() => setProducts([]))
      .finally(() => setIsLoading(false));
  }, []);

  const categories = useMemo(
    () => [...new Set(products.map((product) => product.category))].slice(0, 4),
    [products],
  );

  const scrollToProducts = () =>
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });

  return (
    <main className="min-h-screen overflow-hidden bg-slate-950 text-slate-900">
      <div className="relative isolate bg-[radial-gradient(circle_at_12%_0%,#1d4ed8_0,transparent_28%),radial-gradient(circle_at_88%_12%,#7c3aed_0,transparent_23%),linear-gradient(135deg,#020617,#111c3f_56%,#172554)] pb-18">
        <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.12)_1px,transparent_1px)] [background-size:42px_42px]" />
        <div className="relative px-4 pt-5 sm:px-6 lg:px-8">
          <Header />
          <section className="mx-auto grid max-w-6xl items-center gap-12 py-12 md:grid-cols-[1.1fr_.9fr] md:py-20">
            <div>
              <p className="mb-5 inline-flex rounded-full border border-blue-300/25 bg-white/10 px-4 py-2 text-sm font-semibold text-blue-100 backdrop-blur">
                Новинки, які хочеться забрати додому
              </p>
              <h1 className="max-w-2xl text-5xl font-black tracking-tight text-white sm:text-6xl">
                Техніка, яка <span className="text-cyan-300">надихає</span>{" "}
                щодня.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
                Обирайте електроніку для роботи, дому та відпочинку — із швидкою
                доставкою та підтримкою на кожному кроці.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <button
                  onClick={scrollToProducts}
                  className="rounded-xl bg-cyan-300 px-6 py-3 font-bold text-slate-950 shadow-lg shadow-cyan-500/25 transition hover:-translate-y-0.5 hover:bg-cyan-200"
                >
                  Переглянути каталог
                </button>
                <Link
                  href="/registr"
                  className="rounded-xl border border-white/25 bg-white/10 px-6 py-3 font-bold text-white backdrop-blur transition hover:bg-white/20"
                >
                  Створити акаунт
                </Link>
              </div>
              <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm font-medium text-slate-300">
                <span>✓ Гарантія на товари</span>
                <span>✓ Швидка доставка</span>
                <span>✓ Безпечна оплата</span>
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-md">
              <div className="absolute -inset-5 rounded-[2.5rem] bg-cyan-400/20 blur-3xl" />
              <div className="relative rounded-[2rem] border border-white/15 bg-white/10 p-5 shadow-2xl backdrop-blur">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-cyan-300 px-3 py-1 text-xs font-black tracking-wider text-slate-950">
                    ELECTRO DROP
                  </span>
                  <span className="text-sm text-slate-300">Твій вибір</span>
                </div>
                <div className="mt-5 grid aspect-[4/3] place-items-center rounded-[1.5rem] bg-[linear-gradient(145deg,#38bdf8,#4f46e5_55%,#1e1b4b)] shadow-inner">
                  <div className="grid h-44 w-64 place-items-center rounded-2xl border-[10px] border-slate-900 bg-slate-950 shadow-2xl">
                    <div className="h-24 w-44 rounded-lg bg-[radial-gradient(circle_at_30%_20%,#67e8f9,transparent_25%),linear-gradient(135deg,#1d4ed8,#7c3aed)]" />
                  </div>
                </div>
                <div className="mt-5 flex items-end justify-between">
                  <div>
                    <p className="text-sm text-slate-300">Смарт-пристрої</p>
                    <p className="text-xl font-bold text-white">
                      Новий рівень комфорту
                    </p>
                  </div>
                  <span className="text-3xl">⚡</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <section className="bg-slate-100 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-7 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-[.2em] text-blue-600">
                Зручно обирати
              </p>
              <h2 className="mt-2 text-3xl font-black text-slate-900">
                Популярні категорії
              </h2>
            </div>
            <span className="hidden text-sm text-slate-500 sm:block">
              Все потрібне в одному місці
            </span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {(categories.length
              ? categories
              : ["Смартфони", "Ноутбуки", "Дім", "Аксесуари"]
            ).map((category, index) => (
              <button
                key={category}
                onClick={scrollToProducts}
                className="group flex items-center gap-4 rounded-2xl bg-white p-5 text-left shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-blue-50 text-2xl text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                  {categoryIcons[index]}
                </span>
                <span className="font-bold text-slate-800">{category}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="products" className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-[.2em] text-violet-600">
                Обране для вас
              </p>
              <h2 className="mt-2 text-3xl font-black text-slate-900">
                Знайдіть свою наступну покупку
              </h2>
            </div>
            <Link
              href="/product/NewProduct"
              className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
            >
              + Додати товар
            </Link>
          </div>
          {isLoading ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-96 animate-pulse rounded-2xl bg-slate-100"
                />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 p-12 text-center">
              <p className="text-xl font-bold text-slate-800">
                Товари ще додаються
              </p>
              <p className="mt-2 text-slate-500">
                Поверніться трохи пізніше або додайте перший товар.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <article
                  key={product.id}
                  onClick={() => router.push(`/product/${product.id}`)}
                  className="group cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative h-52 overflow-hidden bg-slate-100">
                    {product.imageUrl ? (
                      <div
                        role="img"
                        aria-label={product.name}
                        style={{ backgroundImage: `url(${product.imageUrl})` }}
                        className="h-full w-full bg-cover bg-center transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="grid h-full place-items-center text-5xl">
                        ⚡
                      </div>
                    )}
                    <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-slate-700 backdrop-blur">
                      {product.category}
                    </span>
                  </div>
                  <div className="p-5">
                    <p className="line-clamp-1 text-lg font-black text-slate-900">
                      {product.name}
                    </p>
                    <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-slate-500">
                      {product.description ||
                        "Якісна техніка для сучасного життя."}
                    </p>
                    <div className="mt-5 flex items-center justify-between gap-3">
                      <div>
                        <p className="text-2xl font-black text-blue-700">
                          {product.price.toLocaleString("uk-UA")} ₴
                        </p>
                        <p className="mt-1 text-xs font-medium text-emerald-600">
                          {product.stock > 0
                            ? `В наявності: ${product.stock}`
                            : "Немає в наявності"}
                        </p>
                      </div>
                      <button
                        disabled={product.stock <= 0}
                        onClick={(event) => {
                          event.stopPropagation();
                          addToCart(product);
                        }}
                        className="rounded-xl bg-slate-950 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                      >
                        У кошик
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
