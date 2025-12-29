"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Clock, 
  CheckCircle2, 
  Circle, 
  Play, 
  Wrench, 
  Package,
  ChevronRight,
  ChevronDown,
  ArrowRight
} from "lucide-react"
import { BuildWalkthrough, getBuildProgress, getStepsByCategory } from "@/lib/mockBuilds"

interface BuildOverviewProps {
  build: BuildWalkthrough
}

export function BuildOverview({ build }: BuildOverviewProps) {
  const [completedSteps, setCompletedSteps] = useState<string[]>([])
  const [showMaterials, setShowMaterials] = useState(false)
  const [showTools, setShowTools] = useState(false)
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({})

  useEffect(() => {
    setCompletedSteps(getBuildProgress(build.id))
    // Expand all categories by default
    const categories = getStepsByCategory(build)
    const expanded: Record<string, boolean> = {}
    Object.keys(categories).forEach(cat => {
      expanded[cat] = true
    })
    setExpandedCategories(expanded)
  }, [build.id, build])

  const progressPercent = (completedSteps.length / build.steps.length) * 100
  const nextIncompleteStep = build.steps.find(s => !completedSteps.includes(s.id))
  const isStarted = completedSteps.length > 0
  const isComplete = completedSteps.length === build.steps.length

  const stepsByCategory = getStepsByCategory(build)
  const categoryNames = Object.keys(stepsByCategory)

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }))
  }

  const getCategoryProgress = (category: string) => {
    const steps = stepsByCategory[category]
    const completed = steps.filter(s => completedSteps.includes(s.id)).length
    return { completed, total: steps.length }
  }

  const difficultyColors = {
    beginner: "bg-green-100 text-green-700",
    intermediate: "bg-amber-100 text-amber-700",
    advanced: "bg-red-100 text-red-700",
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Hero Section */}
      <div className="relative h-[45vh] min-h-[350px] overflow-hidden">
        <Image
          src={build.coverImageUrl}
          alt={build.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="container mx-auto">
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <Badge className={difficultyColors[build.difficulty]}>
                {build.difficulty}
              </Badge>
              <Badge variant="outline" className="bg-background/80">
                <Clock className="h-3 w-3 mr-1" />
                {build.totalTime}
              </Badge>
              <Badge variant="outline" className="bg-background/80">
                {build.steps.length} steps
              </Badge>
              <Badge variant="outline" className="bg-background/80">
                {categoryNames.length} sections
              </Badge>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {build.title}
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl">
              {build.description}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Progress Bar */}
        {isStarted && (
          <Card className="mb-8 border-primary/20 bg-primary/5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="font-medium">Your Progress</span>
                <span className="text-sm text-muted-foreground">
                  {completedSteps.length} of {build.steps.length} steps
                </span>
              </div>
              <Progress value={progressPercent} className="h-3" />
              {isComplete && (
                <p className="text-sm text-green-600 mt-3 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  Congratulations! You&apos;ve completed this build!
                </p>
              )}
            </CardContent>
          </Card>
        )}

        {/* Start/Continue Button */}
        <div className="mb-8">
          <Link href={`/build/${build.slug}/${nextIncompleteStep?.position || 1}`}>
            <Button size="lg" className="text-lg px-8 py-6 gap-3">
              {isComplete ? (
                <>
                  <Play className="h-5 w-5" />
                  Review Build
                </>
              ) : isStarted ? (
                <>
                  <ArrowRight className="h-5 w-5" />
                  Continue Building - Step {nextIncompleteStep?.position}
                </>
              ) : (
                <>
                  <Play className="h-5 w-5" />
                  Start Building
                </>
              )}
            </Button>
          </Link>
        </div>

        {/* Materials & Tools */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Card>
            <CardContent className="p-6">
              <button
                onClick={() => setShowMaterials(!showMaterials)}
                className="flex items-center justify-between w-full text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Package className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Materials Needed</h3>
                    <p className="text-sm text-muted-foreground">
                      {build.materialsNeeded.length} items
                    </p>
                  </div>
                </div>
                <ChevronRight className={`h-5 w-5 transition-transform ${showMaterials ? 'rotate-90' : ''}`} />
              </button>
              {showMaterials && (
                <ul className="mt-4 space-y-2 border-t pt-4">
                  {build.materialsNeeded.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <Circle className="h-2 w-2 mt-2 flex-shrink-0 fill-current" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <button
                onClick={() => setShowTools(!showTools)}
                className="flex items-center justify-between w-full text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Wrench className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Tools Needed</h3>
                    <p className="text-sm text-muted-foreground">
                      {build.toolsNeeded.length} items
                    </p>
                  </div>
                </div>
                <ChevronRight className={`h-5 w-5 transition-transform ${showTools ? 'rotate-90' : ''}`} />
              </button>
              {showTools && (
                <ul className="mt-4 space-y-2 border-t pt-4">
                  {build.toolsNeeded.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <Circle className="h-2 w-2 mt-2 flex-shrink-0 fill-current" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Steps by Category */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Build Steps</h2>
          <div className="space-y-4">
            {categoryNames.map((category, catIdx) => {
              const { completed, total } = getCategoryProgress(category)
              const isExpanded = expandedCategories[category]
              const categoryComplete = completed === total
              
              return (
                <Card key={category} className={categoryComplete ? "border-green-200 bg-green-50/30" : ""}>
                  <button
                    onClick={() => toggleCategory(category)}
                    className="w-full p-4 flex items-center justify-between text-left hover:bg-muted/50 transition-colors rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                        categoryComplete 
                          ? 'bg-green-100 text-green-600' 
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {categoryComplete ? (
                          <CheckCircle2 className="h-5 w-5" />
                        ) : (
                          <span className="font-semibold text-sm">{catIdx + 1}</span>
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{category}</h3>
                        <p className="text-sm text-muted-foreground">
                          {completed}/{total} steps completed
                        </p>
                      </div>
                    </div>
                    <ChevronDown className={`h-5 w-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                  </button>

                  {isExpanded && (
                    <div className="px-4 pb-4">
                      <div className="space-y-2 border-t pt-4">
                        {stepsByCategory[category].map((step) => {
                          const isCompleted = completedSteps.includes(step.id)
                          const isCurrent = nextIncompleteStep?.id === step.id
                          
                          return (
                            <Link
                              key={step.id}
                              href={`/build/${build.slug}/${step.position}`}
                              className="block"
                            >
                              <div className={`flex items-center gap-4 p-3 rounded-lg transition-all hover:bg-muted ${
                                isCurrent ? 'bg-primary/10 ring-1 ring-primary/30' : ''
                              }`}>
                                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                                  isCompleted 
                                    ? 'bg-green-100 text-green-600' 
                                    : isCurrent 
                                    ? 'bg-primary text-primary-foreground' 
                                    : 'bg-muted text-muted-foreground'
                                }`}>
                                  {isCompleted ? (
                                    <CheckCircle2 className="h-4 w-4" />
                                  ) : (
                                    <span className="font-medium">{step.position}</span>
                                  )}
                                </div>
                                
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2">
                                    <span className={`font-medium text-sm ${isCompleted ? 'text-green-700' : ''}`}>
                                      {step.title}
                                    </span>
                                    {isCurrent && (
                                      <Badge variant="default" className="text-xs">
                                        Next
                                      </Badge>
                                    )}
                                  </div>
                                </div>

                                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                  {step.duration && (
                                    <span className="hidden sm:flex items-center gap-1">
                                      <Clock className="h-3 w-3" />
                                      {step.duration}
                                    </span>
                                  )}
                                  <ChevronRight className="h-4 w-4" />
                                </div>
                              </div>
                            </Link>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
