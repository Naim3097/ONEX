'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DayPicker } from 'react-day-picker'
import { format } from 'date-fns'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { getContent, type Locale } from '@/content'
import FadeIn from '@/components/motion/FadeIn'
import Text from '@/components/typography/Text'
import 'react-day-picker/dist/style.css'

interface BookingFormProps {
  locale: Locale
}

type BookingData = {
  name: string
  phone: string
  address: string
  vehicleModel: string
  issues: string
  date: Date | undefined
  timeSlot: string | undefined
}

export default function BookingForm({ locale }: BookingFormProps) {
  const content = getContent(locale)
  const t = content.booking.form
  const timeSlots = content.booking.timeSlots

  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<BookingData>({
    name: '',
    phone: '',
    address: '',
    vehicleModel: '',
    issues: '',
    date: undefined,
    timeSlot: undefined,
  })

  const updateData = (fields: Partial<BookingData>) => {
    setData(prev => ({ ...prev, ...fields }))
  }

  const inputClasses =
    'w-full px-5 py-4 bg-neutral-900 border border-neutral-800 text-neutral-100 placeholder:text-neutral-600 text-body-sm focus:border-brand-red focus:ring-0 outline-none transition-colors duration-200'

  const canProceed =
    data.name && data.phone && data.address && data.vehicleModel && data.date && data.timeSlot

  const handleSubmit = async () => {
    if (!data.date || !data.timeSlot) return

    setLoading(true)
    setError(null)

    try {
      const docRef = await addDoc(collection(db, 'bookings'), {
        ...data,
        status: 'pending_payment',
        paymentStatus: 'pending',
        createdAt: new Date(),
        date: data.date,
      })

      const response = await fetch('/api/create-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: 2,
          invoiceRef: `BOOKING-${docRef.id}`,
          customerName: data.name,
          customerEmail: 'guest@onexbooking.com',
          customerPhone: data.phone,
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
        // Store Lean.x billNo + bookingId in Firestore (fire and forget — don't block redirect)
        if (paymentData.billNo) {
          import('firebase/firestore').then(({ doc, updateDoc }) => {
            updateDoc(doc(db, 'bookings', docRef.id), {
              leanxBillNo: paymentData.billNo,
              leanxInvoiceRef: paymentData.invoiceRef,
            }).catch(() => {})
          })
        }
        // Store bookingId so the success page can verify payment
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('onex_booking_id', docRef.id)
        }
        window.location.href = paymentData.redirectUrl
      } else {
        throw new Error('Invalid response from payment gateway')
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to process your booking. Please try again.'
      setError(message)
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Step indicator */}
      <FadeIn>
        <div className="mb-10 flex items-center gap-4 px-2">
          {[1, 2].map((i) => (
            <div key={i} className="flex items-center gap-3 flex-1">
              <div
                className={`w-8 h-8 flex items-center justify-center text-xs font-bold transition-all duration-300 border ${
                  step >= i
                    ? 'bg-brand-red text-white border-brand-red'
                    : 'bg-transparent text-neutral-600 border-neutral-700'
                }`}
              >
                {i}
              </div>
              <span
                className={`text-xs font-medium tracking-wide uppercase transition-colors duration-300 ${
                  step >= i ? 'text-neutral-200' : 'text-neutral-600'
                }`}
              >
                {i === 1 ? t.stepDetails : t.stepReview}
              </span>
              {i < 2 && (
                <div
                  className={`flex-1 h-px transition-colors duration-500 ${
                    step > i ? 'bg-brand-red' : 'bg-neutral-800'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </FadeIn>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="mb-8">
              <h2 className="text-h4 text-white tracking-tight">{t.detailsTitle}</h2>
              <p className="text-neutral-500 text-body-sm mt-1">{t.detailsSubtitle}</p>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="sr-only">{t.fields.name}</label>
                <input
                  type="text"
                  id="name"
                  placeholder={t.fields.name}
                  value={data.name}
                  onChange={e => updateData({ name: e.target.value })}
                  required
                  className={inputClasses}
                />
              </div>
              <div>
                <label htmlFor="phone" className="sr-only">{t.fields.phone}</label>
                <input
                  type="tel"
                  id="phone"
                  placeholder={t.fields.phone}
                  value={data.phone}
                  onChange={e => updateData({ phone: e.target.value })}
                  required
                  className={inputClasses}
                />
              </div>
              <div>
                <label htmlFor="address" className="sr-only">{t.fields.address}</label>
                <input
                  type="text"
                  id="address"
                  placeholder={t.fields.address}
                  value={data.address}
                  onChange={e => updateData({ address: e.target.value })}
                  required
                  className={inputClasses}
                />
              </div>
              <div>
                <label htmlFor="vehicleModel" className="sr-only">{t.fields.vehicleModel}</label>
                <input
                  type="text"
                  id="vehicleModel"
                  placeholder={t.fields.vehicleModel}
                  value={data.vehicleModel}
                  onChange={e => updateData({ vehicleModel: e.target.value })}
                  required
                  className={inputClasses}
                />
              </div>
              <div>
                <label htmlFor="issues" className="sr-only">{t.fields.issues}</label>
                <textarea
                  id="issues"
                  placeholder={t.fields.issues}
                  value={data.issues}
                  onChange={e => updateData({ issues: e.target.value })}
                  rows={3}
                  className={`${inputClasses} resize-none`}
                />
              </div>
            </div>

            <div className="pt-6">
              <h3 className="text-body-sm font-bold text-white mb-4 uppercase tracking-wider">
                {t.fields.dateTime}
              </h3>
              <div className="flex justify-center bg-neutral-900 border border-neutral-800 p-2 sm:p-6 overflow-hidden mb-4">
                <DayPicker
                  mode="single"
                  selected={data.date}
                  onSelect={(date) => updateData({ date: date ?? undefined })}
                  disabled={[
                    { before: new Date() },
                    { dayOfWeek: [0] },
                  ]}
                  className="!font-sans m-0 w-full"
                  classNames={{
                    months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
                    month: 'space-y-4',
                    caption: 'flex justify-center pt-1 relative items-center',
                    caption_label: 'text-sm font-bold text-neutral-200',
                    nav: 'space-x-1 flex items-center',
                    nav_button: 'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 transition-opacity text-neutral-400',
                    nav_button_previous: 'absolute left-1',
                    nav_button_next: 'absolute right-1',
                    table: 'w-full border-collapse space-y-1',
                    head_row: 'flex',
                    head_cell: 'text-neutral-500 w-9 font-normal text-[0.8rem]',
                    row: 'flex w-full mt-2',
                    cell: 'text-center text-sm p-0 relative focus-within:relative focus-within:z-20',
                    day: 'h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-neutral-800 transition-colors text-neutral-300',
                    day_selected: 'bg-brand-red text-white hover:bg-brand-red-dark hover:text-white focus:bg-brand-red focus:text-white',
                    day_today: 'bg-neutral-800 text-white',
                    day_outside: 'text-neutral-700 opacity-50',
                    day_disabled: 'text-neutral-700 opacity-50',
                    day_hidden: 'invisible',
                  }}
                />
              </div>

              {data.date && (
                <div className="grid grid-cols-1 gap-px bg-neutral-800 border border-neutral-800">
                  {timeSlots.map(slot => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => updateData({ timeSlot: slot })}
                      className={`p-4 text-body-sm font-medium transition-all duration-200 flex justify-between items-center group ${
                        data.timeSlot === slot
                          ? 'bg-brand-red text-white'
                          : 'bg-neutral-950 hover:bg-neutral-900 text-neutral-400'
                      }`}
                    >
                      <span>{slot}</span>
                      <div
                        className={`w-3 h-3 border transition-colors ${
                          data.timeSlot === slot
                            ? 'border-white bg-white'
                            : 'border-neutral-600 group-hover:border-neutral-500'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              type="button"
              className="cta-primary w-full text-center mt-6"
              onClick={() => setStep(2)}
              disabled={!canProceed}
            >
              {t.next}
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="mb-8">
              <h2 className="text-h4 text-white tracking-tight">{t.reviewTitle}</h2>
              <p className="text-neutral-500 text-body-sm mt-1">{t.reviewSubtitle}</p>
            </div>

            <div className="bg-neutral-900 border border-neutral-800 p-8 space-y-4 text-body-sm">
              {[
                { label: t.labels.customer, value: data.name, bold: true },
                { label: t.labels.contact, value: data.phone },
                { label: t.labels.vehicle, value: data.vehicleModel },
                { label: t.labels.date, value: data.date ? format(data.date, 'PPP') : '-' },
                { label: t.labels.time, value: data.timeSlot || '-' },
              ].map(({ label, value, bold }) => (
                <div key={label} className="flex justify-between items-center pb-4 border-b border-neutral-800">
                  <span className="text-neutral-500 text-xs uppercase tracking-wider">{label}</span>
                  <span className={bold ? 'font-bold text-white' : 'font-medium text-neutral-200'}>
                    {value}
                  </span>
                </div>
              ))}

              <div className="pt-4 bg-neutral-950 border border-neutral-800 p-4 mt-2">
                <span className="text-neutral-500 text-[0.65rem] uppercase tracking-[0.15em] font-bold block mb-2">
                  {t.labels.location}
                </span>
                <span className="font-medium text-neutral-200 block">{data.address}</span>
              </div>

              {data.issues && (
                <div className="pt-2">
                  <span className="text-neutral-500 text-[0.65rem] uppercase tracking-[0.15em] font-bold block mb-1">
                    {t.labels.problem}
                  </span>
                  <p className="text-neutral-400 italic">{data.issues}</p>
                </div>
              )}
            </div>

            <div className="bg-brand-red/10 border border-brand-red/30 p-4 text-center">
              <p className="text-brand-red-light font-medium text-body-sm">
                {t.depositNotice}{' '}
                <span className="font-bold text-white">{t.depositAmount}</span>
              </p>
            </div>

            <div className="flex flex-col gap-3 mt-6">
              {error && (
                <div className="p-4 bg-red-950/50 text-red-400 text-body-sm border border-red-900/50 break-words">
                  <p className="font-bold mb-1">Payment Error:</p>
                  {error}
                </div>
              )}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  disabled={loading}
                  className="cta-secondary w-1/3 text-center"
                >
                  {t.back}
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading}
                  className="cta-primary w-2/3 text-center"
                >
                  {loading ? t.processing : t.pay}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
