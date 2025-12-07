import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useServerFn } from '@tanstack/react-start'

import type { BadgeCreate, BadgeReorder, BadgeUpdate } from '@/schemas'
import type { BadgeWithCount } from '@/types/badge'
import {
  createBadge,
  deleteBadge,
  getAllBadges,
  getBadgeById,
  reorderBadges,
  updateBadge,
} from '@/server/functions/badges'

const QUERY_KEY = 'badges'

export function useBadges() {
  const getAllBadgesFn = useServerFn(getAllBadges)

  return useQuery({
    queryFn: () => getAllBadgesFn(),
    queryKey: [QUERY_KEY],
  })
}

export function useBadge(id: string) {
  const getBadgeByIdFn = useServerFn(getBadgeById)

  return useQuery({
    enabled: !!id,
    queryFn: () => getBadgeByIdFn({ data: { id } }),
    queryKey: [QUERY_KEY, id],
  })
}

export function useBadgeMutations() {
  const queryClient = useQueryClient()
  const createBadgeFn = useServerFn(createBadge)
  const deleteBadgeFn = useServerFn(deleteBadge)
  const reorderBadgesFn = useServerFn(reorderBadges)
  const updateBadgeFn = useServerFn(updateBadge)

  const create = useMutation({
    mutationFn: (data: BadgeCreate) => createBadgeFn({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] })
    },
  })

  const update = useMutation({
    mutationFn: (data: BadgeUpdate) => updateBadgeFn({ data }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] })
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, variables.id] })
    },
  })

  const remove = useMutation({
    mutationFn: (id: string) => deleteBadgeFn({ data: { id } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] })
    },
  })

  const reorder = useMutation({
    mutationFn: (data: BadgeReorder) => reorderBadgesFn({ data }),
    onError: (
      _err,
      _newData,
      context: { previousBadges?: Array<BadgeWithCount> } | undefined,
    ) => {
      if (context?.previousBadges) {
        queryClient.setQueryData([QUERY_KEY], context.previousBadges)
      }
    },
    onMutate: async (newData) => {
      // Cancel outgoing queries to avoid race conditions
      await queryClient.cancelQueries({ queryKey: [QUERY_KEY] })

      // Snapshot previous state for rollback
      const previousBadges = queryClient.getQueryData<Array<BadgeWithCount>>([
        QUERY_KEY,
      ])

      // Optimistically update cache with new order
      queryClient.setQueryData(
        [QUERY_KEY],
        (old: Array<BadgeWithCount> | undefined) => {
          if (!old) return old
          return [...old].sort((a, b) => {
            const orderA =
              newData.badges.find((badge) => badge.id === a.id)?.order ??
              a.order
            const orderB =
              newData.badges.find((badge) => badge.id === b.id)?.order ??
              b.order
            return orderA - orderB
          })
        },
      )

      return { previousBadges }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] })
    },
  })

  return {
    create,
    remove,
    reorder,
    update,
  }
}
