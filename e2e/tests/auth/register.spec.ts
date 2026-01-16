import { test, expect } from '@playwright/test'
import { RegisterPage } from '../../pages/register.page'
import { HeaderComponent } from '../../pages/components/header.component'

test.describe('Register Page', () => {
  let registerPage: RegisterPage
  let header: HeaderComponent

  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page, 'en')
    header = new HeaderComponent(page)
    await registerPage.goto()
  })

  test.describe('Basic Elements', () => {
    test('should display register page title', async ({ page }) => {
      const title = page.locator('h1')
      await expect(title).toBeVisible()
      await expect(title).toHaveText('Sign Up')
    })

    test('should display welcome message', async ({ page }) => {
      const subtitle = page.getByText('Start your nomad journey with K-Nomad')
      await expect(subtitle).toBeVisible()
    })

    test('should display logo in header', async () => {
      await expect(header.logo).toBeVisible()
      await expect(header.logo).toHaveText('K-Nomad')
    })

    test('should display email input field', async () => {
      await expect(registerPage.emailInput).toBeVisible()
      await expect(registerPage.emailInput).toHaveAttribute('placeholder', 'Enter your email')
    })

    test('should display password input field', async () => {
      await expect(registerPage.passwordInput).toBeVisible()
      await expect(registerPage.passwordInput).toHaveAttribute('placeholder', 'Enter your password')
    })

    test('should display confirm password input field', async () => {
      await expect(registerPage.confirmPasswordInput).toBeVisible()
      await expect(registerPage.confirmPasswordInput).toHaveAttribute('placeholder', 'Re-enter your password')
    })

    test('should display terms checkbox', async ({ page }) => {
      const checkbox = page.getByRole('checkbox')
      await expect(checkbox).toBeVisible()
    })

    test('should display terms and privacy policy links', async ({ page }) => {
      const termsLink = page.getByRole('link', { name: 'Terms of Service' })
      const privacyLink = page.getByRole('link', { name: 'Privacy Policy' })

      await expect(termsLink).toBeVisible()
      await expect(privacyLink).toBeVisible()
    })

    test('should display sign up button', async () => {
      await expect(registerPage.submitButton).toBeVisible()
      await expect(registerPage.submitButton).toHaveText('Sign Up')
    })

    test('should display login link', async ({ page }) => {
      const loginLink = page.getByRole('main').getByRole('link', { name: 'Log in' })
      await expect(loginLink).toBeVisible()
    })
  })

  test.describe('Form Interactions', () => {
    test('should allow typing in email field', async () => {
      await registerPage.fillEmail('test@example.com')
      await expect(registerPage.emailInput).toHaveValue('test@example.com')
    })

    test('should allow typing in password field', async () => {
      await registerPage.fillPassword('password123')
      await expect(registerPage.passwordInput).toHaveValue('password123')
    })

    test('should allow typing in confirm password field', async () => {
      await registerPage.fillConfirmPassword('password123')
      await expect(registerPage.confirmPasswordInput).toHaveValue('password123')
    })

    test('should toggle password visibility for password field', async ({ page }) => {
      await registerPage.fillPassword('password123')

      // Password should be hidden by default
      await expect(registerPage.passwordInput).toHaveAttribute('type', 'password')

      // Click toggle button to show password (first toggle button)
      const toggleButtons = page.locator('button').filter({ has: page.locator('img, svg') })
      await toggleButtons.nth(1).click()

      // Password should now be visible
      await expect(registerPage.passwordInput).toHaveAttribute('type', 'text')
    })

    test('should toggle password visibility for confirm password field', async ({ page }) => {
      await registerPage.fillConfirmPassword('password123')

      // Password should be hidden by default
      await expect(registerPage.confirmPasswordInput).toHaveAttribute('type', 'password')

      // Click toggle button for confirm password (second toggle button)
      const toggleButtons = page.locator('button').filter({ has: page.locator('img, svg') })
      await toggleButtons.nth(2).click()

      // Password should now be visible
      await expect(registerPage.confirmPasswordInput).toHaveAttribute('type', 'text')
    })

    test('should allow checking terms checkbox', async ({ page }) => {
      const checkbox = page.getByRole('checkbox')

      // Initially unchecked
      await expect(checkbox).not.toBeChecked()

      // Click to check
      await checkbox.click()

      // Should now be checked
      await expect(checkbox).toBeChecked()
    })
  })

  test.describe('Form Validation', () => {
    test('should show validation error for empty email', async () => {
      await registerPage.submit()

      const emailInput = registerPage.emailInput
      const validationMessage = await emailInput.evaluate((el: HTMLInputElement) => el.validationMessage)
      expect(validationMessage).toBeTruthy()
    })

    test('should show validation error for invalid email format', async () => {
      await registerPage.fillEmail('invalid-email')
      await registerPage.fillPassword('password123')
      await registerPage.fillConfirmPassword('password123')
      await registerPage.submit()

      const emailInput = registerPage.emailInput
      const validationMessage = await emailInput.evaluate((el: HTMLInputElement) => el.validationMessage)
      expect(validationMessage).toBeTruthy()
    })

    test('should show validation error for empty password', async () => {
      await registerPage.fillEmail('test@example.com')
      await registerPage.submit()

      const passwordInput = registerPage.passwordInput
      const validationMessage = await passwordInput.evaluate((el: HTMLInputElement) => el.validationMessage)
      expect(validationMessage).toBeTruthy()
    })

    test('should show validation error for empty confirm password', async () => {
      await registerPage.fillEmail('test@example.com')
      await registerPage.fillPassword('password123')
      await registerPage.submit()

      const confirmPasswordInput = registerPage.confirmPasswordInput
      const validationMessage = await confirmPasswordInput.evaluate((el: HTMLInputElement) => el.validationMessage)
      expect(validationMessage).toBeTruthy()
    })
  })

  test.describe('Navigation Links', () => {
    test('should navigate to login page when clicking login link', async ({ page }) => {
      const loginLink = page.getByRole('main').getByRole('link', { name: 'Log in' })
      await loginLink.click()

      await expect(page).toHaveURL(/\/login/)
    })

    test('should navigate to home when clicking logo', async ({ page }) => {
      await header.clickLogo()

      await expect(page).toHaveURL(/\/en\/?$/)
    })
  })

  test.describe('Access from Homepage', () => {
    test('should navigate to register page from homepage header', async ({ page }) => {
      // Go to homepage first
      await page.goto('/en')

      // Click sign up button in header
      const signUpLink = page.getByRole('banner').getByRole('link', { name: 'Sign up' })
      await signUpLink.click()

      // Verify navigation to register page
      await expect(page).toHaveURL(/\/register/)
      await expect(page.locator('h1')).toHaveText('Sign Up')
    })
  })

  test.describe('Access from Login Page', () => {
    test('should navigate to register page from login page', async ({ page }) => {
      // Go to login page first
      await page.goto('/en/login')

      // Click sign up link
      const signUpLink = page.getByRole('main').getByRole('link', { name: 'Sign up' })
      await signUpLink.click()

      // Verify navigation to register page
      await expect(page).toHaveURL(/\/register/)
      await expect(page.locator('h1')).toHaveText('Sign Up')
    })
  })

  test.describe('Responsive Elements', () => {
    test('should have proper form structure', async ({ page }) => {
      const emailLabel = page.getByText('Email', { exact: true })
      const passwordLabel = page.getByText('Password', { exact: true }).first()
      const confirmPasswordLabel = page.getByText('Confirm Password', { exact: true })

      await expect(emailLabel).toBeVisible()
      await expect(passwordLabel).toBeVisible()
      await expect(confirmPasswordLabel).toBeVisible()
    })

    test('should maintain focus order', async ({ page }) => {
      // Tab through form elements
      await registerPage.emailInput.focus()
      await expect(registerPage.emailInput).toBeFocused()

      await page.keyboard.press('Tab')
      await expect(registerPage.passwordInput).toBeFocused()

      await page.keyboard.press('Tab')
      // Skip toggle button
      await page.keyboard.press('Tab')
      await expect(registerPage.confirmPasswordInput).toBeFocused()
    })
  })
})
