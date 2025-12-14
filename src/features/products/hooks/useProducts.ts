import { useQuery } from '@tanstack/react-query'
import { useServerFn } from '@tanstack/react-start'

import { getAllProducts, getProductById } from '@/server/functions/products'

const QUERY_KEY = 'products'

export function useProducts() {
  const getAllProductsFn = useServerFn(getAllProducts)

  return useQuery({
    queryFn: () => getAllProductsFn(),
    queryKey: [QUERY_KEY],
  })
}

export function useProduct(id: string) {
  const getProductByIdFn = useServerFn(getProductById)

  return useQuery({
    enabled: !!id,
    queryFn: () => getProductByIdFn({ data: { id } }),
    queryKey: [QUERY_KEY, id],
  })
}
