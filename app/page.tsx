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
                    <h1 className="text-5xl font-extrabold gold-text leading-tight">우주의 흐름을<br />AI로 읽다</h1>
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
