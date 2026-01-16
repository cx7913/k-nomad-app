import { test, expect } from '@playwright/test'
import { HomePage } from '../../pages/home.page'
import { HeaderComponent } from '../../pages/components/header.component'
import { FilterBarComponent } from '../../pages/components/filter-bar.component'
import { cityIds, expectedCityCounts } from '../../fixtures/test-data'

test.describe('Homepage', () => {
  let homePage: HomePage
  let header: HeaderComponent
  let filterBar: FilterBarComponent

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page, 'en')
    header = new HeaderComponent(page)
    filterBar = new FilterBarComponent(page)
    await homePage.goto()
  })

  test('should display logo in header', async () => {
    // Verify logo exists and is visible
    await expect(header.logo).toBeVisible()
    await expect(header.logo).toHaveText('K-Nomad')
  })

  test('should display city cards on homepage', async () => {
    // Verify city cards are displayed
    const cityCardCount = await homePage.getCityCardCount()
    expect(cityCardCount).toBeGreaterThan(0)

    // Verify city grid section exists
    await expect(homePage.cityGrid).toBeVisible()
  })

  test('should have no filters applied on initial visit', async () => {
    // Verify filter bar is visible
    await expect(filterBar.container).toBeVisible()

    // All 4 filters should show "All" as default value
    const budgetValue = await filterBar.budgetFilter.textContent()
    const regionValue = await filterBar.regionFilter.textContent()
    const environmentValue = await filterBar.environmentFilter.textContent()
    const seasonValue = await filterBar.seasonFilter.textContent()

    expect(budgetValue).toContain('All')
    expect(regionValue).toContain('All')
    expect(environmentValue).toContain('All')
    expect(seasonValue).toContain('All')
  })

  test('should display all cities from database when no filters applied', async () => {
    // Get the expected total city count from test data
    const expectedTotalCities = expectedCityCounts.all // 10 cities

    // Verify the displayed city count matches database count
    const displayedCityCount = await homePage.getCityCardCount()
    expect(displayedCityCount).toBe(expectedTotalCities)

    // Verify the result badge shows correct count
    const resultCount = await filterBar.getResultCount()
    expect(resultCount).toBe(expectedTotalCities)

    // Verify all city IDs from database are represented
    expect(cityIds.length).toBe(expectedTotalCities)
  })
})

test.describe('Homepage Filters', () => {
  let homePage: HomePage
  let filterBar: FilterBarComponent

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page, 'en')
    filterBar = new FilterBarComponent(page)
    await homePage.goto()
  })

  test.describe('Region Filter', () => {
    test('should filter cities by Capital region', async () => {
      await filterBar.selectRegion('Capital')

      const cityCount = await homePage.getCityCardCount()
      expect(cityCount).toBe(expectedCityCounts.byRegion.capital) // 1 city (Seoul)
    })

    test('should filter cities by Gangwon region', async () => {
      await filterBar.selectRegion('Gangwon')

      const cityCount = await homePage.getCityCardCount()
      expect(cityCount).toBe(expectedCityCounts.byRegion.gangwon) // 3 cities
    })

    test('should filter cities by Gyeongsang region', async () => {
      await filterBar.selectRegion('Gyeongsang')

      const cityCount = await homePage.getCityCardCount()
      expect(cityCount).toBe(expectedCityCounts.byRegion.gyeongsang) // 2 cities
    })

    test('should filter cities by Jeolla region', async () => {
      await filterBar.selectRegion('Jeolla')

      const cityCount = await homePage.getCityCardCount()
      expect(cityCount).toBe(expectedCityCounts.byRegion.jeolla) // 2 cities
    })

    test('should filter cities by Jeju region', async () => {
      await filterBar.selectRegion('Jeju')

      const cityCount = await homePage.getCityCardCount()
      expect(cityCount).toBe(expectedCityCounts.byRegion.jeju) // 1 city
    })

    test('should filter cities by Chungcheong region', async () => {
      await filterBar.selectRegion('Chungcheong')

      const cityCount = await homePage.getCityCardCount()
      expect(cityCount).toBe(expectedCityCounts.byRegion.chungcheong) // 1 city
    })
  })

  test.describe('Budget Filter', () => {
    test('should filter cities by Under ₩1M budget', async () => {
      await filterBar.selectBudget('Under')

      const cityCount = await homePage.getCityCardCount()
      expect(cityCount).toBe(expectedCityCounts.byBudget.under100) // 6 cities
    })

    test('should filter cities by ₩1M-₩2M budget', async () => {
      await filterBar.selectBudget('₩1M-₩2M')

      const cityCount = await homePage.getCityCardCount()
      expect(cityCount).toBe(expectedCityCounts.byBudget['100to200']) // 3 cities
    })

    test('should filter cities by Over ₩2M budget', async () => {
      await filterBar.selectBudget('Over')

      const cityCount = await homePage.getCityCardCount()
      expect(cityCount).toBe(expectedCityCounts.byBudget.over200) // 1 city (Seoul)
    })
  })

  test.describe('Environment Filter', () => {
    test('should filter cities by Nature Friendly environment', async () => {
      await filterBar.selectEnvironment('Nature')

      const cityCount = await homePage.getCityCardCount()
      expect(cityCount).toBe(expectedCityCounts.byEnvironment.nature) // 5 cities
    })

    test('should filter cities by Urban Preferred environment', async () => {
      await filterBar.selectEnvironment('Urban')

      const cityCount = await homePage.getCityCardCount()
      expect(cityCount).toBe(expectedCityCounts.byEnvironment.urban) // 4 cities
    })

    test('should filter cities by Cafe Work environment', async () => {
      await filterBar.selectEnvironment('Cafe')

      const cityCount = await homePage.getCityCardCount()
      expect(cityCount).toBe(expectedCityCounts.byEnvironment.cafe) // 5 cities
    })

    test('should filter cities by Coworking Space environment', async () => {
      await filterBar.selectEnvironment('Coworking')

      const cityCount = await homePage.getCityCardCount()
      expect(cityCount).toBe(expectedCityCounts.byEnvironment.coworking) // 2 cities
    })
  })

  test.describe('Season Filter', () => {
    test('should filter cities by Spring season', async () => {
      await filterBar.selectSeason('Spring')

      const cityCount = await homePage.getCityCardCount()
      expect(cityCount).toBe(expectedCityCounts.bySeason.spring) // 3 cities
    })

    test('should filter cities by Summer season', async () => {
      await filterBar.selectSeason('Summer')

      const cityCount = await homePage.getCityCardCount()
      expect(cityCount).toBe(expectedCityCounts.bySeason.summer) // 4 cities
    })

    test('should filter cities by Fall season', async () => {
      await filterBar.selectSeason('Fall')

      const cityCount = await homePage.getCityCardCount()
      expect(cityCount).toBe(expectedCityCounts.bySeason.fall) // 5 cities
    })

    test('should filter cities by Winter season', async () => {
      await filterBar.selectSeason('Winter')

      const cityCount = await homePage.getCityCardCount()
      expect(cityCount).toBe(expectedCityCounts.bySeason.winter) // 0 cities
    })
  })

  test.describe('Reset Filter', () => {
    test('should reset all filters and show all cities', async () => {
      // Apply a filter first
      await filterBar.selectRegion('Capital')
      let cityCount = await homePage.getCityCardCount()
      expect(cityCount).toBe(1)

      // Reset filters
      await filterBar.reset()

      // Verify all cities are shown again
      cityCount = await homePage.getCityCardCount()
      expect(cityCount).toBe(expectedCityCounts.all)

      // Verify filters are reset to "All"
      const regionValue = await filterBar.regionFilter.textContent()
      expect(regionValue).toContain('All')
    })
  })

  test.describe('Multiple Filters', () => {
    test('should apply multiple filters together', async ({ page }) => {
      // Apply region filter
      await filterBar.selectRegion('Gangwon')

      // Apply budget filter - Under ₩1M
      await filterBar.selectBudget('Under')

      // Gangwon + Under ₩1M should show: Gangneung, Chuncheon (2 cities)
      // Yangyang is ₩1M-₩2M so it should be filtered out
      const cityCount = await homePage.getCityCardCount()
      expect(cityCount).toBe(2)
    })
  })
})
