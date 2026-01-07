'use client';

import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { HeaderProps } from './Header.types';

export const Header = ({
  isLoggedIn = false,
  onLogin,
  onLogout,
  onNewMandalart,
  onMyList
}: HeaderProps) => {
  const { resolvedTheme, setTheme, mounted } = useTheme();

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="flex items-center justify-between px-8 py-4 bg-slate-200 dark:bg-slate-800 border-b border-slate-300 dark:border-slate-700">
      {/* 로고 */}
      <button
        onClick={onMyList}
        className="text-xl font-semibold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-slate-50 transition-colors"
        style={{ fontFamily: 'Poppins, sans-serif' }}
      >
        Mandalart
      </button>

      {/* 메뉴 */}
      <nav className="flex items-center gap-2">
        {/* 다크 모드 토글 */}
        <button
          onClick={toggleTheme}
          className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
          aria-label="테마 전환"
        >
          {mounted ? (
            resolvedTheme === 'dark' ? <Sun size={20} /> : <Moon size={20} />
          ) : (
            <span className="inline-block w-5 h-5" />
          )}
        </button>

        {/* 로그인/로그아웃 */}
        {isLoggedIn ? (
          <button
            onClick={onLogout}
            className="px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            로그아웃
          </button>
        ) : (
          <button
            onClick={onLogin}
            className="px-4 py-2 text-sm bg-slate-600 dark:bg-slate-600 text-white rounded-lg hover:bg-slate-700 dark:hover:bg-slate-500 transition-colors"
          >
            로그인
          </button>
        )}
      </nav>
    </header>
  );
};
