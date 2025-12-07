import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'

import {
  CategoryCreateSchema,
  CategoryDeleteSchema,
  CategoryReorderSchema,
  CategoryUpdateSchema,
} from '@/schemas/category.schema'
import { categoryService } from '@/server/services/category.service'

// GET all categories
export const getAllCategories = createServerFn({ method: 'GET' }).handler(async () => {
  return await categoryService.getAll()
})

// GET single category by ID
export const getCategoryById = createServerFn({ method: 'GET' })
  .inputValidator(z.object({ id: z.string().cuid() }))
  .handler(async ({ data }) => {
    return await categoryService.getById(data.id)
  })

// GET available products for category
export const getAvailableProducts = createServerFn({ method: 'GET' })
  .inputValidator(z.object({ categoryId: z.string().cuid() }))
  .handler(async ({ data }) => {
    return await categoryService.getAvailableProducts(data.categoryId)
  })

// POST create category
export const createCategory = createServerFn({ method: 'POST' })
  .inputValidator(CategoryCreateSchema)
  .handler(async ({ data }) => {
    return await categoryService.create(data)
  })

// POST update category
export const updateCategory = createServerFn({ method: 'POST' })
  .inputValidator(CategoryUpdateSchema)
  .handler(async ({ data }) => {
    return await categoryService.update(data)
  })

// POST delete category
export const deleteCategory = createServerFn({ method: 'POST' })
  .inputValidator(CategoryDeleteSchema)
  .handler(async ({ data }) => {
    return await categoryService.delete(data.id)
  })

// POST reorder categories
export const reorderCategories = createServerFn({ method: 'POST' })
  .inputValidator(CategoryReorderSchema)
  .handler(async ({ data }) => {
    return await categoryService.reorder(data)
  })

// POST add products to category
export const addProductsToCategory = createServerFn({ method: 'POST' })
  .inputValidator(
    z.object({
      categoryId: z.string().cuid(),
      productIds: z.array(z.string().cuid()),
    }),
  )
  .handler(async ({ data }) => {
    return await categoryService.addProducts(data.categoryId, data.productIds)
  })

// POST remove products from category
export const removeProductsFromCategory = createServerFn({ method: 'POST' })
  .inputValidator(
    z.object({
      categoryId: z.string().cuid(),
      productIds: z.array(z.string().cuid()),
    }),
  )
  .handler(async ({ data }) => {
    return await categoryService.removeProducts(data.categoryId, data.productIds)
  })
