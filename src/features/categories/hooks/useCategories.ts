import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useServerFn } from '@tanstack/react-start'

import type { CategoryCreate, CategoryReorder, CategoryUpdate } from '@/schemas'
import {
  addProductsToCategory,
  createCategory,
  deleteCategory,
  getAllCategories,
  getAvailableProducts,
  getCategoryById,
  removeProductsFromCategory,
  reorderCategories,
  updateCategory,
} from '@/server/functions/categories'

const QUERY_KEY = 'categories'

export function useCategories() {
  const getAllCategoriesFn = useServerFn(getAllCategories)

  return useQuery({
    queryKey: [QUERY_KEY],
    queryFn: () => getAllCategoriesFn(),
  })
}

export function useCategory(id: string) {
  const getCategoryByIdFn = useServerFn(getCategoryById)

  return useQuery({
    enabled: !!id,
    queryFn: () => getCategoryByIdFn({ data: { id } }),
    queryKey: [QUERY_KEY, id],
  })
}

export function useAvailableProducts(categoryId: string) {
  const getAvailableProductsFn = useServerFn(getAvailableProducts)

  return useQuery({
    enabled: !!categoryId,
    queryFn: () => getAvailableProductsFn({ data: { categoryId } }),
    queryKey: [QUERY_KEY, categoryId, 'available-products'],
  })
}

export function useCategoryMutations() {
  const queryClient = useQueryClient()
  const addProductsFn = useServerFn(addProductsToCategory)
  const createCategoryFn = useServerFn(createCategory)
  const deleteCategoryFn = useServerFn(deleteCategory)
  const removeProductsFn = useServerFn(removeProductsFromCategory)
  const reorderCategoriesFn = useServerFn(reorderCategories)
  const updateCategoryFn = useServerFn(updateCategory)

  const create = useMutation({
    mutationFn: (data: CategoryCreate) => createCategoryFn({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] })
    },
  })

  const update = useMutation({
    mutationFn: (data: CategoryUpdate) => updateCategoryFn({ data }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] })
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY, variables.id] })
    },
  })

  const remove = useMutation({
    mutationFn: (id: string) => deleteCategoryFn({ data: { id } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] })
    },
  })

  const reorder = useMutation({
    mutationFn: (data: CategoryReorder) => reorderCategoriesFn({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] })
    },
  })

  const addProducts = useMutation({
    mutationFn: ({
      categoryId,
      productIds,
    }: {
      categoryId: string
      productIds: Array<string>
    }) => addProductsFn({ data: { categoryId, productIds } }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY, variables.categoryId],
      })
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })

  const removeProducts = useMutation({
    mutationFn: ({
      categoryId,
      productIds,
    }: {
      categoryId: string
      productIds: Array<string>
    }) => removeProductsFn({ data: { categoryId, productIds } }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY, variables.categoryId],
      })
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })

  return {
    addProducts,
    create,
    remove,
    removeProducts,
    reorder,
    update,
  }
}
