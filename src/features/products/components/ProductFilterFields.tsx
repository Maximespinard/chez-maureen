import type { MultiSelectOption } from '@/components/ui/multi-select'
import type { ProductFilters } from '@/types/product'
import { Label } from '@/components/ui/label'
import { MultiSelect } from '@/components/ui/multi-select'
import { NativeSelect } from '@/components/ui/native-select'

interface ProductFilterFieldsProps {
  filters: ProductFilters
  onFiltersChange: (filters: ProductFilters) => void
  categoryOptions: Array<MultiSelectOption>
  badgeOptions: Array<MultiSelectOption>
}

export function ProductFilterFields({
  filters,
  onFiltersChange,
  categoryOptions,
  badgeOptions,
}: ProductFilterFieldsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
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
      <div className="space-y-2">
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
  )
}
