'use client'

import { getContent, type Locale } from '@/content'
import FadeIn from '@/components/motion/FadeIn'
import AnimatedCounter from '@/components/motion/AnimatedCounter'

interface StatsProps {
  locale: Locale
}

export default function Stats({ locale }: StatsProps) {
  const content = getContent(locale)
  const stats = content.home.stats

  return (
    <section className="section-dark py-20 md:py-28 lg:py-32">
      <div className="max-w-wide mx-auto px-5 md:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {stats.items.map((stat, i) => (
            <FadeIn key={stat.label} delay={0.1 * i} className="text-center">
              <div className="mb-3">
                <span className="text-display text-white">
                  <AnimatedCounter
                    value={stat.numericValue}
                    suffix={stat.suffix}
                    decimals={stat.value.includes('.') ? 1 : 0}
                    duration={2000 + i * 200}
                  />
                </span>
              </div>
              <p className="text-overline text-neutral-500 uppercase tracking-widest">
                {stat.label}
              </p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
