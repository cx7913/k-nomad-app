import { setRequestLocale } from "next-intl/server";
import { HeroSection } from "@/components/home/HeroSection";
import { FilterBar } from "@/components/home/FilterBar";
import { CityGrid } from "@/components/home/CityGrid";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <FilterBar />
      <CityGrid locale={locale} />
    </>
  );
}
