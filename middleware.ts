import { NextRequest, NextResponse } from 'next/server'

const locales = ['en', 'ms', 'zh']
const defaultLocale = 'en'

function getLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get('accept-language') || ''

  if (acceptLanguage.includes('ms')) return 'ms'
  if (acceptLanguage.includes('zh')) return 'zh'

  return defaultLocale
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip static files, api routes, and _next
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/fonts') ||
    pathname.startsWith('/0x') ||
    pathname.startsWith('/promo') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // Check if locale is already in path
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return NextResponse.next()

  // Redirect to locale-prefixed path
  const locale = getLocale(request)
  const newUrl = new URL(`/${locale}${pathname}`, request.url)
  return NextResponse.redirect(newUrl)
}

export const config = {
  matcher: ['/((?!_next|api|images|fonts|favicon.ico).*)'],
}
