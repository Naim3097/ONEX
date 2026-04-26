'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { type Locale, getContent, business } from '@/content'
import FadeIn from '@/components/motion/FadeIn'
import RevealText from '@/components/motion/RevealText'
import Text from '@/components/typography/Text'

interface PromoTeaserProps {
  locale: Locale
}

const ROTATE_MS = 7000

interface SlideFeature {
  title: string
  description: string
}

interface Slide {
  key: string
  overline: string
  headline: string
  subheadline: string
  image: { src: string; alt: string; width: number; height: number }
  features: SlideFeature[]
  ctaPrimary: { label: string; href: string; external?: boolean }
  ctaSecondary: { label: string; href: string; external?: boolean }
}

const aidiladhaCopy: Record<Locale, Omit<Slide, 'key' | 'image'>> = {
  en: {
    overline: 'Aidiladha Promo',
    headline: 'AT gearbox service from RM74. Lock your slot with RM50 deposit.',
    subheadline:
      'Home to home service. Labour, auto filter, OBD2 scan included. Lubrimaxx oil charged separately at RM65 per litre based on actual usage.',
    features: [
      { title: 'Service from RM74', description: 'Labour, auto filter and free OBD2 diagnostic scan included.' },
      { title: 'RM50 deposit', description: 'Lock your slot online. Balance settled after the service is done.' },
      { title: 'Home to home', description: 'We come to your house, office or cafe across Klang Valley.' },
    ],
    ctaPrimary: { label: 'Book Aidiladha Slot', href: '/promo' },
    ctaSecondary: { label: 'WhatsApp Us', href: business.whatsappInquiry, external: true },
  },
  ms: {
    overline: 'Promo Aidiladha',
    headline: 'Servis gearbox AT serendah RM74. Lock slot dengan deposit RM50.',
    subheadline:
      'Home to home service. Upah kerja, auto filter dan OBD2 scan termasuk. Minyak Lubrimaxx dicaj berasingan pada RM65 seliter mengikut penggunaan sebenar.',
    features: [
      { title: 'Servis dari RM74', description: 'Upah kerja, auto filter dan free OBD2 scan diagnostik termasuk.' },
      { title: 'Deposit RM50', description: 'Lock slot anda secara online. Baki bayar selepas servis siap.' },
      { title: 'Home to home', description: 'Kami datang ke rumah, pejabat atau cafe di sekitar Lembah Klang.' },
    ],
    ctaPrimary: { label: 'Book Slot Aidiladha', href: '/promo' },
    ctaSecondary: { label: 'WhatsApp Kami', href: business.whatsappInquiry, external: true },
  },
  zh: {
    overline: 'Aidiladha 优惠',
    headline: 'AT 变速箱保养 RM74 起。RM50 定金锁定时段。',
    subheadline:
      '上门服务。包含人工、自动滤芯及 OBD2 诊断扫描。Lubrimaxx 油按 RM65 每升根据实际使用量另计。',
    features: [
      { title: 'RM74 起', description: '包含人工、自动滤芯及免费 OBD2 诊断扫描。' },
      { title: 'RM50 定金', description: '在线锁定时段。服务完成后再付余款。' },
      { title: '上门服务', description: '我们到您的住家、办公室或咖啡厅，覆盖巴生谷地区。' },
    ],
    ctaPrimary: { label: '预约 Aidiladha 时段', href: '/promo' },
    ctaSecondary: { label: 'WhatsApp 联系', href: business.whatsappInquiry, external: true },
  },
}

const bykiAppCopy = (locale: Locale): Record<Locale, Omit<Slide, 'key' | 'image'>>[Locale] => ({
  en: {
    overline: 'BYKI App + OBD2',
    headline: 'Track your car health from your phone with the BYKI App.',
    subheadline:
      'Free OBD2 diagnostic device when you choose our BYKI Package. Pair it with the BYKI App and monitor fault codes, gearbox temperature and trip data anytime.',
    features: [
      { title: 'Free OBD2 device', description: 'Bundled with our BYKI service package. Plug and pair in minutes.' },
      { title: 'Live diagnostics', description: 'Read fault codes, transmission health and live engine data on your phone.' },
      { title: 'Built by One X', description: 'Designed in-house for our customers. Work directly with our team for support.' },
    ],
    ctaPrimary: { label: 'Explore BYKI Package', href: `/${locale}/packages` },
    ctaSecondary: { label: 'WhatsApp Us', href: business.whatsappInquiry, external: true },
  },
  ms: {
    overline: 'Aplikasi BYKI + OBD2',
    headline: 'Pantau kesihatan kereta dari telefon dengan Aplikasi BYKI.',
    subheadline:
      'Peranti diagnostik OBD2 percuma dengan Pakej BYKI kami. Pair dengan Aplikasi BYKI dan pantau fault code, suhu gearbox dan data perjalanan bila bila masa.',
    features: [
      { title: 'OBD2 percuma', description: 'Termasuk dalam pakej servis BYKI. Plug dan pair dalam beberapa minit.' },
      { title: 'Diagnostik live', description: 'Baca fault code, status gearbox dan data enjin live di telefon anda.' },
      { title: 'Dibina oleh One X', description: 'Direka sendiri untuk pelanggan kami. Sokongan terus dari team kami.' },
    ],
    ctaPrimary: { label: 'Lihat Pakej BYKI', href: `/${locale}/packages` },
    ctaSecondary: { label: 'WhatsApp Kami', href: business.whatsappInquiry, external: true },
  },
  zh: {
    overline: 'BYKI 应用 + OBD2',
    headline: '通过 BYKI 应用从手机追踪您的车况。',
    subheadline:
      '选择我们的 BYKI 套餐，即免费获得 OBD2 诊断设备。配合 BYKI 应用，随时监控故障代码、变速箱温度和行程数据。',
    features: [
      { title: '免费 OBD2', description: '随 BYKI 服务套餐附送。即插即用，几分钟完成配对。' },
      { title: '实时诊断', description: '在手机上读取故障代码、变速箱状态及实时引擎数据。' },
      { title: 'One X 出品', description: '我们团队自家设计，售后支持直接由我们提供。' },
    ],
    ctaPrimary: { label: '查看 BYKI 套餐', href: `/${locale}/packages` },
    ctaSecondary: { label: 'WhatsApp 联系', href: business.whatsappInquiry, external: true },
  },
}[locale])

export default function PromoTeaser({ locale }: PromoTeaserProps) {
  const { promo } = getContent(locale)

  const slides: Slide[] = [
    {
      key: 'byki',
      overline: promo.overline,
      headline: promo.headline,
      subheadline: promo.subheadline,
      image: {
        src: '/images/asset promotion/PROMO 1 B.jpg',
        alt: 'Pakej Servis Gearbox BYKI',
        width: 400,
        height: 500,
      },
      features: promo.landing.included.map((item) => ({
        title: item.title,
        description: item.description,
      })),
      ctaPrimary: { label: promo.ctaPrimary, href: `/${locale}/packages` },
      ctaSecondary: { label: promo.ctaSecondary, href: business.whatsappInquiry, external: true },
    },
    {
      key: 'aidiladha',
      ...aidiladhaCopy[locale],
      image: {
        src: '/images/asset promotion/home-to-home.jpeg',
        alt: 'Promo Aidiladha home to home service',
        width: 1080,
        height: 1080,
      },
    },
    {
      key: 'byki-app',
      ...bykiAppCopy(locale),
      image: {
        src: '/images/asset promotion/obd2.png',
        alt: 'BYKI App with OBD2 device',
        width: 800,
        height: 1000,
      },
    },
  ]

  const [activeIndex, setActiveIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  useEffect(() => {
    if (paused) {
      clearTimer()
      return
    }
    clearTimer()
    intervalRef.current = setInterval(() => {
      setActiveIndex((i) => (i + 1) % slides.length)
    }, ROTATE_MS)
    return clearTimer
  }, [paused, slides.length, clearTimer])

  const slide = slides[activeIndex]

  const goTo = useCallback((i: number) => {
    setActiveIndex(((i % slides.length) + slides.length) % slides.length)
  }, [slides.length])
  const goPrev = useCallback(() => goTo(activeIndex - 1), [goTo, activeIndex])
  const goNext = useCallback(() => goTo(activeIndex + 1), [goTo, activeIndex])

  // Touch swipe support
  const touchStartX = useRef<number | null>(null)
  const touchDeltaX = useRef(0)
  const onTouchStartCapture = (e: React.TouchEvent) => {
    setPaused(true)
    touchStartX.current = e.touches[0].clientX
    touchDeltaX.current = 0
  }
  const onTouchMoveCapture = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current
  }
  const onTouchEndCapture = () => {
    const threshold = 40
    if (touchDeltaX.current > threshold) goPrev()
    else if (touchDeltaX.current < -threshold) goNext()
    touchStartX.current = null
    touchDeltaX.current = 0
    // resume on next tick
    setTimeout(() => setPaused(false), 100)
  }

  const pauseHandlers = {
    onMouseEnter: () => setPaused(true),
    onMouseLeave: () => setPaused(false),
    onFocus: () => setPaused(true),
    onBlur: () => setPaused(false),
  }

  const labels = {
    en: { prev: 'Previous promo', next: 'Next promo', go: 'Go to promo' },
    ms: { prev: 'Promo sebelum', next: 'Promo seterusnya', go: 'Pergi ke promo' },
    zh: { prev: '上一个优惠', next: '下一个优惠', go: '前往优惠' },
  }[locale]

  return (
    <section
      className="bg-white section-padding"
      aria-roledescription="carousel"
      aria-label="Promo banner"
      {...pauseHandlers}
    >
      <div className="max-w-wide mx-auto px-5 md:px-10">
        {/* Header */}
        <div className="max-w-2xl mb-14 md:mb-20" key={`head-${slide.key}`}>
          <FadeIn>
            <Text variant="overline" className="text-brand-red mb-5">
              {slide.overline}
            </Text>
          </FadeIn>
          <RevealText
            text={slide.headline}
            as="h2"
            className="text-h2 text-neutral-950 mb-5"
          />
          <FadeIn delay={0.2}>
            <p className="text-body-lg text-neutral-500 leading-relaxed max-w-lg">
              {slide.subheadline}
            </p>
          </FadeIn>
        </div>

        {/* Slide card */}
        <FadeIn delay={0.3}>
          <div
            className="relative border border-neutral-200 bg-neutral-50 transition-opacity duration-500 select-none"
            aria-roledescription="slide"
            aria-label={`${activeIndex + 1} / ${slides.length}: ${slide.overline}`}
            key={`card-${slide.key}`}
            onTouchStart={onTouchStartCapture}
            onTouchMove={onTouchMoveCapture}
            onTouchEnd={onTouchEndCapture}
            onTouchCancel={onTouchEndCapture}
          >
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] items-stretch">
              {/* Promo image — top on mobile, right on desktop */}
              <div className="order-first lg:order-last border-b lg:border-b-0 lg:border-l border-neutral-200 flex items-center justify-center min-h-[200px] lg:min-w-[280px] overflow-hidden bg-neutral-100">
                <Image
                  src={slide.image.src}
                  alt={slide.image.alt}
                  width={slide.image.width}
                  height={slide.image.height}
                  className="w-full h-full object-cover"
                  sizes="(max-width: 1024px) 100vw, 320px"
                  priority={activeIndex === 0}
                />
              </div>

              {/* Body */}
              <div className="order-last lg:order-first p-8 md:p-10 lg:p-12">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                  {slide.features.map((item, i) => (
                    <div key={item.title}>
                      <Text variant="overline" className="text-brand-red/80 mb-3">
                        {String(i + 1).padStart(2, '0')}
                      </Text>
                      <h3 className="text-h4 text-neutral-950 mb-2">{item.title}</h3>
                      <p className="text-body-sm text-neutral-500 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-10 pt-8 border-t border-neutral-200 flex flex-col sm:flex-row items-start sm:items-center gap-5">
                  {slide.ctaPrimary.external ? (
                    <a
                      href={slide.ctaPrimary.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cta-primary"
                    >
                      {slide.ctaPrimary.label}
                    </a>
                  ) : (
                    <Link href={slide.ctaPrimary.href} className="cta-primary">
                      {slide.ctaPrimary.label}
                    </Link>
                  )}
                  {slide.ctaSecondary.external ? (
                    <a
                      href={slide.ctaSecondary.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cta-ghost"
                    >
                      {slide.ctaSecondary.label}
                    </a>
                  ) : (
                    <Link href={slide.ctaSecondary.href} className="cta-ghost">
                      {slide.ctaSecondary.label}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Carousel controls */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Prev / Next buttons */}
          <div className="flex items-center gap-3 order-2 sm:order-1">
            <button
              type="button"
              onClick={goPrev}
              aria-label={labels.prev}
              className="group flex items-center justify-center w-12 h-12 md:w-14 md:h-14 border border-neutral-300 bg-white text-neutral-900 transition-colors hover:bg-brand-red hover:text-white hover:border-brand-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" aria-hidden="true">
                <path d="M15 18 9 12l6-6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label={labels.next}
              className="group flex items-center justify-center w-12 h-12 md:w-14 md:h-14 border border-neutral-300 bg-white text-neutral-900 transition-colors hover:bg-brand-red hover:text-white hover:border-brand-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" aria-hidden="true">
                <path d="m9 6 6 6-6 6" />
              </svg>
            </button>
            <span className="ml-2 text-overline tracking-widest text-neutral-500 font-medium">
              {String(activeIndex + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
            </span>
          </div>

          {/* Indicator dots */}
          <div className="flex items-center gap-3 order-1 sm:order-2" role="tablist" aria-label="Promo selector">
            {slides.map((s, i) => {
              const active = i === activeIndex
              return (
                <button
                  key={s.key}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  aria-label={`${labels.go}: ${s.overline}`}
                  onClick={() => goTo(i)}
                  className={`h-1.5 transition-all duration-300 ${
                    active ? 'w-12 bg-brand-red' : 'w-6 bg-neutral-300 hover:bg-neutral-400'
                  }`}
                />
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

