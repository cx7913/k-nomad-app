import { Page, expect } from '@playwright/test'

/**
 * Common helper functions for E2E tests
 */

/**
 * Wait for network to be idle
 */
export async function waitForNetworkIdle(page: Page, timeout = 5000): Promise<void> {
  await page.waitForLoadState('networkidle', { timeout })
}

/**
 * Wait for page navigation to complete
 */
export async function waitForNavigation(page: Page, urlPattern: RegExp): Promise<void> {
  await page.waitForURL(urlPattern)
}

/**
 * Clear local storage
 */
export async function clearLocalStorage(page: Page): Promise<void> {
  await page.evaluate(() => localStorage.clear())
}

/**
 * Clear session storage
 */
export async function clearSessionStorage(page: Page): Promise<void> {
  await page.evaluate(() => sessionStorage.clear())
}

/**
 * Clear all storage (local + session)
 */
export async function clearAllStorage(page: Page): Promise<void> {
  await clearLocalStorage(page)
  await clearSessionStorage(page)
}

/**
 * Get local storage item
 */
export async function getLocalStorageItem(page: Page, key: string): Promise<string | null> {
  return page.evaluate((k) => localStorage.getItem(k), key)
}

/**
 * Set local storage item
 */
export async function setLocalStorageItem(page: Page, key: string, value: string): Promise<void> {
  await page.evaluate(({ k, v }) => localStorage.setItem(k, v), { k: key, v: value })
}

/**
 * Scroll element into view
 */
export async function scrollIntoView(page: Page, selector: string): Promise<void> {
  await page.locator(selector).scrollIntoViewIfNeeded()
}

/**
 * Take a full page screenshot
 */
export async function takeFullPageScreenshot(page: Page, name: string): Promise<void> {
  await page.screenshot({ path: `e2e/screenshots/${name}.png`, fullPage: true })
}

/**
 * Wait for toast/notification to appear and disappear
 */
export async function waitForToast(page: Page, text: string, timeout = 5000): Promise<void> {
  const toast = page.locator(`text=${text}`)
  await expect(toast).toBeVisible({ timeout })
  await expect(toast).toBeHidden({ timeout: timeout + 2000 })
}

/**
 * Generate random email for testing
 */
export function generateRandomEmail(): string {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(7)
  return `test-${timestamp}-${random}@example.com`
}

/**
 * Generate random password for testing
 */
export function generateRandomPassword(length = 12): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%'
  let password = ''
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return password
}

/**
 * Wait for specific amount of time (use sparingly)
 */
export async function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Check if element has specific class
 */
export async function hasClass(page: Page, selector: string, className: string): Promise<boolean> {
  const element = page.locator(selector)
  const classes = await element.getAttribute('class')
  return classes?.includes(className) ?? false
}

/**
 * Get viewport size
 */
export async function getViewportSize(page: Page): Promise<{ width: number; height: number } | null> {
  return page.viewportSize()
}

/**
 * Check if device is mobile based on viewport
 */
export async function isMobileViewport(page: Page): Promise<boolean> {
  const viewport = await getViewportSize(page)
  return viewport ? viewport.width < 768 : false
}
