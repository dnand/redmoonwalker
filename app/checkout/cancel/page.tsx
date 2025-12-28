import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { XCircle } from "lucide-react"

export default function CheckoutCancelPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-12 text-center">
          <XCircle className="h-16 w-16 text-destructive mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-4">Payment Cancelled</h1>
          <p className="text-muted-foreground mb-8">
            Your payment was cancelled. No charges were made.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/cart">
              <Button size="lg">Return to Cart</Button>
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

