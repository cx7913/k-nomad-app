import { test as base, Page } from '@playwright/test'

/**
 * Authentication fixture for E2E tests
 * Provides authenticated and unauthenticated test contexts
 */

export type AuthFixtures = {
  /** Page with authenticated user session */
  authenticatedPage: Page
  /** Test user credentials */
  testUser: {
    email: string
    password: string
  }
}

export const test = base.extend<AuthFixtures>({
  // Test user credentials
  testUser: async ({}, use) => {
    await use({
      email: 'test@example.com',
      password: 'testpassword123',
    })
  },

  // Authenticated page fixture
  authenticatedPage: async ({ page, testUser }, use) => {
    // Navigate to login page
    await page.goto('/ko/login')

    // Fill in credentials
    await page.fill('input[type="email"]', testUser.email)
    await page.fill('input[type="password"]', testUser.password)

    // Submit login form
    await page.click('button[type="submit"]')

    // Wait for redirect after successful login
    await page.waitForURL(/\/ko$/)

    // Use the authenticated page
    await use(page)
  },
})

export { expect } from '@playwright/test'
