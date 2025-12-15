import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'

import { failure, success } from '@/lib/error-serializer'
import { parseDatabaseError } from '@/lib/error-parser'
import {
  ProductCreateSchema,
  ProductUpdateSchema,
} from '@/schemas/product.schema'
import { productService } from '@/server/services/product.service'

// GET all products
export const getAllProducts = createServerFn({ method: 'GET' }).handler(
  async () => {
    return await productService.getAll()
  },
)

// GET single product by ID
export const getProductById = createServerFn({ method: 'GET' })
  .inputValidator(z.object({ id: z.string().uuid() }))
  .handler(async ({ data }) => {
    return await productService.getById(data.id)
  })

// POST create product
export const createProduct = createServerFn({ method: 'POST' })
  .inputValidator(ProductCreateSchema)
  .handler(async ({ data }) => {
    try {
      const product = await productService.create(data)
      return success(product)
    } catch (error) {
      const parsedError = parseDatabaseError(error)
      return failure(parsedError)
    }
  })

// POST update product
export const updateProduct = createServerFn({ method: 'POST' })
  .inputValidator(ProductUpdateSchema)
  .handler(async ({ data }) => {
    try {
      const product = await productService.update(data)
      return success(product)
    } catch (error) {
      const parsedError = parseDatabaseError(error)
      return failure(parsedError)
    }
  })

// POST delete product
export const deleteProduct = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ id: z.string().uuid() }))
  .handler(async ({ data }) => {
    try {
      await productService.delete(data.id)
      return success(undefined)
    } catch (error) {
      const parsedError = parseDatabaseError(error)
      return failure(parsedError)
    }
  })

// POST update product categories
export const updateProductCategories = createServerFn({ method: 'POST' })
  .inputValidator(
    z.object({
      categoryIds: z.array(z.string().uuid()),
      productId: z.string().uuid(),
    }),
  )
  .handler(async ({ data }) => {
    try {
      const result = await productService.updateCategories(
        data.productId,
        data.categoryIds,
      )
      return success(result)
    } catch (error) {
      const parsedError = parseDatabaseError(error)
      return failure(parsedError)
    }
  })

// GET featured products
export const getFeaturedProducts = createServerFn({ method: 'GET' }).handler(
  async () => {
    return await productService.getFeatured()
  },
)

// POST toggle product active status
export const toggleProductActive = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ id: z.string().uuid() }))
  .handler(async ({ data }) => {
    try {
      const product = await productService.toggleActive(data.id)
      return success(product)
    } catch (error) {
      const parsedError = parseDatabaseError(error)
      return failure(parsedError)
    }
  })

// POST update product badges
export const updateProductBadges = createServerFn({ method: 'POST' })
  .inputValidator(
    z.object({
      badgeIds: z.array(z.string().uuid()),
      productId: z.string().uuid(),
    }),
  )
  .handler(async ({ data }) => {
    try {
      const result = await productService.updateBadges(
        data.productId,
        data.badgeIds,
      )
      return success(result)
    } catch (error) {
      const parsedError = parseDatabaseError(error)
      return failure(parsedError)
    }
  })
