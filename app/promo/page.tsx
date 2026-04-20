'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { DayPicker } from 'react-day-picker'
import { format } from 'date-fns'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import 'react-day-picker/dist/style.css'

/* ═══════════════════════════════════════════════
   CONSTANTS
   ═══════════════════════════════════════════════ */

const WHATSAPP_LINK =
  'https://wa.me/+601131051677?text=ONEX%20PROMO%20-%20Saya%20berminat%20dengan%20pakej%20servis%20gearbox.'
const PHONE_TEL = 'tel:+601131051677'
const TOTAL_PROMO_SLOTS = 100
const COUNTDOWN_MINUTES = 15

const TIME_SLOTS = [
  '9:00 AM – 10:00 AM',
  '10:00 AM – 11:00 AM',
  '11:00 AM – 12:00 PM',
  '2:00 PM – 3:00 PM',
  '3:00 PM – 4:00 PM',
  '4:00 PM – 5:00 PM',
]

const PACKAGE = {
  id: 'atf-service',
  name: 'Pakej Servis ATF Gearbox',
  nameEn: 'ATF Gearbox Service Package',
  price: 439,
  deposit: 10,
  image: '/images/asset promotion/kedai promotion pakej amended.png',
  features: [
    'ATF oil change (4L)',
    'Gearbox filter cleaning',
    'Pan gasket inspection',
    'Reset adaptations',
    'Alat OBD2 scanner PERCUMA (bawa balik)',
    '3 bulan warranty',
  ],
  home2home: true,
}

const REVIEWS = [
  {
    id: 1,
    name: 'Ahmad Faizal',
    initial: 'A',
    rating: 5,
    text: 'Gearbox kereta saya dah mula slip teruk. Hantar sini, siap dalam 2 hari. Sekarang smooth macam baru!',
    car: 'Honda City GM6',
    time: '2 minggu lalu',
  },
  {
    id: 2,
    name: 'Nurul Izzah',
    initial: 'N',
    rating: 5,
    text: 'Sangat profesional. Diagnose dulu sebelum buat apa-apa. Harga berpatutan dan kerja tip-top.',
    car: 'Perodua Myvi',
    time: '1 bulan lalu',
  },
  {
    id: 3,
    name: 'David Tan',
    initial: 'D',
    rating: 5,
    text: 'Best workshop for CVT gearbox. They explained everything clearly before doing the work. Fair pricing.',
    car: 'Nissan X-Trail',
    time: '3 minggu lalu',
  },
  {
    id: 4,
    name: 'Raj Kumar',
    initial: 'R',
    rating: 5,
    text: 'Tried many workshops before. This is the only one that properly diagnosed my torque converter issue. Fixed!',
    car: 'Toyota Alphard',
    time: '1 bulan lalu',
  },
  {
    id: 5,
    name: 'Siti Aminah',
    initial: 'S',
    rating: 5,
    text: 'Warranty 12 bulan bagi saya keyakinan. Servis cepat, staff ramah, dan hasilnya memang terbaik.',
    car: 'Honda Civic FC',
    time: '2 minggu lalu',
  },
  {
    id: 6,
    name: 'Lim Wei Jie',
    initial: 'L',
    rating: 5,
    text: 'OBD diagnosis free was legit. They showed me the exact issue on screen. Very transparent workshop.',
    car: 'Mercedes C200',
    time: '3 minggu lalu',
  },
]

const PAIN_POINTS = [
  {
    icon: '⚠️',
    title: 'Gearbox Slip & Jerking',
    desc: 'Kereta tersentak semasa tukar gear? RPM naik tapi kereta tak bergerak?',
  },
  {
    icon: '🔥',
    title: 'Overheat & Bau Terbakar',
    desc: 'Bau hangit dari gearbox? Transmission fluid bocor atau bertukar warna hitam?',
  },
  {
    icon: '🔊',
    title: 'Bunyi Pelik & Vibration',
    desc: 'Bunyi whining, humming atau grinding bila drive? Steering vibrate teruk?',
  },
  {
    icon: '🚫',
    title: 'Check Engine Light ON',
    desc: 'Dashboard warning light menyala? Kereta masuk limp mode dan tak boleh laju?',
  },
]

/* ═══════════════════════════════════════════════
   ANIMATION VARIANTS
   ═══════════════════════════════════════════════ */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0, 0.4, 0, 1] },
  }),
}

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
}

/* ═══════════════════════════════════════════════
   SUB-COMPONENTS
   ═══════════════════════════════════════════════ */

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: rating }).map((_, i) => (
        <svg key={i} className="w-3.5 h-3.5 text-[#FBBC04]" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

function SectionWrapper({
  children,
  id,
  dark = true,
  className = '',
}: {
  children: React.ReactNode
  id: string
  dark?: boolean
  className?: string
}) {
  return (
    <section
      id={id}
      className={`${dark ? 'bg-brand-black' : 'bg-neutral-950'} px-5 md:px-10 py-16 md:py-24 lg:py-32 ${className}`}
    >
      <div className="max-w-content mx-auto">{children}</div>
    </section>
  )
}

function AnimatedSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={stagger}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function CountdownTimer({ onExpire }: { onExpire?: () => void }) {
  const [timeLeft, setTimeLeft] = useState(COUNTDOWN_MINUTES * 60)

  useEffect(() => {
    if (timeLeft <= 0) {
      onExpire?.()
      return
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000)
    return () => clearInterval(timer)
  }, [timeLeft, onExpire])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  return (
    <div className="flex items-center gap-3 justify-center">
      <div className="flex items-center gap-1">
        <span className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-brand-red text-white text-h3 md:text-h2 font-bold tabular-nums">
          {String(minutes).padStart(2, '0')}
        </span>
        <span className="text-h3 text-neutral-500 font-bold mx-1">:</span>
        <span className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-brand-red text-white text-h3 md:text-h2 font-bold tabular-nums">
          {String(seconds).padStart(2, '0')}
        </span>
      </div>
    </div>
  )
}

function SlotsCounter() {
  const [claimed, setClaimed] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return
    // Simulate a realistic claimed count (67-83 out of 100)
    const target = Math.floor(Math.random() * 16) + 67
    let current = 0
    const interval = setInterval(() => {
      current += 1
      setClaimed(current)
      if (current >= target) clearInterval(interval)
    }, 20)
    return () => clearInterval(interval)
  }, [isInView])

  const remaining = TOTAL_PROMO_SLOTS - claimed
  const pct = (claimed / TOTAL_PROMO_SLOTS) * 100

  return (
    <div ref={ref} className="w-full max-w-md mx-auto">
      <div className="flex justify-between text-body-sm mb-2">
        <span className="text-neutral-400">Sudah ditempah</span>
        <span className="text-brand-red font-bold">{remaining} slot lagi!</span>
      </div>
      <div className="w-full h-2 bg-neutral-800 overflow-hidden">
        <motion.div
          className="h-full bg-brand-red"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1.5, ease: [0, 0.4, 0, 1] }}
        />
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════
   FORM TYPES
   ═══════════════════════════════════════════════ */

type FormData = {
  name: string
  phone: string
  vehicleModel: string
  issues: string
  date: Date | undefined
  timeSlot: string | undefined
}

/* ═══════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ═══════════════════════════════════════════════ */

export default function PromoPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    vehicleModel: '',
    issues: '',
    date: undefined,
    timeSlot: undefined,
  })
  const [step, setStep] = useState<'form' | 'booking' | 'checkout'>('form')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const formRef = useRef<HTMLDivElement>(null)
  const bookingRef = useRef<HTMLDivElement>(null)
  const checkoutRef = useRef<HTMLDivElement>(null)

  const updateForm = (fields: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...fields }))
  }

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const selectedPkg = PACKAGE

  const canSubmitDetails =
    formData.name.trim() && formData.phone.trim() && formData.vehicleModel.trim()

  const canSubmitBooking = formData.date && formData.timeSlot

  const handleProceedToBooking = () => {
    if (!canSubmitDetails) return
    setStep('booking')
    setTimeout(() => scrollTo('booking'), 100)
  }

  const handleProceedToCheckout = () => {
    if (!canSubmitBooking) return
    setStep('checkout')
    setTimeout(() => scrollTo('checkout'), 100)
  }

  const handleSubmit = async () => {
    if (!formData.date || !formData.timeSlot) return

    setLoading(true)
    setError(null)

    try {
      const docRef = await addDoc(collection(db, 'bookings'), {
        name: formData.name,
        phone: formData.phone,
        vehicleModel: formData.vehicleModel,
        issues: formData.issues,
        date: formData.date,
        timeSlot: formData.timeSlot,
        selectedPackage: PACKAGE.id,
        packagePrice: PACKAGE.price,
        source: 'promo-landing',
        status: 'pending_payment',
        paymentStatus: 'pending',
        createdAt: new Date(),
      })

      const response = await fetch('/api/create-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: selectedPkg.deposit,
          invoiceRef: `PROMO-${docRef.id}`,
          customerName: formData.name,
          customerEmail: 'guest@onexbooking.com',
          customerPhone: formData.phone,
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
        if (paymentData.billNo) {
          import('firebase/firestore').then(({ doc, updateDoc }) => {
            updateDoc(doc(db, 'bookings', docRef.id), {
              leanxBillNo: paymentData.billNo,
              leanxInvoiceRef: paymentData.invoiceRef,
            }).catch(() => {})
          })
        }
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('onex_booking_id', docRef.id)
        }
        window.location.href = paymentData.redirectUrl
      } else {
        throw new Error('Invalid response from payment gateway')
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Gagal memproses tempahan. Sila cuba semula.'
      setError(message)
      setLoading(false)
    }
  }

  const handleWhatsAppFallback = useCallback(() => {
    const msg = `ONEX PROMO - Saya nak book ${PACKAGE.name} (RM${PACKAGE.price}).%0ANama: ${formData.name}%0APhone: ${formData.phone}%0AKereta: ${formData.vehicleModel}`
    window.open(`https://wa.me/+601131051677?text=${msg}`, '_blank')
  }, [formData])

  const inputClasses =
    'w-full px-5 py-4 bg-neutral-900 border border-neutral-800 text-neutral-100 placeholder:text-neutral-600 text-body-sm focus:border-brand-red focus:ring-0 outline-none transition-colors duration-200'

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 text-center">
        <div>
          <div className="w-16 h-16 bg-emerald-900/50 border border-emerald-800 flex items-center justify-center mx-auto mb-6 text-2xl">
            ✓
          </div>
          <h2 className="text-h3 text-white font-bold mb-3">Tempahan Berjaya!</h2>
          <p className="text-neutral-400 text-body mb-6 max-w-sm mx-auto">
            Kami akan hubungi anda dalam masa 24 jam untuk pengesahan.
          </p>
          <a href={WHATSAPP_LINK} className="cta-primary inline-block">
            WhatsApp Kami
          </a>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* ─── HERO SECTION ─── */}
      <section className="relative min-h-[100svh] flex items-center overflow-hidden">
        {/* BG Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero/Hero 1.jpeg"
            alt="One X Transmission Workshop"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black" />
        </div>

        <div className="relative z-10 max-w-content mx-auto px-5 md:px-10 w-full py-24 md:py-32">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            {/* Badge */}
            <motion.div variants={fadeUp} custom={0} className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-brand-red/10 border border-brand-red/30 text-brand-red text-overline uppercase tracking-widest font-bold">
                <span className="w-2 h-2 bg-brand-red rounded-full animate-pulse" />
                Tawaran Terhad — April 2026
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              custom={1}
              className="text-display text-white font-bold tracking-tight mb-6 max-w-3xl"
            >
              Servis Gearbox + Alat OBD2 <span className="text-brand-red">PERCUMA</span>
            </motion.h1>

            {/* Home-to-Home tag */}
            <motion.div variants={fadeUp} custom={1.5} className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-900/30 border border-emerald-800/40 text-emerald-400 text-body-sm font-medium">
                🏠 Home-to-Home Service — Kami ambil & hantar kereta anda!
              </span>
            </motion.div>

            {/* Subheadline */}
            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-body-lg md:text-xl text-neutral-300 max-w-2xl mb-10 leading-relaxed font-light"
            >
              Pakar gearbox CVT & automatik #1 Shah Alam. 15+ tahun pengalaman, 5,000+ kereta diperbaiki.
              Dapatkan alat OBD2 scanner percuma untuk 100 pelanggan pertama.
            </motion.p>

            {/* Trust badges */}
            <motion.div variants={fadeUp} custom={3} className="flex flex-wrap gap-6 mb-10">
              {[
                { label: '15+ Tahun', sub: 'Pengalaman' },
                { label: '5,000+', sub: 'Kereta Siap' },
                { label: '4.9/5', sub: 'Google Rating' },
                { label: '12 Bulan', sub: 'Warranty' },
              ].map((badge) => (
                <div key={badge.label} className="flex items-center gap-3">
                  <div className="w-px h-8 bg-brand-red" />
                  <div>
                    <p className="text-white font-bold text-body">{badge.label}</p>
                    <p className="text-neutral-500 text-caption">{badge.sub}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div variants={fadeUp} custom={4} className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => scrollTo('packages')} className="cta-primary text-center text-base px-10 py-5">
                Dapatkan Promo Sekarang
              </button>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="cta-secondary text-center text-base px-10 py-5">
                WhatsApp Kami
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-neutral-600 text-caption uppercase tracking-widest">Scroll</span>
          <svg className="w-5 h-5 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </section>

      {/* ─── EMPATHY / PROBLEM SECTION ─── */}
      <SectionWrapper id="problems" dark={false}>
        <AnimatedSection>
          <motion.div variants={fadeUp} className="text-center mb-12 md:mb-16">
            <p className="overline-label mb-4">Masalah Gearbox?</p>
            <h2 className="text-h2 text-white font-bold max-w-2xl mx-auto">
              Jangan tunggu sampai <span className="text-brand-red">terlambat</span>
            </h2>
            <p className="text-body-lg text-neutral-400 mt-4 max-w-xl mx-auto">
              Masalah kecil yang dibiarkan boleh jadi kerosakan besar — dan kos pembaikan berganda.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/5">
            {PAIN_POINTS.map((point, i) => (
              <motion.div
                key={point.title}
                variants={fadeUp}
                custom={i}
                className="bg-neutral-950 p-8 md:p-10 group hover:bg-neutral-900 transition-colors duration-334"
              >
                <span className="text-3xl mb-4 block">{point.icon}</span>
                <h3 className="text-h4 text-white font-bold mb-2">{point.title}</h3>
                <p className="text-body-sm text-neutral-400 leading-relaxed">{point.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeUp} className="text-center mt-10">
            <button
              onClick={() => scrollTo('solution')}
              className="cta-ghost inline-flex items-center gap-2"
            >
              Lihat Penyelesaian
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>
          </motion.div>
        </AnimatedSection>
      </SectionWrapper>

      {/* ─── SOLUTION SECTION ─── */}
      <SectionWrapper id="solution">
        <AnimatedSection>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image */}
            <motion.div variants={fadeUp} className="relative aspect-[4/3] bg-neutral-900 overflow-hidden">
              <Image
                src="/images/asset promotion/obd2.png"
                alt="OBD2 Diagnostic Tool"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>

            {/* Content */}
            <div>
              <motion.p variants={fadeUp} className="overline-label mb-4">
                Penyelesaian Kami
              </motion.p>
              <motion.h2 variants={fadeUp} className="text-h2 text-white font-bold mb-6">
                Alat OBD2 Percuma + Servis Gearbox <span className="text-brand-red">Profesional</span>
              </motion.h2>
              <motion.p variants={fadeUp} className="text-body-lg text-neutral-400 mb-8 leading-relaxed">
                Kami gunakan alat OBD profesional untuk diagnose masalah gearbox dengan tepat — sebelum
                buat apa-apa kerja. Tak ada agak-agak, semua berdasarkan data.
              </motion.p>

              <motion.div variants={stagger} className="space-y-4">
                {[
                  {
                    title: 'Diagnosis Tepat',
                    desc: 'OBD scan menunjukkan masalah sebenar — jimat masa & duit',
                  },
                  {
                    title: 'Pakar Berpengalaman',
                    desc: '15+ tahun pengalaman dalam semua jenis gearbox CVT & AT',
                  },
                  {
                    title: 'Parts Original/OEM',
                    desc: '100% parts original — tiada guna barang tiruan',
                  },
                  {
                    title: 'Warranty Sehingga 12 Bulan',
                    desc: 'Jaminan kerja berkualiti dengan warranty bertulis',
                  },
                ].map((item) => (
                  <motion.div
                    key={item.title}
                    variants={fadeUp}
                    className="flex gap-4 items-start p-4 bg-neutral-900/50 border border-neutral-800/50"
                  >
                    <div className="w-2 h-2 bg-brand-red mt-2 shrink-0" />
                    <div>
                      <p className="text-white font-medium text-body">{item.title}</p>
                      <p className="text-neutral-500 text-body-sm">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div variants={fadeUp} className="mt-8">
                <button onClick={() => scrollTo('packages')} className="cta-primary">
                  Lihat Pakej & Harga
                </button>
              </motion.div>
            </div>
          </div>
        </AnimatedSection>
      </SectionWrapper>

      {/* ─── URGENCY / PROMO SECTION ─── */}
      <SectionWrapper id="urgency" dark={false}>
        <AnimatedSection className="text-center">
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-brand-red/10 border border-brand-red/30 text-brand-red text-overline uppercase tracking-widest font-bold mb-6">
              🔥 Tawaran Terhad
            </span>
          </motion.div>

          <motion.h2 variants={fadeUp} className="text-h1 text-white font-bold mb-4 max-w-2xl mx-auto">
            Alat OBD2 Scanner <span className="text-brand-red">PERCUMA</span> untuk 100 Pelanggan Pertama
          </motion.h2>

          <motion.p variants={fadeUp} className="text-body-lg text-neutral-400 mb-10 max-w-xl mx-auto">
            Alat OBD2 scanner bernilai RM80 — anda dapat BAWA BALIK secara PERCUMA apabila book pakej servis gearbox kami.
          </motion.p>

          <motion.div variants={fadeUp} className="mb-8">
            <p className="text-overline uppercase tracking-widest text-neutral-500 mb-4">Tawaran tamat dalam</p>
            <CountdownTimer />
          </motion.div>

          <motion.div variants={fadeUp} className="mb-10">
            <SlotsCounter />
          </motion.div>

          <motion.div variants={fadeUp}>
            <button onClick={() => scrollTo('packages')} className="cta-primary text-base px-10 py-5">
              Claim Slot Sekarang →
            </button>
          </motion.div>
        </AnimatedSection>
      </SectionWrapper>

      {/* ─── PACKAGES SECTION ─── */}
      <SectionWrapper id="packages">
        <AnimatedSection>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white/5 ring-1 ring-brand-red">
            {/* Package Image */}
            <motion.div variants={fadeUp} className="relative aspect-[4/3] lg:aspect-auto bg-neutral-900 overflow-hidden">
              <Image
                src={PACKAGE.image}
                alt={PACKAGE.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>

            {/* Package Details */}
            <motion.div variants={fadeUp} className="bg-neutral-950 p-8 md:p-10 lg:p-12 flex flex-col justify-center">
              <p className="overline-label mb-3">Pakej Servis</p>
              <h2 className="text-h3 md:text-h2 text-white font-bold mb-1">{PACKAGE.name}</h2>
              <p className="text-caption text-neutral-500 mb-6">{PACKAGE.nameEn}</p>

              <div className="mb-6">
                <span className="text-display text-white font-bold">RM{PACKAGE.price}</span>
                <span className="text-neutral-500 text-body-sm ml-2">/ servis penuh</span>
              </div>

              <div className="mb-2 p-3 bg-brand-red/10 border border-brand-red/20">
                <p className="text-brand-red text-body-sm font-medium">
                  🎁 + Alat OBD2 Scanner PERCUMA untuk bawa balik (bernilai RM80)
                </p>
              </div>

              <div className="mb-2 p-3 bg-emerald-900/20 border border-emerald-800/30">
                <p className="text-emerald-400 text-body-sm font-medium">
                  🏠 Servis Home-to-Home — kami datang ke rumah anda!
                </p>
              </div>

              <div className="mb-8 p-3 bg-neutral-900 border border-neutral-800">
                <p className="text-neutral-400 text-body-sm">
                  Deposit hanya <span className="text-white font-bold">RM{PACKAGE.deposit}</span> untuk tempah slot
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                {PACKAGE.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-3 text-body-sm text-neutral-300">
                    <svg className="w-4 h-4 text-brand-red mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {feat}
                  </li>
                ))}
                <li className="flex items-start gap-3 text-body-sm text-neutral-300">
                  <svg className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Home-to-Home service (kami ambil & hantar kereta anda)
                </li>
              </ul>

              <button
                onClick={() => scrollTo('details')}
                className="w-full text-center py-4 font-medium text-body tracking-wide bg-brand-red text-white hover:bg-brand-red-dark active:scale-[0.98] transition-all duration-334"
              >
                Book Sekarang →
              </button>
            </motion.div>
          </div>
        </AnimatedSection>
      </SectionWrapper>

      {/* ─── TRUST / REVIEWS SECTION ─── */}
      <SectionWrapper id="reviews" dark={false}>
        <AnimatedSection>
          <motion.div variants={fadeUp} className="mb-12 md:mb-16">
            <p className="overline-label mb-4">Testimoni Pelanggan</p>
            <h2 className="text-h2 text-white font-bold max-w-xl">
              Dipercayai oleh pemandu seluruh Selangor
            </h2>
            <div className="flex items-center gap-3 mt-5">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              <span className="text-body-lg text-white font-semibold">4.9</span>
              <StarRating rating={5} />
              <span className="text-body-sm text-neutral-500">· 500+ reviews</span>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
            {REVIEWS.map((review, i) => (
              <motion.article
                key={review.id}
                variants={fadeUp}
                custom={i}
                className="bg-neutral-950 p-8 flex flex-col"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-neutral-800 border border-neutral-700 flex items-center justify-center text-body-sm font-semibold text-neutral-300">
                    {review.initial}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-body-sm font-medium text-white truncate">{review.name}</p>
                    <p className="text-caption text-neutral-600">{review.time}</p>
                  </div>
                </div>
                <StarRating rating={review.rating} />
                <p className="text-body-sm text-neutral-400 leading-relaxed mt-3 flex-1">{review.text}</p>
                <p className="text-caption text-neutral-600 mt-3">{review.car}</p>
              </motion.article>
            ))}
          </div>
        </AnimatedSection>
      </SectionWrapper>

      {/* ─── USER DETAILS FORM ─── */}
      <SectionWrapper id="details">
        <AnimatedSection>
          <div className="max-w-lg mx-auto" ref={formRef}>
            {/* Step indicator */}
            <motion.div variants={fadeUp} className="mb-10 flex items-center gap-4 px-2">
              {[
                { num: 1, label: 'Maklumat', key: 'form' },
                { num: 2, label: 'Tarikh', key: 'booking' },
                { num: 3, label: 'Bayar', key: 'checkout' },
              ].map((s, i) => {
                const isActive =
                  s.key === 'form' ||
                  (s.key === 'booking' && (step === 'booking' || step === 'checkout')) ||
                  (s.key === 'checkout' && step === 'checkout')
                return (
                  <div key={s.num} className="flex items-center gap-3 flex-1">
                    <div
                      className={`w-8 h-8 flex items-center justify-center text-xs font-bold transition-all duration-300 border ${
                        isActive
                          ? 'bg-brand-red text-white border-brand-red'
                          : 'bg-transparent text-neutral-600 border-neutral-700'
                      }`}
                    >
                      {s.num}
                    </div>
                    <span
                      className={`text-xs font-medium tracking-wide uppercase transition-colors duration-300 ${
                        isActive ? 'text-neutral-200' : 'text-neutral-600'
                      }`}
                    >
                      {s.label}
                    </span>
                    {i < 2 && (
                      <div
                        className={`flex-1 h-px transition-colors duration-500 ${
                          (i === 0 && (step === 'booking' || step === 'checkout')) ||
                          (i === 1 && step === 'checkout')
                            ? 'bg-brand-red'
                            : 'bg-neutral-800'
                        }`}
                      />
                    )}
                  </div>
                )
              })}
            </motion.div>

            {/* Selected package summary */}
            <motion.div variants={fadeUp} className="mb-8 p-5 bg-neutral-900 border border-neutral-800">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-overline uppercase tracking-widest text-neutral-500 mb-1">Pakej Dipilih</p>
                  <p className="text-white font-bold text-body-lg">{selectedPkg.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-white font-bold text-h4">RM{selectedPkg.price}</p>
                  <p className="text-neutral-500 text-caption">Deposit: RM{selectedPkg.deposit}</p>
                </div>
              </div>
            </motion.div>

            <AnimatePresence mode="wait">
              {/* Step 1: Details */}
              {step === 'form' && (
                <motion.div
                  key="step-form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="mb-6">
                    <h2 className="text-h4 text-white tracking-tight font-bold">Maklumat Anda</h2>
                    <p className="text-neutral-500 text-body-sm mt-1">Isi butiran ringkas untuk tempah slot</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label htmlFor="promo-name" className="sr-only">Nama Penuh</label>
                      <input
                        type="text"
                        id="promo-name"
                        placeholder="Nama Penuh"
                        value={formData.name}
                        onChange={(e) => updateForm({ name: e.target.value })}
                        required
                        className={inputClasses}
                      />
                    </div>
                    <div>
                      <label htmlFor="promo-phone" className="sr-only">No. Telefon</label>
                      <input
                        type="tel"
                        id="promo-phone"
                        placeholder="No. Telefon (cth: 011-3105 1677)"
                        value={formData.phone}
                        onChange={(e) => updateForm({ phone: e.target.value })}
                        required
                        className={inputClasses}
                      />
                    </div>
                    <div>
                      <label htmlFor="promo-car" className="sr-only">Model Kereta</label>
                      <input
                        type="text"
                        id="promo-car"
                        placeholder="Model Kereta (cth: Honda City 2020)"
                        value={formData.vehicleModel}
                        onChange={(e) => updateForm({ vehicleModel: e.target.value })}
                        required
                        className={inputClasses}
                      />
                    </div>
                    <div>
                      <label htmlFor="promo-issues" className="sr-only">Masalah Gearbox</label>
                      <textarea
                        id="promo-issues"
                        placeholder="Masalah gearbox (optional — cth: gearbox slip, bunyi pelik)"
                        value={formData.issues}
                        onChange={(e) => updateForm({ issues: e.target.value })}
                        rows={3}
                        className={`${inputClasses} resize-none`}
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    className="cta-primary w-full text-center mt-4"
                    onClick={handleProceedToBooking}
                    disabled={!canSubmitDetails}
                  >
                    Seterusnya → Pilih Tarikh
                  </button>
                </motion.div>
              )}

              {/* Step 2: Date & Time */}
              {step === 'booking' && (
                <motion.div
                  key="step-booking"
                  ref={bookingRef}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="mb-6">
                    <h2 className="text-h4 text-white tracking-tight font-bold">Pilih Tarikh & Masa</h2>
                    <p className="text-neutral-500 text-body-sm mt-1">Pilih slot yang sesuai untuk anda</p>
                  </div>

                  <div className="flex justify-center bg-neutral-900 border border-neutral-800 p-2 sm:p-6 overflow-hidden">
                    <DayPicker
                      mode="single"
                      selected={formData.date}
                      onSelect={(date) => updateForm({ date: date ?? undefined })}
                      disabled={[{ before: new Date() }, { dayOfWeek: [0] }]}
                      className="!font-sans m-0 w-full"
                      classNames={{
                        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
                        month: 'space-y-4',
                        caption: 'flex justify-center pt-1 relative items-center',
                        caption_label: 'text-sm font-bold text-neutral-200',
                        nav: 'space-x-1 flex items-center',
                        nav_button:
                          'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 transition-opacity text-neutral-400',
                        nav_button_previous: 'absolute left-1',
                        nav_button_next: 'absolute right-1',
                        table: 'w-full border-collapse space-y-1',
                        head_row: 'flex',
                        head_cell: 'text-neutral-500 w-9 font-normal text-[0.8rem]',
                        row: 'flex w-full mt-2',
                        cell: 'text-center text-sm p-0 relative focus-within:relative focus-within:z-20',
                        day: 'h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-neutral-800 transition-colors text-neutral-300',
                        day_selected:
                          'bg-brand-red text-white hover:bg-brand-red-dark hover:text-white focus:bg-brand-red focus:text-white',
                        day_today: 'bg-neutral-800 text-white',
                        day_outside: 'text-neutral-700 opacity-50',
                        day_disabled: 'text-neutral-700 opacity-50',
                        day_hidden: 'invisible',
                      }}
                    />
                  </div>

                  {formData.date && (
                    <div className="grid grid-cols-1 gap-px bg-neutral-800 border border-neutral-800">
                      {TIME_SLOTS.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => updateForm({ timeSlot: slot })}
                          className={`p-4 text-body-sm font-medium transition-all duration-200 flex justify-between items-center group ${
                            formData.timeSlot === slot
                              ? 'bg-brand-red text-white'
                              : 'bg-neutral-950 hover:bg-neutral-900 text-neutral-400'
                          }`}
                        >
                          <span>{slot}</span>
                          <div
                            className={`w-3 h-3 border transition-colors ${
                              formData.timeSlot === slot
                                ? 'border-white bg-white'
                                : 'border-neutral-600 group-hover:border-neutral-500'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-3 mt-4">
                    <button
                      type="button"
                      className="cta-secondary flex-1 text-center"
                      onClick={() => setStep('form')}
                    >
                      ← Kembali
                    </button>
                    <button
                      type="button"
                      className="cta-primary flex-1 text-center"
                      onClick={handleProceedToCheckout}
                      disabled={!canSubmitBooking}
                    >
                      Seterusnya → Checkout
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Checkout */}
              {step === 'checkout' && (
                <motion.div
                  key="step-checkout"
                  ref={checkoutRef}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="mb-6">
                    <h2 className="text-h4 text-white tracking-tight font-bold">Pengesahan & Bayaran</h2>
                    <p className="text-neutral-500 text-body-sm mt-1">Semak butiran dan bayar deposit RM{selectedPkg.deposit}</p>
                  </div>

                  {/* Summary */}
                  <div className="bg-neutral-900 border border-neutral-800 p-6 md:p-8 space-y-4 text-body-sm">
                    {[
                      { label: 'Nama', value: formData.name, bold: true },
                      { label: 'Telefon', value: formData.phone },
                      { label: 'Kereta', value: formData.vehicleModel },
                      { label: 'Pakej', value: `${PACKAGE.name} — RM${PACKAGE.price}` },
                      {
                        label: 'Tarikh',
                        value: formData.date ? format(formData.date, 'PPP') : '-',
                      },
                      { label: 'Masa', value: formData.timeSlot || '-' },
                    ].map(({ label, value, bold }) => (
                      <div
                        key={label}
                        className="flex justify-between items-center pb-4 border-b border-neutral-800"
                      >
                        <span className="text-neutral-500 text-xs uppercase tracking-wider">{label}</span>
                        <span className={bold ? 'font-bold text-white' : 'font-medium text-neutral-200'}>
                          {value}
                        </span>
                      </div>
                    ))}

                    {formData.issues && (
                      <div className="pt-2">
                        <span className="text-neutral-500 text-[0.65rem] uppercase tracking-[0.15em] font-bold block mb-1">
                          Masalah
                        </span>
                        <p className="text-neutral-400 italic">{formData.issues}</p>
                      </div>
                    )}
                  </div>

                  {/* Payment summary */}
                  <div className="bg-brand-red/5 border border-brand-red/20 p-6">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-neutral-400 text-body-sm">Harga Pakej</span>
                      <span className="text-neutral-300">RM{selectedPkg.price}</span>
                    </div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-neutral-400 text-body-sm">Alat OBD2 Scanner</span>
                      <span className="text-brand-red line-through">RM80</span>
                    </div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-neutral-400 text-body-sm">Alat OBD2 (PROMO)</span>
                      <span className="text-emerald-400 font-bold">PERCUMA</span>
                    </div>
                    <div className="border-t border-brand-red/20 pt-3 mt-3 flex justify-between items-center">
                      <span className="text-white font-bold">Deposit Bayar Sekarang</span>
                      <span className="text-white font-bold text-h4">RM{selectedPkg.deposit}</span>
                    </div>
                    <p className="text-neutral-500 text-caption mt-2">
                      Baki RM{selectedPkg.price - selectedPkg.deposit} dibayar di bengkel selepas servis siap.
                    </p>
                  </div>

                  {error && (
                    <div className="p-4 bg-red-900/30 border border-red-800 text-red-300 text-body-sm">
                      {error}
                    </div>
                  )}

                  <div className="flex gap-3">
                    <button
                      type="button"
                      className="cta-secondary flex-1 text-center"
                      onClick={() => setStep('booking')}
                    >
                      ← Kembali
                    </button>
                    <button
                      type="button"
                      className="cta-primary flex-1 text-center"
                      onClick={handleSubmit}
                      disabled={loading}
                    >
                      {loading ? (
                        <span className="inline-flex items-center gap-2">
                          <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Memproses...
                        </span>
                      ) : (
                        `Bayar Deposit RM${selectedPkg.deposit} →`
                      )}
                    </button>
                  </div>

                  {/* WhatsApp fallback */}
                  <div className="text-center pt-4 border-t border-neutral-800">
                    <p className="text-neutral-600 text-caption mb-2">Atau tempah melalui WhatsApp</p>
                    <button onClick={handleWhatsAppFallback} className="cta-ghost text-body-sm">
                      WhatsApp Kami →
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </AnimatedSection>
      </SectionWrapper>

      {/* ─── STICKY CTA ─── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-brand-black/95 backdrop-blur-sm border-t border-neutral-800 p-4 md:hidden">
        <button
          onClick={() => scrollTo('packages')}
          className="w-full bg-brand-red text-white text-center py-4 font-medium text-body tracking-wide active:scale-[0.98] transition-transform"
        >
          Dapatkan Promo Sekarang →
        </button>
      </div>

      {/* Bottom spacer for sticky CTA on mobile */}
      <div className="h-20 md:hidden" />

      {/* ─── FOOTER ─── */}
      <footer className="bg-brand-black border-t border-neutral-800 px-5 md:px-10 py-10">
        <div className="max-w-content mx-auto text-center">
          <Image
            src="/images/logo-white.png"
            alt="One X Transmission"
            width={120}
            height={40}
            className="mx-auto mb-6 opacity-60"
          />
          <p className="text-neutral-600 text-body-sm mb-2">
            One X Transmission — Pakar Gearbox #1 Shah Alam
          </p>
          <p className="text-neutral-700 text-caption">
            40460 Shah Alam, Selangor · +60 11-3105 1677
          </p>
          <div className="flex justify-center gap-6 mt-6">
            <a href={PHONE_TEL} className="text-neutral-500 text-body-sm hover:text-brand-red transition-colors">
              📞 Call
            </a>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="text-neutral-500 text-body-sm hover:text-brand-red transition-colors">
              💬 WhatsApp
            </a>
          </div>
          <p className="text-neutral-800 text-caption mt-8">
            © 2026 One X Transmission. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  )
}
