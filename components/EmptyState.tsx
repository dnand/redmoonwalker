import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, Package } from "lucide-react"

interface EmptyStateProps {
  title: string
  description?: string
  icon?: React.ReactNode
  action?: {
    label: string
    onClick: () => void
  }
}

export function EmptyState({
  title,
  description,
  icon,
  action,
}: EmptyStateProps) {
  return (
    <Card className="border-2 border-dashed bg-muted/30">
      <CardContent className="flex flex-col items-center justify-center py-16 px-4">
        <div className="mb-6">
          {icon || <Package className="h-16 w-16 text-muted-foreground" />}
        </div>
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        {description && (
          <p className="text-sm text-muted-foreground text-center mb-6 max-w-md leading-relaxed">
            {description}
          </p>
        )}
        {action && (
          <Button onClick={action.onClick} variant="outline" size="lg">
            {action.label}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

export function EmptySearchState({ onClear }: { onClear: () => void }) {
  return (
    <EmptyState
      title="No products found"
      description="Try adjusting your search or filters to find what you're looking for."
      icon={<Search className="h-12 w-12 text-muted-foreground mb-4" />}
      action={{
        label: "Clear filters",
        onClick: onClear,
      }}
    />
  )
}

