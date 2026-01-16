import { Page, Locator } from '@playwright/test'
import { BasePage } from './base.page'

/**
 * Login Page Object
 * Encapsulates login page elements and actions
 */
export class LoginPage extends BasePage {
  // Form elements
  readonly emailInput: Locator
  readonly passwordInput: Locator
  readonly submitButton: Locator

  // Links
  readonly registerLink: Locator
  readonly forgotPasswordLink: Locator

  // Error message
  readonly errorMessage: Locator

  // Social login buttons (if any)
  readonly googleButton: Locator
  readonly githubButton: Locator

  constructor(page: Page, locale: string = 'ko') {
    super(page, locale)

    // Form elements
    this.emailInput = page.locator('input[type="email"], input[name="email"]')
    this.passwordInput = page.locator('input[type="password"], input[name="password"]')
    this.submitButton = page.locator('button[type="submit"]')

    // Links
    this.registerLink = page.locator('a[href*="register"]')
    this.forgotPasswordLink = page.locator('a[href*="forgot-password"]')

    // Error message
    this.errorMessage = page.locator('[class*="error"], [role="alert"], .text-red-500, .text-destructive')

    // Social login buttons
    this.googleButton = page.locator('button').filter({ hasText: /google/i })
    this.githubButton = page.locator('button').filter({ hasText: /github/i })
  }

  /**
   * Navigate to login page
   */
  async goto(): Promise<void> {
    await super.goto('login')
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
   * Submit login form
   */
  async submit(): Promise<void> {
    await this.submitButton.click()
  }

  /**
   * Perform complete login
   */
  async login(email: string, password: string): Promise<void> {
    await this.fillEmail(email)
    await this.fillPassword(password)
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
   * Navigate to register page
   */
  async goToRegister(): Promise<void> {
    await this.registerLink.click()
  }

  /**
   * Navigate to forgot password page
   */
  async goToForgotPassword(): Promise<void> {
    await this.forgotPasswordLink.click()
  }
}
