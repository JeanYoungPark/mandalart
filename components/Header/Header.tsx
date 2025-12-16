import { HeaderProps } from './Header.types';

export const Header = ({
  isLoggedIn = false,
  onLogin,
  onLogout,
  onNewMandalart,
  onMyList
}: HeaderProps) => {
  return (
    <header className="flex items-center justify-between px-8 py-4 bg-slate-200 border-b border-slate-300">
      {/* 로고 */}
      <h1 className="text-xl font-semibold text-slate-700" style={{ fontFamily: 'Poppins, sans-serif' }}>
        Mandalart
      </h1>

      {/* 메뉴 */}
      <nav className="flex items-center gap-2">
        {/* 새 만다라트 */}
        <button
          onClick={onNewMandalart}
          className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
        >
          + 새 만다라트
        </button>

        {/* 내 목록 (로그인 시에만) */}
        {isLoggedIn && (
          <button
            onClick={onMyList}
            className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            내 목록
          </button>
        )}

        {/* 로그인/로그아웃 */}
        {isLoggedIn ? (
          <button
            onClick={onLogout}
            className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            로그아웃
          </button>
        ) : (
          <button
            onClick={onLogin}
            className="px-4 py-2 text-sm bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
          >
            로그인
          </button>
        )}
      </nav>
    </header>
  );
};
