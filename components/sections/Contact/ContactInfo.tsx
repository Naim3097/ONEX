import { business, getContent, type Locale } from '@/content'
import FadeIn from '@/components/motion/FadeIn'
import Text from '@/components/typography/Text'

interface ContactInfoProps {
  locale: Locale
}

export default function ContactInfo({ locale }: ContactInfoProps) {
  const content = getContent(locale)
  const info = content.contact.info

  return (
    <div>
      {/* Direct Contact */}
      <FadeIn>
        <div className="mb-10">
          <Text variant="overline" className="text-neutral-400 mb-5">Direct Contact</Text>
          <div className="space-y-4">
            <a
              href={business.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-body text-neutral-950 hover:text-brand-red transition-colors duration-200"
            >
              WhatsApp: {business.whatsapp}
            </a>
            <a
              href={business.phoneTel}
              className="block text-body text-neutral-950 hover:text-brand-red transition-colors duration-200"
            >
              Phone: {business.phone}
            </a>
            <a
              href={business.landlineTel}
              className="block text-body text-neutral-950 hover:text-brand-red transition-colors duration-200"
            >
              Landline: {business.landline}
            </a>
          </div>
        </div>
      </FadeIn>

      {/* Operating Hours */}
      <FadeIn delay={0.1}>
        <div className="mb-10">
          <Text variant="overline" className="text-neutral-400 mb-5">{info.hoursTitle}</Text>
          <div className="space-y-2 text-body text-neutral-700">
            <p>Monday – Friday: {business.hours.weekdays}</p>
            <p>Saturday: {business.hours.saturday}</p>
            <p>Sunday: {business.hours.sunday}</p>
          </div>
        </div>
      </FadeIn>

      {/* Emergency */}
      <FadeIn delay={0.2}>
        <div className="mb-10 p-6 bg-neutral-50 border border-neutral-200">
          <Text variant="overline" className="text-brand-red mb-3">{info.emergencyTitle}</Text>
          <p className="text-body-sm text-neutral-600 mb-3">{info.emergencyBody}</p>
          <a
            href={business.phoneTel}
            className="text-body font-medium text-neutral-950 hover:text-brand-red transition-colors duration-200"
          >
            {business.phone}
          </a>
        </div>
      </FadeIn>

      {/* Location */}
      <FadeIn delay={0.3}>
        <div>
          <Text variant="overline" className="text-neutral-400 mb-5">Location</Text>
          <a
            href={business.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-body-sm text-neutral-700 hover:text-brand-red transition-colors duration-200 leading-relaxed"
          >
            {business.address}
          </a>
        </div>
      </FadeIn>
    </div>
  )
}
