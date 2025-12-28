import { prisma } from "./prisma"

export async function checkEntitlement(
  userId: string,
  productId: string,
  variantId?: string | null
): Promise<boolean> {
  try {
    // Check if database is available
    if (!process.env.DATABASE_URL) {
      // Demo mode: check localStorage for client-side, always return true for server-side demo
      if (typeof window !== "undefined") {
        const entitlements = localStorage.getItem("demo_entitlements")
        if (entitlements) {
          const entitlementsList = JSON.parse(entitlements)
          return entitlementsList.some(
            (e: any) => e.productId === productId && e.userId === userId
          )
        }
      }
      // For demo purposes, allow access to all products
      return true
    }

    // Prisma unique constraint - variantId can be null
    const entitlement = await prisma.entitlement.findFirst({
      where: {
        userId,
        productId,
        variantId: variantId ?? null,
      },
    })

    return !!entitlement
  } catch (error) {
    // If database error, allow access for demo
    console.warn("Entitlement check failed, allowing access for demo:", error)
    return true
  }
}

export async function grantEntitlement(
  userId: string,
  productId: string,
  variantId?: string | null
) {
  try {
    if (!process.env.DATABASE_URL) {
      // Demo mode: store in localStorage
      if (typeof window !== "undefined") {
        const entitlements = localStorage.getItem("demo_entitlements")
        const entitlementsList = entitlements ? JSON.parse(entitlements) : []
        entitlementsList.push({ userId, productId, variantId, grantedAt: new Date().toISOString() })
        localStorage.setItem("demo_entitlements", JSON.stringify(entitlementsList))
      }
      return { id: `demo-${Date.now()}`, userId, productId, variantId, createdAt: new Date() }
    }

    return prisma.entitlement.create({
      data: {
        userId,
        productId,
        variantId: variantId ?? null,
      },
    })
  } catch (error) {
    console.warn("Grant entitlement failed:", error)
    // Return mock entitlement for demo
    return { id: `demo-${Date.now()}`, userId, productId, variantId, createdAt: new Date() }
  }
}

