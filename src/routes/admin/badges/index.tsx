import { Link, createFileRoute } from '@tanstack/react-router'
import { Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { BadgeTable } from '@/features/badges/components/BadgeTable'

export const Route = createFileRoute('/admin/badges/')({
  component: BadgesListPage,
})

function BadgesListPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-text-dark font-[Crimson_Pro,Georgia,serif] text-2xl font-bold">
            Badges
          </h1>
          <p className="text-text-body text-sm">
            Gerez les badges (Bio, Local, Saison, Promo, etc.)
          </p>
        </div>
        <Button asChild>
          <Link to="/admin/badges/new">
            <Plus className="size-4" />
            Nouveau badge
          </Link>
        </Button>
      </div>

      <BadgeTable />
    </div>
  )
}
