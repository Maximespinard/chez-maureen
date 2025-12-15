import { createFileRoute } from '@tanstack/react-router'

import { DashboardStats } from '@/features/dashboard/components/DashboardStats'
import { MessagesWidget } from '@/features/dashboard/components/MessagesWidget'
import { QuickActions } from '@/features/dashboard/components/QuickActions'
import { RecentProducts } from '@/features/dashboard/components/RecentProducts'
import { useDashboard } from '@/features/dashboard/hooks/useDashboard'

export const Route = createFileRoute('/admin/')({
  component: DashboardPage,
})

function DashboardPage() {
  const { data, isLoading, error } = useDashboard()

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-text-light">Chargement du tableau de bord...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-error">Erreur lors du chargement: {error.message}</p>
      </div>
    )
  }

  if (!data) return null

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-text-dark text-2xl font-bold">Tableau de bord</h1>
        <p className="text-text-light mt-1 text-sm">
          Vue d'ensemble de votre boutique
        </p>
      </div>

      {/* Stats Cards Grid */}
      <DashboardStats stats={data.stats} />

      {/* Two Columns Layout (desktop) / Stacked (mobile) */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Messages Widget */}
        <MessagesWidget unreadCount={data.stats.unreadMessagesCount} />

        {/* Quick Actions */}
        <QuickActions />
      </div>

      {/* Recent Products */}
      <RecentProducts products={data.recentProducts} />
    </div>
  )
}
