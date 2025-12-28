"use client"

import { useEffect, useState, ReactNode } from "react"
import { useRouter } from "next/navigation"

interface AuthGateProps {
  children: ReactNode
  redirectTo: string
}

export function AuthGate({ children, redirectTo }: AuthGateProps) {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    const auth = localStorage.getItem("demo_authenticated")
    if (auth === "true") {
      setIsAuthenticated(true)
    } else {
      setIsAuthenticated(false)
      router.push(`/auth?redirect=${encodeURIComponent(redirectTo)}`)
    }
  }, [redirectTo, router])

  if (isAuthenticated === null) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p>Checking authentication...</p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p>Redirecting to sign in...</p>
      </div>
    )
  }

  return <>{children}</>
}

