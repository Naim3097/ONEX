import Link from 'next/link'
import { business, getContent, type Locale } from '@/content'
import FadeIn from '@/components/motion/FadeIn'
import RevealText from '@/components/motion/RevealText'

interface ContactCTAProps {
  locale: Locale
}

export default function ContactCTA({ locale }: ContactCTAProps) {
  const content = getContent(locale)
  const cta = content.home.cta

  return (
    <section className="section-dark section-padding">
      <div className="max-w-narrow mx-auto px-5 md:px-10 text-center">
        <RevealText
          text={cta.headline}
          as="h2"
          className="text-h1 text-white mb-6 md:mb-8"
        />

        <FadeIn delay={0.3}>
          <p className="text-body-lg text-neutral-400 max-w-lg mx-auto mb-10 md:mb-12 leading-relaxed">
            {cta.body}
          </p>
        </FadeIn>

        <FadeIn delay={0.5}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={business.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-primary"
            >
              {cta.ctaPrimary}
            </Link>
            <a href={business.phoneTel} className="cta-ghost">
              {cta.ctaSecondary}
            </a>
          </div>
        </FadeIn>

        <FadeIn delay={0.7}>
          <div className="mt-14 md:mt-18 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-center gap-6 text-body-sm text-neutral-500">
            <span>Mon–Fri: {business.hours.weekdays}</span>
            <span className="hidden md:inline text-neutral-700">|</span>
            <span>Sat: {business.hours.saturday}</span>
            <span className="hidden md:inline text-neutral-700">|</span>
            <a
              href={business.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors duration-200"
            >
              {business.addressShort}
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
