# Mandalart

만다라트 기법을 활용한 목표 설정 PWA 앱입니다.

## 만다라트란?

만다라트(Mandal-Art)는 일본의 디자이너 이마이즈미 히로아키가 고안한 발상 기법으로, 3x3 격자 9개를 활용해 핵심 목표와 세부 실천 항목을 체계적으로 정리하는 방법입니다.

MLB 스타 오타니 쇼헤이가 고등학교 시절 "8개 구단 드래프트 1순위"를 목표로 만다라트를 작성해 실천한 것으로 유명해졌습니다.

## 주요 기능

### 비회원
- 9x9 만다라트 그리드 작성
- 중앙 목표와 세부 목표 자동 연동
- 다크 모드 지원
- PNG/PDF 내보내기
- 오프라인 지원 (PWA)
- 로컬 스토리지 자동 저장

### 회원 (추가 기능)
- 무제한 만달아트 생성 및 관리
- 서버에 안전하게 저장
- 모든 기기에서 접근 가능
- 연도별/목표별 관리
- Google/GitHub OAuth 로그인

## 기술 스택

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS 4
- **Language**: TypeScript
- **Authentication**: NextAuth.js
- **Database**: Supabase (PostgreSQL)
- **PWA**: @ducanh2912/next-pwa
- **Export**: html-to-image, jsPDF
- **Icons**: Lucide React
- **Testing**: Storybook, Vitest, Playwright

## 시작하기

### 1. 의존성 설치
```bash
npm install
```

### 2. 환경 변수 설정
`.env.example` 파일을 `.env.local`로 복사하고 값을 입력하세요:

```bash
cp .env.example .env.local
```

필요한 환경 변수:
- **Supabase**: 프로젝트 URL, Anon Key, Service Role Key
- **NextAuth**: Secret (랜덤 문자열), URL
- **Google OAuth**: Client ID, Client Secret
- **GitHub OAuth**: Client ID, Client Secret

### 3. 개발 서버 실행
```bash
npm run dev
```

### 4. Vercel 배포 시
Vercel 대시보드에서 Environment Variables에 `.env.local`의 모든 변수를 추가하세요.

### 프로덕션 빌드
```bash
npm run build
npm run start
```

## 프로젝트 구조

```
├── app/                       # Next.js App Router
│   ├── api/                  # API Routes
│   │   ├── auth/            # NextAuth
│   │   └── mandalarts/      # 만달아트 CRUD API
│   ├── auth/                # 인증 페이지
│   ├── dashboard/           # 대시보드 (회원)
│   ├── layout.tsx           # 루트 레이아웃
│   ├── page.tsx             # 메인 페이지
│   └── globals.css          # 전역 스타일
├── components/               # React 컴포넌트
│   ├── Block/               # 3x3 블록
│   ├── Cell/                # 개별 셀
│   ├── Grid/                # 9x9 그리드
│   ├── Header/              # 헤더
│   ├── InfoButton/          # 정보 모달
│   ├── MandalartEditor/     # 에디터
│   └── SessionProvider/     # NextAuth Provider
├── lib/                      # 유틸리티
│   ├── auth/                # 인증 설정
│   └── supabase/            # Supabase 클라이언트
├── contexts/                 # React Context
│   └── ThemeContext.tsx     # 다크모드
└── public/                   # 정적 파일
    └── manifest.json        # PWA 매니페스트
```

## 스크립트

| 명령어 | 설명 |
|--------|------|
| `npm run dev` | 개발 서버 실행 |
| `npm run build` | 프로덕션 빌드 |
| `npm run start` | 프로덕션 서버 실행 |
| `npm run lint` | ESLint 검사 |
| `npm run storybook` | Storybook 실행 |
| `npm run build-storybook` | Storybook 빌드 |

## 라이선스

MIT
