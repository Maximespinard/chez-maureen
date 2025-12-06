import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/promotions/new')({
  component: NewPromotionPage,
})

function NewPromotionPage() {
  return <div>New Promotion - TODO</div>
}
