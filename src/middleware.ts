import createIntlMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { updateSession } from './lib/supabase/middleware';
import { NextResponse, type NextRequest } from 'next/server';

const intlMiddleware = createIntlMiddleware(routing);

// 인증이 필요한 경로 패턴
const protectedRoutes = ['/profile', '/settings'];

// 로그인한 사용자가 접근하면 안 되는 경로
const authRoutes = ['/login', '/register'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // /auth 경로는 locale 없이 처리 (콜백 등)
  if (pathname.startsWith('/auth')) {
    const { supabaseResponse } = await updateSession(request);
    return supabaseResponse;
  }

  // 1. Supabase 세션 갱신 및 유저 정보 가져오기
  const { user, supabaseResponse } = await updateSession(request);

  // locale prefix 제거하여 실제 경로 추출 (예: /ko/dashboard -> /dashboard)
  const pathnameWithoutLocale = pathname.replace(/^\/(ko|en|ja|zh|fr|it|es)/, '');

  // 2. 경로 보호 로직
  const isProtectedRoute = protectedRoutes.some(route =>
    pathnameWithoutLocale.startsWith(route)
  );
  const isAuthRoute = authRoutes.some(route =>
    pathnameWithoutLocale.startsWith(route)
  );

  // 인증되지 않은 사용자가 보호된 경로 접근 시 로그인 페이지로 리다이렉트
  if (isProtectedRoute && !user) {
    const locale = pathname.match(/^\/(ko|en|ja|zh|fr|it|es)/)?.[1] || 'ko';
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}/login`;
    url.searchParams.set('redirect', pathname);
    return NextResponse.redirect(url);
  }

  // 이미 로그인한 사용자가 로그인/회원가입 페이지 접근 시 홈으로 리다이렉트
  if (isAuthRoute && user) {
    const locale = pathname.match(/^\/(ko|en|ja|zh|fr|it|es)/)?.[1] || 'ko';
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}`;
    return NextResponse.redirect(url);
  }

  // 3. next-intl 미들웨어 실행
  const intlResponse = intlMiddleware(request);

  // 4. Supabase 쿠키를 intl 응답에 복사
  if (intlResponse) {
    supabaseResponse.cookies.getAll().forEach((cookie) => {
      intlResponse.cookies.set(cookie.name, cookie.value, {
        ...cookie,
      });
    });
    return intlResponse;
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    '/',
    '/(ko|en|ja|zh|fr|it|es)/:path*',
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
