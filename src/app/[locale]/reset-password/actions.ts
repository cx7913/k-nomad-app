'use server'

import { createClient } from '@/lib/supabase/server'
import { resetPasswordSchema, AUTH_ERROR_MESSAGES } from '@/lib/validations/auth'

export async function updatePassword(formData: FormData) {
  const supabase = await createClient()

  const rawData = {
    password: formData.get('password') as string,
    confirmPassword: formData.get('confirmPassword') as string,
  }

  // Validate input with Zod (includes password strength validation)
  const validationResult = resetPasswordSchema.safeParse(rawData)
  if (!validationResult.success) {
    const firstError = validationResult.error.issues[0]?.message
    return { error: firstError || AUTH_ERROR_MESSAGES.VALIDATION_FAILED }
  }

  const { error } = await supabase.auth.updateUser({
    password: validationResult.data.password,
  })

  if (error) {
    // Log actual error for debugging (server-side only)
    console.error('Password update error:', error.message)
    // Return generic message to client
    return { error: AUTH_ERROR_MESSAGES.PASSWORD_UPDATE_FAILED }
  }

  return { error: '' }
}
