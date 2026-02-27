'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'
import { business, getContent, type Locale } from '@/content'
import RevealText from '@/components/motion/RevealText'
import FadeIn from '@/components/motion/FadeIn'
import Text from '@/components/typography/Text'

interface HeroProps {
  locale: Locale
}

const HERO_IMAGES = [
  '/images/hero/Hero 1.jpeg',
  '/images/hero/Hero 2.jpeg',
  '/images/hero/Hero 3.jpeg',
  '/images/hero/Hero 4.jpeg',
  '/images/hero/Hero 5.jpeg',
]

export default function Hero({ locale }: HeroProps) {
  const content = getContent(locale)
  const hero = content.home.hero
  const shouldReduceMotion = useReducedMotion()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (shouldReduceMotion) return

    // Start the first transition much sooner (1.5s after load)
    // so users immediately realize it's a slideshow before they scroll.
    const initialTimeout = setTimeout(() => {
      setCurrentImageIndex(1)
      
      // Then fall into the regular rhythm
      intervalRef.current = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length)
      }, 3500)
    }, 1500)

    return () => {
      clearTimeout(initialTimeout)
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [shouldReduceMotion])

  return (
    <section className="relative min-h-screen flex items-end pb-16 md:pb-24 lg:pb-32 overflow-hidden">
      {/* Image Slideshow Background */}
      <div className="absolute inset-0 bg-neutral-950">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentImageIndex}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${HERO_IMAGES[currentImageIndex]}')` }}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 1.5, ease: 'easeInOut' },
              scale: { duration: 6, ease: 'linear' } // Subtle Ken Burns effect
            }}
          />
        </AnimatePresence>

        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/40 via-neutral-950/50 to-neutral-950/95" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-wide mx-auto px-5 md:px-10 w-full">
        <div className="max-w-4xl">
          <FadeIn delay={0.2} duration={0.5}>
            <Text variant="overline" className="text-brand-red mb-6 md:mb-8 tracking-[0.2em] font-bold">
              {hero.overline}
            </Text>
          </FadeIn>

          <RevealText
            text={hero.headline.replace('\n', ' ')}
            as="h1"
            className="text-display text-white mb-8 md:mb-10 font-bold tracking-tight"
            delay={0.4}
          />

          <FadeIn delay={0.8} duration={0.6}>
            <p className="text-body-lg md:text-xl text-neutral-200 max-w-2xl mb-12 md:mb-16 leading-relaxed font-light">
              {hero.subheadline}
            </p>
          </FadeIn>

          <FadeIn delay={1.0} duration={0.5}>
            <div className="flex flex-col sm:flex-row gap-5">
              <Link href={business.whatsappLink} target="_blank" rel="noopener noreferrer" className="cta-primary text-center">
                {hero.ctaPrimary}
              </Link>
              <Link href={`/${locale}/capabilities`} className="cta-secondary text-center bg-black/20 backdrop-blur-sm hover:bg-black/40">
                {hero.ctaSecondary}
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        initial={shouldReduceMotion ? {} : { opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <motion.div
          className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent"
          animate={shouldReduceMotion ? {} : { scaleY: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  )
}
