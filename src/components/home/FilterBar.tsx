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

const sortKeys = ["likes"] as const;
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

export function FilterBar() {
  const t = useTranslations("filter");

  return (
    <section className="sticky top-16 z-40 bg-background border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          {/* Filters */}
          <div className="flex flex-wrap gap-3 items-center">
            {/* Region Filter */}
            <Select defaultValue="all">
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

            {/* Budget Filter */}
            <Select defaultValue="all">
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

            {/* Reset Button */}
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <RotateCcw className="h-4 w-4 mr-1" />
              {t("reset")}
            </Button>
          </div>

          {/* Result Count */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">{t("results")}</span>
            <Badge variant="secondary">{t("citiesCount", { count: 10 })}</Badge>
          </div>
        </div>
      </div>
    </section>
  );
}
