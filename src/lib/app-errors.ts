/**
 * Erreur applicative de base
 */
export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500,
    public metadata?: Record<string, unknown>,
  ) {
    super(message)
    this.name = 'AppError'
  }
}

/**
 * Erreur de validation (inclut les contraintes DB)
 */
export class ValidationError extends AppError {
  constructor(
    message: string,
    public field?: string, // Pour erreurs au niveau champ
    metadata?: Record<string, unknown>,
  ) {
    super(message, 'VALIDATION_ERROR', 400, metadata)
    this.name = 'ValidationError'
  }
}

/**
 * Erreur base de données générique
 */
export class DatabaseError extends AppError {
  constructor(
    message: string,
    public originalError?: unknown,
    metadata?: Record<string, unknown>,
  ) {
    super(message, 'DATABASE_ERROR', 500, metadata)
    this.name = 'DatabaseError'
  }
}

/**
 * Ressource non trouvée
 */
export class NotFoundError extends AppError {
  constructor(
    message: string,
    public resource?: string,
  ) {
    super(message, 'NOT_FOUND', 404, { resource })
    this.name = 'NotFoundError'
  }
}
