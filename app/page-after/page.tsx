'use client';

import { usePageContext } from '@/context/pagecontext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function PageAfter() {
    const { getPage } = usePageContext();
    const router = useRouter();
    const [previousPageName, setPreviousPageName] = useState<string | null>(null);

    useEffect(() => {
        // このページに到達した時点での前ページを取得
        const previousPage = getPage();
        setPreviousPageName(previousPage);
        console.log('前ページから遷移しました。前ページ:', previousPage);
    }, [getPage]);

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>遷移後ページ</h1>
            <p>このページは遷移後のサンプルページです。</p>

            {previousPageName ? (
                <div
                    style={{
                        padding: '15px',
                        backgroundColor: '#d4edda',
                        borderLeft: '4px solid #28a745',
                        marginBottom: '20px',
                    }}
                >
                    <strong>前ページからの遷移を検出しました</strong>
                    <p>前ページ: <code>{previousPageName}</code></p>
                </div>
            ) : (
                <div
                    style={{
                        padding: '15px',
                        backgroundColor: '#fff3cd',
                        borderLeft: '4px solid #ffc107',
                        marginBottom: '20px',
                    }}
                >
                    <strong>注意</strong>
                    <p>このページに直接アクセスされました（前ページがありません）</p>
                </div>
            )}

            <button
                onClick={() => router.back()}
                style={{
                    padding: '10px 20px',
                    fontSize: '16px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    marginRight: '10px',
                }}
            >
                戻る
            </button>

            <Link href="/">
                <button
                    style={{
                        padding: '10px 20px',
                        fontSize: '16px',
                        backgroundColor: '#6c757d',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                    }}
                >
                    ホームに戻る
                </button>
            </Link>
        </div>
    );
}
