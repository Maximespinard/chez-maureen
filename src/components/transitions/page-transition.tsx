'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { ReactNode} from 'react';
import { OrganicLoader } from '@/components/ui/organic-loader'

interface PageTransitionProps {
  children: ReactNode
  isReady: boolean
}

export const PageTransition = ({ children, isReady }: PageTransitionProps) => {
  const [transitionState, setTransitionState] = useState<
    'loading' | 'transitioning' | 'ready'
  >('loading')

  useEffect(() => {
    if (!isReady) return

    // Phase 1: Loader visible (800ms)
    const loaderTimer = setTimeout(() => {
      setTransitionState('transitioning')
    }, 800)

    // Phase 2: Transition complète (1500ms total)
    const transitionTimer = setTimeout(() => {
      setTransitionState('ready')
    }, 1500)

    return () => {
      clearTimeout(loaderTimer)
      clearTimeout(transitionTimer)
    }
  }, [isReady])

  if (transitionState === 'ready') {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0, filter: 'blur(10px)' }}
        animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
        transition={{
          duration: 0.7,
          ease: [0.16, 1, 0.3, 1], // Custom easing pour effet "award"
        }}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <div className="bg-primeur-cream fixed inset-0 z-50 flex items-center justify-center">
      <AnimatePresence>
        {transitionState === 'loading' && (
          <motion.div
            key="loader"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{
              scale: 3,
              opacity: 0,
              filter: 'blur(20px)',
            }}
            transition={{
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <OrganicLoader size={140} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
