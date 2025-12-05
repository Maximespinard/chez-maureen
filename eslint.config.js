//  @ts-check

import { tanstackConfig } from '@tanstack/eslint-config'

export default [
  {
    ignores: [
      'eslint.config.js',
      'prettier.config.js',
      'dist/**',
      '.tanstack/**',
      'node_modules/**',
      'src/generated/**',
      'src/routeTree.gen.ts',
    ],
  },
  ...tanstackConfig,
]
