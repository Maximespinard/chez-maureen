//  @ts-check

import { tanstackConfig } from '@tanstack/eslint-config'
import tailwind from 'eslint-plugin-tailwindcss'

export default [
  {
    ignores: [
      'eslint.config.js',
      'prettier.config.js',
      'tailwind.config.js', // Fichier de compatibilité pour ESLint plugin
      'dist/**',
      '.tanstack/**',
      'node_modules/**',
      'src/generated/**',
      'src/routeTree.gen.ts',
    ],
  },
  ...tanstackConfig,

  // Configuration Tailwind CSS (sans preset pour compatibilité v4 beta)
  {
    plugins: {
      tailwindcss: tailwind,
    },
    settings: {
      tailwindcss: {
        // Fonctions à analyser pour les classes Tailwind
        callees: ['cn', 'clsx', 'cva', 'classnames'],

        // Désactiver la résolution automatique du config
        config: false,

        // Fichier CSS contenant @theme inline (Tailwind v4)
        cssFiles: ['src/styles.css'],

        // Rafraîchir toutes les 5s pendant le dev
        cssFilesRefreshRate: 5000,

        // Supprimer les classes dupliquées
        removeDuplicates: true,

        // Valider l'attribut className
        skipClassAttribute: false,

        // Classes custom autorisées (à compléter si besoin)
        whitelist: [],

        // Pattern pour détecter les attributs de classe
        classRegex: '^class(Name)?$',
      },
    },
    rules: {
      // ERREURS BLOQUANTES
      'tailwindcss/enforces-shorthand': 'error', // max-w-7xl > max-w-[1280px]
      'tailwindcss/no-unnecessary-arbitrary-value': 'error', // bg-linear-to-b > bg-gradient-to-b
      'tailwindcss/enforces-negative-arbitrary-values': 'error', // top-[-5px] > -top-[5px]
      'tailwindcss/no-contradicting-classname': 'warn', // ⚠️ warn car faux positifs en v4 beta

      // ORDRE & ORGANISATION
      'tailwindcss/classnames-order': 'warn', // Ordre cohérent (prettier s'en charge)

      // DÉSACTIVÉES (autorisent flexibilité)
      'tailwindcss/no-custom-classname': 'off', // Autoriser classes custom du theme
      'tailwindcss/no-arbitrary-value': 'off', // Autoriser valeurs arbitraires si justifié
    },
  },
]
