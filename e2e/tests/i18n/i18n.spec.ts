import { test, expect, localeDisplayNames, seoulTranslations, Locale } from '../../fixtures/locale.fixture'

/**
 * Translated texts for each locale
 */
const translations = {
  hero: {
    ko: '대한민국 디지털 노마드 가이드',
    en: 'Korean Digital Nomad Guide',
    ja: '韓国デジタルノマドガイド',
    zh: '韩国数字游民指南',
    fr: 'Guide pour nomades numériques en Corée',
    it: 'Guida per nomadi digitali in Corea',
    es: 'Guía para nómadas digitales en Corea',
  },
  exploreCities: {
    ko: '도시 탐색하기',
    en: 'Explore Cities',
    ja: '都市を探す',
    zh: '探索城市',
    fr: 'Explorer les villes',
    it: 'Esplora città',
    es: 'Explorar ciudades',
  },
  login: {
    ko: '로그인',
    en: 'Log in',
    ja: 'ログイン',
    zh: '登录',
    fr: 'Connexion',
    it: 'Accedi',
    es: 'Iniciar sesión',
  },
  signup: {
    ko: '회원가입',
    en: 'Sign up',
    ja: '新規登録',
    zh: '注册',
    fr: "S'inscrire",
    it: 'Iscriviti',
    es: 'Registrarse',
  },
  reset: {
    ko: '초기화',
    en: 'Reset',
    ja: 'リセット',
    zh: '重置',
    fr: 'Réinitialiser',
    it: 'Reimposta',
    es: 'Restablecer',
  },
}

test.describe('Internationalization (i18n)', () => {
  test.describe('Locale Access', () => {
    const locales: Locale[] = ['ko', 'en', 'ja', 'zh', 'fr', 'it', 'es']

    for (const locale of locales) {
      test(`should access homepage with ${locale} locale`, async ({ page, gotoWithLocale }) => {
        await gotoWithLocale('/', locale)

        // Verify URL contains locale
        await expect(page).toHaveURL(new RegExp(`/${locale}/?$`))

        // Verify page loads with content
        await expect(page.locator('h1')).toBeVisible()
      })
    }
  })

  test.describe('Hero Section Translations', () => {
    const locales: Locale[] = ['ko', 'en', 'ja', 'zh', 'fr', 'it', 'es']

    for (const locale of locales) {
      test(`should display hero badge in ${locale}`, async ({ page, gotoWithLocale }) => {
        await gotoWithLocale('/', locale)

        const heroBadge = page.getByText(translations.hero[locale])
        await expect(heroBadge).toBeVisible()
      })
    }
  })

  test.describe('Button Translations', () => {
    test('should display Korean buttons on Korean locale', async ({ page, gotoWithLocale }) => {
      await gotoWithLocale('/', 'ko')

      // Check explore button
      const exploreButton = page.getByRole('button', { name: translations.exploreCities.ko })
      await expect(exploreButton).toBeVisible()

      // Check reset button
      const resetButton = page.getByRole('button', { name: translations.reset.ko })
      await expect(resetButton).toBeVisible()
    })

    test('should display English buttons on English locale', async ({ page, gotoWithLocale }) => {
      await gotoWithLocale('/', 'en')

      // Check explore button
      const exploreButton = page.getByRole('button', { name: translations.exploreCities.en })
      await expect(exploreButton).toBeVisible()

      // Check reset button
      const resetButton = page.getByRole('button', { name: translations.reset.en })
      await expect(resetButton).toBeVisible()
    })

    test('should display Japanese buttons on Japanese locale', async ({ page, gotoWithLocale }) => {
      await gotoWithLocale('/', 'ja')

      const exploreButton = page.getByRole('button', { name: translations.exploreCities.ja })
      await expect(exploreButton).toBeVisible()
    })
  })

  test.describe('Header Translations', () => {
    test('should display Korean header links', async ({ page, gotoWithLocale }) => {
      await gotoWithLocale('/', 'ko')

      const loginLink = page.getByRole('banner').getByRole('link', { name: translations.login.ko })
      const signupLink = page.getByRole('banner').getByRole('link', { name: translations.signup.ko })

      await expect(loginLink).toBeVisible()
      await expect(signupLink).toBeVisible()
    })

    test('should display English header links', async ({ page, gotoWithLocale }) => {
      await gotoWithLocale('/', 'en')

      const loginLink = page.getByRole('banner').getByRole('link', { name: translations.login.en })
      const signupLink = page.getByRole('banner').getByRole('link', { name: translations.signup.en })

      await expect(loginLink).toBeVisible()
      await expect(signupLink).toBeVisible()
    })
  })

  test.describe('City Name Translations', () => {
    test('should display Seoul in Korean on Korean locale', async ({ page, gotoWithLocale }) => {
      await gotoWithLocale('/cities/seoul', 'ko')

      await expect(page.locator('h1')).toHaveText(seoulTranslations.ko)
    })

    test('should display Seoul in English on English locale', async ({ page, gotoWithLocale }) => {
      await gotoWithLocale('/cities/seoul', 'en')

      await expect(page.locator('h1')).toHaveText(seoulTranslations.en)
    })

    test('should display Seoul in Japanese on Japanese locale', async ({ page, gotoWithLocale }) => {
      await gotoWithLocale('/cities/seoul', 'ja')

      await expect(page.locator('h1')).toHaveText(seoulTranslations.ja)
    })

    test('should display Seoul in Chinese on Chinese locale', async ({ page, gotoWithLocale }) => {
      await gotoWithLocale('/cities/seoul', 'zh')

      await expect(page.locator('h1')).toHaveText(seoulTranslations.zh)
    })

    test('should display Seoul in French on French locale', async ({ page, gotoWithLocale }) => {
      await gotoWithLocale('/cities/seoul', 'fr')

      await expect(page.locator('h1')).toHaveText(seoulTranslations.fr)
    })

    test('should display Seoul in Italian on Italian locale', async ({ page, gotoWithLocale }) => {
      await gotoWithLocale('/cities/seoul', 'it')

      await expect(page.locator('h1')).toHaveText(seoulTranslations.it)
    })

    test('should display Seoul in Spanish on Spanish locale', async ({ page, gotoWithLocale }) => {
      await gotoWithLocale('/cities/seoul', 'es')

      await expect(page.locator('h1')).toHaveText(seoulTranslations.es)
    })
  })

  test.describe('Language Switcher', () => {
    test('should display language switcher in header', async ({ page, gotoWithLocale }) => {
      await gotoWithLocale('/', 'en')

      // Language switcher combobox
      const languageSwitcher = page.getByRole('banner').getByRole('combobox')
      await expect(languageSwitcher).toBeVisible()
    })

    test('should switch from English to Korean', async ({ page, gotoWithLocale }) => {
      await gotoWithLocale('/', 'en')

      // Open language switcher
      const languageSwitcher = page.getByRole('banner').getByRole('combobox')
      await languageSwitcher.click()

      // Select Korean
      const koreanOption = page.getByRole('option', { name: '한국어' })
      await koreanOption.click()

      // Verify URL changed to Korean
      await expect(page).toHaveURL(/\/ko\/?$/)

      // Verify Korean content
      const heroBadge = page.getByText(translations.hero.ko)
      await expect(heroBadge).toBeVisible()
    })

    test('should switch from Korean to English', async ({ page, gotoWithLocale }) => {
      await gotoWithLocale('/', 'ko')

      // Open language switcher
      const languageSwitcher = page.getByRole('banner').getByRole('combobox')
      await languageSwitcher.click()

      // Select English
      const englishOption = page.getByRole('option', { name: 'English' })
      await englishOption.click()

      // Verify URL changed to English
      await expect(page).toHaveURL(/\/en\/?$/)

      // Verify English content
      const heroBadge = page.getByText(translations.hero.en)
      await expect(heroBadge).toBeVisible()
    })

    test('should switch from English to Japanese', async ({ page, gotoWithLocale }) => {
      await gotoWithLocale('/', 'en')

      // Open language switcher
      const languageSwitcher = page.getByRole('banner').getByRole('combobox')
      await languageSwitcher.click()

      // Select Japanese
      const japaneseOption = page.getByRole('option', { name: '日本語' })
      await japaneseOption.click()

      // Verify URL changed to Japanese
      await expect(page).toHaveURL(/\/ja\/?$/)
    })
  })

  test.describe('URL Locale Persistence', () => {
    test('should maintain locale when navigating to city detail', async ({ page, gotoWithLocale }) => {
      await gotoWithLocale('/', 'ko')

      // Click on Seoul city card
      await page.getByRole('link', { name: seoulTranslations.ko }).first().click()

      // Verify locale is maintained in URL
      await expect(page).toHaveURL(/\/ko\/cities\/seoul/)

      // Verify content is in Korean
      await expect(page.locator('h1')).toHaveText(seoulTranslations.ko)
    })

    test('should maintain locale when navigating to login page', async ({ page, gotoWithLocale }) => {
      await gotoWithLocale('/', 'en')

      // Click login link
      const loginLink = page.getByRole('banner').getByRole('link', { name: 'Log in' })
      await loginLink.click()

      // Verify locale is maintained in URL
      await expect(page).toHaveURL(/\/en\/login/)
    })
  })

  test.describe('Login Page Translations', () => {
    test('should display Korean login page', async ({ page, gotoWithLocale }) => {
      await gotoWithLocale('/login', 'ko')

      await expect(page.locator('h1')).toHaveText('로그인')
    })

    test('should display English login page', async ({ page, gotoWithLocale }) => {
      await gotoWithLocale('/login', 'en')

      await expect(page.locator('h1')).toHaveText('Log In')
    })
  })

  test.describe('Register Page Translations', () => {
    test('should display Korean register page', async ({ page, gotoWithLocale }) => {
      await gotoWithLocale('/register', 'ko')

      await expect(page.locator('h1')).toHaveText('회원가입')
    })

    test('should display English register page', async ({ page, gotoWithLocale }) => {
      await gotoWithLocale('/register', 'en')

      await expect(page.locator('h1')).toHaveText('Sign Up')
    })
  })
})
