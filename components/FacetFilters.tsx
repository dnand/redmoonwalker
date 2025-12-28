"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { X } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

export interface FacetOption {
  label: string
  value: string
  count?: number
}

export interface FacetFilter {
  key: string
  label: string
  options: FacetOption[]
  multiSelect?: boolean
}

interface FacetFiltersProps {
  facets: FacetFilter[]
  sortOptions?: { label: string; value: string }[]
  defaultSort?: string
  searchPlaceholder?: string
}

export function FacetFilters({
  facets,
  sortOptions = [
    { label: "Price: Low to High", value: "price_asc" },
    { label: "Price: High to Low", value: "price_desc" },
    { label: "Newest First", value: "newest" },
    { label: "Oldest First", value: "oldest" },
    { label: "Name: A-Z", value: "name_asc" },
    { label: "Name: Z-A", value: "name_desc" },
  ],
  defaultSort = "newest",
  searchPlaceholder = "Search products...",
}: FacetFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "")

  const updateParams = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    router.push(`?${params.toString()}`)
  }

  const toggleFacet = (facetKey: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    const current = params.getAll(facetKey)
    if (current.includes(value)) {
      params.delete(facetKey, value)
    } else {
      params.append(facetKey, value)
    }
    router.push(`?${params.toString()}`)
  }

  const clearFilters = () => {
    if (typeof window !== "undefined") {
      router.push(window.location.pathname)
    }
  }

  const activeFilters = Array.from(searchParams.entries()).filter(
    ([key]) => key !== "q" && key !== "sort"
  )

  return (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <Input
          placeholder={searchPlaceholder}
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value)
            updateParams("q", e.target.value || null)
          }}
          className="w-full h-11"
        />
      </div>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {activeFilters.map(([key, value]) => {
            const facet = facets.find((f) => f.key === key)
            const option = facet?.options.find((o) => o.value === value)
            return (
              <Badge
                key={`${key}-${value}`}
                variant="secondary"
                className="cursor-pointer"
                onClick={() => {
                  const params = new URLSearchParams(searchParams.toString())
                  const values = params.getAll(key)
                  params.delete(key)
                  values
                    .filter((v) => v !== value)
                    .forEach((v) => params.append(key, v))
                  router.push(`?${params.toString()}`)
                }}
              >
                {facet?.label}: {option?.label || value}
                <X className="ml-1 h-3 w-3" />
              </Badge>
            )
          })}
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="h-6 text-xs"
          >
            Clear all
          </Button>
        </div>
      )}

      {/* Facets */}
      {facets.map((facet) => {
        const selectedValues = searchParams.getAll(facet.key)
        return (
          <div key={facet.key} className="border-b pb-6 last:border-0">
            <label className="text-sm font-semibold mb-3 block text-foreground">
              {facet.label}
            </label>
            <div className="space-y-2">
              {facet.options.map((option) => {
                const isSelected = selectedValues.includes(option.value)
                return (
                  <label
                    key={option.value}
                    className={`flex items-center space-x-3 cursor-pointer p-2.5 rounded-lg transition-colors ${
                      isSelected
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-muted"
                    }`}
                  >
                    <input
                      type={facet.multiSelect ? "checkbox" : "radio"}
                      checked={isSelected}
                      onChange={() => toggleFacet(facet.key, option.value)}
                      className="rounded border-gray-300 w-4 h-4 accent-primary"
                    />
                    <span className="text-sm flex-1 font-medium">{option.label}</span>
                    {option.count !== undefined && (
                      <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                        {option.count}
                      </span>
                    )}
                  </label>
                )
              })}
            </div>
          </div>
        )
      })}

      {/* Sort */}
      <div className="border-t pt-6">
        <label className="text-sm font-semibold mb-3 block text-foreground">Sort by</label>
        <Select
          value={searchParams.get("sort") || defaultSort}
          onValueChange={(value) => updateParams("sort", value)}
        >
          <SelectTrigger className="h-11">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

