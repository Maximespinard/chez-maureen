'use client'

import { motion } from 'framer-motion'

interface OrganicLoaderProps {
  size?: number
}

export const OrganicLoader = ({ size = 120 }: OrganicLoaderProps) => {
  // Formes de blob pour le morphing
  const blobPaths = [
    'M50,30 Q70,25 85,45 T90,70 Q85,85 65,90 T40,85 Q25,75 20,55 T25,35 Q35,25 50,30Z',
    'M50,25 Q75,30 90,50 T85,75 Q75,90 50,95 T25,80 Q15,60 20,40 T35,25 Q45,20 50,25Z',
    'M45,30 Q65,20 85,40 T95,65 Q90,85 70,92 T45,88 Q25,80 18,60 T22,38 Q30,25 45,30Z',
  ]

  return (
    <div className="flex items-center justify-center">
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient
            id="blob-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#34C759" />
            <stop offset="50%" stopColor="#00C7BE" />
            <stop offset="100%" stopColor="#D4754E" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <motion.path
          d={blobPaths[0]}
          fill="url(#blob-gradient)"
          filter="url(#glow)"
          animate={{
            d: blobPaths,
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            d: {
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            },
            rotate: {
              duration: 8,
              repeat: Infinity,
              ease: 'linear',
            },
            scale: {
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            },
          }}
          style={{
            transformOrigin: '50% 50%',
            opacity: 0.9,
          }}
        />
      </svg>
    </div>
  )
}
