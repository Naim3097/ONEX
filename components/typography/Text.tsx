import { ReactNode } from 'react'

type TextVariant = 'body' | 'body-lg' | 'body-sm' | 'caption' | 'overline'

interface TextProps {
  variant?: TextVariant
  children: ReactNode
  className?: string
  as?: 'p' | 'span' | 'div'
}

const variantStyles: Record<TextVariant, string> = {
  body: 'text-body',
  'body-lg': 'text-body-lg',
  'body-sm': 'text-body-sm',
  caption: 'text-caption font-light',
  overline: 'text-overline uppercase tracking-widest font-medium',
}

export default function Text({ variant = 'body', children, className = '', as: Tag = 'p' }: TextProps) {
  return <Tag className={`${variantStyles[variant]} ${className}`}>{children}</Tag>
}
