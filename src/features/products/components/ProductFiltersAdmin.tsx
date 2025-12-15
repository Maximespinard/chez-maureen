import { useState } from 'react'
import { ChevronDown, Filter, Search, X } from 'lucide-react'

import { ProductFilterFields } from './ProductFilterFields'
import type { MultiSelectOption } from '@/components/ui/multi-select'
import type { ProductFilters } from '@/types/product'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { useBadges } from '@/features/badges/hooks/useBadges'
import { useCategories } from '@/features/categories/hooks/useCategories'
import { cn } from '@/lib/utils'

interface ProductFiltersAdminProps {
  filters: ProductFilters
  onFiltersChange: (filters: ProductFilters) => void
  onReset: () => void
}

export function ProductFiltersAdmin({
  filters,
  onFiltersChange,
  onReset,
}: ProductFiltersAdminProps) {
  const { data: categories } = useCategories()
  const { data: badges } = useBadges()
  const [isExpanded, setIsExpanded] = useState(false)
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  // Store temporary filters for mobile drawer (apply on "Valider")
  const [tempFilters, setTempFilters] = useState<ProductFilters>(filters)

  const categoryOptions: Array<MultiSelectOption> =
    categories?.map((cat) => ({
      label: cat.name,
      value: cat.id,
    })) ?? []

  const badgeOptions: Array<MultiSelectOption> =
    badges?.map((badge) => ({
      color: badge.color,
      label: badge.name,
      value: badge.id,
    })) ?? []

  const hasActiveFilters =
    filters.search !== '' ||
    filters.categoryIds.length > 0 ||
    filters.badgeIds.length > 0 ||
    filters.isActive !== 'all' ||
    filters.isFeatured !== 'all'

  // Count active advanced filters for badge
  const advancedFiltersCount = [
    filters.categoryIds.length > 0,
    filters.badgeIds.length > 0,
    filters.isActive !== 'all',
    filters.isFeatured !== 'all',
  ].filter(Boolean).length

  // Handle sheet open - sync temp filters with current filters
  const handleSheetOpenChange = (open: boolean) => {
    if (open) {
      setTempFilters(filters)
    }
    setIsSheetOpen(open)
  }

  // Apply temp filters from mobile drawer
  const handleApplyMobileFilters = () => {
    onFiltersChange(tempFilters)
    setIsSheetOpen(false)
  }

  // Cancel and reset temp filters
  const handleCancelMobileFilters = () => {
    setTempFilters(filters)
    setIsSheetOpen(false)
  }

  return (
    <div className="border-border-subtle space-y-4 rounded-xl border bg-white p-4 lg:p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-text-dark text-sm font-semibold">Filtres</h3>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={onReset}>
            <X className="size-4" />
            <span className="hidden sm:inline">Réinitialiser</span>
          </Button>
        )}
      </div>

      {/* Search + Filter Actions Row */}
      <div className="flex gap-3">
        {/* Search - always visible */}
        <div className="relative flex-1">
          <Search className="text-text-light absolute top-1/2 left-3 size-4 -translate-y-1/2" />
          <Input
            type="text"
            placeholder="Nom du produit, origine..."
            value={filters.search}
            onChange={(e) =>
              onFiltersChange({ ...filters, search: e.target.value })
            }
            className="pl-9"
          />
        </div>

        {/* Mobile: Filter Button + Sheet */}
        <div className="lg:hidden">
          <Sheet open={isSheetOpen} onOpenChange={handleSheetOpenChange}>
            <SheetTrigger asChild>
              <Button variant="outline" className="relative">
                <Filter className="size-4" />
                <span className="sr-only">Filtres</span>
                {advancedFiltersCount > 0 && (
                  <span className="bg-primeur-green absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full text-xs text-white">
                    {advancedFiltersCount}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent
              side="bottom"
              className="max-h-[85vh] overflow-y-auto"
            >
              <SheetHeader>
                <SheetTitle>Filtres avancés</SheetTitle>
              </SheetHeader>
              <div className="py-6">
                <ProductFilterFields
                  filters={tempFilters}
                  onFiltersChange={setTempFilters}
                  categoryOptions={categoryOptions}
                  badgeOptions={badgeOptions}
                />
              </div>
              <SheetFooter>
                <SheetClose asChild>
                  <Button variant="outline" onClick={handleCancelMobileFilters}>
                    Annuler
                  </Button>
                </SheetClose>
                <Button onClick={handleApplyMobileFilters}>Valider</Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop: Expand Button */}
        <div className="hidden lg:block">
          <Button
            variant="outline"
            onClick={() => setIsExpanded(!isExpanded)}
            className="relative"
          >
            <Filter className="size-4" />
            Filtres avancés
            <ChevronDown
              className={cn(
                'size-4 transition-transform duration-200',
                isExpanded && 'rotate-180',
              )}
            />
            {advancedFiltersCount > 0 && !isExpanded && (
              <span className="bg-primeur-green absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full text-xs text-white">
                {advancedFiltersCount}
              </span>
            )}
          </Button>
        </div>
      </div>

      {/* Desktop: Expandable Filters Section */}
      <div
        className={cn(
          'hidden transition-all duration-300 ease-in-out lg:block',
          isExpanded
            ? 'max-h-96 overflow-visible opacity-100'
            : 'max-h-0 overflow-hidden opacity-0',
        )}
      >
        <div className="border-border-subtle border-t pt-4">
          <ProductFilterFields
            filters={filters}
            onFiltersChange={onFiltersChange}
            categoryOptions={categoryOptions}
            badgeOptions={badgeOptions}
          />
        </div>
      </div>
    </div>
  )
}
