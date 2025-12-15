import { formatDistanceToNow } from 'date-fns'
import { fr } from 'date-fns/locale'
import { Mail, MailOpen } from 'lucide-react'

import type { ContactMessageModel } from '@/lib/schema'

interface ContactMessageCardProps {
  message: ContactMessageModel
  onClick: () => void
}

export function ContactMessageCard({
  message,
  onClick,
}: ContactMessageCardProps) {
  const timeAgo = formatDistanceToNow(new Date(message.createdAt), {
    addSuffix: true,
    locale: fr,
  })

  // Tronquer le message pour la preview (80 caractères)
  const preview =
    message.message.length > 80
      ? `${message.message.substring(0, 80)}...`
      : message.message

  return (
    <button
      onClick={onClick}
      className={`w-full rounded-lg border p-4 text-left transition-all hover:shadow-md ${
        message.isRead
          ? 'border-border-subtle bg-white'
          : 'border-primeur-green/30 bg-primeur-green/5'
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Icône statut lu/non-lu */}
        <div
          className={`mt-1 shrink-0 ${
            message.isRead ? 'text-text-light' : 'text-primeur-green'
          }`}
        >
          {message.isRead ? (
            <MailOpen className="size-5" />
          ) : (
            <Mail className="size-5" />
          )}
        </div>

        {/* Contenu */}
        <div className="min-w-0 flex-1">
          {/* Header: Nom + Date */}
          <div className="mb-1 flex items-start justify-between gap-2">
            <span
              className={`font-semibold ${
                message.isRead ? 'text-text-body' : 'text-text-dark'
              }`}
            >
              {message.name}
            </span>
            <span className="text-text-light shrink-0 text-xs">{timeAgo}</span>
          </div>

          {/* Email */}
          <div className="text-text-light mb-2 text-sm">{message.email}</div>

          {/* Preview du message */}
          <div className="text-text-body truncate text-sm">{preview}</div>
        </div>
      </div>
    </button>
  )
}
