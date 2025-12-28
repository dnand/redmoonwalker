"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatPrice } from "@/lib/utils"
import { ProductType } from "@prisma/client"
import { motion } from "framer-motion"
import { WishlistButton } from "./WishlistButton"
import { CompareButton } from "./CompareButton"

interface ProductCardProps {
  id: string
  slug: string
  title: string
  description?: string | null
  coverImageUrl?: string | null
  priceCents: number
  currency?: string
  type: ProductType
  metadata?: any
  className?: string
}

export function ProductCard({
  id,
  slug,
  title,
  description,
  coverImageUrl,
  priceCents,
  currency = "usd",
  type,
  metadata,
  className,
}: ProductCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className={className}
    >
      <Link href={`/product/${slug}`}>
        <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-300 border-2 group">
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-muted to-muted/50">
            {coverImageUrl ? (
              <Image
                src={coverImageUrl}
                alt={title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                <div className="text-4xl">👞</div>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <Badge
              className="absolute top-3 right-3 backdrop-blur-sm bg-background/80"
              variant="secondary"
            >
              {type}
            </Badge>
            <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <WishlistButton productId={id} />
            </div>
          </div>
          <CardContent className="p-5">
            <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
              {title}
            </h3>
            {description && (
              <p className="text-sm text-muted-foreground line-clamp-2 mb-3 leading-relaxed">
                {description}
              </p>
            )}
            {metadata?.skillLevel && (
              <Badge variant="outline" className="text-xs mb-2">
                {metadata.skillLevel}
              </Badge>
            )}
          </CardContent>
          <CardFooter className="p-5 pt-0 border-t flex items-center justify-between gap-2">
            <p className="text-xl font-bold text-primary">
              {formatPrice(priceCents, currency)}
            </p>
            <div className="flex gap-1">
              <WishlistButton productId={id} size="sm" />
              <CompareButton productId={id} size="sm" />
            </div>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  )
}

