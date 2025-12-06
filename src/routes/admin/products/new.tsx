import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/products/new')({
  component: NewProductPage,
})

function NewProductPage() {
  return <div>New Product - TODO</div>
}
