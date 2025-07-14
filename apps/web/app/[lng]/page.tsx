import { Button } from '@packages/shadcn';
import ThemeToggle from '@/components/ThemeToggle';
import Link from 'next/link';
import { handleTranslation } from '@/app/i18n/index';
import TodoList from './_components/TodoList';

type Params = Promise<{ lng: string }>;

export default async function Page({ params }: { params: Params }) {
  const { lng } = await params;
  const { t } = await handleTranslation(lng);
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="absolute top-0 right-0 p-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm">
            <Link
              href="/en"
              className={`px-3 py-1 rounded-full transition-all duration-200 ${
                lng === 'en'
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                  : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
              }`}
            >
              EN
            </Link>
            <Link
              href="/ja"
              className={`px-3 py-1 rounded-full transition-all duration-200 ${
                lng === 'ja'
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                  : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
              }`}
            >
              JA
            </Link>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center min-h-screen px-6 pt-16">
        <div className="text-center space-y-8 max-w-2xl">
          {/* Hero Section */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent">
              Hello World
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 font-light">
              {t('welcome')}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Current language:{' '}
              <span className="font-medium text-blue-600 dark:text-blue-400">
                {lng.toUpperCase()}
              </span>
            </p>
          </div>

          {/* Feature Showcase */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-blue-600 dark:text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Next.js
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                React framework with SSR
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-purple-600 dark:text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Shadcn/ui
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Beautiful UI components
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-green-600 dark:text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Nx Monorepo
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Scalable workspace
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="pt-8">
            <Button
              variant="default"
              className="px-8 py-3 text-lg font-medium bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Get Started
            </Button>
          </div>
        </div>

        <div>
          <TodoList />
        </div>
      </main>
    </div>
  );
}
