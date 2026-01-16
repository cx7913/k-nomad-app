import { Page, Locator, expect } from '@playwright/test'

/**
 * Wait utilities for E2E tests
 * Custom waiting functions for specific scenarios
 */

/**
 * Default timeouts
 */
export const TIMEOUTS = {
  SHORT: 2000,
  MEDIUM: 5000,
  LONG: 10000,
  NAVIGATION: 15000,
} as const

/**
 * Wait for element to be visible
 */
export async function waitForVisible(
  locator: Locator,
  timeout = TIMEOUTS.MEDIUM
): Promise<void> {
  await expect(locator).toBeVisible({ timeout })
}

/**
 * Wait for element to be hidden
 */
export async function waitForHidden(
  locator: Locator,
  timeout = TIMEOUTS.MEDIUM
): Promise<void> {
  await expect(locator).toBeHidden({ timeout })
}

/**
 * Wait for element to have specific text
 */
export async function waitForText(
  locator: Locator,
  text: string | RegExp,
  timeout = TIMEOUTS.MEDIUM
): Promise<void> {
  await expect(locator).toHaveText(text, { timeout })
}

/**
 * Wait for element to contain text
 */
export async function waitForContainsText(
  locator: Locator,
  text: string | RegExp,
  timeout = TIMEOUTS.MEDIUM
): Promise<void> {
  await expect(locator).toContainText(text, { timeout })
}

/**
 * Wait for URL to match pattern
 */
export async function waitForUrl(
  page: Page,
  pattern: string | RegExp,
  timeout = TIMEOUTS.NAVIGATION
): Promise<void> {
  await page.waitForURL(pattern, { timeout })
}

/**
 * Wait for URL to contain string
 */
export async function waitForUrlContains(
  page: Page,
  substring: string,
  timeout = TIMEOUTS.NAVIGATION
): Promise<void> {
  await page.waitForURL((url) => url.href.includes(substring), { timeout })
}

/**
 * Wait for element count
 */
export async function waitForCount(
  locator: Locator,
  count: number,
  timeout = TIMEOUTS.MEDIUM
): Promise<void> {
  await expect(locator).toHaveCount(count, { timeout })
}

/**
 * Wait for element count to be greater than
 */
export async function waitForCountGreaterThan(
  locator: Locator,
  minCount: number,
  timeout = TIMEOUTS.MEDIUM
): Promise<void> {
  await expect(async () => {
    const count = await locator.count()
    expect(count).toBeGreaterThan(minCount)
  }).toPass({ timeout })
}

/**
 * Wait for loading state to finish
 */
export async function waitForLoadingToFinish(
  page: Page,
  timeout = TIMEOUTS.LONG
): Promise<void> {
  // Wait for any loading spinners to disappear
  const loadingIndicators = page.locator('[class*="loading"], [class*="spinner"], .animate-pulse')

  // Only wait if there are loading indicators
  const count = await loadingIndicators.count()
  if (count > 0) {
    await expect(loadingIndicators.first()).toBeHidden({ timeout })
  }
}

/**
 * Wait for network to be idle
 */
export async function waitForNetworkIdle(
  page: Page,
  timeout = TIMEOUTS.LONG
): Promise<void> {
  await page.waitForLoadState('networkidle', { timeout })
}

/**
 * Wait for DOM content to be loaded
 */
export async function waitForDomContentLoaded(
  page: Page,
  timeout = TIMEOUTS.NAVIGATION
): Promise<void> {
  await page.waitForLoadState('domcontentloaded', { timeout })
}

/**
 * Wait for page to fully load
 */
export async function waitForFullLoad(
  page: Page,
  timeout = TIMEOUTS.NAVIGATION
): Promise<void> {
  await page.waitForLoadState('load', { timeout })
}

/**
 * Wait for element to be enabled
 */
export async function waitForEnabled(
  locator: Locator,
  timeout = TIMEOUTS.MEDIUM
): Promise<void> {
  await expect(locator).toBeEnabled({ timeout })
}

/**
 * Wait for element to be disabled
 */
export async function waitForDisabled(
  locator: Locator,
  timeout = TIMEOUTS.MEDIUM
): Promise<void> {
  await expect(locator).toBeDisabled({ timeout })
}

/**
 * Wait for input to have value
 */
export async function waitForInputValue(
  locator: Locator,
  value: string | RegExp,
  timeout = TIMEOUTS.MEDIUM
): Promise<void> {
  await expect(locator).toHaveValue(value, { timeout })
}

/**
 * Retry an action until it succeeds
 */
export async function retryAction<T>(
  action: () => Promise<T>,
  maxRetries = 3,
  delay = 1000
): Promise<T> {
  let lastError: Error | undefined

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await action()
    } catch (error) {
      lastError = error as Error
      if (i < maxRetries - 1) {
        await new Promise((resolve) => setTimeout(resolve, delay))
      }
    }
  }

  throw lastError
}

/**
 * Poll until condition is true
 */
export async function pollUntil(
  condition: () => Promise<boolean>,
  timeout = TIMEOUTS.LONG,
  interval = 100
): Promise<void> {
  const startTime = Date.now()

  while (Date.now() - startTime < timeout) {
    if (await condition()) {
      return
    }
    await new Promise((resolve) => setTimeout(resolve, interval))
  }

  throw new Error(`Condition not met within ${timeout}ms`)
}
