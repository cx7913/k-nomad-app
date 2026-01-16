import { test as base } from '@playwright/test'

/**
 * Locale fixture for internationalization E2E tests
 * Provides locale-specific test contexts
 */

export type Locale = 'ko' | 'en' | 'ja' | 'zh' | 'fr' | 'it' | 'es'

export type LocaleFixtures = {
  /** Available locales */
  locales: Locale[]
  /** Default locale */
  defaultLocale: Locale
  /** Navigate to a page with specific locale */
  gotoWithLocale: (path: string, locale: Locale) => Promise<void>
}

export const test = base.extend<LocaleFixtures>({
  // Available locales
  locales: async ({}, use) => {
    await use(['ko', 'en', 'ja', 'zh', 'fr', 'it', 'es'])
  },

  // Default locale
  defaultLocale: async ({}, use) => {
    await use('ko')
  },

  // Navigate with specific locale
  gotoWithLocale: async ({ page }, use) => {
    const gotoWithLocale = async (path: string, locale: Locale) => {
      const normalizedPath = path.startsWith('/') ? path : `/${path}`
      await page.goto(`/${locale}${normalizedPath}`)
    }
    await use(gotoWithLocale)
  },
})

export { expect } from '@playwright/test'

/**
 * Locale display names for assertions
 */
export const localeDisplayNames: Record<Locale, string> = {
  ko: '한국어',
  en: 'English',
  ja: '日本語',
  zh: '中文',
  fr: 'Français',
  it: 'Italiano',
  es: 'Español',
}

/**
 * Sample translated city names for assertion
 */
export const seoulTranslations: Record<Locale, string> = {
  ko: '서울',
  en: 'Seoul',
  ja: 'ソウル',
  zh: '首尔',
  fr: 'Séoul',
  it: 'Seul',
  es: 'Seúl',
}
