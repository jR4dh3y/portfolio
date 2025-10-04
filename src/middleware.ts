import { NextRequest, NextResponse } from 'next/server';

const allowedOrigins = new Set(
  [
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, ''),
    process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`,
    'http://localhost:9002',
    'http://localhost:3000',
  ].filter(Boolean) as string[]
);

function isAllowedOrigin(origin?: string | null): boolean {
  if (!origin) return false;
  try {
    const url = new URL(origin);
    const normalized = `${url.protocol}//${url.host}`;
    return allowedOrigins.has(normalized);
  } catch {
    return false;
  }
}

export function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // Global security headers
  res.headers.set('X-Content-Type-Options', 'nosniff');
  res.headers.set('X-Frame-Options', 'DENY');
  res.headers.set('X-XSS-Protection', '1; mode=block');
  res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  // Protect contact API endpoint
  if (req.nextUrl.pathname === '/api/contact') {
    // Only allow POST
    if (req.method !== 'POST') {
      return new NextResponse(JSON.stringify({ error: 'Method Not Allowed' }), {
        status: 405,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Validate origin/referer to prevent cross-site requests
    const origin = req.headers.get('origin');
    const referer = req.headers.get('referer');
    
    if (!isAllowedOrigin(origin) && !isAllowedOrigin(referer)) {
      return new NextResponse(JSON.stringify({ error: 'Forbidden' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }

  return res;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|assets/).*)',
  ],
};
