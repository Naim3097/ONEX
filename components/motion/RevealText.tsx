'use client'

import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'

interface RevealTextProps {
  text: string
  className?: string
  delay?: number
  immediate?: boolean
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span'
}

export default function RevealText({
  text,
  className,
  delay = 0,
  immediate = false,
  as: Tag = 'h2',
}: RevealTextProps) {
  const shouldReduceMotion = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.3 })
  const words = text.split(/\s+/)

  if (shouldReduceMotion) {
    return <Tag className={className}>{text}</Tag>
  }

  const shouldAnimate = immediate || isInView

  return (
    <Tag ref={ref} className={className} style={{ perspective: 1000 }}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: 50, rotateX: 80, opacity: 0 }}
            animate={
              shouldAnimate
                ? { y: 0, rotateX: 0, opacity: 1 }
                : { y: 50, rotateX: 80, opacity: 0 }
            }
            transition={{
              duration: 0.5,
              delay: delay + i * 0.067,
              ease: [0, 0.4, 0, 1],
            }}
            style={{ transformOrigin: 'bottom', willChange: 'transform, opacity' }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && '\u00A0'}
        </span>
      ))}
    </Tag>
  )
}
