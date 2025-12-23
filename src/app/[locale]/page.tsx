"use client";

import { useState, useCallback } from "react";
import { HeroSection } from "@/components/home/HeroSection";
import { FilterBar, FilterValues } from "@/components/home/FilterBar";
import { CityGrid } from "@/components/home/CityGrid";
import { useParams } from "next/navigation";

export default function Home() {
  const params = useParams();
  const locale = params.locale as string;

  const [filters, setFilters] = useState<FilterValues>({
    region: "all",
    budget: "all",
    environment: "all",
    season: "all",
  });

  const [resultCount, setResultCount] = useState(0);

  const handleResultCountChange = useCallback((count: number) => {
    setResultCount(count);
  }, []);

  return (
    <>
      <HeroSection />
      <FilterBar filters={filters} onFilterChange={setFilters} resultCount={resultCount} />
      <CityGrid locale={locale} filters={filters} onResultCountChange={handleResultCountChange} />
    </>
  );
}
