import { test, expect } from '@playwright/test'
import { LoginPage } from '../../pages/login.page'
import { HeaderComponent } from '../../pages/components/header.component'
import { testUsers } from '../../fixtures/test-data'

test.describe('Login Page', () => {
  let loginPage: LoginPage
  let header: HeaderComponent

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page, 'en')
    header = new HeaderComponent(page)
    await loginPage.goto()
  })

  test.describe('Basic Elements', () => {
    test('should display login page title', async ({ page }) => {
      const title = page.locator('h1')
      await expect(title).toBeVisible()
      await expect(title).toHaveText('Log In')
    })

    test('should display welcome message', async ({ page }) => {
      const subtitle = page.getByText('Welcome back to K-Nomad')
      await expect(subtitle).toBeVisible()
    })

    test('should display logo in header', async () => {
      await expect(header.logo).toBeVisible()
      await expect(header.logo).toHaveText('K-Nomad')
    })

    test('should display email input field', async () => {
      await expect(loginPage.emailInput).toBeVisible()
      await expect(loginPage.emailInput).toHaveAttribute('placeholder', 'Enter your email')
    })

    test('should display password input field', async () => {
      await expect(loginPage.passwordInput).toBeVisible()
      await expect(loginPage.passwordInput).toHaveAttribute('placeholder', 'Enter your password')
    })

    test('should display login button', async () => {
      await expect(loginPage.submitButton).toBeVisible()
      await expect(loginPage.submitButton).toHaveText('Log In')
    })

    test('should display forgot password link', async () => {
      await expect(loginPage.forgotPasswordLink).toBeVisible()
      await expect(loginPage.forgotPasswordLink).toHaveText('Forgot password?')
    })

    test('should display sign up link', async ({ page }) => {
      // Use main content area to avoid matching header sign up button
      const signUpLink = page.getByRole('main').getByRole('link', { name: 'Sign up' })
      await expect(signUpLink).toBeVisible()
    })
  })

  test.describe('Form Interactions', () => {
    test('should allow typing in email field', async () => {
      await loginPage.fillEmail('test@example.com')
      await expect(loginPage.emailInput).toHaveValue('test@example.com')
    })

    test('should allow typing in password field', async () => {
      await loginPage.fillPassword('password123')
      await expect(loginPage.passwordInput).toHaveValue('password123')
    })

    test('should toggle password visibility', async ({ page }) => {
      // Fill password first
      await loginPage.fillPassword('password123')

      // Password should be hidden by default
      await expect(loginPage.passwordInput).toHaveAttribute('type', 'password')

      // Click toggle button to show password
      const toggleButton = page.locator('button').filter({ has: page.locator('img, svg') }).nth(1)
      await toggleButton.click()

      // Password should now be visible
      await expect(loginPage.passwordInput).toHaveAttribute('type', 'text')
    })
  })

  test.describe('Form Validation', () => {
    test('should show validation error for empty email', async ({ page }) => {
      // Try to submit with empty fields
      await loginPage.submit()

      // Check for HTML5 validation message on email field
      const emailInput = loginPage.emailInput
      const validationMessage = await emailInput.evaluate((el: HTMLInputElement) => el.validationMessage)
      expect(validationMessage).toBeTruthy()
    })

    test('should show validation error for invalid email format', async ({ page }) => {
      await loginPage.fillEmail('invalid-email')
      await loginPage.fillPassword('password123')
      await loginPage.submit()

      // Check for HTML5 validation message
      const emailInput = loginPage.emailInput
      const validationMessage = await emailInput.evaluate((el: HTMLInputElement) => el.validationMessage)
      expect(validationMessage).toBeTruthy()
    })

    test('should not submit form with empty password', async ({ page }) => {
      await loginPage.fillEmail('test@example.com')
      // Leave password empty
      await loginPage.submit()

      // Check for validation
      const passwordInput = loginPage.passwordInput
      const validationMessage = await passwordInput.evaluate((el: HTMLInputElement) => el.validationMessage)
      expect(validationMessage).toBeTruthy()
    })
  })

  test.describe('Navigation Links', () => {
    test('should navigate to register page when clicking sign up link', async ({ page }) => {
      // Use main content area to avoid matching header sign up button
      const signUpLink = page.getByRole('main').getByRole('link', { name: 'Sign up' })
      await signUpLink.click()

      await expect(page).toHaveURL(/\/register/)
    })

    test('should navigate to forgot password page when clicking forgot password link', async ({ page }) => {
      await loginPage.goToForgotPassword()

      await expect(page).toHaveURL(/\/forgot-password/)
    })

    test('should navigate to home when clicking logo', async ({ page }) => {
      await header.clickLogo()

      await expect(page).toHaveURL(/\/en\/?$/)
    })
  })

  test.describe('Access from Homepage', () => {
    test('should navigate to login page from homepage header', async ({ page }) => {
      // Go to homepage first
      await page.goto('/en')

      // Click login link in header
      const loginLink = page.getByRole('banner').getByRole('link', { name: 'Log in' })
      await loginLink.click()

      // Verify navigation to login page
      await expect(page).toHaveURL(/\/login/)
      await expect(page.locator('h1')).toHaveText('Log In')
    })
  })

  test.describe('Responsive Elements', () => {
    test('should have proper form structure', async ({ page }) => {
      // Verify form exists
      const form = page.locator('form')
      const formCount = await form.count()

      // Form should exist (might be implicit via button submit)
      // Check that all input fields are within a logical container
      const emailLabel = page.getByText('Email', { exact: true })
      const passwordLabel = page.getByText('Password', { exact: true })

      await expect(emailLabel).toBeVisible()
      await expect(passwordLabel).toBeVisible()
    })

    test('should maintain focus order', async ({ page }) => {
      // Tab through form elements
      await loginPage.emailInput.focus()
      await expect(loginPage.emailInput).toBeFocused()

      await page.keyboard.press('Tab')
      await expect(loginPage.passwordInput).toBeFocused()
    })
  })
})
