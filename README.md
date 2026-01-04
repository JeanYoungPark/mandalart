# Mandalart

만다라트 기법을 활용한 목표 설정 PWA 앱입니다.

## 만다라트란?

만다라트(Mandal-Art)는 일본의 디자이너 이마이즈미 히로아키가 고안한 발상 기법으로, 3x3 격자 9개를 활용해 핵심 목표와 세부 실천 항목을 체계적으로 정리하는 방법입니다.

MLB 스타 오타니 쇼헤이가 고등학교 시절 "8개 구단 드래프트 1순위"를 목표로 만다라트를 작성해 실천한 것으로 유명해졌습니다.

## 주요 기능

- 9x9 만다라트 그리드 작성
- 중앙 목표와 세부 목표 자동 연동
- 다크 모드 지원
- PNG/PDF 내보내기
- 오프라인 지원 (PWA)
- 로컬 스토리지 자동 저장

## 기술 스택

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS 4
- **Language**: TypeScript
- **PWA**: @ducanh2912/next-pwa
- **Export**: html-to-image, jsPDF
- **Icons**: Lucide React
- **Testing**: Storybook, Vitest, Playwright

## 시작하기

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build
npm run start

# Storybook 실행
npm run storybook
```

## 프로젝트 구조

```
├── app/                    # Next.js App Router
│   ├── layout.tsx         # 루트 레이아웃
│   ├── page.tsx           # 메인 페이지
│   └── globals.css        # 전역 스타일
├── components/            # React 컴포넌트
│   ├── Block/            # 3x3 블록
│   ├── Cell/             # 개별 셀
│   ├── Grid/             # 9x9 그리드
│   ├── Header/           # 헤더
│   └── MandalartEditor/  # 에디터 컴포넌트
├── contexts/              # React Context
│   └── ThemeContext.tsx  # 다크모드 관리
├── stories/               # Storybook 스토리
└── public/               # 정적 파일
    └── manifest.json     # PWA 매니페스트
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
