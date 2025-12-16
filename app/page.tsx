'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import { Grid } from '@/components/Grid';

export default function Home() {
  // 9개 블록 x 9개 셀 = 81개 값
  const [values, setValues] = useState<string[][]>(
    Array.from({ length: 9 }, () => Array(9).fill(''))
  );

  const handleChange = (blockIndex: number, cellIndex: number, value: string) => {
    setValues(prev => {
      const newValues = prev.map(block => [...block]);

      // 현재 셀 업데이트
      newValues[blockIndex][cellIndex] = value;

      // 중앙 블록(4)에서 입력하면, 해당 위치의 블록 중앙 셀에 동기화
      // 예: 블록4의 셀0 → 블록0의 셀4 (중앙)
      if (blockIndex === 4 && cellIndex !== 4) {
        newValues[cellIndex][4] = value;
      }

      // 반대로: 주변 블록의 중앙 셀(4)에서 입력하면, 중앙 블록의 해당 위치에 동기화
      // 예: 블록0의 셀4 → 블록4의 셀0
      if (blockIndex !== 4 && cellIndex === 4) {
        newValues[4][blockIndex] = value;
      }

      return newValues;
    });
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-gradient-to-br from-slate-200 via-slate-100 to-slate-200">
      <Header />

      <main className="flex-1 flex items-center justify-center p-4 min-h-0">
        <Grid values={values} onChange={handleChange} />
      </main>
    </div>
  );
}
