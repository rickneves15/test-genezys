import { NextRequest, NextResponse } from 'next/server'

import { getCookie } from './actions/cookies'
import { buildKeyStore } from './lib/utils'

const PUBLIC_ROUTES = [
  '/sign-in',
  '/sign-up',
  '/reset-password',
  '/api/sign-in',
  '/api/sign-up',
  '/api/reset-password',
]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Get the token from cookies
  const token = await getCookie(buildKeyStore('token'))

  // If the user has a token and tries to access a public route, redirect to home
  if (token && PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Allow public routes to bypass authentication if no token exists
  if (PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.next()
  }

  // If no token is found, redirect to sign-in for protected routes
  if (!token) {
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }
  return NextResponse.next()
}

// Configure middleware to run on all routes except public routes
export const config = {
  matcher: [
    // Run middleware on all routes except API and static files
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
