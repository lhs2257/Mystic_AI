import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Mystic AI - 우주의 흐름을 AI로 읽다",
    description: "AI 기반 사주 풀이 서비스로 당신의 운명을 탐색하세요",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko">
            <body>{children}</body>
        </html>
    );
}
