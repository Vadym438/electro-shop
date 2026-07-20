import { db } from "@/app/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

type RegistrationRequest = {
  name?: unknown;
  email?: unknown;
  password?: unknown;
};

export async function POST(request: Request) {
  try {
    const { name, email, password } = (await request.json()) as RegistrationRequest;
    const normalizedName = typeof name === "string" ? name.trim() : "";
    const normalizedEmail = typeof email === "string" ? email.trim().toLowerCase() : "";

    if (!normalizedName || !normalizedEmail || typeof password !== "string") {
      return NextResponse.json({ error: "Заповніть ім’я, email і пароль." }, { status: 400 });
    }
    if (!/^\S+@\S+\.\S+$/.test(normalizedEmail)) {
      return NextResponse.json({ error: "Вкажіть коректну email-адресу." }, { status: 400 });
    }
    if (password.length < 8) {
      return NextResponse.json({ error: "Пароль має містити щонайменше 8 символів." }, { status: 400 });
    }

    const existing = await db.user.findUnique({ where: { email: normalizedEmail } });
    if (existing) {
      return NextResponse.json({ error: "Користувач з таким email вже існує." }, { status: 409 });
    }

    const user = await db.user.create({
      data: {
        name: normalizedName,
        email: normalizedEmail,
        password: await bcrypt.hash(password, 10),
      },
    });

    return NextResponse.json({ id: user.id, email: user.email, name: user.name }, { status: 201 });
  } catch (error) {
    console.error("Registration failed:", error);
    return NextResponse.json({ error: "Помилка створення користувача." }, { status: 500 });
  }
}
