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
  detailedDescription: string;
  highlights: string[];
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
      detailedDescription: "서울은 대한민국의 수도이자 경제, 문화, 정치의 중심지입니다. 초고속 인터넷, 풍부한 코워킹 스페이스, 24시간 운영되는 카페와 편의시설로 디지털 노마드에게 최적의 환경을 제공합니다. 대중교통이 잘 발달되어 있으며, 강남, 홍대, 이태원 등 다양한 지역마다 독특한 문화와 분위기를 경험할 수 있습니다.",
      highlights: [
        "세계 최고 수준의 인터넷 속도 (평균 100Mbps+)",
        "300개 이상의 코워킹 스페이스",
        "24시간 운영 카페 및 편의시설",
        "발달된 대중교통 시스템 (지하철, 버스)",
        "다양한 국제 커뮤니티 및 네트워킹 이벤트"
      ],
    },
    en: {
      name: "Seoul",
      regionKey: "capital",
      description:
        "The capital of South Korea with the best infrastructure and diverse culture",
      detailedDescription: "Seoul is the capital of South Korea and the center of economy, culture, and politics. With ultra-fast internet, abundant coworking spaces, 24-hour cafes, and convenience facilities, it provides an optimal environment for digital nomads. The city has a well-developed public transportation system, and each area like Gangnam, Hongdae, and Itaewon offers unique cultures and atmospheres.",
      highlights: [
        "World-class internet speed (average 100Mbps+)",
        "Over 300 coworking spaces",
        "24-hour cafes and convenience facilities",
        "Advanced public transportation (subway, bus)",
        "Diverse international communities and networking events"
      ],
    },
    ja: {
      name: "ソウル",
      regionKey: "capital",
      description: "韓国の首都、最高のインフラと多様な文化",
      detailedDescription: "Seoul is the capital of South Korea and the center of economy, culture, and politics. With ultra-fast internet, abundant coworking spaces, 24-hour cafes, and convenience facilities, it provides an optimal environment for digital nomads.",
      highlights: ["World-class internet speed", "Over 300 coworking spaces", "24-hour cafes", "Advanced public transportation", "International communities"],
    },
    zh: {
      name: "首尔",
      regionKey: "capital",
      description: "韩国首都，拥有最佳基础设施和多元文化",
      detailedDescription: "Seoul is the capital of South Korea and the center of economy, culture, and politics. With ultra-fast internet, abundant coworking spaces, 24-hour cafes, and convenience facilities, it provides an optimal environment for digital nomads.",
      highlights: ["World-class internet speed", "Over 300 coworking spaces", "24-hour cafes", "Advanced public transportation", "International communities"],
    },
    fr: {
      name: "Séoul",
      regionKey: "capital",
      description: "Capitale de la Corée du Sud, meilleures infrastructures et culture diversifiée",
      detailedDescription: "Seoul is the capital of South Korea and the center of economy, culture, and politics. With ultra-fast internet, abundant coworking spaces, 24-hour cafes, and convenience facilities, it provides an optimal environment for digital nomads.",
      highlights: ["World-class internet speed", "Over 300 coworking spaces", "24-hour cafes", "Advanced public transportation", "International communities"],
    },
    it: {
      name: "Seul",
      regionKey: "capital",
      description: "La capitale della Corea del Sud, con le migliori infrastrutture e una cultura diversificata",
      detailedDescription: "Seoul is the capital of South Korea and the center of economy, culture, and politics. With ultra-fast internet, abundant coworking spaces, 24-hour cafes, and convenience facilities, it provides an optimal environment for digital nomads.",
      highlights: ["World-class internet speed", "Over 300 coworking spaces", "24-hour cafes", "Advanced public transportation", "International communities"],
    },
    es: {
      name: "Seúl",
      regionKey: "capital",
      description: "Capital de Corea del Sur, con la mejor infraestructura y cultura diversa",
      detailedDescription: "Seoul is the capital of South Korea and the center of economy, culture, and politics. With ultra-fast internet, abundant coworking spaces, 24-hour cafes, and convenience facilities, it provides an optimal environment for digital nomads.",
      highlights: ["World-class internet speed", "Over 300 coworking spaces", "24-hour cafes", "Advanced public transportation", "International communities"],
    },
  },
  busan: {
    ko: {
      name: "부산",
      regionKey: "gyeongsang",
      description: "해변과 도시가 공존하는 제2의 도시",
      detailedDescription: "부산은 대한민국 제2의 도시로 아름다운 해변과 도심이 조화를 이루는 곳입니다. 해운대, 광안리 등 유명 해변에서 서핑과 휴식을 즐기며, 동시에 도심의 카페와 코워킹 스페이스에서 업무를 처리할 수 있습니다. 서울에 비해 저렴한 생활비와 여유로운 분위기로 장기 체류에 적합합니다.",
      highlights: [
        "해운대, 광안리 등 유명 해변 접근성",
        "서울 대비 합리적인 생활비 (약 30% 저렴)",
        "성장하는 스타트업 및 IT 커뮤니티",
        "다양한 해산물 요리와 맛집",
        "온화한 기후와 바다 전망"
      ],
    },
    en: {
      name: "Busan",
      regionKey: "gyeongsang",
      description:
        "Korea's second largest city where beaches and urban life coexist",
      detailedDescription: "Busan is South Korea's second-largest city where beautiful beaches harmonize with urban areas. You can enjoy surfing and relaxation at famous beaches like Haeundae and Gwangalli while working from downtown cafes and coworking spaces. With lower living costs and a more relaxed atmosphere compared to Seoul, it's ideal for long-term stays.",
      highlights: [
        "Access to famous beaches like Haeundae and Gwangalli",
        "Affordable cost of living (about 30% cheaper than Seoul)",
        "Growing startup and IT community",
        "Diverse seafood cuisine and restaurants",
        "Mild climate with ocean views"
      ],
    },
    ja: {
      name: "釜山",
      regionKey: "gyeongsang",
      description: "ビーチと都市が共存する第二の都市",
      detailedDescription: "Busan is South Korea's second-largest city where beautiful beaches harmonize with urban areas.",
      highlights: ["Famous beaches", "Affordable living", "IT community", "Seafood cuisine", "Ocean views"],
    },
    zh: {
      name: "釜山",
      regionKey: "gyeongsang",
      description: "海滩与都市共存的第二大城市",
      detailedDescription: "Busan is South Korea's second-largest city where beautiful beaches harmonize with urban areas.",
      highlights: ["Famous beaches", "Affordable living", "IT community", "Seafood cuisine", "Ocean views"],
    },
    fr: {
      name: "Busan",
      regionKey: "gyeongsang",
      description: "Deuxième ville de Corée où plages et vie urbaine coexistent",
      detailedDescription: "Busan is South Korea's second-largest city where beautiful beaches harmonize with urban areas.",
      highlights: ["Famous beaches", "Affordable living", "IT community", "Seafood cuisine", "Ocean views"],
    },
    it: {
      name: "Busan",
      regionKey: "gyeongsang",
      description: "La seconda città più grande della Corea dove convivono spiagge e vita urbana",
      detailedDescription: "Busan is South Korea's second-largest city where beautiful beaches harmonize with urban areas.",
      highlights: ["Famous beaches", "Affordable living", "IT community", "Seafood cuisine", "Ocean views"],
    },
    es: {
      name: "Busan",
      regionKey: "gyeongsang",
      description: "La segunda ciudad más grande de Corea, donde conviven playas y vida urbana",
      detailedDescription: "Busan is South Korea's second-largest city where beautiful beaches harmonize with urban areas.",
      highlights: ["Famous beaches", "Affordable living", "IT community", "Seafood cuisine", "Ocean views"],
    },
  },
  jeju: {
    ko: {
      name: "제주",
      regionKey: "jeju",
      description: "자연과 함께하는 워케이션의 성지",
      detailedDescription: "제주도는 한국의 대표적인 워케이션 명소로, 아름다운 자연경관과 여유로운 생활 리듬이 특징입니다. 한라산, 해변, 오름 등 다양한 자연 환경 속에서 일과 휴식의 균형을 찾을 수 있습니다. 최근 디지털 노마드를 위한 코워킹 스페이스와 장기 숙소가 증가하고 있으며, 온화한 기후로 사계절 체류가 가능합니다.",
      highlights: [
        "유네스코 세계자연유산 한라산",
        "300개 이상의 오름과 해변",
        "증가하는 코워킹 스페이스 및 노마드 커뮤니티",
        "신선한 로컬 식재료와 독특한 제주 음식",
        "온화한 기후 (연평균 16°C)"
      ],
    },
    en: {
      name: "Jeju",
      regionKey: "jeju",
      description: "A paradise for workation surrounded by nature",
      detailedDescription: "Jeju Island is Korea's premier workation destination, characterized by beautiful natural scenery and a relaxed pace of life. You can find balance between work and rest in diverse natural environments including Hallasan Mountain, beaches, and oreums (volcanic cones). Coworking spaces and long-term accommodations for digital nomads are increasing, and the mild climate allows year-round stays.",
      highlights: [
        "UNESCO World Heritage Hallasan Mountain",
        "Over 300 oreums and beaches",
        "Growing coworking spaces and nomad community",
        "Fresh local ingredients and unique Jeju cuisine",
        "Mild climate (average 16°C year-round)"
      ],
    },
    ja: {
      name: "済州",
      regionKey: "jeju",
      description: "自然と共にするワーケーションの聖地",
      detailedDescription: "Jeju Island is Korea's premier workation destination with beautiful nature and relaxed lifestyle.",
      highlights: ["Hallasan Mountain", "Beaches", "Coworking spaces", "Local cuisine", "Mild climate"],
    },
    zh: {
      name: "济州",
      regionKey: "jeju",
      description: "与自然共处的工作度假圣地",
      detailedDescription: "Jeju Island is Korea's premier workation destination with beautiful nature and relaxed lifestyle.",
      highlights: ["Hallasan Mountain", "Beaches", "Coworking spaces", "Local cuisine", "Mild climate"],
    },
    fr: {
      name: "Jeju",
      regionKey: "jeju",
      description: "Un paradis pour le travail à distance entouré de nature",
      detailedDescription: "Jeju Island is Korea's premier workation destination with beautiful nature and relaxed lifestyle.",
      highlights: ["Hallasan Mountain", "Beaches", "Coworking spaces", "Local cuisine", "Mild climate"],
    },
    it: {
      name: "Jeju",
      regionKey: "jeju",
      description: "Un paradiso per il lavoro da remoto immerso nella natura",
      detailedDescription: "Jeju Island is Korea's premier workation destination with beautiful nature and relaxed lifestyle.",
      highlights: ["Hallasan Mountain", "Beaches", "Coworking spaces", "Local cuisine", "Mild climate"],
    },
    es: {
      name: "Jeju",
      regionKey: "jeju",
      description: "Un paraíso para el trabajo remoto rodeado de naturaleza",
      detailedDescription: "Jeju Island is Korea's premier workation destination with beautiful nature and relaxed lifestyle.",
      highlights: ["Hallasan Mountain", "Beaches", "Coworking spaces", "Local cuisine", "Mild climate"],
    },
  },
  gangneung: {
    ko: {
      name: "강릉",
      regionKey: "gangwon",
      description: "동해 바다와 커피거리의 낭만",
      detailedDescription: "강릉은 동해안의 대표적인 관광 도시로, 아름다운 해변과 커피 문화로 유명합니다. 안목 커피거리를 비롯한 수많은 카페에서 바다를 보며 작업할 수 있으며, 경포대, 주문진 등 다양한 해변을 즐길 수 있습니다. 서울에서 KTX로 2시간이면 도착할 수 있어 접근성도 좋습니다.",
      highlights: [
        "안목 커피거리와 200개 이상의 카페",
        "경포해변, 주문진 등 아름다운 동해안",
        "서울에서 KTX 2시간 거리",
        "저렴한 생활비 (월 100만원 이하)",
        "신선한 해산물과 로컬 맛집"
      ],
    },
    en: {
      name: "Gangneung",
      regionKey: "gangwon",
      description: "Romance of the East Sea and coffee streets",
      detailedDescription: "Gangneung is a representative tourist city on the East Coast, famous for its beautiful beaches and coffee culture. You can work while enjoying ocean views at numerous cafes including Anmok Coffee Street, and enjoy various beaches like Gyeongpo and Jumunjin. It's easily accessible from Seoul, just 2 hours by KTX.",
      highlights: [
        "Anmok Coffee Street with over 200 cafes",
        "Beautiful East Coast beaches like Gyeongpo",
        "2-hour KTX ride from Seoul",
        "Affordable living (under 1M KRW/month)",
        "Fresh seafood and local restaurants"
      ],
    },
    ja: {
      name: "江陵",
      regionKey: "gangwon",
      description: "東海とコーヒー通りのロマン",
      detailedDescription: "Gangneung is famous for beautiful beaches and coffee culture on the East Coast.",
      highlights: ["Coffee Street", "Beaches", "KTX access", "Affordable", "Seafood"],
    },
    zh: {
      name: "江陵",
      regionKey: "gangwon",
      description: "东海与咖啡街的浪漫",
      detailedDescription: "Gangneung is famous for beautiful beaches and coffee culture on the East Coast.",
      highlights: ["Coffee Street", "Beaches", "KTX access", "Affordable", "Seafood"],
    },
    fr: {
      name: "Gangneung",
      regionKey: "gangwon",
      description: "Romantisme de la mer de l'Est et des rues du café",
      detailedDescription: "Gangneung is famous for beautiful beaches and coffee culture on the East Coast.",
      highlights: ["Coffee Street", "Beaches", "KTX access", "Affordable", "Seafood"],
    },
    it: {
      name: "Gangneung",
      regionKey: "gangwon",
      description: "Il romanticismo del Mare Orientale e le via del caffè",
      detailedDescription: "Gangneung is famous for beautiful beaches and coffee culture on the East Coast.",
      highlights: ["Coffee Street", "Beaches", "KTX access", "Affordable", "Seafood"],
    },
    es: {
      name: "Gangneung",
      regionKey: "gangwon",
      description: "El romanticismo del Mar del Este y las calles del café",
      detailedDescription: "Gangneung is famous for beautiful beaches and coffee culture on the East Coast.",
      highlights: ["Coffee Street", "Beaches", "KTX access", "Affordable", "Seafood"],
    },
  },
  jeonju: {
    ko: {
      name: "전주",
      regionKey: "jeolla",
      description: "한옥마을과 맛의 도시",
      detailedDescription: "전주는 한국 전통 문화와 미식의 중심지입니다. 전주 한옥마을의 전통적인 분위기 속에서 작업하며, 전주비빔밥, 콩나물국밥 등 유네스코 음식창의도시답게 다양한 먹거리를 즐길 수 있습니다. 조용하고 여유로운 분위기로 집중해서 일하기 좋으며, 생활비가 저렴합니다.",
      highlights: [
        "유네스코 음식창의도시",
        "전주 한옥마을과 전통 문화 체험",
        "전주비빔밥 등 풍부한 먹거리",
        "저렴한 생활비 (월 90만원 이하)",
        "조용하고 집중하기 좋은 환경"
      ],
    },
    en: {
      name: "Jeonju",
      regionKey: "jeolla",
      description: "City of traditional hanok village and culinary delights",
      detailedDescription: "Jeonju is the heart of Korean traditional culture and gastronomy. You can work in the traditional atmosphere of Jeonju Hanok Village while enjoying diverse foods like Jeonju bibimbap and bean sprout soup, befitting a UNESCO City of Gastronomy. It's a quiet and relaxed environment perfect for focused work, with low living costs.",
      highlights: [
        "UNESCO City of Gastronomy",
        "Jeonju Hanok Village and traditional culture",
        "Rich culinary scene including Jeonju bibimbap",
        "Affordable living (under 900K KRW/month)",
        "Quiet environment for focused work"
      ],
    },
    ja: {
      name: "全州",
      regionKey: "jeolla",
      description: "韓屋村と美食の街",
      detailedDescription: "Jeonju is the heart of Korean traditional culture and gastronomy with Hanok Village.",
      highlights: ["UNESCO City", "Hanok Village", "Bibimbap", "Affordable", "Quiet"],
    },
    zh: {
      name: "全州",
      regionKey: "jeolla",
      description: "韩屋村与美食之城",
      detailedDescription: "Jeonju is the heart of Korean traditional culture and gastronomy with Hanok Village.",
      highlights: ["UNESCO City", "Hanok Village", "Bibimbap", "Affordable", "Quiet"],
    },
    fr: {
      name: "Jeonju",
      regionKey: "jeolla",
      description: "Ville du village traditionnel hanok et des délices culinaires",
      detailedDescription: "Jeonju is the heart of Korean traditional culture and gastronomy with Hanok Village.",
      highlights: ["UNESCO City", "Hanok Village", "Bibimbap", "Affordable", "Quiet"],
    },
    it: {
      name: "Jeonju",
      regionKey: "jeolla",
      description: "Città del tradizionale villaggio hanok e delle delizie culinarie",
      detailedDescription: "Jeonju is the heart of Korean traditional culture and gastronomy with Hanok Village.",
      highlights: ["UNESCO City", "Hanok Village", "Bibimbap", "Affordable", "Quiet"],
    },
    es: {
      name: "Jeonju",
      regionKey: "jeolla",
      description: "Ciudad del pueblo tradicional hanok y delicias culinarias",
      detailedDescription: "Jeonju is the heart of Korean traditional culture and gastronomy with Hanok Village.",
      highlights: ["UNESCO City", "Hanok Village", "Bibimbap", "Affordable", "Quiet"],
    },
  },
  daejeon: {
    ko: {
      name: "대전",
      regionKey: "chungcheong",
      description: "대한민국의 중심, 교통의 요지",
      detailedDescription: "대전은 한국의 지리적 중심에 위치한 과학과 교육의 도시입니다. KAIST, 대덕연구단지 등으로 인해 IT 및 과학 분야 종사자들이 많으며, 코워킹 스페이스와 스타트업 인프라가 잘 갖춰져 있습니다. KTX로 서울, 부산 등 주요 도시로의 접근성이 뛰어나며, 생활비가 저렴합니다.",
      highlights: [
        "KAIST, 대덕연구단지 등 IT/과학 인프라",
        "KTX 교통 허브 (서울 50분, 부산 1시간)",
        "코워킹 스페이스 및 스타트업 생태계",
        "저렴한 생활비 (월 95만원 이하)",
        "깨끗하고 정돈된 도시 환경"
      ],
    },
    en: {
      name: "Daejeon",
      regionKey: "chungcheong",
      description: "The center of Korea and a transportation hub",
      detailedDescription: "Daejeon is a city of science and education located at the geographical center of Korea. With KAIST and Daedeok Research Complex, there are many IT and science professionals, and coworking spaces and startup infrastructure are well-established. It has excellent accessibility to major cities like Seoul and Busan via KTX, with low living costs.",
      highlights: [
        "IT/Science infrastructure including KAIST",
        "KTX hub (50min to Seoul, 1hr to Busan)",
        "Coworking spaces and startup ecosystem",
        "Affordable living (under 950K KRW/month)",
        "Clean and well-organized urban environment"
      ],
    },
    ja: {
      name: "大田",
      regionKey: "chungcheong",
      description: "韓国の中心、交通の要所",
      detailedDescription: "Daejeon is a city of science and education at Korea's center with excellent transportation.",
      highlights: ["KAIST", "KTX hub", "Coworking", "Affordable", "Clean city"],
    },
    zh: {
      name: "大田",
      regionKey: "chungcheong",
      description: "韩国的中心，交通枢纽",
      detailedDescription: "Daejeon is a city of science and education at Korea's center with excellent transportation.",
      highlights: ["KAIST", "KTX hub", "Coworking", "Affordable", "Clean city"],
    },
    fr: {
      name: "Daejeon",
      regionKey: "chungcheong",
      description: "Le centre de la Corée et un carrefour de transport",
      detailedDescription: "Daejeon is a city of science and education at Korea's center with excellent transportation.",
      highlights: ["KAIST", "KTX hub", "Coworking", "Affordable", "Clean city"],
    },
    it: {
      name: "Daejeon",
      regionKey: "chungcheong",
      description: "Il centro della Corea e snodo dei trasporti",
      detailedDescription: "Daejeon is a city of science and education at Korea's center with excellent transportation.",
      highlights: ["KAIST", "KTX hub", "Coworking", "Affordable", "Clean city"],
    },
    es: {
      name: "Daejeon",
      regionKey: "chungcheong",
      description: "El centro de Corea y centro de transporte",
      detailedDescription: "Daejeon is a city of science and education at Korea's center with excellent transportation.",
      highlights: ["KAIST", "KTX hub", "Coworking", "Affordable", "Clean city"],
    },
  },
  daegu: {
    ko: {
      name: "대구",
      regionKey: "gyeongsang",
      description: "분지 속 따뜻한 도시",
      detailedDescription: "대구는 분지 지형으로 사계절이 뚜렷하고 따뜻한 도시입니다. 섬유와 패션 산업으로 유명하며, 최근 스타트업과 IT 기업이 증가하고 있습니다. 조용한 분위기와 저렴한 생활비로 장기 체류에 적합하며, 김광석 거리, 동성로 등 문화 공간이 발달해 있습니다.",
      highlights: [
        "따뜻한 기후와 뚜렷한 사계절",
        "저렴한 생활비 (월 100만원 이하)",
        "성장하는 스타트업 생태계",
        "김광석 거리 등 문화 공간",
        "조용하고 여유로운 도시 분위기"
      ],
    },
    en: {
      name: "Daegu",
      regionKey: "gyeongsang",
      description: "A warm city nestled in a basin",
      detailedDescription: "Daegu is a warm city with distinct four seasons due to its basin topography. Famous for textile and fashion industries, startups and IT companies are recently increasing. It's suitable for long-term stays with a quiet atmosphere and low living costs, with cultural spaces like Kim Gwangseok Street and Dongseongro.",
      highlights: [
        "Warm climate with distinct seasons",
        "Affordable living (under 1M KRW/month)",
        "Growing startup ecosystem",
        "Cultural spaces like Kim Gwangseok Street",
        "Quiet and relaxed atmosphere"
      ],
    },
    ja: {
      name: "大邱",
      regionKey: "gyeongsang",
      description: "盆地の中の暖かい都市",
      detailedDescription: "Daegu is a warm city with distinct seasons and growing startup scene.",
      highlights: ["Warm climate", "Affordable", "Startups", "Culture", "Quiet"],
    },
    zh: {
      name: "大邱",
      regionKey: "gyeongsang",
      description: "盆地中的温暖城市",
      detailedDescription: "Daegu is a warm city with distinct seasons and growing startup scene.",
      highlights: ["Warm climate", "Affordable", "Startups", "Culture", "Quiet"],
    },
    fr: {
      name: "Daegu",
      regionKey: "gyeongsang",
      description: "Une ville chaude nichée dans une cuvette",
      detailedDescription: "Daegu is a warm city with distinct seasons and growing startup scene.",
      highlights: ["Warm climate", "Affordable", "Startups", "Culture", "Quiet"],
    },
    it: {
      name: "Daegu",
      regionKey: "gyeongsang",
      description: "Una città calda incastonata in un bacino",
      detailedDescription: "Daegu is a warm city with distinct seasons and growing startup scene.",
      highlights: ["Warm climate", "Affordable", "Startups", "Culture", "Quiet"],
    },
    es: {
      name: "Daegu",
      regionKey: "gyeongsang",
      description: "Una ciudad cálida enclavada en una cuenca",
      detailedDescription: "Daegu is a warm city with distinct seasons and growing startup scene.",
      highlights: ["Warm climate", "Affordable", "Startups", "Culture", "Quiet"],
    },
  },
  chuncheon: {
    ko: {
      name: "춘천",
      regionKey: "gangwon",
      description: "호수와 자연이 어우러진 도시",
      detailedDescription: "춘천은 소양호, 의암호 등 아름다운 호수로 둘러싸인 자연 친화적인 도시입니다. 닭갈비로 유명하며, 조용하고 깨끗한 환경에서 집중해서 일할 수 있습니다. 서울에서 ITX로 1시간 거리로 접근성이 좋으며, 생활비가 매우 저렴합니다. 자전거 도로와 산책로가 잘 발달되어 워라밸을 중시하는 노마드에게 적합합니다.",
      highlights: [
        "소양호, 의암호 등 아름다운 호수",
        "서울에서 ITX 1시간 거리",
        "매우 저렴한 생활비 (월 85만원 이하)",
        "잘 발달된 자전거 도로와 산책로",
        "닭갈비 맛집과 로컬 음식 문화"
      ],
    },
    en: {
      name: "Chuncheon",
      regionKey: "gangwon",
      description: "A city harmonized with lakes and nature",
      detailedDescription: "Chuncheon is a nature-friendly city surrounded by beautiful lakes like Soyang Lake and Uiam Lake. Famous for dakgalbi (spicy stir-fried chicken), you can work in a quiet and clean environment. It's easily accessible from Seoul, just 1 hour by ITX, with very low living costs. With well-developed bike paths and walking trails, it's suitable for nomads who value work-life balance.",
      highlights: [
        "Beautiful lakes like Soyang and Uiam",
        "1-hour ITX ride from Seoul",
        "Very affordable living (under 850K KRW/month)",
        "Well-developed bike paths and trails",
        "Dakgalbi restaurants and local food culture"
      ],
    },
    ja: {
      name: "春川",
      regionKey: "gangwon",
      description: "湖と自然が調和する都市",
      detailedDescription: "Chuncheon is surrounded by beautiful lakes with affordable living and nature.",
      highlights: ["Lakes", "ITX access", "Affordable", "Bike paths", "Dakgalbi"],
    },
    zh: {
      name: "春川",
      regionKey: "gangwon",
      description: "湖泊与自然和谐共处的城市",
      detailedDescription: "Chuncheon is surrounded by beautiful lakes with affordable living and nature.",
      highlights: ["Lakes", "ITX access", "Affordable", "Bike paths", "Dakgalbi"],
    },
    fr: {
      name: "Chuncheon",
      regionKey: "gangwon",
      description: "Une ville en harmonie avec les lacs et la nature",
      detailedDescription: "Chuncheon is surrounded by beautiful lakes with affordable living and nature.",
      highlights: ["Lakes", "ITX access", "Affordable", "Bike paths", "Dakgalbi"],
    },
    it: {
      name: "Chuncheon",
      regionKey: "gangwon",
      description: "Una città armonizzata con laghi e natura",
      detailedDescription: "Chuncheon is surrounded by beautiful lakes with affordable living and nature.",
      highlights: ["Lakes", "ITX access", "Affordable", "Bike paths", "Dakgalbi"],
    },
    es: {
      name: "Chuncheon",
      regionKey: "gangwon",
      description: "Una ciudad armonizada con lagos y naturaleza",
      detailedDescription: "Chuncheon is surrounded by beautiful lakes with affordable living and nature.",
      highlights: ["Lakes", "ITX access", "Affordable", "Bike paths", "Dakgalbi"],
    },
  },
  yeosu: {
    ko: {
      name: "여수",
      regionKey: "jeolla",
      description: "밤바다의 낭만, 느린 삶",
      detailedDescription: "여수는 아름다운 밤바다와 느긋한 생활 리듬으로 유명한 남해안 도시입니다. 여수 밤바다, 오동도, 향일암 등 관광 명소가 많으며, 신선한 해산물을 즐길 수 있습니다. 서두르지 않는 도시 분위기 속에서 여유롭게 일하고 싶은 노마드에게 이상적입니다. 저렴한 생활비와 따뜻한 기후도 장점입니다.",
      highlights: [
        "여수 밤바다와 아름다운 해안 풍경",
        "오동도, 향일암 등 관광 명소",
        "신선한 해산물과 로컬 맛집",
        "저렴한 생활비와 따뜻한 기후",
        "느긋한 슬로우 라이프 분위기"
      ],
    },
    en: {
      name: "Yeosu",
      regionKey: "jeolla",
      description: "Romance of night sea and slow living",
      detailedDescription: "Yeosu is a southern coastal city famous for its beautiful night sea and relaxed pace of life. With many tourist attractions like Yeosu Night Sea, Odongdo Island, and Hyangiram Hermitage, you can enjoy fresh seafood. It's ideal for nomads who want to work leisurely in an unhurried city atmosphere. Affordable living costs and warm climate are additional benefits.",
      highlights: [
        "Yeosu night sea and beautiful coastal scenery",
        "Tourist spots like Odongdo and Hyangiram",
        "Fresh seafood and local restaurants",
        "Affordable living and warm climate",
        "Relaxed slow-life atmosphere"
      ],
    },
    ja: {
      name: "麗水",
      regionKey: "jeolla",
      description: "夜の海のロマン、スローライフ",
      detailedDescription: "Yeosu is a coastal city famous for beautiful night sea and slow-paced lifestyle.",
      highlights: ["Night sea", "Tourist spots", "Seafood", "Warm climate", "Slow life"],
    },
    zh: {
      name: "丽水",
      regionKey: "jeolla",
      description: "夜海的浪漫，慢生活",
      detailedDescription: "Yeosu is a coastal city famous for beautiful night sea and slow-paced lifestyle.",
      highlights: ["Night sea", "Tourist spots", "Seafood", "Warm climate", "Slow life"],
    },
    fr: {
      name: "Yeosu",
      regionKey: "jeolla",
      description: "Romantisme de la mer nocturne et vie lente",
      detailedDescription: "Yeosu is a coastal city famous for beautiful night sea and slow-paced lifestyle.",
      highlights: ["Night sea", "Tourist spots", "Seafood", "Warm climate", "Slow life"],
    },
    it: {
      name: "Yeosu",
      regionKey: "jeolla",
      description: "Romanticismo del mare notturno e vita lenta",
      detailedDescription: "Yeosu is a coastal city famous for beautiful night sea and slow-paced lifestyle.",
      highlights: ["Night sea", "Tourist spots", "Seafood", "Warm climate", "Slow life"],
    },
    es: {
      name: "Yeosu",
      regionKey: "jeolla",
      description: "Romanticismo del mar nocturno y vida lenta",
      detailedDescription: "Yeosu is a coastal city famous for beautiful night sea and slow-paced lifestyle.",
      highlights: ["Night sea", "Tourist spots", "Seafood", "Warm climate", "Slow life"],
    },
  },
  yangyang: {
    ko: {
      name: "양양",
      regionKey: "gangwon",
      description: "서핑과 원격근무의 조화",
      detailedDescription: "양양은 한국의 대표적인 서핑 명소로, 낙산해변, 하조대 등 아름다운 해변을 자랑합니다. 서핑 문화와 함께 디지털 노마드 커뮤니티가 성장하고 있으며, 서퍼와 원격 근무자들을 위한 카페와 숙소가 늘어나고 있습니다. 일과 취미를 동시에 즐기고 싶은 노마드에게 완벽한 도시입니다.",
      highlights: [
        "낙산해변, 하조대 등 서핑 명소",
        "성장하는 디지털 노마드 커뮤니티",
        "서퍼 친화적인 카페와 코워킹",
        "신선한 해산물과 로컬 맛집",
        "일과 취미(서핑)의 완벽한 조화"
      ],
    },
    en: {
      name: "Yangyang",
      regionKey: "gangwon",
      description: "Harmony of surfing and remote work",
      detailedDescription: "Yangyang is Korea's premier surfing destination, boasting beautiful beaches like Naksan and Hajodae. With the surfing culture, a digital nomad community is growing, and cafes and accommodations for surfers and remote workers are increasing. It's a perfect city for nomads who want to enjoy work and hobbies simultaneously.",
      highlights: [
        "Surfing spots like Naksan and Hajodae",
        "Growing digital nomad community",
        "Surfer-friendly cafes and coworking",
        "Fresh seafood and local restaurants",
        "Perfect harmony of work and surfing"
      ],
    },
    ja: {
      name: "襄陽",
      regionKey: "gangwon",
      description: "サーフィンとリモートワークの調和",
      detailedDescription: "Yangyang is Korea's premier surfing destination with growing nomad community.",
      highlights: ["Surfing", "Nomad community", "Cafes", "Seafood", "Work-surf balance"],
    },
    zh: {
      name: "襄阳",
      regionKey: "gangwon",
      description: "冲浪与远程办公的和谐",
      detailedDescription: "Yangyang is Korea's premier surfing destination with growing nomad community.",
      highlights: ["Surfing", "Nomad community", "Cafes", "Seafood", "Work-surf balance"],
    },
    fr: {
      name: "Yangyang",
      regionKey: "gangwon",
      description: "Harmonie entre surf et travail à distance",
      detailedDescription: "Yangyang is Korea's premier surfing destination with growing nomad community.",
      highlights: ["Surfing", "Nomad community", "Cafes", "Seafood", "Work-surf balance"],
    },
    it: {
      name: "Yangyang",
      regionKey: "gangwon",
      description: "Armonia tra surf e lavoro da remoto",
      detailedDescription: "Yangyang is Korea's premier surfing destination with growing nomad community.",
      highlights: ["Surfing", "Nomad community", "Cafes", "Seafood", "Work-surf balance"],
    },
    es: {
      name: "Yangyang",
      regionKey: "gangwon",
      description: "Armonía entre surf y trabajo remoto",
      detailedDescription: "Yangyang is Korea's premier surfing destination with growing nomad community.",
      highlights: ["Surfing", "Nomad community", "Cafes", "Seafood", "Work-surf balance"],
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
