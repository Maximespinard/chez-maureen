import { ZodError } from 'zod'

import { AppError, ValidationError } from './app-errors'
import { parseDatabaseError } from './error-parser'

/**
 * Parse une ZodError et retourne le premier message d'erreur formaté
 * @param error - L'erreur à parser (peut être ZodError ou Error standard)
 * @param fallback - Message par défaut si aucune erreur spécifique n'est trouvée
 * @returns Message d'erreur formaté pour affichage utilisateur
 */
export function formatZodError(
  error: unknown,
  fallback = 'Une erreur est survenue',
): string {
  if (error instanceof ZodError) {
    if (error.issues.length > 0) {
      const firstIssue = error.issues[0]
      const path = firstIssue.path.join('.')
      return path ? `${path}: ${firstIssue.message}` : firstIssue.message
    }
    return 'Erreur de validation'
  }

  if (error instanceof Error) {
    return error.message
  }

  return fallback
}

/**
 * Formatte n'importe quelle erreur (Zod, Database, ou générique)
 * @param error - Erreur à formatter
 * @param fallback - Message par défaut
 * @returns Message d'erreur convivial
 */
export function formatError(
  error: unknown,
  fallback = 'Une erreur est survenue',
): string {
  // Erreurs Zod
  if (error instanceof ZodError) {
    return formatZodError(error, fallback)
  }

  // AppError (ValidationError, DatabaseError, etc.)
  if (error instanceof AppError) {
    return error.message
  }

  // Erreurs DB Drizzle - parser et transformer
  const parsedError = parseDatabaseError(error)
  if (parsedError instanceof AppError) {
    return parsedError.message
  }

  // Erreur générique
  if (error instanceof Error) {
    return error.message
  }

  return fallback
}

/**
 * Extrait l'erreur spécifique à un champ (pour affichage sous le champ)
 * Utile pour amélioration future des formulaires
 */
export function getFieldErrorFromValidation(
  error: unknown,
): { field: string; message: string } | null {
  if (error instanceof ValidationError && error.field) {
    return {
      field: error.field,
      message: error.message,
    }
  }
  return null
}

/**
 * Extrait toutes les erreurs par champ d'une ZodError
 * @param error - ZodError à parser
 * @returns Object avec les champs comme clés et arrays de messages comme valeurs
 */
export function getFieldErrors(error: ZodError): Record<string, Array<string>> {
  const fieldErrors: Record<string, Array<string>> = {}

  for (const issue of error.issues) {
    const fieldName = issue.path.join('.')
    if (!(fieldName in fieldErrors)) {
      fieldErrors[fieldName] = []
    }
    fieldErrors[fieldName].push(issue.message)
  }

  return fieldErrors
}

/**
 * Récupère le premier message d'erreur pour un champ spécifique
 * @param error - ZodError à parser
 * @param fieldName - Nom du champ
 * @returns Premier message d'erreur ou null
 */
export function getFieldError(
  error: ZodError,
  fieldName: string,
): string | null {
  const issue = error.issues.find((i) => i.path.join('.') === fieldName)
  return issue ? issue.message : null
}

/**
 * Extrait le message d'erreur d'une erreur Standard Schema (Zod v4 + TanStack Form)
 * Les erreurs peuvent être des strings ou des objets { message: string }
 * @param error - Erreur à parser (string ou objet Standard Schema)
 * @returns Message d'erreur formaté
 */
export function getErrorMessage(error: unknown): string {
  if (typeof error === 'string') return error
  if (error && typeof error === 'object' && 'message' in error) {
    return String((error as { message: unknown }).message)
  }
  return 'Erreur de validation'
}
