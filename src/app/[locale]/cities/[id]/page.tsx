import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getCityById } from "@/data/cities";
import { Locale } from "@/i18n/config";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ThumbsUp, ThumbsDown, Wallet, MapPin, Trees, Sun } from "lucide-react";

type Props = {
  params: Promise<{ locale: string; id: string }>;
};

export default async function CityDetailPage({ params }: Props) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const city = getCityById(id, locale as Locale);

  if (!city) {
    notFound();
  }

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
          <Link href={`/${locale}`}>
            <Button variant="ghost" className="text-white mb-4 hover:bg-white/20">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t("backToList")}
            </Button>
          </Link>
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
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <ThumbsUp className="h-5 w-5 text-green-600" />
                  <span className="text-xl font-semibold">{city.likes}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ThumbsDown className="h-5 w-5 text-red-600" />
                  <span className="text-xl font-semibold">{city.dislikes}</span>
                </div>
              </div>
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
      </div>
    </div>
  );
}
