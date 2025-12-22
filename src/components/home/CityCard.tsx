"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";
import type { City } from "@/data/cities";

interface CityCardProps {
  city: City;
}

export function CityCard({ city }: CityCardProps) {
  const t = useTranslations("cityCard");
  const filterT = useTranslations("filter");
  const params = useParams();
  const locale = params.locale as string;

  return (
    <Link href={`/${locale}/cities/${city.id}`}>
      <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={city.imageUrl}
          alt={city.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Region Badge */}
        <Badge className="absolute top-3 left-3 bg-white/90 text-foreground hover:bg-white/90">
          {filterT(`regionOptions.${city.regionKey}`)}
        </Badge>
      </div>

      {/* Content */}
      <CardContent className="p-4">
        {/* City Name */}
        <div className="mb-2">
          <h3 className="text-xl font-bold">{city.name}</h3>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-1">
          {city.description}
        </p>

        {/* Stats */}
        <div className="flex items-center text-sm">
          <div className="flex items-center gap-1">
            <span className="text-muted-foreground">{t("monthly")}</span>
            <span className="font-semibold text-primary">
              {city.monthlyCost}
              {t("currency")}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
    </Link>
  );
}
