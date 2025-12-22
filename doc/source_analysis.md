# K-Nomad 앱 소스 코드 분석

## 1. 프로젝트 개요
이 프로젝트는 한국의 디지털 노마드 여행지를 추천하는 **Next.js** 애플리케이션입니다. 인터넷 속도, 생활비, "노마드 점수"와 같은 원격 근무자에게 중요한 주요 지표와 함께 다양한 도시를 소개합니다.

## 2. 기술 스택 (Technology Stack)
- **프레임워크:** Next.js 16.0.10 (App Router 사용)
- **언어:** TypeScript
- **스타일링:** Tailwind CSS v4, PostCSS
- **UI 컴포넌트:** Radix UI primitives, Lucide React 아이콘
- **프로젝트 유형:** 정적 사이트 (하드코딩된 데이터를 기반으로 함, 현재는 개발 환경 구성)

## 3. 디렉토리 구조
이 프로젝트는 표준 Next.js App Router 구조를 따릅니다:

- **`src/app/`**: 주요 애플리케이션 라우트가 위치합니다.
  - `page.tsx`: `HeroSection`, `FilterBar`, `CityGrid`를 조합한 메인 랜딩 페이지입니다.
  - `layout.tsx`: 폰트 설정(Geist)을 포함한 전역 레이아웃입니다.
  - `globals.css`: 전역 스타일 및 Tailwind import 파일입니다.
- **`src/components/`**: 기능별로 정리된 UI 컴포넌트입니다.
  - `home/`: 홈페이지 전용 컴포넌트 (`HeroSection`, `FilterBar`, `CityGrid`, `CityCard`).
  - `layout/`: 전역 레이아웃 컴포넌트 (`Header`, `Footer`).
  - `ui/`: 재사용 가능한 UI primitives (Button, Card, Input 등), shadcn/ui 패턴을 따르는 것으로 보입니다.
- **`src/data/`**: 설정 및 정적 데이터입니다.
  - `cities.ts`: 도시 데이터베이스 및 필터링 옵션을 포함합니다.
- **`src/lib/`**: 유틸리티 함수 (주로 클래스 병합을 위한 `cn` 함수 등).

## 4. 주요 컴포넌트 및 기능
### 홈페이지 (`src/app/page.tsx`)
맞춤형 랜딩 페이지는 세 가지 주요 섹션으로 구성됩니다:
1.  **HeroSection**: 가치 제안 및 브랜딩 영역.
2.  **FilterBar**: 사용자가 도시를 필터링하고 정렬할 수 있는 기능.
    - **지역 (Regions)**: `cities.ts`에 정의됨 (예: 수도권, 영남, 제주 등).
    - **예산 (Budget)**: 필터링 옵션 (예: 100만원 이하).
    - **정렬 (Sorting)**: 노마드 점수, 비용, 인터넷 속도, 리뷰 수 순으로 정렬.
3.  **CityGrid**: `CityCard`를 사용하여 도시 목록을 표시.

### 데이터 모델 (`src/data/cities.ts`)
애플리케이션은 현재 `cities.ts`에 정의된 정적 데이터를 사용합니다.
**도시 인터페이스 (City Interface):**
- `nomadScore`: 노마드 적합성 평점.
- `monthlyCost`: 생활비 (단위: 만원 추정).
- `internetSpeed`: 인터넷 속도 (Mbps).
- `temperature`: 평균 기온.
- `imageUrl`: Unsplash 이미지 URL.

## 5. 관찰 사항
- **최신 기술 스택**: Next.js 16과 React 19를 사용하여 최신 환경을 구축했습니다.
- **Tailwind v4**: Tailwind v4 (알파/베타 버전)를 사용하고 있어 실험적이거나 매우 최신의 설정을 보여줍니다.
- **깔끔한 아키텍처**: 데이터, UI 컴포넌트, 페이지 로직 간의 관심사가 잘 분리되어 있습니다.
