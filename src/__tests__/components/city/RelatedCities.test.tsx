import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { RelatedCities } from '@/components/city/RelatedCities'
import { mockCities } from '@/__tests__/mocks/cities'

describe('RelatedCities', () => {
  const mockRegionT = vi.fn((key: string) => {
    const translations: Record<string, string> = {
      'regionOptions.capital': '수도권',
      'regionOptions.gyeongsang': '경상권',
      'regionOptions.gangwon': '강원권',
    }
    return translations[key] || key
  })

  describe('Rendering Tests', () => {
    it('should render related cities list', () => {
      render(
        <RelatedCities
          cities={mockCities}
          locale="ko"
          regionT={mockRegionT}
        />
      )

      mockCities.forEach((city) => {
        expect(screen.getByText(city.name)).toBeInTheDocument()
      })
    })

    it('should render section title', () => {
      render(
        <RelatedCities
          cities={mockCities}
          locale="ko"
          regionT={mockRegionT}
        />
      )

      expect(screen.getByText('추천 도시')).toBeInTheDocument()
    })

    it('should render image for each city card', () => {
      render(
        <RelatedCities
          cities={mockCities}
          locale="ko"
          regionT={mockRegionT}
        />
      )

      const images = screen.getAllByRole('img')
      expect(images).toHaveLength(mockCities.length)

      mockCities.forEach((city) => {
        const img = screen.getByAltText(city.name)
        expect(img).toBeInTheDocument()
        expect(img).toHaveAttribute('src', city.imageUrl)
      })
    })

    it('should render name for each city card', () => {
      render(
        <RelatedCities
          cities={mockCities}
          locale="ko"
          regionT={mockRegionT}
        />
      )

      mockCities.forEach((city) => {
        expect(screen.getByText(city.name)).toBeInTheDocument()
      })
    })

    it('should render description for each city card', () => {
      render(
        <RelatedCities
          cities={mockCities}
          locale="ko"
          regionT={mockRegionT}
        />
      )

      mockCities.forEach((city) => {
        expect(screen.getByText(city.description)).toBeInTheDocument()
      })
    })

    it('should render monthly cost for each city card', () => {
      render(
        <RelatedCities
          cities={mockCities}
          locale="ko"
          regionT={mockRegionT}
        />
      )

      mockCities.forEach((city) => {
        expect(screen.getByText(`${city.monthlyCost}만원/월`)).toBeInTheDocument()
      })
    })

    it('should render likes count for each city card', () => {
      render(
        <RelatedCities
          cities={mockCities}
          locale="ko"
          regionT={mockRegionT}
        />
      )

      mockCities.forEach((city) => {
        expect(screen.getByText(`👍 ${city.likes}`)).toBeInTheDocument()
      })
    })

    it('should render region badge with MapPin icon and region name', () => {
      render(
        <RelatedCities
          cities={mockCities}
          locale="ko"
          regionT={mockRegionT}
        />
      )

      expect(mockRegionT).toHaveBeenCalledWith('regionOptions.capital')
      expect(mockRegionT).toHaveBeenCalledWith('regionOptions.gyeongsang')
      expect(mockRegionT).toHaveBeenCalledWith('regionOptions.gangwon')

      expect(screen.getByText('수도권')).toBeInTheDocument()
      expect(screen.getByText('경상권')).toBeInTheDocument()
      expect(screen.getAllByText('강원권')).toHaveLength(2)
    })
  })

  describe('Conditional Rendering Tests', () => {
    it('should return null when cities array is empty', () => {
      const { container } = render(
        <RelatedCities
          cities={[]}
          locale="ko"
          regionT={mockRegionT}
        />
      )

      expect(container.firstChild).toBeNull()
    })
  })

  describe('Link Tests', () => {
    it('should navigate to correct URL when card is clicked', () => {
      render(
        <RelatedCities
          cities={mockCities}
          locale="ko"
          regionT={mockRegionT}
        />
      )

      mockCities.forEach((city) => {
        const link = screen.getByRole('link', { name: new RegExp(city.name) })
        expect(link).toHaveAttribute('href', `/ko/cities/${city.id}`)
      })
    })

    it('should use correct locale in URL', () => {
      render(
        <RelatedCities
          cities={mockCities}
          locale="en"
          regionT={mockRegionT}
        />
      )

      mockCities.forEach((city) => {
        const link = screen.getByRole('link', { name: new RegExp(city.name) })
        expect(link).toHaveAttribute('href', `/en/cities/${city.id}`)
      })
    })
  })
})
