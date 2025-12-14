import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import type { FilterCategory } from '@/features/products/components/ProductFilters'
import { ProductsHeader } from '@/features/products/components/ProductsHeader'
import { ProductSearch } from '@/features/products/components/ProductSearch'
import { ProductFilters } from '@/features/products/components/ProductFilters'
import { ProductGrid } from '@/features/products/components/ProductGrid'
import { ProductContactCta } from '@/features/products/components/ProductContactCta'

export const Route = createFileRoute('/_public/produits')({
  component: ProductsPage,
})

function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterCategory, setFilterCategory] = useState<FilterCategory>('all')

  return (
    <>
      <ProductsHeader />
      <ProductSearch value={searchQuery} onChange={setSearchQuery} />
      <ProductFilters
        activeFilter={filterCategory}
        onFilterChange={setFilterCategory}
      />
      <ProductGrid searchQuery={searchQuery} filterCategory={filterCategory} />
      <ProductContactCta />
    </>
  )
}
