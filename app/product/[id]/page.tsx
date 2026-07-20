import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import BuyButton from "../../BuyButton";
import Header from "@/app/Header";
import { db } from "@/app/db";

type ProductPageProps = { params: Promise<{ id: string }> };

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const productId = Number(id);
  if (!Number.isInteger(productId)) notFound();
  const product = await db.product.findUnique({ where: { id: productId } });
  if (!product) notFound();
  async function deleteProductAction() {
    "use server";
    await db.product.delete({ where: { id: productId } });
    redirect("/");
  }
  return (
    <main className="min-h-screen bg-slate-100 px-4 py-5 sm:px-6 lg:px-8">
      <Header />
      <section className="mx-auto mt-10 max-w-6xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 transition hover:text-blue-700"
        >
          ← Усі товари
        </Link>
        <div className="mt-5 overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200 lg:grid lg:grid-cols-2">
          <div className="min-h-80 bg-slate-100 lg:min-h-[34rem]">
            {product.imageUrl ? (
              <div
                role="img"
                aria-label={product.name}
                style={{ backgroundImage: `url(${product.imageUrl})` }}
                className="h-full min-h-80 bg-cover bg-center lg:min-h-[34rem]"
              />
            ) : (
              <div className="grid h-full min-h-80 place-items-center text-7xl lg:min-h-[34rem]">
                ⚡
              </div>
            )}
          </div>
          <div className="flex flex-col p-7 sm:p-10">
            <span className="w-fit rounded-full bg-blue-50 px-3 py-1.5 text-xs font-black text-blue-700">
              {product.category}
            </span>
            <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-950">
              {product.name}
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              {product.description ||
                "Якісний пристрій для щоденних задач і комфортного користування."}
            </p>
            <div className="mt-8 rounded-2xl bg-slate-50 p-5">
              <p className="text-sm font-bold text-slate-500">Ціна</p>
              <p className="mt-1 text-4xl font-black text-blue-700">
                {product.price.toLocaleString("uk-UA")} ₴
              </p>
              <p className="mt-3 text-sm font-bold text-emerald-600">
                {product.stock > 0
                  ? `✓ В наявності: ${product.stock} шт.`
                  : "Наразі немає в наявності"}
              </p>
            </div>
            <div className="mt-6">
              {product.stock > 0 ? (
                <BuyButton
                  productName={product.name}
                  productPrice={product.price}
                />
              ) : (
                <button
                  disabled
                  className="w-full rounded-xl bg-slate-200 py-3.5 font-bold text-slate-500"
                >
                  Немає в наявності
                </button>
              )}
            </div>
            <div className="mt-auto border-t border-slate-100 pt-6">
              <form action={deleteProductAction}>
                <button
                  type="submit"
                  className="text-sm font-bold text-red-500 transition hover:text-red-700"
                >
                  Видалити товар
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
