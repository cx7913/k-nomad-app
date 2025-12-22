# K-Nomad 웹사이트 개선 계획

---

## 전체 Phase 요약

| Phase | 주요 작업 | 예상 파일 수정 | 상태 |
|-------|----------|---------------|------|
| **Phase 1** | 페이지/네비게이션 정리 | 7개 파일 | - [x] 완료 |
| **Phase 2** | 데이터 구조 재설계 | 3개 파일 | - [x] 완료 |
| **Phase 3** | 필터바 UI 수정 | 3개 파일 | - [ ] 미완료 |
| **Phase 4** | 카드 UI 재설계 + 좋아요 | 5개 파일 | - [ ] 미완료 |

### 의존성
```
Phase 1 → Phase 2 → Phase 3 → Phase 4
          (독립)    (Phase 2 필요) (Phase 2,3 필요)
```

각 Phase는 완료 후 독립적으로 배포 가능하며, 점진적으로 기능이 개선됩니다.

---

## - [x] Phase 1: 페이지 및 네비게이션 정리

### Overview
불필요한 페이지를 삭제하고 네비게이션을 간소화합니다. 홈페이지와 인증 관련 페이지만 남기고, Header/Footer에서 불필요한 링크를 제거합니다.

### 현재 상태
- **페이지 목록**: 홈(`/`), 로그인(`/login`), 회원가입(`/register`), 대시보드(`/dashboard`), 비밀번호 찾기(`/forgot-password`), 비밀번호 재설정(`/reset-password`)
- **Header**: 로고, 검색바, 언어 전환, 대시보드/로그아웃 또는 로그인/회원가입 버튼
- **Footer**: 서비스 소개, 이용약관, 개인정보처리방침 링크, 소셜 미디어 링크
- **HeroSection**: "도시 탐색하기", "서비스 소개" 버튼

### 수정/개선 체크리스트
- [x] `src/app/[locale]/dashboard/page.tsx` 삭제
- [x] Header에서 대시보드 링크 제거 (로그인 상태: 로그아웃 버튼만 표시)
- [x] Header에서 검색바 제거
- [x] Footer에서 "서비스 소개", "이용약관", "개인정보처리방침" 링크 제거
- [x] HeroSection에서 "서비스 소개" 버튼 제거
- [x] HeroSection에서 "도시 탐색하기" 버튼 스크롤 동작으로 변경
- [x] 번역 파일에서 관련 키 정리 (`messages/ko.json`, `messages/en.json`)
- [x] Middleware에서 `/dashboard` 보호 경로 제거

### 검증/확인 체크리스트
- [x] `/dashboard` 접근 시 404 페이지 표시
- [x] 로그인 상태에서 Header에 "로그아웃" 버튼만 표시
- [x] 비로그인 상태에서 Header에 "로그인", "회원가입" 버튼만 표시
- [x] Footer에 소셜 미디어 링크와 저작권만 표시
- [x] HeroSection에 불필요한 버튼 없음
- [x] 홈, 로그인, 회원가입, 비밀번호 찾기, 비밀번호 재설정 페이지 정상 동작
- [x] 빌드 오류 없음 (`npm run build`)

### 관련 파일
```
src/app/[locale]/dashboard/          # 삭제
src/components/layout/Header.tsx     # 수정
src/components/layout/Footer.tsx     # 수정
src/components/home/HeroSection.tsx  # 수정
src/middleware.ts                    # 수정
messages/ko.json                     # 수정
messages/en.json                     # 수정
```

---

## - [x] Phase 2: 데이터 구조 재설계 및 가짜 데이터 수정

### Overview
기존 도시 데이터 구조를 새로운 필터 시스템에 맞게 재설계합니다. 각 도시에 예산, 지역, 환경, 최고계절, 좋아요/싫어요 정보를 추가합니다.

### 현재 데이터 구조
```typescript
interface CityBase {
  id: string;
  imageUrl: string;
  nomadScore: number;      // 삭제 예정
  monthlyCost: number;     // 유지 (예산으로 활용)
  internetSpeed: number;   // 삭제 예정
  reviewCount: number;     // 삭제 예정
  temperature: number;     // 삭제 예정
}
```

### 새로운 데이터 구조
```typescript
interface CityBase {
  id: string;
  imageUrl: string;
  budget: 'under100' | '100to200' | 'over200';           // 예산
  region: 'capital' | 'gyeongsang' | 'jeolla' | 'gangwon' | 'jeju' | 'chungcheong'; // 지역
  environment: ('nature' | 'urban' | 'cafe' | 'coworking')[]; // 환경 (복수 선택)
  bestSeason: ('spring' | 'summer' | 'fall' | 'winter')[]; // 최고계절 (복수 선택)
  likes: number;           // 좋아요 수
  dislikes: number;        // 싫어요 수
}
```

### 수정/개선 체크리스트
- [x] `src/data/cities.ts` - `CityBase` 인터페이스 재정의
- [x] `src/data/cities.ts` - 기존 필드 삭제 (`nomadScore`, `internetSpeed`, `reviewCount`, `temperature`)
- [x] `src/data/cities.ts` - 새 필드 추가 (`budget`, `region`, `environment`, `bestSeason`, `likes`, `dislikes`)
- [x] `src/data/cities.ts` - `regions` 배열 수정: `['all', 'capital', 'gyeongsang', 'jeolla', 'gangwon', 'jeju', 'chungcheong']`
- [x] `src/data/cities.ts` - `budgetOptions` 배열 수정: `['under100', '100to200', 'over200']`
- [x] `src/data/cities.ts` - `environmentOptions` 배열 추가: `['nature', 'urban', 'cafe', 'coworking']`
- [x] `src/data/cities.ts` - `seasonOptions` 배열 추가: `['spring', 'summer', 'fall', 'winter']`
- [x] `src/data/cities.ts` - `sortOptions` 수정: 좋아요순 정렬만 유지
- [x] 각 도시(10개)에 새로운 필드값 할당 (최소 각 필터 옵션당 1개 이상 도시 매칭)
- [x] `CityTranslation` 인터페이스 - `region` 필드를 `regionKey`로 변경 (번역은 별도 처리)
- [x] 번역 파일에 새로운 필터 옵션 번역 추가

### 도시별 데이터 매핑 예시
| 도시 | 예산 | 지역 | 환경 | 최고계절 | 좋아요 | 싫어요 |
|------|------|------|------|----------|--------|--------|
| 서울 | over200 | capital | urban, coworking | spring, fall | 256 | 12 |
| 부산 | 100to200 | gyeongsang | urban, cafe | summer | 128 | 8 |
| 제주 | 100to200 | jeju | nature, cafe | spring, fall | 189 | 15 |
| 강릉 | under100 | gangwon | nature, cafe | summer | 87 | 5 |
| 전주 | under100 | jeolla | cafe | fall | 64 | 3 |
| 대전 | under100 | chungcheong | urban, coworking | spring | 42 | 2 |
| 대구 | under100 | gyeongsang | urban | fall | 53 | 4 |
| 춘천 | under100 | gangwon | nature | fall | 38 | 2 |
| 여수 | under100 | jeolla | nature | summer | 45 | 3 |
| 양양 | 100to200 | gangwon | nature, cafe | summer | 72 | 6 |

### 검증/확인 체크리스트
- [x] TypeScript 컴파일 오류 없음
- [x] `getCities()` 함수가 새로운 데이터 구조 반환
- [x] 각 필터 옵션에 최소 1개 이상의 도시 매칭
- [x] 좋아요/싫어요 숫자가 모든 도시에 설정됨
- [x] 빌드 오류 없음 (`npm run build`)

### 관련 파일
```
src/data/cities.ts       # 전면 수정
messages/ko.json         # 새 필터 옵션 번역 추가
messages/en.json         # 새 필터 옵션 번역 추가
```

---

## - [ ] Phase 3: 필터바 UI 수정

### Overview
FilterBar 컴포넌트를 새로운 필터 시스템에 맞게 수정합니다. 예산, 지역, 환경, 최고계절 필터를 적용하고, 정렬 옵션을 제거합니다.

### 현재 필터 구조
- [ ] 정렬: Nomad Score순, 생활비 낮은순, 인터넷 빠른순, 리뷰 많은순
- [ ] 지역: 전체, 수도권, 영남, 호남, 충청, 강원, 제주
- [ ] 예산: 전체, 100만원 이하, 100-150만원, 150만원 이상

### 새로운 필터 구조
- [ ] **예산**: 전체, 100만원 이하, 100~200만원, 200만원 이상
- [ ] **지역**: 전체, 수도권, 경상도, 전라도, 강원도, 제주도, 충청도
- [ ] **환경**: 전체, 자연친화, 도심선호, 카페작업, 코워킹 필수
- [ ] **최고계절**: 전체, 봄, 여름, 가을, 겨울

### 수정/개선 체크리스트
- [ ] `src/components/home/FilterBar.tsx` - 정렬 Select 제거
- [ ] `src/components/home/FilterBar.tsx` - 예산 필터 옵션 수정
- [ ] `src/components/home/FilterBar.tsx` - 지역 필터 옵션 수정
- [ ] `src/components/home/FilterBar.tsx` - 환경 필터 추가
- [ ] `src/components/home/FilterBar.tsx` - 최고계절 필터 추가
- [ ] `src/components/home/FilterBar.tsx` - 필터 상태 관리 (useState 또는 props)
- [ ] `src/components/home/FilterBar.tsx` - 필터 변경 시 콜백 함수 연결
- [ ] `messages/ko.json` - 필터 관련 번역 수정/추가
- [ ] `messages/en.json` - 필터 관련 번역 수정/추가

### 번역 키 구조
```json
{
  "filter": {
    "budget": "예산",
    "region": "지역",
    "environment": "환경",
    "season": "최고계절",
    "reset": "초기화",
    "results": "검색 결과",
    "citiesCount": "{count}개 도시",
    "budgetOptions": {
      "all": "전체",
      "under100": "100만원 이하",
      "100to200": "100~200만원",
      "over200": "200만원 이상"
    },
    "regionOptions": {
      "all": "전체",
      "capital": "수도권",
      "gyeongsang": "경상도",
      "jeolla": "전라도",
      "gangwon": "강원도",
      "jeju": "제주도",
      "chungcheong": "충청도"
    },
    "environmentOptions": {
      "all": "전체",
      "nature": "자연친화",
      "urban": "도심선호",
      "cafe": "카페작업",
      "coworking": "코워킹 필수"
    },
    "seasonOptions": {
      "all": "전체",
      "spring": "봄",
      "summer": "여름",
      "fall": "가을",
      "winter": "겨울"
    }
  }
}
```

### 검증/확인 체크리스트
- [ ] 4개의 필터(예산, 지역, 환경, 최고계절)가 표시됨
- [ ] 각 필터의 옵션이 올바르게 표시됨
- [ ] 초기화 버튼 클릭 시 모든 필터가 "전체"로 리셋됨
- [ ] 검색 결과 카운트가 필터에 따라 변경됨
- [ ] 한국어/영어 번역이 올바르게 적용됨
- [ ] 모바일 반응형 레이아웃 정상 동작
- [ ] 빌드 오류 없음 (`npm run build`)

### 관련 파일
```
src/components/home/FilterBar.tsx  # 전면 수정
src/data/cities.ts                 # 필터 옵션 export
messages/ko.json                   # 필터 번역 수정
messages/en.json                   # 필터 번역 수정
```

---

## - [ ] Phase 4: 카드 UI 재설계 및 좋아요/싫어요 기능

### Overview
CityCard 컴포넌트를 재설계하여 새로운 필터 정보를 key-value 형태로 표시하고, 별점 대신 좋아요/싫어요 버튼을 추가합니다. CityGrid에서 도시 리스트 제목을 변경하고 좋아요 순으로 정렬합니다.

### 현재 카드 구조
- [ ] 이미지 + 지역 배지 + Nomad Score 배지 + 온도
- [ ] 도시명 + 리뷰 수
- [ ] 설명
- [ ] 월 생활비 + 인터넷 속도

### 새로운 카드 구조
- [ ] 이미지 + 지역 배지
- [ ] 도시명
- [ ] 설명
- [ ] Key-Value 정보: 예산, 지역, 환경, 최고계절
- [ ] 좋아요/싫어요 버튼 (아이콘 + 숫자)

### 수정/개선 체크리스트
- [ ] `src/components/home/CityCard.tsx` - Nomad Score 배지 제거
- [ ] `src/components/home/CityCard.tsx` - 온도 표시 제거
- [ ] `src/components/home/CityCard.tsx` - 리뷰 수 제거
- [ ] `src/components/home/CityCard.tsx` - 인터넷 속도 제거
- [ ] `src/components/home/CityCard.tsx` - Key-Value 정보 섹션 추가 (예산, 환경, 최고계절)
- [ ] `src/components/home/CityCard.tsx` - 좋아요 버튼 추가 (ThumbsUp 아이콘)
- [ ] `src/components/home/CityCard.tsx` - 싫어요 버튼 추가 (ThumbsDown 아이콘)
- [ ] `src/components/home/CityCard.tsx` - 버튼 클릭 시 아이콘 색상 변경 (활성: primary, 비활성: muted)
- [ ] `src/components/home/CityCard.tsx` - 버튼 클릭 시 숫자 증가/감소 로직 (로컬 상태)
- [ ] `src/components/home/CityCard.tsx` - 자세히 보기 버튼 제거 (현재 없으면 확인만)
- [ ] `src/components/home/CityGrid.tsx` - 섹션 제목 추가: "도시리스트"
- [ ] `src/components/home/CityGrid.tsx` - 도시 목록을 좋아요 순으로 정렬
- [ ] `src/components/home/CityGrid.tsx` - 필터 적용 로직 추가 (FilterBar와 연동)
- [ ] `messages/ko.json` - 카드 관련 번역 수정
- [ ] `messages/en.json` - 카드 관련 번역 수정

### 카드 레이아웃 예시
```
┌─────────────────────────────┐
│  [이미지]          [지역배지] │
│                             │
├─────────────────────────────┤
│  서울                       │
│  대한민국의 수도...          │
│                             │
│  예산: 200만원 이상          │
│  환경: 도심선호, 코워킹 필수   │
│  최고계절: 봄, 가을           │
│                             │
│  👍 256    👎 12            │
└─────────────────────────────┘
```

### 좋아요/싫어요 상태 관리
- [ ] 로컬 상태로 관리 (데이터베이스 미사용)
- [ ] 좋아요 클릭: 좋아요 활성화 → 숫자 +1, 아이콘 색상 변경
- [ ] 좋아요 다시 클릭: 좋아요 비활성화 → 숫자 -1, 아이콘 색상 원복
- [ ] 싫어요도 동일한 로직
- [ ] 좋아요/싫어요 동시 활성화 불가 (하나 선택 시 다른 것 자동 해제)

### 검증/확인 체크리스트
- [ ] 카드에 Key-Value 정보(예산, 환경, 최고계절)가 표시됨
- [ ] 좋아요 버튼 클릭 시 아이콘 색상이 primary로 변경됨
- [ ] 좋아요 버튼 클릭 시 숫자가 1 증가함
- [ ] 좋아요 버튼 다시 클릭 시 색상 원복 및 숫자 1 감소
- [ ] 싫어요 버튼도 동일하게 동작
- [ ] 좋아요 활성 상태에서 싫어요 클릭 시 좋아요 자동 해제
- [ ] "도시리스트" 제목이 CityGrid 상단에 표시됨
- [ ] 도시가 좋아요 수 내림차순으로 정렬됨
- [ ] 필터 적용 시 해당 조건의 도시만 표시됨
- [ ] 별점, 온도, 인터넷 속도, 리뷰 수가 표시되지 않음
- [ ] 한국어/영어 번역이 올바르게 적용됨
- [ ] 빌드 오류 없음 (`npm run build`)

### 관련 파일
```
src/components/home/CityCard.tsx   # 전면 수정
src/components/home/CityGrid.tsx   # 수정 (제목, 정렬, 필터)
src/app/[locale]/page.tsx          # 필터 상태 관리 (필요시)
messages/ko.json                   # 카드 번역 수정
messages/en.json                   # 카드 번역 수정
```

---

## 변경 이력

| 날짜 | Phase | 작업 내용 | 담당 |
|------|-------|----------|------|
| - | - | - | - |
