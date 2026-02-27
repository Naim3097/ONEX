'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { business, getContent, type Locale } from '@/content'

interface HeaderProps {
  locale: Locale
}

export default function Header({ locale }: HeaderProps) {
  const content = getContent(locale)
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 40)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const navLinks = [
    { href: `/${locale}`, label: content.nav.home },
    { href: `/${locale}/about`, label: content.nav.about },
    { href: `/${locale}/capabilities`, label: content.nav.capabilities },
    { href: `/${locale}/process`, label: content.nav.process },
    { href: `/${locale}/faq`, label: content.nav.faq },
    { href: `/${locale}/contact`, label: content.nav.contact },
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
          <Link href={`/${locale}`} className="relative z-10 flex items-center gap-3">
            <Image
              src={business.logo.white}
              alt={business.name}
              width={140}
              height={32}
              className="h-6 md:h-7 w-auto"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Primary navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-body-sm text-neutral-300 hover:text-white transition-colors duration-200 font-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA + Locale Switcher */}
          <div className="hidden lg:flex items-center gap-5">
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
                  >
                    {l}
                  </Link>
                </span>
              ))}
            </div>
            <Link href={business.whatsappLink} target="_blank" rel="noopener noreferrer" className="cta-primary">
              {content.nav.cta}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden relative z-10 w-10 h-10 flex flex-col items-center justify-center gap-1.5"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            <span
              className={`w-6 h-px bg-white transition-all duration-300 ${
                mobileOpen ? 'rotate-45 translate-y-[3.5px]' : ''
              }`}
            />
            <span
              className={`w-6 h-px bg-white transition-all duration-300 ${
                mobileOpen ? '-rotate-45 -translate-y-[3.5px]' : ''
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-neutral-950 flex flex-col justify-center px-8"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0, 0.4, 0, 1] }}
          >
            <nav className="flex flex-col gap-6" aria-label="Mobile navigation">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={shouldReduceMotion ? {} : { opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.4, ease: [0, 0.4, 0, 1] }}
                >
                  <Link
                    href={link.href}
                    className="text-h3 text-white hover:text-brand-red transition-colors duration-200"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              className="mt-12 flex flex-col gap-4"
              initial={shouldReduceMotion ? {} : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              <Link
                href={business.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-primary text-center"
                onClick={() => setMobileOpen(false)}
              >
                {content.nav.cta}
              </Link>

              <div className="flex items-center justify-center gap-3 mt-4 text-caption text-neutral-500">
                {(['en', 'ms', 'zh'] as Locale[]).map((l, i) => (
                  <span key={l} className="flex items-center">
                    {i > 0 && <span className="mx-1">/</span>}
                    <Link
                      href={`/${l}`}
                      className={`uppercase transition-colors ${
                        l === locale ? 'text-white font-medium' : 'hover:text-neutral-300'
                      }`}
                      onClick={() => setMobileOpen(false)}
                    >
                      {l}
                    </Link>
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
