import { createServerFn } from '@tanstack/react-start'

import { parseDatabaseError } from '@/lib/error-parser'
import { StoreSettingsUpdateSchema } from '@/schemas/settings.schema'
import { settingsService } from '@/server/services/settings.service'

// GET store settings
export const getSettings = createServerFn({ method: 'GET' }).handler(
  async () => {
    return await settingsService.get()
  },
)

// POST update store settings
export const updateSettings = createServerFn({ method: 'POST' })
  .inputValidator(StoreSettingsUpdateSchema)
  .handler(async ({ data }) => {
    try {
      return await settingsService.update(data)
    } catch (error) {
      throw parseDatabaseError(error)
    }
  })
