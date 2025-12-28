"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { PriceDisplay } from "@/components/PriceDisplay"
import { useRouter } from "next/navigation"
import { Trash2, ShoppingBag, Plus, Minus } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"
import { EmptyState } from "@/components/EmptyState"
import { motion, AnimatePresence } from "framer-motion"
import {
  getCartWithProducts,
  removeFromCart,
  updateCartQuantity,
  clearCart,
  CartItemWithProduct,
} from "@/lib/cart"

export default function CartPage() {
  const [cart, setCart] = useState<{
    items: CartItemWithProduct[]
    totalCents: number
  } | null>(null)
  const [loading, setLoading] = useState(true)
  const [checkoutLoading, setCheckoutLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    fetchCart()
  }, [])

  const fetchCart = () => {
    const cartData = getCartWithProducts()
    setCart(cartData)
    setLoading(false)
  }

  const handleRemoveItem = (productId: string, variantId: string | null) => {
    removeFromCart(productId, variantId)
    fetchCart()
    toast({
      title: "Item removed",
      description: "Item removed from cart",
    })
  }

  const handleUpdateQuantity = (
    productId: string,
    variantId: string | null,
    newQuantity: number
  ) => {
    if (newQuantity < 1) {
      handleRemoveItem(productId, variantId)
      return
    }

    updateCartQuantity(productId, variantId, newQuantity)
    fetchCart()
  }

  const handleCheckout = () => {
    setCheckoutLoading(true)
    
    // Check if user is authenticated
    const auth = localStorage.getItem("demo_authenticated")
    if (auth !== "true") {
      router.push("/auth?redirect=/cart")
      return
    }

    // Simulate checkout - grant entitlements
    if (cart) {
      const currentEntitlements = JSON.parse(
        localStorage.getItem("demo_entitlements") || "[]"
      )
      const newEntitlements = cart.items.map((item) => ({
        productId: item.productId,
        variantId: item.variantId,
      }))
      localStorage.setItem(
        "demo_entitlements",
        JSON.stringify([...currentEntitlements, ...newEntitlements])
      )
    }

    // Clear cart and redirect to success
    clearCart()
    router.push("/checkout/success?session_id=demo_" + Date.now())
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>Loading cart...</p>
      </div>
    )
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>
        <EmptyState
          title="Your cart is empty"
          description="Add some products to get started"
          icon={<ShoppingBag className="h-12 w-12 text-muted-foreground mb-4" />}
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
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-2">Shopping Cart</h1>
        <p className="text-muted-foreground">
          Review your items before checkout
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <AnimatePresence>
            {cart.items.map((item) => (
              <motion.div
                key={`${item.productId}-${item.variantId || "none"}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="border-2">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      {item.product.coverImageUrl && (
                        <Link href={`/product/${item.product.slug}`}>
                          <div className="relative w-28 h-28 rounded-xl overflow-hidden bg-muted flex-shrink-0 shadow-md">
                            <Image
                              src={item.product.coverImageUrl}
                              alt={item.product.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </Link>
                      )}
                      <div className="flex-1">
                        <Link href={`/product/${item.product.slug}`}>
                          <h3 className="font-semibold text-lg hover:text-primary transition-colors">
                            {item.product.title}
                          </h3>
                        </Link>
                        {item.variant && (
                          <p className="text-sm text-muted-foreground mt-1">
                            {item.variant.title}
                          </p>
                        )}
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() =>
                                handleUpdateQuantity(
                                  item.productId,
                                  item.variantId,
                                  item.quantity - 1
                                )
                              }
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="font-medium w-6 text-center">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() =>
                                handleUpdateQuantity(
                                  item.productId,
                                  item.variantId,
                                  item.quantity + 1
                                )
                              }
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          <PriceDisplay
                            priceCents={item.totalCents}
                            className="text-lg font-bold"
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                              handleRemoveItem(item.productId, item.variantId)
                            }
                            className="hover:bg-destructive/10 hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-24 border-2">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <PriceDisplay priceCents={cart.totalCents} />
                </div>
                <div className="flex justify-between font-bold text-xl pt-4 border-t-2">
                  <span>Total</span>
                  <PriceDisplay priceCents={cart.totalCents} variant="large" />
                </div>
              </div>
              <Button
                className="w-full text-base py-6"
                size="lg"
                onClick={handleCheckout}
                disabled={checkoutLoading}
              >
                {checkoutLoading ? "Processing..." : "Proceed to Checkout"}
              </Button>
              <p className="text-xs text-muted-foreground text-center mt-4">
                This is a demo - no real payment will be processed
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
