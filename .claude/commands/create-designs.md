# UI 컴포넌트 생성

사용자가 요청한 UI 컴포넌트를 생성합니다.

## 작업 지침

1. **컴포넌트 분석**: 사용자가 요청한 컴포넌트의 요구사항을 분석합니다.

2. **기존 디자인 시스템 확인**:
   - `src/components/ui/` 디렉토리의 기존 컴포넌트 스타일 확인
   - Tailwind CSS 클래스와 기존 디자인 토큰 활용
   - shadcn/ui 패턴 준수

3. **컴포넌트 생성**:
   - TypeScript로 작성
   - Props 인터페이스 정의
   - 접근성(a11y) 고려
   - 반응형 디자인 적용

4. **i18n 지원**: 텍스트가 있는 경우 `useTranslations` 훅 사용

5. **파일 위치**:
   - 기본 UI 컴포넌트: `src/components/ui/`
   - 페이지별 컴포넌트: `src/components/{page-name}/`
   - 레이아웃 컴포넌트: `src/components/layout/`

## 생성할 컴포넌트

$ARGUMENTS
