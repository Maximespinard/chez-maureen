import { useNavigate } from '@tanstack/react-router'
import { useState } from 'react'

import type { ProductWithRelations } from '@/types/product'
import { Pagination } from '@/components/ui/pagination'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { DeleteProductDialog } from '@/features/products/components/DeleteProductDialog'
import { ProductTableRow } from '@/features/products/components/ProductTableRow'
import { useProductMutations } from '@/features/products/hooks/useProductMutations'

interface ProductTableProps {
  isLoading?: boolean
  onPageChange?: (page: number) => void
  page?: number
  products?: Array<ProductWithRelations>
  total?: number
  totalPages?: number
}

export function ProductTable({
  isLoading,
  onPageChange,
  page,
  products,
  total,
  totalPages,
}: ProductTableProps) {
  const navigate = useNavigate()
  const { remove } = useProductMutations()
  const [deleteProduct, setDeleteProduct] =
    useState<ProductWithRelations | null>(null)

  const handleDelete = async () => {
    if (deleteProduct) {
      await remove.mutateAsync(deleteProduct.id)
      setDeleteProduct(null)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-text-body text-sm">Chargement...</div>
      </div>
    )
  }

  if (!products || products.length === 0) {
    return (
      <div className="border-border-subtle rounded-xl border bg-white p-12 text-center">
        <p className="text-text-body text-sm">Aucun produit pour le moment.</p>
      </div>
    )
  }

  return (
    <>
      <div className="border-border-subtle overflow-x-auto rounded-xl border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">Image</TableHead>
              <TableHead>Nom</TableHead>
              <TableHead className="w-32">Prix</TableHead>
              <TableHead className="w-40">Catégories</TableHead>
              <TableHead className="w-40">Labels</TableHead>
              <TableHead className="w-24 text-center">Statut</TableHead>
              <TableHead className="w-24">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <ProductTableRow
                key={product.id}
                onDelete={setDeleteProduct}
                onEdit={(id) =>
                  navigate({
                    params: { id },
                    to: `/admin/produits/$id/modifier`,
                  })
                }
                product={product}
              />
            ))}
          </TableBody>
        </Table>

        {totalPages !== undefined && totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-4">
            <p className="text-text-body text-sm">
              {total} produit{total !== 1 ? 's' : ''} au total
            </p>
            <Pagination
              onPageChange={onPageChange ?? (() => {})}
              page={page ?? 1}
              totalPages={totalPages}
            />
          </div>
        )}
      </div>

      <DeleteProductDialog
        onConfirm={handleDelete}
        onOpenChange={(open) => !open && setDeleteProduct(null)}
        open={!!deleteProduct}
        product={deleteProduct}
      />
    </>
  )
}
