import { test, expect } from '@playwright/test'
import { CityDetailPage } from '../../pages/city-detail.page'
import { HomePage } from '../../pages/home.page'
import { HeaderComponent } from '../../pages/components/header.component'
import { cityIds } from '../../fixtures/test-data'

test.describe('City Detail Page', () => {
  let cityDetailPage: CityDetailPage
  let header: HeaderComponent

  test.beforeEach(async ({ page }) => {
    cityDetailPage = new CityDetailPage(page, 'en')
    header = new HeaderComponent(page)
  })

  test.describe('Basic Elements', () => {
    test('should display city name and description', async () => {
      await cityDetailPage.goto('seoul')

      // Verify city name is displayed
      await expect(cityDetailPage.cityName).toBeVisible()
      await expect(cityDetailPage.cityName).toHaveText('Seoul')

      // Verify description is displayed
      await expect(cityDetailPage.cityDescription).toBeVisible()
    })

    test('should display city image', async () => {
      await cityDetailPage.goto('seoul')

      await expect(cityDetailPage.heroImage).toBeVisible()
    })

    test('should display logo in header', async () => {
      await cityDetailPage.goto('seoul')

      await expect(header.logo).toBeVisible()
      await expect(header.logo).toHaveText('K-Nomad')
    })

    test('should display detailed description section', async ({ page }) => {
      await cityDetailPage.goto('seoul')

      // Verify detailed description section exists
      const detailedSection = page.locator('text=상세 소개')
      await expect(detailedSection).toBeVisible()
    })

    test('should display highlights section with items', async ({ page }) => {
      await cityDetailPage.goto('seoul')

      // Verify highlights section exists
      const highlightsSection = page.locator('text=주요 특징')
      await expect(highlightsSection).toBeVisible()

      // Verify there are highlight items
      const highlightItems = page.locator('ul li')
      const count = await highlightItems.count()
      expect(count).toBeGreaterThan(0)
    })
  })

  test.describe('City Information Cards', () => {
    test('should display monthly cost information', async ({ page }) => {
      await cityDetailPage.goto('seoul')

      const monthlyCost = page.locator('text=Monthly Cost')
      await expect(monthlyCost).toBeVisible()

      // Seoul should show "Over ₩2M" budget
      const budgetBadge = page.locator('text=Over ₩2M')
      await expect(budgetBadge).toBeVisible()
    })

    test('should display region information', async ({ page }) => {
      await cityDetailPage.goto('seoul')

      const region = page.locator('text=Region')
      await expect(region).toBeVisible()

      // Seoul should show "Capital Area"
      const regionValue = page.locator('text=Capital Area')
      await expect(regionValue).toBeVisible()
    })

    test('should display environment information', async ({ page }) => {
      await cityDetailPage.goto('seoul')

      // Use more specific selector to avoid matching text in description
      const environment = page.getByText('Environment', { exact: true }).first()
      await expect(environment).toBeVisible()

      // Seoul should show "Urban Preferred" and "Coworking Space"
      await expect(page.getByText('Urban Preferred', { exact: true })).toBeVisible()
      await expect(page.getByText('Coworking Space', { exact: true })).toBeVisible()
    })

    test('should display best season information', async ({ page }) => {
      await cityDetailPage.goto('seoul')

      const season = page.locator('text=Best Season')
      await expect(season).toBeVisible()

      // Seoul should show "Spring" and "Fall"
      await expect(page.locator('text=Spring')).toBeVisible()
      await expect(page.locator('text=Fall')).toBeVisible()
    })
  })

  test.describe('Like/Dislike Functionality', () => {
    test('should display like and dislike buttons with counts', async ({ page }) => {
      await cityDetailPage.goto('seoul')

      // Verify like button is visible with count
      const likeButton = page.locator('button').filter({ hasText: '256' })
      await expect(likeButton).toBeVisible()

      // Verify dislike button is visible with count
      const dislikeButton = page.locator('button').filter({ hasText: '12' })
      await expect(dislikeButton).toBeVisible()
    })
  })

  test.describe('Related Cities Section', () => {
    test('should display related cities section', async ({ page }) => {
      await cityDetailPage.goto('seoul')

      // Verify related cities section exists
      const relatedSection = page.locator('h2').filter({ hasText: '추천 도시' })
      await expect(relatedSection).toBeVisible()
    })

    test('should display related city cards', async ({ page }) => {
      await cityDetailPage.goto('seoul')

      // Verify there are related city cards (should be 4)
      const relatedCards = page.locator('a[href*="/cities/"]').filter({ has: page.locator('img') })
      // Exclude the current city, so we check for related ones
      const count = await relatedCards.count()
      expect(count).toBeGreaterThanOrEqual(4)
    })

    test('should navigate to related city when clicked', async ({ page }) => {
      await cityDetailPage.goto('seoul')

      // Click on the first related city (Daejeon)
      const firstRelatedCity = page.locator('a[href*="/cities/daejeon"]').first()
      await firstRelatedCity.click()

      // Verify navigation to Daejeon page
      await expect(page).toHaveURL(/\/cities\/daejeon/)
      await expect(page.locator('h1')).toHaveText('Daejeon')
    })
  })

  test.describe('Navigation', () => {
    test('should navigate back to home when clicking back button', async ({ page }) => {
      await cityDetailPage.goto('seoul')

      // Click back button
      const backButton = page.locator('button').filter({ hasText: 'Back to List' })
      await backButton.click()

      // Verify navigation to home page
      await expect(page).toHaveURL(/\/en\/?$/)
    })

    test('should navigate back to home when clicking logo', async ({ page }) => {
      await cityDetailPage.goto('seoul')

      // Click logo
      await header.clickLogo()

      // Verify navigation to home page
      await expect(page).toHaveURL(/\/en\/?$/)
    })
  })

  test.describe('Different Cities', () => {
    test('should display correct information for Jeju', async ({ page }) => {
      await cityDetailPage.goto('jeju')

      await expect(cityDetailPage.cityName).toHaveText('Jeju')
      await expect(page.locator('text=₩1M-₩2M')).toBeVisible()
      await expect(page.locator('text=Nature Friendly')).toBeVisible()
    })

    test('should display correct information for Busan', async ({ page }) => {
      await cityDetailPage.goto('busan')

      await expect(cityDetailPage.cityName).toHaveText('Busan')
      // Use first() to avoid matching related cities with same region
      await expect(page.getByText('Gyeongsang').first()).toBeVisible()
      await expect(page.getByText('Summer', { exact: true }).first()).toBeVisible()
    })

    test('should display correct information for Gangneung', async ({ page }) => {
      await cityDetailPage.goto('gangneung')

      await expect(cityDetailPage.cityName).toHaveText('Gangneung')
      // Use first() to avoid matching related cities with same region
      await expect(page.getByText('Gangwon').first()).toBeVisible()
      await expect(page.getByText('Under ₩1M', { exact: true }).first()).toBeVisible()
    })
  })

  test.describe('Page Access from Homepage', () => {
    test('should navigate to city detail when clicking city card on homepage', async ({ page }) => {
      const homePage = new HomePage(page, 'en')
      await homePage.goto()

      // Click on Seoul city card
      await homePage.clickCityByName('Seoul')

      // Verify navigation to Seoul detail page
      await expect(page).toHaveURL(/\/cities\/seoul/)
      await expect(page.locator('h1')).toHaveText('Seoul')
    })
  })
})
