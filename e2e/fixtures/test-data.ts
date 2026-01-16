/**
 * Test data for E2E tests
 * Contains mock data and test constants
 */

/**
 * City IDs available in the application
 */
export const cityIds = [
  'seoul',
  'busan',
  'jeju',
  'gangneung',
  'jeonju',
  'daejeon',
  'daegu',
  'chuncheon',
  'yeosu',
  'yangyang',
] as const

export type CityId = (typeof cityIds)[number]

/**
 * Region options for filter testing
 */
export const regionOptions = [
  'all',
  'capital',
  'gyeongsang',
  'jeolla',
  'gangwon',
  'jeju',
  'chungcheong',
] as const

/**
 * Budget options for filter testing
 */
export const budgetOptions = ['all', 'under100', '100to200', 'over200'] as const

/**
 * Environment options for filter testing
 */
export const environmentOptions = ['all', 'nature', 'urban', 'cafe', 'coworking'] as const

/**
 * Season options for filter testing
 */
export const seasonOptions = ['all', 'spring', 'summer', 'fall', 'winter'] as const

/**
 * Test user data for authentication tests
 */
export const testUsers = {
  valid: {
    email: 'test@example.com',
    password: 'ValidPassword123!',
  },
  invalid: {
    email: 'invalid@example.com',
    password: 'wrongpassword',
  },
  newUser: {
    email: 'newuser@example.com',
    password: 'NewUserPassword123!',
  },
}

/**
 * Expected city counts by filter
 */
export const expectedCityCounts = {
  all: 10,
  byRegion: {
    capital: 1, // Seoul
    gyeongsang: 2, // Busan, Daegu
    jeolla: 2, // Jeonju, Yeosu
    gangwon: 3, // Gangneung, Chuncheon, Yangyang
    jeju: 1, // Jeju
    chungcheong: 1, // Daejeon
  },
  byBudget: {
    under100: 6, // gangneung, jeonju, daejeon, daegu, chuncheon, yeosu
    '100to200': 3, // busan, jeju, yangyang
    over200: 1, // seoul
  },
  byEnvironment: {
    nature: 5, // jeju, gangneung, chuncheon, yeosu, yangyang
    urban: 4, // seoul, busan, daejeon, daegu
    cafe: 5, // busan, jeju, gangneung, jeonju, yangyang
    coworking: 2, // seoul, daejeon
  },
  bySeason: {
    spring: 3, // seoul, jeju, daejeon
    summer: 4, // busan, gangneung, yeosu, yangyang
    fall: 5, // seoul, jeju, jeonju, daegu, chuncheon
    winter: 0, // none
  },
}

/**
 * Routes for navigation testing
 */
export const routes = {
  home: '/',
  cityDetail: (id: CityId) => `/cities/${id}`,
  login: '/login',
  register: '/register',
  forgotPassword: '/forgot-password',
  resetPassword: '/reset-password',
}

/**
 * Get localized route
 */
export const getLocalizedRoute = (route: string, locale: string = 'ko') => {
  return `/${locale}${route}`
}
