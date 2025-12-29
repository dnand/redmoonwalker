import { mockBuilds } from "@/lib/mockBuilds"
import { BuildOverview } from "@/components/build/BuildOverview"
import { notFound } from "next/navigation"

// Generate static params for all builds
export function generateStaticParams() {
  return mockBuilds.map((build) => ({
    slug: build.slug,
  }))
}

export default function BuildPage({ params }: { params: { slug: string } }) {
  const build = mockBuilds.find(b => b.slug === params.slug)
  
  if (!build) {
    notFound()
  }

  return <BuildOverview build={build} />
}

