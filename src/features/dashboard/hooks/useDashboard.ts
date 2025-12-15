import { useQuery } from '@tanstack/react-query'
import { useServerFn } from '@tanstack/react-start'

import { getDashboardStats } from '@/server/functions/dashboard'

export function useDashboard() {
  const getDashboardStatsFn = useServerFn(getDashboardStats)

  return useQuery({
    queryKey: ['dashboard', 'stats'],
    queryFn: () => getDashboardStatsFn(),
    // Refetch every 5 minutes (stats don't change frequently)
    staleTime: 5 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000,
  })
}
