import { Page, Locator } from '@playwright/test'

/**
 * City Card Component Object
 * Encapsulates city card elements and actions
 */
export class CityCardComponent {
  readonly page: Page
  readonly card: Locator

  // Elements
  readonly image: Locator
  readonly regionBadge: Locator
  readonly cityName: Locator
  readonly description: Locator
  readonly budgetInfo: Locator
  readonly environmentInfo: Locator
  readonly seasonInfo: Locator
  readonly likeButton: Locator
  readonly dislikeButton: Locator
  readonly likeCount: Locator
  readonly dislikeCount: Locator
  readonly link: Locator

  constructor(page: Page, cardLocator: Locator) {
    this.page = page
    this.card = cardLocator

    // Image
    this.image = this.card.locator('img')

    // Region badge
    this.regionBadge = this.card.locator('[class*="badge"]').first()

    // City info
    this.cityName = this.card.locator('h3')
    this.description = this.card.locator('p').first()

    // Details
    this.budgetInfo = this.card.locator('div').filter({ hasText: /budget|예산/i })
    this.environmentInfo = this.card.locator('div').filter({ hasText: /environment|환경/i })
    this.seasonInfo = this.card.locator('div').filter({ hasText: /season|계절/i })

    // Like/Dislike buttons
    this.likeButton = this.card.locator('button').first()
    this.dislikeButton = this.card.locator('button').last()
    this.likeCount = this.likeButton.locator('span')
    this.dislikeCount = this.dislikeButton.locator('span')

    // Link
    this.link = this.card.locator('a').first()
  }

  /**
   * Click the card to navigate to detail page
   */
  async click(): Promise<void> {
    await this.link.click()
  }

  /**
   * Get city name
   */
  async getCityName(): Promise<string> {
    return (await this.cityName.textContent()) || ''
  }

  /**
   * Get description
   */
  async getDescription(): Promise<string> {
    return (await this.description.textContent()) || ''
  }

  /**
   * Get like count
   */
  async getLikeCount(): Promise<number> {
    const text = await this.likeCount.textContent()
    return parseInt(text || '0', 10)
  }

  /**
   * Get dislike count
   */
  async getDislikeCount(): Promise<number> {
    const text = await this.dislikeCount.textContent()
    return parseInt(text || '0', 10)
  }

  /**
   * Click like button
   */
  async clickLike(): Promise<void> {
    await this.likeButton.click()
  }

  /**
   * Click dislike button
   */
  async clickDislike(): Promise<void> {
    await this.dislikeButton.click()
  }

  /**
   * Get the href of the card link
   */
  async getHref(): Promise<string> {
    return (await this.link.getAttribute('href')) || ''
  }

  /**
   * Check if image is loaded
   */
  async isImageLoaded(): Promise<boolean> {
    return this.image.isVisible()
  }
}

/**
 * Factory function to create CityCardComponent for a specific card
 */
export function createCityCardComponent(page: Page, index: number): CityCardComponent {
  const cardLocator = page.locator('[class*="card"]').filter({ has: page.locator('img') }).nth(index)
  return new CityCardComponent(page, cardLocator)
}

/**
 * Factory function to create CityCardComponent by city name
 */
export function createCityCardByName(page: Page, cityName: string): CityCardComponent {
  const cardLocator = page.locator('[class*="card"]').filter({ hasText: cityName }).first()
  return new CityCardComponent(page, cardLocator)
}
