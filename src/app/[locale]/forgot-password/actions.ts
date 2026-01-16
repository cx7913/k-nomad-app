'use server'

import { createClient } from '@/lib/supabase/server'
import { headers } from 'next/headers'
import { forgotPasswordSchema, AUTH_ERROR_MESSAGES } from '@/lib/validations/auth'

export async function requestPasswordReset(formData: FormData) {
  const supabase = await createClient()
  const headersList = await headers()
  const origin = headersList.get('origin') || 'http://localhost:3001'

  const rawData = {
    email: formData.get('email') as string,
  }

  // Validate input with Zod
  const validationResult = forgotPasswordSchema.safeParse(rawData)
  if (!validationResult.success) {
    return { error: AUTH_ERROR_MESSAGES.VALIDATION_FAILED, success: false }
  }

  const { error } = await supabase.auth.resetPasswordForEmail(validationResult.data.email, {
    redirectTo: `${origin}/auth/callback?type=recovery`,
  })

  if (error) {
    // Log actual error for debugging (server-side only)
    console.error('Password reset error:', error.message)
    // Return generic message - don't reveal if email exists
    // For security, we return success even if email doesn't exist
  }

  // Always return success to prevent user enumeration
  return { error: '', success: true }
}
