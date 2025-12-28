"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Save } from "lucide-react"
import { mockProducts } from "@/lib/mockData"

interface Product {
  id: string
  title: string
  slug: string
  description: string | null
  type: string
  priceCents: number
  currency: string
  coverImageUrl: string | null
  status?: string
}

interface EditProductFormProps {
  productId: string
}

export function EditProductForm({ productId }: EditProductFormProps) {
  const router = useRouter()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const auth = localStorage.getItem("demo_authenticated")
    if (auth !== "true") {
      router.push("/auth?redirect=/admin/products/" + productId)
      return
    }

    // Load products from localStorage
    const storedProducts = localStorage.getItem("admin_products")
    let products: Product[] = []
    
    if (storedProducts) {
      products = JSON.parse(storedProducts)
    } else {
      products = mockProducts.map(p => ({
        id: p.id,
        title: p.title,
        slug: p.slug,
        description: p.description,
        type: p.type,
        priceCents: p.priceCents,
        currency: p.currency,
        coverImageUrl: p.coverImageUrl,
        status: "PUBLISHED",
      }))
    }

    const found = products.find(p => p.id === productId)
    if (found) {
      setProduct(found)
    } else {
      router.push("/admin/products")
    }
    setLoading(false)
  }, [productId, router])

  const handleSave = () => {
    if (!product) return
    
    setSaving(true)
    
    // Update in localStorage
    const storedProducts = localStorage.getItem("admin_products")
    let products: Product[] = storedProducts ? JSON.parse(storedProducts) : []
    
    const index = products.findIndex(p => p.id === product.id)
    if (index >= 0) {
      products[index] = product
    }
    
    localStorage.setItem("admin_products", JSON.stringify(products))
    
    setTimeout(() => {
      setSaving(false)
      alert("Product saved successfully!")
    }, 500)
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p>Loading product...</p>
      </div>
    )
  }

  if (!product) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/products">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">Edit Product</h1>
          <p className="text-muted-foreground">Update product details</p>
        </div>
        <Badge variant="secondary">{product.type}</Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Title */}
          <div>
            <label className="text-sm font-medium mb-2 block">Title</label>
            <Input
              value={product.title}
              onChange={(e) => setProduct({ ...product, title: e.target.value })}
              placeholder="Product title"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="text-sm font-medium mb-2 block">Slug</label>
            <Input
              value={product.slug}
              onChange={(e) => setProduct({ ...product, slug: e.target.value })}
              placeholder="product-slug"
            />
            <p className="text-xs text-muted-foreground mt-1">
              URL: /product/{product.slug}
            </p>
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium mb-2 block">Description</label>
            <textarea
              value={product.description || ""}
              onChange={(e) => setProduct({ ...product, description: e.target.value })}
              placeholder="Product description"
              className="w-full min-h-[120px] px-3 py-2 border rounded-md text-sm"
            />
          </div>

          {/* Price */}
          <div>
            <label className="text-sm font-medium mb-2 block">Price (cents)</label>
            <Input
              type="number"
              value={product.priceCents}
              onChange={(e) => setProduct({ ...product, priceCents: parseInt(e.target.value) || 0 })}
              placeholder="4999"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Display price: ${(product.priceCents / 100).toFixed(2)}
            </p>
          </div>

          {/* Cover Image URL */}
          <div>
            <label className="text-sm font-medium mb-2 block">Cover Image URL</label>
            <Input
              value={product.coverImageUrl || ""}
              onChange={(e) => setProduct({ ...product, coverImageUrl: e.target.value })}
              placeholder="https://images.unsplash.com/..."
            />
            <p className="text-xs text-muted-foreground mt-1">
              Use an Unsplash URL or any public image URL
            </p>
          </div>

          {/* Type (Read-only) */}
          <div>
            <label className="text-sm font-medium mb-2 block">Type</label>
            <Input value={product.type} disabled />
            <p className="text-xs text-muted-foreground mt-1">
              Product type cannot be changed
            </p>
          </div>

          {/* Save Button */}
          <div className="pt-4 border-t">
            <Button onClick={handleSave} disabled={saving} className="w-full">
              <Save className="h-4 w-4 mr-2" />
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

