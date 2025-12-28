"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, RefreshCw, Trash2, Database, ShoppingCart, Heart, BookOpen } from "lucide-react"
import { mockProducts } from "@/lib/mockData"

export default function AdminSettingsPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    products: 0,
    cart: 0,
    wishlist: 0,
    entitlements: 0,
  })

  useEffect(() => {
    const auth = localStorage.getItem("demo_authenticated")
    if (auth !== "true") {
      router.push("/auth?redirect=/admin/settings")
      return
    }
    
    updateStats()
    setLoading(false)
  }, [router])

  const updateStats = () => {
    const products = localStorage.getItem("admin_products")
    const cart = localStorage.getItem("redmoon_cart")
    const wishlist = localStorage.getItem("wishlist")
    const entitlements = localStorage.getItem("demo_entitlements")

    setStats({
      products: products ? JSON.parse(products).length : 0,
      cart: cart ? JSON.parse(cart).length : 0,
      wishlist: wishlist ? JSON.parse(wishlist).length : 0,
      entitlements: entitlements ? JSON.parse(entitlements).length : 0,
    })
  }

  const resetProducts = () => {
    if (confirm("Reset all products to default mock data? This cannot be undone.")) {
      localStorage.removeItem("admin_products")
      updateStats()
      alert("Products reset to default!")
    }
  }

  const clearCart = () => {
    if (confirm("Clear the shopping cart?")) {
      localStorage.removeItem("redmoon_cart")
      updateStats()
      alert("Cart cleared!")
    }
  }

  const clearWishlist = () => {
    if (confirm("Clear the wishlist?")) {
      localStorage.removeItem("wishlist")
      updateStats()
      alert("Wishlist cleared!")
    }
  }

  const clearEntitlements = () => {
    if (confirm("Clear all purchased items/entitlements? Users will lose access to purchased content.")) {
      localStorage.removeItem("demo_entitlements")
      updateStats()
      alert("Entitlements cleared!")
    }
  }

  const resetAll = () => {
    if (confirm("Reset ALL data? This will clear products, cart, wishlist, entitlements, and log you out.")) {
      localStorage.clear()
      router.push("/")
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p>Loading settings...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage demo data and reset options</p>
        </div>
      </div>

      {/* Data Overview */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Local Storage Data
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <p className="text-2xl font-bold">{stats.products || mockProducts.length}</p>
              <p className="text-sm text-muted-foreground">Products</p>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <p className="text-2xl font-bold">{stats.cart}</p>
              <p className="text-sm text-muted-foreground">Cart Items</p>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <p className="text-2xl font-bold">{stats.wishlist}</p>
              <p className="text-sm text-muted-foreground">Wishlist</p>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <p className="text-2xl font-bold">{stats.entitlements}</p>
              <p className="text-sm text-muted-foreground">Purchases</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reset Options */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Reset Options</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <Database className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Reset Products</p>
                <p className="text-sm text-muted-foreground">Restore default mock products</p>
              </div>
            </div>
            <Button variant="outline" onClick={resetProducts}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <ShoppingCart className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Clear Cart</p>
                <p className="text-sm text-muted-foreground">Empty the shopping cart</p>
              </div>
            </div>
            <Button variant="outline" onClick={clearCart}>
              <Trash2 className="h-4 w-4 mr-2" />
              Clear
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <Heart className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Clear Wishlist</p>
                <p className="text-sm text-muted-foreground">Remove all wishlist items</p>
              </div>
            </div>
            <Button variant="outline" onClick={clearWishlist}>
              <Trash2 className="h-4 w-4 mr-2" />
              Clear
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <BookOpen className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Clear Purchases</p>
                <p className="text-sm text-muted-foreground">Remove all entitlements/access</p>
              </div>
            </div>
            <Button variant="outline" onClick={clearEntitlements}>
              <Trash2 className="h-4 w-4 mr-2" />
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="text-red-600">Danger Zone</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50">
            <div>
              <p className="font-medium text-red-700">Reset Everything</p>
              <p className="text-sm text-red-600">Clear all data and log out</p>
            </div>
            <Button variant="destructive" onClick={resetAll}>
              Reset All Data
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

