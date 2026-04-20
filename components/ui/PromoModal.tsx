'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { type Locale, getContent } from '@/content'

const STORAGE_KEY = 'onex_promo_dismissed'
const SHOW_DELAY = 3000
const COOLDOWN_DAYS = 3

interface PromoModalProps {
  locale: Locale
}

export default function PromoModal({ locale }: PromoModalProps) {
  const [open, setOpen] = useState(false)
  const { promo } = getContent(locale)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const ts = parseInt(raw, 10)
        if (!isNaN(ts)) {
          const daysPassed = (Date.now() - ts) / (1000 * 60 * 60 * 24)
          if (daysPassed < COOLDOWN_DAYS) return
        }
      }
    } catch { /* localStorage unavailable */ }

    const timer = setTimeout(() => setOpen(true), SHOW_DELAY)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === 'Escape' && open) dismiss()
    }
    document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [open])

  function dismiss() {
    setOpen(false)
    try { localStorage.setItem(STORAGE_KEY, String(Date.now())) } catch { /* */ }
  }

  const items = promo.landing.included

  return (
    <div
      className={`fixed inset-0 z-[99999] flex items-center justify-center p-3 md:p-4 transition-all duration-667 ease-ease-out-custom ${
        open
          ? 'bg-black/85 opacity-100 visible'
          : 'bg-transparent opacity-0 invisible'
      }`}
      onClick={(e) => { if (e.target === e.currentTarget) dismiss() }}
    >
      <div
        role="dialog"
        aria-modal="true"
        className={`relative w-full max-w-[360px] md:max-w-[820px] max-h-[90vh] overflow-y-auto rounded-xl md:rounded-none bg-neutral-950 border border-white/5 overflow-hidden transition-all duration-667 ease-ease-out-custom ${
          open
            ? 'translate-y-0 opacity-100'
            : 'translate-y-6 opacity-0'
        }`}
      >
        {/* Close */}
        <button
          onClick={dismiss}
          aria-label="Tutup"
          className="absolute top-2 right-2 md:top-4 md:right-4 z-10 w-8 h-8 md:w-10 md:h-10 border border-white/10 bg-black/60 text-neutral-400 text-sm md:text-lg flex items-center justify-center transition-all duration-334 ease-ease-out-custom hover:border-brand-red hover:text-white"
        >
          &times;
        </button>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr]">
          {/* Left — Image */}
          <div className="relative h-[140px] md:h-auto md:aspect-auto overflow-hidden bg-black">
            <Image
              src="/images/asset promotion/PROMO 1 B.jpg"
              alt="Pakej Servis ATF Gearbox RM439"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 410px"
              priority
            />
          </div>

          {/* Right — Content */}
          <div className="px-3 py-3 md:p-8 flex flex-col justify-center">
            {/* Overline */}
            <span className="overline-label text-[11px] md:text-[13px]">{promo.overline}</span>

            {/* Divider */}
            <div className="divider mt-1.5 mb-2 md:mt-3 md:mb-4" />

            {/* Pricing */}
            <div className="flex items-baseline gap-2 mb-0.5">
              <span className="text-[1.25rem] md:text-h3 text-white tracking-tight">RM 439</span>
              <span className="text-[0.8rem] text-neutral-600 line-through">RM 580</span>
            </div>

            {/* Title */}
            <h2 className="text-[0.875rem] md:text-body-lg text-neutral-300 mb-2 md:mb-5">{promo.headline}</h2>

            {/* What's Included — gap-px trick */}
            <div className="flex flex-col gap-px bg-white/5 mb-3 md:mb-6">
              {items.map((item, i) => (
                <div key={i} className="bg-neutral-950 px-3 py-1.5 md:py-2 flex items-center justify-between gap-2">
                  <span className="text-[0.8rem] md:text-[0.92rem] text-neutral-300">{item.title}</span>
                  {i === items.length - 1 && (
                    <span className="text-[9px] font-bold uppercase tracking-wider text-brand-red bg-brand-red/10 px-2 py-0.5">
                      Percuma
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* CTA */}
            <Link
              href={`/${locale}/packages`}
              onClick={dismiss}
              className="cta-primary block w-full text-center text-[0.875rem] md:text-[1rem] py-2.5 md:py-4"
            >
              {promo.ctaSecondary}
            </Link>

            {/* Footer */}
            <div className="flex justify-between mt-3 pt-3 md:mt-5 md:pt-5 border-t border-white/5 gap-2">
              <div className="flex flex-col gap-0">
                <span className="text-[9px] md:text-[11px] text-neutral-600 uppercase tracking-wider font-medium">Deposit</span>
                <span className="text-[0.8rem] md:text-[0.92rem] text-neutral-200 font-medium">RM 50</span>
              </div>
              <div className="flex flex-col gap-0">
                <span className="text-[9px] md:text-[11px] text-neutral-600 uppercase tracking-wider font-medium">Jimat</span>
                <span className="text-[0.8rem] md:text-[0.92rem] text-neutral-200 font-medium">RM 141</span>
              </div>
              <div className="flex flex-col gap-0">
                <span className="text-[9px] md:text-[11px] text-neutral-600 uppercase tracking-wider font-medium">Terhad</span>
                <span className="text-[0.8rem] md:text-[0.92rem] text-brand-red font-medium">100 unit sahaja</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
