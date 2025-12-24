'use client';

import { useState, useEffect, useRef } from 'react';
import { RotateCcw, Download } from 'lucide-react';
import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';
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
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [toast, setToast] = useState('');
  const [toastKey, setToastKey] = useState(0);
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const showToast = (message: string) => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    setToast(message);
    setToastKey((prev) => prev + 1);
    toastTimeoutRef.current = setTimeout(() => setToast(''), 2500);
  };

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

  const handleReset = () => {
    if (confirm('모든 내용을 초기화하시겠습니까?')) {
      const currentYear = new Date().getFullYear();
      setYear(currentYear);
      setTitle('');
      setValues(Array.from({ length: 9 }, () => Array(9).fill('')));
    }
  };

  const handleExportImage = async () => {
    if (!gridRef.current) return;
    if (!title.trim()) {
      showToast('제목을 입력해주세요');
      setShowExportMenu(false);
      return;
    }
    setShowExportMenu(false);

    const gridDataUrl = await toPng(gridRef.current, {
      pixelRatio: 5,
      backgroundColor: '#f1f5f9',
      quality: 1,
    });

    const gridImg = new Image();
    gridImg.src = gridDataUrl;
    await new Promise((resolve) => (gridImg.onload = resolve));

    // 헤더 공간 추가해서 새 캔버스 생성
    const scale = 5;
    const headerHeight = 140 * scale;
    const padding = 50 * scale;
    const canvas = document.createElement('canvas');
    canvas.width = gridImg.width + padding * 2;
    canvas.height = gridImg.height + headerHeight + padding * 2;

    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = '#f1f5f9';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 헤더 텍스트 그리기
    ctx.textAlign = 'center';
    ctx.fillStyle = '#64748b';
    ctx.font = `${24 * scale}px system-ui, sans-serif`;
    ctx.fillText(`${year}년`, canvas.width / 2, padding + 30 * scale);

    ctx.fillStyle = '#334155';
    ctx.font = `bold ${48 * scale}px system-ui, sans-serif`;
    ctx.fillText(title || '만다라트', canvas.width / 2, padding + 80 * scale);

    // 그리드 이미지 그리기
    ctx.drawImage(gridImg, padding, headerHeight + padding);

    const link = document.createElement('a');
    link.download = `mandalart-${year}-${title || 'untitled'}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const handleExportPDF = async () => {
    if (!gridRef.current) return;
    if (!title.trim()) {
      showToast('제목을 입력해주세요');
      setShowExportMenu(false);
      return;
    }
    setShowExportMenu(false);

    const gridDataUrl = await toPng(gridRef.current, {
      pixelRatio: 5,
      backgroundColor: '#ffffff',
      quality: 1,
    });

    const gridImg = new Image();
    gridImg.src = gridDataUrl;
    await new Promise((resolve) => (gridImg.onload = resolve));

    // 헤더 포함 캔버스 생성
    const scale = 5;
    const headerHeight = 140 * scale;
    const padding = 50 * scale;
    const canvas = document.createElement('canvas');
    canvas.width = gridImg.width + padding * 2;
    canvas.height = gridImg.height + headerHeight + padding * 2;

    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 헤더 텍스트 그리기
    ctx.textAlign = 'center';
    ctx.fillStyle = '#64748b';
    ctx.font = `${24 * scale}px system-ui, sans-serif`;
    ctx.fillText(`${year}년`, canvas.width / 2, padding + 30 * scale);

    ctx.fillStyle = '#334155';
    ctx.font = `bold ${48 * scale}px system-ui, sans-serif`;
    ctx.fillText(title || '만다라트', canvas.width / 2, padding + 80 * scale);

    // 그리드 이미지 그리기
    ctx.drawImage(gridImg, padding, headerHeight + padding);

    // PDF 생성
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pageWidth = 210;
    const pageHeight = 297;
    const margin = 10;
    const maxWidth = pageWidth - margin * 2;
    const maxHeight = pageHeight - margin * 2;

    const ratio = Math.min(maxWidth / canvas.width, maxHeight / canvas.height);
    const imgWidth = canvas.width * ratio;
    const imgHeight = canvas.height * ratio;
    const x = (pageWidth - imgWidth) / 2;
    const y = (pageHeight - imgHeight) / 2;

    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', x, y, imgWidth, imgHeight);
    pdf.save(`mandalart-${year}-${title || 'untitled'}.pdf`);
  };

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
      <div className="flex items-center gap-2 mb-6">
        <div className="flex items-center gap-2 bg-white/80 backdrop-blur px-4 py-2 rounded-xl shadow-sm">
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
        <div className="relative">
          <button
            onClick={() => setShowExportMenu(!showExportMenu)}
            className="p-2 bg-white/80 backdrop-blur rounded-xl shadow-sm text-slate-400 hover:text-slate-600 transition-colors"
            title="다운로드"
          >
            <Download size={18} />
          </button>
          {showExportMenu && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowExportMenu(false)}
              />
              <div className="absolute top-full left-0 mt-1 min-w-[120px] bg-white/95 backdrop-blur rounded-xl shadow-lg border border-slate-200 overflow-hidden z-20">
                <button
                  onClick={handleExportImage}
                  className="w-full px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-100 transition-colors text-left whitespace-nowrap"
                >
                  PNG 이미지
                </button>
                <button
                  onClick={handleExportPDF}
                  className="w-full px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-100 transition-colors text-left whitespace-nowrap"
                >
                  PDF 문서
                </button>
              </div>
            </>
          )}
        </div>
        <button
          onClick={handleReset}
          className="p-2 bg-white/80 backdrop-blur rounded-xl shadow-sm text-slate-400 hover:text-slate-600 transition-colors"
          title="초기화"
        >
          <RotateCcw size={18} />
        </button>
      </div>

      <div ref={gridRef}>
        <Grid values={values} onChange={handleChange} />
      </div>

      {/* Toast */}
      {toast && (
        <div
          key={toastKey}
          className="fixed bottom-8 left-1/2 px-4 py-2 bg-slate-800 text-white text-sm rounded-lg shadow-lg animate-[slideUp_0.3s_ease-out]"
          style={{ transform: 'translateX(-50%)' }}
        >
          {toast}
        </div>
      )}
    </div>
  );
};
