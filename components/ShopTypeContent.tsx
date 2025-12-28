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

const typeMap: Record<string, ProductType> = {
  patterns: ProductType.PATTERN,
  pattern: ProductType.PATTERN,
  materials: ProductType.MATERIAL,
  material: ProductType.MATERIAL,
  guides: ProductType.GUIDE,
  guide: ProductType.GUIDE,
}

const typeLabels: Record<string, string> = {
  patterns: "Patterns",
  materials: "Materials",
  guides: "Guides",
}

function TypeContentInner({ type }: { type: string }) {
  const searchParams = useSearchParams()
  const [products, setProducts] = useState<typeof mockProducts>([])

  const productType = typeMap[type.toLowerCase()]
  const typeLabel = typeLabels[type.toLowerCase()] || type.charAt(0).toUpperCase() + type.slice(1)

  useEffect(() => {
    if (!productType) return

    let filtered = mockProducts.filter((p) => p.type === productType)

    // Apply search filter
    const q = searchParams.get("q")
    if (q) {
      const query = q.toLowerCase()
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.description?.toLowerCase().includes(query)
      )
    }

    // Apply skill level filter
    const skillLevels = searchParams.getAll("skillLevel")
    if (skillLevels.length > 0) {
      filtered = filtered.filter((p) =>
        p.variants.some((v) => skillLevels.includes(v.skillLevel || ""))
      )
    }

    // Apply sorting
    const sort = searchParams.get("sort")
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

    setProducts(filtered)
  }, [searchParams, productType])

  if (!productType) {
    return null
  }

  const facets: FacetFilter[] = [
    {
      key: "skillLevel",
      label: "Skill Level",
      options: [
        { label: "Beginner", value: "BEGINNER", count: 1 },
        { label: "Intermediate", value: "INTERMEDIATE", count: 1 },
        { label: "Advanced", value: "ADVANCED", count: 1 },
      ],
      multiSelect: true,
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-3">{typeLabel}</h1>
        <p className="text-lg text-muted-foreground">
          Browse our collection of {typeLabel.toLowerCase()}
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

export function ShopTypeContent({ type }: { type: string }) {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Loading...</h1>
        </div>
        <ProductGridSkeleton />
      </div>
    }>
      <TypeContentInner type={type} />
    </Suspense>
  )
}

