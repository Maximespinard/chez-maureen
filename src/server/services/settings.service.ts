import { eq, sql } from 'drizzle-orm'

import type {
  StoreSettingsUpdate,
  StoreSettingsValue,
} from '@/schemas/settings.schema'
import { DEFAULT_STORE_SETTINGS } from '@/schemas/settings.schema'
import { db } from '@/lib/drizzle'
import { storeSettings } from '@/lib/schema'

const SETTINGS_KEY = 'store'

export class SettingsService {
  /**
   * Get store settings (or return defaults if not found)
   */
  async get(): Promise<StoreSettingsValue> {
    const settings = await db.query.storeSettings.findFirst({
      where: eq(storeSettings.key, SETTINGS_KEY),
    })

    if (!settings) {
      return DEFAULT_STORE_SETTINGS
    }

    // Merge with defaults to ensure all fields exist
    return {
      ...DEFAULT_STORE_SETTINGS,
      ...(settings.value as StoreSettingsValue),
    }
  }

  /**
   * Update store settings (upsert pattern)
   */
  async update(data: StoreSettingsUpdate): Promise<StoreSettingsValue> {
    const [settings] = await db
      .insert(storeSettings)
      .values({
        key: SETTINGS_KEY,
        value: data,
        updatedAt: sql`CURRENT_TIMESTAMP`,
      })
      .onConflictDoUpdate({
        target: storeSettings.key,
        set: {
          value: sql.raw('excluded."value"'),
          updatedAt: sql`CURRENT_TIMESTAMP`,
        },
      })
      .returning()

    return settings.value as StoreSettingsValue
  }
}

export const settingsService = new SettingsService()
