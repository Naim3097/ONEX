import FadeIn from '@/components/motion/FadeIn'
import RevealText from '@/components/motion/RevealText'

export default function TeamSection() {
  const team = [
    {
      src: '/images/Team/Team Close Up Photos.jpeg',
      name: 'Lead Technician',
      role: 'Transmission Specialist',
    },
    {
      src: '/images/Team/Team Zoom Out Photos.jpeg',
      name: 'The Team',
      role: 'One X Transmission',
    },
  ]

  return (
    <section className="section-light section-padding">
      <div className="max-w-wide mx-auto px-5 md:px-10">
        {/* Header */}
        <div className="max-w-2xl mb-14 md:mb-20">
          <FadeIn>
            <span className="block text-overline tracking-widest uppercase text-brand-red font-medium mb-5">
              Our Team
            </span>
          </FadeIn>
          <RevealText
            text="The people behind every repair."
            as="h2"
            className="text-h2 text-neutral-950"
          />
        </div>

        {/* Team Photos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
          {team.map((member, i) => (
            <FadeIn key={member.src} delay={0.15 * i} direction="up">
              <div className="group">
                {/* Photo */}
                <div className="relative aspect-[3/2] overflow-hidden bg-neutral-100 mb-5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={member.src}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-667 ease-[cubic-bezier(0,0.4,0,1)] group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                {/* Caption */}
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-body-sm font-medium text-neutral-950">{member.name}</p>
                    <p className="text-caption text-neutral-500 mt-0.5">{member.role}</p>
                  </div>
                  <div className="w-6 h-px bg-brand-red mt-3 shrink-0" />
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
