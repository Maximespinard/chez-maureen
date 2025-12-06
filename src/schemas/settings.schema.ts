import { z } from 'zod'

export const StoreSettingsSchema = z.object({
  key: z.string(),
  value: z.record(z.string(), z.unknown()),
})

export type StoreSettings = z.infer<typeof StoreSettingsSchema>
