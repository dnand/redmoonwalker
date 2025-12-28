"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/ProductCard"
import { ProductType } from "@prisma/client"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

interface HomePageClientProps {
  featuredProducts: any[]
}

export function HomePageClient({ featuredProducts }: HomePageClientProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col"
    >
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/20">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
        <div className="container mx-auto px-4 py-24 md:py-32 relative">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center space-y-8"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-balance bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
                Redmoon Walkers
              </h1>
            </motion.div>
            <p className="text-xl md:text-2xl text-muted-foreground text-balance max-w-2xl mx-auto leading-relaxed">
              Premium patterns, materials, and step-by-step guides for the modern
              shoemaking community.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <Link href="/shop">
                <Button size="lg" className="text-base px-8 py-6 h-auto">
                  Browse Shop
                </Button>
              </Link>
              <Link href="/shop/guides">
                <Button size="lg" variant="outline" className="text-base px-8 py-6 h-auto border-2">
                  Explore Guides
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-20">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Featured Products</h2>
            <p className="text-muted-foreground">Handpicked selections for your next project</p>
          </div>
          <Link href="/shop">
            <Button variant="ghost" className="group">
              View All <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        {featuredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ProductCard
                  id={product.id}
                  slug={product.slug}
                  title={product.title}
                  description={product.description}
                  coverImageUrl={product.coverImageUrl}
                  priceCents={product.priceCents}
                  currency={product.currency}
                  type={product.type}
                  metadata={product.metadata as any}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground py-12">
            No products available yet. Check back soon!
          </p>
        )}
      </section>

      {/* Categories */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Shop by Category
            </h2>
            <p className="text-muted-foreground text-lg">Explore our curated collections</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                type: ProductType.PATTERN,
                title: "Patterns",
                description: "Professional shoemaking patterns",
                href: "/shop/patterns",
                icon: "📐",
              },
              {
                type: ProductType.MATERIAL,
                title: "Materials",
                description: "Premium leather and supplies",
                href: "/shop/materials",
                icon: "🧵",
              },
              {
                type: ProductType.GUIDE,
                title: "Guides",
                description: "Step-by-step learning courses",
                href: "/shop/guides",
                icon: "📚",
              },
            ].map((category) => (
              <Link key={category.type} href={category.href}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  className="bg-card border-2 rounded-xl p-8 hover:shadow-xl transition-all text-center group cursor-pointer"
                >
                  <div className="text-5xl mb-4">{category.icon}</div>
                  <h3 className="text-2xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {category.description}
                  </p>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  )
}

