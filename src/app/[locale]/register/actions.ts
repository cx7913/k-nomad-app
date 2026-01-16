'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { registerSchema, AUTH_ERROR_MESSAGES } from '@/lib/validations/auth'

export async function signUp(formData: FormData) {
  const supabase = await createClient()

  const rawData = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    confirmPassword: formData.get('confirmPassword') as string,
  }

  // Validate input with Zod (includes password strength validation)
  const validationResult = registerSchema.safeParse(rawData)
  if (!validationResult.success) {
    const firstError = validationResult.error.issues[0]?.message
    return { error: firstError || AUTH_ERROR_MESSAGES.VALIDATION_FAILED }
  }

  const { error } = await supabase.auth.signUp({
    email: validationResult.data.email,
    password: validationResult.data.password,
  })

  if (error) {
    // Log actual error for debugging (server-side only)
    console.error('Registration error:', error.message)
    // Return generic message to client
    return { error: AUTH_ERROR_MESSAGES.REGISTRATION_FAILED }
  }

  revalidatePath('/', 'layout')
  redirect('/')
}
