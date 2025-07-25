'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Skeleton } from '@packages/shadcn';

const ThemeToggle = () => {
  const [mount, setMount] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;
  useEffect(() => {
    setMount(true);
  }, []);

  if (!mount)
    return (
      <Skeleton className="h-4 w-4 m-2 rounded-full bg-red-100 dark:bg-gray-700" />
    );

  return mount ? (
    <div className="">
      <button
        onClick={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')}
        type="button"
        className="flex h-8 w-8 p-1 items-center justify-center rounded-md text-gray-800 focus:outline-none focus:ring-0 focus:ring-gray-200 dark:border-slate-300 dark:text-white hover:opacity-80 transition-all duration-300"
      >
        {currentTheme === 'dark' ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
            />
          </svg>
        )}
      </button>
    </div>
  ) : null;
};
export default ThemeToggle;
