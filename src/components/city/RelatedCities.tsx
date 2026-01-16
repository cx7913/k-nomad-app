import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import type { City } from "@/data/cities";

interface RelatedCitiesProps {
  cities: City[];
  locale: string;
  regionT: (key: string) => string;
}

export function RelatedCities({ cities, locale, regionT }: RelatedCitiesProps) {
  if (cities.length === 0) return null;

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">추천 도시</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cities.map((city) => (
          <Link key={city.id} href={`/${locale}/cities/${city.id}`}>
            <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 h-full">
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
                <Badge className="absolute top-2 left-2 bg-white/90 text-foreground hover:bg-white/90 text-xs">
                  <MapPin className="h-3 w-3 mr-1" />
                  {regionT(`regionOptions.${city.regionKey}`)}
                </Badge>

                {/* City Name */}
                <div className="absolute bottom-2 left-2 right-2">
                  <h3 className="text-lg font-bold text-white">{city.name}</h3>
                </div>
              </div>

              {/* Content */}
              <CardContent className="p-3">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {city.description}
                </p>
                <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                  <span>{city.monthlyCost}만원/월</span>
                  <span>👍 {city.likes}</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
