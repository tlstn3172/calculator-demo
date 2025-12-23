# 디자인 파일

이 디렉토리에는 공학용 전자계산기 웹 애플리케이션의 디자인 참고 파일들이 포함되어 있습니다.

## 파일 목록

### `code.html`
- **설명**: Stitch로 생성된 계산기 UI 프로토타입
- **용도**: HTML 구조 및 Tailwind CSS 스타일 참고
- **특징**:
  - 다크모드 지원
  - 반응형 레이아웃
  - Material Symbols 아이콘 사용
  - Space Grotesk 폰트

### `screen.png`
- **설명**: 계산기 UI 스크린샷
- **용도**: 디자인 참고 이미지
- **해상도**: 실제 구현 시 참고용

## 디자인 시스템

### 색상 팔레트
- **Primary**: `#135bec` (파란색)
- **Background (Light)**: `#f6f6f8`
- **Background (Dark)**: `#101622`
- **Surface (Dark)**: `#192233`
- **Surface Highlight (Dark)**: `#232d42`

### 타이포그래피
- **폰트**: Space Grotesk
- **결과 표시**: 6xl~7xl, font-weight: 700
- **수식 표시**: 3xl~4xl, font-weight: 400

### 레이아웃
- **최대 너비**: 448px (max-w-md)
- **버튼 간격**: 0.75rem (12px)
- **Border Radius**: 0.75rem~1rem

## 구현 시 참고사항

1. **HTML 구조**: `code.html`의 구조를 참고하되, 동적 렌더링을 위해 JavaScript로 재구성
2. **스타일링**: Tailwind CSS 클래스를 그대로 활용
3. **반응형**: 모바일 우선 접근 방식
4. **접근성**: ARIA 레이블 및 키보드 네비게이션 추가 필요

## 관련 문서

- [PRD - 제품 요구사항](../PRD.md)
- [Tech Spec - 기술 명세서](../TechSpec.md)
