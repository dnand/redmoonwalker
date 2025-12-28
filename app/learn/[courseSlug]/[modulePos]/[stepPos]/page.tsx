import { notFound } from "next/navigation"
import { CoursePlayerShell } from "@/components/CoursePlayerShell"
import { StepBlockRenderer } from "@/components/StepBlockRenderer"
import { mockCourses } from "@/lib/mockCourses"
import { AuthGate } from "@/components/AuthGate"

// Generate static params for all course steps
export function generateStaticParams() {
  const params: { courseSlug: string; modulePos: string; stepPos: string }[] = []
  
  mockCourses.forEach((course) => {
    course.modules.forEach((module) => {
      module.steps.forEach((step) => {
        params.push({
          courseSlug: course.slug,
          modulePos: module.position.toString(),
          stepPos: step.position.toString(),
        })
      })
    })
  })
  
  return params
}

function getCourse(slug: string) {
  const mockCourse = mockCourses.find((c) => c.slug === slug)
  if (mockCourse) {
    return {
      ...mockCourse,
      product: null,
      modules: mockCourse.modules.map((m) => ({
        ...m,
        steps: m.steps.map((s) => ({
          ...s,
          blocks: s.blocks.map((b) => ({
            ...b,
            payload: b.payload as any,
          })),
        })),
      })),
    }
  }
  return null
}

export default function StepPage({
  params,
}: {
  params: { courseSlug: string; modulePos: string; stepPos: string }
}) {
  const course = getCourse(params.courseSlug)
  if (!course) {
    notFound()
  }

  const modulePos = parseInt(params.modulePos)
  const stepPos = parseInt(params.stepPos)

  const courseModule = course.modules.find((m) => m.position === modulePos)
  if (!courseModule) {
    notFound()
  }

  const step = courseModule.steps.find((s) => s.position === stepPos)
  if (!step) {
    notFound()
  }

  const currentUrl = `/learn/${params.courseSlug}/${params.modulePos}/${params.stepPos}`

  return (
    <AuthGate redirectTo={currentUrl}>
      <div className="container mx-auto px-4 py-8">
        <CoursePlayerShell
          course={course as any}
          userId="demo-user"
          progress={[]}
          currentModulePosition={modulePos}
          currentStepPosition={stepPos}
        >
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">{step.title}</h1>
            {step.estimatedMinutes && (
              <p className="text-muted-foreground mb-8">
                Estimated time: {step.estimatedMinutes} minutes
              </p>
            )}

            <div className="space-y-6">
              {step.blocks.map((block) => (
                <StepBlockRenderer
                  key={block.id}
                  type={block.type as any}
                  payload={block.payload as any}
                  isAuthenticated={true}
                  hasAccess={true}
                />
              ))}
            </div>
          </div>
        </CoursePlayerShell>
      </div>
    </AuthGate>
  )
}
