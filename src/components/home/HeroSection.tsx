"use client";

import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { useTranslations } from "next-intl";

export function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-background">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
            <MapPin className="h-4 w-4" />
            <span>{t("badge")}</span>
          </div>

          {/* Main Copy */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            {t("titleStart")}{" "}
            <span className="text-primary">{t("titleHighlight")}</span>
            {t("titleEnd")}
          </h1>

          {/* Sub Copy */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>

          {/* CTA */}
          <div className="flex justify-center">
            <Button
              size="lg"
              className="text-base px-8"
              onClick={() => {
                document.getElementById("city-grid")?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
            >
              {t("exploreCities")}
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-3 gap-8 max-w-md mx-auto">
            <div>
              <div className="text-3xl font-bold text-primary">10+</div>
              <div className="text-sm text-muted-foreground">
                {t("stats.cities")}
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">1,000+</div>
              <div className="text-sm text-muted-foreground">
                {t("stats.reviews")}
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">40+</div>
              <div className="text-sm text-muted-foreground">
                {t("stats.metrics")}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent" />
      <div className="absolute bottom-0 left-0 -z-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
    </section>
  );
}
