import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useServerFn } from '@tanstack/react-start'

import type { StoreSettingsUpdate } from '@/schemas/settings.schema'
import { getSettings, updateSettings } from '@/server/functions/settings'

const QUERY_KEY = 'settings'

export function useSettings() {
  const getSettingsFn = useServerFn(getSettings)

  return useQuery({
    queryKey: [QUERY_KEY],
    queryFn: () => getSettingsFn(),
    staleTime: 1000 * 60 * 5, // 5 minutes - settings don't change often
  })
}

export function useSettingsMutation() {
  const queryClient = useQueryClient()
  const updateSettingsFn = useServerFn(updateSettings)

  const update = useMutation({
    mutationFn: (data: StoreSettingsUpdate) => updateSettingsFn({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] })
    },
  })

  return { update }
}
