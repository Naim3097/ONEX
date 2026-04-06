import Link from 'next/link'
import Image from 'next/image'
import { business, getContent, type Locale } from '@/content'

interface FooterProps {
  locale: Locale
}

export default function Footer({ locale }: FooterProps) {
  const content = getContent(locale)

  return (
    <footer className="bg-neutral-950 border-t border-white/5">
      <div className="max-w-wide mx-auto px-5 md:px-10">
        {/* Main Footer */}
        <div className="py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Link href={`/${locale}`} className="inline-block mb-6">
              <Image
                src={business.logo.white}
                alt={business.name}
                width={160}
                height={36}
                className="h-7 w-auto"
              />
            </Link>
            <p className="text-body-sm text-neutral-400 max-w-xs leading-relaxed mb-6">
              {content.footer.tagline}
            </p>
            <div className="space-y-2 text-body-sm">
              <a
                href={business.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-neutral-400 hover:text-white transition-colors duration-200"
              >
                WhatsApp: {business.whatsapp}
              </a>
              <a
                href={business.phoneTel}
                className="block text-neutral-400 hover:text-white transition-colors duration-200"
              >
                Phone: {business.phone}
              </a>
              <a
                href={business.landlineTel}
                className="block text-neutral-400 hover:text-white transition-colors duration-200"
              >
                Landline: {business.landline}
              </a>
            </div>
          </div>

          {/* Link Columns */}
          {content.footer.columns.map((column) => (
            <div key={column.title} className="lg:col-span-2">
              <h4 className="text-overline text-neutral-500 uppercase tracking-widest mb-5">
                {column.title}
              </h4>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={`/${locale}${link.href === '/' ? '' : link.href}`}
                      className="text-body-sm text-neutral-400 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Address Column */}
          <div className="lg:col-span-2">
            <h4 className="text-overline text-neutral-500 uppercase tracking-widest mb-5">
              Locations
            </h4>
            <p className="text-body-sm text-neutral-500 uppercase tracking-wider mb-2">Shah Alam</p>
            <a
              href={business.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-body-sm text-neutral-400 hover:text-white transition-colors duration-200 block leading-relaxed mb-4"
            >
              {business.address}
            </a>
            <div className="space-y-1 text-body-sm text-neutral-500 mb-6">
              <p>Mon–Fri: {business.hours.weekdays}</p>
              <p>Sat: {business.hours.saturday}</p>
              <p>Sun: {business.hours.sunday}</p>
            </div>
            <p className="text-body-sm text-neutral-500 uppercase tracking-wider mb-2">Kulim, Kedah</p>
            <Link
              href={`/${locale}/locations/kulim`}
              className="text-body-sm text-neutral-400 hover:text-white transition-colors duration-200 block"
            >
              New Branch — Opening Soon
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <Link href="/0x" className="text-caption text-neutral-600 hover:text-neutral-600 cursor-default">
            {content.footer.copyright}
          </Link>
          <div className="flex items-center gap-3 text-caption text-neutral-600">
            {(['en', 'ms', 'zh'] as const).map((l, i) => (
              <span key={l} className="flex items-center">
                {i > 0 && <span className="mx-1 text-neutral-800">|</span>}
                <Link
                  href={`/${l}`}
                  className={`uppercase transition-colors duration-200 ${
                    l === locale ? 'text-neutral-400' : 'hover:text-neutral-400'
                  }`}
                >
                  {l}
                </Link>
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
