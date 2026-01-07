'use client';

import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/Header';
import { MandalartEditor } from '@/components/MandalartEditor';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  // 로그인한 사용자는 대시보드로 리다이렉트
  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/dashboard');
    }
  }, [status, router]);

  const handleLogin = () => {
    router.push('/auth/signin');
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
  };

  const handleMyList = () => {
    router.push('/dashboard');
  };

  // 로그인한 사용자는 리다이렉트 중
  if (status === 'authenticated') {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-slate-200 via-slate-100 to-slate-200 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="w-8 h-8 border-4 border-slate-300 border-t-slate-600 dark:border-slate-600 dark:border-t-slate-300 rounded-full animate-spin" />
      </div>
    );
  }

  // 비로그인 사용자: 체험용 만달아트 에디터
  return (
    <div className="h-screen flex flex-col overflow-hidden bg-gradient-to-br from-slate-200 via-slate-100 to-slate-200 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <Header
        isLoggedIn={false}
        onLogin={handleLogin}
        onLogout={handleLogout}
        onMyList={handleMyList}
      />

      <main className="flex-1 flex items-center justify-center p-4 min-h-0">
        {mounted ? <MandalartEditor /> : null}
      </main>

      {/* 로그인 유도 배너 */}
      <div className="bg-slate-800/90 dark:bg-slate-900/90 backdrop-blur text-white px-4 py-3 text-center text-sm">
        <span className="text-slate-300">💡 여러 개의 만달아트를 만들고 관리하고 싶으신가요? </span>
        <button
          onClick={handleLogin}
          className="ml-2 px-3 py-1 bg-white text-slate-800 rounded-lg hover:bg-slate-100 transition-colors font-medium"
        >
          로그인하기
        </button>
      </div>
    </div>
  );
}
