/**
 * Serializable error object for server function responses
 * Preserves all error metadata across network boundary
 */
export type SerializableError = {
  code: string
  field?: string // For field-level validation errors (e.g., "slug")
  message: string
  metadata?: Record<string, object>
  statusCode?: number
}

/**
 * Standard server function result
 * Inspired by Better Auth pattern
 */
export type ServerFunctionResult<T> =
  | { data: T; error: null }
  | { data: null; error: SerializableError }

/**
 * Helper type for unwrapping data from result
 */
export type Unwrap<T> = T extends ServerFunctionResult<infer U> ? U : never
