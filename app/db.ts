import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL;

declare global {
  var prisma: PrismaClient | undefined;
}

const createPrismaClient = () => {
  // Перевіряємо наявність змінної ТІЛЬКИ в момент створення клієнта (при першому запиті до БД)
  if (!connectionString) {
    throw new Error(
      "DATABASE_URL is not set. Please check your environmental variables.",
    );
  }

  const adapter = new PrismaPg(connectionString);
  return new PrismaClient({ adapter });
};

export const db = globalThis.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = db;
}
