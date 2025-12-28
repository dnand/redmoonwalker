"use client"

import { Suspense, useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { ProductCard } from "@/components/ProductCard"
import { ProductGridSkeleton } from "@/components/Skeletons"
import { EmptyState } from "@/components/EmptyState"
import { Search } from "lucide-react"
import { mockProducts } from "@/lib/mockData"
import { ProductType } from "@prisma/client"
import Link from "next/link"

function SearchContent() {
  const searchParams = useSearchParams()
  const [products, setProducts] = useState<typeof mockProducts>([])
  const [typeCounts, setTypeCounts] = useState({ PATTERN: 0, MATERIAL: 0, GUIDE: 0 })
  
  const query = searchParams.get("q") || ""
  const typeFilter = searchParams.get("type") || ""

  useEffect(() => {
    if (!query) {
      setProducts([])
      setTypeCounts({ PATTERN: 0, MATERIAL: 0, GUIDE: 0 })
      return
    }

    const lowerQuery = query.toLowerCase()
    
    // Filter products
    const filtered = mockProducts.filter((product) => {
      const matchesQuery =
        product.title.toLowerCase().includes(lowerQuery) ||
        product.description?.toLowerCase().includes(lowerQuery) ||
        (product.metadata && JSON.stringify(product.metadata).toLowerCase().includes(lowerQuery))
      
      const matchesType = typeFilter ? product.type === typeFilter : true
      
      return matchesQuery && matchesType
    })

    // Calculate type counts based on query (before type filter)
    const allMatching = mockProducts.filter((product) => 
      product.title.toLowerCase().includes(lowerQuery) ||
      product.description?.toLowerCase().includes(lowerQuery)
    )
    
    setTypeCounts({
      PATTERN: allMatching.filter((p) => p.type === ProductType.PATTERN).length,
      MATERIAL: allMatching.filter((p) => p.type === ProductType.MATERIAL).length,
      GUIDE: allMatching.filter((p) => p.type === ProductType.GUIDE).length,
    })

    // Sort by relevance (title matches first)
    filtered.sort((a, b) => {
      const aTitleMatch = a.title.toLowerCase().includes(lowerQuery) ? 1 : 0
      const bTitleMatch = b.title.toLowerCase().includes(lowerQuery) ? 1 : 0
      return bTitleMatch - aTitleMatch
    })

    setProducts(filtered)
  }, [query, typeFilter])

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-3">
          {query ? `Search Results for "${query}"` : "Search"}
        </h1>
        {query && (
          <p className="text-lg text-muted-foreground">
            Found {products.length} {products.length === 1 ? "result" : "results"}
          </p>
        )}
      </div>

      {!query ? (
        <EmptyState
          title="Search for products"
          description="Enter a search term to find patterns, materials, and guides"
          icon={<Search className="h-12 w-12 text-muted-foreground mb-4" />}
        />
      ) : products.length === 0 ? (
        <EmptyState
          title="No results found"
          description={`We couldn't find any products matching "${query}". Try a different search term.`}
          icon={<Search className="h-12 w-12 text-muted-foreground mb-4" />}
        />
      ) : (
        <div className="space-y-6">
          {/* Type filters */}
          <div className="flex flex-wrap gap-2">
            <Link
              href={`/search?q=${encodeURIComponent(query)}`}
              className={`px-4 py-2 rounded-lg border transition-colors ${
                !typeFilter
                  ? "bg-primary text-primary-foreground"
                  : "bg-background hover:bg-muted"
              }`}
            >
              All ({typeCounts.PATTERN + typeCounts.MATERIAL + typeCounts.GUIDE})
            </Link>
            <Link
              href={`/search?q=${encodeURIComponent(query)}&type=PATTERN`}
              className={`px-4 py-2 rounded-lg border transition-colors ${
                typeFilter === "PATTERN"
                  ? "bg-primary text-primary-foreground"
                  : "bg-background hover:bg-muted"
              }`}
            >
              Patterns ({typeCounts.PATTERN})
            </Link>
            <Link
              href={`/search?q=${encodeURIComponent(query)}&type=MATERIAL`}
              className={`px-4 py-2 rounded-lg border transition-colors ${
                typeFilter === "MATERIAL"
                  ? "bg-primary text-primary-foreground"
                  : "bg-background hover:bg-muted"
              }`}
            >
              Materials ({typeCounts.MATERIAL})
            </Link>
            <Link
              href={`/search?q=${encodeURIComponent(query)}&type=GUIDE`}
              className={`px-4 py-2 rounded-lg border transition-colors ${
                typeFilter === "GUIDE"
                  ? "bg-primary text-primary-foreground"
                  : "bg-background hover:bg-muted"
              }`}
            >
              Guides ({typeCounts.GUIDE})
            </Link>
          </div>

          {/* Results */}
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
        </div>
      )}
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-8">Search</h1>
        <ProductGridSkeleton />
      </div>
    }>
      <SearchContent />
    </Suspense>
  )
}
