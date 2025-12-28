import { HomePageClient } from "@/components/HomePageClient"
import { mockProducts } from "@/lib/mockData"

export default function HomePage() {
  // Use mock products for static export
  const featuredProducts = mockProducts.slice(0, 8)
  
  return <HomePageClient featuredProducts={featuredProducts} />
}
