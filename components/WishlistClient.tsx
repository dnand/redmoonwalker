"use client"

import { useEffect, useState } from "react"
import { ProductCard } from "@/components/ProductCard"
import { EmptyState } from "@/components/EmptyState"
import { Heart, ShoppingBag } from "lucide-react"
import { mockProducts } from "@/lib/mockData"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ProductType } from "@prisma/client"

export function WishlistClient() {
  const [wishlistItems, setWishlistItems] = useState<string[]>([])
  const router = useRouter()

  useEffect(() => {
    const wishlist = localStorage.getItem("demo_wishlist")
    if (wishlist) {
      setWishlistItems(JSON.parse(wishlist))
    }
  }, [])

  const products = mockProducts.filter((p) => wishlistItems.includes(p.id))

  if (products.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-8">My Wishlist</h1>
        <EmptyState
          title="Your wishlist is empty"
          description="Save products you're interested in for later"
          icon={<Heart className="h-12 w-12 text-muted-foreground mb-4" />}
          action={{
            label: "Browse Shop",
            onClick: () => router.push("/shop"),
          }}
        />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-3">My Wishlist</h1>
        <p className="text-lg text-muted-foreground">
          {products.length} {products.length === 1 ? "item" : "items"} saved
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            slug={product.slug}
            title={product.title}
            description={product.description}
            coverImageUrl={product.coverImageUrl}
            priceCents={product.priceCents}
            currency={product.currency}
            type={product.type as ProductType}
            metadata={product.metadata as any}
          />
        ))}
      </div>
    </div>
  )
}

