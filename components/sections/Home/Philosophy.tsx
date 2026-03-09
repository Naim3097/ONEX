import { getContent, type Locale } from '@/content'
import FadeIn from '@/components/motion/FadeIn'
import RevealText from '@/components/motion/RevealText'
import ParallaxImage from '@/components/motion/ParallaxImage'
import Text from '@/components/typography/Text'

interface PhilosophyProps {
  locale: Locale
}

export default function Philosophy({ locale }: PhilosophyProps) {
  const content = getContent(locale)
  const philosophy = content.home.philosophy

  return (
    <section className="section-light overflow-hidden">
      <div className="max-w-wide mx-auto px-5 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-20 items-center py-24 md:py-32 lg:py-40">

          {/* Left — Text */}
          <div className="lg:pr-8">
            <FadeIn>
              <Text variant="overline" className="text-brand-red mb-5">
                {philosophy.overline}
              </Text>
            </FadeIn>

            <RevealText
              text={philosophy.headline}
              as="h2"
              className="text-h2 text-neutral-950 mb-10 md:mb-12"
            />

            <div className="space-y-6">
              {philosophy.body.map((paragraph, i) => (
                <FadeIn key={i} delay={0.15 * i}>
                  <p className="text-body-lg text-neutral-600 leading-relaxed">
                    {paragraph}
                  </p>
                </FadeIn>
              ))}
            </div>

            <FadeIn delay={0.4}>
              <div className="mt-10 md:mt-12 pt-8 border-t border-neutral-200">
                <Text variant="caption" className="text-neutral-500 italic">
                  {philosophy.caption}
                </Text>
              </div>
            </FadeIn>
          </div>

          {/* Right — Premise Image */}
          <FadeIn delay={0.2} className="mt-14 lg:mt-0">
            <div className="relative aspect-video overflow-hidden">
              <ParallaxImage
                src="/images/Premise/ONEX-3.jpg.jpeg"
                alt="One X Transmission workshop signage, Shah Alam"
                width={1920}
                height={1080}
                speed={0.08}
                overlay={false}
                className="absolute inset-0 w-full h-full"
              />
            </div>
            <div className="w-12 h-px bg-brand-red mt-5" />
          </FadeIn>

        </div>
      </div>
    </section>
  )
}
