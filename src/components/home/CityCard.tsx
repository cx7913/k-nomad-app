"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown } from "lucide-react";
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

  const [likeState, setLikeState] = useState<'like' | 'dislike' | null>(null);
  const [currentLikes, setCurrentLikes] = useState(city.likes);
  const [currentDislikes, setCurrentDislikes] = useState(city.dislikes);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (likeState === 'like') {
      // Unlike
      setLikeState(null);
      setCurrentLikes(currentLikes - 1);
    } else {
      // Like (and remove dislike if active)
      if (likeState === 'dislike') {
        setCurrentDislikes(currentDislikes - 1);
      }
      setLikeState('like');
      setCurrentLikes(likeState === 'dislike' ? currentLikes + 1 : currentLikes + 1);
    }
  };

  const handleDislike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (likeState === 'dislike') {
      // Un-dislike
      setLikeState(null);
      setCurrentDislikes(currentDislikes - 1);
    } else {
      // Dislike (and remove like if active)
      if (likeState === 'like') {
        setCurrentLikes(currentLikes - 1);
      }
      setLikeState('dislike');
      setCurrentDislikes(likeState === 'like' ? currentDislikes + 1 : currentDislikes + 1);
    }
  };

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300">
      <Link href={`/${locale}/cities/${city.id}`}>
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
      </Link>

      {/* Content */}
      <CardContent className="p-4">
        <Link href={`/${locale}/cities/${city.id}`}>
          {/* City Name */}
          <div className="mb-2">
            <h3 className="text-xl font-bold">{city.name}</h3>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {city.description}
          </p>

          {/* Key-Value Info */}
          <div className="space-y-2 mb-4 text-sm">
            {/* Budget */}
            <div className="flex items-start gap-2">
              <span className="text-muted-foreground min-w-[60px]">{t("budget")}:</span>
              <span className="font-medium">{filterT(`budgetOptions.${city.budget}`)}</span>
            </div>

            {/* Environment */}
            <div className="flex items-start gap-2">
              <span className="text-muted-foreground min-w-[60px]">{t("environment")}:</span>
              <span className="font-medium">
                {city.environment.map((env) => filterT(`environmentOptions.${env}`)).join(", ")}
              </span>
            </div>

            {/* Best Season */}
            <div className="flex items-start gap-2">
              <span className="text-muted-foreground min-w-[60px]">{t("bestSeason")}:</span>
              <span className="font-medium">
                {city.bestSeason.map((season) => filterT(`seasonOptions.${season}`)).join(", ")}
              </span>
            </div>
          </div>
        </Link>

        {/* Like/Dislike Buttons */}
        <div className="flex items-center gap-4 pt-3 border-t">
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-1 hover:bg-transparent"
            onClick={handleLike}
          >
            <ThumbsUp
              className={`h-4 w-4 ${likeState === 'like' ? 'fill-primary text-primary' : 'text-muted-foreground'}`}
            />
            <span className={`text-sm ${likeState === 'like' ? 'text-primary font-semibold' : 'text-muted-foreground'}`}>
              {currentLikes}
            </span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-1 hover:bg-transparent"
            onClick={handleDislike}
          >
            <ThumbsDown
              className={`h-4 w-4 ${likeState === 'dislike' ? 'fill-destructive text-destructive' : 'text-muted-foreground'}`}
            />
            <span className={`text-sm ${likeState === 'dislike' ? 'text-destructive font-semibold' : 'text-muted-foreground'}`}>
              {currentDislikes}
            </span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
