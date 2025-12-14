import { useForm } from '@tanstack/react-form'
import { useServerFn } from '@tanstack/react-start'
import { useState } from 'react'

import type { ContactCreate } from '@/schemas/contact.schema'
import { createContactMessage } from '@/server/functions/contact-messages'

export function useContactForm(turnstileToken: string) {
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const createContactMessageFn = useServerFn(createContactMessage)

  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    } as ContactCreate,
    onSubmit: async ({ value }) => {
      setSubmitError(null)
      setSubmitSuccess(false)

      try {
        // Appeler la server function avec le token Turnstile
        await createContactMessageFn({
          data: {
            ...value,
            turnstileToken,
          },
        })

        // Message de succès
        setSubmitSuccess(true)
        alert('Message envoyé avec succès ! Nous vous répondrons rapidement.')

        // Réinitialiser le formulaire
        form.reset()

        // Recharger la page pour réinitialiser Turnstile
        setTimeout(() => {
          window.location.reload()
        }, 1000)
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Une erreur est survenue lors de l'envoi du message"
        setSubmitError(errorMessage)
        alert(`Erreur : ${errorMessage}`)
      }
    },
  })

  return { form, submitError, submitSuccess }
}
