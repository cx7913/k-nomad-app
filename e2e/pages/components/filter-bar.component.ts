import { Page, Locator } from '@playwright/test'

/**
 * Filter Bar Component Object
 * Encapsulates filter bar elements and actions
 */
export class FilterBarComponent {
  readonly page: Page

  // Elements
  readonly container: Locator
  readonly budgetFilter: Locator
  readonly regionFilter: Locator
  readonly environmentFilter: Locator
  readonly seasonFilter: Locator
  readonly resetButton: Locator
  readonly resultBadge: Locator

  constructor(page: Page) {
    this.page = page

    // Container
    this.container = page.locator('section.sticky')

    // Filters (Select dropdowns)
    const filters = this.container.locator('button[role="combobox"]')
    this.budgetFilter = filters.nth(0)
    this.regionFilter = filters.nth(1)
    this.environmentFilter = filters.nth(2)
    this.seasonFilter = filters.nth(3)

    // Reset button
    this.resetButton = this.container.locator('button').filter({ hasText: /reset|초기화/i })

    // Result count badge
    this.resultBadge = this.container.locator('[class*="badge"], .inline-flex').last()
  }

  /**
   * Select budget option
   */
  async selectBudget(value: string): Promise<void> {
    await this.budgetFilter.click()
    await this.page.locator('[role="option"]').filter({ hasText: new RegExp(value, 'i') }).click()
  }

  /**
   * Select region option
   */
  async selectRegion(value: string): Promise<void> {
    await this.regionFilter.click()
    await this.page.locator('[role="option"]').filter({ hasText: new RegExp(value, 'i') }).click()
  }

  /**
   * Select environment option
   */
  async selectEnvironment(value: string): Promise<void> {
    await this.environmentFilter.click()
    await this.page.locator('[role="option"]').filter({ hasText: new RegExp(value, 'i') }).click()
  }

  /**
   * Select season option
   */
  async selectSeason(value: string): Promise<void> {
    await this.seasonFilter.click()
    await this.page.locator('[role="option"]').filter({ hasText: new RegExp(value, 'i') }).click()
  }

  /**
   * Reset all filters
   */
  async reset(): Promise<void> {
    await this.resetButton.click()
  }

  /**
   * Get result count
   */
  async getResultCount(): Promise<number> {
    const text = await this.resultBadge.textContent()
    const match = text?.match(/\d+/)
    return match ? parseInt(match[0], 10) : 0
  }

  /**
   * Check if filter bar is visible
   */
  async isVisible(): Promise<boolean> {
    return this.container.isVisible()
  }

  /**
   * Get current budget filter value
   */
  async getCurrentBudgetValue(): Promise<string> {
    return (await this.budgetFilter.textContent()) || ''
  }

  /**
   * Get current region filter value
   */
  async getCurrentRegionValue(): Promise<string> {
    return (await this.regionFilter.textContent()) || ''
  }
}
