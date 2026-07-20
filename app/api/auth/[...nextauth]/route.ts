// app/api/auth/[...nextauth]/route.ts
import { handlers } from "@/auth"; // Переконайся, що шлях до auth.ts правильний
export const { GET, POST } = handlers;