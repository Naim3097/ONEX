'use client'

import { useEffect, useRef, useState } from 'react'
import { useReducedMotion, useInView } from 'framer-motion'

interface AnimatedCounterProps {
  value: number
  suffix?: string
  duration?: number
  className?: string
  decimals?: number
}

export default function AnimatedCounter({
  value,
  suffix = '',
  duration = 2000,
  className = '',
  decimals = 0,
}: AnimatedCounterProps) {
  const [display, setDisplay] = useState('0')
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    if (!inView) return

    if (shouldReduceMotion) {
      setDisplay(decimals > 0 ? value.toFixed(decimals) : Math.round(value).toString())
      return
    }

    let start = 0
    const startTime = performance.now()

    function animate(currentTime: number) {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = start + (value - start) * eased

      setDisplay(decimals > 0 ? current.toFixed(decimals) : Math.round(current).toString())

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [inView, value, duration, shouldReduceMotion, decimals])

  return (
    <span ref={ref} className={className}>
      {display}{suffix}
    </span>
  )
}
