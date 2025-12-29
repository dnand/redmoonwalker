"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Clock, Hammer, ChevronRight, CheckCircle2 } from "lucide-react"
import { mockBuilds, getBuildProgress } from "@/lib/mockBuilds"

export default function BuildsPage() {
  const [progressMap, setProgressMap] = useState<Record<string, number>>({})

  useEffect(() => {
    const map: Record<string, number> = {}
    mockBuilds.forEach((build) => {
      const completed = getBuildProgress(build.id)
      map[build.id] = (completed.length / build.steps.length) * 100
    })
    setProgressMap(map)
  }, [])

  const difficultyColors = {
    beginner: "bg-green-100 text-green-700",
    intermediate: "bg-amber-100 text-amber-700",
    advanced: "bg-red-100 text-red-700",
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-br from-orange-50 to-amber-100 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-orange-200/50 text-orange-700 px-4 py-2 rounded-full mb-6">
            <Hammer className="h-4 w-4" />
            <span className="text-sm font-medium">Build Walkthroughs</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Build Your Own Shoes
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Step-by-step walkthroughs that guide you through building complete shoes. 
            Simple instructions, helpful resources, and personal note-taking.
          </p>
        </div>
      </div>

      {/* Builds Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {mockBuilds.map((build) => {
            const progress = progressMap[build.id] || 0
            const isStarted = progress > 0
            const isComplete = progress === 100

            return (
              <Card key={build.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={build.coverImageUrl}
                    alt={build.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={difficultyColors[build.difficulty]}>
                        {build.difficulty}
                      </Badge>
                      <Badge variant="secondary" className="bg-black/50 text-white border-0">
                        <Clock className="h-3 w-3 mr-1" />
                        {build.totalTime}
                      </Badge>
                    </div>
                    <h2 className="text-2xl font-bold text-white">{build.title}</h2>
                  </div>
                  {isComplete && (
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-green-500 text-white gap-1">
                        <CheckCircle2 className="h-3 w-3" />
                        Completed
                      </Badge>
                    </div>
                  )}
                </div>
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {build.description}
                  </p>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <span>{build.steps.length} steps</span>
                    <span>•</span>
                    <span>{build.materialsNeeded.length} materials</span>
                    <span>•</span>
                    <span>{build.toolsNeeded.length} tools</span>
                  </div>

                  {isStarted && (
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span>Progress</span>
                        <span>{Math.round(progress)}%</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>
                  )}

                  <Link href={`/build/${build.slug}`}>
                    <Button className="w-full gap-2">
                      {isComplete ? "Review Build" : isStarted ? "Continue Building" : "Start Building"}
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Coming Soon */}
        <div className="mt-12 text-center">
          <Card className="border-dashed border-2 bg-muted/30">
            <CardContent className="py-12">
              <Hammer className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">More Builds Coming Soon</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                We&apos;re working on more step-by-step build walkthroughs including 
                boots, sandals, and specialty shoes.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

