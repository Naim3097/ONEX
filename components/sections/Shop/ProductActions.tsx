'use client'

import Link from 'next/link'
import { type Product } from '@/lib/products'
import { getContent, type Locale } from '@/content'
import { useCart } from '@/lib/cart-context'

interface ProductActionsProps {
  product: Product
  locale: Locale
}

export default function ProductActions({ product, locale }: ProductActionsProps) {
  const content = getContent(locale)
  const shop = content.shop
  const { addItem } = useCart()

  return (
    <div className="flex gap-4">
      <button
        onClick={() => addItem(product)}
        className="cta-primary flex-1 text-center"
      >
        {shop.addToCart}
      </button>
      <Link href={`/${locale}/shop/cart`} className="cta-ghost text-center">
        {shop.cart.title}
      </Link>
    </div>
  )
}
