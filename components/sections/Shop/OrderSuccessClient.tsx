'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { getContent, type Locale, business } from '@/content'
import FadeIn from '@/components/motion/FadeIn'
import RevealText from '@/components/motion/RevealText'
import Text from '@/components/typography/Text'

interface OrderSuccessClientProps {
  locale: Locale
}

export default function OrderSuccessClient({ locale }: OrderSuccessClientProps) {
  const content = getContent(locale)
  const shop = content.shop
  const searchParams = useSearchParams()

  const [status, setStatus] = useState<'loading' | 'success' | 'cancelled'>('loading')
  const [orderId, setOrderId] = useState<string | null>(null)
  const [amount, setAmount] = useState<number | null>(null)

  useEffect(() => {
    async function checkOrder() {
      // Get orderId from sessionStorage
      const storedOrderId = sessionStorage.getItem('onex_order_id')
      if (!storedOrderId) {
        setStatus('cancelled')
        return
      }

      setOrderId(storedOrderId)

      try {
        const orderDoc = await getDoc(doc(db, 'orders', storedOrderId))
        if (orderDoc.exists()) {
          const data = orderDoc.data()
          setAmount(data.totalAmount)

          if (data.paymentStatus === 'SUCCESS' || data.status === 'confirmed') {
            setStatus('success')
          } else if (data.paymentStatus === 'FAILED' || data.paymentStatus === 'CANCELLED') {
            setStatus('cancelled')
          } else {
            // Payment might still be processing — assume success from redirect
            setStatus('success')
          }
        } else {
          setStatus('cancelled')
        }
      } catch {
        // If we can't verify, assume success since user was redirected here
        setStatus('success')
      }
    }

    checkOrder()
  }, [searchParams])

  if (status === 'loading') {
    return (
      <section className="section-dark min-h-[80vh] flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-neutral-700 border-t-brand-red animate-spin rounded-full" />
      </section>
    )
  }

  if (status === 'cancelled') {
    return (
      <section className="section-dark pt-32 pb-20 md:pt-40 min-h-[60vh]">
        <div className="max-w-wide mx-auto px-5 md:px-10 text-center">
          <FadeIn>
            <Text variant="overline" className="text-brand-red mb-5">
              {shop.cancelled.title}
            </Text>
          </FadeIn>
          <RevealText text={shop.cancelled.title} as="h1" className="text-h2 text-white mb-6" />
          <FadeIn delay={0.2}>
            <p className="text-body-lg text-neutral-400 max-w-lg mx-auto mb-10">
              {shop.cancelled.body}
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <a
              href={`https://wa.me/+601131051677?text=${encodeURIComponent(shop.cancelled.waFail)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-primary"
            >
              {shop.cancelled.whatsapp}
            </a>
          </FadeIn>
          <FadeIn delay={0.35}>
            <Link href={`/${locale}/shop`} className="cta-ghost mt-3 inline-block">
              {shop.cancelled.retry}
            </Link>
          </FadeIn>
        </div>
      </section>
    )
  }

  return (
    <section className="section-dark pt-32 pb-20 md:pt-40 min-h-[60vh]">
      <div className="max-w-wide mx-auto px-5 md:px-10 text-center">
        <FadeIn>
          <div className="w-16 h-16 mx-auto mb-8 border-2 border-green-500 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <Text variant="overline" className="text-green-500 mb-5">
            {shop.success.title}
          </Text>
        </FadeIn>
        <RevealText text={shop.success.title} as="h1" className="text-h2 text-white mb-6" />

        <FadeIn delay={0.2}>
          <p className="text-body-lg text-neutral-400 max-w-lg mx-auto mb-10">
            {shop.success.body}
          </p>
        </FadeIn>

        <FadeIn delay={0.25}>
          <div className="bg-neutral-900 border border-neutral-800 p-6 md:p-8 max-w-sm mx-auto mb-10">
            {orderId && (
              <div className="flex justify-between mb-3">
                <span className="text-body-sm text-neutral-500">{shop.success.orderId}</span>
                <span className="text-body-sm text-neutral-300 font-mono">{orderId.slice(0, 8).toUpperCase()}</span>
              </div>
            )}
            {amount && (
              <div className="flex justify-between">
                <span className="text-body-sm text-neutral-500">{shop.success.amount}</span>
                <span className="text-body font-bold text-white">RM {amount}</span>
              </div>
            )}
          </div>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="flex flex-col items-center gap-3">
            <a
              href={`https://wa.me/+601131051677?text=${encodeURIComponent(shop.success.waSuccess)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-primary"
            >
              {shop.success.whatsapp}
            </a>
            <Link href={`/${locale}`} className="cta-ghost">
              {shop.success.home}
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
