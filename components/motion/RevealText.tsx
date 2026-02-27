'use client'

import { motion, useReducedMotion } from 'framer-motion'

interface RevealTextProps {
  text: string
  className?: string
  delay?: number
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span'
}

export default function RevealText({
  text,
  className,
  delay = 0,
  as: Tag = 'h2',
}: RevealTextProps) {
  const shouldReduceMotion = useReducedMotion()
  const words = text.split(/\s+/)

  if (shouldReduceMotion) {
    return <Tag className={className}>{text}</Tag>
  }

  return (
    <Tag className={className} style={{ perspective: 1000 }}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{
              y: 50,
              rotateX: 80,
              opacity: 0,
            }}
            whileInView={{
              y: 0,
              rotateX: 0,
              opacity: 1,
            }}
            viewport={{ once: true, margin: '-10%' }}
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
