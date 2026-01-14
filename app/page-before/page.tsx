'use client';

import { usePageContext } from '@/context/pagecontext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';

export default function PageBefore() {
  const { setPage, getPage } = usePageContext();
  const router = useRouter();

  useEffect(() => {
    // このページに遷移した時点での前ページを確認
    const previousPage = getPage();
    console.log('前ページは:', previousPage);
  }, [getPage]);

  const handleNavigateToAfter = () => {
    setPage('page-before');
    router.push('/page-after');
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>遷移前ページ</h1>
      <p>このはページ遷移の記録テスト用です。</p>
      <p>下のボタンをクリックして次のページへ遷移してください。</p>

      <button
        onClick={handleNavigateToAfter}
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
        遷移後ページへ移動
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
