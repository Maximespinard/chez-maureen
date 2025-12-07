import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useServerFn } from '@tanstack/react-start'

import type { ProductCreate, ProductUpdate } from '@/schemas'
import {
  createProduct,
  deleteProduct,
  updateProduct,
} from '@/server/functions/products'

export function useProductMutations() {
  const queryClient = useQueryClient()
  const createProductFn = useServerFn(createProduct)
  const deleteProductFn = useServerFn(deleteProduct)
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

  return {
    create,
    remove,
    update,
  }
}
