import { NextResponse } from 'next/server';
import { calculateSaju } from '@/utils/sajuCalculator';
import { getAIAnalysis } from '@/services/aiAnalysis';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, birthDate, birthTime, isLunar } = body;

        console.log('[API] Received request:', { name, birthDate, birthTime, isLunar });

        // 1. 사주 데이터 계산
        console.log('[API] Calculating Saju data...');
        let sajuData;
        try {
            sajuData = calculateSaju(birthDate, birthTime, isLunar);
            console.log('[API] Saju calculation successful:', sajuData);
        } catch (calcError) {
            console.error('[API] Saju calculation error:', calcError);
            throw new Error(`Saju calculation failed: ${calcError instanceof Error ? calcError.message : 'Unknown error'}`);
        }

        // 2. AI 분석 요청
        console.log('[API] Requesting AI analysis...');
        let analysis;
        try {
            analysis = await getAIAnalysis(sajuData, name);
            console.log('[API] AI analysis successful');
        } catch (aiError) {
            console.error('[API] AI analysis error:', aiError);
            throw new Error(`AI analysis failed: ${aiError instanceof Error ? aiError.message : 'Unknown error'}`);
        }

        return NextResponse.json({
            success: true,
            data: {
                sajuData,
                analysis
            }
        });
    } catch (error) {
        console.error('[API] Full error:', error);
        return NextResponse.json({
            success: false,
            message: '분석 중 오류가 발생했습니다.',
            error: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}
