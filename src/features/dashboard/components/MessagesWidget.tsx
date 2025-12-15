import { Link } from '@tanstack/react-router'
import { ArrowRight, Mail } from 'lucide-react'

import { Button } from '@/components/ui/button'

interface MessagesWidgetProps {
  unreadCount: number
}

export function MessagesWidget({ unreadCount }: MessagesWidgetProps) {
  return (
    <div className="border-border-subtle rounded-lg border bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-3">
        <div className="rounded-lg bg-orange-50 p-2">
          <Mail className="size-5 text-orange-600" />
        </div>
        <h2 className="text-text-dark text-lg font-semibold">
          Messages de contact
        </h2>
      </div>

      {unreadCount > 0 ? (
        <div className="space-y-4">
          <div className="border-border-subtle rounded-lg border bg-orange-50 p-4">
            <p className="text-text-dark text-sm font-medium">
              {unreadCount} message{unreadCount > 1 ? 's' : ''} non lu
              {unreadCount > 1 ? 's' : ''}
            </p>
            <p className="text-text-light mt-1 text-xs">
              Vous avez de nouveaux messages à consulter
            </p>
          </div>

          <Link to="/admin/messages">
            <Button variant="outline" className="w-full">
              Voir les messages
              <ArrowRight className="ml-2 size-4" />
            </Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-text-light text-sm">
            Aucun nouveau message pour le moment
          </p>
          <Link to="/admin/messages">
            <Button variant="outline" className="w-full">
              Voir tous les messages
              <ArrowRight className="ml-2 size-4" />
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}
