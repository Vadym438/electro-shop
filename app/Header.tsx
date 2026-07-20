"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { useCart } from "./CartContext";

export type HeaderNavItem = {
  label: string;
  href: string;
  badge?: string;
};

type HeaderProps = {
  /** Add page-specific navigation items without changing the header component. */
  navItems?: HeaderNavItem[];
  /** Slot for future controls such as search, language or profile. */
  actions?: ReactNode;
};

const defaultNavItems: HeaderNavItem[] = [
  { label: "Каталог", href: "/#products" },
  { label: "Новинки", href: "/#products", badge: "NEW" },
  { label: "Додати товар", href: "/product/NewProduct" },
];

export default function Header({ navItems = defaultNavItems, actions }: HeaderProps) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cart, clearCart, totalPrice } = useCart();

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="sticky top-4 z-40 mx-auto max-w-6xl">
      <div className="relative flex min-h-16 items-center justify-between gap-4 rounded-2xl border border-white/15 bg-slate-950/70 px-4 py-3 shadow-2xl shadow-slate-950/30 backdrop-blur-xl sm:px-5">
        <Link href="/" className="group flex shrink-0 items-center gap-2.5" aria-label="ElectroShop — на головну">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-cyan-300 to-blue-500 text-lg text-slate-950 shadow-lg shadow-cyan-500/20 transition group-hover:rotate-12">⚡</span>
          <span className="text-lg font-black tracking-tight text-white">Electro<span className="text-cyan-300">Shop</span></span>
        </Link>

        <nav aria-label="Основна навігація" className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link key={`${item.href}-${item.label}`} href={item.href} className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white">
              {item.label}{item.badge && <span className="ml-1.5 rounded-full bg-cyan-300 px-1.5 py-0.5 text-[9px] font-black tracking-wide text-slate-950">{item.badge}</span>}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {actions && <div className="hidden items-center gap-2 lg:flex">{actions}</div>}
          <Link href="/login" className="hidden rounded-lg px-3 py-2 text-sm font-bold text-slate-200 transition hover:bg-white/10 hover:text-white sm:block">Увійти</Link>
          <div className="relative">
            <button type="button" onClick={() => setIsCartOpen((isOpen) => !isOpen)} aria-expanded={isCartOpen} aria-controls="header-cart" className="inline-flex items-center gap-2 rounded-xl bg-cyan-300 px-3 py-2 text-sm font-black text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-200">
              <span aria-hidden>🛒</span><span className="hidden sm:inline">Кошик</span><span className="grid h-5 min-w-5 place-items-center rounded-full bg-slate-950 px-1 text-xs text-white">{cart.length}</span>
            </button>
            {isCartOpen && <div id="header-cart" className="absolute right-0 mt-3 w-[min(22rem,calc(100vw-2rem))] rounded-2xl border border-slate-200 bg-white p-5 text-slate-900 shadow-2xl"><div className="mb-4 flex items-center justify-between"><h2 className="font-black">Ваш кошик</h2><button type="button" onClick={() => setIsCartOpen(false)} className="rounded-lg p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-900" aria-label="Закрити кошик">✕</button></div>{cart.length === 0 ? <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-500">Кошик поки порожній. Саме час знайти щось класне.</p> : <><div className="max-h-56 space-y-3 overflow-y-auto pr-1">{cart.map((item, index) => <div key={`${item.id}-${index}`} className="flex items-start justify-between gap-4 border-b border-slate-100 pb-3 text-sm"><span className="font-semibold text-slate-700">{item.name}</span><span className="shrink-0 font-black text-blue-700">{item.price.toLocaleString("uk-UA")} ₴</span></div>)}</div><div className="mt-4 flex items-center justify-between"><span className="font-bold">Разом</span><span className="text-xl font-black text-slate-950">{totalPrice.toLocaleString("uk-UA")} ₴</span></div><button type="button" onClick={clearCart} className="mt-4 w-full rounded-xl bg-red-50 py-2.5 text-sm font-bold text-red-600 transition hover:bg-red-100">Очистити кошик</button></>}</div>}
          </div>
          <button type="button" onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)} aria-expanded={isMobileMenuOpen} aria-controls="mobile-navigation" className="grid h-10 w-10 place-items-center rounded-xl text-lg text-white transition hover:bg-white/10 md:hidden">{isMobileMenuOpen ? "✕" : "☰"}<span className="sr-only">Меню</span></button>
        </div>
      </div>
      {isMobileMenuOpen && <nav id="mobile-navigation" aria-label="Мобільна навігація" className="mt-2 rounded-2xl border border-white/15 bg-slate-950/95 p-3 shadow-xl backdrop-blur-xl md:hidden"><div className="grid gap-1">{navItems.map((item) => <Link key={`${item.href}-${item.label}`} href={item.href} onClick={closeMobileMenu} className="flex items-center justify-between rounded-xl px-4 py-3 font-bold text-slate-200 transition hover:bg-white/10 hover:text-white"><span>{item.label}</span>{item.badge && <span className="rounded-full bg-cyan-300 px-2 py-0.5 text-[10px] font-black text-slate-950">{item.badge}</span>}</Link>)}<Link href="/login" onClick={closeMobileMenu} className="rounded-xl px-4 py-3 font-bold text-cyan-300 transition hover:bg-white/10">Увійти</Link>{actions && <div className="border-t border-white/10 px-4 pt-3">{actions}</div>}</div></nav>}
    </header>
  );
}
