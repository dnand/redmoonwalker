import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ProductSpecsProps {
  product: {
    type: string
    metadata?: any
    description?: string | null
  }
}

export function ProductSpecs({ product }: ProductSpecsProps) {
  if (!product.metadata || Object.keys(product.metadata).length === 0) {
    return null
  }

  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle>Specifications</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(product.metadata).map(([key, value]) => (
            <div key={key} className="flex flex-col">
              <span className="text-sm font-medium text-muted-foreground capitalize mb-1">
                {key.replace(/([A-Z])/g, " $1").trim()}
              </span>
              {Array.isArray(value) ? (
                <div className="flex flex-wrap gap-2">
                  {value.map((item, idx) => (
                    <Badge key={idx} variant="secondary">
                      {item}
                    </Badge>
                  ))}
                </div>
              ) : (
                <span className="text-base font-medium">{value as string}</span>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

