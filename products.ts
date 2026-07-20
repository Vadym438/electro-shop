// src/products.ts

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  stock: number;
}

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Розумний електрочайник",
    description:
      "Потужність 2200 Вт, керування зі смартфона, підтримка температури.",
    price: 1499,
    category: "Кухонна техніка",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiIVC0x6WD-6dIH8MhG1RzK8Q2K-F73pW9j4WRHiBP-o9FhTGj5zYVpCE&s=10",
    stock: 12,
  },
  {
    id: "2",
    name: "Роботизований пилосос",
    description:
      "Вологе та сухе прибирання, лазерна навігація, побудова карти кімнати.",
    price: 8999,
    category: "Побутова техніка",
    image: "https://ergo-ua.com/img/products/1807615/3410381.jpg",
    stock: 5,
  },
  {
    id: "3",
    name: "Смарт-лампа RGB",
    description:
      "Цоколь E27, 16 мільйонів кольорів, синхронізація з музикою та таймер.",
    price: 450,
    category: "Освітлення",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGnCgqvhlLfYAftbGnRjKtp9jhd7REJyoI4b4D4XPgbKYLY9WPkEnoysE&s=10",
    stock: 45,
  },
  {
    id: "4",
    name: "Смарт-лампа RGB",
    description:
      "Цоколь E27, 16 мільйонів кольорів, синхронізація з музикою та таймер.",
    price: 450,
    category: "Освітлення",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGnCgqvhlLfYAftbGnRjKtp9jhd7REJyoI4b4D4XPgbKYLY9WPkEnoysE&s=10",
    stock: 45,
  },
  {
    id: "5",
    name: "Смарт-лампа RGB",
    description:
      "Цоколь E27, 16 мільйонів кольорів, синхронізація з музикою та таймер.",
    price: 450,
    category: "Освітлення",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGnCgqvhlLfYAftbGnRjKtp9jhd7REJyoI4b4D4XPgbKYLY9WPkEnoysE&s=10",
    stock: 45,
  },
  {
    id: "6",
    name: "Смарт-лампа RGB",
    description:
      "Цоколь E27, 16 мільйонів кольорів, синхронізація з музикою та таймер.",
    price: 450,
    category: "Освітлення",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGnCgqvhlLfYAftbGnRjKtp9jhd7REJyoI4b4D4XPgbKYLY9WPkEnoysE&s=10",
    stock: 45,
  },
  {
    id: "7",
    name: "Смарт-лампа RGB",
    description:
      "Цоколь E27, 16 мільйонів кольорів, синхронізація з музикою та таймер.",
    price: 450,
    category: "Освітлення",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGnCgqvhlLfYAftbGnRjKtp9jhd7REJyoI4b4D4XPgbKYLY9WPkEnoysE&s=10",
    stock: 45,
  },
];
