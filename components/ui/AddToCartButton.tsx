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
    router.push(`/${locale}/shop/cart`)
  }

  return (
    <button onClick={handleClick} className={className}>
      {children}
    </button>
  )
}
