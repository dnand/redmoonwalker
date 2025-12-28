"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"
import { addToCart } from "@/lib/cart"
import { ShoppingCart, Download, BookOpen, Package } from "lucide-react"

interface AccessGateProps {
  productId: string
  productSlug: string
  productType: "PATTERN" | "MATERIAL" | "GUIDE"
  priceCents: number
  currency?: string
  onAddToCart?: () => void
  className?: string
}

export function AccessGate({
  productId,
  productSlug,
  productType,
  priceCents,
  currency = "usd",
  onAddToCart,
  className,
}: AccessGateProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [hasAccess, setHasAccess] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Check authentication and entitlements client-side
  useEffect(() => {
    setMounted(true)
    
    // Check authentication
    const auth = localStorage.getItem("demo_authenticated")
    setIsAuthenticated(auth === "true")
    
    // Check entitlements from localStorage
    if (auth === "true") {
      const entitlements = localStorage.getItem("demo_entitlements")
      if (entitlements) {
        try {
          const entitlementsList = JSON.parse(entitlements)
          const hasEntitlement = entitlementsList.some(
            (e: any) => e.productId === productId
          )
          setHasAccess(hasEntitlement)
        } catch {
          setHasAccess(false)
        }
      }
    }
  }, [productId])

  // Digital products go to library, physical products don't
  const isDigitalProduct = productType === "PATTERN" || productType === "GUIDE"

  const handleAddToCart = async () => {
    setIsLoading(true)
    try {
      if (onAddToCart) {
        await onAddToCart()
      } else {
        addToCart(productId, null, 1)
      }
      toast({
        title: "Added to cart",
        description: "Item added to your cart successfully.",
      })
      window.dispatchEvent(new Event("cartUpdated"))
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item to cart.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleAccessContent = () => {
    if (productType === "GUIDE") {
      router.push(`/learn/${productSlug}`)
    } else if (productType === "PATTERN") {
      router.push(`/library`)
    }
  }

  // Show loading state while mounting (to prevent hydration mismatch)
  if (!mounted) {
    return (
      <div className={className}>
        <Button size="lg" className="w-full text-base py-6" disabled>
          Loading...
        </Button>
      </div>
    )
  }

  // MATERIAL products are physical - always show Add to Cart, never library access
  if (productType === "MATERIAL") {
    if (hasAccess) {
      return (
        <div className={className}>
          <Badge variant="secondary" className="mb-4 px-3 py-1 flex items-center gap-2 w-fit">
            <Package className="h-4 w-4" />
            Purchased - Ships to your address
          </Badge>
          <Button 
            onClick={handleAddToCart} 
            size="lg" 
            className="w-full text-base py-6"
            disabled={isLoading}
            variant="outline"
          >
            <ShoppingCart className="mr-2 h-5 w-5" />
            {isLoading ? "Adding..." : "Buy Again"}
          </Button>
        </div>
      )
    }

    if (!isAuthenticated) {
      return (
        <div className={className}>
          <Button 
            onClick={() => router.push("/auth?redirect=" + encodeURIComponent(`/product/${productSlug}`))} 
            size="lg" 
            className="w-full text-base py-6"
          >
            Sign In to Purchase
          </Button>
          <p className="text-sm text-muted-foreground mt-3 text-center">
            Sign in to add items to your cart
          </p>
        </div>
      )
    }

    return (
      <div className={className}>
        <Button
          onClick={handleAddToCart}
          size="lg"
          className="w-full text-base py-6"
          disabled={isLoading}
        >
          <ShoppingCart className="mr-2 h-5 w-5" />
          {isLoading ? "Adding..." : `Add to Cart - $${(priceCents / 100).toFixed(2)}`}
        </Button>
        <p className="text-sm text-muted-foreground mt-3 text-center">
          Physical product - ships to your address
        </p>
      </div>
    )
  }

  // Digital products (PATTERN and GUIDE)
  if (hasAccess) {
    return (
      <div className={className}>
        <Badge variant="secondary" className="mb-4 px-3 py-1 flex items-center gap-2 w-fit">
          {productType === "GUIDE" ? (
            <BookOpen className="h-4 w-4" />
          ) : (
            <Download className="h-4 w-4" />
          )}
          ✓ Purchased
        </Badge>
        <Button onClick={handleAccessContent} size="lg" className="w-full text-base py-6">
          {productType === "GUIDE" ? (
            <>
              <BookOpen className="mr-2 h-5 w-5" />
              Start Learning
            </>
          ) : (
            <>
              <Download className="mr-2 h-5 w-5" />
              Access in Library
            </>
          )}
        </Button>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className={className}>
        <Button 
          onClick={() => router.push("/auth?redirect=" + encodeURIComponent(`/product/${productSlug}`))} 
          size="lg" 
          className="w-full text-base py-6"
        >
          Sign In to Purchase
        </Button>
        <p className="text-sm text-muted-foreground mt-3 text-center">
          Sign in to purchase and access this {productType === "GUIDE" ? "course" : "pattern"}
        </p>
      </div>
    )
  }

  return (
    <div className={className}>
      <Button
        onClick={handleAddToCart}
        size="lg"
        className="w-full text-base py-6"
        disabled={isLoading}
      >
        <ShoppingCart className="mr-2 h-5 w-5" />
        {isLoading ? "Adding..." : `Add to Cart - $${(priceCents / 100).toFixed(2)}`}
      </Button>
      <p className="text-sm text-muted-foreground mt-3 text-center">
        {productType === "GUIDE" 
          ? "Instant access after purchase" 
          : "Digital download - instant access after purchase"
        }
      </p>
    </div>
  )
}
