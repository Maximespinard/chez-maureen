import { Link, createFileRoute } from '@tanstack/react-router'
import { Plus } from 'lucide-react'

import { AdminPageHeader } from '@/components/layout/AdminPageHeader'
import { Button } from '@/components/ui/button'
import { BadgeTable } from '@/features/badges/components/BadgeTable'

export const Route = createFileRoute('/admin/badges/')({
  component: BadgesListPage,
})

function BadgesListPage() {
  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Badges"
        description="Gerez les badges (Bio, Local, Saison, Promo, etc.)"
        action={
          <Button asChild>
            <Link to="/admin/badges/nouveau">
              <Plus className="size-4" />
              Nouveau badge
            </Link>
          </Button>
        }
      />

      <BadgeTable />
    </div>
  )
}
