'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { type Product, getProductName, getProductShortDescription, getProductBadge, getProductIncludes } from '@/lib/products'
import { getContent, type Locale } from '@/content'
import { useCart } from '@/lib/cart-context'

interface ShopProductCardProps {
  product: Product
  locale: Locale
}

export default function ShopProductCard({ product, locale }: ShopProductCardProps) {
  const content = getContent(locale)
  const shop = content.shop
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  const name = getProductName(product, locale)
  const shortDesc = getProductShortDescription(product, locale)
  const badge = getProductBadge(product, locale)
  const includes = getProductIncludes(product, locale)
  const isComingSoon = product.comingSoon === true
  const hasDeposit = typeof product.depositAmount === 'number'

  const handleAdd = () => {
    if (isComingSoon) return
    addItem(product)

    // Push AddToCart event to dataLayer for GTM (Google Ads + Meta)
    ;(window as any).dataLayer = (window as any).dataLayer || []
    ;(window as any).dataLayer.push({ ecommerce: null })
    ;(window as any).dataLayer.push({
      event: 'add_to_cart',
      content_name: product.name,
      content_type: 'product',
      value: product.depositAmount ?? product.price,
      currency: 'MYR',
      items: [{ item_name: product.name, price: product.depositAmount ?? product.price, quantity: 1 }],
      ecommerce: {
        value: product.depositAmount ?? product.price,
        currency: 'MYR',
        items: [{ item_name: product.name, price: product.depositAmount ?? product.price, quantity: 1 }],
      },
    })

    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <div className={`group bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-all duration-300 flex flex-col h-full ${isComingSoon ? 'opacity-75' : ''}`}>
      {/* Image area */}
      <Link href={`/${locale}/shop/${product.slug}`} className="relative block">
        <div className="aspect-[4/3] bg-neutral-800 overflow-hidden">
          {product.image ? (
            <Image
              src={product.image}
              alt={name}
              width={600}
              height={450}
              className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-neutral-800 group-hover:scale-[1.02] transition-transform duration-500" />
          )}
        </div>
        {/* Badge */}
        {isComingSoon ? (
          <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider bg-neutral-700 text-neutral-300 px-2.5 py-1">
            {shop.comingSoon}
          </span>
        ) : badge ? (
          <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider bg-brand-red text-white px-2.5 py-1">
            {badge}
          </span>
        ) : null}
        {/* Savings */}
        {product.originalPrice && (
          <span className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider bg-neutral-950/80 backdrop-blur-sm text-green-400 px-2.5 py-1">
            Save RM {product.originalPrice - product.price}
          </span>
        )}
      </Link>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Category tag */}
        <span className="text-[10px] font-medium uppercase tracking-widest text-neutral-600 mb-2">
          {product.category === 'service' ? shop.categories.service : shop.categories.device}
        </span>

        <Link href={`/${locale}/shop/${product.slug}`} className="group/title">
          <h3 className="text-body font-bold text-white group-hover/title:text-brand-red transition-colors duration-200 mb-1.5">
            {name}
          </h3>
        </Link>

        <p className="text-body-sm text-neutral-500 mb-4 line-clamp-2">{shortDesc}</p>

        {/* Includes preview */}
        {includes.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {includes.slice(0, 3).map((item, i) => (
              <span
                key={i}
                className="text-[10px] text-neutral-400 bg-neutral-800 px-2 py-0.5 border border-neutral-700/50"
              >
                {item}
              </span>
            ))}
          </div>
        )}

        {/* Price + Actions */}
        <div className="mt-auto pt-4 border-t border-neutral-800/50">
          <div className="flex items-end justify-between gap-3">
            <div>
              {!isComingSoon && (
                <>
                  {hasDeposit ? (
                    <>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-brand-red mb-1 block">{shop.depositLabel}</span>
                      <span className="text-h5 text-white font-bold">RM {product.depositAmount}</span>
                      <span className="text-h5 text-neutral-400 font-bold ml-3">RM {product.price}</span>
                    </>
                  ) : (
                    <>
                      <span className="text-h5 text-white font-bold">RM {product.price}</span>
                      {product.originalPrice && (
                        <span className="text-body-sm text-neutral-600 line-through ml-2">
                          RM {product.originalPrice}
                        </span>
                      )}
                    </>
                  )}
                </>
              )}
            </div>
            {isComingSoon ? (
              <span className="text-xs font-bold uppercase tracking-wider px-4 py-2.5 bg-neutral-800 text-neutral-500 cursor-default">
                {shop.comingSoon}
              </span>
            ) : (
              <button
                onClick={handleAdd}
                className={`text-xs font-bold uppercase tracking-wider px-4 py-2.5 transition-all duration-300 ${
                  added
                    ? 'bg-green-600 text-white'
                    : 'bg-white text-neutral-950 hover:bg-brand-red hover:text-white'
                }`}
              >
                {added ? '✓ ' + shop.added : shop.addToCart}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
