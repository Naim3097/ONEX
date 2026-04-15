'use client'

import { useState } from 'react'
import Link from 'next/link'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { getContent, type Locale } from '@/content'
import { getProductName } from '@/lib/products'
import { useCart } from '@/lib/cart-context'
import FadeIn from '@/components/motion/FadeIn'
import RevealText from '@/components/motion/RevealText'
import Text from '@/components/typography/Text'

interface CheckoutPageClientProps {
  locale: Locale
}

export default function CheckoutPageClient({ locale }: CheckoutPageClientProps) {
  const content = getContent(locale)
  const shop = content.shop
  const { items, totalPrice, clearCart } = useCart()

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    notes: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const inputClasses =
    'w-full px-5 py-4 bg-neutral-900 border border-neutral-800 text-neutral-100 placeholder:text-neutral-600 text-body-sm focus:border-brand-red focus:ring-0 outline-none transition-colors duration-200'

  const canSubmit = form.name && form.phone && form.email && items.length > 0

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit) return

    setLoading(true)
    setError(null)

    try {
      // Create order in Firestore
      const orderData = {
        items: items.map((item) => ({
          slug: item.product.slug,
          name: getProductName(item.product, locale),
          price: item.product.price,
          quantity: item.quantity,
          subtotal: item.product.price * item.quantity,
        })),
        totalAmount: totalPrice,
        customerName: form.name,
        customerPhone: form.phone,
        customerEmail: form.email,
        customerAddress: form.address,
        notes: form.notes,
        status: 'pending_payment',
        paymentStatus: 'pending',
        locale,
        createdAt: new Date(),
      }

      const docRef = await addDoc(collection(db, 'orders'), orderData)

      // Create payment via Lean.x
      const response = await fetch('/api/shop/create-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: totalPrice,
          invoiceRef: `ORDER-${docRef.id}`,
          customerName: form.name,
          customerEmail: form.email,
          customerPhone: form.phone,
        }),
      })

      const contentType = response.headers.get('content-type')
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Payment API is not available.')
      }

      const paymentData = await response.json()

      if (!response.ok) {
        throw new Error(paymentData.message || paymentData.error || 'Failed to initialize payment')
      }

      if (paymentData.success && paymentData.redirectUrl) {
        // Store Lean.x info in Firestore
        if (paymentData.billNo) {
          import('firebase/firestore').then(({ doc, updateDoc }) => {
            updateDoc(doc(db, 'orders', docRef.id), {
              leanxBillNo: paymentData.billNo,
              leanxInvoiceRef: paymentData.invoiceRef,
            }).catch(() => {})
          })
        }

        // Store orderId for success page
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('onex_order_id', docRef.id)
        }

        clearCart()
        window.location.href = paymentData.redirectUrl
      } else {
        throw new Error('Invalid response from payment gateway')
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to process your order. Please try again.'
      setError(message)
      setLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <section className="section-dark pt-32 pb-20 md:pt-40 min-h-[60vh]">
        <div className="max-w-wide mx-auto px-5 md:px-10 text-center">
          <p className="text-body-lg text-neutral-500 mb-8">{shop.cart.empty}</p>
          <Link href={`/${locale}/shop`} className="cta-primary">
            {shop.cart.continueShopping}
          </Link>
        </div>
      </section>
    )
  }

  return (
    <>
      {/* Hero */}
      <section className="section-dark pt-32 pb-10 md:pt-40 md:pb-14">
        <div className="max-w-wide mx-auto px-5 md:px-10">
          <FadeIn>
            <Text variant="overline" className="text-brand-red mb-5">
              {shop.checkout.title}
            </Text>
          </FadeIn>
          <RevealText text={shop.checkout.title} as="h1" className="text-h2 text-white mb-3" />
          <FadeIn delay={0.15}>
            <p className="text-body-lg text-neutral-400">{shop.checkout.subtitle}</p>
          </FadeIn>
        </div>
      </section>

      {/* Checkout form + summary */}
      <section className="section-dark section-padding">
        <div className="max-w-wide mx-auto px-5 md:px-10">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Form fields */}
              <div className="lg:col-span-2 space-y-4">
                <FadeIn>
                  <div>
                    <label htmlFor="checkout-name" className="sr-only">{shop.checkout.fields.name}</label>
                    <input
                      type="text"
                      id="checkout-name"
                      placeholder={shop.checkout.fields.name}
                      value={form.name}
                      onChange={(e) => updateField('name', e.target.value)}
                      required
                      className={inputClasses}
                    />
                  </div>
                </FadeIn>
                <FadeIn delay={0.05}>
                  <div>
                    <label htmlFor="checkout-phone" className="sr-only">{shop.checkout.fields.phone}</label>
                    <input
                      type="tel"
                      id="checkout-phone"
                      placeholder={shop.checkout.fields.phone}
                      value={form.phone}
                      onChange={(e) => updateField('phone', e.target.value)}
                      required
                      className={inputClasses}
                    />
                  </div>
                </FadeIn>
                <FadeIn delay={0.1}>
                  <div>
                    <label htmlFor="checkout-email" className="sr-only">{shop.checkout.fields.email}</label>
                    <input
                      type="email"
                      id="checkout-email"
                      placeholder={shop.checkout.fields.email}
                      value={form.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      required
                      className={inputClasses}
                    />
                  </div>
                </FadeIn>
                <FadeIn delay={0.15}>
                  <div>
                    <label htmlFor="checkout-address" className="sr-only">{shop.checkout.fields.address}</label>
                    <input
                      type="text"
                      id="checkout-address"
                      placeholder={shop.checkout.fields.address}
                      value={form.address}
                      onChange={(e) => updateField('address', e.target.value)}
                      className={inputClasses}
                    />
                  </div>
                </FadeIn>
                <FadeIn delay={0.2}>
                  <div>
                    <label htmlFor="checkout-notes" className="sr-only">{shop.checkout.fields.notes}</label>
                    <textarea
                      id="checkout-notes"
                      placeholder={shop.checkout.fields.notes}
                      value={form.notes}
                      onChange={(e) => updateField('notes', e.target.value)}
                      rows={3}
                      className={`${inputClasses} resize-none`}
                    />
                  </div>
                </FadeIn>

                {error && (
                  <FadeIn>
                    <div className="p-4 bg-red-950/50 border border-red-900 text-body-sm text-red-400">
                      {error}
                    </div>
                  </FadeIn>
                )}
              </div>

              {/* Order summary */}
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

                    <button
                      type="submit"
                      disabled={!canSubmit || loading}
                      className="cta-primary w-full text-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? shop.checkout.processing : shop.checkout.payNow}
                    </button>
                  </div>
                </FadeIn>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}
