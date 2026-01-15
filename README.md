# 🔮 Mystic AI - AI 사주 서비스

AI 기반 사주 풀이 서비스로 현대적이고 신비로운 사용자 경험을 제공합니다.

## ✨ 주요 기능

- 🎨 **Modern Mystic 디자인**: Glassmorphism 효과와 다크 테마
- 📊 **오행(五行) 분석**: 목화토금수 분포 시각화
- 🤖 **AI 운세 해석**: OpenAI GPT-4o 기반 개인화된 분석
- 🎭 **3D 애니메이션**: Framer Motion 카드 플립 효과
- 📱 **모바일 최적화**: 반응형 웹 디자인
- 📸 **결과 공유**: 이미지로 저장 기능

## 🛠 기술 스택

- **Frontend**: Next.js 16 (App Router), TypeScript
- **Styling**: Tailwind CSS 4, Framer Motion
- **Charts**: Recharts
- **AI**: OpenAI API (GPT-4o)
- **Calendar**: lunar-javascript (만세력 계산)

## 🚀 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

`.env.local` 파일을 생성하고 OpenAI API 키를 추가하세요:

```env
OPENAI_API_KEY=your_openai_api_key_here
```

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

## 📖 사용법

1. "신비로운 여정 시작하기" 클릭
2. 이름, 생년월일, 시간 입력
3. 음력/양력 선택
4. "분석 시작하기" 클릭
5. AI 분석 결과 확인

## 🧪 테스트

API 직접 테스트: [http://localhost:3000/test](http://localhost:3000/test)

## 📦 배포

### Vercel 배포

1. GitHub에 푸시
2. [Vercel](https://vercel.com)에서 프로젝트 연결
3. 환경 변수 `OPENAI_API_KEY` 설정
4. Deploy 클릭

## 📝 라이선스

MIT License

## 🙏 크레딧

- OpenAI GPT-4o for AI analysis
- lunar-javascript for Saju calculations
- Framer Motion for animations
