'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { getContent, type Locale } from '@/content'
import FadeIn from '@/components/motion/FadeIn'

interface TransactionDetails {
  invoiceNo: string
  status: string
  amount: number
  bankProvider: string
  paymentMethod: string
}

export default function PaymentSuccessContent({ locale }: { locale: Locale }) {
  const searchParams = useSearchParams()
  const invoiceNo = searchParams.get('invoiceNo') || searchParams.get('invoice_no')
  const content = getContent(locale)
  const t = content.booking

  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'cancelled'>('loading')
  const [transaction, setTransaction] = useState<TransactionDetails | null>(null)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (!invoiceNo) {
      setStatus('error')
      setErrorMessage('No transaction reference found')
      return
    }

    const verifyPayment = async () => {
      try {
        const response = await fetch(`/api/check-payment-status?invoiceNo=${invoiceNo}`)
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || 'Failed to verify payment')
        }

        if (data.success && data.transaction) {
          setTransaction(data.transaction)

          if (data.transaction.status === 'SUCCESS') {
            setStatus('success')
          } else if (data.transaction.status === 'CANCELLED') {
            setStatus('cancelled')
            setErrorMessage(t.cancelled.body)
          } else if (data.transaction.status === 'FAILED') {
            setStatus('error')
            setErrorMessage('Payment failed or was declined by the bank.')
          } else {
            setStatus('error')
            setErrorMessage('Payment is still pending. Please wait or contact support.')
          }
        } else {
          throw new Error('Invalid response from server')
        }
      } catch (err: unknown) {
        setStatus('error')
        setErrorMessage(err instanceof Error ? err.message : 'Failed to verify payment status')
      }
    }

    verifyPayment()
  }, [invoiceNo, t.cancelled.body])

  if (status === 'loading') {
    return (
      <section className="section-dark min-h-[80vh] flex items-center justify-center">
        <div className="max-w-md w-full text-center space-y-6 px-5">
          <div className="w-20 h-20 border border-neutral-800 flex items-center justify-center mx-auto">
            <svg className="w-10 h-10 animate-spin text-neutral-500" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          </div>
          <h1 className="text-h3 text-white">{t.loading.title}</h1>
          <p className="text-neutral-500 text-body-sm">{t.loading.body}</p>
        </div>
      </section>
    )
  }

  if (status === 'cancelled') {
    return (
      <section className="section-dark min-h-[80vh] flex items-center justify-center">
        <FadeIn>
          <div className="max-w-md w-full text-center space-y-6 px-5">
            <div className="w-20 h-20 border border-yellow-800/50 bg-yellow-950/30 text-yellow-500 flex items-center justify-center mx-auto">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h1 className="text-h3 text-white">{t.cancelled.title}</h1>
            <p className="text-neutral-500 text-body-sm">{errorMessage}</p>
            <div className="pt-4 space-y-3">
              <Link href={`/${locale}/booking`} className="cta-primary block w-full text-center">
                {t.cancelled.retry}
              </Link>
              <Link href={`/${locale}`} className="cta-secondary block w-full text-center">
                {t.cancelled.home}
              </Link>
            </div>
          </div>
        </FadeIn>
      </section>
    )
  }

  if (status === 'error') {
    return (
      <section className="section-dark min-h-[80vh] flex items-center justify-center">
        <FadeIn>
          <div className="max-w-md w-full text-center space-y-6 px-5">
            <div className="w-20 h-20 border border-red-900/50 bg-red-950/30 text-red-500 flex items-center justify-center mx-auto">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h1 className="text-h3 text-white">{t.error.title}</h1>
            <p className="text-neutral-500 text-body-sm">{errorMessage || t.error.body}</p>
            {transaction && (
              <div className="bg-neutral-950 border border-neutral-800 p-4 text-body-sm text-neutral-400 space-y-2">
                <div>{t.success.invoice}: <span className="font-mono font-bold text-white">{transaction.invoiceNo}</span></div>
                <div>Status: <span className="font-bold text-red-500">{transaction.status}</span></div>
              </div>
            )}
            <div className="pt-4 space-y-3">
              <Link href={`/${locale}/booking`} className="cta-primary block w-full text-center">
                {t.error.retry}
              </Link>
              <Link href={`/${locale}`} className="cta-secondary block w-full text-center">
                {t.error.home}
              </Link>
            </div>
          </div>
        </FadeIn>
      </section>
    )
  }

  // Success
  return (
    <section className="section-dark min-h-[80vh] flex items-center justify-center">
      <FadeIn>
        <div className="max-w-md w-full text-center space-y-6 px-5">
          <div className="w-20 h-20 border border-brand-red/40 bg-brand-red/10 text-brand-red flex items-center justify-center mx-auto">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-h3 text-white">{t.success.title}</h1>
          <p className="text-neutral-500 text-body-sm">{t.success.body}</p>

          {transaction && (
            <div className="bg-neutral-950 border border-neutral-800 p-4 text-body-sm text-neutral-400 space-y-2">
              <div>{t.success.invoice}: <span className="font-mono font-bold text-white">{transaction.invoiceNo}</span></div>
              <div>{t.success.amount}: <span className="font-bold text-white">RM {transaction.amount.toFixed(2)}</span></div>
              <div>{t.success.payment}: <span className="font-medium text-neutral-200">{transaction.bankProvider}</span></div>
            </div>
          )}

          <div className="pt-4 space-y-3">
            <button
              onClick={() => window.print()}
              className="cta-secondary block w-full text-center"
            >
              {t.success.receipt}
            </button>
            <Link href={`/${locale}`} className="cta-primary block w-full text-center">
              {t.success.home}
            </Link>
          </div>
        </div>
      </FadeIn>
    </section>
  )
}
