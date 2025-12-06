import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/products/')({
  component: ProductsListPage,
})

function ProductsListPage() {
  return <div>Admin Products List - TODO</div>
}
