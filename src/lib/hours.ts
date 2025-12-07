import type { DayHours, Hours } from '@/schemas/settings.schema'

// ============================================================
// CONSTANTS
// ============================================================

/**
 * Days of the week with their keys and French labels
 * Used in SettingsForm, StoreInfoSection, and StoreInfo
 */
export const DAYS = [
  { key: 'monday', label: 'Lundi' },
  { key: 'tuesday', label: 'Mardi' },
  { key: 'wednesday', label: 'Mercredi' },
  { key: 'thursday', label: 'Jeudi' },
  { key: 'friday', label: 'Vendredi' },
  { key: 'saturday', label: 'Samedi' },
  { key: 'sunday', label: 'Dimanche' },
] as const

export type DayKey = (typeof DAYS)[number]['key']

// ============================================================
// FORMATTING FUNCTIONS
// ============================================================

/**
 * Format a single day's hours for display
 * @param day - DayHours object with isClosed, openTime, closeTime
 * @returns Formatted string like "08:00 – 19:00" or "Fermé"
 */
export function formatHours(day: DayHours): string {
  if (day.isClosed) return 'Fermé'
  return `${day.openTime} – ${day.closeTime}`
}

// ============================================================
// COMPACTED HOURS (Display Only)
// ============================================================

/**
 * Represents a group of consecutive days with the same hours
 */
export interface CompactedHoursGroup {
  /** Label for the group, e.g., "Lundi" or "Mardi – Samedi" */
  label: string
  /** Formatted hours string, e.g., "08:00 – 19:00" or "Fermé" */
  hours: string
  /** Whether this group represents closed days */
  isClosed: boolean
}

/**
 * Groups consecutive days with identical hours for compact display
 *
 * Example:
 * Input: { monday: closed, tuesday-saturday: 08:00-19:00, sunday: 08:00-13:00 }
 * Output: [
 *   { label: "Lundi", hours: "Fermé", isClosed: true },
 *   { label: "Mardi – Samedi", hours: "08:00 – 19:00", isClosed: false },
 *   { label: "Dimanche", hours: "08:00 – 13:00", isClosed: false }
 * ]
 *
 * @param hours - Hours object with all 7 days
 * @returns Array of compacted hour groups
 */
export function getCompactedHours(hours: Hours): Array<CompactedHoursGroup> {
  const groups: Array<CompactedHoursGroup> = []
  let currentGroup: {
    startIndex: number
    endIndex: number
    hours: string
    isClosed: boolean
  } | null = null

  for (let i = 0; i < DAYS.length; i++) {
    const day = DAYS[i]
    const dayHours = hours[day.key]
    const formattedHours = formatHours(dayHours)

    if (currentGroup === null) {
      // Start a new group
      currentGroup = {
        startIndex: i,
        endIndex: i,
        hours: formattedHours,
        isClosed: dayHours.isClosed,
      }
    } else if (currentGroup.hours === formattedHours) {
      // Extend current group
      currentGroup.endIndex = i
    } else {
      // Close current group and start a new one
      groups.push(
        createGroup(currentGroup.startIndex, currentGroup.endIndex, currentGroup.hours, currentGroup.isClosed),
      )
      currentGroup = {
        startIndex: i,
        endIndex: i,
        hours: formattedHours,
        isClosed: dayHours.isClosed,
      }
    }
  }

  // Close the last group
  if (currentGroup !== null) {
    groups.push(
      createGroup(currentGroup.startIndex, currentGroup.endIndex, currentGroup.hours, currentGroup.isClosed),
    )
  }

  return groups
}

/**
 * Helper function to create a CompactedHoursGroup
 */
function createGroup(
  startIndex: number,
  endIndex: number,
  hours: string,
  isClosed: boolean,
): CompactedHoursGroup {
  const startLabel = DAYS[startIndex].label
  const endLabel = DAYS[endIndex].label

  return {
    label: startIndex === endIndex ? startLabel : `${startLabel} – ${endLabel}`,
    hours,
    isClosed,
  }
}
