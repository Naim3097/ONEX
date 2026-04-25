'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { getContent, type Locale } from '@/content'
import FadeIn from '@/components/motion/FadeIn'
import RevealText from '@/components/motion/RevealText'
import Text from '@/components/typography/Text'

type Status = 'loading' | 'confirmed' | 'cancelled' | 'pending'

const statusStyles = {
  loading: { border: 'border-neutral-700', bg: 'bg-neutral-900/50', text: 'text-neutral-400' },
  confirmed: { border: 'border-green-800/50', bg: 'bg-green-950/30', text: 'text-green-500' },
  cancelled: { border: 'border-red-900/50', bg: 'bg-red-950/30', text: 'text-red-500' },
  pending: { border: 'border-yellow-800/50', bg: 'bg-yellow-950/30', text: 'text-yellow-500' },
}

const statusIcons = {
  loading: 'M12 6v6l4 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z',
  confirmed: 'M5 13l4 4L19 7',
  cancelled: 'M6 18L18 6M6 6l12 12',
  pending: 'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
}

interface OrderSuccessClientProps {
  locale: Locale
}

export default function OrderSuccessClient({ locale }: OrderSuccessClientProps) {
  const content = getContent(locale)
  const shop = content.shop
  const searchParams = useSearchParams()

  const [status, setStatus] = useState<Status>('loading')

  useEffect(() => {
    const orderId = searchParams.get('orderId') || sessionStorage.getItem('onex_order_id')

    if (!orderId) {
      setStatus('pending')
      return
    }

    fetch(`/api/check-payment-status?orderId=${orderId}`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'confirmed' || data.status === 'completed') {
          setStatus('confirmed')
          // Push Purchase event to dataLayer for GTM (Google Ads conversion tracking)
          if (typeof window !== 'undefined') {
            (window as any).dataLayer = (window as any).dataLayer || [];
            (window as any).dataLayer.push({
              event: 'purchase',
              transaction_id: data.transactionId || orderId,
              value: data.amount || 50.00,
              currency: 'MYR',
              content_type: 'product',
              content_name: 'ATF Service Deposit',
              items: [{
                item_name: 'ATF Service Deposit',
                price: data.amount || 50.00,
                quantity: 1,
              }],
            })
          }
        } else if (data.status === 'cancelled') {
          setStatus('cancelled')
        } else {
          setStatus('pending')
        }
        sessionStorage.removeItem('onex_order_id')
      })
      .catch(() => {
        setStatus('pending')
      })
  }, [])

  const style = statusStyles[status]
  const icon = statusIcons[status]

  const waText = status === 'confirmed'
    ? shop.success.waSuccess
    : status === 'cancelled'
      ? shop.cancelled.waFail
      : shop.success.waSuccess
  const waLabel = status === 'cancelled' ? shop.cancelled.whatsapp : shop.success.whatsapp
  const waLink = 'https://wa.link/q0ht8q'

  const titleText = status === 'confirmed'
    ? shop.success.title
    : status === 'cancelled'
      ? shop.cancelled.title
      : shop.success.title
  const bodyText = status === 'confirmed'
    ? shop.success.body
    : status === 'cancelled'
      ? shop.cancelled.body
      : 'We\'re still verifying your payment. If it was successful, our team will contact you shortly. You can also confirm via WhatsApp.'

  return (
    <section className="section-dark min-h-[80vh] flex items-center justify-center">
      <FadeIn>
        <div className="max-w-md w-full text-center space-y-6 px-5">
          <div className={`w-20 h-20 border ${style.border} ${style.bg} ${style.text} flex items-center justify-center mx-auto`}>
            {status === 'loading' ? (
              <div className="w-10 h-10 border-2 border-neutral-700 border-t-white animate-spin rounded-full" />
            ) : (
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={icon} />
              </svg>
            )}
          </div>
          <h1 className="text-h3 text-white">{status === 'loading' ? 'Verifying Payment...' : titleText}</h1>
          <p className="text-neutral-400 text-body-sm">{status === 'loading' ? 'Please wait while we check your payment status.' : bodyText}</p>
          {status !== 'loading' && (
            <div className="pt-4 space-y-3">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-primary block w-full text-center"
              >
                {waLabel}
              </a>
              {status !== 'confirmed' && (
                <Link href={`/${locale}/shop`} className="cta-secondary block w-full text-center">
                  {shop.cancelled.retry}
                </Link>
              )}
              <Link href={`/${locale}`} className="cta-ghost block w-full text-center">
                {shop.success.home}
              </Link>
            </div>
          )}
        </div>
      </FadeIn>
    </section>
  )
}
