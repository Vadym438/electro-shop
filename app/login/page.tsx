"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCredentialsLogin = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: email.trim().toLowerCase(),
        password,
      });
      if (result?.error) {
        setError("Невірний email або пароль.");
        return;
      }
      router.push("/");
      router.refresh();
    } catch {
      setError("Не вдалося увійти. Спробуйте ще раз.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="grid min-h-screen place-items-center bg-[radial-gradient(circle_at_15%_0%,#1d4ed8,transparent_28%),linear-gradient(135deg,#020617,#172554)] px-4 py-10">
      <section className="w-full max-w-md rounded-3xl border border-white/15 bg-white p-7 shadow-2xl sm:p-9">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-bold text-blue-700 hover:text-blue-900"
        >
          ← На головну
        </Link>
        <div className="mt-7">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-600 text-xl text-white">
            ⚡
          </span>
          <h1 className="mt-5 text-3xl font-black tracking-tight text-slate-950">
            З поверненням
          </h1>
          <p className="mt-2 text-slate-500">
            Увійдіть, щоб продовжити покупки в ElectroShop.
          </p>
        </div>
        <button
          type="button"
          onClick={() => signIn("google", { redirectTo: "/" })}
          className="mt-7 flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 py-3 font-bold text-slate-700 transition hover:bg-slate-50"
        >
          <span className="text-lg">G</span> Продовжити з Google
        </button>
        <div className="my-6 flex items-center gap-3 text-xs font-semibold text-slate-400">
          <span className="h-px flex-1 bg-slate-200" />
          або
          <span className="h-px flex-1 bg-slate-200" />
        </div>
        <form onSubmit={handleCredentialsLogin} className="space-y-4">
          {error && (
            <p
              role="alert"
              className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
            >
              {error}
            </p>
          )}
          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-sm font-bold text-slate-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              autoComplete="email"
              placeholder="you@example.com"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block text-sm font-bold text-slate-700"
            >
              Пароль
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              autoComplete="current-password"
              placeholder="Ваш пароль"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-xl bg-slate-950 py-3.5 font-bold text-white transition hover:bg-blue-700 disabled:cursor-wait disabled:bg-slate-400"
          >
            {isLoading ? "Входимо…" : "Увійти"}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-slate-500">
          Ще не маєте акаунта?{" "}
          <Link
            href="/registr"
            className="font-bold text-blue-700 hover:underline"
          >
            Зареєструватися
          </Link>
        </p>
      </section>
    </main>
  );
}
