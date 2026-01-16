import { Page, Locator } from '@playwright/test'

/**
 * Footer Component Object
 * Encapsulates footer elements and actions
 */
export class FooterComponent {
  readonly page: Page

  // Elements
  readonly footer: Locator
  readonly brandName: Locator
  readonly aboutSection: Locator
  readonly contactSection: Locator
  readonly emailLink: Locator
  readonly instagramLink: Locator
  readonly twitterLink: Locator
  readonly copyright: Locator

  constructor(page: Page) {
    this.page = page

    // Footer container
    this.footer = page.locator('footer')

    // Brand
    this.brandName = this.footer.locator('h3').filter({ hasText: 'K-Nomad' })

    // Sections
    this.aboutSection = this.footer.locator('div').filter({ has: page.locator('h3').filter({ hasText: 'K-Nomad' }) })
    this.contactSection = this.footer.locator('div').filter({ has: page.locator('h3').filter({ hasText: /contact/i }) })

    // Links
    this.emailLink = this.footer.locator('a[href^="mailto:"]')
    this.instagramLink = this.footer.locator('a').filter({ has: page.locator('svg') }).first()
    this.twitterLink = this.footer.locator('a').filter({ has: page.locator('svg') }).last()

    // Copyright
    this.copyright = this.footer.locator('p').filter({ hasText: /©|copyright/i })
  }

  /**
   * Get email address
   */
  async getEmailAddress(): Promise<string> {
    const href = await this.emailLink.getAttribute('href')
    return href?.replace('mailto:', '') || ''
  }

  /**
   * Check if footer is visible
   */
  async isVisible(): Promise<boolean> {
    return this.footer.isVisible()
  }

  /**
   * Get copyright text
   */
  async getCopyrightText(): Promise<string> {
    return (await this.copyright.textContent()) || ''
  }
}
