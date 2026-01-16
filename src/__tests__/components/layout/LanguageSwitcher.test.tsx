import { describe, it, expect, vi, beforeEach, beforeAll } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher'

// Mock router.push
const mockPush = vi.fn()

// Re-mock next/navigation for this test file to get access to mockPush
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => '/ko/cities',
  useParams: () => ({ locale: 'ko' }),
  useSearchParams: () => new URLSearchParams(),
}))

// Mock hasPointerCapture for Radix UI Select
beforeAll(() => {
  Element.prototype.hasPointerCapture = vi.fn(() => false)
  Element.prototype.setPointerCapture = vi.fn()
  Element.prototype.releasePointerCapture = vi.fn()
})

describe('LanguageSwitcher', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Rendering Tests', () => {
    it('renders Globe icon', () => {
      render(<LanguageSwitcher />)

      // Globe icon is rendered within the SelectTrigger
      const trigger = screen.getByRole('combobox')
      const svgIcon = trigger.querySelector('svg')
      expect(svgIcon).toBeInTheDocument()
    })

    it('renders Select dropdown', () => {
      render(<LanguageSwitcher />)

      const selectTrigger = screen.getByRole('combobox')
      expect(selectTrigger).toBeInTheDocument()
    })

    it('has current locale selected', () => {
      render(<LanguageSwitcher />)

      // useLocale returns 'ko' in setup.ts mock
      const selectTrigger = screen.getByRole('combobox')
      expect(selectTrigger).toHaveTextContent('language.ko')
    })

    it('renders all 7 language options (ko, en, ja, zh, fr, it, es)', async () => {
      const user = userEvent.setup()
      render(<LanguageSwitcher />)

      // Open the select dropdown
      const selectTrigger = screen.getByRole('combobox')
      await user.click(selectTrigger)

      // Wait for options to appear in the portal
      await waitFor(() => {
        const options = screen.getAllByRole('option')
        expect(options).toHaveLength(7)
      })

      // Verify each language option exists
      expect(screen.getByRole('option', { name: 'language.ko' })).toBeInTheDocument()
      expect(screen.getByRole('option', { name: 'language.en' })).toBeInTheDocument()
      expect(screen.getByRole('option', { name: 'language.ja' })).toBeInTheDocument()
      expect(screen.getByRole('option', { name: 'language.zh' })).toBeInTheDocument()
      expect(screen.getByRole('option', { name: 'language.fr' })).toBeInTheDocument()
      expect(screen.getByRole('option', { name: 'language.it' })).toBeInTheDocument()
      expect(screen.getByRole('option', { name: 'language.es' })).toBeInTheDocument()
    })
  })

  describe('Language Switch Tests', () => {
    it('changes URL when selecting English (/ko/... -> /en/...)', async () => {
      const user = userEvent.setup()
      render(<LanguageSwitcher />)

      // Open the select dropdown
      const selectTrigger = screen.getByRole('combobox')
      await user.click(selectTrigger)

      // Wait for options to appear
      await waitFor(() => {
        expect(screen.getByRole('option', { name: 'language.en' })).toBeInTheDocument()
      })

      // Click English option
      const englishOption = screen.getByRole('option', { name: 'language.en' })
      await user.click(englishOption)

      // Verify router.push was called with correct path
      expect(mockPush).toHaveBeenCalledWith('/en/cities')
    })

    it('changes URL when selecting Japanese', async () => {
      const user = userEvent.setup()
      render(<LanguageSwitcher />)

      const selectTrigger = screen.getByRole('combobox')
      await user.click(selectTrigger)

      await waitFor(() => {
        expect(screen.getByRole('option', { name: 'language.ja' })).toBeInTheDocument()
      })

      const japaneseOption = screen.getByRole('option', { name: 'language.ja' })
      await user.click(japaneseOption)

      expect(mockPush).toHaveBeenCalledWith('/ja/cities')
    })

    it('only changes locale part of path (preserves rest of path)', async () => {
      const user = userEvent.setup()
      render(<LanguageSwitcher />)

      const selectTrigger = screen.getByRole('combobox')
      await user.click(selectTrigger)

      await waitFor(() => {
        expect(screen.getByRole('option', { name: 'language.fr' })).toBeInTheDocument()
      })

      const frenchOption = screen.getByRole('option', { name: 'language.fr' })
      await user.click(frenchOption)

      // Path is /ko/cities, should become /fr/cities
      expect(mockPush).toHaveBeenCalledWith('/fr/cities')
      // Ensure it's not /fr (only home) or something else
      expect(mockPush).not.toHaveBeenCalledWith('/fr')
      expect(mockPush).not.toHaveBeenCalledWith('/fr/ko/cities')
    })

    it('calls router.push when language is changed', async () => {
      const user = userEvent.setup()
      render(<LanguageSwitcher />)

      const selectTrigger = screen.getByRole('combobox')
      await user.click(selectTrigger)

      await waitFor(() => {
        expect(screen.getByRole('option', { name: 'language.es' })).toBeInTheDocument()
      })

      const spanishOption = screen.getByRole('option', { name: 'language.es' })
      await user.click(spanishOption)

      // Verify router.push was called
      expect(mockPush).toHaveBeenCalled()
      expect(mockPush).toHaveBeenCalledTimes(1)
    })
  })
})
