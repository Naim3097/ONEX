import { type Locale, locales } from '@/content'
import PageShell from '@/components/layout/PageShell'
import { generateLocalBusinessJsonLd } from '@/lib/structured-data'
import { CartProvider } from '@/lib/cart-context'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function SiteLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale: localeParam } = await params
  const locale = (localeParam as Locale) || 'en'

  return (
    <CartProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateLocalBusinessJsonLd()) }}
      />
      <PageShell locale={locale}>{children}</PageShell>
    </CartProvider>
  )
}
