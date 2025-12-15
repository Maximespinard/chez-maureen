import type { Plugin } from 'vite'

/**
 * Vite plugin to polyfill import.meta.url for Cloudflare Workers
 * where import.meta.url returns undefined at runtime
 */
export function importMetaPolyfill(): Plugin {
  return {
    name: 'import-meta-polyfill',
    enforce: 'post',
    // Transform the final bundle chunks
    renderChunk(code, chunk) {
      if (!code.includes('import.meta.url')) {
        return null
      }

      let transformed = code

      // Pattern 1: __banner_node_url.fileURLToPath(import.meta.url)
      transformed = transformed.replace(
        /__banner_node_url\.fileURLToPath\(import\.meta\.url\)/g,
        '"/app"'
      )

      // Pattern 2: fileURLToPath(import.meta.url)
      transformed = transformed.replace(
        /fileURLToPath\(import\.meta\.url\)/g,
        '"/app"'
      )

      // Pattern 3: createRequire(import.meta.url) - provide a shim that uses imports
      // This creates a require function that can handle node:crypto and other Node.js builtins
      transformed = transformed.replace(
        /__banner_node_module\.createRequire\(import\.meta\.url\)/g,
        `((mod) => {
          if (mod === "node:crypto" || mod === "crypto") {
            return globalThis.crypto || { webcrypto: globalThis.crypto };
          }
          if (mod === "node:path" || mod === "path") {
            return { dirname: (p) => p.split("/").slice(0, -1).join("/") || "/" };
          }
          if (mod === "node:fs" || mod === "fs") {
            return {};
          }
          throw new Error("Dynamic require of " + mod + " is not supported in Cloudflare Workers");
        })`
      )

      if (transformed !== code) {
        console.log(`[import-meta-polyfill] Transformed chunk: ${chunk.fileName}`)
        return { code: transformed, map: null }
      }

      return null
    },
  }
}

export default importMetaPolyfill
