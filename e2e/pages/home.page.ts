import { Page, Locator } from '@playwright/test'
import { BasePage } from './base.page'

/**
 * Home Page Object
 * Encapsulates home page elements and actions
 */
export class HomePage extends BasePage {
  // Hero Section
  readonly heroBadge: Locator
  readonly heroTitle: Locator
  readonly heroSubtitle: Locator
  readonly ctaButton: Locator
  readonly statsSection: Locator

  // Filter Bar
  readonly filterBar: Locator
  readonly budgetFilter: Locator
  readonly regionFilter: Locator
  readonly environmentFilter: Locator
  readonly seasonFilter: Locator
  readonly resetButton: Locator
  readonly resultCountBadge: Locator

  // City Grid
  readonly cityGrid: Locator
  readonly cityCards: Locator

  constructor(page: Page, locale: string = 'ko') {
    super(page, locale)

    // Hero Section
    this.heroBadge = page.locator('section').first().locator('.rounded-full')
    this.heroTitle = page.locator('h1')
    this.heroSubtitle = page.locator('h1 + p')
    this.ctaButton = page.locator('section').first().locator('button')
    this.statsSection = page.locator('section').first().locator('.grid-cols-3')

    // Filter Bar
    this.filterBar = page.locator('section.sticky')
    this.budgetFilter = this.filterBar.locator('button[role="combobox"]').nth(0)
    this.regionFilter = this.filterBar.locator('button[role="combobox"]').nth(1)
    this.environmentFilter = this.filterBar.locator('button[role="combobox"]').nth(2)
    this.seasonFilter = this.filterBar.locator('button[role="combobox"]').nth(3)
    this.resetButton = this.filterBar.locator('button').filter({ hasText: /reset|초기화/i })
    this.resultCountBadge = this.filterBar.locator('.inline-flex, [class*="badge"]').last()

    // City Grid
    this.cityGrid = page.locator('#city-grid')
    this.cityCards = page.locator('[class*="card"]').filter({ has: page.locator('img') })
  }

  /**
   * Navigate to home page
   */
  async goto(): Promise<void> {
    await super.goto('')
    await this.waitForPageLoad()
  }

  /**
   * Select a filter option
   */
  async selectFilter(
    filterType: 'budget' | 'region' | 'environment' | 'season',
    value: string
  ): Promise<void> {
    const filterLocator = {
      budget: this.budgetFilter,
      region: this.regionFilter,
      environment: this.environmentFilter,
      season: this.seasonFilter,
    }[filterType]

    await filterLocator.click()
    await this.page.locator(`[role="option"]`).filter({ hasText: new RegExp(value, 'i') }).click()
  }

  /**
   * Reset all filters
   */
  async resetFilters(): Promise<void> {
    await this.resetButton.click()
  }

  /**
   * Get the number of displayed city cards
   */
  async getCityCardCount(): Promise<number> {
    return this.cityCards.count()
  }

  /**
   * Click on a city card by index
   */
  async clickCityCard(index: number): Promise<void> {
    await this.cityCards.nth(index).click()
  }

  /**
   * Click on a city card by city name
   */
  async clickCityByName(cityName: string): Promise<void> {
    await this.cityCards.filter({ hasText: cityName }).first().click()
  }

  /**
   * Scroll to city grid
   */
  async scrollToCityGrid(): Promise<void> {
    await this.ctaButton.click()
  }

  /**
   * Get result count from badge
   */
  async getResultCount(): Promise<number> {
    const text = await this.resultCountBadge.textContent()
    const match = text?.match(/\d+/)
    return match ? parseInt(match[0], 10) : 0
  }
}
