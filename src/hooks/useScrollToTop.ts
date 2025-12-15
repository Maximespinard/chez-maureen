import { useCallback } from 'react'

/**
 * Hook pour scroller vers le haut du conteneur scrollable le plus proche
 *
 * Dans le layout admin, cible l'élément <main> avec overflow-auto.
 * Fallback sur window.scrollTo si aucun conteneur scrollable n'est trouvé.
 *
 * @example
 * const scrollToTop = useScrollToTop()
 * scrollToTop() // smooth scroll
 * scrollToTop('auto') // instant scroll
 */
export function useScrollToTop() {
  const scrollToTop = useCallback((behavior: 'smooth' | 'auto' = 'smooth') => {
    // SSR safety check
    if (typeof window === 'undefined') return

    // Chercher le conteneur scrollable parent
    let scrollContainer: Element | null = null

    // Stratégie 1 : Chercher depuis l'élément actif
    const activeElement = document.activeElement
    if (activeElement) {
      scrollContainer = activeElement.closest(
        '.overflow-auto, .overflow-y-auto, .overflow-scroll, .overflow-y-scroll',
      )
    }

    // Stratégie 2 : Fallback sur le <main> du layout admin
    if (!scrollContainer) {
      scrollContainer = document.querySelector('main.overflow-auto')
    }

    // Exécuter le scroll
    if (scrollContainer) {
      scrollContainer.scrollTo({ top: 0, behavior })
    } else {
      // Final fallback pour les pages non-admin
      window.scrollTo({ top: 0, behavior })
    }
  }, [])

  return scrollToTop
}
