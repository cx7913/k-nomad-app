import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getCityById, getRelatedCities } from "@/data/cities";
import { Locale } from "@/i18n/config";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Wallet, MapPin, Trees, Sun } from "lucide-react";
import { LikeDislikeButton } from "@/components/city/LikeDislikeButton";
import { RelatedCities } from "@/components/city/RelatedCities";
import { ShareButton } from "@/components/city/ShareButton";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string; id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, id } = await params;
  const city = getCityById(id, locale as Locale);

  if (!city) {
    return {
      title: "도시를 찾을 수 없습니다",
      description: "요청하신 도시를 찾을 수 없습니다.",
    };
  }

  return {
    title: `${city.name} - K-Nomad | 한국 디지털 노마드 도시 가이드`,
    description: city.detailedDescription,
    openGraph: {
      title: `${city.name} - K-Nomad`,
      description: city.description,
      images: [city.imageUrl],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${city.name} - K-Nomad`,
      description: city.description,
      images: [city.imageUrl],
    },
  };
}

export default async function CityDetailPage({ params }: Props) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const city = getCityById(id, locale as Locale);

  if (!city) {
    notFound();
  }

  const relatedCities = getRelatedCities(id, locale as Locale);

  const t = await getTranslations("cityDetail");
  const filterT = await getTranslations("filter");

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[400px] w-full">
        <Image
          src={city.imageUrl}
          alt={city.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 pb-8">
          <div className="flex items-center justify-between mb-4">
            <Link href={`/${locale}`}>
              <Button variant="ghost" className="text-white hover:bg-white/20">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {t("backToList")}
              </Button>
            </Link>
            <ShareButton />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{city.name}</h1>
          <p className="text-lg text-white/90">{city.description}</p>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Monthly Cost Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="h-5 w-5" />
                {t("monthlyCost")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">{city.monthlyCost}만원</p>
              <Badge className="mt-2">{filterT(`budgetOptions.${city.budget}`)}</Badge>
            </CardContent>
          </Card>

          {/* Region Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                {t("region")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Badge variant="secondary" className="text-lg">
                {filterT(`regionOptions.${city.regionKey}`)}
              </Badge>
            </CardContent>
          </Card>

          {/* Likes/Dislikes Card */}
          <Card>
            <CardHeader>
              <CardTitle>평가</CardTitle>
            </CardHeader>
            <CardContent>
              <LikeDislikeButton initialLikes={city.likes} initialDislikes={city.dislikes} />
            </CardContent>
          </Card>

          {/* Environment Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trees className="h-5 w-5" />
                {t("environment")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {city.environment.map((env) => (
                  <Badge key={env} variant="outline">
                    {filterT(`environmentOptions.${env}`)}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Best Season Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sun className="h-5 w-5" />
                {t("bestSeason")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {city.bestSeason.map((season) => (
                  <Badge key={season} variant="outline">
                    {filterT(`seasonOptions.${season}`)}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Information Section */}
        <div className="mt-12 space-y-8">
          {/* Detailed Description */}
          <Card>
            <CardHeader>
              <CardTitle>상세 소개</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-base leading-relaxed text-muted-foreground">
                {city.detailedDescription}
              </p>
            </CardContent>
          </Card>

          {/* Highlights */}
          <Card>
            <CardHeader>
              <CardTitle>주요 특징</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {city.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-primary text-xl mt-0.5">✓</span>
                    <span className="text-base text-muted-foreground">{highlight}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Related Cities */}
        <RelatedCities cities={relatedCities} locale={locale} regionT={filterT} />
      </div>
    </div>
  );
}
