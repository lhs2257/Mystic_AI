'use client';

import { toPng } from 'html-to-image';
import { Download, Share2 } from 'lucide-react';

export default function ShareButton({ elementId }: { elementId: string }) {
    const downloadImage = async () => {
        const element = document.getElementById(elementId);
        if (!element) return;

        const dataUrl = await toPng(element, { cacheBust: true });
        const link = document.createElement('a');
        link.download = `mystic-ai-result-${Date.now()}.png`;
        link.href = dataUrl;
        link.click();
    };

    return (
        <div className="flex space-x-4 mt-8">
            <button
                onClick={downloadImage}
                className="flex-1 py-4 bg-white/10 hover:bg-white/20 rounded-2xl flex items-center justify-center space-x-2 transition-all border border-white/20"
            >
                <Download size={18} />
                <span>이미지로 저장</span>
            </button>
            <button
                onClick={() => alert('링크가 복사되었습니다!')}
                className="p-4 bg-indigo-600 rounded-2xl transition-all"
            >
                <Share2 size={18} />
            </button>
        </div>
    );
}
