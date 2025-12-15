import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useServerFn } from '@tanstack/react-start'

import type { ProductCreate, ProductUpdate } from '@/schemas'
import type { ProductWithRelations } from '@/types/product'
import type { ServerFunctionResult } from '@/types/server-function'
import {
  createProduct,
  deleteProduct,
  toggleProductActive,
  updateProduct,
  updateProductBadges,
} from '@/server/functions/products'

export function useProductMutations() {
  const queryClient = useQueryClient()
  const createProductFn = useServerFn(createProduct)
  const deleteProductFn = useServerFn(deleteProduct)
  const toggleProductActiveFn = useServerFn(toggleProductActive)
  const updateProductBadgesFn = useServerFn(updateProductBadges)
  const updateProductFn = useServerFn(updateProduct)

  const create = useMutation({
    mutationFn: async (data: ProductCreate) => {
      const result = (await createProductFn({
        data,
      })) as ServerFunctionResult<ProductWithRelations>
      if (result.error) {
        throw result.error
      }
      return result.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
  })

  const update = useMutation({
    mutationFn: async (data: ProductUpdate) => {
      const result = (await updateProductFn({
        data,
      })) as ServerFunctionResult<ProductWithRelations>
      if (result.error) {
        throw result.error
      }
      return result.data
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      queryClient.invalidateQueries({ queryKey: ['products', variables.id] })
      queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
  })

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const result = (await deleteProductFn({
        data: { id },
      })) as ServerFunctionResult<undefined>
      if (result.error) {
        throw result.error
      }
      return result.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
  })

  // Toggle active status with optimistic update
  const toggleActive = useMutation({
    mutationFn: async (id: string) => {
      const result = (await toggleProductActiveFn({
        data: { id },
      })) as ServerFunctionResult<ProductWithRelations>
      if (result.error) {
        throw result.error
      }
      return result.data
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ['products'] })
      const previousProducts = queryClient.getQueryData<
        Array<ProductWithRelations>
      >(['products'])

      queryClient.setQueryData<Array<ProductWithRelations>>(
        ['products'],
        (old) => {
          if (!old) return old
          return old.map((p) =>
            p.id === id ? { ...p, isActive: !p.isActive } : p,
          )
        },
      )

      return { previousProducts }
    },
    onError: (
      _err,
      _id,
      context: { previousProducts?: Array<ProductWithRelations> } | undefined,
    ) => {
      if (context?.previousProducts) {
        queryClient.setQueryData(['products'], context.previousProducts)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })

  // Update badges
  const updateBadges = useMutation({
    mutationFn: async (data: {
      badgeIds: Array<string>
      productId: string
    }) => {
      const result = (await updateProductBadgesFn({
        data,
      })) as ServerFunctionResult<ProductWithRelations | null>
      if (result.error) {
        throw result.error
      }
      return result.data
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      queryClient.invalidateQueries({
        queryKey: ['products', variables.productId],
      })
    },
  })

  return {
    create,
    remove,
    toggleActive,
    update,
    updateBadges,
  }
}
