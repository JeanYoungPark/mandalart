'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Plus, Calendar, Trash2, FileEdit } from 'lucide-react';
import { Mandalart } from '@/lib/supabase/database.types';
import { MandalartEditor } from '@/components/MandalartEditor';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [mandalarts, setMandalarts] = useState<Mandalart[]>([]);
  const [selectedMandalart, setSelectedMandalart] = useState<Mandalart | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  useEffect(() => {
    if (status === 'authenticated') {
      fetchMandalarts();
    }
  }, [status]);

  const fetchMandalarts = async () => {
    try {
      const response = await fetch('/api/mandalarts');
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setMandalarts(data);
      // 첫 번째 만달아트 자동 선택
      if (data.length > 0 && !selectedMandalart) {
        setSelectedMandalart(data[0]);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = async () => {
    // 즉시 UI 표시
    setIsCreatingNew(true);
    setSelectedMandalart(null);

    // 백그라운드에서 API 호출
    try {
      const currentYear = new Date().getFullYear();
      const response = await fetch('/api/mandalarts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          year: currentYear,
          title: '',
          values: Array.from({ length: 9 }, () => Array(9).fill('')),
        }),
      });

      if (!response.ok) throw new Error('Failed to create');

      const newMandalart = await response.json();
      setMandalarts((prev) => [newMandalart, ...prev]);
      setSelectedMandalart(newMandalart);
      setIsCreatingNew(false);
    } catch (error) {
      console.error('Create error:', error);
      alert('만달아트 생성에 실패했습니다.');
      setIsCreatingNew(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`"${title || 'Untitled'}"을(를) 삭제하시겠습니까?`)) return;

    try {
      const response = await fetch(`/api/mandalarts/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete');

      const updatedList = mandalarts.filter((m) => m.id !== id);
      setMandalarts(updatedList);

      // 삭제된 것이 선택되어 있었다면 다른 것 선택
      if (selectedMandalart?.id === id) {
        setSelectedMandalart(updatedList.length > 0 ? updatedList[0] : null);
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('삭제에 실패했습니다.');
    }
  };

  if (status === 'loading' || isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="w-8 h-8 border-4 border-slate-300 border-t-slate-600 dark:border-slate-600 dark:border-t-slate-300 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex h-full gap-0 p-4">
      {/* 왼쪽 사이드바 - 만달아트 목록 */}
      <div className="w-80 flex flex-col gap-4 pr-6 mr-6 border-r border-slate-200 dark:border-slate-700">
        {/* 새 만달아트 버튼 */}
        <button
          onClick={handleCreate}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-slate-800 dark:bg-slate-700 text-white rounded-xl hover:bg-slate-700 dark:hover:bg-slate-600 transition-colors"
        >
          <Plus size={20} />
          <span>NEW</span>
        </button>

        {/* 목록 */}
        <div className="flex-1 overflow-y-auto space-y-2">
          {mandalarts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center px-4">
              <div className="w-12 h-12 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center mb-3">
                <FileEdit className="w-6 h-6 text-slate-400 dark:text-slate-500" />
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                만달아트를 만들어보세요
              </p>
            </div>
          ) : (
            mandalarts.map((mandalart) => (
              <div
                key={mandalart.id}
                onClick={() => {
                  setSelectedMandalart(mandalart);
                  setIsCreatingNew(false);
                }}
                className={`p-4 rounded-xl cursor-pointer transition-all ${
                  selectedMandalart?.id === mandalart.id && !isCreatingNew
                    ? 'bg-slate-800 dark:bg-slate-700 text-white'
                    : 'bg-white/80 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700/50'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2 text-xs opacity-70">
                    <Calendar size={14} />
                    <span>{mandalart.year}년</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(mandalart.id, mandalart.title);
                    }}
                    className={`p-1 rounded transition-colors ${
                      selectedMandalart?.id === mandalart.id && !isCreatingNew
                        ? 'hover:bg-slate-700 dark:hover:bg-slate-600'
                        : 'hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    <Trash2 size={14} className="text-red-500 dark:text-red-400" />
                  </button>
                </div>
                <h3 className="font-semibold line-clamp-2 mb-1">
                  {mandalart.title || 'Untitled'}
                </h3>
                <p className="text-xs opacity-60">
                  {new Date(mandalart.updated_at).toLocaleDateString('ko-KR', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* 오른쪽 - 에디터 */}
      <div className="flex-1 flex items-center justify-center pl-6 bg-slate-50/50 dark:bg-slate-900/30 rounded-lg">
        {selectedMandalart ? (
          <MandalartEditor
            mandalartId={selectedMandalart.id}
            initialYear={selectedMandalart.year}
            initialTitle={selectedMandalart.title}
            initialValues={selectedMandalart.values as string[][]}
            onUpdate={() => {
              fetchMandalarts();
            }}
          />
        ) : isCreatingNew ? (
          <MandalartEditor />
        ) : (
          <div className="text-center text-slate-400 dark:text-slate-500">
            <FileEdit className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p>만달아트를 선택하거나 새로 만들어보세요</p>
          </div>
        )}
      </div>
    </div>
  );
}
