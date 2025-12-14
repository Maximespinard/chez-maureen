import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useServerFn } from '@tanstack/react-start'

import type { CategoryCreate, CategoryReorder, CategoryUpdate } from '@/schemas'
import type { CategoryWithCount } from '@/types/category'
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
    onMutate: async (newData) => {
      // Annuler les queries en cours pour éviter les race conditions
      await queryClient.cancelQueries({ queryKey: [QUERY_KEY] })

      // Snapshot de l'état précédent (pour rollback)
      const previousCategories = queryClient.getQueryData([QUERY_KEY])

      // Mettre à jour le cache avec le nouvel ordre
      queryClient.setQueryData(
        [QUERY_KEY],
        (old: Array<CategoryWithCount> | undefined) => {
          if (!old) return old
          // Réordonner selon les nouvelles valeurs d'order
          return [...old].sort((a, b) => {
            const orderA =
              newData.categories.find((c) => c.id === a.id)?.order ?? a.order
            const orderB =
              newData.categories.find((c) => c.id === b.id)?.order ?? b.order
            return orderA - orderB
          })
        },
      )

      // Retourner le context pour rollback
      return { previousCategories }
    },
    onError: (_err, _newData, context) => {
      if (context?.previousCategories) {
        queryClient.setQueryData([QUERY_KEY], context.previousCategories)
      }
    },
    onSettled: () => {
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
