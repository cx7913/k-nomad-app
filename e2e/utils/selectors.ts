/**
 * Common selectors used across E2E tests
 * Centralized for easy maintenance
 */

/**
 * Header selectors
 */
export const headerSelectors = {
  container: 'header',
  logo: 'header a:has-text("K-Nomad")',
  languageSwitcher: 'header button[role="combobox"]',
  loginButton: 'header a[href*="login"]',
  signupButton: 'header a[href*="register"]',
  logoutButton: 'header button:has-text(/logout|로그아웃/i)',
} as const

/**
 * Footer selectors
 */
export const footerSelectors = {
  container: 'footer',
  brandName: 'footer h3:has-text("K-Nomad")',
  emailLink: 'footer a[href^="mailto:"]',
  copyright: 'footer p:has-text(/©|copyright/i)',
} as const

/**
 * Hero section selectors
 */
export const heroSelectors = {
  container: 'section:first-child',
  badge: 'section:first-child .rounded-full',
  title: 'h1',
  subtitle: 'h1 + p',
  ctaButton: 'section:first-child button',
  stats: 'section:first-child .grid-cols-3',
} as const

/**
 * Filter bar selectors
 */
export const filterBarSelectors = {
  container: 'section.sticky',
  budgetFilter: 'section.sticky button[role="combobox"]:nth-child(1)',
  regionFilter: 'section.sticky button[role="combobox"]:nth-child(2)',
  environmentFilter: 'section.sticky button[role="combobox"]:nth-child(3)',
  seasonFilter: 'section.sticky button[role="combobox"]:nth-child(4)',
  resetButton: 'section.sticky button:has-text(/reset|초기화/i)',
  resultBadge: 'section.sticky [class*="badge"]',
} as const

/**
 * City grid selectors
 */
export const cityGridSelectors = {
  container: '#city-grid',
  title: '#city-grid h2',
  cards: '[class*="card"]:has(img)',
} as const

/**
 * City card selectors
 */
export const cityCardSelectors = {
  image: 'img',
  regionBadge: '[class*="badge"]:first-child',
  cityName: 'h3',
  description: 'p:first-of-type',
  likeButton: 'button:first-of-type',
  dislikeButton: 'button:last-of-type',
  link: 'a',
} as const

/**
 * City detail page selectors
 */
export const cityDetailSelectors = {
  heroImage: 'img:first-child',
  cityName: 'h1',
  description: 'h1 + p',
  likeButton: 'button:has(svg[class*="thumbs-up"])',
  dislikeButton: 'button:has(svg[class*="thumbs-down"])',
  shareButton: 'button:has-text(/share|공유/i)',
  highlights: 'ul li',
  relatedCities: 'a[href*="/cities/"]',
} as const

/**
 * Auth form selectors
 */
export const authFormSelectors = {
  emailInput: 'input[type="email"]',
  passwordInput: 'input[type="password"]',
  submitButton: 'button[type="submit"]',
  errorMessage: '[class*="error"], [role="alert"]',
  successMessage: '[class*="success"]',
} as const

/**
 * Modal selectors
 */
export const modalSelectors = {
  overlay: '[class*="overlay"], [class*="backdrop"]',
  container: '[role="dialog"]',
  closeButton: '[role="dialog"] button:has-text(/close|닫기/i)',
} as const

/**
 * Loading state selectors
 */
export const loadingSelectors = {
  spinner: '[class*="spinner"], [class*="loading"]',
  skeleton: '[class*="skeleton"], .animate-pulse',
} as const
