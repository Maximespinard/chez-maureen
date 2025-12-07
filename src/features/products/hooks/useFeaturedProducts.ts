import { useQuery } from '@tanstack/react-query'
import { useServerFn } from '@tanstack/react-start'

import { getFeaturedProducts } from '@/server/functions/products'

export function useFeaturedProducts() {
  const getFeaturedProductsFn = useServerFn(getFeaturedProducts)

  return useQuery({
    queryFn: () => getFeaturedProductsFn(),
    queryKey: ['products', 'featured'],
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}
