import { Page, Locator } from '@playwright/test'

/**
 * Base Page Object class
 * Contains common methods and properties for all page objects
 */
export class BasePage {
  readonly page: Page
  readonly locale: string

  constructor(page: Page, locale: string = 'ko') {
    this.page = page
    this.locale = locale
  }

  /**
   * Navigate to a path with the current locale
   */
  async goto(path: string = '/'): Promise<void> {
    const normalizedPath = path.startsWith('/') ? path.slice(1) : path
    await this.page.goto(`/${this.locale}/${normalizedPath}`)
  }

  /**
   * Wait for page to be fully loaded
   */
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle')
  }

  /**
   * Get the current URL path without locale prefix
   */
  async getCurrentPath(): Promise<string> {
    const url = this.page.url()
    const urlObj = new URL(url)
    return urlObj.pathname.replace(`/${this.locale}`, '') || '/'
  }

  /**
   * Get current locale from URL
   */
  async getCurrentLocale(): Promise<string> {
    const url = this.page.url()
    const urlObj = new URL(url)
    const pathParts = urlObj.pathname.split('/')
    return pathParts[1] || 'ko'
  }

  /**
   * Check if element is visible
   */
  async isVisible(locator: Locator): Promise<boolean> {
    return locator.isVisible()
  }

  /**
   * Wait for element to be visible
   */
  async waitForVisible(locator: Locator, timeout?: number): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout })
  }

  /**
   * Take screenshot of the page
   */
  async screenshot(name: string): Promise<void> {
    await this.page.screenshot({ path: `e2e/screenshots/${name}.png` })
  }
}
