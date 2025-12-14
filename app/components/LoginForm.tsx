import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../page.module.css';

export function LoginForm() {
    const router = useRouter();
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!id || !password) {
            setError('IDとパスワードを入力してくださいね');
            return;
        }

        setError('');
        setSuccess('');
        setLoading(true);

        try {
            const response = await fetch('/api/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: id,
                    password: password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess(data.message);
                // ダッシュボードにリダイレクト
                setTimeout(() => {
                    router.push(`/dashboard?userId=${id}`);
                }, 500);
            } else {
                setError(data.error || 'ログインに失敗しました');
            }
        } catch (err) {
            setError('サーバーエラーが発生しました');
            console.error('Login error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.card}>
            <h1 className={styles.title}>
                ログイン
            </h1>

            <form onSubmit={handleLogin}>
                {/* ID入力欄 */}
                <div className={styles.formGroup}>
                    <label htmlFor="id" className={styles.label}>
                        ユーザー名
                    </label>
                    <input
                        id="id"
                        type="text"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        placeholder="ユーザー名を入力"
                        className={styles.input}
                        disabled={loading}
                    />
                </div>

                {/* パスワード入力欄 */}
                <div className={styles.formGroup}>
                    <label htmlFor="password" className={styles.label}>
                        パスワード
                    </label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="パスワードを入力"
                        className={styles.input}
                        disabled={loading}
                    />
                </div>

                {/* エラーメッセージ */}
                {error && (
                    <div className={styles.error}>
                        {error}
                    </div>
                )}

                {/* 成功メッセージ */}
                {success && (
                    <div style={{ color: 'green', marginBottom: '1rem', fontSize: '0.875rem' }}>
                        {success}
                    </div>
                )}

                {/* 認証ボタン */}
                <button
                    type="submit"
                    className={styles.button}
                    disabled={loading}
                >
                    {loading ? 'ログイン中...' : '認証'}
                </button>
            </form>
        </div>
    );
}
