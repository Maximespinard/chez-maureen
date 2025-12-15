import { ZodError } from 'zod'

import {
  AppError,
  DatabaseError,
  NotFoundError,
  ValidationError,
} from './app-errors'
import type {
  SerializableError,
  ServerFunctionResult,
} from '@/types/server-function'

/**
 * Convertit n'importe quelle erreur en objet sérialisable
 * Préserve tous les métadonnées pour transmission réseau
 */
export function serializeError(error: unknown): SerializableError {
  // ValidationError (contraintes DB, duplicates, etc.)
  if (error instanceof ValidationError) {
    return {
      code: error.code,
      field: error.field, // ✅ Préservé pour UI
      message: error.message,
      metadata: error.metadata as Record<string, object> | undefined,
      statusCode: error.statusCode,
    }
  }

  // DatabaseError
  if (error instanceof DatabaseError) {
    return {
      code: error.code,
      message: error.message,
      metadata: error.metadata as Record<string, object> | undefined,
      statusCode: error.statusCode,
    }
  }

  // NotFoundError
  if (error instanceof NotFoundError) {
    return {
      code: error.code,
      message: error.message,
      metadata: error.metadata as Record<string, object> | undefined,
      statusCode: error.statusCode,
    }
  }

  // Generic AppError
  if (error instanceof AppError) {
    return {
      code: error.code,
      message: error.message,
      metadata: error.metadata as Record<string, object> | undefined,
      statusCode: error.statusCode,
    }
  }

  // Zod validation errors
  if (error instanceof ZodError) {
    const firstIssue = error.issues[0]
    const field =
      firstIssue.path.length > 0 ? firstIssue.path.join('.') : undefined
    return {
      code: 'VALIDATION_ERROR',
      field,
      message: firstIssue.message,
      metadata: { issues: error.issues },
      statusCode: 400,
    }
  }

  // Generic Error
  if (error instanceof Error) {
    return {
      code: 'UNKNOWN_ERROR',
      message: error.message,
      statusCode: 500,
    }
  }

  // Unknown error type
  return {
    code: 'UNKNOWN_ERROR',
    message: 'Une erreur est survenue',
    statusCode: 500,
  }
}

/**
 * Helper to create success result
 */
export function success<T>(data: T): ServerFunctionResult<T> {
  return { data, error: null }
}

/**
 * Helper to create error result
 */
export function failure(error: unknown): ServerFunctionResult<never> {
  return { data: null, error: serializeError(error) }
}
