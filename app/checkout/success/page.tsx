"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"

function CheckoutSuccessContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { toast } = useToast()
  const [clearingCart, setClearingCart] = useState(false)

  useEffect(() => {
    // Clear cart on success
    const clearCart = async () => {
      setClearingCart(true)
      try {
        // Cart will be cleared by removing the cookie
        // In a real app, you might want to call an API endpoint
        document.cookie = "cart=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
      } catch (error) {
        console.error("Failed to clear cart:", error)
      } finally {
        setClearingCart(false)
      }
    }

    clearCart()
  }, [])

  return (
    <div className="container mx-auto px-4 py-16">
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-12 text-center">
          <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
          <p className="text-muted-foreground mb-8">
            Thank you for your purchase. Your order has been confirmed and you
            now have access to your purchased content.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/library">
              <Button size="lg">View My Library</Button>
            </Link>
            <Link href="/shop">
              <Button size="lg" variant="outline">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-16">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-12 text-center">
            <p>Loading...</p>
          </CardContent>
        </Card>
      </div>
    }>
      <CheckoutSuccessContent />
    </Suspense>
  )
}

