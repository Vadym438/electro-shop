import { db } from "@/app/db";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

declare module "next-auth" {
  interface User {
    role?: string;
  }
}

async function requireAuth() {
  const session = await auth();
  if (session?.user?.role !== "admin")
    return null;
  return session;
}

export async function GET() {
  try {
    return NextResponse.json(await db.product.findMany());
  } catch {
    return NextResponse.json(
      { error: "Помилка завантаження товарів." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  const session = await requireAuth();
  if (!session) return NextResponse.json({ error: "Ви не адміністратор." }, { status: 401 });
  try {
    const { name, price, category, stock, imageUrl, description } =
      await request.json();
    const newProduct = await db.product.create({
      data: { name, price, category, stock, imageUrl, description },
    });
    return NextResponse.json(newProduct);
  } catch {
    return NextResponse.json(
      { error: "Помилка створення товару." },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const id = new URL(request.url).searchParams.get("id");
    if (!id)
      return NextResponse.json(
        { error: "ID товару не вказано." },
        { status: 400 },
      );
    await db.product.delete({ where: { id: Number(id) } });
    return NextResponse.json({ message: "Товар видалено." });
  } catch {
    return NextResponse.json(
      { error: "Помилка видалення товару." },
      { status: 500 },
    );
  }
}
