"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface WishlistButtonProps {
  productId: string
  variant?: "default" | "ghost" | "outline"
  size?: "default" | "sm" | "lg" | "icon"
}

export function WishlistButton({ productId, variant = "ghost", size = "icon" }: WishlistButtonProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    // Check if product is in wishlist
    const wishlist = localStorage.getItem("demo_wishlist")
    if (wishlist) {
      const items = JSON.parse(wishlist)
      setIsWishlisted(items.includes(productId))
    }
  }, [productId])

  const toggleWishlist = () => {
    const wishlist = localStorage.getItem("demo_wishlist")
    const items = wishlist ? JSON.parse(wishlist) : []

    if (isWishlisted) {
      const updated = items.filter((id: string) => id !== productId)
      localStorage.setItem("demo_wishlist", JSON.stringify(updated))
      setIsWishlisted(false)
      toast({
        title: "Removed from wishlist",
        description: "Item removed from your wishlist",
      })
    } else {
      items.push(productId)
      localStorage.setItem("demo_wishlist", JSON.stringify(items))
      setIsWishlisted(true)
      toast({
        title: "Added to wishlist",
        description: "Item added to your wishlist",
      })
    }
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={toggleWishlist}
      className={isWishlisted ? "text-red-500 hover:text-red-600" : ""}
    >
      <Heart className={`h-4 w-4 ${isWishlisted ? "fill-current" : ""}`} />
    </Button>
  )
}

