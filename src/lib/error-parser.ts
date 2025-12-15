import { DatabaseError, ValidationError } from './app-errors'
import {
  CONSTRAINT_FIELD_MAP,
  DB_ERROR_MESSAGES,
  PG_ERROR_CODES,
} from './database-errors'

/**
 * Vérifie si c'est une erreur NeonDbError (directe ou dans .cause)
 */
export function isNeonDbError(error: unknown): boolean {
  if (!(error instanceof Error)) return false

  // Erreur directe NeonDbError
  if ('code' in error && 'constraint' in error) return true

  // Drizzle wraps NeonDbError dans .cause
  if ('cause' in error && error.cause instanceof Error) {
    return 'code' in error.cause && 'constraint' in error.cause
  }

  return false
}

/**
 * Extrait l'erreur NeonDbError (directe ou depuis .cause)
 */
function extractNeonDbError(error: unknown): unknown {
  if (!(error instanceof Error)) return null

  // Erreur directe
  if ('code' in error && 'constraint' in error) {
    return error
  }

  // Dans .cause (Drizzle wrapper)
  if ('cause' in error && error.cause instanceof Error) {
    if ('code' in error.cause) {
      return error.cause
    }
  }

  return null
}

/**
 * Extrait le champ depuis le nom de contrainte
 * "Category_slug_key" → "slug"
 */
function extractFieldFromConstraint(
  constraint: string | undefined,
): string | undefined {
  if (!constraint) return undefined

  // Mapping explicite d'abord
  if (constraint in CONSTRAINT_FIELD_MAP) {
    return CONSTRAINT_FIELD_MAP[constraint]
  }

  // Pattern: TableName_fieldName_key
  const match = constraint.match(/^\w+_(\w+)_key$/)
  return match?.[1]
}

/**
 * Récupère le message français approprié
 */
function getDatabaseErrorMessage(
  code: string | undefined,
  _constraint: string | undefined,
  field: string | undefined,
): string {
  switch (code) {
    case PG_ERROR_CODES.UNIQUE_VIOLATION:
      if (field && field in DB_ERROR_MESSAGES.UNIQUE_VIOLATION) {
        return DB_ERROR_MESSAGES.UNIQUE_VIOLATION[
          field as keyof typeof DB_ERROR_MESSAGES.UNIQUE_VIOLATION
        ]
      }
      return DB_ERROR_MESSAGES.UNIQUE_VIOLATION.default

    case PG_ERROR_CODES.FOREIGN_KEY_VIOLATION:
      return DB_ERROR_MESSAGES.FOREIGN_KEY_VIOLATION.default

    case PG_ERROR_CODES.NOT_NULL_VIOLATION:
      return DB_ERROR_MESSAGES.NOT_NULL_VIOLATION.default

    case PG_ERROR_CODES.CHECK_VIOLATION:
      return DB_ERROR_MESSAGES.CHECK_VIOLATION.default

    default:
      return DB_ERROR_MESSAGES.UNKNOWN
  }
}

/**
 * Transforme une erreur Drizzle/Neon en AppError convivial
 */
export function parseDatabaseError(error: unknown): Error {
  const neonError = extractNeonDbError(error)

  if (!neonError) {
    if (error instanceof Error) return error
    return new Error(String(error))
  }

  const err = neonError as Record<string, unknown> // NeonDbError
  const field = extractFieldFromConstraint(err.constraint as string | undefined)
  const message = getDatabaseErrorMessage(
    err.code as string | undefined,
    err.constraint as string | undefined,
    field,
  )

  // Violation contrainte unique → ValidationError
  if (err.code === PG_ERROR_CODES.UNIQUE_VIOLATION) {
    return new ValidationError(message, field, {
      constraint: err.constraint,
      originalCode: err.code,
      table: err.table,
    })
  }

  // Violation clé étrangère → ValidationError
  if (err.code === PG_ERROR_CODES.FOREIGN_KEY_VIOLATION) {
    return new ValidationError(message, undefined, {
      constraint: err.constraint,
      originalCode: err.code,
      table: err.table,
    })
  }

  // Violation NOT NULL → ValidationError
  if (err.code === PG_ERROR_CODES.NOT_NULL_VIOLATION) {
    return new ValidationError(message, err.column as string | undefined, {
      column: err.column,
      constraint: err.constraint,
      originalCode: err.code,
      table: err.table,
    })
  }

  // Violation CHECK constraint → ValidationError
  if (err.code === PG_ERROR_CODES.CHECK_VIOLATION) {
    return new ValidationError(message, field, {
      constraint: err.constraint,
      originalCode: err.code,
      table: err.table,
    })
  }

  // Autres erreurs DB
  return new DatabaseError(message, error, {
    code: err.code,
    constraint: err.constraint,
    table: err.table,
  })
}
