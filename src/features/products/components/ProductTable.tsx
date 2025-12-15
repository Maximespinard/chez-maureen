import { useNavigate } from '@tanstack/react-router'
import { useState } from 'react'

import type { ProductWithRelations } from '@/types/product'
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
import { useProducts } from '@/features/products/hooks/useProducts'

interface ProductTableProps {
  products?: Array<ProductWithRelations>
}

export function ProductTable({
  products: filteredProducts,
}: ProductTableProps) {
  const navigate = useNavigate()
  const { data: products, isLoading } = useProducts()
  const { remove } = useProductMutations()
  const [deleteProduct, setDeleteProduct] =
    useState<ProductWithRelations | null>(null)

  const displayProducts = filteredProducts ?? products

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

  if (!displayProducts || displayProducts.length === 0) {
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
            {displayProducts.map((product) => (
              <ProductTableRow
                key={product.id}
                product={product}
                onEdit={(id) =>
                  navigate({
                    params: { id },
                    to: `/admin/produits/$id/modifier`,
                  })
                }
                onDelete={setDeleteProduct}
              />
            ))}
          </TableBody>
        </Table>
      </div>

      <DeleteProductDialog
        product={deleteProduct}
        open={!!deleteProduct}
        onOpenChange={(open) => !open && setDeleteProduct(null)}
        onConfirm={handleDelete}
      />
    </>
  )
}
