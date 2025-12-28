"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

interface CourseRedirectProps {
  to: string
  courseTitle: string
}

export function CourseRedirect({ to, courseTitle }: CourseRedirectProps) {
  const router = useRouter()

  useEffect(() => {
    // Check authentication first
    const auth = localStorage.getItem("demo_authenticated")
    if (auth !== "true") {
      router.push(`/auth?redirect=${encodeURIComponent(to)}`)
      return
    }
    
    // Redirect to the first step
    router.push(to)
  }, [to, router])

  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-2xl font-bold mb-4">{courseTitle}</h1>
      <p className="text-muted-foreground">Loading course content...</p>
    </div>
  )
}

