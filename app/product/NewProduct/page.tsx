"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/app/Header";

type FormData = {
  name: string;
  price: string;
  category: string;
  stock: string;
  imageUrl: string;
  description: string;
};
type ApiResponse = { error?: string };
const inputClass =
  "mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100";

export default function AddProductPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    price: "",
    category: "",
    stock: "1",
    imageUrl: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) =>
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    const price = Number(formData.price);
    const stock = Number(formData.stock);
    if (
      !formData.name.trim() ||
      !formData.category ||
      !Number.isFinite(price) ||
      price <= 0 ||
      !Number.isInteger(stock) ||
      stock < 0
    ) {
      setError("Заповніть назву, категорію, коректну ціну та кількість.");
      setLoading(false);
      return;
    }
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          price,
          category: formData.category,
          stock,
          imageUrl: formData.imageUrl.trim() || null,
          description: formData.description.trim() || null,
        }),
      });
      const result = (await response.json()) as ApiResponse;
      if (!response.ok) {
        setError(result.error ?? "Не вдалося зберегти товар.");
        return;
      }
      router.push("/");
      router.refresh();
    } catch {
      setError("Не вдалося з’єднатися із сервером. Спробуйте ще раз.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <main className="min-h-screen bg-slate-100 px-4 py-5 sm:px-6 lg:px-8">
      <Header />
      <section className="mx-auto mt-10 grid max-w-5xl gap-8 lg:grid-cols-[.8fr_1.2fr]">
        <aside className="rounded-3xl bg-slate-950 p-7 text-white shadow-xl">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-cyan-300 text-xl text-slate-950">
            ＋
          </span>
          <h1 className="mt-6 text-3xl font-black">Новий товар</h1>
          <p className="mt-3 leading-7 text-slate-300">
            Додайте позицію до каталогу. Вона одразу з’явиться на головній
            сторінці.
          </p>
          <div className="mt-9 space-y-4 text-sm text-slate-300">
            <p>✓ Заповніть обов’язкові поля</p>
            <p>✓ Додайте фото, щоб картка виглядала переконливіше</p>
            <p>✓ Вкажіть фактичну кількість на складі</p>
          </div>
        </aside>
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black text-slate-950">
                Дані товару
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Поля з позначкою * є обов’язковими.
              </p>
            </div>
            <span className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-bold text-cyan-700">
              Чернетка
            </span>
          </div>
          {error && (
            <p
              role="alert"
              className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
            >
              {error}
            </p>
          )}
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label
                htmlFor="name"
                className="text-sm font-bold text-slate-700"
              >
                Назва товару *
              </label>
              <input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Наприклад, Навушники Sony WH-1000XM5"
                className={inputClass}
              />
            </div>
            <div>
              <label
                htmlFor="category"
                className="text-sm font-bold text-slate-700"
              >
                Категорія *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className={inputClass}
              >
                <option value="">Оберіть категорію</option>
                <option>Смартфони</option>
                <option>Ноутбуки</option>
                <option>Побутова техніка</option>
                <option>Аксесуари</option>
                <option>Інше</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="price"
                className="text-sm font-bold text-slate-700"
              >
                Ціна, ₴ *
              </label>
              <input
                id="price"
                name="price"
                type="number"
                min="1"
                step="1"
                value={formData.price}
                onChange={handleChange}
                required
                placeholder="25000"
                className={inputClass}
              />
            </div>
            <div>
              <label
                htmlFor="stock"
                className="text-sm font-bold text-slate-700"
              >
                Кількість на складі *
              </label>
              <input
                id="stock"
                name="stock"
                type="number"
                min="0"
                step="1"
                value={formData.stock}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>
            <div>
              <label
                htmlFor="imageUrl"
                className="text-sm font-bold text-slate-700"
              >
                Посилання на зображення
              </label>
              <input
                id="imageUrl"
                name="imageUrl"
                type="url"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="https://example.com/product.jpg"
                className={inputClass}
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="description"
                className="text-sm font-bold text-slate-700"
              >
                Опис товару
              </label>
              <textarea
                id="description"
                name="description"
                rows={5}
                value={formData.description}
                onChange={handleChange}
                placeholder="Коротко розкажіть, чому цей товар вартий уваги."
                className={inputClass}
              />
            </div>
          </div>
          <div className="mt-7 flex flex-wrap justify-end gap-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="rounded-xl px-5 py-3 font-bold text-slate-600 transition hover:bg-slate-100"
            >
              Скасувати
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-slate-950 px-6 py-3 font-bold text-white transition hover:bg-cyan-700 disabled:cursor-wait disabled:bg-slate-400"
            >
              {loading ? "Зберігаємо…" : "Зберегти товар"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
