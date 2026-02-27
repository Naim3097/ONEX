'use client'

import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { ReactNode } from 'react'

interface FadeInProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  distance?: number
  once?: boolean
  as?: 'div' | 'section' | 'article' | 'li' | 'span'
}

export default function FadeIn({
  children,
  className,
  delay = 0,
  duration = 0.667,
  direction = 'up',
  distance = 40,
  once = true,
  as = 'div',
}: FadeInProps) {
  const shouldReduceMotion = useReducedMotion()

  const directionMap = {
    up: { y: distance, x: 0 },
    down: { y: -distance, x: 0 },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 },
    none: { x: 0, y: 0 },
  }

  const offset = directionMap[direction]

  const variants: Variants = shouldReduceMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.01 } },
      }
    : {
        hidden: {
          opacity: 0,
          x: offset.x,
          y: offset.y,
        },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: {
            duration,
            delay,
            ease: [0, 0.4, 0, 1],
          },
        },
      }

  const Component = motion[as]

  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-10%' }}
      variants={variants}
    >
      {children}
    </Component>
  )
}
