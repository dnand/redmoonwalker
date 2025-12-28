"use client"

import { Suspense, useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { ProductCard } from "@/components/ProductCard"
import { FacetFilters, FacetFilter } from "@/components/FacetFilters"
import { ProductGridSkeleton } from "@/components/Skeletons"
import { EmptyState } from "@/components/EmptyState"
import { Search } from "lucide-react"
import { ProductType } from "@prisma/client"
import { mockProducts } from "@/lib/mockData"

function getMockFacets(): FacetFilter[] {
  return [
    {
      key: "type",
      label: "Product Type",
      options: [
        { label: "Patterns", value: "PATTERN", count: 3 },
        { label: "Materials", value: "MATERIAL", count: 3 },
        { label: "Guides", value: "GUIDE", count: 3 },
      ],
      multiSelect: true,
    },
    {
      key: "skillLevel",
      label: "Skill Level",
      options: [
        { label: "BEGINNER", value: "BEGINNER", count: 2 },
        { label: "INTERMEDIATE", value: "INTERMEDIATE", count: 2 },
        { label: "ADVANCED", value: "ADVANCED", count: 2 },
      ],
      multiSelect: true,
    },
  ]
}

function filterMockProducts(type?: string | null, q?: string | null, sort?: string | null) {
  let filtered = [...mockProducts]

  if (type) {
    filtered = filtered.filter((p) => p.type === type)
  }

  if (q) {
    const query = q.toLowerCase()
    filtered = filtered.filter(
      (p) =>
        p.title.toLowerCase().includes(query) ||
        p.description?.toLowerCase().includes(query)
    )
  }

  // Sort
  switch (sort) {
    case "price_asc":
      filtered.sort((a, b) => a.priceCents - b.priceCents)
      break
    case "price_desc":
      filtered.sort((a, b) => b.priceCents - a.priceCents)
      break
    case "name_asc":
      filtered.sort((a, b) => a.title.localeCompare(b.title))
      break
    case "name_desc":
      filtered.sort((a, b) => b.title.localeCompare(a.title))
      break
  }

  return filtered
}

function ShopContent() {
  const searchParams = useSearchParams()
  const [products, setProducts] = useState(mockProducts)

  useEffect(() => {
    const type = searchParams.get("type")
    const q = searchParams.get("q")
    const sort = searchParams.get("sort")
    
    const filtered = filterMockProducts(type, q, sort)
    setProducts(filtered)
  }, [searchParams])

  const facets = getMockFacets()

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-3">Shop</h1>
        <p className="text-lg text-muted-foreground">
          Browse our collection of patterns, materials, and guides
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          <div className="sticky top-24">
            <FacetFilters facets={facets} />
          </div>
        </aside>

        <main className="lg:col-span-3">
          {products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  slug={product.slug}
                  title={product.title}
                  description={product.description}
                  coverImageUrl={product.coverImageUrl}
                  priceCents={product.priceCents}
                  currency={product.currency}
                  type={product.type as ProductType}
                  metadata={product.metadata as any}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No products found"
              description="Try adjusting your search or filters to find what you're looking for."
              icon={<Search className="h-12 w-12 text-muted-foreground mb-4" />}
            />
          )}
        </main>
      </div>
    </div>
  )
}

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-12">
        <ProductGridSkeleton />
      </div>
    }>
      <ShopContent />
    </Suspense>
  )
}
