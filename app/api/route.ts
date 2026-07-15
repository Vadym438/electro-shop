import { db } from "@/app/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const products = await db.product.findMany();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: "Помилка завантаження" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { name , price, category , stock, imageUrl, description } = await request.json();

    const newProduct = await db.product.create({
      data: {
        name,
        price,
        category,
        stock,
        imageUrl,
        description
      }
    });
    return NextResponse.json(newProduct);
  } catch (error) {
    return NextResponse.json({ error: "Помилка створення товару" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID товару не вказано" }, { status: 400 });
    }
     
    await db.product.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json({ message: "Товар видалено" });
  } catch (error) {
    return NextResponse.json({ error: "Помилка видалення товару" }, { status: 500 });
  }
}