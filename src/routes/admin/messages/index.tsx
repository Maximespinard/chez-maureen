import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

import { ContactMessageList } from '@/features/contact/components/admin/ContactMessageList'
import { useContactMessages } from '@/features/contact/hooks/useContactMessages'

export const Route = createFileRoute('/admin/messages/')({
  component: MessagesPage,
})

type FilterType = 'all' | 'unread' | 'read'

function MessagesPage() {
  const { data: messages } = useContactMessages()
  const [filter, setFilter] = useState<FilterType>('all')

  // Compteur de messages non lus
  const unreadCount = messages?.filter((msg) => !msg.isRead).length ?? 0

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-text-dark mb-1 text-2xl font-bold">
          Messages{' '}
          {unreadCount > 0 && (
            <span className="bg-primeur-green ml-2 inline-flex size-6 items-center justify-center rounded-full text-xs font-bold text-white">
              {unreadCount}
            </span>
          )}
        </h1>
        <p className="text-text-body text-sm">
          Consultez les messages envoyés via le formulaire de contact
        </p>
      </div>

      {/* Filtres */}
      <div className="mb-6 flex gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            filter === 'all'
              ? 'bg-primeur-green text-white'
              : 'bg-surface-muted text-text-body hover:bg-surface-card'
          }`}
        >
          Tous
          {messages && (
            <span className="ml-2 text-xs opacity-75">({messages.length})</span>
          )}
        </button>
        <button
          onClick={() => setFilter('unread')}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            filter === 'unread'
              ? 'bg-primeur-green text-white'
              : 'bg-surface-muted text-text-body hover:bg-surface-card'
          }`}
        >
          Non lus
          {unreadCount > 0 && (
            <span className="ml-2 text-xs opacity-75">({unreadCount})</span>
          )}
        </button>
        <button
          onClick={() => setFilter('read')}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            filter === 'read'
              ? 'bg-primeur-green text-white'
              : 'bg-surface-muted text-text-body hover:bg-surface-card'
          }`}
        >
          Lus
          {messages && (
            <span className="ml-2 text-xs opacity-75">
              ({messages.length - unreadCount})
            </span>
          )}
        </button>
      </div>

      {/* Liste des messages */}
      <ContactMessageList filter={filter} />
    </div>
  )
}
