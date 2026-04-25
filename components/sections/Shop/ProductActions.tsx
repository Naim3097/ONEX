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
  const isComingSoon = product.comingSoon === true
  const hasDeposit = typeof product.depositAmount === 'number'

  if (isComingSoon) {
    return (
      <div className="flex gap-4">
        <span className="cta-ghost flex-1 text-center cursor-default opacity-60">
          {shop.comingSoon}
        </span>
      </div>
    )
  }

  return (
    <div className="flex gap-4">
      <button
        onClick={() => {
          addItem(product)
          ;(window as any).dataLayer = (window as any).dataLayer || []
          ;(window as any).dataLayer.push({
            event: 'add_to_cart',
            content_name: product.name,
            content_type: 'product',
            value: product.depositAmount ?? product.price,
            currency: 'MYR',
            items: [{
              item_name: product.name,
              price: product.depositAmount ?? product.price,
              quantity: 1,
            }],
          })
        }}
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
