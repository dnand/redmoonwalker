"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { GitCompare } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface CompareButtonProps {
  productId: string
  variant?: "default" | "ghost" | "outline"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
}

export function CompareButton({ productId, variant = "outline", size = "default", className }: CompareButtonProps) {
  const [isComparing, setIsComparing] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const compare = localStorage.getItem("demo_compare")
    if (compare) {
      const items = JSON.parse(compare)
      setIsComparing(items.includes(productId))
    }
  }, [productId])

  const toggleCompare = () => {
    const compare = localStorage.getItem("demo_compare")
    const items = compare ? JSON.parse(compare) : []

    if (isComparing) {
      const updated = items.filter((id: string) => id !== productId)
      localStorage.setItem("demo_compare", JSON.stringify(updated))
      setIsComparing(false)
      toast({
        title: "Removed from comparison",
        description: "Product removed from comparison",
      })
    } else {
      if (items.length >= 4) {
        toast({
          title: "Comparison limit reached",
          description: "You can compare up to 4 products at a time",
          variant: "destructive",
        })
        return
      }
      items.push(productId)
      localStorage.setItem("demo_compare", JSON.stringify(items))
      setIsComparing(true)
      toast({
        title: "Added to comparison",
        description: "Product added to comparison",
      })
    }
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={toggleCompare}
      className={`${isComparing ? "bg-primary text-primary-foreground" : ""} ${className || ""}`}
    >
      <GitCompare className="h-4 w-4 mr-2" />
      {isComparing ? "Comparing" : "Compare"}
    </Button>
  )
}

