import { useQuery } from '@tanstack/react-query'
import { useServerFn } from '@tanstack/react-start'

import { getAllContactMessages } from '@/server/functions/contact-messages'

export function useUnreadMessagesCount() {
  const getAllContactMessagesFn = useServerFn(getAllContactMessages)

  return useQuery({
    queryKey: ['contact-messages', 'unread-count'],
    queryFn: async () => {
      const messages = await getAllContactMessagesFn()
      return messages.filter((msg) => !msg.isRead).length
    },
    // Refetch every minute
    refetchInterval: 60 * 1000,
    staleTime: 60 * 1000,
  })
}
