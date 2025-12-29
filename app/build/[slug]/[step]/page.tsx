import { mockBuilds } from "@/lib/mockBuilds"
import { BuildStepView } from "@/components/build/BuildStepView"
import { notFound } from "next/navigation"

// Generate static params for all build steps
export function generateStaticParams() {
  const params: { slug: string; step: string }[] = []
  
  mockBuilds.forEach((build) => {
    build.steps.forEach((step) => {
      params.push({
        slug: build.slug,
        step: step.position.toString(),
      })
    })
  })
  
  return params
}

export default function BuildStepPage({ 
  params 
}: { 
  params: { slug: string; step: string } 
}) {
  const build = mockBuilds.find(b => b.slug === params.slug)
  
  if (!build) {
    notFound()
  }

  const stepNum = parseInt(params.step)
  const step = build.steps.find(s => s.position === stepNum)
  
  if (!step) {
    notFound()
  }

  return <BuildStepView build={build} step={step} />
}

