import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useServerFn } from '@tanstack/react-start'

import type { ContactMessageModel } from '@/lib/schema'
import {
  deleteContactMessage,
  getAllContactMessages,
  toggleMessageRead,
} from '@/server/functions/contact-messages'

/**
 * Hook pour récupérer tous les messages de contact
 */
export function useContactMessages() {
  const getAllContactMessagesFn = useServerFn(getAllContactMessages)

  return useQuery({
    queryKey: ['contact-messages'],
    queryFn: () => getAllContactMessagesFn(),
  })
}

/**
 * Hook pour les mutations sur les messages de contact
 */
export function useContactMessageMutations() {
  const queryClient = useQueryClient()
  const toggleMessageReadFn = useServerFn(toggleMessageRead)
  const deleteContactMessageFn = useServerFn(deleteContactMessage)

  // Toggle lu/non-lu avec optimistic update
  const toggleRead = useMutation({
    mutationFn: (id: string) =>
      toggleMessageReadFn({
        data: { id },
      }),
    onMutate: async (id) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['contact-messages'] })

      // Snapshot previous value
      const previousMessages = queryClient.getQueryData<
        Array<ContactMessageModel>
      >(['contact-messages'])

      // Optimistically update
      queryClient.setQueryData<Array<ContactMessageModel>>(
        ['contact-messages'],
        (old) => {
          if (!old) return old
          return old.map((msg) =>
            msg.id === id ? { ...msg, isRead: !msg.isRead } : msg,
          )
        },
      )

      return { previousMessages }
    },
    onError: (_err, _id, context) => {
      // Rollback on error
      if (context?.previousMessages) {
        queryClient.setQueryData(['contact-messages'], context.previousMessages)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['contact-messages'] })
    },
  })

  // Supprimer un message avec optimistic update
  const remove = useMutation({
    mutationFn: (id: string) =>
      deleteContactMessageFn({
        data: { id },
      }),
    onMutate: async (id) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['contact-messages'] })

      // Snapshot previous value
      const previousMessages = queryClient.getQueryData<
        Array<ContactMessageModel>
      >(['contact-messages'])

      // Optimistically remove the message
      queryClient.setQueryData<Array<ContactMessageModel>>(
        ['contact-messages'],
        (old) => {
          if (!old) return old
          return old.filter((msg) => msg.id !== id)
        },
      )

      return { previousMessages }
    },
    onError: (_err, _id, context) => {
      // Rollback on error
      if (context?.previousMessages) {
        queryClient.setQueryData(['contact-messages'], context.previousMessages)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['contact-messages'] })
    },
  })

  return {
    remove,
    toggleRead,
  }
}
