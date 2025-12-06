import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/promotions/')({
  component: PromotionsListPage,
})

function PromotionsListPage() {
  return <div>Admin Promotions List - TODO</div>
}
