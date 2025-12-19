'use client';

import { useState, useEffect } from 'react';
import { Grid } from '@/components/Grid';

const STORAGE_KEY = 'mandalart-data';

export const MandalartEditor = () => {
  const [year, setYear] = useState(0);
  const [yearOptions, setYearOptions] = useState<number[]>([]);
  const [title, setTitle] = useState('');
  const [values, setValues] = useState<string[][]>(
    Array.from({ length: 9 }, () => Array(9).fill(''))
  );
  const [isLoaded, setIsLoaded] = useState(false);

  // localStorage에서 불러오기
  useEffect(() => {
    const currentYear = new Date().getFullYear();
    setYearOptions(Array.from({ length: 6 }, (_, i) => currentYear + i));

    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const data = JSON.parse(saved);
      setYear(data.year || currentYear);
      setTitle(data.title || '');
      setValues(data.values || Array.from({ length: 9 }, () => Array(9).fill('')));
    } else {
      setYear(currentYear);
    }
    setIsLoaded(true);
  }, []);

  // localStorage에 저장
  const valuesString = JSON.stringify(values);
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ year, title, values }));
    }
  }, [year, title, valuesString, isLoaded]);

  const handleChange = (blockIndex: number, cellIndex: number, value: string) => {
    setValues(prev => {
      const newValues = prev.map(block => [...block]);
      newValues[blockIndex][cellIndex] = value;

      if (blockIndex === 4 && cellIndex !== 4) {
        newValues[cellIndex][4] = value;
      }

      if (blockIndex !== 4 && cellIndex === 4) {
        newValues[4][blockIndex] = value;
      }

      return newValues;
    });
  };

  if (!isLoaded) {
    return null;
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center gap-2 bg-white/80 backdrop-blur px-4 py-2 rounded-xl shadow-sm mb-6">
        <select
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className="pl-2 pr-6 py-1 text-sm bg-transparent text-slate-600 outline-none cursor-pointer"
        >
          {yearOptions.map((y) => (
            <option key={y} value={y}>{y}년</option>
          ))}
        </select>
        <span className="text-slate-300">|</span>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력하세요"
          className="px-2 py-1 text-sm bg-transparent text-slate-700 placeholder:text-slate-400 outline-none w-48"
        />
      </div>
      <Grid values={values} onChange={handleChange} />
    </div>
  );
};
