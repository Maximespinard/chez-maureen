import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'

import {
  BadgeCreateSchema,
  BadgeDeleteSchema,
  BadgeReorderSchema,
  BadgeUpdateSchema,
} from '@/schemas/badge.schema'
import { badgeService } from '@/server/services/badge.service'

// GET all badges
export const getAllBadges = createServerFn({ method: 'GET' }).handler(
  async () => {
    return await badgeService.getAll()
  },
)

// GET single badge by ID
export const getBadgeById = createServerFn({ method: 'GET' })
  .inputValidator(z.object({ id: z.string().cuid() }))
  .handler(async ({ data }) => {
    return await badgeService.getById(data.id)
  })

// POST create badge
export const createBadge = createServerFn({ method: 'POST' })
  .inputValidator(BadgeCreateSchema)
  .handler(async ({ data }) => {
    return await badgeService.create(data)
  })

// POST update badge
export const updateBadge = createServerFn({ method: 'POST' })
  .inputValidator(BadgeUpdateSchema)
  .handler(async ({ data }) => {
    return await badgeService.update(data)
  })

// POST delete badge
export const deleteBadge = createServerFn({ method: 'POST' })
  .inputValidator(BadgeDeleteSchema)
  .handler(async ({ data }) => {
    return await badgeService.delete(data.id)
  })

// POST reorder badges
export const reorderBadges = createServerFn({ method: 'POST' })
  .inputValidator(BadgeReorderSchema)
  .handler(async ({ data }) => {
    return await badgeService.reorder(data)
  })
