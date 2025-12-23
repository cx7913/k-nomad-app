"use client";

import { useEffect, useMemo } from "react";
import { useTranslations } from "next-intl";
import { CityCard } from "./CityCard";
import { getCities } from "@/data/cities";
import { Locale } from "@/i18n/config";
import { FilterValues } from "./FilterBar";

interface CityGridProps {
  locale: string;
  filters: FilterValues;
  onResultCountChange: (count: number) => void;
}

export function CityGrid({ locale, filters, onResultCountChange }: CityGridProps) {
  const t = useTranslations("cityGrid");
  const cities = getCities(locale as Locale);

  const filteredCities = useMemo(() => {
    return cities.filter((city) => {
      // Budget filter
      if (filters.budget !== "all" && city.budget !== filters.budget) {
        return false;
      }

      // Region filter
      if (filters.region !== "all" && city.region !== filters.region) {
        return false;
      }

      // Environment filter
      if (filters.environment !== "all" && !city.environment.includes(filters.environment as any)) {
        return false;
      }

      // Season filter
      if (filters.season !== "all" && !city.bestSeason.includes(filters.season as any)) {
        return false;
      }

      return true;
    });
  }, [cities, filters]);

  // Sort by likes in descending order
  const sortedCities = useMemo(() => {
    return [...filteredCities].sort((a, b) => b.likes - a.likes);
  }, [filteredCities]);

  useEffect(() => {
    onResultCountChange(filteredCities.length);
  }, [filteredCities.length, onResultCountChange]);

  return (
    <section id="city-grid" className="py-8">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-2xl font-bold mb-6">{t("title")}</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedCities.map((city) => (
            <CityCard key={city.id} city={city} />
          ))}
        </div>
      </div>
    </section>
  );
}
