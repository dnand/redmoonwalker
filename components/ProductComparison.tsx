"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, Plus } from "lucide-react"
import { mockProducts } from "@/lib/mockData"
import { PriceDisplay } from "./PriceDisplay"
import Image from "next/image"
import Link from "next/link"

export function ProductComparison() {
  const [compareList, setCompareList] = useState<string[]>([])

  useEffect(() => {
    const stored = localStorage.getItem("demo_compare")
    if (stored) {
      setCompareList(JSON.parse(stored))
    }
  }, [])

  const products = mockProducts.filter((p) => compareList.includes(p.id))

  const removeFromCompare = (productId: string) => {
    const updated = compareList.filter((id) => id !== productId)
    setCompareList(updated)
    localStorage.setItem("demo_compare", JSON.stringify(updated))
  }

  if (products.length === 0) {
    return null
  }

  // Get all unique metadata keys
  const allKeys = new Set<string>()
  products.forEach((product) => {
    if (product.metadata) {
      Object.keys(product.metadata).forEach((key) => allKeys.add(key))
    }
  })

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t-2 shadow-lg z-50 p-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Comparing {products.length} products</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setCompareList([])
              localStorage.removeItem("demo_compare")
            }}
          >
            Clear All
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 overflow-x-auto">
          {products.map((product) => (
            <Card key={product.id} className="border-2">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-sm line-clamp-2">{product.title}</h4>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => removeFromCompare(product.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                {product.coverImageUrl && (
                  <div className="relative aspect-square w-full mb-3 rounded overflow-hidden">
                    <Image
                      src={product.coverImageUrl}
                      alt={product.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <PriceDisplay priceCents={product.priceCents} className="mb-2" />
                <Badge variant="secondary" className="text-xs mb-3">
                  {product.type}
                </Badge>
                <div className="space-y-1 text-xs">
                  {Array.from(allKeys).map((key) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-muted-foreground capitalize">{key}:</span>
                      <span className="font-medium">
                        {(product.metadata as any)?.[key] || "—"}
                      </span>
                    </div>
                  ))}
                </div>
                <Link href={`/product/${product.slug}`} className="mt-3 block">
                  <Button size="sm" className="w-full">View Details</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

