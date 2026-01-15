# ⚙️ AI 사주 서비스 "Mystic AI" 프로젝트 블루프린트 - 백엔드 구축

이 문서는 사주 데이터를 계산하고 OpenAI GPT-4o를 통해 결과를 분석하는 백엔드 API 로직(`BACKEND_STEP1`)을 담고 있습니다.

---

## 📦 1. 사전 의존성 설치 (Dependencies)

사주 계산을 위한 만세력 라이브러리와 OpenAI SDK를 설치해야 합니다.

```bash
npm install openai lunar-javascript

🛠 2. 사주 계산 유틸리티 (utils/sajuCalculator.ts)
사용자의 생년월일을 받아 '만세력(사주팔자)'과 '오행(五行)' 점수를 계산하는 로직입니다.
import { Solar, Lunar, IanaId } from 'lunar-javascript';

export const calculateSaju = (birthDate: string, birthTime: string, isLunar: boolean) => {
  const date = new Date(`${birthDate}T${birthTime}`);
  let solar: Solar;

  if (isLunar) {
    // 음력일 경우 양력으로 변환하여 처리
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    solar = Lunar.fromYmd(year, month, day).getSolar();
  } else {
    solar = Solar.fromDate(date);
  }

  const lunar = solar.getLunar();
  const eightChars = lunar.getEightChar();

  // 사주팔자(천간+지지) 추출
  const pillars = {
    year: eightChars.getYear(),
    month: eightChars.getMonth(),
    day: eightChars.getDay(),
    hour: eightChars.getHour(),
  };

  // 오행 분포 점수 계산 (단순화된 로직)
  const allChars = [
    pillars.year, pillars.month, pillars.day, pillars.hour
  ].join('');

  const elements = {
    wood: (allChars.match(/[甲乙寅卯]/g) || []).length * 10,
    fire: (allChars.match(/[丙丁巳午]/g) || []).length * 10,
    earth: (allChars.match(/[戊己辰戌丑未]/g) || []).length * 10,
    metal: (allChars.match(/[庚辛申酉]/g) || []).length * 10,
    water: (allChars.match(/[壬癸亥子]/g) || []).length * 10,
  };

  return {
    pillars,
    elements,
    dayMaster: pillars.day.substring(0, 1), // 일간(나를 상징하는 글자)
  };
};

🤖 3. AI 연동 서비스 (services/aiAnalysis.ts)
OpenAI GPT-4o에 사주 데이터를 전달하고 'Modern Mystic' 톤의 해석을 받아오는 함수입니다.

import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const getAIAnalysis = async (sajuData: any, userName: string) => {
  const prompt = `
    당신은 현대적이고 공감 능력이 뛰어난 최고의 사주 분석가입니다.
    사용자 이름: ${userName}
    사주 데이터: ${JSON.stringify(sajuData)}

    위 데이터를 바탕으로 다음 가이드라인에 따라 분석 리포트를 작성하세요:
    1. 전문 용어(격국, 용신 등)는 최대한 배제하고 일상적이고 신비로운 언어를 사용하세요.
    2. 결과는 반드시 다음 JSON 형식을 유지해야 합니다.
    3. 'Modern Mystic' 컨셉에 맞춰 격려와 조언을 중심으로 작성하세요.

    JSON 형식:
    {
      "personality": "핵심 성격 3줄 요약",
      "fate": "전반적인 운의 흐름과 올해의 운세",
      "advice": "사용자를 위한 따뜻한 조언",
      "lucky_items": {
        "color": "추천 색상",
        "number": "행운의 숫자",
        "direction": "길한 방향"
      }
    }
  `;

  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [{ role: 'system', content: prompt }],
    response_format: { type: "json_object" }
  });

  return JSON.parse(response.choices[0].message.content || '{}');
};

🌐 4. API 엔드포인트 구현 (app/api/saju/analyze/route.ts)
프론트엔드에서 데이터를 받아 전체 프로세스를 실행하는 API 라우트입니다.

import { NextResponse } from 'next/server';
import { calculateSaju } from '@/utils/sajuCalculator';
import { getAIAnalysis } from '@/services/aiAnalysis';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, birthDate, birthTime, isLunar } = body;

    // 1. 사주 데이터 계산
    const sajuData = calculateSaju(birthDate, birthTime, isLunar);

    // 2. AI 분석 요청
    const analysis = await getAIAnalysis(sajuData, name);

    return NextResponse.json({
      success: true,
      data: {
        sajuData,
        analysis
      }
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ success: false, message: '분석 중 오류가 발생했습니다.' }, { status: 500 });
  }
}