import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'
import { cloudflare } from '@cloudflare/vite-plugin'
import importMetaPolyfill from './import-meta-polyfill.ts'
import neon from './neon-vite-plugin.ts'

const config = defineConfig(({ mode }) => ({
  plugins: [
    devtools(),
    // Plugin Cloudflare uniquement en production
    ...(mode === 'production'
      ? [cloudflare({ viteEnvironment: { name: 'ssr' } })]
      : []),
    // Polyfill import.meta.url pour Cloudflare Workers
    ...(mode === 'production' ? [importMetaPolyfill()] : []),
    // Plugin neon uniquement en dev (dev database seeding)
    ...(mode !== 'production' ? [neon] : []),
    // this is the plugin that enables path aliases
    viteTsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
    tailwindcss(),
    tanstackStart(),
    viteReact(),
  ],
}))

export default config
