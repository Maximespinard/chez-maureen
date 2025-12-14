import { z } from 'zod'

import {
  BUSINESS_FIELDS,
  COMMON_FIELDS,
  VALIDATION,
} from '@/lib/validation-messages'

// === Day Hours Schema ===
export const DayHoursSchema = z.object({
  isClosed: z.boolean(),
  openTime: z
    .string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, VALIDATION.custom.timeFormat)
    .optional(),
  closeTime: z
    .string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, VALIDATION.custom.timeFormat)
    .optional(),
})

// === Business Info Schema ===
export const BusinessInfoSchema = z.object({
  storeName: z
    .string()
    .min(1, BUSINESS_FIELDS.settings.storeNameRequired)
    .max(100, BUSINESS_FIELDS.settings.storeNameMax),
  tagline: z.string().max(200, BUSINESS_FIELDS.settings.taglineMax),
  description: z.string().max(1000, BUSINESS_FIELDS.settings.descriptionMax),
})

// === Contact Schema ===
export const ContactInfoSchema = z.object({
  phone: z.string().max(20, BUSINESS_FIELDS.contact.phoneMaxLength),
  email: z.string().email(COMMON_FIELDS.email.invalid).or(z.literal('')),
  whatsapp: z.string().max(20, BUSINESS_FIELDS.contact.whatsappMaxLength),
})

// === Location Schema ===
export const LocationSchema = z.object({
  address: z.string().max(200, BUSINESS_FIELDS.location.address),
  city: z.string().max(100, BUSINESS_FIELDS.location.city),
  postalCode: z.string().max(20, BUSINESS_FIELDS.location.postalCode),
  country: z.string().max(100, BUSINESS_FIELDS.location.country),
  mapsEmbedUrl: z.string().url(COMMON_FIELDS.url.invalid).or(z.literal('')),
})

// === Hours Schema ===
export const HoursSchema = z.object({
  monday: DayHoursSchema,
  tuesday: DayHoursSchema,
  wednesday: DayHoursSchema,
  thursday: DayHoursSchema,
  friday: DayHoursSchema,
  saturday: DayHoursSchema,
  sunday: DayHoursSchema,
})

// === Social Links Schema ===
export const SocialLinksSchema = z.object({
  facebook: z.string().url(COMMON_FIELDS.url.invalid).or(z.literal('')),
  instagram: z.string().url(COMMON_FIELDS.url.invalid).or(z.literal('')),
})

// === Main Store Settings Schema (JSON value structure) ===
export const StoreSettingsValueSchema = z.object({
  business: BusinessInfoSchema,
  contact: ContactInfoSchema,
  location: LocationSchema,
  hours: HoursSchema,
  social: SocialLinksSchema,
})

// === Full Store Settings Schema (with key) ===
export const StoreSettingsSchema = z.object({
  key: z.literal('store'),
  value: StoreSettingsValueSchema,
  updatedAt: z.date().optional(),
})

// === Update Schema (for form submission) ===
export const StoreSettingsUpdateSchema = StoreSettingsValueSchema

// Type exports
export type DayHours = z.infer<typeof DayHoursSchema>
export type BusinessInfo = z.infer<typeof BusinessInfoSchema>
export type ContactInfo = z.infer<typeof ContactInfoSchema>
export type Location = z.infer<typeof LocationSchema>
export type Hours = z.infer<typeof HoursSchema>
export type SocialLinks = z.infer<typeof SocialLinksSchema>
export type StoreSettingsValue = z.infer<typeof StoreSettingsValueSchema>
export type StoreSettings = z.infer<typeof StoreSettingsSchema>
export type StoreSettingsUpdate = z.infer<typeof StoreSettingsUpdateSchema>

// === Default Store Settings ===
export const DEFAULT_STORE_SETTINGS: StoreSettingsValue = {
  business: {
    storeName: 'Chez Maureen',
    tagline: 'Fruits & légumes frais du marché',
    description:
      'Du champ à vos paniers. Nous privilégions les producteurs locaux pour vous garantir des fruits et légumes frais, savoureux et authentiques.',
  },
  contact: {
    phone: '04 68 81 64 11',
    email: 'maureenfruitsetlegumes@gmail.com',
    whatsapp: '33468816411',
  },
  location: {
    address: 'Rue du Marché 12',
    city: 'Ville',
    postalCode: '1000',
    country: 'Suisse',
    mapsEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2760.4698784160347!2d8.227381!3d47.360078!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47900a1499999999%3A0x0!2sRue%20du%20March%C3%A9%202C%2C%201000%20Lausanne!5e0!3m2!1sfr!2sch!4v1234567890',
  },
  hours: {
    monday: { isClosed: true },
    tuesday: { isClosed: false, openTime: '07:00', closeTime: '19:00' },
    wednesday: { isClosed: false, openTime: '07:00', closeTime: '19:00' },
    thursday: { isClosed: false, openTime: '07:00', closeTime: '19:00' },
    friday: { isClosed: false, openTime: '07:00', closeTime: '19:00' },
    saturday: { isClosed: false, openTime: '07:00', closeTime: '19:00' },
    sunday: { isClosed: false, openTime: '08:00', closeTime: '13:00' },
  },
  social: {
    facebook: '',
    instagram: '',
  },
}
