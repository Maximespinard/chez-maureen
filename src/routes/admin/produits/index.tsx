import { Link, createFileRoute } from '@tanstack/react-router'
import { Plus } from 'lucide-react'

import { AdminPageHeader } from '@/components/layout/AdminPageHeader'
import { Button } from '@/components/ui/button'
import { ProductFiltersAdmin } from '@/features/products/components/ProductFiltersAdmin'
import { ProductTable } from '@/features/products/components/ProductTable'
import { useProductFilters } from '@/features/products/hooks/useProductFilters'
import { useProducts } from '@/features/products/hooks/useProducts'

export const Route = createFileRoute('/admin/produits/')({
  component: ProductsListPage,
})

function ProductsListPage() {
  const { data: products } = useProducts()
  const { filters, filteredProducts, setFilters, clearFilters } =
    useProductFilters(products)

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Produits"
        description="Gérez les produits de votre catalogue"
        action={
          <Button asChild>
            <Link to="/admin/produits/nouveau">
              <Plus className="size-4" />
              Nouveau produit
            </Link>
          </Button>
        }
      />

      <ProductFiltersAdmin
        filters={filters}
        onFiltersChange={setFilters}
        onReset={clearFilters}
      />

      <ProductTable products={filteredProducts} />
    </div>
  )
}
