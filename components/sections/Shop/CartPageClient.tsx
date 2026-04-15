'use client'

import Link from 'next/link'
import { getContent, type Locale } from '@/content'
import { getProductName } from '@/lib/products'
import { useCart } from '@/lib/cart-context'
import FadeIn from '@/components/motion/FadeIn'
import RevealText from '@/components/motion/RevealText'
import Text from '@/components/typography/Text'

interface CartPageClientProps {
  locale: Locale
}

export default function CartPageClient({ locale }: CartPageClientProps) {
  const content = getContent(locale)
  const shop = content.shop
  const { items, removeItem, updateQuantity, totalPrice } = useCart()

  return (
    <>
      {/* Hero */}
      <section className="section-dark pt-32 pb-10 md:pt-40 md:pb-14">
        <div className="max-w-wide mx-auto px-5 md:px-10">
          <FadeIn>
            <Text variant="overline" className="text-brand-red mb-5">
              {shop.cart.title}
            </Text>
          </FadeIn>
          <RevealText text={shop.cart.title} as="h1" className="text-h2 text-white" />
        </div>
      </section>

      {/* Cart content */}
      <section className="section-dark section-padding">
        <div className="max-w-wide mx-auto px-5 md:px-10">
          {items.length === 0 ? (
            <FadeIn>
              <div className="text-center py-20">
                <p className="text-body-lg text-neutral-500 mb-8">{shop.cart.empty}</p>
                <Link href={`/${locale}/shop`} className="cta-primary">
                  {shop.cart.continueShopping}
                </Link>
              </div>
            </FadeIn>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Items */}
              <div className="lg:col-span-2 space-y-px">
                {items.map((item) => {
                  const name = getProductName(item.product, locale)
                  return (
                    <FadeIn key={item.product.slug}>
                      <div className="bg-neutral-900 border border-neutral-800 p-6 flex gap-6">
                        {/* Thumbnail placeholder */}
                        <div className="w-20 h-20 bg-neutral-800 flex-shrink-0" />

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4 mb-2">
                            <Link
                              href={`/${locale}/shop/${item.product.slug}`}
                              className="text-body font-bold text-white hover:text-brand-red transition-colors truncate"
                            >
                              {name}
                            </Link>
                            <span className="text-body font-bold text-white whitespace-nowrap">
                              RM {item.product.price * item.quantity}
                            </span>
                          </div>

                          <p className="text-body-sm text-neutral-500 mb-4">
                            RM {item.product.price} each
                          </p>

                          <div className="flex items-center justify-between">
                            {/* Quantity controls */}
                            <div className="flex items-center border border-neutral-700">
                              <button
                                onClick={() => updateQuantity(item.product.slug, item.quantity - 1)}
                                className="w-8 h-8 flex items-center justify-center text-neutral-400 hover:text-white transition-colors"
                                aria-label="Decrease quantity"
                              >
                                −
                              </button>
                              <span className="w-10 h-8 flex items-center justify-center text-body-sm text-white border-x border-neutral-700">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.product.slug, item.quantity + 1)}
                                className="w-8 h-8 flex items-center justify-center text-neutral-400 hover:text-white transition-colors"
                                aria-label="Increase quantity"
                              >
                                +
                              </button>
                            </div>

                            <button
                              onClick={() => removeItem(item.product.slug)}
                              className="text-xs uppercase tracking-wider text-neutral-600 hover:text-brand-red transition-colors"
                            >
                              {shop.cart.remove}
                            </button>
                          </div>
                        </div>
                      </div>
                    </FadeIn>
                  )
                })}
              </div>

              {/* Summary */}
              <div className="lg:col-span-1">
                <FadeIn>
                  <div className="bg-neutral-900 border border-neutral-800 p-6 md:p-8 sticky top-28">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-6">
                      {shop.checkout.orderSummary}
                    </h3>

                    <div className="space-y-3 mb-6 pb-6 border-b border-neutral-800">
                      {items.map((item) => (
                        <div key={item.product.slug} className="flex justify-between text-body-sm">
                          <span className="text-neutral-400">
                            {getProductName(item.product, locale)} × {item.quantity}
                          </span>
                          <span className="text-neutral-300">RM {item.product.price * item.quantity}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between items-baseline mb-8">
                      <span className="text-body font-bold text-white">{shop.cart.total}</span>
                      <span className="text-h4 font-bold text-white">RM {totalPrice}</span>
                    </div>

                    <Link
                      href={`/${locale}/shop/checkout`}
                      className="cta-primary w-full text-center block"
                    >
                      {shop.cart.checkout}
                    </Link>

                    <Link
                      href={`/${locale}/shop`}
                      className="block text-center text-body-sm text-neutral-500 hover:text-neutral-300 transition-colors mt-4"
                    >
                      {shop.cart.continueShopping}
                    </Link>
                  </div>
                </FadeIn>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
