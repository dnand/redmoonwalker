import { notFound } from "next/navigation"
import { ProductGallery } from "@/components/ProductGallery"
import { AccessGate } from "@/components/AccessGate"
import { PriceDisplay } from "@/components/PriceDisplay"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { mockProducts } from "@/lib/mockData"
import { ProductType } from "@prisma/client"
import { RelatedProducts } from "@/components/RelatedProducts"
import { ProductReviews } from "@/components/ProductReviews"
import { CompareButton } from "@/components/CompareButton"
import { WishlistButton } from "@/components/WishlistButton"
import { ProductSpecs } from "@/components/ProductSpecs"

// Generate static params for all products
export async function generateStaticParams() {
  return mockProducts.map((product) => ({
    slug: product.slug,
  }))
}

async function getProduct(slug: string) {
  // Use mock data for static export
  const mockProduct = mockProducts.find((p) => p.slug === slug)
  if (mockProduct) {
    return {
      ...mockProduct,
      gallery: [],
      course: null,
      variants: mockProduct.variants || [],
    }
  }

  return null
}

export default async function ProductDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const product = await getProduct(params.slug)

  if (!product) {
    notFound()
  }

  const images = product.gallery.length > 0
    ? product.gallery
    : product.coverImageUrl
    ? [product.coverImageUrl]
    : []

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
        {/* Image Gallery */}
        <div>
          <ProductGallery images={images} title={product.title} />
        </div>

        {/* Product Info */}
        <div className="space-y-8">
          <div>
            <div className="flex items-start justify-between mb-4">
              <Badge variant="secondary" className="px-3 py-1 text-xs">
                {product.type as string}
              </Badge>
              <WishlistButton productId={product.id} variant="outline" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">{product.title}</h1>
            <PriceDisplay
              priceCents={product.priceCents}
              currency={product.currency}
              variant="large"
              className="mb-6"
            />
          </div>

          {product.description && (
            <div>
              <h2 className="text-xl font-semibold mb-3">Description</h2>
              <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
                {product.description}
              </p>
            </div>
          )}

          {/* Product Specifications */}
          <ProductSpecs product={product} />

          {product.variants && product.variants.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Variants</h2>
              <div className="space-y-3">
                {product.variants.map((variant: any) => (
                  <div
                    key={variant.id}
                    className="border-2 rounded-xl p-4 flex justify-between items-center hover:border-primary/50 transition-colors bg-card"
                  >
                    <div>
                      <p className="font-medium text-base">{variant.title}</p>
                      {variant.skillLevel && (
                        <Badge variant="outline" className="mt-2 text-xs">
                          {variant.skillLevel}
                        </Badge>
                      )}
                    </div>
                    {variant.priceCents && (
                      <PriceDisplay
                        priceCents={variant.priceCents}
                        currency={product.currency}
                        className="font-bold"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <Separator className="my-8" />

          <div className="sticky top-24 space-y-4">
            <AccessGate
              productId={product.id}
              productSlug={product.slug}
              productType={product.type as ProductType}
              priceCents={product.priceCents}
              currency={product.currency}
            />
            <CompareButton productId={product.id} className="w-full" />
          </div>

          {/* Related Products */}
          <RelatedProducts currentProductId={product.id} productType={product.type} />
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-16">
        <ProductReviews productId={product.id} />
      </div>
    </div>
  )
}

