import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'

import { parseDatabaseError } from '@/lib/error-parser'
import {
  CategoryCreateSchema,
  CategoryDeleteSchema,
  CategoryReorderSchema,
  CategoryUpdateSchema,
} from '@/schemas/category.schema'
import { categoryService } from '@/server/services/category.service'

// GET all categories
export const getAllCategories = createServerFn({ method: 'GET' }).handler(
  async () => {
    return await categoryService.getAll()
  },
)

// GET single category by ID
export const getCategoryById = createServerFn({ method: 'GET' })
  .inputValidator(z.object({ id: z.string().uuid() }))
  .handler(async ({ data }) => {
    return await categoryService.getById(data.id)
  })

// GET available products for category
export const getAvailableProducts = createServerFn({ method: 'GET' })
  .inputValidator(z.object({ categoryId: z.string().uuid() }))
  .handler(async ({ data }) => {
    return await categoryService.getAvailableProducts(data.categoryId)
  })

// POST create category
export const createCategory = createServerFn({ method: 'POST' })
  .inputValidator(CategoryCreateSchema)
  .handler(async ({ data }) => {
    try {
      return await categoryService.create(data)
    } catch (error) {
      throw parseDatabaseError(error)
    }
  })

// POST update category
export const updateCategory = createServerFn({ method: 'POST' })
  .inputValidator(CategoryUpdateSchema)
  .handler(async ({ data }) => {
    try {
      return await categoryService.update(data)
    } catch (error) {
      throw parseDatabaseError(error)
    }
  })

// POST delete category
export const deleteCategory = createServerFn({ method: 'POST' })
  .inputValidator(CategoryDeleteSchema)
  .handler(async ({ data }) => {
    try {
      return await categoryService.delete(data.id)
    } catch (error) {
      throw parseDatabaseError(error)
    }
  })

// POST reorder categories
export const reorderCategories = createServerFn({ method: 'POST' })
  .inputValidator(CategoryReorderSchema)
  .handler(async ({ data }) => {
    try {
      return await categoryService.reorder(data)
    } catch (error) {
      throw parseDatabaseError(error)
    }
  })

// POST add products to category
export const addProductsToCategory = createServerFn({ method: 'POST' })
  .inputValidator(
    z.object({
      categoryId: z.string().uuid(),
      productIds: z.array(z.string().uuid()),
    }),
  )
  .handler(async ({ data }) => {
    try {
      return await categoryService.addProducts(data.categoryId, data.productIds)
    } catch (error) {
      throw parseDatabaseError(error)
    }
  })

// POST remove products from category
export const removeProductsFromCategory = createServerFn({ method: 'POST' })
  .inputValidator(
    z.object({
      categoryId: z.string().uuid(),
      productIds: z.array(z.string().uuid()),
    }),
  )
  .handler(async ({ data }) => {
    try {
      return await categoryService.removeProducts(
        data.categoryId,
        data.productIds,
      )
    } catch (error) {
      throw parseDatabaseError(error)
    }
  })
