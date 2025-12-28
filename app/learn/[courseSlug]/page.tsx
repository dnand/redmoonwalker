import { notFound } from "next/navigation"
import { mockCourses } from "@/lib/mockCourses"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CourseRedirect } from "@/components/CourseRedirect"

// Generate static params for all courses
export function generateStaticParams() {
  return mockCourses.map((course) => ({
    courseSlug: course.slug,
  }))
}

export default function CoursePage({
  params,
}: {
  params: { courseSlug: string }
}) {
  const course = mockCourses.find((c) => c.slug === params.courseSlug)
  
  if (!course) {
    notFound()
  }

  // If course has content, redirect to first step (client-side)
  if (course.modules.length > 0 && course.modules[0].steps.length > 0) {
    const firstStepUrl = `/learn/${params.courseSlug}/${course.modules[0].position}/${course.modules[0].steps[0].position}`
    return <CourseRedirect to={firstStepUrl} courseTitle={course.title} />
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <Card>
        <CardContent className="p-12 text-center">
          <h1 className="text-2xl font-bold mb-4">{course.title}</h1>
          <p className="text-muted-foreground mb-6">
            This course has no content yet.
          </p>
          <Link href="/shop/guides">
            <Button>Browse Guides</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
