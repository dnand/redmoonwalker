"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Package, 
  BookOpen, 
  FileText, 
  Layers,
  ShoppingBag,
  Users,
  TrendingUp,
  Settings
} from "lucide-react"
import { mockProducts } from "@/lib/mockData"
import { mockCourses } from "@/lib/mockCourses"

export default function AdminDashboard() {
  const router = useRouter()
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in as admin (demo mode)
    const auth = localStorage.getItem("demo_authenticated")
    const user = localStorage.getItem("demo_user")
    
    if (auth !== "true") {
      router.push("/auth?redirect=/admin")
      return
    }
    
    // In demo mode, any logged-in user can access admin
    setIsAdmin(true)
    setLoading(false)
  }, [router])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p>Loading admin panel...</p>
      </div>
    )
  }

  if (!isAdmin) {
    return null
  }

  const stats = [
    {
      title: "Total Products",
      value: mockProducts.length,
      icon: Package,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Patterns",
      value: mockProducts.filter(p => p.type === "PATTERN").length,
      icon: FileText,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Materials",
      value: mockProducts.filter(p => p.type === "MATERIAL").length,
      icon: Layers,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
    {
      title: "Guides/Courses",
      value: mockProducts.filter(p => p.type === "GUIDE").length,
      icon: BookOpen,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Manage your products, courses, and content
          </p>
        </div>
        <Badge variant="secondary" className="text-sm px-3 py-1">
          Demo Mode
        </Badge>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-3xl font-bold mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Manage patterns, materials, and guides
            </p>
            <Link href="/admin/products">
              <Button className="w-full">Manage Products</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Courses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Edit course modules and lessons ({mockCourses.length} courses)
            </p>
            <Link href="/admin/courses">
              <Button className="w-full">Manage Courses</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Demo settings and data management
            </p>
            <Link href="/admin/settings">
              <Button variant="outline" className="w-full">View Settings</Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Info Note */}
      <Card className="mt-8 border-amber-200 bg-amber-50">
        <CardContent className="p-6">
          <h3 className="font-semibold text-amber-800 mb-2">Demo Mode Notice</h3>
          <p className="text-sm text-amber-700">
            This is a demo admin panel. Changes are saved to your browser&apos;s localStorage and will persist 
            until you clear your browser data. Changes are not synced across devices or browsers.
            To reset to default data, use the Settings page.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
