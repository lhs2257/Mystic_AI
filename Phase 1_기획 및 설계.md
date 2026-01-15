# 🔮 AI 사주 서비스 "Mystic AI" 프로젝트 블루프린트 - 기획/설계

이 문서는 AI 기반 사주 풀이 서비스인 **Mystic AI**의 초기 기획과 개발 방향을 정의한 문서입니다. 모바일에 최적화된 신비로운 사용자 경험을 제공하는 것을 목표로 합니다.

---

## 🛠 1. 기술 스택 (Tech Stack)

| 구분 | 선택된 기술 | 활용 목적 |
| :--- | :--- | :--- |
| **Frontend** | **Next.js (App Router)** | SEO 최적화 및 빠른 페이지 전환, 모바일 반응형 웹 구현 |
| **Styling** | **Tailwind CSS** | 유연한 레이아웃 구성 및 다크 모드/Glassmorphism 스타일링 |
| **Animation** | **Framer Motion** | 컴포넌트 등장 효과, 카드 뒤집기 등 인터랙티브 애니메이션 |
| **Backend** | **Next.js API Routes** | 사주 데이터 계산 및 OpenAI API 통신을 위한 서버리스 환경 |
| **AI Engine** | **OpenAI API (GPT-4o)** | 만세력 데이터를 바탕으로 개인화된 운세 해석 문장 생성 |

---

## 📋 2. 프로젝트 기획 (Planning)

### 2.1 핵심 가치 및 목표
- **접근성**: 사주 용어를 몰라도 누구나 쉽게 이해할 수 있는 언어 사용.
- **감성적 경험**: 단순 결과 나열이 아닌, '우주가 나에게 주는 메시지' 같은 연출.
- **모바일 우선**: 모든 조작은 한 손으로 가능하도록 인터페이스 최적화.

### 2.2 사용자 흐름 (User Flow)
1. **Hero Section (시작)**: 신비로운 배경 애니메이션과 서비스 소개.
2. **Input Section (입력)**: 이름, 성별, 생년월일시(양력/음력) 입력.
3. **Loading Section (분석)**: AI가 사주팔자를 조합하는 동안 제공되는 감성 브릿지.
4. **Result Dashboard (결과)**: 오행(木火土金水) 분포, 성격 분석, 올해의 운세 카드.

---

## 🎨 3. 디자인 시스템 (Design System)

* **테마명**: **Modern Mystic** (현대적인 신비로움)
* **주요 스타일**: **Glassmorphism** (투명도와 블러 효과를 활용한 유리 느낌의 UI)
* **색상 가이드**:
  - **Background**: `#0F172A` (Deep Navy - 깊은 밤하늘)
  - **Primary**: `#FDE047` (Gold - 빛나는 별, 지혜)
  - **Secondary**: `#818CF8` (Indigo - 신비로운 통찰력)
* **Typography**: 헤드라인(Serif - 권위/전통), 본문(Sans-serif - 현대적 가독성)

---

## 📊 4. 데이터 스키마 (Data Schema)

프론트엔드와 백엔드 간 통신을 위한 표준 JSON 구조입니다.

```json
{
  "user_meta": {
    "name": "홍길동",
    "gender": "male",
    "birth": "1995-05-20T14:30:00",
    "calendar_type": "solar"
  },
  "saju_output": {
    "pillars": {
      "year": "乙亥",
      "month": "辛巳",
      "day": "丁酉",
      "hour": "丁未"
    },
    "elements": {
      "wood": 1, "fire": 3, "earth": 1, "metal": 2, "water": 1
    },
    "day_master": "정화(丁火)"
  }
}

## 🚀 5. 단계별 개발 로드맵

Phase 1: 기획 및 설계 (현재 단계)

Phase 2: 백엔드 로직 구축 (Back-end Step 1)

만세력 계산 모듈 선정 및 테스트

OpenAI API 연동 및 시스템 프롬프트(Persona) 설계

Phase 3: 프론트엔드 UI 개발 (Front-end Step 1)

Tailwind 기반 반응형 레이아웃 및 디자인 시스템 적용

사용자 정보 입력 폼 및 결과 리포트 대시보드 제작

Phase 4: 인터랙션 및 배포 (Interaction & Launch)

Framer Motion 기반 애니메이션 고도화

Vercel 등을 활용한 최종 배포