import { formatPrice } from "@/lib/utils"

interface PriceDisplayProps {
  priceCents: number
  currency?: string
  className?: string
  variant?: "default" | "large" | "small"
}

export function PriceDisplay({
  priceCents,
  currency = "usd",
  className,
  variant = "default",
}: PriceDisplayProps) {
  const sizeClasses = {
    default: "text-xl",
    large: "text-3xl font-bold",
    small: "text-sm",
  }

  return (
    <span className={`${sizeClasses[variant]} ${className || ""}`}>
      {formatPrice(priceCents, currency)}
    </span>
  )
}

