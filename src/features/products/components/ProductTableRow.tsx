import { Check, Pencil, Star, Trash2, X } from 'lucide-react'

import type { ProductWithRelations } from '@/types/product'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'
import { PriceDisplay } from '@/features/products/components/PriceDisplay'
import { useProductMutations } from '@/features/products/hooks/useProductMutations'
import { getOptimizedImageUrl } from '@/lib/image-url'

interface ProductTableRowProps {
  onDelete: (product: ProductWithRelations) => void
  onEdit: (id: string) => void
  product: ProductWithRelations
}

export function ProductTableRow({
  product,
  onEdit,
  onDelete,
}: ProductTableRowProps) {
  const { toggleActive } = useProductMutations()

  return (
    <TableRow>
      {/* Image */}
      <TableCell>
        {product.image ? (
          <img
            src={getOptimizedImageUrl(product.image, {
              width: 80,
              quality: 90,
              aspectRatio: '1/1',
            })}
            alt={product.name}
            className="size-10 rounded-md object-cover"
          />
        ) : (
          <div className="bg-surface-muted flex size-10 items-center justify-center rounded-md">
            <span className="text-text-light text-xs">N/A</span>
          </div>
        )}
      </TableCell>

      {/* Name + Slug */}
      <TableCell>
        <div className="flex flex-col gap-1">
          <span className="font-medium">{product.name}</span>
          <span className="text-text-body text-xs">{product.slug}</span>
        </div>
      </TableCell>

      {/* Price/Unit */}
      <TableCell>
        <PriceDisplay
          originalPrice={product.price}
          discountPercent={product.discountPercent}
          discountAmount={product.discountAmount}
          unit={product.unit}
        />
      </TableCell>

      {/* Categories */}
      <TableCell>
        <div className="flex flex-wrap gap-1">
          {product.categories.length > 0 ? (
            product.categories.map((c) => (
              <Badge key={c.category.id} variant="secondary" size="sm">
                {c.category.name}
              </Badge>
            ))
          ) : (
            <span className="text-text-light text-xs">Aucune</span>
          )}
        </div>
      </TableCell>

      {/* Badges */}
      <TableCell>
        <div className="flex flex-wrap gap-1">
          {product.badges.length > 0 ? (
            product.badges.map((b) => (
              <Badge
                key={b.badge.id}
                variant="outline"
                size="sm"
                style={{
                  borderColor: b.badge.color,
                  color: b.badge.color,
                }}
              >
                {b.badge.name}
              </Badge>
            ))
          ) : (
            <span className="text-text-light text-xs">Aucun</span>
          )}
        </div>
      </TableCell>

      {/* Status Icons */}
      <TableCell>
        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleActive.mutate(product.id)}
            className={`flex size-6 items-center justify-center rounded transition-colors ${
              product.isActive
                ? 'bg-success-light text-success-dark hover:bg-success'
                : 'bg-error-light text-error-dark hover:bg-error'
            }`}
            title={product.isActive ? 'Actif' : 'Inactif'}
            aria-label={
              product.isActive ? 'Désactiver le produit' : 'Activer le produit'
            }
          >
            {product.isActive ? (
              <Check className="size-4" />
            ) : (
              <X className="size-4" />
            )}
          </button>
          {product.isFeatured && (
            <div
              className="bg-warning-light text-warning-dark flex size-6 items-center justify-center rounded"
              title="Produit vedette"
            >
              <Star className="size-4" />
            </div>
          )}
        </div>
      </TableCell>

      {/* Actions */}
      <TableCell>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => onEdit(product.id)}
            aria-label="Modifier"
          >
            <Pencil className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => onDelete(product)}
            aria-label="Supprimer"
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  )
}
