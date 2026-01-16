import type { City, CityBase } from '@/data/cities'

export const mockCityBase: CityBase = {
  id: 'seoul',
  imageUrl: 'https://example.com/seoul.jpg',
  monthlyCost: 180,
  budget: 'over200',
  region: 'capital',
  environment: ['urban', 'coworking'],
  bestSeason: ['spring', 'fall'],
  likes: 256,
  dislikes: 12,
}

export const mockCity: City = {
  ...mockCityBase,
  name: '서울',
  regionKey: 'capital',
  description: '대한민국의 수도, 최고의 인프라와 다양한 문화',
  detailedDescription: '서울은 대한민국의 수도이자 경제, 문화, 정치의 중심지입니다.',
  highlights: [
    '세계 최고 수준의 인터넷 속도',
    '300개 이상의 코워킹 스페이스',
    '24시간 운영 카페 및 편의시설',
  ],
}

export const mockCityEn: City = {
  ...mockCityBase,
  name: 'Seoul',
  regionKey: 'capital',
  description: 'The capital of South Korea with the best infrastructure and diverse culture',
  detailedDescription: 'Seoul is the capital of South Korea and the center of economy, culture, and politics.',
  highlights: [
    'World-class internet speed',
    'Over 300 coworking spaces',
    '24-hour cafes and convenience facilities',
  ],
}

export const mockCities: City[] = [
  mockCity,
  {
    id: 'busan',
    imageUrl: 'https://example.com/busan.jpg',
    monthlyCost: 120,
    budget: '100to200',
    region: 'gyeongsang',
    environment: ['urban', 'cafe'],
    bestSeason: ['summer'],
    likes: 128,
    dislikes: 8,
    name: '부산',
    regionKey: 'gyeongsang',
    description: '해변과 도시가 공존하는 제2의 도시',
    detailedDescription: '부산은 대한민국 제2의 도시로 아름다운 해변과 도심이 조화를 이루는 곳입니다.',
    highlights: ['해운대, 광안리 해변', '저렴한 생활비', '해산물 요리'],
  },
  {
    id: 'gangneung',
    imageUrl: 'https://example.com/gangneung.jpg',
    monthlyCost: 100,
    budget: 'under100',
    region: 'gangwon',
    environment: ['nature', 'cafe'],
    bestSeason: ['summer'],
    likes: 87,
    dislikes: 5,
    name: '강릉',
    regionKey: 'gangwon',
    description: '동해 바다와 커피거리의 낭만',
    detailedDescription: '강릉은 동해안의 대표적인 관광 도시입니다.',
    highlights: ['안목 커피거리', '경포해변', 'KTX 접근성'],
  },
  {
    id: 'chuncheon',
    imageUrl: 'https://example.com/chuncheon.jpg',
    monthlyCost: 85,
    budget: 'under100',
    region: 'gangwon',
    environment: ['nature'],
    bestSeason: ['fall'],
    likes: 38,
    dislikes: 2,
    name: '춘천',
    regionKey: 'gangwon',
    description: '호수와 자연이 어우러진 도시',
    detailedDescription: '춘천은 소양호, 의암호 등 아름다운 호수로 둘러싸인 자연 친화적인 도시입니다.',
    highlights: ['소양호', 'ITX 접근성', '닭갈비'],
  },
]
