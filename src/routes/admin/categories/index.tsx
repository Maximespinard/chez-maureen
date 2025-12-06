import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/categories/')({
  component: CategoriesListPage,
})

function CategoriesListPage() {
  return <div>Admin Categories List - TODO</div>
}
