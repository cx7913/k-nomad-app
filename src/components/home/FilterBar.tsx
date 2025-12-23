"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { RotateCcw } from "lucide-react";
import { useTranslations } from "next-intl";

const regionKeys = [
  "all",
  "capital",
  "gyeongsang",
  "jeolla",
  "gangwon",
  "jeju",
  "chungcheong",
] as const;
const budgetKeys = ["all", "under100", "100to200", "over200"] as const;
const environmentKeys = ["all", "nature", "urban", "cafe", "coworking"] as const;
const seasonKeys = ["all", "spring", "summer", "fall", "winter"] as const;

export type FilterValues = {
  region: string;
  budget: string;
  environment: string;
  season: string;
};

interface FilterBarProps {
  filters: FilterValues;
  onFilterChange: (filters: FilterValues) => void;
  resultCount: number;
}

export function FilterBar({ filters, onFilterChange, resultCount }: FilterBarProps) {
  const t = useTranslations("filter");

  const handleReset = () => {
    onFilterChange({
      region: "all",
      budget: "all",
      environment: "all",
      season: "all",
    });
  };

  return (
    <section className="sticky top-16 z-40 bg-background border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          {/* Filters */}
          <div className="flex flex-wrap gap-3 items-center">
            {/* Budget Filter */}
            <Select
              value={filters.budget}
              onValueChange={(value) => onFilterChange({ ...filters, budget: value })}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder={t("budget")} />
              </SelectTrigger>
              <SelectContent>
                {budgetKeys.map((key) => (
                  <SelectItem key={key} value={key}>
                    {t(`budgetOptions.${key}`)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Region Filter */}
            <Select
              value={filters.region}
              onValueChange={(value) => onFilterChange({ ...filters, region: value })}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder={t("region")} />
              </SelectTrigger>
              <SelectContent>
                {regionKeys.map((key) => (
                  <SelectItem key={key} value={key}>
                    {t(`regionOptions.${key}`)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Environment Filter */}
            <Select
              value={filters.environment}
              onValueChange={(value) => onFilterChange({ ...filters, environment: value })}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder={t("environment")} />
              </SelectTrigger>
              <SelectContent>
                {environmentKeys.map((key) => (
                  <SelectItem key={key} value={key}>
                    {t(`environmentOptions.${key}`)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Season Filter */}
            <Select
              value={filters.season}
              onValueChange={(value) => onFilterChange({ ...filters, season: value })}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder={t("season")} />
              </SelectTrigger>
              <SelectContent>
                {seasonKeys.map((key) => (
                  <SelectItem key={key} value={key}>
                    {t(`seasonOptions.${key}`)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Reset Button */}
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground"
              onClick={handleReset}
            >
              <RotateCcw className="h-4 w-4 mr-1" />
              {t("reset")}
            </Button>
          </div>

          {/* Result Count */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">{t("results")}</span>
            <Badge variant="secondary">{t("citiesCount", { count: resultCount })}</Badge>
          </div>
        </div>
      </div>
    </section>
  );
}
