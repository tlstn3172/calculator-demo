# 프로젝트 작업 목록

## 프로젝트 개요
공학용 전자계산기 웹 애플리케이션 개발 (TDD + SOLID 원칙 적용)

**개발 기간**: 10주 (예상)  
**현재 상태**: 📋 기획 및 설계 완료  
**다음 단계**: 🛠️ 개발 환경 설정

---

## Phase 1: 프로젝트 설정 및 기반 구축 (1주)

### 1.1 개발 환경 설정
- [ ] Node.js 프로젝트 초기화
  - [ ] `npm init` 실행
  - [ ] `package.json` 설정
  - [ ] `.gitignore` 생성
- [ ] 의존성 설치
  - [ ] Vite 설치 및 설정
  - [ ] Tailwind CSS 설치 및 설정
  - [ ] Math.js 설치
  - [ ] Vitest 설치 (코어 로직 테스트용)
- [ ] 빌드 도구 설정
  - [ ] `vite.config.js` 최종 확인
  - [ ] `tailwind.config.js` 생성
  - [ ] PostCSS 설정
- [ ] 코드 품질 도구 설정
  - [ ] ESLint 설정 (`.eslintrc.json`)
  - [ ] Prettier 설정 (`.prettierrc`)
  - [ ] Husky + lint-staged (pre-commit hook)

### 1.2 프로젝트 구조 생성
- [ ] 디렉토리 구조 생성
  ```
  src/
  ├── index.html
  ├── styles/
  │   └── index.css
  ├── scripts/
  │   ├── main.js
  │   ├── calculator/
  │   ├── state/
  │   ├── ui/
  │   └── utils/
  └── assets/
  ```
- [ ] 테스트 디렉토리 구조 생성
  ```
  tests/
  ├── calculator/    # 코어 로직 테스트
  ├── state/         # 상태 관리 테스트
  └── utils/         # 유틸리티 테스트
  ```

### 1.3 기본 HTML/CSS 설정
- [ ] `index.html` 기본 구조 작성
  - [ ] Meta 태그 설정
  - [ ] 폰트 로드 (Space Grotesk, Material Symbols)
  - [ ] 기본 레이아웃 구조
- [ ] `styles/index.css` 작성
  - [ ] Tailwind 기본 설정
  - [ ] 커스텀 CSS 변수
  - [ ] 다크모드 스타일
  - [ ] 버튼 컴포넌트 스타일

---

## Phase 2: 코어 로직 구현 (3주)

### 2.1 수학 계산 엔진 (Week 2)

#### MathEngine 클래스
- [ ] **TDD**: `MathEngine.test.js` 작성
  - [ ] 기본 사칙연산 테스트
  - [ ] 소수점 계산 테스트
  - [ ] 에러 처리 테스트
- [ ] **구현**: `MathEngine.js`
  - [ ] Math.js 통합
  - [ ] `evaluate()` 메서드
  - [ ] `formatResult()` 메서드
  - [ ] `handleError()` 메서드
- [ ] **리팩토링**: 코드 최적화
- [ ] **테스트 커버리지**: 95% 이상 확인

#### ExpressionParser 클래스
- [ ] **TDD**: `ExpressionParser.test.js` 작성
  - [ ] 연산자 변환 테스트 (×→*, ÷→/)
  - [ ] 괄호 균형 검증 테스트
  - [ ] 수식 유효성 검증 테스트
- [ ] **구현**: `ExpressionParser.js`
  - [ ] `parse()` 메서드
  - [ ] `validate()` 메서드
  - [ ] `formatForDisplay()` 메서드
- [ ] **리팩토링**: 정규식 최적화
- [ ] **테스트 커버리지**: 95% 이상 확인

### 2.2 공학용 함수 (Week 3)

#### 삼각함수 지원
- [ ] **TDD**: 삼각함수 테스트
  - [ ] sin, cos, tan 테스트 (DEG 모드)
  - [ ] sin, cos, tan 테스트 (RAD 모드)
  - [ ] 각도 변환 테스트
- [ ] **구현**: 삼각함수 로직
  - [ ] 각도 모드 관리 (`AngleMode.js`)
  - [ ] `adjustForAngleMode()` 메서드
  - [ ] 각도 단위 변환 로직
- [ ] **테스트 커버리지**: 95% 이상 확인

#### 로그 및 지수 함수
- [ ] **TDD**: 로그/지수 함수 테스트
  - [ ] log (상용로그) 테스트
  - [ ] ln (자연로그) 테스트
  - [ ] x² (제곱) 테스트
  - [ ] π (파이) 상수 테스트
- [ ] **구현**: 로그/지수 함수 로직
- [ ] **테스트 커버리지**: 95% 이상 확인

### 2.3 계산기 메인 로직 (Week 4)

#### Calculator 클래스
- [ ] **TDD**: `Calculator.test.js` 작성
  - [ ] 계산 흐름 통합 테스트
  - [ ] 연산 우선순위 테스트
  - [ ] 복잡한 수식 테스트
- [ ] **구현**: `Calculator.js`
  - [ ] 의존성 주입 (MathEngine, ExpressionParser)
  - [ ] `calculate()` 메서드
  - [ ] `setAngleMode()` 메서드
  - [ ] 에러 처리 통합
- [ ] **리팩토링**: SOLID 원칙 검토
- [ ] **테스트 커버리지**: 95% 이상 확인

---

## Phase 3: 상태 관리 구현 (1주)

### 3.1 StateManager 클래스 (Week 5)
- [ ] **TDD**: `StateManager.test.js` 작성
  - [ ] 상태 업데이트 테스트
  - [ ] 리스너 등록/해제 테스트
  - [ ] LocalStorage 저장/로드 테스트
- [ ] **구현**: `StateManager.js`
  - [ ] `setState()` 메서드
  - [ ] `getState()` / `get()` 메서드
  - [ ] `subscribe()` 메서드
  - [ ] `saveState()` / `loadState()` 메서드
- [ ] **리팩토링**: 옵저버 패턴 최적화
- [ ] **테스트 커버리지**: 85% 이상 확인

### 3.2 HistoryManager 클래스
- [ ] **TDD**: `HistoryManager.test.js` 작성
  - [ ] 기록 추가 테스트
  - [ ] 기록 삭제 테스트
  - [ ] 기록 재사용 테스트
- [ ] **구현**: `HistoryManager.js`
  - [ ] `addEntry()` 메서드
  - [ ] `removeEntry()` 메서드
  - [ ] `clearHistory()` 메서드
  - [ ] `reuseEntry()` 메서드
- [ ] **테스트 커버리지**: 85% 이상 확인

---

## Phase 4: UI 구현 (2주)

### 4.1 Display 컴포넌트 (Week 6)
- [ ] **구현**: `Display.js`
  - [ ] DOM 요소 초기화
  - [ ] `updateExpression()` 메서드
  - [ ] `updateResult()` 메서드
  - [ ] `updateHistory()` 메서드
  - [ ] `showError()` 메서드
  - [ ] 가로 스크롤 처리
- [ ] **스타일링**: 디스플레이 영역 CSS
  - [ ] 수식 표시 스타일
  - [ ] 결과 표시 스타일
  - [ ] 애니메이션 효과
- [ ] **수동 테스트**: 브라우저에서 렌더링 확인

### 4.2 ButtonHandler 컴포넌트 (Week 6)
- [ ] **구현**: `ButtonHandler.js`
  - [ ] 이벤트 리스너 등록
  - [ ] `handleNumber()` 메서드
  - [ ] `handleOperator()` 메서드
  - [ ] `handleFunction()` 메서드
  - [ ] `handleEquals()` 메서드
  - [ ] `handleClear()` / `handleBackspace()` 메서드
  - [ ] `handleKeyboard()` 메서드 (키보드 지원)
- [ ] **UI 렌더링**: 버튼 레이아웃
  - [ ] 공학용 함수 버튼 (5열)
  - [ ] 숫자 패드 버튼 (4열)
  - [ ] 연산자 버튼
  - [ ] 특수 버튼 (AC, =, ANS 등)

### 4.3 ThemeManager 컴포넌트 (Week 7)
- [ ] **구현**: `ThemeManager.js`
  - [ ] 시스템 다크모드 감지
  - [ ] `setTheme()` 메서드
  - [ ] `toggleTheme()` 메서드
  - [ ] LocalStorage 연동
- [ ] **스타일링**: 다크모드 CSS
  - [ ] 색상 변수 정의
  - [ ] 다크모드 전환 애니메이션

### 4.4 메인 앱 통합 (Week 7)
- [ ] **구현**: `main.js`
  - [ ] 의존성 주입 설정
  - [ ] 컴포넌트 초기화
  - [ ] 이벤트 바인딩
- [ ] **HTML**: 최종 마크업
  - [ ] Top App Bar
  - [ ] Display Area
  - [ ] Controls Container
- [ ] **반응형**: 모바일/태블릿/데스크톱 대응

---

## Phase 5: 유틸리티 및 추가 기능 (1주)

### 5.1 유틸리티 함수 (Week 8)
- [ ] **TDD**: `validators.test.js`
  - [ ] 입력 검증 테스트
  - [ ] 수식 유효성 테스트
- [ ] **구현**: `validators.js`
  - [ ] 입력 검증 함수
  - [ ] 길이 제한 검증
- [ ] **TDD**: `formatters.test.js`
  - [ ] 숫자 포맷팅 테스트
  - [ ] 과학적 표기법 테스트
- [ ] **구현**: `formatters.js`
  - [ ] 결과 포맷팅 함수
  - [ ] 소수점 처리
- [ ] **구현**: `constants.js`
  - [ ] 상수 정의 (π, e 등)
  - [ ] 설정 값 정의

### 5.2 History Panel (선택 기능)
- [ ] **UI**: 기록 패널 디자인
  - [ ] 슬라이드 인 애니메이션
  - [ ] 기록 목록 표시
  - [ ] 삭제 버튼
- [ ] **기능**: 기록 관리
  - [ ] 기록 클릭 시 재사용
  - [ ] 기록 삭제
  - [ ] 전체 삭제

### 5.3 Settings Menu (선택 기능)
- [ ] **UI**: 설정 메뉴 디자인
- [ ] **기능**: 설정 옵션
  - [ ] 다크모드 수동 전환
  - [ ] 각도 단위 기본값 설정
  - [ ] 소수점 자릿수 설정

---

## Phase 6: 테스트 및 품질 보증 (1주)

### 6.1 단위 테스트 완성 (Week 9)
- [ ] 모든 코어 로직 테스트 커버리지 확인
  - [ ] MathEngine: 95% 이상
  - [ ] ExpressionParser: 95% 이상
  - [ ] Calculator: 95% 이상
  - [ ] StateManager: 85% 이상
  - [ ] HistoryManager: 85% 이상
  - [ ] Utilities: 90% 이상
- [ ] 엣지 케이스 테스트 추가
  - [ ] 0으로 나누기
  - [ ] 매우 큰 수
  - [ ] 매우 작은 수
  - [ ] 잘못된 수식
  - [ ] 괄호 불균형

### 6.2 통합 테스트 (코어 로직만)
- [ ] 계산 흐름 통합 테스트
  - [ ] 입력 → 파싱 → 계산 (UI 제외)
  - [ ] 상태 관리 통합
  - [ ] 기록 저장 및 로드
- [ ] 에러 처리 통합 테스트

### 6.3 수동 UI 테스트
- [ ] **시나리오 1**: 기본 계산
  - [ ] 2 + 3 = 5 (버튼 클릭)
  - [ ] 10 - 7 = 3 (버튼 클릭)
  - [ ] 4 × 5 = 20 (버튼 클릭)
  - [ ] 15 ÷ 3 = 5 (버튼 클릭)
- [ ] **시나리오 2**: 공학용 계산
  - [ ] sin(30) = 0.5 (DEG 모드)
  - [ ] cos(0) = 1
  - [ ] log(100) = 2
- [ ] **시나리오 3**: 복잡한 수식
  - [ ] (12 + 5) × sin(30) = 8.5
  - [ ] 2 × π ≈ 6.28
- [ ] **시나리오 4**: UI 인터랙션
  - [ ] 다크모드 토글 동작 확인
  - [ ] 키보드 입력 동작 확인
  - [ ] 기록 패널 열기/닫기 확인
  - [ ] 버튼 호버/클릭 애니메이션 확인
- [ ] **시나리오 5**: 에러 처리
  - [ ] 5 ÷ 0 → 에러 메시지 표시 확인
  - [ ] 잘못된 수식 → 에러 메시지 표시 확인

### 6.4 크로스 브라우저 테스트 (수동)
- [ ] Chrome (최신 + 이전 2버전) - 기본 계산 및 UI 확인
- [ ] Firefox (최신 + 이전 2버전) - 기본 계산 및 UI 확인
- [ ] Safari (최신 + 이전 2버전) - 기본 계산 및 UI 확인
- [ ] Edge (최신 + 이전 2버전) - 기본 계산 및 UI 확인
- [ ] 모바일 브라우저 (iOS Safari, Chrome Mobile) - 터치 인터랙션 확인

### 6.5 접근성 테스트 (수동)
- [ ] WCAG 2.1 Level AA 준수 확인 (Lighthouse)
- [ ] 키보드 네비게이션 테스트 (Tab, Enter, Escape 등)
- [ ] 스크린 리더 테스트 (NVDA/JAWS)
- [ ] 색상 대비 확인 (4.5:1 이상, Chrome DevTools)
- [ ] 포커스 인디케이터 확인

### 6.6 성능 테스트
- [ ] Lighthouse 점수 확인
  - [ ] Performance: 90+ 목표
  - [ ] Accessibility: 90+ 목표
  - [ ] Best Practices: 90+ 목표
  - [ ] SEO: 90+ 목표
- [ ] 계산 응답 시간: 100ms 이하
- [ ] 번들 크기: 500KB 이하
- [ ] First Contentful Paint: 1.0s 이하
- [ ] Time to Interactive: 2.0s 이하

---

## Phase 7: 배포 및 문서화 (1주)

### 7.1 배포 준비 (Week 10)
- [ ] 프로덕션 빌드 최적화
  - [ ] 코드 스플리팅 확인
  - [ ] Tree shaking 확인
  - [ ] CSS Purging 확인
  - [ ] 이미지 최적화
- [ ] 환경 변수 설정
  - [ ] `.env.production` 생성
  - [ ] API 키 등 민감 정보 관리
- [ ] 보안 설정
  - [ ] CSP 헤더 (Meta 태그)
  - [ ] HTTPS 강제
  - [ ] XSS 방지

### 7.2 GitHub Pages 배포
- [ ] GitHub 저장소 설정
  - [ ] Settings → Pages → GitHub Actions 선택
  - [ ] `deploy.yml` 워크플로우 확인
- [ ] 첫 배포 실행
  - [ ] `main` 브랜치에 push
  - [ ] Actions 탭에서 배포 확인
  - [ ] 배포된 사이트 접속 테스트
- [ ] 커스텀 도메인 설정 (선택)
  - [ ] CNAME 파일 생성
  - [ ] DNS 설정
  - [ ] HTTPS 인증서 확인

### 7.3 문서화
- [ ] README.md 작성
  - [ ] 프로젝트 소개
  - [ ] 기능 목록
  - [ ] 스크린샷
  - [ ] 설치 및 실행 방법
  - [ ] 기술 스택
  - [ ] 라이선스
- [ ] CONTRIBUTING.md 작성
  - [ ] 기여 가이드라인
  - [ ] 코드 스타일
  - [ ] PR 프로세스
- [ ] CHANGELOG.md 작성
  - [ ] 버전별 변경 사항
- [ ] API 문서 (JSDoc)
  - [ ] 주요 클래스 및 메서드 문서화

### 7.4 모니터링 설정
- [ ] Google Analytics 설정 (선택)
- [ ] Sentry 에러 추적 설정 (선택)
- [ ] 성능 모니터링 설정

---

## Phase 8: 유지보수 및 개선 (지속적)

### 8.1 버그 수정
- [ ] 사용자 피드백 수집
- [ ] 이슈 트래킹 (GitHub Issues)
- [ ] 버그 수정 및 패치 릴리스

### 8.2 기능 개선
- [ ] 사용자 요청 기능 검토
- [ ] 우선순위 결정
- [ ] 점진적 개선

### 8.3 성능 최적화
- [ ] 번들 크기 최적화
- [ ] 로딩 속도 개선
- [ ] 메모리 사용량 최적화

---

## 체크리스트 요약

### 필수 완료 항목
- [ ] Phase 1: 프로젝트 설정 완료
- [ ] Phase 2: 코어 로직 구현 완료 (TDD)
- [ ] Phase 3: 상태 관리 구현 완료 (TDD)
- [ ] Phase 4: UI 구현 완료
- [ ] Phase 5: 유틸리티 구현 완료
- [ ] Phase 6: 테스트 커버리지 80% 이상
- [ ] Phase 7: GitHub Pages 배포 완료

### 선택 완료 항목
- [ ] History Panel 구현
- [ ] Settings Menu 구현
- [ ] 커스텀 도메인 설정
- [ ] Google Analytics 설정
- [ ] Sentry 에러 추적

---

## 진행 상황 추적

### 완료된 작업 ✅
- [x] PRD 작성
- [x] Tech Spec 작성
- [x] TDD 규칙 문서화
- [x] SOLID 원칙 문서화
- [x] GitHub Actions 워크플로우 설정
- [x] Vite 설정 파일 작성
- [x] 배포 가이드 작성
- [x] 디자인 파일 정리

### 현재 작업 중 🚧
- [ ] 개발 환경 설정

### 다음 작업 📋
- [ ] 프로젝트 초기화 (npm init)
- [ ] 의존성 설치

---

## 참고 문서
- [PRD - 제품 요구사항](./PRD.md)
- [Tech Spec - 기술 명세서](./TechSpec.md)
- [TDD 규칙](./rules/tdd.md)
- [SOLID 원칙](./rules/solid.md)
- [배포 가이드](./DEPLOYMENT.md)

---

**마지막 업데이트**: 2025-12-23  
**예상 완료일**: 2026-03-02 (10주 후)
