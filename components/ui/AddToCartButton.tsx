'use client'

import { useRouter } from 'next/navigation'
import { useCart } from '@/lib/cart-context'
import { products } from '@/lib/products'

interface AddToCartButtonProps {
  locale: string
  slug: string
  className?: string
  children: React.ReactNode
}

export default function AddToCartButton({ locale, slug, className, children }: AddToCartButtonProps) {
  const { addItem } = useCart()
  const router = useRouter()

  const handleClick = () => {
    const product = products.find((p) => p.slug === slug)
    if (!product) return
    addItem(product)

    // Push AddToCart event to dataLayer for GTM (Google Ads + Meta)
    ;(window as any).dataLayer = (window as any).dataLayer || []
    const cartData = {
      content_name: product.name,
      content_type: 'product',
      value: product.depositAmount ?? product.price,
      currency: 'MYR',
      items: [{ item_name: product.name, price: product.depositAmount ?? product.price, quantity: 1 }],
    }
    ;(window as any).dataLayer.push({ ecommerce: null })
    ;(window as any).dataLayer.push({
      event: 'add_to_cart',
      ...cartData,
      ecommerce: { value: cartData.value, currency: 'MYR', items: cartData.items },
    })

    router.push(`/${locale}/shop/cart`)
  }

  return (
    <button onClick={handleClick} className={className}>
      {children}
    </button>
  )
}
