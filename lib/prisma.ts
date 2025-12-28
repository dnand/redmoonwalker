import { PrismaClient } from "@prisma/client"

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

let prismaInstance: PrismaClient | null = null

// Only initialize Prisma if DATABASE_URL is set
if (process.env.DATABASE_URL) {
  if (process.env.NODE_ENV === "production") {
    prismaInstance = new PrismaClient({
      log: ["error"],
    })
  } else {
    if (!globalForPrisma.prisma) {
      globalForPrisma.prisma = new PrismaClient({
        log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
      })
    }
    prismaInstance = globalForPrisma.prisma
  }
}

// Export a proxy that throws a helpful error if database is not configured
export const prisma = new Proxy({} as PrismaClient, {
  get(target, prop) {
    if (!prismaInstance) {
      throw new Error("Database not configured. This is a demo app - database features are disabled.")
    }
    return (prismaInstance as any)[prop]
  },
})

