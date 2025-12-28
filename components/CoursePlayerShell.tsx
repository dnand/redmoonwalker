"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, Circle, ChevronRight, BookOpen } from "lucide-react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

interface CoursePlayerShellProps {
  course: any
  userId: string
  progress: any[]
  currentModulePosition: number | null
  currentStepPosition: number | null
  children?: React.ReactNode
}

export function CoursePlayerShell({
  course,
  userId,
  progress,
  currentModulePosition,
  currentStepPosition,
  children,
}: CoursePlayerShellProps) {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const completedStepIds = new Set(
    progress.filter((p) => p.completedAt).map((p) => p.stepId)
  )

  const totalSteps = course.modules.reduce(
    (sum: number, m: any) => sum + m.steps.length,
    0
  )
  const completedSteps = progress.filter((p) => p.completedAt).length
  const progressPercent = totalSteps > 0 ? (completedSteps / totalSteps) * 100 : 0

  const markStepComplete = async (stepId: string) => {
    try {
      const res = await fetch("/api/progress/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId: course.id, stepId }),
      })

      if (res.ok) {
        // Trigger celebration animation
        const celebrateEvent = new CustomEvent("step-complete")
        window.dispatchEvent(celebrateEvent)
        router.refresh()
      }
    } catch (error) {
      console.error("Failed to mark step complete:", error)
    }
  }

  const getNextStep = () => {
    if (!currentModulePosition || !currentStepPosition) return null

    const currentModule = course.modules.find(
      (m: any) => m.position === currentModulePosition
    )
    if (!currentModule) return null

    const currentStepIndex = currentModule.steps.findIndex(
      (s: any) => s.position === currentStepPosition
    )

    // Next step in same module
    if (currentStepIndex < currentModule.steps.length - 1) {
      return {
        modulePos: currentModule.position,
        stepPos: currentModule.steps[currentStepIndex + 1].position,
      }
    }

    // First step in next module
    const nextModuleIndex = course.modules.findIndex(
      (m: any) => m.position === currentModulePosition
    )
    if (nextModuleIndex < course.modules.length - 1) {
      const nextModule = course.modules[nextModuleIndex + 1]
      if (nextModule.steps.length > 0) {
        return {
          modulePos: nextModule.position,
          stepPos: nextModule.steps[0].position,
        }
      }
    }

    return null
  }

  const nextStep = getNextStep()

  return (
    <div className="flex gap-8">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-80" : "w-0"
        } transition-all duration-300 overflow-hidden`}
      >
        <Card className="sticky top-8">
          <CardContent className="p-6">
            <div className="mb-6">
              <Link href={`/learn/${course.slug}`}>
                <h2 className="text-xl font-bold mb-2">{course.title}</h2>
              </Link>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{completedSteps} / {totalSteps}</span>
                </div>
                <Progress value={progressPercent} className="h-2" />
              </div>
            </div>

            <nav className="space-y-4">
              {course.modules.map((module: any) => (
                <div key={module.id}>
                  <h3 className="font-semibold mb-2 flex items-center">
                    <BookOpen className="h-4 w-4 mr-2" />
                    {module.title}
                  </h3>
                  <ul className="space-y-1 ml-6">
                    {module.steps.map((step: any) => {
                      const isActive =
                        currentModulePosition === module.position &&
                        currentStepPosition === step.position
                      const isCompleted = completedStepIds.has(step.id)

                      return (
                        <li key={step.id}>
                          <Link
                            href={`/learn/${course.slug}/${module.position}/${step.position}`}
                            className={`flex items-center space-x-2 text-sm p-2 rounded-md hover:bg-accent ${
                              isActive ? "bg-accent font-medium" : ""
                            }`}
                          >
                            {isCompleted ? (
                              <CheckCircle2 className="h-4 w-4 text-green-500" />
                            ) : (
                              <Circle className="h-4 w-4" />
                            )}
                            <span>{step.title}</span>
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              ))}
            </nav>
          </CardContent>
        </Card>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        {children}

        {currentStepPosition !== null && (
          <div className="max-w-4xl mx-auto mt-8 flex justify-between">
            <Button
              variant="outline"
              onClick={() => {
                const currentModule = course.modules.find(
                  (m: any) => m.position === currentModulePosition
                )
                const currentStep = currentModule?.steps.find(
                  (s: any) => s.position === currentStepPosition
                )
                if (currentStep) {
                  markStepComplete(currentStep.id)
                }
              }}
            >
              Mark Complete
            </Button>

            {nextStep && (
              <Link
                href={`/learn/${course.slug}/${nextStep.modulePos}/${nextStep.stepPos}`}
              >
                <Button>
                  Next Step <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            )}
          </div>
        )}
      </main>
    </div>
  )
}

