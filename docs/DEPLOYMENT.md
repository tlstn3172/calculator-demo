# GitHub Pages 배포 가이드

## 1. 저장소 설정

### GitHub Pages 활성화
1. GitHub 저장소로 이동
2. **Settings** → **Pages** 클릭
3. **Source** 섹션에서 **GitHub Actions** 선택
4. 저장

## 2. 배포 프로세스

### 자동 배포
- `main` 브랜치에 push하면 자동으로 배포됩니다
- GitHub Actions 워크플로우가 자동 실행됩니다

### 배포 단계
1. **테스트**: 린트, 단위 테스트, E2E 테스트 실행
2. **빌드**: 프로덕션 빌드 생성
3. **배포**: GitHub Pages에 자동 배포

## 3. 접속 URL

### 기본 URL
```
https://<username>.github.io/calculator-demo/
```

예시:
```
https://tlstn3172.github.io/calculator-demo/
```

### 커스텀 도메인 (선택사항)

#### CNAME 파일 생성
프로젝트 루트에 `CNAME` 파일 생성:
```
calculator.example.com
```

#### DNS 설정
도메인 제공업체에서 다음 레코드 추가:
```
Type: CNAME
Name: calculator (또는 @)
Value: <username>.github.io
```

#### GitHub 설정
1. Settings → Pages
2. Custom domain 입력
3. Enforce HTTPS 체크

## 4. 배포 확인

### Actions 탭에서 확인
1. GitHub 저장소 → **Actions** 탭
2. 최근 워크플로우 실행 상태 확인
3. 성공 시 녹색 체크마크 표시

### 배포 상태
- ✅ 성공: 사이트가 배포되었습니다
- ❌ 실패: 로그를 확인하여 문제 해결
- 🟡 진행 중: 배포가 진행 중입니다

## 5. 문제 해결

### 404 오류
- `vite.config.js`의 `base` 경로 확인
- 저장소 이름과 일치하는지 확인

### CSS/JS 로드 실패
- 빌드 경로 설정 확인
- 브라우저 캐시 삭제 후 재시도

### 배포 실패
- Actions 로그 확인
- Node.js 버전 확인
- 의존성 설치 오류 확인

## 6. 로컬 테스트

### 프로덕션 빌드 테스트
```bash
npm run build
npm run preview
```

### GitHub Pages 환경 시뮬레이션
```bash
# base path를 포함한 빌드
npm run build

# 로컬 서버로 확인
npx serve dist -s
```

## 7. 보안 설정

### HTTPS 강제
1. Settings → Pages
2. **Enforce HTTPS** 체크박스 활성화

### 보안 헤더 (Cloudflare 사용 시)
- Cloudflare DNS로 변경
- Page Rules에서 보안 헤더 추가
- CSP, X-Frame-Options 등 설정

## 8. 성능 최적화

### 캐싱
- GitHub Pages는 자동으로 CDN 캐싱 제공
- Fastly CDN 사용

### 압축
- Gzip 자동 지원
- 빌드 시 파일 최소화

## 9. 모니터링

### Google Analytics 추가
`index.html`에 추가:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### 배포 알림
- GitHub Actions에서 Slack/Discord 알림 설정 가능
- 배포 성공/실패 시 알림 받기

## 10. 유용한 명령어

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 미리보기
npm run preview

# 테스트 실행
npm run test

# 린트 실행
npm run lint
```
