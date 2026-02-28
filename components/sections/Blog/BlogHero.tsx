import FadeIn from '@/components/motion/FadeIn'
import RevealText from '@/components/motion/RevealText'

export default function BlogHero() {
  return (
    <section className="section-dark pt-28 md:pt-32 pb-16 md:pb-20 min-h-[50vh] flex items-end">
      <div className="max-w-wide mx-auto px-5 md:px-10 w-full">
        <FadeIn immediate>
          <p className="overline-label text-brand-red mb-4">Knowledge Base</p>
        </FadeIn>
        <RevealText
          as="h1"
          text="Gearbox Guides & Technical Insights"
          className="text-display font-bold text-white max-w-2xl"
          immediate
        />
        <FadeIn delay={0.2} immediate>
          <p className="text-body-lg text-neutral-400 mt-6 max-w-xl">
            Practical advice on gearbox maintenance, repair costs, and knowing when to seek specialist help — written by our technicians.
          </p>
        </FadeIn>
      </div>
    </section>
  )
}
