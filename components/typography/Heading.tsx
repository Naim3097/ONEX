import { ReactNode } from 'react'

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4'

interface HeadingProps {
  as?: HeadingLevel
  children: ReactNode
  className?: string
}

const headingStyles: Record<HeadingLevel, string> = {
  h1: 'text-h1 font-bold text-balance',
  h2: 'text-h2 font-medium text-balance',
  h3: 'text-h3 font-medium',
  h4: 'text-h4 font-medium',
}

export default function Heading({ as: Tag = 'h2', children, className = '' }: HeadingProps) {
  return <Tag className={`${headingStyles[Tag]} ${className}`}>{children}</Tag>
}
