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

    const handleSubmit = () => {
        if (!formData.name || !formData.birthDate || !formData.birthTime) {
            alert('모든 정보를 입력해주세요.');
            return;
        }
        onSubmit(formData);
    };

    return (
        <div className="glass-card p-8 w-full max-w-md mx-auto space-y-6">
            <h2 className="text-2xl font-bold text-center gold-text">운명의 정보 입력</h2>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm text-gray-400 mb-1">이름</label>
                    <input
                        type="text"
                        value={formData.name}
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3 outline-none focus:border-indigo-500"
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">생년월일</label>
                        <input
                            type="date"
                            value={formData.birthDate}
                            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 outline-none"
                            onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-400 mb-1">태어난 시간</label>
                        <input
                            type="time"
                            value={formData.birthTime}
                            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 outline-none"
                            onChange={(e) => setFormData({ ...formData, birthTime: e.target.value })}
                        />
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        checked={formData.isLunar}
                        id="lunar"
                        className="w-4 h-4 rounded border-gray-300"
                        onChange={(e) => setFormData({ ...formData, isLunar: e.target.checked })}
                    />
                    <label htmlFor="lunar" className="text-sm text-gray-300">음력으로 계산하기</label>
                </div>
            </div>

            <button
                onClick={handleSubmit}
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 rounded-2xl font-bold flex items-center justify-center space-x-2 transition-all shadow-lg shadow-indigo-500/20"
            >
                <Sparkles size={20} />
                <span>분석 시작하기</span>
            </button>
        </div>
    );
}
