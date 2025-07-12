import { Button } from '@packages/shadcn';
import ThemeToggle from '@/components/ThemeToggle';
import Link from 'next/link';
import { handleTranslation } from '@/app/i18n/index';

type Params = Promise<{ lng: string }>;

export default async function Page({ params }: { params: Params }) {
  const { lng } = await params;
  const { t } = await handleTranslation(lng);
  return (
    <div className="text-center h-screen flex flex-col items-center justify-center">
      <h1>Hello world!</h1>
      <p className="text-gray-500">{t('welcome')}</p>
      <p className="text-gray-500">Language is {lng} now.</p>
      <div>
        <Button variant="default" className="mt-4">
          Shadcn Button
        </Button>
        <div className="flex gap-2 items-center py-4">
          <Link href={`/en`}>English</Link>
          <Link href={`/ja`}>Japanese</Link>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
