import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CityCard } from '@/components/home/CityCard';
import type { City } from '@/data/cities';

describe('CityCard', () => {
  const mockCity: City = {
    id: 'seoul',
    imageUrl: 'https://images.unsplash.com/photo-1631719223645-bc3cd67e5cdd',
    name: 'Seoul',
    regionKey: 'capital',
    description: 'The capital of South Korea',
    detailedDescription: 'Seoul is the capital of South Korea.',
    highlights: ['Fast internet', 'Coworking spaces'],
    monthlyCost: 180,
    budget: 'over200',
    region: 'capital',
    environment: ['urban', 'coworking'],
    bestSeason: ['spring', 'fall'],
    likes: 256,
    dislikes: 12,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering Tests', () => {
    it('should render city image', () => {
      render(<CityCard city={mockCity} />);

      const image = screen.getByAltText(mockCity.name);
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', mockCity.imageUrl);
    });

    it('should render city name', () => {
      render(<CityCard city={mockCity} />);

      expect(screen.getByText(mockCity.name)).toBeInTheDocument();
    });

    it('should render city description', () => {
      render(<CityCard city={mockCity} />);

      expect(screen.getByText(mockCity.description)).toBeInTheDocument();
    });

    it('should render budget information', () => {
      render(<CityCard city={mockCity} />);

      expect(screen.getByText('cityCard.budget:')).toBeInTheDocument();
      expect(screen.getByText(`filter.budgetOptions.${mockCity.budget}`)).toBeInTheDocument();
    });

    it('should render environment information', () => {
      render(<CityCard city={mockCity} />);

      expect(screen.getByText('cityCard.environment:')).toBeInTheDocument();
      // Environment is joined with comma
      const envText = mockCity.environment
        .map((env) => `filter.environmentOptions.${env}`)
        .join(', ');
      expect(screen.getByText(envText)).toBeInTheDocument();
    });

    it('should render season information', () => {
      render(<CityCard city={mockCity} />);

      expect(screen.getByText('cityCard.bestSeason:')).toBeInTheDocument();
      // Season is joined with comma
      const seasonText = mockCity.bestSeason
        .map((season) => `filter.seasonOptions.${season}`)
        .join(', ');
      expect(screen.getByText(seasonText)).toBeInTheDocument();
    });

    it('should render region badge', () => {
      render(<CityCard city={mockCity} />);

      expect(screen.getByText(`filter.regionOptions.${mockCity.regionKey}`)).toBeInTheDocument();
    });

    it('should have correct link URL to detail page', () => {
      render(<CityCard city={mockCity} />);

      // Links should contain the city id (locale is 'ko' from mock)
      const links = screen.getAllByRole('link');
      expect(links.length).toBeGreaterThan(0);
      // Check that at least one link points to the city detail page
      const hasCorrectLink = links.some(
        (link) => link.getAttribute('href') === `/ko/cities/${mockCity.id}`
      );
      expect(hasCorrectLink).toBe(true);
    });
  });

  describe('Like/Dislike Functionality Tests', () => {
    it('should display initial like and dislike counts', () => {
      render(<CityCard city={mockCity} />);

      expect(screen.getByText(String(mockCity.likes))).toBeInTheDocument();
      expect(screen.getByText(String(mockCity.dislikes))).toBeInTheDocument();
    });

    it('should increase like count when like button is clicked', () => {
      render(<CityCard city={mockCity} />);

      const likeButton = screen.getAllByRole('button')[0];
      fireEvent.click(likeButton);

      expect(screen.getByText(String(mockCity.likes + 1))).toBeInTheDocument();
    });

    it('should decrease like count when like is cancelled', () => {
      render(<CityCard city={mockCity} />);

      const likeButton = screen.getAllByRole('button')[0];
      // Click to like
      fireEvent.click(likeButton);
      expect(screen.getByText(String(mockCity.likes + 1))).toBeInTheDocument();

      // Click again to cancel
      fireEvent.click(likeButton);
      expect(screen.getByText(String(mockCity.likes))).toBeInTheDocument();
    });

    it('should increase dislike count when dislike button is clicked', () => {
      render(<CityCard city={mockCity} />);

      const dislikeButton = screen.getAllByRole('button')[1];
      fireEvent.click(dislikeButton);

      expect(screen.getByText(String(mockCity.dislikes + 1))).toBeInTheDocument();
    });

    it('should decrease dislike count when dislike is cancelled', () => {
      render(<CityCard city={mockCity} />);

      const dislikeButton = screen.getAllByRole('button')[1];
      // Click to dislike
      fireEvent.click(dislikeButton);
      expect(screen.getByText(String(mockCity.dislikes + 1))).toBeInTheDocument();

      // Click again to cancel
      fireEvent.click(dislikeButton);
      expect(screen.getByText(String(mockCity.dislikes))).toBeInTheDocument();
    });

    it('should switch from like to dislike when dislike is clicked while liked', () => {
      render(<CityCard city={mockCity} />);

      const likeButton = screen.getAllByRole('button')[0];
      const dislikeButton = screen.getAllByRole('button')[1];

      // Click like first
      fireEvent.click(likeButton);
      expect(screen.getByText(String(mockCity.likes + 1))).toBeInTheDocument();

      // Click dislike
      fireEvent.click(dislikeButton);
      // Like should decrease, dislike should increase
      expect(screen.getByText(String(mockCity.likes))).toBeInTheDocument();
      expect(screen.getByText(String(mockCity.dislikes + 1))).toBeInTheDocument();
    });

    it('should switch from dislike to like when like is clicked while disliked', () => {
      render(<CityCard city={mockCity} />);

      const likeButton = screen.getAllByRole('button')[0];
      const dislikeButton = screen.getAllByRole('button')[1];

      // Click dislike first
      fireEvent.click(dislikeButton);
      expect(screen.getByText(String(mockCity.dislikes + 1))).toBeInTheDocument();

      // Click like
      fireEvent.click(likeButton);
      // Dislike should decrease, like should increase
      expect(screen.getByText(String(mockCity.dislikes))).toBeInTheDocument();
      expect(screen.getByText(String(mockCity.likes + 1))).toBeInTheDocument();
    });

    it('should prevent event propagation when like button is clicked', () => {
      const handleClick = vi.fn();
      render(
        <div onClick={handleClick}>
          <CityCard city={mockCity} />
        </div>
      );

      const likeButton = screen.getAllByRole('button')[0];
      fireEvent.click(likeButton);

      // Parent click handler should not be called
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('should change style when like is active', () => {
      render(<CityCard city={mockCity} />);

      const likeButton = screen.getAllByRole('button')[0];
      fireEvent.click(likeButton);

      // After clicking like, the icon should have fill-primary class
      const svgIcon = likeButton.querySelector('svg');
      expect(svgIcon).toHaveClass('fill-primary');
      expect(svgIcon).toHaveClass('text-primary');
    });
  });
});
