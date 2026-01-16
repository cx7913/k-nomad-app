import { Page, Locator } from '@playwright/test'

/**
 * Header Component Object
 * Encapsulates header elements and actions
 */
export class HeaderComponent {
  readonly page: Page

  // Elements
  readonly header: Locator
  readonly logo: Locator
  readonly languageSwitcher: Locator
  readonly loginButton: Locator
  readonly signupButton: Locator
  readonly logoutButton: Locator

  constructor(page: Page) {
    this.page = page

    // Header container
    this.header = page.locator('header')

    // Logo
    this.logo = this.header.locator('a').filter({ hasText: 'K-Nomad' })

    // Language switcher
    this.languageSwitcher = this.header.locator('button[role="combobox"]').filter({ has: page.locator('svg') })

    // Auth buttons
    this.loginButton = this.header.locator('a[href*="login"], button').filter({ hasText: /login|로그인/i })
    this.signupButton = this.header.locator('a[href*="register"], button').filter({ hasText: /sign|회원가입/i })
    this.logoutButton = this.header.locator('button').filter({ hasText: /logout|로그아웃/i })
  }

  /**
   * Click logo to go home
   */
  async clickLogo(): Promise<void> {
    await this.logo.click()
  }

  /**
   * Change language
   */
  async changeLanguage(locale: string): Promise<void> {
    await this.languageSwitcher.click()
    await this.page.locator('[role="option"]').filter({ hasText: new RegExp(locale, 'i') }).click()
  }

  /**
   * Click login button
   */
  async clickLogin(): Promise<void> {
    await this.loginButton.click()
  }

  /**
   * Click signup button
   */
  async clickSignup(): Promise<void> {
    await this.signupButton.click()
  }

  /**
   * Click logout button
   */
  async clickLogout(): Promise<void> {
    await this.logoutButton.click()
  }

  /**
   * Check if user is logged in
   */
  async isLoggedIn(): Promise<boolean> {
    return this.logoutButton.isVisible()
  }

  /**
   * Check if user is logged out
   */
  async isLoggedOut(): Promise<boolean> {
    return this.loginButton.isVisible()
  }
}
