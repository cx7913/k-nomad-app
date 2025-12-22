import { CityCard } from "./CityCard";
import { getCities } from "@/data/cities";
import { Locale } from "@/i18n/config";

interface CityGridProps {
  locale: string;
}

export function CityGrid({ locale }: CityGridProps) {
  const cities = getCities(locale as Locale);

  return (
    <section id="city-grid" className="py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cities.map((city) => (
            <CityCard key={city.id} city={city} />
          ))}
        </div>
      </div>
    </section>
  );
}
