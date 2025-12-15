import { relations } from 'drizzle-orm'
import {
  boolean,
  decimal,
  integer,
  json,
  pgTable,
  primaryKey,
  text,
  timestamp,
} from 'drizzle-orm/pg-core'

// === CATEGORY ===
export const category = pgTable('Category', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  order: integer('order').notNull().default(0),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const categoryRelations = relations(category, ({ many }) => ({
  products: many(productCategory),
}))

// === PRODUCT ===
export const product = pgTable('Product', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
  price: decimal('price', {
    precision: 10,
    scale: 2,
    mode: 'number',
  }).notNull(),
  unit: text('unit').notNull().default('kg'),
  origin: text('origin'),
  image: text('image'),
  imageKey: text('imageKey'),
  isActive: boolean('isActive').notNull().default(true),
  isFeatured: boolean('isFeatured').notNull().default(false),
  featuredOrder: integer('featuredOrder'),
  discountPercent: decimal('discountPercent', {
    precision: 5,
    scale: 2,
    mode: 'number',
  }),
  discountAmount: decimal('discountAmount', {
    precision: 10,
    scale: 2,
    mode: 'number',
  }),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const productRelations = relations(product, ({ many }) => ({
  categories: many(productCategory),
  badges: many(productBadge),
}))

// === PRODUCT_CATEGORY (junction) ===
export const productCategory = pgTable(
  'ProductCategory',
  {
    productId: text('productId')
      .notNull()
      .references(() => product.id, { onDelete: 'cascade' }),
    categoryId: text('categoryId')
      .notNull()
      .references(() => category.id, { onDelete: 'restrict' }),
  },
  (t) => [primaryKey({ columns: [t.productId, t.categoryId] })],
)

export const productCategoryRelations = relations(
  productCategory,
  ({ one }) => ({
    product: one(product, {
      fields: [productCategory.productId],
      references: [product.id],
    }),
    category: one(category, {
      fields: [productCategory.categoryId],
      references: [category.id],
    }),
  }),
)

// === BADGE ===
export const badge = pgTable('Badge', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  color: text('color').notNull(),
  order: integer('order').notNull().default(0),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

export const badgeRelations = relations(badge, ({ many }) => ({
  products: many(productBadge),
}))

// === PRODUCT_BADGE (junction) ===
export const productBadge = pgTable(
  'ProductBadge',
  {
    productId: text('productId')
      .notNull()
      .references(() => product.id, { onDelete: 'cascade' }),
    badgeId: text('badgeId')
      .notNull()
      .references(() => badge.id, { onDelete: 'cascade' }),
    value: text('value'),
  },
  (t) => [primaryKey({ columns: [t.productId, t.badgeId] })],
)

export const productBadgeRelations = relations(productBadge, ({ one }) => ({
  product: one(product, {
    fields: [productBadge.productId],
    references: [product.id],
  }),
  badge: one(badge, {
    fields: [productBadge.badgeId],
    references: [badge.id],
  }),
}))

// === STORE_SETTINGS ===
export const storeSettings = pgTable('StoreSettings', {
  key: text('key').primaryKey(),
  value: json('value').notNull(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
})

// === CONTACT_MESSAGE ===
export const contactMessage = pgTable('ContactMessage', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name').notNull(),
  email: text('email'),
  phone: text('phone'),
  message: text('message').notNull(),
  isRead: boolean('isRead').notNull().default(false),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
})

// === TYPE EXPORTS ===
export type BadgeModel = typeof badge.$inferSelect
export type CategoryModel = typeof category.$inferSelect
export type ContactMessageModel = typeof contactMessage.$inferSelect
export type ProductModel = typeof product.$inferSelect
export type ProductBadgeModel = typeof productBadge.$inferSelect
export type ProductCategoryModel = typeof productCategory.$inferSelect
export type StoreSettingsModel = typeof storeSettings.$inferSelect
