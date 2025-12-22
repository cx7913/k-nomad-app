import { Locale } from "@/i18n/config";

export interface CityBase {
  id: string;
  imageUrl: string;
  monthlyCost: number;
  budget: 'under100' | '100to200' | 'over200';
  region: 'capital' | 'gyeongsang' | 'jeolla' | 'gangwon' | 'jeju' | 'chungcheong';
  environment: ('nature' | 'urban' | 'cafe' | 'coworking')[];
  bestSeason: ('spring' | 'summer' | 'fall' | 'winter')[];
  likes: number;
  dislikes: number;
}

export interface CityTranslation {
  name: string;
  regionKey: string;
  description: string;
}

export interface City extends CityBase, CityTranslation { }

const citiesBase: CityBase[] = [
  {
    id: "seoul",
    // 서울 한강 야경 (Seoul Han River night view)
    imageUrl:
      "https://images.unsplash.com/photo-1631719223645-bc3cd67e5cdd?w=800&q=80",
    monthlyCost: 180,
    budget: 'over200',
    region: 'capital',
    environment: ['urban', 'coworking'],
    bestSeason: ['spring', 'fall'],
    likes: 256,
    dislikes: 12,
  },
  {
    id: "busan",
    // 부산 해운대 야경 (Busan Haeundae night view)
    imageUrl:
      "https://images.unsplash.com/photo-1701172189149-450eecf09863?w=800&q=80",
    monthlyCost: 120,
    budget: '100to200',
    region: 'gyeongsang',
    environment: ['urban', 'cafe'],
    bestSeason: ['summer'],
    likes: 128,
    dislikes: 8,
  },
  {
    id: "jeju",
    // 제주 한라산 (Jeju Hallasan mountain)
    imageUrl:
      "https://images.unsplash.com/photo-1740329289193-1ea949e2e824?w=800&q=80",
    monthlyCost: 150,
    budget: '100to200',
    region: 'jeju',
    environment: ['nature', 'cafe'],
    bestSeason: ['spring', 'fall'],
    likes: 189,
    dislikes: 15,
  },
  {
    id: "gangneung",
    // 강릉 동해 일출 (Gangneung East Sea sunrise)
    imageUrl:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    monthlyCost: 100,
    budget: 'under100',
    region: 'gangwon',
    environment: ['nature', 'cafe'],
    bestSeason: ['summer'],
    likes: 87,
    dislikes: 5,
  },
  {
    id: "jeonju",
    // 전주 한옥마을 (Jeonju Hanok Village)
    imageUrl:
      "https://images.unsplash.com/photo-1653230675261-fe00bde32c8e?w=800&q=80",
    monthlyCost: 90,
    budget: 'under100',
    region: 'jeolla',
    environment: ['cafe'],
    bestSeason: ['fall'],
    likes: 64,
    dislikes: 3,
  },
  {
    id: "daejeon",
    // 대전 도심 야경 (Daejeon city night view)
    imageUrl:
      "https://images.unsplash.com/photo-1548115184-bc6544d06a58?w=800&q=80",
    monthlyCost: 95,
    budget: 'under100',
    region: 'chungcheong',
    environment: ['urban', 'coworking'],
    bestSeason: ['spring'],
    likes: 42,
    dislikes: 2,
  },
  {
    id: "daegu",
    // 대구 도심 골목 (Daegu city alley)
    imageUrl:
      "https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=800&q=80",
    monthlyCost: 100,
    budget: 'under100',
    region: 'gyeongsang',
    environment: ['urban'],
    bestSeason: ['fall'],
    likes: 53,
    dislikes: 4,
  },
  {
    id: "chuncheon",
    // 춘천 호수 (Chuncheon lake - official city image)
    imageUrl:
      "https://www.chuncheon.go.kr/_cmm/fms/getImage.do?atchFileId=FILE_000000000066917&imgFlag=thumbnail&thumbnail=true",
    monthlyCost: 85,
    budget: 'under100',
    region: 'gangwon',
    environment: ['nature'],
    bestSeason: ['fall'],
    likes: 38,
    dislikes: 2,
  },
  {
    id: "yeosu",
    // 여수 밤바다 (Yeosu night sea - official tourism image)
    imageUrl:
      "https://www.yeosu.go.kr/tour/contents/1872/night_sea_4.jpg",
    monthlyCost: 95,
    budget: 'under100',
    region: 'jeolla',
    environment: ['nature'],
    bestSeason: ['summer'],
    likes: 45,
    dislikes: 3,
  },
  {
    id: "yangyang",
    // 양양 서핑 (Yangyang surfing - official tourism image)
    imageUrl:
      "https://tour.yangyang.go.kr/dzSmart/extend/YY_Pages/imgs/img_todo3_1.jpg",
    monthlyCost: 110,
    budget: '100to200',
    region: 'gangwon',
    environment: ['nature', 'cafe'],
    bestSeason: ['summer'],
    likes: 72,
    dislikes: 6,
  },
];

const translations: Record<string, Record<Locale, CityTranslation>> = {
  seoul: {
    ko: {
      name: "서울",
      regionKey: "capital",
      description: "대한민국의 수도, 최고의 인프라와 다양한 문화",
    },
    en: {
      name: "Seoul",
      regionKey: "capital",
      description:
        "The capital of South Korea with the best infrastructure and diverse culture",
    },
    ja: {
      name: "ソウル",
      regionKey: "capital",
      description: "韓国の首都、最高のインフラと多様な文化",
    },
    zh: {
      name: "首尔",
      regionKey: "capital",
      description: "韩国首都，拥有最佳基础设施和多元文化",
    },
    fr: {
      name: "Séoul",
      regionKey: "capital",
      description: "Capitale de la Corée du Sud, meilleures infrastructures et culture diversifiée",
    },
    it: {
      name: "Seul",
      regionKey: "capital",
      description: "La capitale della Corea del Sud, con le migliori infrastrutture e una cultura diversificata",
    },
    es: {
      name: "Seúl",
      regionKey: "capital",
      description: "Capital de Corea del Sur, con la mejor infraestructura y cultura diversa",
    },
  },
  busan: {
    ko: {
      name: "부산",
      regionKey: "gyeongsang",
      description: "해변과 도시가 공존하는 제2의 도시",
    },
    en: {
      name: "Busan",
      regionKey: "gyeongsang",
      description:
        "Korea's second largest city where beaches and urban life coexist",
    },
    ja: {
      name: "釜山",
      regionKey: "gyeongsang",
      description: "ビーチと都市が共存する第二の都市",
    },
    zh: {
      name: "釜山",
      regionKey: "gyeongsang",
      description: "海滩与都市共存的第二大城市",
    },
    fr: {
      name: "Busan",
      regionKey: "gyeongsang",
      description: "Deuxième ville de Corée où plages et vie urbaine coexistent",
    },
    it: {
      name: "Busan",
      regionKey: "gyeongsang",
      description: "La seconda città più grande della Corea dove convivono spiagge e vita urbana",
    },
    es: {
      name: "Busan",
      regionKey: "gyeongsang",
      description: "La segunda ciudad más grande de Corea, donde conviven playas y vida urbana",
    },
  },
  jeju: {
    ko: {
      name: "제주",
      regionKey: "jeju",
      description: "자연과 함께하는 워케이션의 성지",
    },
    en: {
      name: "Jeju",
      regionKey: "jeju",
      description: "A paradise for workation surrounded by nature",
    },
    ja: {
      name: "済州",
      regionKey: "jeju",
      description: "自然と共にするワーケーションの聖地",
    },
    zh: {
      name: "济州",
      regionKey: "jeju",
      description: "与自然共处的工作度假圣地",
    },
    fr: {
      name: "Jeju",
      regionKey: "jeju",
      description: "Un paradis pour le travail à distance entouré de nature",
    },
    it: {
      name: "Jeju",
      regionKey: "jeju",
      description: "Un paradiso per il lavoro da remoto immerso nella natura",
    },
    es: {
      name: "Jeju",
      regionKey: "jeju",
      description: "Un paraíso para el trabajo remoto rodeado de naturaleza",
    },
  },
  gangneung: {
    ko: {
      name: "강릉",
      regionKey: "gangwon",
      description: "동해 바다와 커피거리의 낭만",
    },
    en: {
      name: "Gangneung",
      regionKey: "gangwon",
      description: "Romance of the East Sea and coffee streets",
    },
    ja: {
      name: "江陵",
      regionKey: "gangwon",
      description: "東海とコーヒー通りのロマン",
    },
    zh: {
      name: "江陵",
      regionKey: "gangwon",
      description: "东海与咖啡街的浪漫",
    },
    fr: {
      name: "Gangneung",
      regionKey: "gangwon",
      description: "Romantisme de la mer de l'Est et des rues du café",
    },
    it: {
      name: "Gangneung",
      regionKey: "gangwon",
      description: "Il romanticismo del Mare Orientale e le via del caffè",
    },
    es: {
      name: "Gangneung",
      regionKey: "gangwon",
      description: "El romanticismo del Mar del Este y las calles del café",
    },
  },
  jeonju: {
    ko: {
      name: "전주",
      regionKey: "jeolla",
      description: "한옥마을과 맛의 도시",
    },
    en: {
      name: "Jeonju",
      regionKey: "jeolla",
      description: "City of traditional hanok village and culinary delights",
    },
    ja: {
      name: "全州",
      regionKey: "jeolla",
      description: "韓屋村と美食の街",
    },
    zh: {
      name: "全州",
      regionKey: "jeolla",
      description: "韩屋村与美食之城",
    },
    fr: {
      name: "Jeonju",
      regionKey: "jeolla",
      description: "Ville du village traditionnel hanok et des délices culinaires",
    },
    it: {
      name: "Jeonju",
      regionKey: "jeolla",
      description: "Città del tradizionale villaggio hanok e delle delizie culinarie",
    },
    es: {
      name: "Jeonju",
      regionKey: "jeolla",
      description: "Ciudad del pueblo tradicional hanok y delicias culinarias",
    },
  },
  daejeon: {
    ko: {
      name: "대전",
      regionKey: "chungcheong",
      description: "대한민국의 중심, 교통의 요지",
    },
    en: {
      name: "Daejeon",
      regionKey: "chungcheong",
      description: "The center of Korea and a transportation hub",
    },
    ja: {
      name: "大田",
      regionKey: "chungcheong",
      description: "韓国の中心、交通の要所",
    },
    zh: {
      name: "大田",
      regionKey: "chungcheong",
      description: "韩国的中心，交通枢纽",
    },
    fr: {
      name: "Daejeon",
      regionKey: "chungcheong",
      description: "Le centre de la Corée et un carrefour de transport",
    },
    it: {
      name: "Daejeon",
      regionKey: "chungcheong",
      description: "Il centro della Corea e snodo dei trasporti",
    },
    es: {
      name: "Daejeon",
      regionKey: "chungcheong",
      description: "El centro de Corea y centro de transporte",
    },
  },
  daegu: {
    ko: {
      name: "대구",
      regionKey: "gyeongsang",
      description: "분지 속 따뜻한 도시",
    },
    en: {
      name: "Daegu",
      regionKey: "gyeongsang",
      description: "A warm city nestled in a basin",
    },
    ja: {
      name: "大邱",
      regionKey: "gyeongsang",
      description: "盆地の中の暖かい都市",
    },
    zh: {
      name: "大邱",
      regionKey: "gyeongsang",
      description: "盆地中的温暖城市",
    },
    fr: {
      name: "Daegu",
      regionKey: "gyeongsang",
      description: "Une ville chaude nichée dans une cuvette",
    },
    it: {
      name: "Daegu",
      regionKey: "gyeongsang",
      description: "Una città calda incastonata in un bacino",
    },
    es: {
      name: "Daegu",
      regionKey: "gyeongsang",
      description: "Una ciudad cálida enclavada en una cuenca",
    },
  },
  chuncheon: {
    ko: {
      name: "춘천",
      regionKey: "gangwon",
      description: "호수와 자연이 어우러진 도시",
    },
    en: {
      name: "Chuncheon",
      regionKey: "gangwon",
      description: "A city harmonized with lakes and nature",
    },
    ja: {
      name: "春川",
      regionKey: "gangwon",
      description: "湖と自然が調和する都市",
    },
    zh: {
      name: "春川",
      regionKey: "gangwon",
      description: "湖泊与自然和谐共处的城市",
    },
    fr: {
      name: "Chuncheon",
      regionKey: "gangwon",
      description: "Une ville en harmonie avec les lacs et la nature",
    },
    it: {
      name: "Chuncheon",
      regionKey: "gangwon",
      description: "Una città armonizzata con laghi e natura",
    },
    es: {
      name: "Chuncheon",
      regionKey: "gangwon",
      description: "Una ciudad armonizada con lagos y naturaleza",
    },
  },
  yeosu: {
    ko: {
      name: "여수",
      regionKey: "jeolla",
      description: "밤바다의 낭만, 느린 삶",
    },
    en: {
      name: "Yeosu",
      regionKey: "jeolla",
      description: "Romance of night sea and slow living",
    },
    ja: {
      name: "麗水",
      regionKey: "jeolla",
      description: "夜の海のロマン、スローライフ",
    },
    zh: {
      name: "丽水",
      regionKey: "jeolla",
      description: "夜海的浪漫，慢生活",
    },
    fr: {
      name: "Yeosu",
      regionKey: "jeolla",
      description: "Romantisme de la mer nocturne et vie lente",
    },
    it: {
      name: "Yeosu",
      regionKey: "jeolla",
      description: "Romanticismo del mare notturno e vita lenta",
    },
    es: {
      name: "Yeosu",
      regionKey: "jeolla",
      description: "Romanticismo del mar nocturno y vida lenta",
    },
  },
  yangyang: {
    ko: {
      name: "양양",
      regionKey: "gangwon",
      description: "서핑과 원격근무의 조화",
    },
    en: {
      name: "Yangyang",
      regionKey: "gangwon",
      description: "Harmony of surfing and remote work",
    },
    ja: {
      name: "襄陽",
      regionKey: "gangwon",
      description: "サーフィンとリモートワークの調和",
    },
    zh: {
      name: "襄阳",
      regionKey: "gangwon",
      description: "冲浪与远程办公的和谐",
    },
    fr: {
      name: "Yangyang",
      regionKey: "gangwon",
      description: "Harmonie entre surf et travail à distance",
    },
    it: {
      name: "Yangyang",
      regionKey: "gangwon",
      description: "Armonia tra surf e lavoro da remoto",
    },
    es: {
      name: "Yangyang",
      regionKey: "gangwon",
      description: "Armonía entre surf y trabajo remoto",
    },
  },
};

export function getCities(locale: Locale): City[] {
  return citiesBase.map((city) => ({
    ...city,
    ...translations[city.id][locale],
  }));
}

export function getCityById(id: string, locale: Locale): City | null {
  const city = citiesBase.find((c) => c.id === id);
  if (!city) return null;
  return {
    ...city,
    ...translations[city.id][locale],
  };
}

export const regions = [
  "all",
  "capital",
  "gyeongsang",
  "jeolla",
  "gangwon",
  "jeju",
  "chungcheong",
] as const;

export const budgetOptions = [
  "under100",
  "100to200",
  "over200",
] as const;

export const environmentOptions = [
  "nature",
  "urban",
  "cafe",
  "coworking",
] as const;

export const seasonOptions = [
  "spring",
  "summer",
  "fall",
  "winter",
] as const;

export const sortOptions = [
  "likes",
] as const;
