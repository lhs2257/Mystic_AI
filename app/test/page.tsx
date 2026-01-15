'use client';

import { useState } from 'react';

export default function TestPage() {
    const [result, setResult] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const testAPI = async () => {
        setLoading(true);
        const res = await fetch('/api/saju/analyze', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: '이지은',
                birthDate: '1993-05-16',
                birthTime: '14:30',
                isLunar: false
            })
        });
        const data = await res.json();
        setResult(data);
        setLoading(false);
    };

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">API Test Page</h1>
            <button
                onClick={testAPI}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg"
            >
                Test API
            </button>

            {loading && <p className="mt-4">Loading...</p>}

            {result && (
                <pre className="mt-4 bg-gray-100 p-4 rounded text-sm overflow-auto max-h-96">
                    {JSON.stringify(result, null, 2)}
                </pre>
            )}
        </div>
    );
}
