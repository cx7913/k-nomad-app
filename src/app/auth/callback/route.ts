import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

/**
 * Validates redirect URL to prevent open redirect attacks
 * Only allows relative paths starting with /
 */
function isValidRedirectPath(path: string): boolean {
  // Must start with / and not contain protocol or double slashes
  if (!path.startsWith('/')) return false
  if (path.startsWith('//')) return false
  if (path.includes('://')) return false
  // Prevent encoded attacks
  const decoded = decodeURIComponent(path)
  if (decoded.startsWith('//')) return false
  if (decoded.includes('://')) return false
  return true
}

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const type = searchParams.get('type')
  const nextParam = searchParams.get('next') ?? '/'

  // Validate redirect path to prevent open redirect
  const next = isValidRedirectPath(nextParam) ? nextParam : '/'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      // 비밀번호 재설정인 경우 reset-password 페이지로 리다이렉트
      if (type === 'recovery') {
        return NextResponse.redirect(`${origin}/ko/reset-password`)
      }
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // 인증 실패 시 에러 페이지로 리다이렉트
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}
