'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { business, getContent, type Locale } from '@/content'
import { useCart } from '@/lib/cart-context'

interface HeaderProps {
  locale: Locale
}

export default function Header({ locale }: HeaderProps) {
  const content = getContent(locale)
  const packagesLabel = {
    en: 'Aidiladha Promo',
    ms: 'Promo Aidiladha',
    zh: 'Aidiladha 优惠',
  }[locale]
  const bykiPackageLabel = {
    en: 'BYKI Package',
    ms: 'Pakej BYKI',
    zh: 'BYKI 套餐',
  }[locale]
  const { totalItems } = useCart()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const shouldReduceMotion = useReducedMotion()

  const openMenu = useCallback(() => {
    if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null }
    setMenuOpen(true)
  }, [])

  const scheduleClose = useCallback(() => {
    closeTimer.current = setTimeout(() => setMenuOpen(false), 300)
  }, [])

  const cancelClose = useCallback(() => {
    if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null }
  }, [])

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 40)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const navCategories = [
    {
      title: 'Navigate',
      links: [
        { href: `/${locale}`, label: content.nav.home },
        { href: `/${locale}/about`, label: content.nav.about },
        { href: `/${locale}/process`, label: content.nav.process },
      ],
    },
    {
      title: 'Services',
      links: [
        { href: `/${locale}/capabilities`, label: content.nav.capabilities },
        { href: `/promo`, label: packagesLabel, badge: content.promo.badge },
        { href: `/${locale}/packages`, label: bykiPackageLabel },
        { href: `/${locale}/shop`, label: content.shop.nav },
        { href: `/${locale}/booking`, label: 'Door-to-Door' },
      ],
    },
    {
      title: 'Branches',
      links: [
        { href: `/${locale}/locations/kulim`, label: 'Kulim, Kedah', badge: 'New' },
        { href: null, label: 'Pahang', comingSoon: true },
        { href: null, label: 'Johor', comingSoon: true },
      ],
    },
    {
      title: 'Support',
      links: [
        { href: `/${locale}/faq`, label: content.nav.faq },
        { href: `/${locale}/blog`, label: content.nav.blog },
        { href: `/${locale}/contact`, label: content.nav.contact },
      ],
    },
  ]

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-334 ease-ease-out-custom ${
          scrolled
            ? 'bg-neutral-950/95 backdrop-blur-md border-b border-white/5'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-wide mx-auto px-5 md:px-10 flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href={`/${locale}`} className="relative z-[60] flex items-center gap-3">
            <Image
              src={business.logo.white}
              alt={business.name}
              width={140}
              height={32}
              className="h-6 md:h-7 w-auto"
              priority
            />
          </Link>

          {/* Right — Shop + Cart + CTA + Burger */}
          <div className="flex items-center gap-0.5 sm:gap-2 relative z-[60]">
            {/* Shop icon */}
            <Link
              href={`/${locale}/shop`}
              className={`relative w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-neutral-300 hover:text-white transition-all duration-200 ${menuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
              aria-label="Shop"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
            </Link>

            {/* Cart icon */}
            <Link
              href={`/${locale}/shop/cart`}
              className={`relative w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-neutral-300 hover:text-white transition-all duration-200 ${menuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
              aria-label="Cart"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 bg-brand-red text-white text-[8px] sm:text-[9px] font-bold min-w-3.5 h-3.5 sm:min-w-4 sm:h-4 flex items-center justify-center leading-none rounded-full px-0.5">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* WhatsApp CTA — hidden when menu open */}
            <Link
              href={business.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`cta-primary hidden sm:inline-flex transition-opacity duration-200 ${menuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            >
              {content.nav.cta}
            </Link>

            {/* Burger */}
            <button
              className="w-8 h-8 sm:w-10 sm:h-10 flex flex-col items-center justify-center gap-1.5"
              onMouseEnter={openMenu}
              onMouseLeave={scheduleClose}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <span
                className={`w-6 h-px bg-white transition-all duration-300 ${
                  menuOpen ? 'rotate-45 translate-y-[3.5px]' : ''
                }`}
              />
              <span
                className={`w-6 h-px bg-white transition-all duration-300 ${
                  menuOpen ? '-rotate-45 -translate-y-[3.5px]' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-neutral-950 overflow-y-auto"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0, 0.4, 0, 1] }}
            onMouseEnter={cancelClose}
            onMouseLeave={scheduleClose}
          >
            <div className="min-h-full flex flex-col justify-center max-w-wide mx-auto px-8 md:px-10 py-24 md:py-28">
              {/* Categorized nav grid */}
              <nav
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8"
                aria-label="Site navigation"
              >
                {navCategories.map((category, catIdx) => (
                  <motion.div
                    key={category.title}
                    initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + catIdx * 0.07, duration: 0.5, ease: [0, 0.4, 0, 1] }}
                  >
                    <p className="text-overline uppercase tracking-widest font-medium text-neutral-500 mb-6">
                      {category.title}
                    </p>
                    <ul className="space-y-4">
                      {category.links.map((link) => (
                        <li key={link.label}>
                          {'comingSoon' in link && link.comingSoon ? (
                            <span className="flex items-center gap-3 text-h4 text-neutral-600 cursor-not-allowed">
                              {link.label}
                              <span className="text-[10px] font-medium text-neutral-500 border border-neutral-700 px-1.5 py-0.5 rounded-sm">
                                Soon
                              </span>
                            </span>
                          ) : (
                            <Link
                              href={link.href!}
                              className="text-h4 text-neutral-200 hover:text-white transition-colors duration-200 inline-flex items-center gap-3"
                              onClick={() => setMenuOpen(false)}
                            >
                              {link.label}
                              {'badge' in link && link.badge && (
                                <span className="text-[10px] font-semibold bg-brand-red text-white px-1.5 py-0.5 rounded-sm leading-none">
                                  {link.badge}
                                </span>
                              )}
                            </Link>
                          )}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </nav>

              {/* Bottom bar */}
              <motion.div
                className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
                initial={shouldReduceMotion ? {} : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.4 }}
              >
                {/* CTA */}
                <Link
                  href={business.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-primary"
                  onClick={() => setMenuOpen(false)}
                >
                  {content.nav.cta}
                </Link>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  {/* Business info */}
                  <div className="flex items-center gap-4 text-body-sm text-neutral-500">
                    <span>Mon–Fri: {business.hours.weekdays}</span>
                    <span className="text-neutral-700">|</span>
                    <span>Sat: {business.hours.saturday}</span>
                  </div>

                  {/* Locale switcher */}
                  <div className="flex items-center gap-1 text-caption text-neutral-500">
                    {(['en', 'ms', 'zh'] as Locale[]).map((l, i) => (
                      <span key={l} className="flex items-center">
                        {i > 0 && <span className="mx-1">/</span>}
                        <Link
                          href={`/${l}`}
                          className={`uppercase transition-colors duration-200 ${
                            l === locale ? 'text-white font-medium' : 'hover:text-neutral-300'
                          }`}
                          onClick={() => setMenuOpen(false)}
                        >
                          {l}
                        </Link>
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

