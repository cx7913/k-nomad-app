import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CityGrid } from '@/components/home/CityGrid';
import { FilterValues } from '@/components/home/FilterBar';
import * as citiesModule from '@/data/cities';

// Mock getCities to return controlled test data
vi.mock('@/data/cities', async () => {
  const actual = await vi.importActual('@/data/cities');
  return {
    ...actual,
    getCities: vi.fn(),
  };
});

describe('CityGrid', () => {
  const mockCities = [
    {
      id: 'seoul',
      imageUrl: 'https://example.com/seoul.jpg',
      name: 'Seoul',
      regionKey: 'capital',
      description: 'The capital city',
      detailedDescription: 'Seoul is the capital of South Korea.',
      highlights: ['Fast internet'],
      monthlyCost: 180,
      budget: 'over200',
      region: 'capital',
      environment: ['urban', 'coworking'],
      bestSeason: ['spring', 'fall'],
      likes: 256,
      dislikes: 12,
    },
    {
      id: 'busan',
      imageUrl: 'https://example.com/busan.jpg',
      name: 'Busan',
      regionKey: 'gyeongsang',
      description: 'Beach city',
      detailedDescription: 'Busan is the second largest city.',
      highlights: ['Beautiful beaches'],
      monthlyCost: 120,
      budget: '100to200',
      region: 'gyeongsang',
      environment: ['urban', 'cafe'],
      bestSeason: ['summer'],
      likes: 128,
      dislikes: 8,
    },
    {
      id: 'jeju',
      imageUrl: 'https://example.com/jeju.jpg',
      name: 'Jeju',
      regionKey: 'jeju',
      description: 'Island paradise',
      detailedDescription: 'Jeju is a beautiful island.',
      highlights: ['Nature'],
      monthlyCost: 150,
      budget: '100to200',
      region: 'jeju',
      environment: ['nature', 'cafe'],
      bestSeason: ['spring', 'fall'],
      likes: 189,
      dislikes: 15,
    },
    {
      id: 'gangneung',
      imageUrl: 'https://example.com/gangneung.jpg',
      name: 'Gangneung',
      regionKey: 'gangwon',
      description: 'Coffee city',
      detailedDescription: 'Gangneung is famous for coffee.',
      highlights: ['Coffee street'],
      monthlyCost: 100,
      budget: 'under100',
      region: 'gangwon',
      environment: ['nature', 'cafe'],
      bestSeason: ['summer'],
      likes: 87,
      dislikes: 5,
    },
  ];

  const defaultFilters: FilterValues = {
    budget: 'all',
    region: 'all',
    environment: 'all',
    season: 'all',
  };

  const mockOnResultCountChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(citiesModule.getCities).mockReturnValue(mockCities as any);
  });

  describe('Rendering Tests', () => {
    it('should render all cities when no filters are applied', () => {
      render(
        <CityGrid
          locale="ko"
          filters={defaultFilters}
          onResultCountChange={mockOnResultCountChange}
        />
      );

      // All 4 cities should be rendered
      expect(screen.getByText('Seoul')).toBeInTheDocument();
      expect(screen.getByText('Busan')).toBeInTheDocument();
      expect(screen.getByText('Jeju')).toBeInTheDocument();
      expect(screen.getByText('Gangneung')).toBeInTheDocument();
    });

    it('should render section title', () => {
      render(
        <CityGrid
          locale="ko"
          filters={defaultFilters}
          onResultCountChange={mockOnResultCountChange}
        />
      );

      expect(screen.getByText('cityGrid.title')).toBeInTheDocument();
    });
  });

  describe('Filtering Logic Tests', () => {
    it('should filter by Budget', () => {
      const filters: FilterValues = {
        ...defaultFilters,
        budget: 'under100',
      };

      render(
        <CityGrid
          locale="ko"
          filters={filters}
          onResultCountChange={mockOnResultCountChange}
        />
      );

      // Only Gangneung has under100 budget
      expect(screen.getByText('Gangneung')).toBeInTheDocument();
      expect(screen.queryByText('Seoul')).not.toBeInTheDocument();
      expect(screen.queryByText('Busan')).not.toBeInTheDocument();
      expect(screen.queryByText('Jeju')).not.toBeInTheDocument();
    });

    it('should filter by Region', () => {
      const filters: FilterValues = {
        ...defaultFilters,
        region: 'gyeongsang',
      };

      render(
        <CityGrid
          locale="ko"
          filters={filters}
          onResultCountChange={mockOnResultCountChange}
        />
      );

      // Only Busan is in gyeongsang
      expect(screen.getByText('Busan')).toBeInTheDocument();
      expect(screen.queryByText('Seoul')).not.toBeInTheDocument();
      expect(screen.queryByText('Jeju')).not.toBeInTheDocument();
      expect(screen.queryByText('Gangneung')).not.toBeInTheDocument();
    });

    it('should filter by Environment', () => {
      const filters: FilterValues = {
        ...defaultFilters,
        environment: 'coworking',
      };

      render(
        <CityGrid
          locale="ko"
          filters={filters}
          onResultCountChange={mockOnResultCountChange}
        />
      );

      // Only Seoul has coworking environment
      expect(screen.getByText('Seoul')).toBeInTheDocument();
      expect(screen.queryByText('Busan')).not.toBeInTheDocument();
      expect(screen.queryByText('Jeju')).not.toBeInTheDocument();
      expect(screen.queryByText('Gangneung')).not.toBeInTheDocument();
    });

    it('should filter by Season', () => {
      const filters: FilterValues = {
        ...defaultFilters,
        season: 'summer',
      };

      render(
        <CityGrid
          locale="ko"
          filters={filters}
          onResultCountChange={mockOnResultCountChange}
        />
      );

      // Busan and Gangneung have summer as best season
      expect(screen.getByText('Busan')).toBeInTheDocument();
      expect(screen.getByText('Gangneung')).toBeInTheDocument();
      expect(screen.queryByText('Seoul')).not.toBeInTheDocument();
      expect(screen.queryByText('Jeju')).not.toBeInTheDocument();
    });

    it('should apply multiple filters together', () => {
      const filters: FilterValues = {
        budget: '100to200',
        region: 'all',
        environment: 'cafe',
        season: 'all',
      };

      render(
        <CityGrid
          locale="ko"
          filters={filters}
          onResultCountChange={mockOnResultCountChange}
        />
      );

      // Busan (100to200, cafe) and Jeju (100to200, cafe) should match
      expect(screen.getByText('Busan')).toBeInTheDocument();
      expect(screen.getByText('Jeju')).toBeInTheDocument();
      expect(screen.queryByText('Seoul')).not.toBeInTheDocument();
      expect(screen.queryByText('Gangneung')).not.toBeInTheDocument();
    });

    it('should show all cities when all filters are "all"', () => {
      render(
        <CityGrid
          locale="ko"
          filters={defaultFilters}
          onResultCountChange={mockOnResultCountChange}
        />
      );

      expect(screen.getByText('Seoul')).toBeInTheDocument();
      expect(screen.getByText('Busan')).toBeInTheDocument();
      expect(screen.getByText('Jeju')).toBeInTheDocument();
      expect(screen.getByText('Gangneung')).toBeInTheDocument();
    });

    it('should show empty list for filter combination with no results', () => {
      const filters: FilterValues = {
        budget: 'under100',
        region: 'capital', // No city in capital region has under100 budget
        environment: 'all',
        season: 'all',
      };

      render(
        <CityGrid
          locale="ko"
          filters={filters}
          onResultCountChange={mockOnResultCountChange}
        />
      );

      expect(screen.queryByText('Seoul')).not.toBeInTheDocument();
      expect(screen.queryByText('Busan')).not.toBeInTheDocument();
      expect(screen.queryByText('Jeju')).not.toBeInTheDocument();
      expect(screen.queryByText('Gangneung')).not.toBeInTheDocument();
    });
  });

  describe('Sorting Logic Tests', () => {
    it('should sort cities by likes in descending order', () => {
      render(
        <CityGrid
          locale="ko"
          filters={defaultFilters}
          onResultCountChange={mockOnResultCountChange}
        />
      );

      // Get all city names in order
      const cityNames = screen.getAllByRole('heading', { level: 3 });
      const names = cityNames.map((el) => el.textContent);

      // Expected order by likes: Seoul(256) > Jeju(189) > Busan(128) > Gangneung(87)
      expect(names).toEqual(['Seoul', 'Jeju', 'Busan', 'Gangneung']);
    });
  });

  describe('Callback Tests', () => {
    it('should call onResultCountChange when filters change', () => {
      const { rerender } = render(
        <CityGrid
          locale="ko"
          filters={defaultFilters}
          onResultCountChange={mockOnResultCountChange}
        />
      );

      // Initial render should call with full count
      expect(mockOnResultCountChange).toHaveBeenCalledWith(4);

      // Change filters
      mockOnResultCountChange.mockClear();
      const newFilters: FilterValues = {
        ...defaultFilters,
        budget: 'under100',
      };

      rerender(
        <CityGrid
          locale="ko"
          filters={newFilters}
          onResultCountChange={mockOnResultCountChange}
        />
      );

      // Should be called with filtered count (only Gangneung)
      expect(mockOnResultCountChange).toHaveBeenCalledWith(1);
    });

    it('should call onResultCountChange on initial render', () => {
      render(
        <CityGrid
          locale="ko"
          filters={defaultFilters}
          onResultCountChange={mockOnResultCountChange}
        />
      );

      expect(mockOnResultCountChange).toHaveBeenCalledWith(4);
    });
  });
});
