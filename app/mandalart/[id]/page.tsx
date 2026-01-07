'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { MandalartEditor } from '@/components/MandalartEditor';
import { Mandalart } from '@/lib/supabase/database.types';

export default function MandalartPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [mandalart, setMandalart] = useState<Mandalart | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paramsData, setParamsData] = useState<{ id: string } | null>(null);

  useEffect(() => {
    params.then(setParamsData);
  }, [params]);

  useEffect(() => {
    if (paramsData) {
      fetchMandalart();
    }
  }, [paramsData]);

  const fetchMandalart = async () => {
    if (!paramsData) return;

    try {
      const response = await fetch(`/api/mandalarts/${paramsData.id}`);

      if (!response.ok) {
        if (response.status === 404) {
          setError('만달아트를 찾을 수 없습니다.');
        } else if (response.status === 401) {
          setError('로그인이 필요합니다.');
        } else {
          setError('만달아트를 불러오는데 실패했습니다.');
        }
        setIsLoading(false);
        return;
      }

      const data = await response.json();
      setMandalart(data);
    } catch (error) {
      console.error('Fetch error:', error);
      setError('만달아트를 불러오는데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="w-8 h-8 border-4 border-slate-300 border-t-slate-600 dark:border-slate-600 dark:border-t-slate-300 rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !mandalart) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <p className="text-slate-600 dark:text-slate-400">{error || '만달아트를 찾을 수 없습니다.'}</p>
        <button
          onClick={() => router.push('/dashboard')}
          className="px-4 py-2 bg-slate-800 dark:bg-slate-700 text-white rounded-lg hover:bg-slate-700 dark:hover:bg-slate-600 transition-colors"
        >
          대시보드로 돌아가기
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Back button */}
      <button
        onClick={() => router.push('/dashboard')}
        className="flex items-center gap-2 mb-6 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
      >
        <ArrowLeft size={20} />
        <span>대시보드로 돌아가기</span>
      </button>

      {/* MandalartEditor with API integration */}
      <div className="flex justify-center">
        <MandalartEditor
          mandalartId={mandalart.id}
          initialYear={mandalart.year}
          initialTitle={mandalart.title}
          initialValues={mandalart.values as string[][]}
          onUpdate={fetchMandalart}
        />
      </div>
    </div>
  );
}
