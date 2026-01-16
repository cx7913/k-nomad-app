# K-Nomad 프로젝트 가이드

## 프로젝트 개요

K-Nomad는 한국의 디지털 노마드를 위한 도시 추천 웹 애플리케이션입니다.

- **프레임워크**: Next.js 16 + React 19
- **언어**: TypeScript
- **스타일링**: Tailwind CSS 4 + shadcn/ui
- **백엔드**: Supabase
- **국제화**: next-intl (7개 언어 지원)

## 테스트 구조

### 유닛 테스트 (Vitest)

위치: `src/__tests__/`

```
src/__tests__/
├── setup.tsx                    # 글로벌 셋업
├── mocks/                       # Mock 파일
│   ├── cities.ts
│   └── supabase.ts
├── data/                        # 데이터 함수 테스트
│   └── cities.test.ts
├── lib/                         # 유틸리티 테스트
│   └── utils.test.ts
└── components/                  # 컴포넌트 테스트
    ├── home/
    ├── city/
    └── layout/
```

**실행 명령어**:
```bash
npm run test          # watch 모드
npm run test:run      # 1회 실행
npm run test:coverage # 커버리지 리포트
```

---

### E2E 테스트 (Playwright)

위치: `e2e/`

#### 폴더 구조

```
e2e/
├── playwright.config.ts          # Playwright 설정
│
├── fixtures/                     # 테스트 픽스처
│   ├── auth.fixture.ts          # 인증 상태 픽스처
│   ├── locale.fixture.ts        # 다국어 테스트 픽스처
│   └── test-data.ts             # 테스트 데이터 상수
│
├── pages/                        # Page Object Model (POM)
│   ├── base.page.ts             # 공통 페이지 클래스
│   ├── home.page.ts             # 홈페이지 POM
│   ├── city-detail.page.ts      # 도시 상세 페이지 POM
│   ├── login.page.ts            # 로그인 페이지 POM
│   ├── register.page.ts         # 회원가입 페이지 POM
│   └── components/              # 컴포넌트 POM
│       ├── header.component.ts
│       ├── footer.component.ts
│       ├── filter-bar.component.ts
│       └── city-card.component.ts
│
├── tests/                        # 테스트 파일
│   ├── home/                    # 홈페이지 테스트
│   ├── city/                    # 도시 상세 테스트
│   ├── auth/                    # 인증 테스트
│   ├── i18n/                    # 다국어 테스트
│   └── navigation/              # 네비게이션 테스트
│
└── utils/                        # 유틸리티
    ├── helpers.ts               # 공통 헬퍼 함수
    ├── selectors.ts             # 셀렉터 상수
    └── wait-utils.ts            # 대기 유틸리티
```

#### Page Object Model (POM) 패턴

E2E 테스트는 POM 패턴을 사용하여 페이지 요소와 액션을 캡슐화합니다.

**BasePage** (`e2e/pages/base.page.ts`):
- 모든 페이지 객체의 기본 클래스
- 공통 메서드: `goto()`, `waitForPageLoad()`, `getCurrentLocale()`

**페이지별 POM**:
- `HomePage`: 히어로 섹션, 필터바, 도시 그리드 요소 및 액션
- `CityDetailPage`: 도시 정보, 좋아요/싫어요, 공유 버튼, 관련 도시
- `LoginPage`: 로그인 폼 요소 및 인증 액션
- `RegisterPage`: 회원가입 폼 요소 및 등록 액션

**컴포넌트 POM**:
- `HeaderComponent`: 로고, 언어 전환, 인증 버튼
- `FooterComponent`: 푸터 정보
- `FilterBarComponent`: 필터 드롭다운, 초기화 버튼
- `CityCardComponent`: 도시 카드 요소 및 인터랙션

#### Fixtures

**auth.fixture.ts**:
- 인증된 상태의 테스트 컨텍스트 제공
- `authenticatedPage`: 로그인된 페이지 객체
- `testUser`: 테스트 사용자 자격 증명

**locale.fixture.ts**:
- 다국어 테스트 지원
- `locales`: 지원 언어 목록 (ko, en, ja, zh, fr, it, es)
- `gotoWithLocale()`: 특정 로케일로 페이지 이동

**test-data.ts**:
- `cityIds`: 도시 ID 목록
- `regionOptions`, `budgetOptions`, `environmentOptions`, `seasonOptions`: 필터 옵션
- `testUsers`: 테스트 사용자 데이터
- `routes`: 라우트 상수

#### Utils

**helpers.ts**:
- `waitForNetworkIdle()`: 네트워크 대기
- `clearAllStorage()`: 스토리지 초기화
- `generateRandomEmail()`: 테스트용 이메일 생성
- `takeFullPageScreenshot()`: 전체 페이지 스크린샷

**selectors.ts**:
- 공통 셀렉터 상수 (헤더, 푸터, 필터바, 도시 카드 등)
- 중앙 집중식 관리로 유지보수 용이

**wait-utils.ts**:
- `waitForVisible()`, `waitForHidden()`: 요소 가시성 대기
- `waitForUrl()`: URL 변경 대기
- `waitForLoadingToFinish()`: 로딩 완료 대기
- `retryAction()`: 액션 재시도
- `pollUntil()`: 조건 폴링

#### 실행 명령어

```bash
npm run test:e2e          # 모든 테스트 실행
npm run test:e2e:ui       # UI 모드로 실행 (테스트 시각화)
npm run test:e2e:headed   # 브라우저 표시하며 실행
npm run test:e2e:debug    # 디버그 모드
npm run test:e2e:report   # HTML 리포트 보기
```

#### Playwright 설정

| 설정 | 값 |
|------|-----|
| Base URL | `http://localhost:3001` |
| 브라우저 | Chrome, Firefox, Safari, Mobile Chrome, Mobile Safari |
| 웹서버 | `npm run dev` 자동 시작 |
| 리포트 | HTML (`e2e/playwright-report/`), JSON, List |
| 스크린샷 | 실패 시만 캡처 |
| 비디오 | 재시도 시만 녹화 |
| 타임아웃 | 테스트 30초, expect 5초 |

#### 테스트 작성 가이드라인

1. **POM 사용**: 테스트 파일에서 직접 셀렉터를 사용하지 말고 POM을 통해 접근
2. **Fixture 활용**: 인증, 다국어 등 반복되는 설정은 fixture로 관리
3. **명확한 테스트명**: `should [동작] when [조건]` 형식 권장
4. **독립적 테스트**: 각 테스트는 다른 테스트에 의존하지 않도록 작성
5. **적절한 대기**: `waitFor*` 유틸리티를 사용하여 안정적인 테스트 작성

---

## 개발 서버

```bash
npm run dev     # http://localhost:3001
npm run build   # 프로덕션 빌드
npm run start   # 프로덕션 서버
npm run lint    # ESLint 실행
```

## 지원 언어

- 한국어 (ko) - 기본
- English (en)
- 日本語 (ja)
- 中文 (zh)
- Français (fr)
- Italiano (it)
- Español (es)
