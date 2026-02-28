import FadeIn from '@/components/motion/FadeIn'
import RevealText from '@/components/motion/RevealText'

export default function BlogHero() {
  return (
    <section className="relative min-h-[65vh] flex items-end pb-16 md:pb-24 pt-28 md:pt-32 overflow-hidden">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-neutral-950 bg-cover bg-center"
          style={{ backgroundImage: `url('/images/hero/Hero 3.jpeg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/30 via-neutral-950/50 to-neutral-950/95" />
      </div>

      <div className="relative z-10 max-w-wide mx-auto px-5 md:px-10 w-full">
        <div className="max-w-2xl">
          <FadeIn delay={0.2} immediate>
            <p className="overline-label text-brand-red mb-5">Knowledge Base</p>
          </FadeIn>
          <RevealText
            as="h1"
            text="Gearbox Guides & Technical Insights"
            className="text-h1 text-white mb-6 md:mb-8"
            delay={0.4}
            immediate
          />
          <FadeIn delay={0.7} immediate>
            <p className="text-body-lg text-neutral-300 max-w-xl leading-relaxed">
              Practical advice on gearbox maintenance, repair costs, and knowing when to seek specialist help — written by our technicians.
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
