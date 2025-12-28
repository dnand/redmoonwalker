import { getCurrentUser } from "@/lib/auth"
import { redirect } from "next/navigation"
import { ProductCard } from "@/components/ProductCard"
import { EmptyState } from "@/components/EmptyState"
import { Heart } from "lucide-react"
import { mockProducts } from "@/lib/mockData"
import { WishlistClient } from "@/components/WishlistClient"

export default async function WishlistPage() {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/auth?redirect=/wishlist")
  }

  return <WishlistClient />
}

