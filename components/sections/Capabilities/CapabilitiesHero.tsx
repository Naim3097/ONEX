import { getContent, mediaSlots, type Locale } from '@/content'
import FadeIn from '@/components/motion/FadeIn'
import RevealText from '@/components/motion/RevealText'
import Text from '@/components/typography/Text'

interface CapabilitiesHeroProps {
  locale: Locale
}

export default function CapabilitiesHero({ locale }: CapabilitiesHeroProps) {
  const content = getContent(locale)
  const hero = content.capabilities.hero

  return (
    <section className="relative min-h-[70vh] flex items-end pb-16 md:pb-24 overflow-hidden">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-neutral-950 bg-cover bg-center"
          style={{ backgroundImage: `url('${mediaSlots.capabilitiesHero.path}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/30 via-neutral-950/50 to-neutral-950/95" />
      </div>

      <div className="relative z-10 max-w-wide mx-auto px-5 md:px-10 w-full">
        <div className="max-w-3xl">
          <FadeIn delay={0.2} immediate>
            <Text variant="overline" className="text-brand-red mb-5">
              {hero.overline}
            </Text>
          </FadeIn>
          <RevealText
            text={hero.headline.replace('\n', ' ')}
            as="h1"
            className="text-h1 text-white mb-6 md:mb-8"
            delay={0.4}
            immediate
          />
          <FadeIn delay={0.7} immediate>
            <p className="text-body-lg text-neutral-300 max-w-xl leading-relaxed">
              {hero.body}
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
