'use client';

import styles from './page.module.css';
import { LoginForm } from './components/LoginForm';

export default function Home() {
    return (
        <main className={styles.container}>
            <LoginForm />
        </main>
    );
}
