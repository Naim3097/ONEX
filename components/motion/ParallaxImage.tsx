'use client'

import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'

interface ParallaxImageProps {
  src: string
  alt: string
  width: number
  height: number
  speed?: number
  className?: string
  overlay?: boolean
  overlayOpacity?: number
  priority?: boolean
}

export default function ParallaxImage({
  src,
  alt,
  width,
  height,
  speed = 0.2,
  className = '',
  overlay = true,
  overlayOpacity = 0.6,
  priority = false,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', `${speed * 100}%`])
  const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1])

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-[-15%]"
        style={shouldReduceMotion ? {} : { y, scale }}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-full object-cover"
          sizes="100vw"
          priority={priority}
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkyMCIgaGVpZ2h0PSIxMDgwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMxMTExMTEiLz48L3N2Zz4="
        />
      </motion.div>
      {overlay && (
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background: `linear-gradient(to bottom, rgba(10,10,10,0.3), rgba(10,10,10,${overlayOpacity}) 60%, rgba(10,10,10,0.95))`,
          }}
        />
      )}
    </div>
  )
}
