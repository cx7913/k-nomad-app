import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Footer } from '@/components/layout/Footer'

describe('Footer', () => {
  describe('Rendering Tests', () => {
    it('renders K-Nomad logo text', () => {
      render(<Footer />)

      expect(screen.getByText('K-Nomad')).toBeInTheDocument()
    })

    it('renders About section', () => {
      render(<Footer />)

      // About section contains translated about text
      expect(screen.getByText('footer.about')).toBeInTheDocument()
    })

    it('renders Contact section', () => {
      render(<Footer />)

      expect(screen.getByText('footer.contact')).toBeInTheDocument()
    })

    it('renders email link with correct mailto', () => {
      render(<Footer />)

      const emailLink = screen.getByRole('link', { name: 'hello@k-nomad.kr' })
      expect(emailLink).toBeInTheDocument()
      expect(emailLink).toHaveAttribute('href', 'mailto:hello@k-nomad.kr')
    })

    it('renders Instagram icon', () => {
      render(<Footer />)

      // Instagram icon is wrapped in an anchor tag
      const socialLinks = screen.getAllByRole('link')
      const instagramLink = socialLinks.find((link) => link.querySelector('svg'))
      expect(instagramLink).toBeInTheDocument()

      // Check if SVG (lucide-react icons) exist in footer
      const footer = screen.getByRole('contentinfo')
      const svgIcons = footer.querySelectorAll('svg')
      // Should have at least 3 icons: Mail, Instagram, Twitter
      expect(svgIcons.length).toBeGreaterThanOrEqual(3)
    })

    it('renders Twitter icon', () => {
      render(<Footer />)

      const footer = screen.getByRole('contentinfo')
      const svgIcons = footer.querySelectorAll('svg')
      // Mail + Instagram + Twitter = 3 icons minimum
      expect(svgIcons.length).toBeGreaterThanOrEqual(3)
    })

    it('renders copyright text', () => {
      render(<Footer />)

      expect(screen.getByText('footer.copyright')).toBeInTheDocument()
    })
  })
})
