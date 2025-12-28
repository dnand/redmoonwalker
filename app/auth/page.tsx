"use client"

import { useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"

function AuthPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    setLoading(true)
    try {
      // Create a demo user
      const demoUser = {
        id: "demo-user-123",
        email: "demo@redmoonwalkers.com",
        name: "Demo User",
        imageUrl: null,
      }
      
      // Store in localStorage
      localStorage.setItem("demo_user", JSON.stringify(demoUser))
      localStorage.setItem("demo_authenticated", "true")
      
      toast({
        title: "Welcome!",
        description: "You're now logged in as a demo user.",
      })
      
      // Redirect after a short delay
      setTimeout(() => {
        const redirect = searchParams.get("redirect") || "/"
        router.push(redirect)
        // Force a page reload to update navbar
        window.location.href = redirect
      }, 500)
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to login",
        variant: "destructive",
      })
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[70vh]">
      <Card className="max-w-md w-full border-2 shadow-xl">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-3xl">Welcome</CardTitle>
          <p className="text-muted-foreground mt-2">Sign in to your account</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-muted rounded-lg border-2 border-dashed">
            <p className="text-sm text-muted-foreground mb-4 text-center">
              <strong>Demo Mode:</strong> This is a demonstration app. Click below to sign in instantly.
            </p>
            <Button
              type="button"
              onClick={handleLogin}
              className="w-full"
              disabled={loading}
              size="lg"
            >
              {loading ? "Signing in..." : "Sign In (Demo)"}
            </Button>
          </div>
          
          <div className="text-center text-xs text-muted-foreground pt-4 border-t">
            <p>No email or password required for demo purposes.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function AuthPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[70vh]">
        <Card className="max-w-md w-full border-2 shadow-xl">
          <CardContent className="p-12 text-center">
            <p>Loading...</p>
          </CardContent>
        </Card>
      </div>
    }>
      <AuthPageContent />
    </Suspense>
  )
}
