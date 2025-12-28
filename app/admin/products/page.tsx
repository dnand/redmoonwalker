"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  ArrowLeft,
  Package,
  FileText,
  Layers,
  BookOpen
} from "lucide-react"
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

const typeIcons: Record<string, any> = {
  PATTERN: FileText,
  MATERIAL: Layers,
  GUIDE: BookOpen,
}

const typeColors: Record<string, string> = {
  PATTERN: "bg-purple-100 text-purple-700",
  MATERIAL: "bg-orange-100 text-orange-700",
  GUIDE: "bg-green-100 text-green-700",
}

export default function AdminProductsPage() {
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const auth = localStorage.getItem("demo_authenticated")
    if (auth !== "true") {
      router.push("/auth?redirect=/admin/products")
      return
    }

    // Load products from localStorage or use mock data
    const storedProducts = localStorage.getItem("admin_products")
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts))
    } else {
      // Initialize with mock data
      const initialProducts = mockProducts.map(p => ({
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
      setProducts(initialProducts)
      localStorage.setItem("admin_products", JSON.stringify(initialProducts))
    }
    setLoading(false)
  }, [router])

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      const updated = products.filter(p => p.id !== id)
      setProducts(updated)
      localStorage.setItem("admin_products", JSON.stringify(updated))
    }
  }

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.description?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = filterType ? p.type === filterType : true
    return matchesSearch && matchesType
  })

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p>Loading products...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">Products</h1>
          <p className="text-muted-foreground">Manage your store products</p>
        </div>
        <Link href="/admin/products/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={filterType === null ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterType(null)}
          >
            All ({products.length})
          </Button>
          <Button
            variant={filterType === "PATTERN" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterType("PATTERN")}
          >
            Patterns ({products.filter(p => p.type === "PATTERN").length})
          </Button>
          <Button
            variant={filterType === "MATERIAL" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterType("MATERIAL")}
          >
            Materials ({products.filter(p => p.type === "MATERIAL").length})
          </Button>
          <Button
            variant={filterType === "GUIDE" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterType("GUIDE")}
          >
            Guides ({products.filter(p => p.type === "GUIDE").length})
          </Button>
        </div>
      </div>

      {/* Products List */}
      {filteredProducts.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No products found</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery || filterType
                ? "Try adjusting your search or filters"
                : "Get started by adding your first product"}
            </p>
            <Link href="/admin/products/new">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredProducts.map((product) => {
            const TypeIcon = typeIcons[product.type] || Package
            return (
              <Card key={product.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    {/* Image */}
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                      {product.coverImageUrl ? (
                        <Image
                          src={product.coverImageUrl}
                          alt={product.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <TypeIcon className="h-8 w-8 text-muted-foreground" />
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold truncate">{product.title}</h3>
                        <Badge className={typeColors[product.type]}>
                          {product.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {product.description || "No description"}
                      </p>
                      <p className="text-sm font-medium mt-1">
                        ${(product.priceCents / 100).toFixed(2)}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <Link href={`/admin/products/${product.id}`}>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(product.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
