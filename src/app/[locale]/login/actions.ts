'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { loginSchema, AUTH_ERROR_MESSAGES } from '@/lib/validations/auth'

export async function signIn(formData: FormData) {
  const supabase = await createClient()

  const rawData = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  // Validate input with Zod
  const validationResult = loginSchema.safeParse(rawData)
  if (!validationResult.success) {
    return { error: AUTH_ERROR_MESSAGES.VALIDATION_FAILED }
  }

  const { error } = await supabase.auth.signInWithPassword(validationResult.data)

  if (error) {
    // Log actual error for debugging (server-side only)
    console.error('Login error:', error.message)
    // Return generic message to client to prevent user enumeration
    return { error: AUTH_ERROR_MESSAGES.INVALID_CREDENTIALS }
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/')
}
