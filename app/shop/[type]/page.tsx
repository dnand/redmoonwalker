import { notFound } from "next/navigation"
import { ShopTypeContent } from "@/components/ShopTypeContent"
import { ProductType } from "@prisma/client"

interface PageProps {
  params: { type: string }
}

const validTypes = ["patterns", "materials", "guides"]

// Generate static params for product type pages
export function generateStaticParams() {
  return [
    { type: "patterns" },
    { type: "materials" },
    { type: "guides" },
  ]
}

export default function TypePage({ params }: PageProps) {
  if (!validTypes.includes(params.type.toLowerCase())) {
    notFound()
  }

  return <ShopTypeContent type={params.type} />
}
