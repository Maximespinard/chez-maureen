import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/produits/')({
  component: ProductsListPage,
})

function ProductsListPage() {
  return <div>Admin Products List - TODO</div>
}
