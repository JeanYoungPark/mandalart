'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { HelpCircle, X, Check } from 'lucide-react';

export const InfoButton = () => {
  const [showInfoModal, setShowInfoModal] = useState(false);
  const { status } = useSession();
  const router = useRouter();

  const handleLogin = () => {
    setShowInfoModal(false);
    router.push('/auth/signin');
  };

  // 로그인한 사용자에게는 버튼 표시 안 함
  if (status === 'authenticated') {
    return null;
  }

  return (
    <>
      {/* 물음표 버튼 (우하단 고정) */}
      <button
        onClick={() => setShowInfoModal(true)}
        className="fixed bottom-6 right-6 p-4 bg-slate-800 dark:bg-slate-700 text-white rounded-full shadow-lg hover:bg-slate-700 dark:hover:bg-slate-600 transition-all hover:scale-110 z-30"
        title="비회원/회원 차이점 보기"
      >
        <HelpCircle size={24} />
      </button>

      {/* 정보 모달 */}
      {showInfoModal && (
        <>
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={() => setShowInfoModal(false)}
          />
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* 헤더 */}
              <div className="sticky top-0 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-6 py-4 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                  Mandalart 이용 안내
                </h2>
                <button
                  onClick={() => setShowInfoModal(false)}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* 내용 */}
              <div className="p-6 space-y-6">
                {/* 비회원 */}
                <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-5">
                  <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-4 flex items-center gap-2">
                    <span className="px-2 py-1 bg-slate-200 dark:bg-slate-700 text-sm rounded">비회원</span>
                    무료 체험
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-slate-600 dark:text-slate-400">
                      <Check size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                      <span>1개의 만달아트 작성 가능</span>
                    </li>
                    <li className="flex items-start gap-2 text-slate-600 dark:text-slate-400">
                      <Check size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                      <span>브라우저에 자동 저장</span>
                    </li>
                    <li className="flex items-start gap-2 text-slate-600 dark:text-slate-400">
                      <Check size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                      <span>PNG/PDF 내보내기</span>
                    </li>
                    <li className="flex items-start gap-2 text-slate-400 dark:text-slate-500">
                      <X size={20} className="text-slate-400 flex-shrink-0 mt-0.5" />
                      <span>여러 개 생성 및 관리 불가</span>
                    </li>
                    <li className="flex items-start gap-2 text-slate-400 dark:text-slate-500">
                      <X size={20} className="text-slate-400 flex-shrink-0 mt-0.5" />
                      <span>다른 기기에서 접근 불가</span>
                    </li>
                  </ul>
                </div>

                {/* 회원 */}
                <div className="border-2 border-slate-800 dark:border-slate-600 rounded-xl p-5 bg-slate-50 dark:bg-slate-900/50">
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                    <span className="px-2 py-1 bg-slate-800 dark:bg-slate-700 text-white text-sm rounded">회원</span>
                    무제한 이용
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300 font-medium">
                      <Check size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                      <span>무제한 만달아트 생성</span>
                    </li>
                    <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300 font-medium">
                      <Check size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                      <span>서버에 안전하게 저장</span>
                    </li>
                    <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300 font-medium">
                      <Check size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                      <span>모든 기기에서 접근 가능</span>
                    </li>
                    <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300 font-medium">
                      <Check size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                      <span>연도별/목표별 관리</span>
                    </li>
                    <li className="flex items-start gap-2 text-slate-700 dark:text-slate-300 font-medium">
                      <Check size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                      <span>PNG/PDF 내보내기</span>
                    </li>
                  </ul>
                </div>

                {/* CTA */}
                <div className="text-center pt-4">
                  <button
                    onClick={handleLogin}
                    className="px-8 py-3 bg-slate-800 dark:bg-slate-700 text-white rounded-xl hover:bg-slate-700 dark:hover:bg-slate-600 transition-colors font-semibold text-lg"
                  >
                    무료로 시작하기
                  </button>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-3">
                    구글 또는 깃허브 계정으로 간편하게 가입하세요
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
