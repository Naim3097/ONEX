import { type Locale, getContent } from '@/content'
import { generatePageMetadata } from '@/lib/metadata'
import { generateBreadcrumbJsonLd } from '@/lib/structured-data'
import {
  products,
  getProduct,
  getProductName,
  getProductDescription,
  getProductIncludes,
  getProductWarranty,
  getProductBadge,
} from '@/lib/products'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import FadeIn from '@/components/motion/FadeIn'
import RevealText from '@/components/motion/RevealText'
import Text from '@/components/typography/Text'
import ProductActions from '@/components/sections/Shop/ProductActions'

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: l, slug } = await params
  const locale = l as Locale
  const product = getProduct(slug)
  if (!product) return {}

  const name = getProductName(product, locale)
  return generatePageMetadata({
    locale,
    page: 'shop',
    title: `${name} | One X Transmission`,
    description: getProductDescription(product, locale),
  })
}

export default async function ProductDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: l, slug } = await params
  const locale = (l as Locale) || 'en'
  const content = getContent(locale)
  const shop = content.shop

  const product = getProduct(slug)
  if (!product) notFound()

  const name = getProductName(product, locale)
  const description = getProductDescription(product, locale)
  const includes = getProductIncludes(product, locale)
  const warranty = getProductWarranty(product, locale)
  const badge = getProductBadge(product, locale)
  const breadcrumbSchema = generateBreadcrumbJsonLd(locale, `shop/${slug}`, name)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <section className="section-dark pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-wide mx-auto px-5 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Product image */}
            <FadeIn>
              {product.image ? (
                <div className="aspect-square bg-neutral-800 w-full overflow-hidden">
                  <Image
                    src={product.image}
                    alt={name}
                    width={800}
                    height={800}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
              ) : (
                <div className="aspect-square bg-neutral-800 w-full" />
              )}
            </FadeIn>

            {/* Product info */}
            <div>
              {badge && (
                <FadeIn>
                  <Text variant="overline" className="text-brand-red mb-4">
                    {badge}
                  </Text>
                </FadeIn>
              )}

              <RevealText text={name} as="h1" className="text-h2 text-white mb-4" />

              <FadeIn delay={0.15}>
                <div className="flex items-baseline gap-3 mb-6">
                  <span className="text-h3 text-white font-bold">RM {product.price}</span>
                  {product.originalPrice && (
                    <span className="text-body text-neutral-600 line-through">
                      RM {product.originalPrice}
                    </span>
                  )}
                </div>
              </FadeIn>

              <FadeIn delay={0.2}>
                <p className="text-body-lg text-neutral-400 leading-relaxed mb-8">
                  {description}
                </p>
              </FadeIn>

              {/* Includes */}
              {includes.length > 0 && (
                <FadeIn delay={0.25}>
                  <div className="mb-6">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-3">
                      {shop.includes}
                    </h3>
                    <ul className="space-y-2">
                      {includes.map((item, i) => (
                        <li key={i} className="text-body-sm text-neutral-300 flex items-center gap-2">
                          <span className="w-1 h-1 bg-brand-red rounded-full flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeIn>
              )}

              {/* Add to cart */}
              <FadeIn delay={0.3}>
                <ProductActions product={product} locale={locale} />
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
