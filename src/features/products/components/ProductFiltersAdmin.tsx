import { Search, X } from 'lucide-react'

import type { MultiSelectOption } from '@/components/ui/multi-select'
import type { ProductFilters } from '@/types/product'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { MultiSelect } from '@/components/ui/multi-select'
import { NativeSelect } from '@/components/ui/native-select'
import { useBadges } from '@/features/badges/hooks/useBadges'
import { useCategories } from '@/features/categories/hooks/useCategories'

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

  return (
    <div className="border-border-subtle space-y-4 rounded-xl border bg-white p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-text-dark text-sm font-semibold">Filtres</h3>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={onReset}>
            <X className="size-4" />
            Réinitialiser
          </Button>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Search */}
        <div className="space-y-2 md:col-span-2 lg:col-span-3">
          <Label htmlFor="search">Recherche</Label>
          <div className="relative">
            <Search className="text-text-light absolute top-1/2 left-3 size-4 -translate-y-1/2" />
            <Input
              id="search"
              type="text"
              placeholder="Nom du produit, origine..."
              value={filters.search}
              onChange={(e) =>
                onFiltersChange({ ...filters, search: e.target.value })
              }
              className="pl-9"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-2">
          <Label>Catégories</Label>
          <MultiSelect
            options={categoryOptions}
            selected={filters.categoryIds}
            onChange={(categoryIds) =>
              onFiltersChange({ ...filters, categoryIds })
            }
            placeholder="Toutes les catégories"
            emptyMessage="Aucune catégorie disponible"
          />
        </div>

        {/* Badges */}
        <div className="space-y-2">
          <Label>Labels</Label>
          <MultiSelect
            options={badgeOptions}
            selected={filters.badgeIds}
            onChange={(badgeIds) => onFiltersChange({ ...filters, badgeIds })}
            placeholder="Tous les labels"
            emptyMessage="Aucun label disponible"
          />
        </div>

        {/* Active Status */}
        <div className="space-y-2">
          <Label htmlFor="isActive">Statut actif</Label>
          <NativeSelect
            id="isActive"
            value={filters.isActive}
            onChange={(e) =>
              onFiltersChange({
                ...filters,
                isActive: e.target.value as ProductFilters['isActive'],
              })
            }
          >
            <option value="all">Tous</option>
            <option value="active">Actifs</option>
            <option value="inactive">Inactifs</option>
          </NativeSelect>
        </div>

        {/* Featured Status */}
        <div className="space-y-2 md:col-span-2 lg:col-span-1">
          <Label htmlFor="isFeatured">Produit vedette</Label>
          <NativeSelect
            id="isFeatured"
            value={filters.isFeatured}
            onChange={(e) =>
              onFiltersChange({
                ...filters,
                isFeatured: e.target.value as ProductFilters['isFeatured'],
              })
            }
          >
            <option value="all">Tous</option>
            <option value="featured">Vedette</option>
            <option value="not-featured">Non vedette</option>
          </NativeSelect>
        </div>
      </div>
    </div>
  )
}
