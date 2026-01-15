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
