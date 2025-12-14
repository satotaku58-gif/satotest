'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from '../page.module.css';

export default function Dashboard() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const userId = searchParams.get('userId');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // userIdがない場合はログインページにリダイレクト
        if (!userId) {
            router.push('/');
        } else {
            setIsLoading(false);
        }
    }, [userId, router]);

    if (isLoading) {
        return <div>ロード中...</div>;
    }

    const handleLogout = () => {
        router.push('/');
    };

    return (
        <main className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>ダッシュボード</h1>

                <div style={{ marginBottom: '2rem', padding: '1rem', backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
                    <p style={{ marginBottom: '0.5rem' }}>
                        <strong>ログインユーザはこの人です：</strong>
                    </p>
                    <p style={{ fontSize: '1.5rem', color: '#0070f3', marginBottom: 0 }}>
                        {userId}
                    </p>
                </div>

                <button
                    onClick={handleLogout}
                    style={{
                        width: '100%',
                        padding: '0.75rem',
                        backgroundColor: '#ff6b6b',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '1rem',
                        fontWeight: '500',
                    }}
                >
                    ログアウト
                </button>
            </div>
        </main>
    );
}
