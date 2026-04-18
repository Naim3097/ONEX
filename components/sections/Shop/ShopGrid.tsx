'use client'

import { useState } from 'react'
import Link from 'next/link'
import { products, type Product } from '@/lib/products'
import { getContent, type Locale } from '@/content'
import { useCart } from '@/lib/cart-context'
import ShopProductCard from './ShopProductCard'
import FadeIn from '@/components/motion/FadeIn'

interface ShopGridProps {
  locale: Locale
}

type CategoryFilter = 'all' | 'service' | 'device'

export default function ShopGrid({ locale }: ShopGridProps) {
  const content = getContent(locale)
  const shop = content.shop
  const { totalItems } = useCart()
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all')

  const categories: { key: CategoryFilter; label: string }[] = [
    { key: 'all', label: shop.categories.all },
    { key: 'service', label: shop.categories.service },
    { key: 'device', label: shop.categories.device },
  ]

  const filtered = products.filter(
    (p) => (p.inStock || p.comingSoon) && (activeCategory === 'all' || p.category === activeCategory)
  )

  return (
    <div>
      {/* Toolbar: categories + cart link */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        {/* Category tabs */}
        <div className="flex gap-1">
          {categories.map((cat) => {
            const count =
              cat.key === 'all'
                ? products.filter((p) => p.inStock || p.comingSoon).length
                : products.filter((p) => (p.inStock || p.comingSoon) && p.category === cat.key).length
            return (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`text-xs font-bold uppercase tracking-wider px-4 py-2.5 transition-all duration-200 ${
                  activeCategory === cat.key
                    ? 'bg-white text-neutral-950'
                    : 'bg-neutral-900 text-neutral-500 hover:text-neutral-300 border border-neutral-800'
                }`}
              >
                {cat.label}
                <span className={`ml-1.5 ${activeCategory === cat.key ? 'text-neutral-600' : 'text-neutral-700'}`}>
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        {/* Cart shortcut */}
        <Link
          href={`/${locale}/shop/cart`}
          className="inline-flex items-center gap-2 text-body-sm text-neutral-500 hover:text-white transition-colors group"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
          <span>{shop.cart.title}</span>
          {totalItems > 0 && (
            <span className="bg-brand-red text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Link>
      </div>

      {/* Results count */}
      <p className="text-body-sm text-neutral-600 mb-6">
        {filtered.length} {shop.items}
      </p>

      {/* Product grid — 3 columns for marketplace feel */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((product, i) => (
          <FadeIn key={product.slug} delay={i * 0.08}>
            <ShopProductCard product={product} locale={locale} />
          </FadeIn>
        ))}
      </div>
    </div>
  )
}
