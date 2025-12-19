'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { MandalartEditor } from '@/components/MandalartEditor';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-gradient-to-br from-slate-200 via-slate-100 to-slate-200">
      <Header />

      <main className="flex-1 flex items-center justify-center p-4 min-h-0">
        {mounted ? <MandalartEditor /> : null}
      </main>
    </div>
  );
}
