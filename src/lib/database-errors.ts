/**
 * Codes d'erreur PostgreSQL
 */
export const PG_ERROR_CODES = {
  UNIQUE_VIOLATION: '23505',
  FOREIGN_KEY_VIOLATION: '23503',
  NOT_NULL_VIOLATION: '23502',
  CHECK_VIOLATION: '23514',
} as const

/**
 * Messages d'erreur français par type d'erreur et champ
 */
export const DB_ERROR_MESSAGES = {
  UNIQUE_VIOLATION: {
    default: 'Cette valeur existe déjà',
    slug: 'Ce slug est déjà utilisé',
    name: 'Ce nom est déjà utilisé',
  },
  FOREIGN_KEY_VIOLATION: {
    default: 'Opération impossible : des éléments dépendent de cette donnée',
  },
  NOT_NULL_VIOLATION: {
    default: 'Un champ requis est manquant',
  },
  CHECK_VIOLATION: {
    default: 'La valeur ne respecte pas les contraintes de validation',
  },
  UNKNOWN: "Une erreur est survenue lors de l'opération",
} as const

/**
 * Mapping nom de contrainte → champ
 * Permet d'identifier quel champ a causé l'erreur
 */
export const CONSTRAINT_FIELD_MAP: Record<string, string> = {
  Category_slug_key: 'slug',
  Product_slug_key: 'slug',
  Badge_slug_key: 'slug',
  ProductCategory_pkey: 'categoryId',
  ProductBadge_pkey: 'badgeId',
} as const
