'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
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
  const [mobileMoreOpen, setMobileMoreOpen] = useState(false)
  const [mobileBranchesOpen, setMobileBranchesOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [branchesOpen, setBranchesOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const branchesRef = useRef<HTMLDivElement>(null)
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

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
      if (branchesRef.current && !branchesRef.current.contains(e.target as Node)) {
        setBranchesOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const primaryLinks = [
    { href: `/${locale}`, label: content.nav.home },
    { href: `/${locale}/capabilities`, label: content.nav.capabilities },
    { href: `/${locale}/process`, label: content.nav.process },
    { href: `/${locale}/contact`, label: content.nav.contact },
  ]

  const branchLinks = [
    { href: `/${locale}/locations/kulim`, label: 'Kulim, Kedah', badge: 'New', comingSoon: false },
    { href: null, label: 'Pahang', badge: null, comingSoon: true },
    { href: null, label: 'Johor', badge: null, comingSoon: true },
  ]

  const moreLinks = [
    { href: `/${locale}/about`, label: content.nav.about },
    { href: `/${locale}/faq`, label: content.nav.faq },
    { href: `/${locale}/blog`, label: content.nav.blog },
  ]

  // All links flattened for mobile
  const allMobileLinks = [
    { href: `/${locale}`, label: content.nav.home },
    { href: `/${locale}/capabilities`, label: content.nav.capabilities },
    { href: `/${locale}/process`, label: content.nav.process },
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
            {primaryLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-body-sm text-neutral-300 hover:text-white transition-colors duration-200 font-medium inline-flex items-center gap-1.5"
              >
                {link.label}
              </Link>
            ))}

            {/* Branches dropdown */}
            <div
              ref={branchesRef}
              className="relative"
              onMouseEnter={() => setBranchesOpen(true)}
              onMouseLeave={() => setBranchesOpen(false)}
            >
              <button
                onClick={() => setBranchesOpen((v) => !v)}
                className="inline-flex items-center gap-1.5 text-body-sm text-neutral-300 hover:text-white transition-colors duration-200 font-medium"
                aria-expanded={branchesOpen}
              >
                Branches
                <span className="text-[10px] font-semibold bg-brand-red text-white px-1.5 py-0.5 rounded-sm leading-none">New</span>
                <svg
                  className={`w-3 h-3 transition-transform duration-200 ${branchesOpen ? 'rotate-180' : ''}`}
                  viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"
                >
                  <path d="M2 4l4 4 4-4" />
                </svg>
              </button>

              <AnimatePresence>
                {branchesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.15, ease: 'easeOut' }}
                    className="absolute top-full left-0 mt-2 w-52 bg-neutral-950 border border-white/10 shadow-xl py-1"
                  >
                    <p className="px-5 pt-3 pb-2 text-[10px] font-semibold text-neutral-500 uppercase tracking-widest">
                      Our Locations
                    </p>
                    {branchLinks.map((branch) =>
                      branch.comingSoon ? (
                        <div
                          key={branch.label}
                          className="flex items-center justify-between px-5 py-3 text-body-sm text-neutral-600 cursor-not-allowed"
                        >
                          <span>{branch.label}</span>
                          <span className="text-[10px] font-medium text-neutral-500 border border-neutral-700 px-1.5 py-0.5 rounded-sm">
                            Soon
                          </span>
                        </div>
                      ) : (
                        <Link
                          key={branch.label}
                          href={branch.href!}
                          onClick={() => setBranchesOpen(false)}
                          className="flex items-center justify-between px-5 py-3 text-body-sm text-neutral-300 hover:text-white hover:bg-white/5 transition-colors duration-150"
                        >
                          <span>{branch.label}</span>
                          {branch.badge && (
                            <span className="text-[10px] font-semibold bg-brand-red text-white px-1.5 py-0.5 rounded-sm leading-none">
                              {branch.badge}
                            </span>
                          )}
                        </Link>
                      )
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* More dropdown */}
            <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button
                onClick={() => setDropdownOpen((v) => !v)}
                className="inline-flex items-center gap-1.5 text-body-sm text-neutral-300 hover:text-white transition-colors duration-200 font-medium"
                aria-expanded={dropdownOpen}
              >
                More
                <svg
                  className={`w-3 h-3 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
                  viewBox="0 0 12 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M2 4l4 4 4-4" />
                </svg>
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.15, ease: 'easeOut' }}
                    className="absolute top-full right-0 mt-2 w-44 bg-neutral-950 border border-white/10 shadow-xl py-1"
                  >
                    {moreLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setDropdownOpen(false)}
                        className="block px-5 py-3 text-body-sm text-neutral-300 hover:text-white hover:bg-white/5 transition-colors duration-150"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
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
              {allMobileLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={shouldReduceMotion ? {} : { opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.4, ease: [0, 0.4, 0, 1] }}
                >
                  <Link
                    href={link.href}
                    className="text-h3 text-white hover:text-brand-red transition-colors duration-200 inline-flex items-center gap-3"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                    {'badge' in link && link.badge && (
                      <span className="text-xs font-semibold bg-brand-red text-white px-2 py-0.5 rounded-sm leading-none">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                </motion.div>
              ))}

              {/* Branches section — expandable */}
              <motion.div
                initial={shouldReduceMotion ? {} : { opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + allMobileLinks.length * 0.05, duration: 0.4, ease: [0, 0.4, 0, 1] }}
              >
                <button
                  onClick={() => setMobileBranchesOpen((v) => !v)}
                  className="text-h3 text-white hover:text-brand-red transition-colors duration-200 inline-flex items-center gap-3"
                >
                  Branches
                  <span className="text-xs font-semibold bg-brand-red text-white px-2 py-0.5 rounded-sm leading-none">New</span>
                  <svg
                    className={`w-5 h-5 transition-transform duration-200 ${mobileBranchesOpen ? 'rotate-180' : ''}`}
                    viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"
                  >
                    <path d="M2 4l4 4 4-4" />
                  </svg>
                </button>
                <AnimatePresence>
                  {mobileBranchesOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      className="overflow-hidden"
                    >
                      <div className="flex flex-col gap-4 pl-4 pt-4 border-l border-white/10 mt-3">
                        {branchLinks.map((branch) =>
                          branch.comingSoon ? (
                            <div key={branch.label} className="flex items-center gap-3 text-xl text-neutral-600 cursor-not-allowed">
                              {branch.label}
                              <span className="text-xs font-medium text-neutral-500 border border-neutral-700 px-1.5 py-0.5 rounded-sm">
                                Soon
                              </span>
                            </div>
                          ) : (
                            <Link
                              key={branch.label}
                              href={branch.href!}
                              className="flex items-center gap-3 text-xl text-neutral-300 hover:text-white transition-colors duration-200"
                              onClick={() => { setMobileOpen(false); setMobileBranchesOpen(false) }}
                            >
                              {branch.label}
                              {branch.badge && (
                                <span className="text-xs font-semibold bg-brand-red text-white px-2 py-0.5 rounded-sm leading-none">
                                  {branch.badge}
                                </span>
                              )}
                            </Link>
                          )
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* More section — expandable */}
              <motion.div
                initial={shouldReduceMotion ? {} : { opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + (allMobileLinks.length + 1) * 0.05, duration: 0.4, ease: [0, 0.4, 0, 1] }}
              >
                <button
                  onClick={() => setMobileMoreOpen((v) => !v)}
                  className="text-h3 text-white hover:text-brand-red transition-colors duration-200 inline-flex items-center gap-3"
                >
                  More
                  <svg
                    className={`w-5 h-5 transition-transform duration-200 ${mobileMoreOpen ? 'rotate-180' : ''}`}
                    viewBox="0 0 12 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M2 4l4 4 4-4" />
                  </svg>
                </button>
                <AnimatePresence>
                  {mobileMoreOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      className="overflow-hidden"
                    >
                      <div className="flex flex-col gap-4 pl-4 pt-4 border-l border-white/10 mt-3">
                        {moreLinks.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            className="text-xl text-neutral-300 hover:text-white transition-colors duration-200"
                            onClick={() => { setMobileOpen(false); setMobileMoreOpen(false) }}
                          >
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
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

