'use client';

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import ResultCard from './ResultCard';
import ShareButton from './ShareButton';

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
        <div className="max-w-md mx-auto space-y-6 pb-20" id="result-capture">
            {/* 1. 오행 그래프 카드 */}
            <ResultCard delay={0.2}>
                <div className="glass-card p-6 text-center border-indigo-500/30">
                    <h3 className="gold-text font-bold text-xl mb-4">당신의 우주 지도</h3>
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
                        {elementData.map(item => <span key={item.name} style={{ color: item.color }}>{item.name} {item.value}%</span>)}
                    </div>
                </div>
            </ResultCard>

            {/* 2. AI 성격 분석 카드 */}
            <ResultCard delay={0.4}>
                <div className="glass-card p-6">
                    <h3 className="text-indigo-300 font-bold mb-3 flex items-center">
                        <span className="mr-2">✨</span> AI 총평
                    </h3>
                    <p className="text-gray-200 text-sm leading-relaxed">
                        {analysis.personality}
                    </p>
                </div>
            </ResultCard>

            {/* 3. 오늘의 조언 카드 */}
            <ResultCard delay={0.6}>
                <div className="glass-card p-6 bg-indigo-900/20">
                    <h3 className="text-amber-400 font-bold mb-2">오늘의 조언</h3>
                    <p className="text-gray-300 text-sm italic">
                        "{analysis.advice}"
                    </p>
                </div>
            </ResultCard>

            {/* 4. 행운 아이템 카드 */}
            <ResultCard delay={0.8}>
                <div className="grid grid-cols-3 gap-4">
                    {Object.entries(analysis.lucky_items).map(([key, value]: any) => (
                        <div key={key} className="glass-card p-4 text-center">
                            <div className="text-[10px] text-gray-500 uppercase mb-1">{key}</div>
                            <div className="text-xs font-bold text-white">{value}</div>
                        </div>
                    ))}
                </div>
            </ResultCard>

            <ShareButton elementId="result-capture" />
        </div>
    );
}
