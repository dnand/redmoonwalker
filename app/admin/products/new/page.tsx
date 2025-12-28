"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Save } from "lucide-react"

interface NewProduct {
  title: string
  slug: string
  description: string
  type: string
  priceCents: number
  currency: string
  coverImageUrl: string
}

export default function NewProductPage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [product, setProduct] = useState<NewProduct>({
    title: "",
    slug: "",
    description: "",
    type: "PATTERN",
    priceCents: 0,
    currency: "usd",
    coverImageUrl: "",
  })

  useEffect(() => {
    const auth = localStorage.getItem("demo_authenticated")
    if (auth !== "true") {
      router.push("/auth?redirect=/admin/products/new")
      return
    }
  }, [router])

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  }

  const handleTitleChange = (title: string) => {
    setProduct({
      ...product,
      title,
      slug: generateSlug(title),
    })
  }

  const handleSave = () => {
    if (!product.title || !product.slug) {
      alert("Please enter a title")
      return
    }

    setSaving(true)

    // Generate unique ID
    const newId = `product-${Date.now()}`
    
    // Load existing products
    const storedProducts = localStorage.getItem("admin_products")
    const products = storedProducts ? JSON.parse(storedProducts) : []
    
    // Add new product
    const newProduct = {
      id: newId,
      ...product,
      status: "PUBLISHED",
      variants: [],
      metadata: {},
    }
    
    products.push(newProduct)
    localStorage.setItem("admin_products", JSON.stringify(products))

    setTimeout(() => {
      setSaving(false)
      router.push("/admin/products")
    }, 500)
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
          <h1 className="text-3xl font-bold">New Product</h1>
          <p className="text-muted-foreground">Create a new product</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Type */}
          <div>
            <label className="text-sm font-medium mb-2 block">Product Type</label>
            <div className="flex gap-2">
              {["PATTERN", "MATERIAL", "GUIDE"].map((type) => (
                <Button
                  key={type}
                  variant={product.type === type ? "default" : "outline"}
                  onClick={() => setProduct({ ...product, type })}
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="text-sm font-medium mb-2 block">Title</label>
            <Input
              value={product.title}
              onChange={(e) => handleTitleChange(e.target.value)}
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
              URL: /product/{product.slug || "..."}
            </p>
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium mb-2 block">Description</label>
            <textarea
              value={product.description}
              onChange={(e) => setProduct({ ...product, description: e.target.value })}
              placeholder="Product description"
              className="w-full min-h-[120px] px-3 py-2 border rounded-md text-sm"
            />
          </div>

          {/* Price */}
          <div>
            <label className="text-sm font-medium mb-2 block">Price ($)</label>
            <Input
              type="number"
              step="0.01"
              value={(product.priceCents / 100).toFixed(2)}
              onChange={(e) => setProduct({ ...product, priceCents: Math.round(parseFloat(e.target.value || "0") * 100) })}
              placeholder="49.99"
            />
          </div>

          {/* Cover Image URL */}
          <div>
            <label className="text-sm font-medium mb-2 block">Cover Image URL</label>
            <Input
              value={product.coverImageUrl}
              onChange={(e) => setProduct({ ...product, coverImageUrl: e.target.value })}
              placeholder="https://images.unsplash.com/..."
            />
            <p className="text-xs text-muted-foreground mt-1">
              Use an Unsplash URL or any public image URL
            </p>
          </div>

          {/* Save Button */}
          <div className="pt-4 border-t">
            <Button onClick={handleSave} disabled={saving} className="w-full">
              <Save className="h-4 w-4 mr-2" />
              {saving ? "Creating..." : "Create Product"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
