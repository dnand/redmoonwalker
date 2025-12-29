"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  CheckCircle2,
  Lightbulb,
  BookOpen,
  Video,
  FileText,
  StickyNote,
  Save,
  List
} from "lucide-react"
import { 
  BuildWalkthrough, 
  BuildStep,
  getBuildProgress,
  markStepComplete,
  getBuildNotes,
  saveBuildNote
} from "@/lib/mockBuilds"
import { useToast } from "@/components/ui/use-toast"

interface BuildStepViewProps {
  build: BuildWalkthrough
  step: BuildStep
}

export function BuildStepView({ build, step }: BuildStepViewProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [completedSteps, setCompletedSteps] = useState<string[]>([])
  const [note, setNote] = useState("")
  const [showNotes, setShowNotes] = useState(false)

  useEffect(() => {
    setCompletedSteps(getBuildProgress(build.id))
    const notes = getBuildNotes(build.id)
    setNote(notes[step.id] || "")
  }, [build.id, step.id])

  const isCompleted = completedSteps.includes(step.id)
  const progressPercent = (completedSteps.length / build.steps.length) * 100
  
  const prevStep = build.steps.find(s => s.position === step.position - 1)
  const nextStep = build.steps.find(s => s.position === step.position + 1)

  const handleComplete = () => {
    markStepComplete(build.id, step.id)
    setCompletedSteps([...completedSteps, step.id])
    
    toast({
      title: "Step completed!",
      description: nextStep 
        ? "Moving to the next step..." 
        : "Congratulations! You finished the build!",
    })

    if (nextStep) {
      setTimeout(() => {
        router.push(`/build/${build.slug}/${nextStep.position}`)
      }, 500)
    }
  }

  const handleSaveNote = () => {
    saveBuildNote(build.id, step.id, note)
    toast({
      title: "Note saved",
      description: "Your note has been saved for this step.",
    })
  }

  const resourceIcons = {
    video: Video,
    guide: BookOpen,
    article: FileText,
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Top Navigation Bar */}
      <div className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <Link href={`/build/${build.slug}`} className="flex items-center gap-2 text-sm hover:text-primary">
              <List className="h-4 w-4" />
              <span className="hidden sm:inline">{build.title}</span>
              <span className="sm:hidden">All Steps</span>
            </Link>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Step {step.position} of {build.steps.length}
              </span>
              <div className="w-24 hidden sm:block">
                <Progress value={progressPercent} className="h-2" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Step Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            {step.category && (
              <Badge variant="outline" className="text-xs bg-muted">
                {step.category}
              </Badge>
            )}
            <Badge variant="outline" className="text-base px-3 py-1">
              Step {step.position}
            </Badge>
            {step.duration && (
              <Badge variant="secondary" className="gap-1">
                <Clock className="h-3 w-3" />
                {step.duration}
              </Badge>
            )}
            {isCompleted && (
              <Badge className="bg-green-100 text-green-700 gap-1">
                <CheckCircle2 className="h-3 w-3" />
                Completed
              </Badge>
            )}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {step.title}
          </h1>
        </div>

        {/* Step Image */}
        {step.imageUrl && (
          <div className="relative aspect-video rounded-xl overflow-hidden mb-8 bg-muted">
            <Image
              src={step.imageUrl}
              alt={step.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* Main Instruction */}
        <Card className="mb-6 border-2 border-primary/20 bg-primary/5">
          <CardContent className="p-6">
            <p className="text-xl leading-relaxed">
              {step.instruction}
            </p>
          </CardContent>
        </Card>

        {/* Additional Details */}
        {step.details && (
          <Card className="mb-6">
            <CardContent className="p-6">
              <p className="text-muted-foreground leading-relaxed">
                {step.details}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Tips */}
        {step.tips && step.tips.length > 0 && (
          <Card className="mb-6 border-amber-200 bg-amber-50">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2 text-amber-700">
                <Lightbulb className="h-5 w-5" />
                Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="space-y-2">
                {step.tips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-amber-800">
                    <span className="text-amber-500 mt-1">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Resources */}
        {step.resources.length > 0 && (
          <Card className="mb-6 border-blue-200 bg-blue-50">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2 text-blue-700">
                <BookOpen className="h-5 w-5" />
                Helpful Resources
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                {step.resources.map((resource) => {
                  const Icon = resourceIcons[resource.type]
                  return (
                    <Link
                      key={resource.id}
                      href={resource.link}
                      className="flex items-center gap-3 p-3 rounded-lg bg-white border border-blue-100 hover:border-blue-300 transition-colors"
                    >
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Icon className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-blue-900">{resource.title}</p>
                        <p className="text-sm text-blue-600">{resource.description}</p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-blue-400" />
                    </Link>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Personal Notes */}
        <Card className="mb-8">
          <CardHeader className="pb-3">
            <button
              onClick={() => setShowNotes(!showNotes)}
              className="flex items-center justify-between w-full"
            >
              <CardTitle className="text-lg flex items-center gap-2">
                <StickyNote className="h-5 w-5" />
                My Notes
                {note && <Badge variant="secondary" className="text-xs">Has notes</Badge>}
              </CardTitle>
              <ChevronRight className={`h-5 w-5 transition-transform ${showNotes ? 'rotate-90' : ''}`} />
            </button>
          </CardHeader>
          {showNotes && (
            <CardContent className="pt-0">
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Add your personal notes for this step... (e.g., things to remember, adjustments you made, etc.)"
                className="w-full min-h-[120px] p-3 border rounded-lg text-sm resize-y focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <Button onClick={handleSaveNote} size="sm" className="mt-3">
                <Save className="h-4 w-4 mr-2" />
                Save Note
              </Button>
            </CardContent>
          )}
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between gap-4 py-8 border-t">
          {prevStep ? (
            <Link href={`/build/${build.slug}/${prevStep.position}`}>
              <Button variant="outline" size="lg" className="gap-2">
                <ChevronLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Previous:</span> {prevStep.title.slice(0, 20)}...
              </Button>
            </Link>
          ) : (
            <Link href={`/build/${build.slug}`}>
              <Button variant="outline" size="lg" className="gap-2">
                <ChevronLeft className="h-4 w-4" />
                Overview
              </Button>
            </Link>
          )}

          {!isCompleted ? (
            <Button onClick={handleComplete} size="lg" className="gap-2">
              <CheckCircle2 className="h-4 w-4" />
              Mark Complete
            </Button>
          ) : nextStep ? (
            <Link href={`/build/${build.slug}/${nextStep.position}`}>
              <Button size="lg" className="gap-2">
                Next Step
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          ) : (
            <Link href={`/build/${build.slug}`}>
              <Button size="lg" className="gap-2 bg-green-600 hover:bg-green-700">
                <CheckCircle2 className="h-4 w-4" />
                View Completed Build
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

