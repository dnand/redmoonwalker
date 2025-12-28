import { mockProducts } from "@/lib/mockData"
import { EditProductForm } from "@/components/admin/EditProductForm"

// Generate static params for all products
export function generateStaticParams() {
  return mockProducts.map((product) => ({
    id: product.id,
  }))
}

export default function EditProductPage({ params }: { params: { id: string } }) {
  return <EditProductForm productId={params.id} />
}
