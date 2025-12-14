import type {
  StoreSettingsUpdate,
  StoreSettingsValue,
} from '@/schemas/settings.schema'
import { prisma } from '@/db'
import { DEFAULT_STORE_SETTINGS } from '@/schemas/settings.schema'

const SETTINGS_KEY = 'store'

export class SettingsService {
  /**
   * Get store settings (or return defaults if not found)
   */
  async get(): Promise<StoreSettingsValue> {
    const settings = await prisma.storeSettings.findUnique({
      where: { key: SETTINGS_KEY },
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
    const settings = await prisma.storeSettings.upsert({
      where: { key: SETTINGS_KEY },
      create: {
        key: SETTINGS_KEY,
        value: data,
      },
      update: {
        value: data,
      },
    })

    return settings.value as StoreSettingsValue
  }
}

export const settingsService = new SettingsService()
