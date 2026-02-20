import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSession } from '@/lib/auth/session';

export async function middleware(request: NextRequest) {
  // Protect app routes that require authentication.
  if (
    request.nextUrl.pathname.startsWith('/choose') ||
    request.nextUrl.pathname.startsWith('/games/qa') ||
    request.nextUrl.pathname.startsWith('/personal/jira')
  ) {
    try {
      const session = await getSession();
      
      if (!session) {
        // Redirect to login if not authenticated
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('redirect', request.nextUrl.pathname);
        return NextResponse.redirect(loginUrl);
      }
    } catch {
      // If there's an error checking session, redirect to login
      const loginUrl = new URL('/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/choose/:path*', '/games/qa/:path*', '/personal/jira/:path*'],
};
