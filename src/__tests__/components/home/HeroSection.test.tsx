import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { HeroSection } from '@/components/home/HeroSection';

describe('HeroSection', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering Tests', () => {
    it('should render badge text', () => {
      render(<HeroSection />);

      expect(screen.getByText('hero.badge')).toBeInTheDocument();
    });

    it('should render main title', () => {
      render(<HeroSection />);

      const h1 = screen.getByRole('heading', { level: 1 });
      expect(h1).toBeInTheDocument();
      // Check that h1 contains all title parts
      expect(h1.textContent).toContain('hero.titleStart');
      expect(h1.textContent).toContain('hero.titleHighlight');
      expect(h1.textContent).toContain('hero.titleEnd');
    });

    it('should render subtitle', () => {
      render(<HeroSection />);

      expect(screen.getByText('hero.subtitle')).toBeInTheDocument();
    });

    it('should render CTA button', () => {
      render(<HeroSection />);

      const ctaButton = screen.getByRole('button', { name: 'hero.exploreCities' });
      expect(ctaButton).toBeInTheDocument();
    });

    it('should render statistics information (10+, 1,000+, 40+)', () => {
      render(<HeroSection />);

      // Check for stat values
      expect(screen.getByText('10+')).toBeInTheDocument();
      expect(screen.getByText('1,000+')).toBeInTheDocument();
      expect(screen.getByText('40+')).toBeInTheDocument();

      // Check for stat labels
      expect(screen.getByText('hero.stats.cities')).toBeInTheDocument();
      expect(screen.getByText('hero.stats.reviews')).toBeInTheDocument();
      expect(screen.getByText('hero.stats.metrics')).toBeInTheDocument();
    });
  });

  describe('Interaction Tests', () => {
    it('should call scrollIntoView when CTA button is clicked', () => {
      // Mock getElementById to return an element with scrollIntoView
      const mockElement = {
        scrollIntoView: vi.fn(),
      };
      const getElementByIdSpy = vi.spyOn(document, 'getElementById').mockReturnValue(mockElement as unknown as HTMLElement);

      render(<HeroSection />);

      const ctaButton = screen.getByRole('button', { name: 'hero.exploreCities' });
      fireEvent.click(ctaButton);

      expect(getElementByIdSpy).toHaveBeenCalledWith('city-grid');
      expect(mockElement.scrollIntoView).toHaveBeenCalledWith({
        behavior: 'smooth',
      });

      getElementByIdSpy.mockRestore();
    });

    it('should not throw error if city-grid element does not exist', () => {
      // Mock getElementById to return null
      const getElementByIdSpy = vi.spyOn(document, 'getElementById').mockReturnValue(null);

      render(<HeroSection />);

      const ctaButton = screen.getByRole('button', { name: 'hero.exploreCities' });

      // Should not throw
      expect(() => fireEvent.click(ctaButton)).not.toThrow();

      expect(getElementByIdSpy).toHaveBeenCalledWith('city-grid');

      getElementByIdSpy.mockRestore();
    });
  });
});
