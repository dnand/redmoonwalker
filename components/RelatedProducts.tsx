import { ProductCard } from "@/components/ProductCard"
import { mockProducts } from "@/lib/mockData"
import { ProductType } from "@prisma/client"

interface RelatedProductsProps {
  currentProductId: string
  productType: string
}

export function RelatedProducts({ currentProductId, productType }: RelatedProductsProps) {
  // Get related products (same type, excluding current)
  const related = mockProducts
    .filter((p) => p.type === productType && p.id !== currentProductId)
    .slice(0, 4)

  if (related.length === 0) return null

  return (
    <div className="mt-16 pt-16 border-t">
      <h2 className="text-2xl font-semibold mb-6">You May Also Like</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {related.map((product) => (
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
  )
}

