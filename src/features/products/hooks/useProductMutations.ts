import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useServerFn } from '@tanstack/react-start'

import type { ProductCreate, ProductUpdate } from '@/schemas'
import type { ProductWithRelations } from '@/types/product'
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
    mutationFn: (data: ProductCreate) => createProductFn({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
  })

  const update = useMutation({
    mutationFn: (data: ProductUpdate) => updateProductFn({ data }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      queryClient.invalidateQueries({ queryKey: ['products', variables.id] })
      queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
  })

  const remove = useMutation({
    mutationFn: (id: string) => deleteProductFn({ data: { id } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
  })

  // Toggle active status with optimistic update
  const toggleActive = useMutation({
    mutationFn: (id: string) => toggleProductActiveFn({ data: { id } }),
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
    mutationFn: (data: { badgeIds: Array<string>; productId: string }) =>
      updateProductBadgesFn({ data }),
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
