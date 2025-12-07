/**
 * Dictionnaire centralisé des messages de validation Zod en français
 * Utilisé dans tous les schémas pour garantir la cohérence
 */

// Messages génériques pour champs communs
export const COMMON_FIELDS = {
  name: {
    required: 'Le nom est requis',
    maxLength: (max: number) => `Le nom ne peut pas dépasser ${max} caractères`,
  },
  slug: {
    required: 'Le slug est requis',
    maxLength: (max: number) => `Le slug ne peut pas dépasser ${max} caractères`,
    invalid: 'Slug invalide (lettres minuscules, chiffres et tirets uniquement)',
  },
  description: {
    maxLength: (max: number) =>
      `La description ne peut pas dépasser ${max} caractères`,
  },
  email: {
    invalid: 'Adresse email invalide',
  },
  url: {
    invalid: 'URL invalide',
  },
  order: {
    mustBeInteger: "Le numéro d'ordre doit être un entier",
    mustBePositive: "Le numéro d'ordre doit être supérieur ou égal à 0",
  },
}

// Messages génériques par type de validation
export const VALIDATION = {
  string: {
    required: (field: string) => `Le ${field} est requis`,
    minLength: (field: string, min: number) =>
      `Le ${field} doit contenir au moins ${min} caractères`,
    maxLength: (field: string, max: number) =>
      `Le ${field} ne peut pas dépasser ${max} caractères`,
    email: 'Adresse email invalide',
    url: 'URL invalide',
  },
  number: {
    min: (field: string, min: number) =>
      `Le ${field} doit être supérieur ou égal à ${min}`,
    max: (field: string, max: number) =>
      `Le ${field} ne peut pas dépasser ${max}`,
    positive: (field: string) => `Le ${field} doit être positif`,
    integer: (field: string) => `Le ${field} doit être un entier`,
  },
  array: {
    minOne: (element: string) => `Au moins un(e) ${element} est requis(e)`,
  },
  custom: {
    hexColor: 'Couleur hex invalide (format: #RRGGBB)',
    timeFormat: 'Format horaire invalide (HH:MM)',
    passwordMatch: 'Les mots de passe ne correspondent pas',
  },
}

// Messages spécifiques pour certains domaines métier
export const BUSINESS_FIELDS = {
  price: {
    positive: 'Le prix doit être positif',
  },
  discount: {
    min: 'La réduction doit être supérieure ou égale à 0',
    max: 'La réduction ne peut pas dépasser 100%',
    amountPositive: 'Le montant de la réduction doit être positif',
  },
  contact: {
    messageMinLength: 'Le message doit contenir au moins 10 caractères',
    phoneMaxLength: 'Le numéro de téléphone ne peut pas dépasser 20 caractères',
    whatsappMaxLength: 'Le numéro WhatsApp ne peut pas dépasser 20 caractères',
  },
  location: {
    address: "L'adresse ne peut pas dépasser 200 caractères",
    city: 'La ville ne peut pas dépasser 100 caractères',
    postalCode: 'Le code postal ne peut pas dépasser 20 caractères',
    country: 'Le pays ne peut pas dépasser 100 caractères',
  },
  settings: {
    storeNameRequired: 'Le nom du commerce est requis',
    storeNameMax: 'Le nom du commerce ne peut pas dépasser 100 caractères',
    taglineMax: 'Le slogan ne peut pas dépasser 200 caractères',
    descriptionMax: 'La description ne peut pas dépasser 1000 caractères',
  },
}
