import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'

import {
  ProductCreateSchema,
  ProductUpdateSchema,
} from '@/schemas/product.schema'
import { productService } from '@/server/services/product.service'

// GET all products
export const getAllProducts = createServerFn({ method: 'GET' }).handler(async () => {
  return await productService.getAll()
})

// GET single product by ID
export const getProductById = createServerFn({ method: 'GET' })
  .inputValidator(z.object({ id: z.string().cuid() }))
  .handler(async ({ data }) => {
    return await productService.getById(data.id)
  })

// POST create product
export const createProduct = createServerFn({ method: 'POST' })
  .inputValidator(ProductCreateSchema)
  .handler(async ({ data }) => {
    return await productService.create(data)
  })

// POST update product
export const updateProduct = createServerFn({ method: 'POST' })
  .inputValidator(ProductUpdateSchema)
  .handler(async ({ data }) => {
    return await productService.update(data)
  })

// POST delete product
export const deleteProduct = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ id: z.string().cuid() }))
  .handler(async ({ data }) => {
    return await productService.delete(data.id)
  })

// POST update product categories
export const updateProductCategories = createServerFn({ method: 'POST' })
  .inputValidator(
    z.object({
      categoryIds: z.array(z.string().cuid()),
      productId: z.string().cuid(),
    }),
  )
  .handler(async ({ data }) => {
    return await productService.updateCategories(data.productId, data.categoryIds)
  })
