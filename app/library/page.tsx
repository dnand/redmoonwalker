"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Download, FileText, ExternalLink } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { mockProducts } from "@/lib/mockData"
import { mockCourses } from "@/lib/mockCourses"
import Image from "next/image"
import { motion } from "framer-motion"

interface PurchasedItem {
  productId: string
  variantId?: string
}

export default function LibraryPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [purchasedItems, setPurchasedItems] = useState<PurchasedItem[]>([])

  useEffect(() => {
    const auth = localStorage.getItem("demo_authenticated")
    if (auth !== "true") {
      router.push("/auth?redirect=/library")
      return
    }
    setIsAuthenticated(true)

    // Get demo entitlements from localStorage
    const entitlements = JSON.parse(localStorage.getItem("demo_entitlements") || "[]")
    setPurchasedItems(entitlements)
    setLoading(false)
  }, [router])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p>Loading library...</p>
      </div>
    )
  }

  // Get purchased DIGITAL products only (PATTERN and GUIDE)
  // Materials are physical products and don't appear in the library
  const purchasedProducts = mockProducts.filter((p) =>
    purchasedItems.some((item) => item.productId === p.id) &&
    (p.type === "PATTERN" || p.type === "GUIDE")
  )

  const guides = purchasedProducts.filter((p) => p.type === "GUIDE")
  const patterns = purchasedProducts.filter((p) => p.type === "PATTERN")

  const hasItems = purchasedProducts.length > 0

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-3">My Library</h1>
        <p className="text-lg text-muted-foreground">
          Access your purchased patterns and courses
        </p>
      </div>

      {!hasItems ? (
        <Card className="border-2 border-dashed bg-muted/30">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <BookOpen className="h-16 w-16 text-muted-foreground mb-6" />
            <h3 className="text-xl font-semibold mb-3">Your library is empty</h3>
            <p className="text-sm text-muted-foreground mb-6 max-w-md text-center">
              Purchase patterns or guides to add them to your library. 
              Digital products will appear here for instant access.
            </p>
            <div className="flex gap-4">
              <Link href="/shop/patterns">
                <Button variant="outline">
                  <FileText className="mr-2 h-4 w-4" />
                  Browse Patterns
                </Button>
              </Link>
              <Link href="/shop/guides">
                <Button>
                  <BookOpen className="mr-2 h-4 w-4" />
                  Browse Guides
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-12">
          {/* Guides & Courses Section */}
          {guides.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-6">
                <BookOpen className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-semibold">Guides & Courses</h2>
                <Badge variant="secondary">{guides.length}</Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {guides.map((product, index) => {
                  const course = mockCourses.find((c) => c.productId === product.id)
                  return (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="overflow-hidden group hover:shadow-lg transition-shadow">
                        <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
                          {product.coverImageUrl ? (
                            <Image
                              src={product.coverImageUrl}
                              alt={product.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full text-muted-foreground">
                              <BookOpen className="h-12 w-12" />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          <div className="absolute bottom-3 left-3">
                            <Badge className="bg-primary">Course</Badge>
                          </div>
                        </div>
                        <CardContent className="p-5">
                          <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                            {product.title}
                          </h3>
                          {course && (
                            <p className="text-sm text-muted-foreground mb-4">
                              {course.modules.length} modules • {course.modules.reduce((acc, m) => acc + m.steps.length, 0)} lessons
                            </p>
                          )}
                          <Link href={course ? `/learn/${course.slug}` : `/product/${product.slug}`}>
                            <Button className="w-full">
                              <BookOpen className="mr-2 h-4 w-4" />
                              Continue Learning
                            </Button>
                          </Link>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )
                })}
              </div>
            </section>
          )}

          {/* Patterns Section */}
          {patterns.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-6">
                <FileText className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-semibold">Patterns</h2>
                <Badge variant="secondary">{patterns.length}</Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {patterns.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="overflow-hidden group hover:shadow-lg transition-shadow">
                      <div className="relative aspect-square w-full overflow-hidden bg-muted">
                        {product.coverImageUrl ? (
                          <Image
                            src={product.coverImageUrl}
                            alt={product.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full text-muted-foreground">
                            <FileText className="h-12 w-12" />
                          </div>
                        )}
                        <div className="absolute top-3 right-3">
                          <Badge variant="secondary" className="bg-background/90">
                            <Download className="h-3 w-3 mr-1" />
                            PDF
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-base mb-3 line-clamp-2">{product.title}</h3>
                        <div className="flex gap-2">
                          <Button size="sm" className="flex-1">
                            <Download className="mr-1 h-4 w-4" />
                            Download
                          </Button>
                          <Link href={`/product/${product.slug}`}>
                            <Button size="sm" variant="outline">
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </section>
          )}
        </div>
      )}

      {/* Info note about materials */}
      <div className="mt-16 p-6 bg-muted/50 rounded-lg">
        <p className="text-sm text-muted-foreground text-center">
          <strong>Note:</strong> Physical materials you&apos;ve purchased are shipped to your address and won&apos;t appear here. 
          Check your email for shipping updates.
        </p>
      </div>
    </div>
  )
}
