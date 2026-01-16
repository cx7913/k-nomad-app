import { Page, Locator } from '@playwright/test'
import { BasePage } from './base.page'

/**
 * City Detail Page Object
 * Encapsulates city detail page elements and actions
 */
export class CityDetailPage extends BasePage {
  // Hero Section
  readonly heroImage: Locator
  readonly cityName: Locator
  readonly cityDescription: Locator

  // Like/Dislike Section
  readonly likeButton: Locator
  readonly dislikeButton: Locator
  readonly likeCount: Locator
  readonly dislikeCount: Locator

  // City Info
  readonly detailedDescription: Locator
  readonly highlights: Locator
  readonly infoCards: Locator

  // Share Button
  readonly shareButton: Locator

  // Related Cities
  readonly relatedCitiesSection: Locator
  readonly relatedCityCards: Locator

  constructor(page: Page, locale: string = 'ko') {
    super(page, locale)

    // Hero Section
    this.heroImage = page.locator('img').first()
    this.cityName = page.locator('h1')
    this.cityDescription = page.locator('h1 + p, h1 ~ p').first()

    // Like/Dislike - look for buttons with thumbs icons
    this.likeButton = page.locator('button').filter({ has: page.locator('[class*="thumbs-up"], svg') }).first()
    this.dislikeButton = page.locator('button').filter({ has: page.locator('[class*="thumbs-down"], svg') }).last()
    this.likeCount = this.likeButton.locator('span')
    this.dislikeCount = this.dislikeButton.locator('span')

    // City Info
    this.detailedDescription = page.locator('[class*="description"], .prose, p').filter({ hasText: /.{100,}/ })
    this.highlights = page.locator('ul li, [class*="highlight"]')
    this.infoCards = page.locator('[class*="card"]').filter({ has: page.locator('h3, h4') })

    // Share Button
    this.shareButton = page.locator('button').filter({ hasText: /share|공유/i })

    // Related Cities
    this.relatedCitiesSection = page.locator('h2').filter({ hasText: /추천|related|recommend/i }).locator('..')
    this.relatedCityCards = page.locator('a[href*="/cities/"]').filter({ has: page.locator('img') })
  }

  /**
   * Navigate to city detail page
   */
  async goto(cityId: string): Promise<void> {
    await super.goto(`cities/${cityId}`)
    await this.waitForPageLoad()
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
   * Get current like count
   */
  async getLikeCount(): Promise<number> {
    const text = await this.likeCount.textContent()
    return parseInt(text || '0', 10)
  }

  /**
   * Get current dislike count
   */
  async getDislikeCount(): Promise<number> {
    const text = await this.dislikeCount.textContent()
    return parseInt(text || '0', 10)
  }

  /**
   * Click share button
   */
  async clickShare(): Promise<void> {
    await this.shareButton.click()
  }

  /**
   * Check if share confirmation is visible
   */
  async isShareConfirmationVisible(): Promise<boolean> {
    const confirmText = this.page.locator('text=/복사|copied/i')
    return confirmText.isVisible()
  }

  /**
   * Get highlights list
   */
  async getHighlights(): Promise<string[]> {
    const highlights = await this.highlights.allTextContents()
    return highlights.filter((h) => h.trim().length > 0)
  }

  /**
   * Click on a related city
   */
  async clickRelatedCity(index: number): Promise<void> {
    await this.relatedCityCards.nth(index).click()
  }

  /**
   * Get related cities count
   */
  async getRelatedCitiesCount(): Promise<number> {
    return this.relatedCityCards.count()
  }
}
