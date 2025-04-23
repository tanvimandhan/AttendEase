'use client';

import { useEffect, useState } from 'react';

export const Themeswitcher = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' ? 'dark' : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <div className="fixed top-4 right-4 z-50 space-x-2">
      <button onClick={() => setTheme('light')} className="px-3 py-2 rounded bg-white text-black">
        Light
      </button>
      <button onClick={() => setTheme('dark')} className="px-3 py-2 rounded bg-black text-white">
        Dark
      </button>
    </div>
  );
};


