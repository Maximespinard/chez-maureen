import { Link, createFileRoute } from '@tanstack/react-router'
import { Plus } from 'lucide-react'

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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-text-dark font-[Crimson_Pro,Georgia,serif] text-2xl font-bold">
            Produits
          </h1>
          <p className="text-text-body text-sm">
            Gérez les produits de votre catalogue
          </p>
        </div>
        <Button asChild>
          <Link to="/admin/produits/new">
            <Plus className="size-4" />
            Nouveau produit
          </Link>
        </Button>
      </div>

      <ProductFiltersAdmin
        filters={filters}
        onFiltersChange={setFilters}
        onReset={clearFilters}
      />

      <ProductTable products={filteredProducts} />
    </div>
  )
}
