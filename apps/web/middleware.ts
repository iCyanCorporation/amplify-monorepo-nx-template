import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { languages } from '@/app/i18n/settings';

const PUBLIC_PATHS = /^\/(api|_next|images|public|favicon\.ico)/;
const LANGUAGES = languages;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip public paths
  if (PUBLIC_PATHS.test(pathname)) {
    return NextResponse.next();
  }

  // Extract language from path
  const pathLang = pathname.split('/')[1];
  const isValidLang = LANGUAGES.includes(pathLang as any);

  // Get language from cookie or default to 'en'
  const cookieLang = request.cookies.get('NEXT_LOCALE')?.value;
  const defaultLang = LANGUAGES.includes(cookieLang as any)
    ? cookieLang!
    : 'en';

  // If no valid language in path, redirect to the appropriate language version
  if (!isValidLang) {
    const newUrl = new URL(
      `/${defaultLang}${pathname === '/' ? '' : pathname}${
        request.nextUrl.search
      }`,
      request.url
    );

    const response = NextResponse.redirect(newUrl);
    response.cookies.set('NEXT_LOCALE', defaultLang, {
      path: '/',
      maxAge: 31536000, // 1 year
      sameSite: 'strict',
    });

    return response;
  }

  // Always ensure the cookie matches the current path language
  const response = NextResponse.next();
  if (pathLang !== cookieLang) {
    response.cookies.set('NEXT_LOCALE', pathLang, {
      path: '/',
      maxAge: 31536000,
      sameSite: 'strict',
    });
  }

  return response;
}

export const config = {
  matcher: [
    // Match all paths except files in public directories
    '/((?!api|_next/static|_next/image|images|public|favicon.ico).*)',
  ],
};
