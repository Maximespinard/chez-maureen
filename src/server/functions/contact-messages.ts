import { createServerFn } from '@tanstack/react-start'
import { eq } from 'drizzle-orm'
import { z } from 'zod'

import { db } from '@/lib/drizzle'
import { contactMessage } from '@/lib/schema'
import { ContactCreateSchema } from '@/schemas/contact.schema'

/**
 * Helper: Vérifier le token Turnstile côté serveur
 */
async function verifyTurnstile(token: string): Promise<boolean> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY

  // Si pas de clé configurée (dev), on skip la validation
  if (!secretKey) {
    console.warn(
      '⚠️  TURNSTILE_SECRET_KEY non configurée, validation Turnstile désactivée',
    )
    return true
  }

  try {
    const response = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          secret: secretKey,
          response: token,
        }),
      },
    )

    const data = await response.json()
    return data.success === true
  } catch (error) {
    console.error('Erreur validation Turnstile:', error)
    return false
  }
}

/**
 * POST - Créer un message de contact (formulaire vitrine)
 */
export const createContactMessage = createServerFn({ method: 'POST' })
  .inputValidator(
    ContactCreateSchema.extend({
      turnstileToken: z.string().min(1, 'Token Turnstile requis'),
    }),
  )
  .handler(async ({ data }) => {
    // Vérifier le token Turnstile
    const isValid = await verifyTurnstile(data.turnstileToken)
    if (!isValid) {
      throw new Error('Validation anti-spam échouée. Veuillez réessayer.')
    }

    // Créer le message
    const { turnstileToken, ...messageData } = data
    const [message] = await db
      .insert(contactMessage)
      .values(messageData)
      .returning()

    return message
  })

/**
 * GET - Récupérer tous les messages (triés par date desc)
 */
export const getAllContactMessages = createServerFn({ method: 'GET' }).handler(
  async () => {
    const messages = await db.query.contactMessage.findMany({
      orderBy: (msg, { desc: descending }) => [descending(msg.createdAt)],
    })

    return messages
  },
)

/**
 * POST - Toggle le statut lu/non-lu d'un message
 */
export const toggleMessageRead = createServerFn({ method: 'POST' })
  .inputValidator(
    z.object({
      id: z.string().cuid(),
    }),
  )
  .handler(async ({ data }) => {
    // Récupérer le message actuel
    const currentMessage = await db.query.contactMessage.findFirst({
      where: eq(contactMessage.id, data.id),
    })

    if (!currentMessage) {
      throw new Error('Message non trouvé')
    }

    // Toggle isRead
    const [updatedMessage] = await db
      .update(contactMessage)
      .set({
        isRead: !currentMessage.isRead,
      })
      .where(eq(contactMessage.id, data.id))
      .returning()

    return updatedMessage
  })

/**
 * POST - Supprimer un message
 */
export const deleteContactMessage = createServerFn({ method: 'POST' })
  .inputValidator(
    z.object({
      id: z.string().cuid(),
    }),
  )
  .handler(async ({ data }) => {
    await db.delete(contactMessage).where(eq(contactMessage.id, data.id))

    return { success: true }
  })
