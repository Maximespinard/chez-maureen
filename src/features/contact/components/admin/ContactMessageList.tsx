import { Loader2, MailOpen } from 'lucide-react'
import { useState } from 'react'

import { ContactMessageCard } from './ContactMessageCard'
import { ContactMessageDialog } from './ContactMessageDialog'
import type { ContactMessageModel } from '@/lib/schema'
import { useContactMessages } from '@/features/contact/hooks/useContactMessages'

interface ContactMessageListProps {
  filter: 'all' | 'unread' | 'read'
}

export function ContactMessageList({ filter }: ContactMessageListProps) {
  const { data: messages, isLoading } = useContactMessages()
  const [selectedMessage, setSelectedMessage] =
    useState<ContactMessageModel | null>(null)

  // Filtrer les messages selon le filtre actif
  const filteredMessages = messages?.filter((msg) => {
    if (filter === 'unread') return !msg.isRead
    if (filter === 'read') return msg.isRead
    return true // 'all'
  })

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="text-primeur-green size-8 animate-spin" />
      </div>
    )
  }

  // Empty state
  if (!filteredMessages || filteredMessages.length === 0) {
    return (
      <div className="border-border-subtle flex flex-col items-center justify-center rounded-lg border bg-white p-12 text-center">
        <MailOpen className="text-text-light mb-4 size-12" />
        <h3 className="text-text-dark mb-2 text-lg font-semibold">
          Aucun message
        </h3>
        <p className="text-text-body text-sm">
          {filter === 'unread' && 'Aucun message non lu.'}
          {filter === 'read' && 'Aucun message lu.'}
          {filter === 'all' &&
            'Aucun message pour le moment. Les messages envoyés via le formulaire de contact apparaîtront ici.'}
        </p>
      </div>
    )
  }

  // Liste des messages
  return (
    <>
      <div className="space-y-3">
        {filteredMessages.map((message) => (
          <ContactMessageCard
            key={message.id}
            message={message}
            onClick={() => setSelectedMessage(message)}
          />
        ))}
      </div>

      {/* Dialog détail */}
      <ContactMessageDialog
        message={selectedMessage}
        open={!!selectedMessage}
        onOpenChange={(open) => !open && setSelectedMessage(null)}
      />
    </>
  )
}
