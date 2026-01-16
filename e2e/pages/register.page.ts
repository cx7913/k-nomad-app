import { Page, Locator } from '@playwright/test'
import { BasePage } from './base.page'

/**
 * Register Page Object
 * Encapsulates registration page elements and actions
 */
export class RegisterPage extends BasePage {
  // Form elements
  readonly emailInput: Locator
  readonly passwordInput: Locator
  readonly confirmPasswordInput: Locator
  readonly submitButton: Locator

  // Links
  readonly loginLink: Locator

  // Error/Success messages
  readonly errorMessage: Locator
  readonly successMessage: Locator

  // Form validation errors
  readonly emailError: Locator
  readonly passwordError: Locator

  constructor(page: Page, locale: string = 'ko') {
    super(page, locale)

    // Form elements
    this.emailInput = page.locator('input[type="email"], input[name="email"]')
    this.passwordInput = page.locator('input[type="password"], input[name="password"]').first()
    this.confirmPasswordInput = page.locator('input[type="password"], input[name="confirmPassword"]').last()
    this.submitButton = page.locator('button[type="submit"]')

    // Links
    this.loginLink = page.locator('a[href*="login"]')

    // Error/Success messages
    this.errorMessage = page.locator('[class*="error"], [role="alert"], .text-red-500, .text-destructive')
    this.successMessage = page.locator('[class*="success"], .text-green-500')

    // Form validation errors
    this.emailError = page.locator('input[type="email"] + [class*="error"], input[name="email"] ~ [class*="error"]')
    this.passwordError = page.locator('input[type="password"] + [class*="error"], input[name="password"] ~ [class*="error"]')
  }

  /**
   * Navigate to register page
   */
  async goto(): Promise<void> {
    await super.goto('register')
    await this.waitForPageLoad()
  }

  /**
   * Fill email field
   */
  async fillEmail(email: string): Promise<void> {
    await this.emailInput.fill(email)
  }

  /**
   * Fill password field
   */
  async fillPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password)
  }

  /**
   * Fill confirm password field
   */
  async fillConfirmPassword(password: string): Promise<void> {
    await this.confirmPasswordInput.fill(password)
  }

  /**
   * Submit registration form
   */
  async submit(): Promise<void> {
    await this.submitButton.click()
  }

  /**
   * Perform complete registration
   */
  async register(email: string, password: string, confirmPassword?: string): Promise<void> {
    await this.fillEmail(email)
    await this.fillPassword(password)
    if (confirmPassword !== undefined) {
      await this.fillConfirmPassword(confirmPassword)
    }
    await this.submit()
  }

  /**
   * Check if error message is visible
   */
  async isErrorVisible(): Promise<boolean> {
    return this.errorMessage.isVisible()
  }

  /**
   * Get error message text
   */
  async getErrorMessage(): Promise<string> {
    return (await this.errorMessage.textContent()) || ''
  }

  /**
   * Check if success message is visible
   */
  async isSuccessVisible(): Promise<boolean> {
    return this.successMessage.isVisible()
  }

  /**
   * Navigate to login page
   */
  async goToLogin(): Promise<void> {
    await this.loginLink.click()
  }
}
