'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/lib/cart-context'
import { getProductName, getProduct } from '@/lib/products'
import { type Locale } from '@/content'

export default function CartToast({ locale }: { locale: Locale }) {
  const { lastAdded, totalItems } = useCart()
  const [visible, setVisible] = useState(false)
  const [productName, setProductName] = useState('')

  useEffect(() => {
    if (lastAdded) {
      const product = getProduct(lastAdded)
      setProductName(product ? getProductName(product, locale) : '')
      setVisible(true)
      const timer = setTimeout(() => setVisible(false), 2200)
      return () => clearTimeout(timer)
    }
  }, [lastAdded, locale])

  if (!visible || !productName) return null

  return (
    <div
      className="fixed top-20 right-4 z-[9999]"
      style={{ animation: 'cartToastIn 0.3s ease-out' }}
    >
      <style>{`@keyframes cartToastIn{from{opacity:0;transform:translateX(100%)}to{opacity:1;transform:translateX(0)}}`}</style>
      <div className="bg-green-600 text-white px-5 py-3.5 shadow-2xl flex items-center gap-4 max-w-sm">
        <div className="flex-shrink-0">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold truncate">{productName}</p>
          <p className="text-xs opacity-90">Added to cart ({totalItems})</p>
        </div>
        <Link
          href={`/${locale}/shop/cart`}
          className="text-xs font-bold uppercase tracking-wider bg-white/20 hover:bg-white/30 px-3 py-1.5 transition-colors flex-shrink-0"
        >
          View
        </Link>
      </div>
    </div>
  )
}
