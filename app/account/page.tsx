"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface DemoUser {
  id: string
  email: string
  name: string
}

export default function AccountPage() {
  const router = useRouter()
  const [user, setUser] = useState<DemoUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const auth = localStorage.getItem("demo_authenticated")
    const storedUser = localStorage.getItem("demo_user")
    
    if (auth !== "true") {
      router.push("/auth?redirect=/account")
      return
    }

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch {
        setUser({
          id: "demo-user-123",
          email: "demo@redmoonwalkers.com",
          name: "Demo User",
        })
      }
    } else {
      setUser({
        id: "demo-user-123",
        email: "demo@redmoonwalkers.com",
        name: "Demo User",
      })
    }
    
    setLoading(false)
  }, [router])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p>Loading account...</p>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Account</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{user.email}</p>
            </div>
            {user.name && (
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="font-medium">{user.name}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              No orders yet. This is a demo application.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
