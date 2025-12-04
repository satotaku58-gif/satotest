import { useState } from 'react';
import styles from '../page.module.css';

export function LoginForm() {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        if (!id || !password) {
            setError('IDとパスワードを入力してください');
            return;
        }

        setError('');
        console.log('Login attempt:', { id, password });
        alert(`ログイン: ${id}`);
    };

    return (
        <div className={styles.card}>
            <h1 className={styles.title}>
                ログインしてね！！！
            </h1>

            <form onSubmit={handleLogin}>
                {/* ID入力欄 */}
                <div className={styles.formGroup}>
                    <label htmlFor="id" className={styles.label}>
                        ID！！！！！
                    </label>
                    <input
                        id="id"
                        type="text"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        placeholder="IDを入力"
                        className={styles.input}
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
                    />
                </div>

                {/* エラーメッセージ */}
                {error && (
                    <div className={styles.error}>
                        {error}
                    </div>
                )}

                {/* 認証ボタン */}
                <button
                    type="submit"
                    className={styles.button}
                >
                    認証
                </button>
            </form>
        </div>
    );
}
