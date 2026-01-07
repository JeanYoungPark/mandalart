'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/Header';

export default function MandalartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleLogin = () => {
    router.push('/auth/signin');
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
  };

  const handleMyList = () => {
    router.push('/dashboard');
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-gradient-to-br from-slate-200 via-slate-100 to-slate-200 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <Header
        isLoggedIn={status === 'authenticated'}
        onLogin={handleLogin}
        onLogout={handleLogout}
        onMyList={handleMyList}
      />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
