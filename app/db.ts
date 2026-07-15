import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  throw new Error('DATABASE_URL is not set')
}

declare global {
  var prisma: PrismaClient | undefined
}

const createPrismaClient = () => {
  const adapter = new PrismaPg(connectionString)
  return new PrismaClient({ adapter })
}

export const db = globalThis.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = db
}
