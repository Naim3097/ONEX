'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { getContent, type Locale } from '@/content'
import FadeIn from '@/components/motion/FadeIn'

interface FAQListProps {
  locale: Locale
}

export default function FAQList({ locale }: FAQListProps) {
  const content = getContent(locale)
  const items = content.faq.items
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="section-light section-padding">
      <div className="max-w-content mx-auto px-5 md:px-10">
        <div className="divide-y divide-neutral-200">
          {items.map((item, i) => {
            const isOpen = openIndex === i
            return (
              <FadeIn key={i} delay={0.05 * i}>
                <div className="py-6 md:py-8">
                  <button
                    className="w-full text-left flex items-start justify-between gap-6 group"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    aria-expanded={isOpen}
                  >
                    <h3 className="text-h4 text-neutral-950 group-hover:text-brand-red transition-colors duration-200 pr-4">
                      {item.question}
                    </h3>
                    <span
                      className={`shrink-0 mt-1 text-body text-neutral-400 transition-transform duration-300 ${
                        isOpen ? 'rotate-45' : ''
                      }`}
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={shouldReduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={shouldReduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0, 0.4, 0, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pt-4 text-body text-neutral-600 leading-relaxed max-w-2xl">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}
