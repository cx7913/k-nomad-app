import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { FilterBar, FilterValues } from '@/components/home/FilterBar';

describe('FilterBar', () => {
  const defaultFilters: FilterValues = {
    budget: 'all',
    region: 'all',
    environment: 'all',
    season: 'all',
  };

  const mockOnFilterChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering Tests', () => {
    it('should render 4 filter dropdowns (Budget, Region, Environment, Season)', () => {
      render(
        <FilterBar
          filters={defaultFilters}
          onFilterChange={mockOnFilterChange}
          resultCount={10}
        />
      );

      // Check for 4 SelectTrigger elements (combobox role)
      const triggers = screen.getAllByRole('combobox');
      expect(triggers).toHaveLength(4);
    });

    it('should render reset button', () => {
      render(
        <FilterBar
          filters={defaultFilters}
          onFilterChange={mockOnFilterChange}
          resultCount={10}
        />
      );

      const resetButton = screen.getByRole('button', { name: /filter\.reset/i });
      expect(resetButton).toBeInTheDocument();
    });

    it('should render result count badge', () => {
      render(
        <FilterBar
          filters={defaultFilters}
          onFilterChange={mockOnFilterChange}
          resultCount={10}
        />
      );

      // Mock translates to "filter.citiesCount" with count param
      expect(screen.getByText('filter.citiesCount')).toBeInTheDocument();
      expect(screen.getByText('filter.results')).toBeInTheDocument();
    });
  });

  describe('Filter Change Tests', () => {
    it('should call onFilterChange when Budget filter changes', async () => {
      render(
        <FilterBar
          filters={defaultFilters}
          onFilterChange={mockOnFilterChange}
          resultCount={10}
        />
      );

      const triggers = screen.getAllByRole('combobox');
      // Budget is the first filter
      fireEvent.click(triggers[0]);

      // Select an option
      const option = await screen.findByText('filter.budgetOptions.under100');
      fireEvent.click(option);

      expect(mockOnFilterChange).toHaveBeenCalledWith({
        ...defaultFilters,
        budget: 'under100',
      });
    });

    it('should call onFilterChange when Region filter changes', async () => {
      render(
        <FilterBar
          filters={defaultFilters}
          onFilterChange={mockOnFilterChange}
          resultCount={10}
        />
      );

      const triggers = screen.getAllByRole('combobox');
      // Region is the second filter
      fireEvent.click(triggers[1]);

      const option = await screen.findByText('filter.regionOptions.capital');
      fireEvent.click(option);

      expect(mockOnFilterChange).toHaveBeenCalledWith({
        ...defaultFilters,
        region: 'capital',
      });
    });

    it('should call onFilterChange when Environment filter changes', async () => {
      render(
        <FilterBar
          filters={defaultFilters}
          onFilterChange={mockOnFilterChange}
          resultCount={10}
        />
      );

      const triggers = screen.getAllByRole('combobox');
      // Environment is the third filter
      fireEvent.click(triggers[2]);

      const option = await screen.findByText('filter.environmentOptions.nature');
      fireEvent.click(option);

      expect(mockOnFilterChange).toHaveBeenCalledWith({
        ...defaultFilters,
        environment: 'nature',
      });
    });

    it('should call onFilterChange when Season filter changes', async () => {
      render(
        <FilterBar
          filters={defaultFilters}
          onFilterChange={mockOnFilterChange}
          resultCount={10}
        />
      );

      const triggers = screen.getAllByRole('combobox');
      // Season is the fourth filter
      fireEvent.click(triggers[3]);

      const option = await screen.findByText('filter.seasonOptions.spring');
      fireEvent.click(option);

      expect(mockOnFilterChange).toHaveBeenCalledWith({
        ...defaultFilters,
        season: 'spring',
      });
    });

    it('should reset all filters to "all" when Reset button is clicked', () => {
      const activeFilters: FilterValues = {
        budget: 'under100',
        region: 'capital',
        environment: 'nature',
        season: 'spring',
      };

      render(
        <FilterBar
          filters={activeFilters}
          onFilterChange={mockOnFilterChange}
          resultCount={5}
        />
      );

      const resetButton = screen.getByRole('button', { name: /filter\.reset/i });
      fireEvent.click(resetButton);

      expect(mockOnFilterChange).toHaveBeenCalledWith({
        region: 'all',
        budget: 'all',
        environment: 'all',
        season: 'all',
      });
    });
  });

  describe('Props Tests', () => {
    it('should display initial filter values correctly', () => {
      const customFilters: FilterValues = {
        budget: 'under100',
        region: 'capital',
        environment: 'nature',
        season: 'spring',
      };

      render(
        <FilterBar
          filters={customFilters}
          onFilterChange={mockOnFilterChange}
          resultCount={5}
        />
      );

      // Each trigger should show the selected value
      expect(screen.getByText('filter.budgetOptions.under100')).toBeInTheDocument();
      expect(screen.getByText('filter.regionOptions.capital')).toBeInTheDocument();
      expect(screen.getByText('filter.environmentOptions.nature')).toBeInTheDocument();
      expect(screen.getByText('filter.seasonOptions.spring')).toBeInTheDocument();
    });

    it('should display correctly when resultCount is 0', () => {
      render(
        <FilterBar
          filters={defaultFilters}
          onFilterChange={mockOnFilterChange}
          resultCount={0}
        />
      );

      // Badge should still be rendered
      expect(screen.getByText('filter.citiesCount')).toBeInTheDocument();
    });
  });
});
