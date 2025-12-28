"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, BookOpen, Layers, FileText, Eye } from "lucide-react"
import { mockCourses } from "@/lib/mockCourses"

export default function AdminCoursesPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const auth = localStorage.getItem("demo_authenticated")
    if (auth !== "true") {
      router.push("/auth?redirect=/admin/courses")
      return
    }
    setLoading(false)
  }, [router])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p>Loading courses...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">Courses</h1>
          <p className="text-muted-foreground">Manage course content and modules</p>
        </div>
      </div>

      {/* Info Note */}
      <Card className="mb-6 border-blue-200 bg-blue-50">
        <CardContent className="p-4">
          <p className="text-sm text-blue-700">
            <strong>Note:</strong> Course content is defined in <code className="bg-blue-100 px-1 rounded">lib/mockCourses.ts</code>. 
            To add or edit courses, modify that file directly and redeploy.
          </p>
        </CardContent>
      </Card>

      {/* Courses List */}
      <div className="space-y-4">
        {mockCourses.map((course) => {
          const totalSteps = course.modules.reduce((acc, m) => acc + m.steps.length, 0)
          return (
            <Card key={course.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <BookOpen className="h-5 w-5 text-primary" />
                      <h3 className="text-xl font-semibold">{course.title}</h3>
                    </div>
                    <p className="text-muted-foreground mb-4">{course.description}</p>
                    
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Layers className="h-4 w-4 text-muted-foreground" />
                        <span>{course.modules.length} modules</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span>{totalSteps} lessons</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Link href={`/learn/${course.slug}`}>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        Preview
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Modules */}
                <div className="mt-6 border-t pt-4">
                  <h4 className="text-sm font-medium mb-3">Modules</h4>
                  <div className="space-y-2">
                    {course.modules.map((module, idx) => (
                      <div key={module.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Badge variant="outline" className="w-8 h-8 flex items-center justify-center rounded-full">
                            {idx + 1}
                          </Badge>
                          <div>
                            <p className="font-medium">{module.title}</p>
                            <p className="text-xs text-muted-foreground">{module.steps.length} lessons</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
