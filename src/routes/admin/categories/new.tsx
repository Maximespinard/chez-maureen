import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/categories/new')({
  component: NewCategoryPage,
})

function NewCategoryPage() {
  return <div>New Category - TODO</div>
}
