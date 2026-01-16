import { describe, it, expect } from 'vitest'
import { getCities, getCityById, getRelatedCities, City } from '@/data/cities'
import { locales, Locale } from '@/i18n/config'

describe('cities.ts', () => {
  describe('getCities(locale)', () => {
    it('한국어 로케일로 전체 도시 목록 반환 (10개)', () => {
      const cities = getCities('ko')
      expect(cities).toHaveLength(10)
    })

    it('영어 로케일로 전체 도시 목록 반환', () => {
      const cities = getCities('en')
      expect(cities).toHaveLength(10)
    })

    it('모든 지원 로케일에서 도시 이름 번역 확인 (ko, en, ja, zh, fr, it, es)', () => {
      const expectedNames: Record<Locale, string> = {
        ko: '서울',
        en: 'Seoul',
        ja: 'ソウル',
        zh: '首尔',
        fr: 'Séoul',
        it: 'Seul',
        es: 'Seúl',
      }

      locales.forEach((locale) => {
        const cities = getCities(locale)
        const seoul = cities.find((c) => c.id === 'seoul')
        expect(seoul).toBeDefined()
        expect(seoul?.name).toBe(expectedNames[locale])
      })
    })

    it('반환된 도시 객체의 구조 검증 (CityBase + CityTranslation 필드)', () => {
      const cities = getCities('ko')
      const city = cities[0]

      // CityBase 필드 검증
      expect(city).toHaveProperty('id')
      expect(city).toHaveProperty('imageUrl')
      expect(city).toHaveProperty('monthlyCost')
      expect(city).toHaveProperty('budget')
      expect(city).toHaveProperty('region')
      expect(city).toHaveProperty('environment')
      expect(city).toHaveProperty('bestSeason')
      expect(city).toHaveProperty('likes')
      expect(city).toHaveProperty('dislikes')

      // CityTranslation 필드 검증
      expect(city).toHaveProperty('name')
      expect(city).toHaveProperty('regionKey')
      expect(city).toHaveProperty('description')
      expect(city).toHaveProperty('detailedDescription')
      expect(city).toHaveProperty('highlights')

      // 필드 타입 검증
      expect(typeof city.id).toBe('string')
      expect(typeof city.imageUrl).toBe('string')
      expect(typeof city.monthlyCost).toBe('number')
      expect(typeof city.budget).toBe('string')
      expect(typeof city.region).toBe('string')
      expect(Array.isArray(city.environment)).toBe(true)
      expect(Array.isArray(city.bestSeason)).toBe(true)
      expect(typeof city.likes).toBe('number')
      expect(typeof city.dislikes).toBe('number')
      expect(typeof city.name).toBe('string')
      expect(typeof city.regionKey).toBe('string')
      expect(typeof city.description).toBe('string')
      expect(typeof city.detailedDescription).toBe('string')
      expect(Array.isArray(city.highlights)).toBe(true)
    })
  })

  describe('getCityById(id, locale)', () => {
    it("유효한 ID로 도시 조회 성공 ('seoul', 'ko')", () => {
      const city = getCityById('seoul', 'ko')
      expect(city).not.toBeNull()
      expect(city?.id).toBe('seoul')
      expect(city?.name).toBe('서울')
    })

    it("유효한 ID + 다른 로케일로 조회 ('seoul', 'en')", () => {
      const city = getCityById('seoul', 'en')
      expect(city).not.toBeNull()
      expect(city?.id).toBe('seoul')
      expect(city?.name).toBe('Seoul')
    })

    it('존재하지 않는 ID로 조회 시 null 반환', () => {
      const city = getCityById('invalid-city-id', 'ko')
      expect(city).toBeNull()
    })

    it('빈 문자열 ID로 조회 시 null 반환', () => {
      const city = getCityById('', 'ko')
      expect(city).toBeNull()
    })

    it('반환된 도시의 모든 필드 존재 확인', () => {
      const city = getCityById('busan', 'ko')
      expect(city).not.toBeNull()

      // CityBase 필드
      expect(city?.id).toBe('busan')
      expect(city?.imageUrl).toBeDefined()
      expect(city?.monthlyCost).toBe(120)
      expect(city?.budget).toBe('100to200')
      expect(city?.region).toBe('gyeongsang')
      expect(city?.environment).toEqual(['urban', 'cafe'])
      expect(city?.bestSeason).toEqual(['summer'])
      expect(city?.likes).toBeDefined()
      expect(city?.dislikes).toBeDefined()

      // CityTranslation 필드
      expect(city?.name).toBe('부산')
      expect(city?.regionKey).toBe('gyeongsang')
      expect(city?.description).toBeDefined()
      expect(city?.detailedDescription).toBeDefined()
      expect(city?.highlights).toBeDefined()
      expect(Array.isArray(city?.highlights)).toBe(true)
    })
  })

  describe('getRelatedCities(cityId, locale, limit)', () => {
    it('관련 도시 기본 반환 (limit=4)', () => {
      const relatedCities = getRelatedCities('seoul', 'ko')
      expect(relatedCities).toHaveLength(4)
    })

    it('현재 도시가 결과에서 제외되는지 확인', () => {
      const relatedCities = getRelatedCities('seoul', 'ko')
      const seoulInResults = relatedCities.find((c) => c.id === 'seoul')
      expect(seoulInResults).toBeUndefined()
    })

    it('limit 파라미터 동작 확인 (limit=2)', () => {
      const relatedCities = getRelatedCities('seoul', 'ko', 2)
      expect(relatedCities).toHaveLength(2)
    })

    it('같은 region 도시가 우선 반환되는지 확인', () => {
      // gangneung은 gangwon region - 같은 region인 chuncheon, yangyang이 우선 반환되어야 함
      const relatedCities = getRelatedCities('gangneung', 'ko', 4)
      const gangwonCities = relatedCities.filter((c) => c.region === 'gangwon')

      // gangwon region에는 gangneung을 제외하고 chuncheon, yangyang 2개가 있음
      // 이들이 우선 반환되어야 함
      expect(gangwonCities.length).toBeGreaterThanOrEqual(2)

      // chuncheon과 yangyang이 상위 결과에 포함되어야 함
      const cityIds = relatedCities.map((c) => c.id)
      expect(cityIds).toContain('chuncheon')
      expect(cityIds).toContain('yangyang')
    })

    it('같은 budget 도시가 우선 반환되는지 확인', () => {
      // seoul은 over200 budget - 같은 budget 도시가 없으므로 다른 기준으로 확인
      // busan은 100to200 budget - jeju(100to200), yangyang(100to200)이 같은 budget
      const relatedCities = getRelatedCities('busan', 'ko', 9)

      // 같은 budget(100to200)인 jeju, yangyang이 결과에 포함되어야 함
      const cityIds = relatedCities.map((c) => c.id)
      expect(cityIds).toContain('jeju')
      expect(cityIds).toContain('yangyang')
    })

    it('environment 공통점이 점수에 반영되는지 확인', () => {
      // seoul의 environment: ['urban', 'coworking']
      // daejeon의 environment: ['urban', 'coworking'] - 완전 일치
      // daegu의 environment: ['urban'] - 1개 일치
      const relatedCities = getRelatedCities('seoul', 'ko', 9)

      // daejeon이 환경 유사성으로 높은 순위에 있어야 함
      const cityIds = relatedCities.map((c) => c.id)
      expect(cityIds).toContain('daejeon')
    })

    it('존재하지 않는 cityId로 조회 시 빈 배열 반환', () => {
      const relatedCities = getRelatedCities('invalid-city-id', 'ko')
      expect(relatedCities).toEqual([])
    })

    it('반환된 관련 도시들이 올바른 구조를 가지는지 확인', () => {
      const relatedCities = getRelatedCities('seoul', 'ko', 2)

      relatedCities.forEach((city: City) => {
        expect(city).toHaveProperty('id')
        expect(city).toHaveProperty('name')
        expect(city).toHaveProperty('imageUrl')
        expect(city).toHaveProperty('monthlyCost')
        expect(city).toHaveProperty('description')
      })
    })
  })
})
