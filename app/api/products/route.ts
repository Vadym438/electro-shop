import { db } from "@/app/db";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

async function requireAuth() {
  const session = await auth();
  if (!session)
    return NextResponse.json({ error: "Ви не авторизовані." }, { status: 401 });
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
  const unauthorized = await requireAuth();
  if (unauthorized) return unauthorized;
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
  const unauthorized = await requireAuth();
  if (unauthorized) return unauthorized;
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
