"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface AddProductFormProps {
  // Функція, яку ми передамо з батьківського компонента, щоб оновити список товарів на екрані
  onProductAdded: (newProduct: any) => void;
}

export default function AddProductPage() {
    const router = useRouter();
  // Стейт для збереження полів форми
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    stock: "1",
    imageUrl: "", // Додаткове поле для URL зображення, якщо потрібно
    description: "", // Додаткове поле для опису товару, якщо потрібно
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Обробник зміни полів
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Обробник відправки форми
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Валідація
    if (!formData.name || !formData.price || !formData.category) {
      setError("Будь ласка, заповніть усі обов'язкові поля.");
      setLoading(false);
      return;
    }

    try {
      // Робимо POST-запит на наш API-роут
      const response = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          price: Number(formData.price),
          category: formData.category,
          stock: Number(formData.stock),
          imageUrl: formData.imageUrl,
        description: formData.description,
        }),
      });

      if (!response.ok) {
        throw new Error("Не вдалося створити товар на сервері");
      }

      // Товар успішно створено!
      alert("Товар успішно додано!");
      
      // 👈 Перенаправляємо користувача на головну сторінку, щоб він побачив оновлений список
      router.push("/"); 
      // Також примусово оновлюємо дані на головній, щоб Next.js не показував закешовану версію
      router.refresh();


      // Очищаємо форму після успішного створення
      setFormData({ name: "", price: "", category: "", stock: "1", imageUrl: "", description: "" });
      alert("Товар успішно додано!");
    } catch (err: any) {
      setError(err.message || "Щось пішло не так");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Додати новий товар</h2>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Назва товару *</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 text-black"
          placeholder="Наприклад: Смартфон Samsung"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Ціна (грн) *</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 text-black"
          placeholder="25000"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Категорія *</label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 text-black"
          placeholder="Смартфони"
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">Кількість на складі</label>
        <input
          type="number"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 text-black"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Категорія *</label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 text-black"
          placeholder="Смартфони"
        />
      </div>
    
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">URL зображення</label>
        <input
          type="text"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 text-black"
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Опис</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 text-black"
          placeholder="Введіть опис товару"
          rows={4}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors disabled:bg-blue-300"
      >
        {loading ? "Збереження..." : "Зберегти товар"}
      </button>
    </form>
  );
}