# 🎨 AI 사주 서비스 "Mystic AI" 프로젝트 블루프린트 - 프론트엔드 UI

이 문서는 모바일 최적화 UI를 구축하고 백엔드 API와 연동하는 프론트엔드 핵심 코드(`FRONTEND_STEP1`)를 담고 있습니다.

---

## 📦 1. 사전 의존성 설치 (Dependencies)

아이콘, 애니메이션, 그리고 데이터 시각화를 위한 라이브러리를 설치합니다.

```bash
npm install framer-motion lucide-react recharts

🎨 2. 글로벌 스타일 및 테마 설정 (app/globals.css)
Glassmorphism 효과와 신비로운 배경 그라데이션을 설정합니다.

@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: #0f172a;
  --foreground: #ffffff;
}

body {
  background: radial-gradient(circle at top right, #1e1b4b, #0f172a);
  color: var(--foreground);
  min-height: 100vh;
}

/* Glassmorphism 유틸리티 */
.glass-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
}

.gold-text {
  background: linear-gradient(135deg, #fde047 0%, #fbbf24 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

📝 3. 입력 폼 컴포넌트 (components/SajuForm.tsx)
사용자 정보를 수집하는 세련된 입력 인터페이스입니다.

'use client';

import { useState } from 'react';
import { Sparkles } from 'lucide-react';

export default function SajuForm({ onSubmit }: { onSubmit: (data: any) => void }) {
  const [formData, setFormData] = useState({
    name: '',
    birthDate: '',
    birthTime: '12:00',
    isLunar: false,
  });

  return (
    <div className="glass-card p-8 w-full max-w-md mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-center gold-text">운명의 정보 입력</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-400 mb-1">이름</label>
          <input 
            type="text"
            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 outline-none focus:border-indigo-500"
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">생년월일</label>
            <input 
              type="date"
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 outline-none"
              onChange={(e) => setFormData({...formData, birthDate: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">태어난 시간</label>
            <input 
              type="time"
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 outline-none"
              onChange={(e) => setFormData({...formData, birthTime: e.target.value})}
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <input 
            type="checkbox" 
            id="lunar"
            className="w-4 h-4 rounded border-gray-300"
            onChange={(e) => setFormData({...formData, isLunar: e.target.checked})}
          />
          <label htmlFor="lunar" className="text-sm text-gray-300">음력으로 계산하기</label>
        </div>
      </div>

      <button 
        onClick={() => onSubmit(formData)}
        className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 rounded-2xl font-bold flex items-center justify-center space-x-2 transition-all shadow-lg shadow-indigo-500/20"
      >
        <Sparkles size={20} />
        <span>분석 시작하기</span>
      </button>
    </div>
  );
}

📊 4. 분석 결과 대시보드 (components/ResultDashboard.tsx)
AI 분석 텍스트와 오행 분포를 시각화하여 보여줍니다.

'use client';

import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

export default function ResultDashboard({ data }: { data: any }) {
  const { sajuData, analysis } = data;
  
  const elementData = [
    { name: '木', value: sajuData.elements.wood, color: '#4ADE80' },
    { name: '火', value: sajuData.elements.fire, color: '#F87171' },
    { name: '土', value: sajuData.elements.earth, color: '#FB923C' },
    { name: '金', value: sajuData.elements.metal, color: '#E2E8F0' },
    { name: '水', value: sajuData.elements.water, color: '#60A5FA' },
  ].filter(item => item.value > 0);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto space-y-6 pb-20"
    >
      {/* 1. 오행 그래프 카드 */}
      <div className="glass-card p-6 text-center">
        <h3 className="text-gray-400 text-sm mb-2">나의 타고난 기운</h3>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={elementData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                {elementData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center space-x-3 text-xs">
          {elementData.map(item => <span key={item.name} style={{color: item.color}}>{item.name} {item.value}%</span>)}
        </div>
      </div>

      {/* 2. AI 성격 분석 카드 */}
      <div className="glass-card p-6">
        <h3 className="gold-text font-bold mb-3">내면의 성격</h3>
        <p className="text-gray-300 leading-relaxed text-sm">{analysis.personality}</p>
      </div>

      {/* 3. 행운 아이템 카드 */}
      <div className="grid grid-cols-3 gap-4">
        {Object.entries(analysis.lucky_items).map(([key, value]: any) => (
          <div key={key} className="glass-card p-4 text-center">
            <div className="text-[10px] text-gray-500 uppercase mb-1">{key}</div>
            <div className="text-xs font-bold text-white">{value}</div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

🌐 5. 메인 페이지 통합 (app/page.tsx)
전체적인 로직 흐름(메인 -> 입력 -> 분석 중 -> 결과)을 제어합니다.

'use client';

import { useState } from 'react';
import SajuForm from '@/components/SajuForm';
import ResultDashboard from '@/components/ResultDashboard';

export default function Home() {
  const [step, setStep] = useState<'intro' | 'form' | 'loading' | 'result'>('intro');
  const [result, setResult] = useState(null);

  const handleAnalyze = async (formData: any) => {
    setStep('loading');
    const res = await fetch('/api/saju/analyze', {
      method: 'POST',
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    setResult(data.data);
    setStep('result');
  };

  return (
    <main className="p-6 pt-12">
      {step === 'intro' && (
        <div className="text-center space-y-12">
          <h1 className="text-5xl font-extrabold gold-text leading-tight">우주의 흐름을<br/>AI로 읽다</h1>
          <button 
            onClick={() => setStep('form')}
            className="px-10 py-4 glass-card font-bold hover:scale-105 transition-transform"
          >
            신비로운 여정 시작하기
          </button>
        </div>
      )}

      {step === 'form' && <SajuForm onSubmit={handleAnalyze} />}
      
      {step === 'loading' && (
        <div className="text-center py-20 space-y-4">
          <div className="animate-spin text-indigo-500 text-4xl">🔮</div>
          <p className="text-indigo-300 animate-pulse">우주의 기운을 조합하고 있습니다...</p>
        </div>
      )}

      {step === 'result' && result && <ResultDashboard data={result} />}
    </main>
  );
}